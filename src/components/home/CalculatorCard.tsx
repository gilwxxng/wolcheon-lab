import Link from "next/link";
import type { CalculatorMeta } from "@/config/calculators";

export function CalculatorCard({ calculator }: { calculator: CalculatorMeta }) {
  const content = (
    <div
      className={`group flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors ${
        calculator.available ? "hover:border-accent/60 active:scale-[0.99]" : "opacity-60"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{calculator.emoji}</span>
        {!calculator.available && (
          <span className="rounded-full bg-surface-elevated px-2.5 py-1 text-xs text-muted">
            준비 중
          </span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-foreground">{calculator.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{calculator.description}</p>
      </div>
      {calculator.available && (
        <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-accent-strong">
          계산해보기
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      )}
    </div>
  );

  if (!calculator.available) {
    return content;
  }

  return (
    <Link href={`/calculators/${calculator.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
