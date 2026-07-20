"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * GoatCounter 방문자 수 표시.
 * siteConfig.goatcounterCode가 비어 있으면 아무것도 렌더링하지 않습니다.
 * GoatCounter 설정에서 "Visitor counter" 공개 옵션이 켜져 있어야 숫자를 가져올 수 있어요.
 */
export function VisitorCounter() {
  const [today, setToday] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const code = siteConfig.goatcounterCode;
    if (!code) return;

    const base = `https://${code}.goatcounter.com/counter`;
    const todayStr = new Date().toISOString().slice(0, 10);

    fetch(`${base}/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.count_unique ?? d?.count) {
          setTotal(Number(String(d.count_unique ?? d.count).replace(/[^0-9]/g, "")));
        }
      })
      .catch(() => {});

    fetch(`${base}/TOTAL.json?start=${todayStr}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.count_unique ?? d?.count) {
          setToday(Number(String(d.count_unique ?? d.count).replace(/[^0-9]/g, "")));
        }
      })
      .catch(() => {});
  }, []);

  if (!siteConfig.goatcounterCode || (today === null && total === null)) return null;

  return (
    <p className="mt-2 text-xs tabular-nums text-muted/70">
      👀 오늘 {today !== null ? today.toLocaleString("ko-KR") : "-"}명 · 누적{" "}
      {total !== null ? total.toLocaleString("ko-KR") : "-"}명 방문
    </p>
  );
}
