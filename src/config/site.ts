export const siteConfig = {
  name: "월천연구소",
  shortName: "월천연구소",
  tagline: "세후 실수령 기준 배당·투자 시뮬레이터",
  description:
    "배당·투자 수익을 세금까지 반영한 '진짜 실수령액' 기준으로 계산하는 재테크 계산기 모음. 월 배당 인컴 계산기로 목표 월배당을 받기 위해 필요한 시드머니를 세후 기준으로 확인하세요.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wolcheon-lab.vercel.app",
  ogImage: "/og-default.png",
  twitter: "@wolcheonlab",
  contactEmail: "gilwxxng@gmail.com",
} as const;
