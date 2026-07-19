import type { Metadata } from "next";
import { PortfolioForm } from "@/components/calculators/dividend-portfolio/PortfolioForm";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site";

const title = "배당 ETF 포트폴리오 시뮬레이터";
const description =
  "SCHD, JEPI, JEPQ, TIGER 미국배당다우존스 등 인기 배당 ETF를 직접 골라 비중을 조정하고, 현재 시드와 월 적립액을 입력하면 목표 월배당 달성까지 걸리는 기간을 세후 기준으로 시뮬레이션합니다. 비중 배분을 바꾼 변형 조합도 함께 비교해보세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculators/dividend-portfolio" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/calculators/dividend-portfolio`,
  },
};

export default function DividendPortfolioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-6">
        <p className="mb-1.5 text-sm font-semibold text-accent-strong">
          🧪 배당 포트폴리오 시뮬레이터
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          인기 배당 ETF로 내 조합 만들고,
          <br />
          목표까지 몇 년 걸리는지 확인하기
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          미국·국내 인기 배당 ETF 중에서 원하는 것들을 골라 비중을 조정해보세요. 현재 시드와 월
          적립액을 넣으면 목표 월배당 달성 시점을 세후 기준으로 계산하고, 비중만 바꾼 변형 조합과도
          비교해드려요.
        </p>
      </header>

      <PortfolioForm />

      <AdSlot label="계산기 하단 광고" className="my-8" />

      <div className="mt-12 space-y-8 border-t border-border pt-10 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            배당 ETF 포트폴리오는 왜 조합으로 짜나요?
          </h2>
          <p>
            배당 ETF는 크게 배당성장형(SCHD, TIGER 미국배당다우존스류), 고배당형(VYM류),
            커버드콜형(JEPI·JEPQ·QYLD류), 리츠형으로 나눌 수 있습니다. 배당성장형은 현재 배당률이
            연 3% 안팎으로 낮은 대신 시간이 지날수록 배당금 자체가 성장하고, 커버드콜형은 연
            8~12%의 높은 분배율로 당장의 현금흐름을 극대화하는 대신 원금 성장 여력을 일부
            포기합니다. 어느 한쪽에 몰아넣기보다 두 유형을 섞으면 &ldquo;지금 받는 배당&rdquo;과
            &ldquo;미래에 커질 배당&rdquo; 사이에서 자신의 투자 기간과 목표에 맞는 균형점을 찾을 수
            있습니다. 이 시뮬레이터는 인기 배당 ETF들을 직접 조합해보고, 그 조합이 내 목표에 어떤
            속도로 다가가는지 숫자로 확인해보는 도구입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            시뮬레이션은 어떤 가정으로 계산되나요?
          </h2>
          <p>
            이 계산기는 입력한 배당률이 변하지 않고, ETF 가격도 변동이 없으며, 받은 배당(세후)을
            전액 재투자하고 매달 적립액을 추가로 투자한다는 단순한 가정 위에서 월 단위로
            시뮬레이션합니다. 세금은 계좌 종류별로 일반계좌 15.4% 원천징수, ISA 일반형 비과세
            한도(200만원) 초과분 9.9% 분리과세, 연금저축 연금소득세 가정을 적용합니다. 실제
            시장에서는 분배율 변동, 가격 등락, 환율, 커버드콜 ETF의 NAV 훼손 등이 결과에 큰 영향을
            줄 수 있으므로, 시뮬레이션 결과는 &ldquo;방향을 잡기 위한 참고 수치&rdquo;로만
            활용하시기 바랍니다. 특히 커버드콜 비중이 높은 조합은 계산상 달성 기간이 짧게 나오지만,
            실제로는 원금 훼손으로 배당금이 함께 줄어드는 경우가 있어 계산보다 오래 걸릴 수
            있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            여기 있는 ETF가 추천 종목인가요?
          </h2>
          <p>
            아닙니다. 목록에 있는 ETF는 국내외 투자자들 사이에서 자주 언급되는 인기 상품군을
            유형별로 고른 예시이며, 월천연구소가 특정 상품의 매수를 추천하는 것이 아닙니다. 표시된
            배당률도 최근 공개 자료를 참고한 예시 수치로, 실시간 분배율과 다를 수 있습니다. 같은
            유형 안에서도 운용사·수수료·과세 방식(특히 미국 상장과 국내 상장의 차이)에 따라 실제
            수익이 달라지므로, 투자 전에는 반드시 각 운용사 공식 페이지에서 최신 분배율과
            상품설명서를 확인하시고, 필요하면 전문가와 상담하시기 바랍니다. 투자 판단과 그 결과에
            대한 책임은 투자자 본인에게 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
