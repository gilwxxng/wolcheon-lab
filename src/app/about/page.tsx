import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const title = "소개";
const description = "월천연구소가 세후 실수령 기준으로 계산기를 만드는 이유와 운영 철학을 소개합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} | ${siteConfig.name}`, description, url: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {siteConfig.name} 소개
        </h1>
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">만든 목적</h2>
          <p>
            &ldquo;월 배당 300만원&rdquo;, &ldquo;월 천만원 파이프라인&rdquo; 같은 목표는 유튜브와
            SNS에서 쉽게 접할 수 있지만, 대부분의 계산은 세전 배당률만 단순하게 곱한 숫자입니다.
            실제로 통장에 들어오는 돈은 세금을 뗀 금액이고, 어떤 계좌에 어떤 상품을 담느냐에 따라
            그 차이가 생각보다 큽니다. 월천연구소는 이 간극을 메우기 위해, 처음부터 끝까지
            &ldquo;세후 실수령&rdquo; 기준으로 계산하는 재테크 계산기를 만들고 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">운영 철학</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>특정 금융상품을 추천하거나 투자를 권유하지 않습니다.</li>
            <li>
              모든 세율·한도 가정은 투명하게 공개하며, 결과 화면에서 언제든 펼쳐볼 수 있게
              합니다.
            </li>
            <li>세법이 바뀌면 계산 로직도 최대한 빠르게 업데이트합니다.</li>
            <li>복잡한 재테크 계산을 모바일에서도 3번의 탭만으로 끝낼 수 있게 만듭니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">운영 방식</h2>
          <p>
            월천연구소는 로그인이나 회원가입 없이 누구나 바로 사용할 수 있으며, 모든 계산은
            사용자의 브라우저에서 직접 실행됩니다. 입력한 정보는 서버로 전송되거나 저장되지
            않습니다. 사이트 운영은 광고 수익으로 유지되며, 광고가 계산 결과의 공정성에 영향을
            주지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">문의</h2>
          <p>
            계산기 개선 제안이나 오류 제보는 언제든 환영합니다. 새로운 계산기 아이디어가 있다면
            편하게 알려주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
