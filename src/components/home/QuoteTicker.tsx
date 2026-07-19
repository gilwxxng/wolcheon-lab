"use client";

import { useEffect, useState } from "react";
import { MASTER_QUOTES } from "@/config/master-quotes";

const ROTATE_MS = 7000;

export function QuoteTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MASTER_QUOTES.length);
        setVisible(true);
      }, 350);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const quote = MASTER_QUOTES[index];

  return (
    <div className="rounded-2xl border border-border bg-surface/70 px-4 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wide text-accent-strong">
          💬 투자 대가의 한마디
        </p>
        <p className="text-[10px] tabular-nums text-muted/60">
          {index + 1} / {MASTER_QUOTES.length}
        </p>
      </div>
      <div
        className={`transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0"
        }`}
        // 명언이 바뀔 때 스크린리더가 다시 읽지 않도록 장식적 컨텐츠로 처리
        aria-live="off"
      >
        <p className="text-sm font-medium italic leading-relaxed text-foreground">
          &ldquo;{quote.en}&rdquo;
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">&ldquo;{quote.kr}&rdquo;</p>
        <p className="mt-2 text-xs text-muted/80">
          — <span className="font-semibold text-foreground/90">{quote.authorKr}</span>{" "}
          <span className="text-muted/60">
            ({quote.author}) · {quote.title}
          </span>
        </p>
      </div>
    </div>
  );
}
