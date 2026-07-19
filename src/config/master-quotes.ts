/**
 * 홈 상단 "투자 대가의 한마디" 로테이션에 표시되는 어록 목록.
 *
 * 널리 인용되는 유명 어록을 영어 원문 + 한국어 번역으로 함께 표시합니다.
 * 추가/수정하려면 이 배열에 항목을 넣거나 고치면 됩니다.
 */

export interface MasterQuote {
  author: string; // 영문 이름
  authorKr: string; // 한글 이름
  title: string; // 한 줄 소개
  en: string;
  kr: string;
}

export const MASTER_QUOTES: MasterQuote[] = [
  {
    author: "Warren Buffett",
    authorKr: "워런 버핏",
    title: "버크셔 해서웨이 회장",
    en: "Be fearful when others are greedy, and greedy when others are fearful.",
    kr: "남들이 탐욕스러울 때 두려워하고, 남들이 두려워할 때 탐욕스러워라.",
  },
  {
    author: "Charlie Munger",
    authorKr: "찰리 멍거",
    title: "버핏의 평생 파트너",
    en: "The big money is not in the buying and the selling, but in the waiting.",
    kr: "큰돈은 사고파는 데서가 아니라, 기다림에서 나온다.",
  },
  {
    author: "John D. Rockefeller",
    authorKr: "존 D. 록펠러",
    title: "스탠더드 오일 창업자",
    en: "Do you know the only thing that gives me pleasure? It's to see my dividends coming in.",
    kr: "내게 기쁨을 주는 유일한 것이 무엇인지 아는가? 배당금이 들어오는 것을 보는 일이다.",
  },
  {
    author: "Peter Lynch",
    authorKr: "피터 린치",
    title: "마젤란 펀드의 전설",
    en: "Know what you own, and know why you own it.",
    kr: "내가 무엇을 보유하고 있는지, 왜 보유하고 있는지 알아야 한다.",
  },
  {
    author: "Benjamin Graham",
    authorKr: "벤저민 그레이엄",
    title: "가치투자의 아버지",
    en: "In the short run, the market is a voting machine, but in the long run, it is a weighing machine.",
    kr: "단기적으로 시장은 인기투표 기계지만, 장기적으로는 가치를 재는 저울이다.",
  },
  {
    author: "John Bogle",
    authorKr: "존 보글",
    title: "뱅가드 창업자, 인덱스펀드의 아버지",
    en: "Don't look for the needle in the haystack. Just buy the haystack.",
    kr: "건초더미에서 바늘을 찾으려 하지 마라. 그냥 건초더미를 통째로 사라.",
  },
  {
    author: "Ray Dalio",
    authorKr: "레이 달리오",
    title: "브리지워터 창업자",
    en: "He who lives by the crystal ball will eat shattered glass.",
    kr: "수정구슬에 의존해 사는 자는 깨진 유리를 삼키게 된다.",
  },
  {
    author: "Howard Marks",
    authorKr: "하워드 막스",
    title: "오크트리 캐피털 회장",
    en: "You can't predict. You can prepare.",
    kr: "예측할 수는 없다. 그러나 준비할 수는 있다.",
  },
  {
    author: "George Soros",
    authorKr: "조지 소로스",
    title: "퀀텀 펀드 창업자",
    en: "It's not whether you're right or wrong, but how much money you make when you're right and how much you lose when you're wrong.",
    kr: "중요한 건 맞느냐 틀리느냐가 아니라, 맞았을 때 얼마나 벌고 틀렸을 때 얼마나 잃느냐다.",
  },
  {
    author: "Jesse Livermore",
    authorKr: "제시 리버모어",
    title: "월가의 전설적 트레이더",
    en: "The market is never wrong; opinions often are.",
    kr: "시장은 결코 틀리지 않는다. 틀리는 것은 늘 사람들의 의견이다.",
  },
];
