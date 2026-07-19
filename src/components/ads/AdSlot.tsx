/**
 * 구글 애드센스 광고 자리 컴포넌트.
 *
 * 애드센스 심사 통과 후 아래 두 곳에 발급받은 ID를 넣으면 실제 광고가 노출됩니다.
 * 1) src/app/layout.tsx <head> 안의 애드센스 스크립트 주석 해제 + client ID 입력
 * 2) 이 파일의 ADSENSE_CLIENT_ID / slot prop으로 넘기는 슬롯 ID
 *
 * 심사 전에는 레이아웃만 차지하는 빈 자리로 표시됩니다 (레이아웃 흔들림 방지).
 */

const ADSENSE_CLIENT_ID = ""; // 예: "ca-pub-1234567890123456"

export function AdSlot({
  slot,
  label = "광고",
  className = "",
}: {
  slot?: string;
  label?: string;
  className?: string;
}) {
  if (!ADSENSE_CLIENT_ID) {
    return (
      <div
        className={`flex min-h-[100px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface/40 text-xs text-muted ${className}`}
        aria-hidden="true"
      >
        {label} 영역 (애드센스 승인 후 노출)
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
