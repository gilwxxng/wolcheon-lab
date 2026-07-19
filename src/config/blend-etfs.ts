/**
 * ETF 조합 시뮬레이터용 예시 ETF 목록.
 *
 * 배당률(yieldRate)은 각 상품군의 일반적인 예시 수치이며 실시간 시세가 아닙니다.
 * 숫자가 크게 달라지면 이 파일만 수정하면 됩니다.
 * 티커는 "이런 종류의 상품"을 설명하기 위한 예시일 뿐, 특정 상품 추천이 아닙니다.
 */

export type BlendCategory = "growth" | "dividendGrowth" | "coveredCall";

export interface BlendEtf {
  id: string;
  ticker: string;
  name: string;
  yieldRate: number; // 연 배당률 예시 (0.035 = 3.5%)
  category: BlendCategory;
  note: string;
}

export const BLEND_ETFS: BlendEtf[] = [
  {
    id: "voo",
    ticker: "VOO",
    name: "S&P500 지수 ETF (VOO류)",
    yieldRate: 0.013,
    category: "growth",
    note: "배당은 낮지만 성장 중심",
  },
  {
    id: "schd",
    ticker: "SCHD",
    name: "미국 배당성장 ETF (SCHD류)",
    yieldRate: 0.035,
    category: "dividendGrowth",
    note: "배당 성장 + 주가 성장 균형",
  },
  {
    id: "jepi",
    ticker: "JEPI",
    name: "S&P500 커버드콜 ETF (JEPI류)",
    yieldRate: 0.075,
    category: "coveredCall",
    note: "월배당, 변동성 낮은 커버드콜",
  },
  {
    id: "jepq",
    ticker: "JEPQ",
    name: "나스닥 커버드콜 ETF (JEPQ류)",
    yieldRate: 0.095,
    category: "coveredCall",
    note: "월배당, 나스닥 기반 커버드콜",
  },
  {
    id: "qyld",
    ticker: "QYLD",
    name: "고배당 커버드콜 ETF (QYLD류)",
    yieldRate: 0.115,
    category: "coveredCall",
    note: "배당률 최상위, NAV 훼손 주의",
  },
];

/** 파이어족 사이에서 자주 언급되는 예시 조합 프리셋 */
export interface BlendPreset {
  label: string;
  etfAId: string;
  etfBId: string;
  ratioA: number; // ETF A 비중 (%)
}

export const BLEND_PRESETS: BlendPreset[] = [
  { label: "SCHD 70 + JEPI 30", etfAId: "schd", etfBId: "jepi", ratioA: 70 },
  { label: "SCHD 50 + JEPI 50", etfAId: "schd", etfBId: "jepi", ratioA: 50 },
  { label: "SCHD 50 + JEPQ 50", etfAId: "schd", etfBId: "jepq", ratioA: 50 },
  { label: "VOO 50 + JEPI 50", etfAId: "voo", etfBId: "jepi", ratioA: 50 },
];

export const DEFAULT_BLEND = { etfAId: "schd", etfBId: "jepi", ratioA: 50 };
