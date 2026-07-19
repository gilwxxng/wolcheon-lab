import { AccountType } from "@/config/tax-config";
import { DIVIDEND_ETFS, DividendEtf, EtfCategory } from "@/config/dividend-etfs";
import { grossAnnualFromNetTarget, netFromGrossAnnual } from "@/lib/calculator";

export interface PortfolioItem {
  etfId: string;
  weight: number; // 사용자가 조정한 원시 비중 (합이 100이 아니어도 됨 — 정규화해서 사용)
}

export interface NormalizedItem {
  etf: DividendEtf;
  weightPercent: number; // 정규화된 비중 (합 100)
}

export function normalizePortfolio(items: PortfolioItem[]): NormalizedItem[] {
  const valid = items
    .map((item) => ({ etf: DIVIDEND_ETFS.find((e) => e.id === item.etfId), weight: item.weight }))
    .filter((x): x is { etf: DividendEtf; weight: number } => !!x.etf && x.weight > 0);

  const total = valid.reduce((sum, x) => sum + x.weight, 0);
  if (total <= 0) return [];

  return valid.map((x) => ({ etf: x.etf, weightPercent: (x.weight / total) * 100 }));
}

export function blendedYieldOf(normalized: NormalizedItem[]): number {
  return normalized.reduce((sum, x) => sum + x.etf.yieldRate * (x.weightPercent / 100), 0);
}

export function categoryWeights(normalized: NormalizedItem[]): Partial<Record<EtfCategory, number>> {
  const out: Partial<Record<EtfCategory, number>> = {};
  for (const x of normalized) {
    out[x.etf.category] = (out[x.etf.category] ?? 0) + x.weightPercent;
  }
  return out;
}

export interface SimulationInput {
  seedWon: number;
  monthlyContributionWon: number;
  targetMonthlyWon: number;
  blendedYield: number;
  account: AccountType;
}

export interface Milestone {
  years: number;
  seed: number;
  netMonthly: number;
}

export interface SimulationResult {
  blendedYield: number;
  /** 목표 세후 월배당을 받기 위해 필요한 시드 */
  requiredSeed: number;
  /** 현재 시드 기준 세후 월배당 */
  currentNetMonthly: number;
  /** 목표 대비 달성률 (0~1, 1 이상이면 이미 달성) */
  achievementRate: number;
  /** 월 적립 + 배당 재투자 가정 시 목표 달성까지 개월 수. null이면 50년 내 미달성 */
  monthsToGoal: number | null;
  milestones: Milestone[];
}

const MAX_MONTHS = 600; // 50년

/**
 * 월 단위 시뮬레이션.
 * 가정: 배당률·세율 불변, 배당은 전액 재투자(세후), 매달 적립금 추가, 가격 변동 없음.
 */
export function simulatePortfolio(input: SimulationInput): SimulationResult {
  const { seedWon, monthlyContributionWon, targetMonthlyWon, blendedYield, account } = input;

  const targetAnnualNet = targetMonthlyWon * 12;
  const requiredSeed =
    blendedYield > 0 ? grossAnnualFromNetTarget(targetAnnualNet, account) / blendedYield : 0;

  const netMonthlyAt = (seed: number) => {
    if (seed <= 0 || blendedYield <= 0) return 0;
    return netFromGrossAnnual(seed * blendedYield, account) / 12;
  };

  const currentNetMonthly = netMonthlyAt(seedWon);
  const achievementRate = targetMonthlyWon > 0 ? currentNetMonthly / targetMonthlyWon : 0;

  let monthsToGoal: number | null = null;
  const milestones: Milestone[] = [];
  const milestoneMonths = new Set([12, 36, 60, 120]);

  let seed = seedWon;
  if (currentNetMonthly >= targetMonthlyWon && targetMonthlyWon > 0) {
    monthsToGoal = 0;
  }

  for (let month = 1; month <= MAX_MONTHS; month++) {
    const netMonthlyIncome = netMonthlyAt(seed);
    seed += monthlyContributionWon + netMonthlyIncome;

    if (milestoneMonths.has(month)) {
      milestones.push({ years: month / 12, seed, netMonthly: netMonthlyAt(seed) });
    }

    if (monthsToGoal === null && targetMonthlyWon > 0 && netMonthlyAt(seed) >= targetMonthlyWon) {
      monthsToGoal = month;
    }

    if (month >= 120 && monthsToGoal !== null) break;
  }

  return {
    blendedYield,
    requiredSeed,
    currentNetMonthly,
    achievementRate,
    monthsToGoal,
    milestones,
  };
}

export interface VariantResult {
  label: string;
  description: string;
  items: NormalizedItem[];
  blendedYield: number;
  requiredSeed: number;
  monthsToGoal: number | null;
}

/**
 * 사용자가 고른 ETF들 안에서 비중만 바꾼 "변형 조합" 3가지를 비교용으로 생성.
 * (균등 배분 / 배당률 가중 = 현금흐름 중심 / 배당률 역가중 = 안정 성장 중심)
 */
export function buildVariants(
  items: PortfolioItem[],
  sim: Omit<SimulationInput, "blendedYield">
): VariantResult[] {
  const normalized = normalizePortfolio(items);
  if (normalized.length < 2) return [];

  const make = (label: string, description: string, weights: number[]): VariantResult => {
    const total = weights.reduce((a, b) => a + b, 0);
    const variantItems: NormalizedItem[] = normalized.map((x, i) => ({
      etf: x.etf,
      weightPercent: (weights[i] / total) * 100,
    }));
    const blendedYield = blendedYieldOf(variantItems);
    const result = simulatePortfolio({ ...sim, blendedYield });
    return {
      label,
      description,
      items: variantItems,
      blendedYield,
      requiredSeed: result.requiredSeed,
      monthsToGoal: result.monthsToGoal,
    };
  };

  return [
    make(
      "균등 배분",
      "선택한 ETF에 같은 비중",
      normalized.map(() => 1)
    ),
    make(
      "현금흐름 중심",
      "배당률이 높은 쪽에 더 큰 비중",
      normalized.map((x) => x.etf.yieldRate)
    ),
    make(
      "성장 중심",
      "배당률이 낮은(성장형) 쪽에 더 큰 비중",
      normalized.map((x) => 1 / x.etf.yieldRate)
    ),
  ];
}

/** 개월 수를 "N년 M개월" 문자열로 */
export function formatMonths(months: number | null): string {
  if (months === null) return "50년 이상";
  if (months === 0) return "이미 달성 🎉";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  if (rest === 0) return `${years}년`;
  return `${years}년 ${rest}개월`;
}
