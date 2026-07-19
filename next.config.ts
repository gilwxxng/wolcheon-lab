import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 구 ETF 조합 시뮬레이터 → 배당 포트폴리오 시뮬레이터
      {
        source: "/calculators/etf-blend",
        destination: "/calculators/dividend-portfolio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
