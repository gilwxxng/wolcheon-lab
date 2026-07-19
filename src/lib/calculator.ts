import { ACCOUNT_TYPES, AccountType, TAX_CONFIG } from "@/config/tax-config";
import { INVESTMENT_OPTIONS, InvestmentId } from "@/config/investment-options";

/** 세전(gross) 연간 배당금을 계좌 종류별 세금 규칙에 따라 세후(net) 금액으로 변환 */
export function netFromGrossAnnual(grossAnnual: number, account: AccountType): number {
  if (grossAnnual <= 0) return 0;

  switch (account) {
    case "general": {
      const { withholdingRate } = TAX_CONFIG.general;
      return grossAnnual * (1 - withholdingRate);
    }
    case "isa": {
      const { taxFreeLimitKrw, rateAboveLimit } = TAX_CONFIG.isa;
      if (grossAnnual <= taxFreeLimitKrw) return grossAnnual;
      const taxableAmount = grossAnnual - taxFreeLimitKrw;
      return taxFreeLimitKrw + taxableAmount * (1 - rateAboveLimit);
    }
    case "pension": {
      const rate = TAX_CONFIG.pension.rate;
      return grossAnnual * (1 - rate);
    }
  }
}

/** 목표 세후(net) 연간 배당금을 받기 위해 필요한 세전(gross) 연간 배당금을 역산 */
export function grossAnnualFromNetTarget(netTargetAnnual: number, account: AccountType): number {
  if (netTargetAnnual <= 0) return 0;

  switch (account) {
    case "general": {
      const { withholdingRate } = TAX_CONFIG.general;
      return netTargetAnnual / (1 - withholdingRate);
    }
    case "isa": {
      const { taxFreeLimitKrw, rateAboveLimit } = TAX_CONFIG.isa;
      if (netTargetAnnual <= taxFreeLimitKrw) return netTargetAnnual;
      const netAboveLimit = netTargetAnnual - taxFreeLimitKrw;
      return taxFreeLimitKrw + netAboveLimit / (1 - rateAboveLimit);
    }
    case "pension": {
      const rate = TAX_CONFIG.pension.rate;
      return netTargetAnnual / (1 - rate);
    }
  }
}

export interface MonthlyDividendInput {
  monthlyTargetWon: number;
  yieldRate: number; // 0.12 = 12%
  account: AccountType;
}

export interface InvestmentComparisonRow {
  id: InvestmentId;
  label: string;
  shortLabel: string;
  yieldRate: number;
  requiredSeed: number;
  isReferenceOnly?: boolean;
  hasCoveredCallWarning?: boolean;
}

export interface AccountComparisonRow {
  id: AccountType;
  label: string;
  shortLabel: string;
  netAnnual: number;
  netMonthly: number;
}

export interface MonthlyDividendResult {
  targetAnnualNet: number;
  requiredGrossAnnual: number;
  /** 세금을 고려하지 않고 단순히 "세전 목표"로 계산했을 때의 필요 시드 (비교용) */
  seedBeforeTax: number;
  /** 세금까지 반영해 실제로 필요한 시드 */
  seedAfterTax: number;
  investmentComparison: InvestmentComparisonRow[];
  accountComparison: AccountComparisonRow[];
}

export function calculateMonthlyDividend(input: MonthlyDividendInput): MonthlyDividendResult {
  const { monthlyTargetWon, yieldRate, account } = input;

  const targetAnnualNet = monthlyTargetWon * 12;
  const requiredGrossAnnual = grossAnnualFromNetTarget(targetAnnualNet, account);

  const seedBeforeTax = yieldRate > 0 ? targetAnnualNet / yieldRate : 0;
  const seedAfterTax = yieldRate > 0 ? requiredGrossAnnual / yieldRate : 0;

  const investmentComparison: InvestmentComparisonRow[] = INVESTMENT_OPTIONS.map((opt) => ({
    id: opt.id,
    label: opt.label,
    shortLabel: opt.shortLabel,
    yieldRate: opt.yieldRate,
    requiredSeed: opt.yieldRate > 0 ? requiredGrossAnnual / opt.yieldRate : 0,
    isReferenceOnly: opt.isReferenceOnly,
    hasCoveredCallWarning: opt.hasCoveredCallWarning,
  }));

  const grossAnnualAtSeed = seedAfterTax * yieldRate;
  const accountComparison: AccountComparisonRow[] = ACCOUNT_TYPES.map((acc) => {
    const netAnnual = netFromGrossAnnual(grossAnnualAtSeed, acc.id);
    return {
      id: acc.id,
      label: acc.label,
      shortLabel: acc.shortLabel,
      netAnnual,
      netMonthly: netAnnual / 12,
    };
  });

  return {
    targetAnnualNet,
    requiredGrossAnnual,
    seedBeforeTax,
    seedAfterTax,
    investmentComparison,
    accountComparison,
  };
}
