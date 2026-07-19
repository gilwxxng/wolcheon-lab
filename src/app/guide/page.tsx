import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { StepPreview } from "@/components/guide/StepPreview";
import { AdSlot } from "@/components/ads/AdSlot";

const title = "사용법 가이드";
const description = "월천연구소의 월배당 인컴 계산기를 단계별로 사용하는 방법을 화면 미리보기와 함께 안내합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guide" },
  openGraph: { title: `${title} | ${siteConfig.name}`, description, url: `${siteConfig.url}/guide` },
};

const STEPS = [
  {
    step: 1,
    title: "목표 월 배당액 고르기",
    body: "먼저 매달 받고 싶은 배당액을 정합니다. 100만원 / 300만원 / 500만원 / 1,000만원 중 하나를 눌러도 되고, 원하는 금액이 없다면 '직접 입력' 칸에 만원 단위로 숫자만 입력하면 됩니다. 예를 들어 700만원을 원하면 '700'을 입력하세요.",
  },
  {
    step: 2,
    title: "투자 수단 선택하기",
    body: "커버드콜 ETF, 미국 배당성장 ETF(SCHD류), 국내 월배당 ETF, 은행 예금 중 하나를 선택합니다. 각 항목을 선택하면 예시 연 배당률이 자동으로 입력되며, 실제로 관심 있는 상품의 배당률을 알고 있다면 아래 '적용 배당률 직접 수정' 칸에서 숫자를 바꿀 수 있습니다.",
  },
  {
    step: 3,
    title: "계좌 종류 선택하기",
    body: "일반계좌, ISA, 연금저축 중 실제로 투자에 사용할(또는 사용할 예정인) 계좌 종류를 선택합니다. 계좌 종류에 따라 적용되는 세금 규칙이 달라지므로 결과 금액도 함께 바뀝니다.",
  },
  {
    step: 4,
    title: "결과 확인하기",
    body: "화면 아래에 필요한 시드머니가 세후 기준으로 바로 표시됩니다. 세전 기준과 세후 기준 금액을 비교하는 문장, 투자 수단별·계좌별 비교 막대그래프, 커버드콜 선택 시 주의 문구까지 함께 확인하세요.",
  },
  {
    step: 5,
    title: "결과 저장하고 공유하기",
    body: "결과 카드 아래 '결과 저장/공유하기' 버튼을 누르면 모바일에서는 공유 시트가 열리고, 지원하지 않는 환경에서는 요약 텍스트가 클립보드에 자동으로 복사됩니다. 화면을 그대로 캡처해서 저장해도 좋습니다.",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">사용법 가이드</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          <Link href="/calculators/monthly-dividend" className="text-accent-strong">
            월배당 인컴 계산기
          </Link>
          를 처음 쓰시는 분들을 위한 단계별 안내입니다.
        </p>
      </header>

      <AdSlot label="가이드 상단 광고" className="mb-8" />

      <ol className="space-y-8">
        {STEPS.map((s) => (
          <li key={s.step} className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {s.step}
              </span>
              <h2 className="text-base font-bold">{s.title}</h2>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted">{s.body}</p>
            <StepPreview step={s.step as 1 | 2 | 3 | 4 | 5} />
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-5 text-center">
        <p className="mb-3 text-sm text-muted">이제 직접 계산해볼 차례예요.</p>
        <Link
          href="/calculators/monthly-dividend"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white"
        >
          💰 월배당 인컴 계산기 열기
        </Link>
      </div>
    </div>
  );
}
