"use client";

import { useState } from "react";
import { ACCOUNT_TYPES, AccountType, TAX_CONFIG, COMPREHENSIVE_TAX_NOTICE } from "@/config/tax-config";
import type { InvestmentId } from "@/config/investment-options";
import type { MonthlyDividendResult } from "@/lib/calculator";
import { formatKoreanCurrency, formatManwon, formatPercent } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { ComparisonBar } from "./ComparisonBar";

export function ResultPanel({
  result,
  monthlyTargetWon,
  investmentId,
  yieldRate,
  account,
}: {
  result: MonthlyDividendResult;
  monthlyTargetWon: number;
  investmentId: InvestmentId;
  yieldRate: number;
  account: AccountType;
}) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle");
  const maxSeed = Math.max(...result.investmentComparison.map((r) => r.requiredSeed));
  const maxAccountNet = Math.max(...result.accountComparison.map((r) => r.netAnnual));

  const bestInvestment = result.investmentComparison.find((r) => r.id === result.bestInvestmentId)!;
  const bestAccount = result.accountComparison.find((r) => r.id === result.bestAccountId)!;

  const summaryText = [
    `[${siteConfig.name}] 월 ${formatManwon(monthlyTargetWon)} 배당 시뮬레이션`,
    `세후 기준 필요 시드: ${formatKoreanCurrency(result.seedAfterTax)}`,
    `(연 배당률 ${formatPercent(yieldRate)}, ${TAX_CONFIG[account === "isa" ? "isa" : account].label} 기준)`,
    siteConfig.url,
  ].join("\n");

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: siteConfig.name, text: summaryText, url: siteConfig.url });
        setShareStatus("shared");
        return;
      } catch {
        // 사용자가 공유를 취소한 경우 등은 클립보드 복사로 대체
      }
    }
    try {
      await navigator.clipboard.writeText(summaryText);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      setShareStatus("idle");
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
      {/* 스크린샷용 핵심 결과 카드 */}
      <div className="relative bg-gradient-to-b from-accent/15 to-transparent px-5 pb-6 pt-7 text-center">
        <p className="text-sm font-medium text-muted">
          월 {formatManwon(monthlyTargetWon)} 배당을 세후로 받으려면
        </p>
        <p className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          필요 시드
          <br />
          <span className="text-accent-strong">{formatKoreanCurrency(result.seedAfterTax)}</span>
        </p>

        <div className="mx-auto mt-4 max-w-sm rounded-xl bg-surface-elevated px-4 py-3 text-sm leading-relaxed">
          세전 기준이면{" "}
          <strong className="text-foreground">{formatKoreanCurrency(result.seedBeforeTax)}</strong>
          이지만, 세금 반영 시{" "}
          <strong className="text-accent-strong">{formatKoreanCurrency(result.seedAfterTax)}</strong>이
          필요합니다.
        </div>

        <p className="pointer-events-none absolute bottom-2 right-3 text-[10px] tracking-wide text-muted/60">
          {siteConfig.name}
        </p>
      </div>

      <div className="space-y-7 px-5 py-6">
        {/* 실시간 최적 조합 하이라이트 */}
        <div className="rounded-xl border border-positive/30 bg-positive/10 p-4 text-sm leading-relaxed">
          <p className="font-bold text-positive">⚡ 지금 입력 기준 최적 조합</p>
          <p className="mt-1 text-foreground">
            <strong>{bestInvestment.shortLabel}</strong> + <strong>{bestAccount.shortLabel}</strong>{" "}
            조합일 때 필요 시드가 가장 적어요.
          </p>
          <p className="mt-1.5 text-xs text-muted">
            * 지금 화면에 있는 4개 투자수단·3개 계좌 조합 중 계산상 가장 효율적인 조합이며, 특정
            상품을 추천하는 것이 아닙니다. 배당률이 높을수록 필요 시드는 작게 계산되지만 원금 변동
            등 위험도 함께 커질 수 있으니 아래 비교와 주의사항을 함께 확인하세요.
          </p>
        </div>

        {/* 투자 수단별 비교 */}
        <section>
          <h3 className="mb-3 text-sm font-bold text-foreground">
            같은 목표, 투자 수단별 필요 시드 비교
          </h3>
          <div className="space-y-3.5">
            {result.investmentComparison.map((row) => (
              <ComparisonBar
                key={row.id}
                label={row.shortLabel}
                sublabel={formatPercent(row.yieldRate)}
                value={row.requiredSeed}
                maxValue={maxSeed}
                muted={row.isReferenceOnly}
                highlight={row.id === investmentId}
                isBest={row.id === result.bestInvestmentId}
              />
            ))}
          </div>
        </section>

        {investmentId === "coveredCall" && (
          <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed text-foreground">
            <p className="mb-1 font-bold text-warning">⚠ 높은 배당률의 함정</p>
            <p>
              커버드콜은 분배금이 높은 대신 기초자산 상승분을 옵션 매도로 포기하는 구조라
              원금(NAV)이 시간이 지나며 줄어들 수 있고, 강한 상승장에서는 수익이 제한됩니다. 배당률만
              보고 판단하지 말고 NAV 추이도 함께 확인하세요.
            </p>
          </div>
        )}

        {/* 계좌별 비교 */}
        <section>
          <h3 className="mb-3 text-sm font-bold text-foreground">
            같은 조건, 계좌 종류별 연간 실수령 비교
          </h3>
          <div className="space-y-3.5">
            {result.accountComparison.map((row) => (
              <ComparisonBar
                key={row.id}
                label={row.shortLabel}
                value={row.netAnnual}
                maxValue={maxAccountNet}
                highlight={row.id === account}
                isBest={row.id === result.bestAccountId}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            * 세후 기준으로 계산된 시드({formatKoreanCurrency(result.seedAfterTax)})를 동일하게
            투자했을 때, 계좌 종류에 따라 실제로 받는 연간 금액입니다.
          </p>
        </section>

        {/* 공유 버튼 */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full rounded-xl bg-accent py-3 text-sm font-bold text-white active:scale-[0.99]"
        >
          {shareStatus === "copied"
            ? "결과가 복사되었어요 ✓"
            : shareStatus === "shared"
              ? "공유했어요 ✓"
              : "📤 결과 저장/공유하기"}
        </button>

        {/* 적용된 세금 가정 */}
        <details className="rounded-xl border border-border bg-surface-elevated/50 p-4 text-sm">
          <summary className="cursor-pointer font-bold text-foreground">
            적용된 세금 가정 자세히 보기
          </summary>
          <ul className="mt-3 space-y-2 text-muted">
            {ACCOUNT_TYPES.map((acc) => (
              <li key={acc.id}>
                <strong className="text-foreground">{acc.label}:</strong>{" "}
                {TAX_CONFIG[acc.id].assumptionText}
              </li>
            ))}
          </ul>
        </details>

        <p className="rounded-xl bg-surface-elevated/50 p-3 text-xs leading-relaxed text-muted">
          {COMPREHENSIVE_TAX_NOTICE}
        </p>

        <p className="text-xs leading-relaxed text-muted">
          본 계산기는 일반적인 세율 가정에 기반한 시뮬레이션이며, 개인별 상황에 따라 달라질 수
          있습니다. 특정 상품 추천이나 투자 권유가 아닙니다.
        </p>
      </div>
    </div>
  );
}
