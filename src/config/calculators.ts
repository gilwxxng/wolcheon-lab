/**
 * 계산기 레지스트리.
 *
 * 새 계산기를 추가할 때 이 배열에 한 줄만 추가하면 홈 화면 카드 목록과
 * sitemap.xml에 자동으로 반영됩니다. (실제 페이지는 src/app/calculators/[slug] 에 구현)
 */
export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  emoji: string;
  description: string;
  available: boolean;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "monthly-dividend",
    title: "월배당 인컴 계산기",
    shortTitle: "월배당 인컴",
    emoji: "💰",
    description: "목표 월 배당액을 세금까지 반영해서, 진짜로 필요한 시드머니를 계산해요.",
    available: true,
  },
  {
    slug: "etf-blend",
    title: "ETF 조합 시뮬레이터",
    shortTitle: "ETF 조합",
    emoji: "🧪",
    description: "SCHD+JEPI 같은 유명 조합을 비율별로 섞으면 필요 시드가 어떻게 변하는지 계산해요.",
    available: true,
  },
  {
    slug: "compound-interest",
    title: "복리 계산기 (준비 중)",
    shortTitle: "복리 계산",
    emoji: "📈",
    description: "매달 적립하면 몇 년 뒤 얼마가 되는지 세후 기준으로 계산해요.",
    available: false,
  },
  {
    slug: "fire-number",
    title: "파이어(FIRE) 계산기 (준비 중)",
    shortTitle: "파이어 넘버",
    emoji: "🔥",
    description: "경제적 자유를 위해 필요한 은퇴 자산을 계산해요.",
    available: false,
  },
];
