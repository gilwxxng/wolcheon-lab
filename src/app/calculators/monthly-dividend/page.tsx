import type { Metadata } from "next";
import { MonthlyDividendForm } from "@/components/calculators/monthly-dividend/MonthlyDividendForm";
import { InfoSections } from "@/components/calculators/monthly-dividend/InfoSections";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site";

const title = "월배당 인컴 계산기 - 세후 실수령 기준";
const description =
  "월 100만원~1,000만원 배당을 세금까지 반영한 세후 실수령 기준으로 계산합니다. 커버드콜, SCHD류 배당성장 ETF, 국내 월배당 ETF, 은행 예금까지 투자 수단별 필요 시드머니를 비교하고, 일반계좌·ISA·연금저축 계좌별 세금 차이도 확인하세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculators/monthly-dividend" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/calculators/monthly-dividend`,
  },
};

export default function MonthlyDividendPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-6">
        <p className="mb-1.5 text-sm font-semibold text-accent-strong">💰 월배당 인컴 계산기</p>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          월 ○○○만원 배당,
          <br />
          세금 떼고 진짜로 얼마가 필요할까?
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          목표 월 배당액과 투자 수단, 계좌 종류를 고르면 세후 실수령 기준 필요 시드머니를
          바로 계산해드려요.
        </p>
      </header>

      <MonthlyDividendForm />

      <AdSlot label="계산기 하단 광고" className="my-8" />

      <InfoSections />
    </div>
  );
}
