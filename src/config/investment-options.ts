/**
 * 투자 수단별 예시 배당률(수익률) 설정 파일
 *
 * 실제 상품별 배당률은 시장 상황에 따라 계속 바뀝니다.
 * 여기 있는 숫자는 계산기의 "기본값(프리셋)"이며, 사용자가 계산기 화면에서 직접 수정할 수 있습니다.
 * 대표 상품이 바뀌거나 평균 배당률이 크게 달라지면 이 파일의 yieldRate만 수정하면 됩니다.
 */

export type InvestmentId = "coveredCall" | "dividendGrowth" | "koreanMonthly" | "deposit";

export interface InvestmentOption {
  id: InvestmentId;
  label: string;
  shortLabel: string;
  yieldRate: number; // 연 배당률/금리 (0.12 = 12%)
  description: string;
  isReferenceOnly?: boolean; // 비교 기준용 (예금)
  hasCoveredCallWarning?: boolean;
}

export const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: "coveredCall",
    label: "커버드콜 ETF",
    shortLabel: "커버드콜",
    yieldRate: 0.12,
    description: "예시 배당률 연 12% (고배당 커버드콜 전략 ETF 평균 가정)",
    hasCoveredCallWarning: true,
  },
  {
    id: "dividendGrowth",
    label: "미국 배당성장 ETF (SCHD류)",
    shortLabel: "배당성장 ETF",
    yieldRate: 0.035,
    description: "예시 배당률 연 3.5% (SCHD 등 미국 배당성장 ETF 평균 가정)",
  },
  {
    id: "koreanMonthly",
    label: "국내 월배당 ETF",
    shortLabel: "국내 월배당",
    yieldRate: 0.06,
    description: "예시 배당률 연 6% (국내 월배당 ETF 평균 가정)",
  },
  {
    id: "deposit",
    label: "은행 예금 (비교 기준)",
    shortLabel: "은행 예금",
    yieldRate: 0.03,
    description: "예시 금리 연 3% (정기예금 비교 기준)",
    isReferenceOnly: true,
  },
];

export const DEFAULT_INVESTMENT_ID: InvestmentId = "koreanMonthly";

export const MONTHLY_TARGET_PRESETS = [1_000_000, 3_000_000, 5_000_000, 10_000_000];
export const DEFAULT_MONTHLY_TARGET = 3_000_000;
