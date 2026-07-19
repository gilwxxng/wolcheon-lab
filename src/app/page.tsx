import Link from "next/link";
import { CALCULATORS } from "@/config/calculators";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { QuoteTicker } from "@/components/home/QuoteTicker";
import { AdSlot } from "@/components/ads/AdSlot";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <div className="pt-4">
        <QuoteTicker />
      </div>

      <section className="py-10 text-center sm:py-14">
        <p className="mb-3 text-sm font-semibold text-accent-strong">세후 실수령 기준 재테크 계산기</p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          세금 떼고 나면,
          <br />
          진짜 얼마가 필요할까요?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-muted sm:text-base">
          월천연구소는 배당·투자 수익을 <strong className="text-foreground">세금까지 반영한
          실수령액</strong> 기준으로 계산합니다. 세전 숫자에 속지 마세요.
        </p>
        <Link
          href="/calculators/monthly-dividend"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 active:scale-[0.98]"
        >
          💰 월배당 인컴 계산기 시작하기
        </Link>
      </section>

      <section aria-labelledby="calculators-heading" className="py-6">
        <h2 id="calculators-heading" className="mb-4 text-lg font-bold">
          계산기 모음
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CALCULATORS.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          계산기는 매주 새로 추가됩니다. 필요한 계산기가 있다면 언제든 요청해주세요.
        </p>
      </section>

      <AdSlot label="홈 하단 광고" className="my-8" />

      <section aria-labelledby="why-net-heading" className="rounded-2xl border border-border bg-surface p-5 py-6">
        <h2 id="why-net-heading" className="mb-3 text-lg font-bold">
          왜 &ldquo;세후&rdquo; 기준인가요?
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>
            대부분의 배당·투자 계산기는 <strong className="text-foreground">세전(稅前)</strong> 배당률을
            그대로 곱해서 결과를 보여줍니다. 하지만 실제로 통장에 들어오는 돈은 배당소득세, ISA
            분리과세, 연금소득세 등을 뗀 <strong className="text-foreground">세후 금액</strong>입니다.
          </p>
          <p>
            &ldquo;월 300만원 배당&rdquo;을 목표로 세운다면, 진짜 필요한 건 세전 300만원이 아니라
            세금을 떼고도 300만원이 남는 구조입니다. 그래서 필요한 시드머니도 생각보다 더 커집니다.
          </p>
          <p>
            월천연구소의 모든 계산기는 이 차이를 명확하게 보여주는 것을 목표로 합니다. 세금 가정은
            계산기 결과 화면에서 &ldquo;적용된 세금 가정&rdquo;을 펼쳐서 직접 확인할 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
