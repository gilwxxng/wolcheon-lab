import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const title = "개인정보처리방침";
const description = "월천연구소의 개인정보처리방침과 구글 애드센스·쿠키 이용 안내입니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">개인정보처리방침</h1>
        <p className="mt-2 text-xs text-muted">시행일: 2026년 7월 20일</p>
      </header>

      <div className="space-y-7 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">1. 수집하는 개인정보</h2>
          <p>
            {siteConfig.name}(이하 &ldquo;사이트&rdquo;)은 회원가입, 로그인 기능을 운영하지
            않으며, 계산기 이용을 위해 이름·이메일·연락처 등 개인을 식별할 수 있는 정보를 별도로
            수집하지 않습니다. 계산기에 입력하는 목표 배당액, 배당률, 계좌 종류 등의 정보는
            사용자의 브라우저 내에서만 계산에 사용되며 서버로 전송되거나 저장되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">2. 자동 수집 정보 및 쿠키</h2>
          <p>
            사이트는 서비스 운영 및 트래픽 분석을 위해 접속 기기 정보, 방문 페이지, 접속 시간 등
            비식별 통계 정보를 자동으로 수집할 수 있으며, 이 과정에서 쿠키(cookie)가 사용될 수
            있습니다. 쿠키는 브라우저 설정에서 언제든 거부하거나 삭제할 수 있으며, 쿠키를
            거부하더라도 계산기 이용에는 제한이 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">3. 구글 애드센스 및 광고 쿠키</h2>
          <p>
            사이트는 구글 애드센스(Google AdSense)를 통해 광고를 게재할 수 있습니다. 구글을
            포함한 제3자 광고 공급자는 사용자의 이전 방문 기록을 바탕으로 맞춤형 광고를
            제공하기 위해 쿠키를 사용할 수 있습니다. 구글이 광고 쿠키를 사용함으로써 사이트 및
            다른 사이트 방문에 기반해 사용자에게 광고를 게재할 수 있으며, 사용자는 구글 광고 설정
            페이지(adssettings.google.com)에서 맞춤 광고를 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">4. 개인정보의 보유 및 이용 기간</h2>
          <p>
            사이트는 개인을 식별할 수 있는 정보를 별도로 수집·저장하지 않으므로, 관련 보유
            기간이 발생하지 않습니다. 자동 수집되는 비식별 통계 정보는 서비스 개선 목적 범위
            내에서만 활용됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">5. 제3자 제공 및 위탁</h2>
          <p>
            사이트는 이용자의 개인정보를 별도로 제3자에게 제공하지 않습니다. 다만 광고 게재를
            위해 구글 애드센스 등 외부 광고 서비스가 자체적으로 쿠키 기반 정보를 수집·이용할 수
            있으며, 이는 각 서비스 제공자의 개인정보처리방침을 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">6. 이용자의 권리</h2>
          <p>
            이용자는 언제든지 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.
            사이트 운영과 관련해 문의하고 싶은 사항이 있다면 사이트 내 문의 경로를 통해 연락해
            주시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-foreground">7. 고지의 의무</h2>
          <p>
            이 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며, 변경 시 사이트를
            통해 공지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
