/**
 * 배당 포트폴리오 시뮬레이터용 인기 배당 ETF 카탈로그.
 *
 * 배당률(yieldRate)은 2026년 7월 기준 공개 자료를 참고한 "예시 수치"이며 실시간이 아닙니다.
 * 분배율이 크게 달라지면 이 파일의 숫자만 수정하면 사이트 전체에 반영됩니다.
 * 특정 상품 추천이 아니라, 인기 상품군을 유형별로 시뮬레이션해보기 위한 목록입니다.
 */

export type EtfMarket = "us" | "kr";
export type EtfCategory = "dividendGrowth" | "highDividend" | "coveredCall" | "reit";

export const CATEGORY_LABELS: Record<EtfCategory, string> = {
  dividendGrowth: "배당성장",
  highDividend: "고배당",
  coveredCall: "커버드콜",
  reit: "리츠",
};

export interface DividendEtf {
  id: string;
  ticker: string;
  name: string;
  market: EtfMarket;
  category: EtfCategory;
  yieldRate: number; // 연 분배율 예시 (0.033 = 3.3%)
  payCycle: "월" | "분기";
  note: string;
}

export const DIVIDEND_ETFS: DividendEtf[] = [
  // ───── 미국 상장 ─────
  {
    id: "schd",
    ticker: "SCHD",
    name: "슈왑 미국 배당성장",
    market: "us",
    category: "dividendGrowth",
    yieldRate: 0.033,
    payCycle: "분기",
    note: "배당성장의 대표주자, 10년 연속 두 자릿수 배당 성장",
  },
  {
    id: "vym",
    ticker: "VYM",
    name: "뱅가드 고배당",
    market: "us",
    category: "highDividend",
    yieldRate: 0.022,
    payCycle: "분기",
    note: "500개+ 배당주 분산, 최저 수수료(0.04%)",
  },
  {
    id: "divo",
    ticker: "DIVO",
    name: "앰플리파이 배당+콜옵션",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.064,
    payCycle: "월",
    note: "배당주에 부분 커버드콜, 중간 지대 전략",
  },
  {
    id: "jepi",
    ticker: "JEPI",
    name: "JP모건 S&P500 프리미엄인컴",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.082,
    payCycle: "월",
    note: "월배당 커버드콜 최대 인기, 변동성 낮은 편",
  },
  {
    id: "jepq",
    ticker: "JEPQ",
    name: "JP모건 나스닥 프리미엄인컴",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.109,
    payCycle: "월",
    note: "나스닥 기반 고배당 커버드콜",
  },
  {
    id: "xyld",
    ticker: "XYLD",
    name: "글로벌X S&P500 커버드콜",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.103,
    payCycle: "월",
    note: "S&P500 100% 커버드콜, 상승 여력 대부분 포기",
  },
  {
    id: "qyld",
    ticker: "QYLD",
    name: "글로벌X 나스닥100 커버드콜",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.115,
    payCycle: "월",
    note: "고배당의 대명사, 장기 NAV 하락 이력 주의",
  },
  {
    id: "spyi",
    ticker: "SPYI",
    name: "NEOS S&P500 하이인컴",
    market: "us",
    category: "coveredCall",
    yieldRate: 0.119,
    payCycle: "월",
    note: "옵션 전략으로 최고 수준 분배율",
  },
  // ───── 국내 상장 ─────
  {
    id: "tiger-schd",
    ticker: "TIGER 미국배당다우존스",
    name: "국내판 SCHD",
    market: "kr",
    category: "dividendGrowth",
    yieldRate: 0.036,
    payCycle: "월",
    note: "SCHD 지수를 국내에서, 월배당 지급",
  },
  {
    id: "sol-schd",
    ticker: "SOL 미국배당다우존스",
    name: "국내판 SCHD (SOL)",
    market: "kr",
    category: "dividendGrowth",
    yieldRate: 0.033,
    payCycle: "월",
    note: "같은 지수 추종, 월배당",
  },
  {
    id: "kodex-cc",
    ticker: "KODEX 미국배당커버드콜",
    name: "미국 배당주 + 커버드콜",
    market: "kr",
    category: "coveredCall",
    yieldRate: 0.105,
    payCycle: "월",
    note: "배당주 기반 커버드콜, 연 10% 안팎 분배",
  },
  {
    id: "tiger-ndx-cc",
    ticker: "TIGER 미국나스닥100커버드콜",
    name: "나스닥 커버드콜",
    market: "kr",
    category: "coveredCall",
    yieldRate: 0.115,
    payCycle: "월",
    note: "국내 상장 나스닥 커버드콜 대표",
  },
  {
    id: "ace-bigtech",
    ticker: "ACE 미국빅테크TOP7 Plus월배당",
    name: "빅테크 커버드콜",
    market: "kr",
    category: "coveredCall",
    yieldRate: 0.085,
    payCycle: "월",
    note: "빅테크 7종 기반 월배당",
  },
  {
    id: "kodex-aristocrat",
    ticker: "KODEX 미국S&P500배당귀족커버드콜(H)",
    name: "배당귀족 커버드콜",
    market: "kr",
    category: "coveredCall",
    yieldRate: 0.09,
    payCycle: "월",
    note: "배당귀족주 + 커버드콜, 환헤지",
  },
  {
    id: "tiger-reit",
    ticker: "TIGER 리츠부동산인프라",
    name: "국내 리츠 분산",
    market: "kr",
    category: "reit",
    yieldRate: 0.055,
    payCycle: "분기",
    note: "국내 리츠·인프라 분산 투자",
  },
];

export const MARKET_LABELS: Record<EtfMarket, string> = {
  us: "미국 상장",
  kr: "국내 상장",
};

/** 기본 선택: SCHD 50% + JEPI 50% */
export const DEFAULT_PORTFOLIO: { etfId: string; weight: number }[] = [
  { etfId: "schd", weight: 50 },
  { etfId: "jepi", weight: 50 },
];

export const MAX_PORTFOLIO_SIZE = 5;
