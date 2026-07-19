import { formatKoreanCurrency } from "@/lib/format";

export function ComparisonBar({
  label,
  sublabel,
  value,
  maxValue,
  highlight,
  muted,
}: {
  label: string;
  sublabel?: string;
  value: number;
  maxValue: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  const widthPercent = maxValue > 0 ? Math.max(4, Math.round((value / maxValue) * 100)) : 0;

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className={`font-medium ${muted ? "text-muted" : "text-foreground"}`}>
          {label}
          {sublabel && <span className="ml-1.5 text-xs text-muted">{sublabel}</span>}
        </span>
        <span className={`font-bold ${highlight ? "text-accent-strong" : "text-foreground"}`}>
          {formatKoreanCurrency(value)}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div
          className={`h-full rounded-full ${
            muted ? "bg-muted/50" : highlight ? "bg-accent" : "bg-accent-strong/70"
          }`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}
