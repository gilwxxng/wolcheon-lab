import type { Metadata } from "next";
import { BlendForm } from "@/components/calculators/etf-blend/BlendForm";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site";

const title = "ETF 조합 시뮬레이터 - SCHD+JEPI 비율별 계산";
const description =
  "SCHD+JEPI 같은 유명 ETF 조합을 비율별로 시뮬레이션합니다. 배당성장 ETF와 커버드콜 ETF를 어떤 비율로 섞을 때 혼합 배당률과 필요 시드머니가 어떻게 달라지는지, 세후 실수령 기준으로 비교해보세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculators/etf-blend" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/calculators/etf-blend`,
  },
};

export default function EtfBlendPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-6">
        <p className="mb-1.5 text-sm font-semibold text-accent-strong">🧪 ETF 조합 시뮬레이터</p>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          SCHD + JEPI,
          <br />
          어떤 비율로 섞으면 어떻게 될까?
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          배당성장형과 커버드콜형 ETF를 조합하면 배당률과 안정성 사이에서 균형을 잡을 수 있어요.
          비율 슬라이더를 움직이며 혼합 배당률과 필요 시드머니가 어떻게 변하는지 직접 확인해보세요.
        </p>
      </header>

      <BlendForm />

      <AdSlot label="계산기 하단 광고" className="my-8" />

      <div className="mt-12 space-y-8 border-t border-border pt-10 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            왜 배당성장 ETF와 커버드콜 ETF를 조합하나요?
          </h2>
          <p>
            배당성장 ETF(SCHD류)는 배당률 자체는 연 3%대로 높지 않지만, 기업 이익 성장에 따라
            배당금과 주가가 함께 커지는 것을 기대할 수 있는 유형입니다. 반면 커버드콜
            ETF(JEPI·JEPQ·QYLD류)는 옵션 프리미엄을 재원으로 월배당을 지급해 현재 시점의 현금흐름은
            훨씬 크지만, 상승장 수익이 제한되고 원금(NAV)이 서서히 줄어들 수 있다는 특성이
            있습니다. 그래서 많은 배당 투자자들이 &ldquo;지금의 현금흐름&rdquo;과 &ldquo;미래의
            성장&rdquo; 사이에서 균형을 잡기 위해 두 유형을 일정 비율로 섞는 전략을 이야기합니다.
            이 시뮬레이터는 그런 조합을 비율별로 직접 계산해볼 수 있게 만든 도구이며, 어떤 비율이
            정답이라고 제시하지는 않습니다. 목표 현금흐름, 투자 기간, 원금 보전에 대한 태도에 따라
            적절한 비율은 사람마다 다르기 때문입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            필요 시드가 적게 나오는 조합이 항상 유리한가요?
          </h2>
          <p>
            아닙니다. 같은 목표 월 배당액이라면 혼합 배당률이 높을수록 필요 시드는 기계적으로 작게
            계산됩니다. 커버드콜 비중을 100%로 올리면 필요 시드는 가장 적게 나오지만, 그만큼
            분배금의 재원이 옵션 프리미엄에 의존하게 되고 장기적으로 원금과 분배금이 함께 줄어들
            위험이 커집니다. 반대로 배당성장형 비중을 높이면 지금 당장 필요한 시드는 커지지만,
            시간이 지나며 배당금 자체가 성장해 실질 배당률이 올라가는 효과를 기대할 수 있습니다.
            즉 이 계산기의 결과는 &ldquo;현재 시점의 스냅샷&rdquo;일 뿐이며, 필요 시드 숫자만으로
            조합의 우열을 판단하기보다는 각 유형의 구조적 특성과 본인의 투자 기간을 함께 고려하는
            것이 중요합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">
            표시된 배당률은 실시간 수치인가요?
          </h2>
          <p>
            아닙니다. 이 시뮬레이터에 표시되는 티커와 배당률은 각 상품 유형을 설명하기 위한 예시
            수치이며, 실시간 시세나 최신 분배율이 아닙니다. 실제 ETF의 배당률은 시장 상황, 분배금
            정책, 환율 등에 따라 수시로 변하며, 같은 유형의 상품이라도 운용사와 전략에 따라 차이가
            있습니다. 또한 미국 상장 ETF에 직접 투자하는 경우 미국 원천징수세(배당 15%)와 국내
            과세 방식이 국내 상장 ETF와 다를 수 있어, 계좌 종류별 세금 효과도 상품에 따라 달라질
            수 있습니다. 실제 투자 판단 전에는 반드시 각 상품의 공식 페이지에서 최신 분배율을
            확인하고, 세금 관련 사항은 세무 전문가와 상담하시기 바랍니다.
          </p>
        </section>
      </div>
    </div>
  );
}
