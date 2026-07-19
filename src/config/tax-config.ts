/**
 * 세금 가정 설정 파일
 *
 * 세법·세율이 바뀌면 이 파일의 숫자만 수정하면 사이트 전체 계산에 반영됩니다.
 * 모든 세율은 "일반적인 가정"이며, 개인별 종합소득 상황(금융소득종합과세, 건강보험료 등)은
 * 반영하지 않습니다. 계산기 결과 화면 하단에 관련 안내 문구가 함께 표시됩니다.
 */

export type AccountType = "general" | "isa" | "pension";

export const ACCOUNT_TYPES: { id: AccountType; label: string; shortLabel: string }[] = [
  { id: "general", label: "일반계좌", shortLabel: "일반계좌" },
  { id: "isa", label: "ISA (일반형)", shortLabel: "ISA" },
  { id: "pension", label: "연금저축", shortLabel: "연금저축" },
];

export const TAX_CONFIG = {
  general: {
    label: "일반계좌",
    // 배당소득세 14% + 지방소득세 1.4% = 15.4% 원천징수
    withholdingRate: 0.154,
    assumptionText:
      "배당소득세 14% + 지방소득세 1.4% = 15.4% 원천징수 기준으로 계산합니다.",
  },
  isa: {
    label: "ISA (일반형)",
    // 일반형 기준 비과세 한도. 서민형/농어민형(400만원)은 반영하지 않음.
    taxFreeLimitKrw: 2_000_000,
    // 비과세 한도 초과분 9.9% 분리과세 (지방소득세 포함)
    rateAboveLimit: 0.099,
    assumptionText:
      "일반형 ISA 기준 비과세 한도 200만원까지는 세금이 없고, 초과분에는 9.9% 분리과세를 적용합니다. 서민형·농어민형(비과세 한도 400만원)은 반영하지 않았습니다.",
  },
  pension: {
    label: "연금저축",
    rateLow: 0.033,
    rateHigh: 0.055,
    // 3.3~5.5% 연금소득세 구간의 중간값을 대표값으로 사용
    get rate() {
      return (this.rateLow + this.rateHigh) / 2;
    },
    assumptionText:
      "운용 기간에는 과세가 이연되고, 연금 수령 시 연금소득세 3.3~5.5%가 적용된다고 가정해 중간값인 4.4%로 계산합니다. (연령·수령 방식에 따라 실제 세율은 달라질 수 있습니다)",
  },
} as const;

export const COMPREHENSIVE_TAX_NOTICE =
  "금융소득(이자·배당 합산)이 연 2,000만원을 초과하면 금융소득종합과세 대상이 되어 다른 소득과 합산해 더 높은 세율이 적용될 수 있고, 건강보험료 산정에도 영향을 줄 수 있습니다. 이 계산기는 이러한 개인별 변수는 반영하지 않은 단순 가정 기준입니다.";
