/**
 * 사용법 가이드용 미니 미리보기.
 *
 * 실제 화면 캡처 대신, 계산기와 같은 디자인 톤으로 각 단계의 상태를 그대로 재현한
 * 정적(비활성) 미리보기입니다. 실제 사이트 디자인이 바뀌면 이 컴포넌트도 함께 업데이트하세요.
 */
export function StepPreview({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
    </div>
  );
}

function Pill({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-lg border py-2 text-center text-xs font-semibold ${
        active ? "border-accent bg-accent text-white" : "border-border bg-surface text-muted"
      }`}
    >
      {children}
    </div>
  );
}

function Step1() {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-muted">1 목표 월 배당액</p>
      <div className="grid grid-cols-4 gap-1.5">
        <Pill>100만원</Pill>
        <Pill active>300만원</Pill>
        <Pill>500만원</Pill>
        <Pill>1,000만원</Pill>
      </div>
      <div className="mt-1.5 flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted">
        <span>직접 입력</span>
        <span className="font-semibold text-foreground">700 만원</span>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-muted">2 투자 수단</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
          <span className="text-xs text-foreground">커버드콜 ETF</span>
          <span className="text-xs font-bold text-muted">연 12.0%</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-accent bg-accent/10 px-3 py-2">
          <span className="text-xs font-semibold text-foreground">국내 월배당 ETF</span>
          <span className="text-xs font-bold text-accent-strong">연 6.0%</span>
        </div>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-muted">3 계좌 종류</p>
      <div className="grid grid-cols-3 gap-1.5">
        <Pill active>일반계좌</Pill>
        <Pill>ISA</Pill>
        <Pill>연금저축</Pill>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="text-center">
      <p className="text-xs text-muted">월 300만원 배당을 세후로 받으려면</p>
      <p className="mt-1 text-xl font-extrabold text-accent-strong">7억 922만원</p>
      <div className="mx-auto mt-3 max-w-[220px] rounded-lg bg-positive/10 px-3 py-2 text-left text-[11px] text-positive">
        ⚡ 국내 월배당 + 연금저축 조합이 최적이에요
      </div>
      <div className="mt-3 space-y-1.5 text-left">
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
          <div className="h-full w-[85%] rounded-full bg-accent-strong/70" />
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
          <div className="h-full w-[50%] rounded-full bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="text-center">
      <div className="rounded-lg bg-accent py-2.5 text-xs font-bold text-white">
        결과가 복사되었어요 ✓
      </div>
      <p className="mt-2 text-[11px] text-muted">
        모바일에서는 공유 시트가 열리고, 지원하지 않으면 자동으로 클립보드에 복사돼요.
      </p>
    </div>
  );
}
