"use client";

import { useMemo, useState } from "react";
import {
  BLEND_ETFS,
  BLEND_PRESETS,
  DEFAULT_BLEND,
} from "@/config/blend-etfs";
import {
  DEFAULT_MONTHLY_TARGET,
  MONTHLY_TARGET_PRESETS,
} from "@/config/investment-options";
import { ACCOUNT_TYPES, AccountType } from "@/config/tax-config";
import { grossAnnualFromNetTarget } from "@/lib/calculator";
import {
  formatKoreanCurrency,
  formatManwon,
  formatPercent,
  parseManwonInput,
} from "@/lib/format";
import { siteConfig } from "@/config/site";

function etfById(id: string) {
  return BLEND_ETFS.find((e) => e.id === id)!;
}

export function BlendForm() {
  const [monthlyTargetWon, setMonthlyTargetWon] = useState(DEFAULT_MONTHLY_TARGET);
  const [customInput, setCustomInput] = useState("");
  const [etfAId, setEtfAId] = useState(DEFAULT_BLEND.etfAId);
  const [etfBId, setEtfBId] = useState(DEFAULT_BLEND.etfBId);
  const [ratioA, setRatioA] = useState(DEFAULT_BLEND.ratioA);
  const [account, setAccount] = useState<AccountType>("general");

  const etfA = etfById(etfAId);
  const etfB = etfById(etfBId);

  const result = useMemo(() => {
    const wA = ratioA / 100;
    const wB = 1 - wA;
    const blendedYield = etfA.yieldRate * wA + etfB.yieldRate * wB;
    const targetAnnualNet = monthlyTargetWon * 12;
    const requiredGrossAnnual = grossAnnualFromNetTarget(targetAnnualNet, account);
    const seedAfterTax = blendedYield > 0 ? requiredGrossAnnual / blendedYield : 0;

    // 비율별 미니 비교표 (0/25/50/75/100)
    const ratioRows = [0, 25, 50, 75, 100].map((r) => {
      const y = etfA.yieldRate * (r / 100) + etfB.yieldRate * (1 - r / 100);
      return {
        ratioA: r,
        blendedYield: y,
        seed: y > 0 ? requiredGrossAnnual / y : 0,
      };
    });

    const coveredCallWeight =
      (etfA.category === "coveredCall" ? wA : 0) + (etfB.category === "coveredCall" ? wB : 0);

    return { blendedYield, seedAfterTax, ratioRows, coveredCallWeight };
  }, [monthlyTargetWon, etfA, etfB, ratioA, account]);

  function applyPreset(preset: (typeof BLEND_PRESETS)[number]) {
    setEtfAId(preset.etfAId);
    setEtfBId(preset.etfBId);
    setRatioA(preset.ratioA);
  }

  const maxSeed = Math.max(...result.ratioRows.map((r) => r.seed));

  return (
    <div>
      {/* Step 1: 목표 월 배당액 */}
      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">1</span>목표 월 배당액
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {MONTHLY_TARGET_PRESETS.map((preset) => {
            const active = monthlyTargetWon === preset && customInput === "";
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setMonthlyTargetWon(preset);
                  setCustomInput("");
                }}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {formatManwon(preset)}
              </button>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
          <span className="text-sm text-muted">직접 입력</span>
          <input
            inputMode="numeric"
            placeholder="예: 700"
            value={customInput}
            onChange={(e) => {
              setCustomInput(e.target.value);
              setMonthlyTargetWon(parseManwonInput(e.target.value));
            }}
            className="w-full bg-transparent text-right text-sm font-semibold text-foreground outline-none placeholder:text-muted/50"
          />
          <span className="text-sm text-muted">만원</span>
        </div>
      </section>

      {/* Step 2: 조합 선택 */}
      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">2</span>ETF 조합 만들기
        </h2>

        <p className="mb-2 text-xs text-muted">자주 언급되는 예시 조합으로 시작해보세요:</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {BLEND_PRESETS.map((preset) => {
            const active =
              preset.etfAId === etfAId && preset.etfBId === etfBId && preset.ratioA === ratioA;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-accent bg-accent/10 text-accent-strong"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          {(["A", "B"] as const).map((slot) => {
            const currentId = slot === "A" ? etfAId : etfBId;
            const setId = slot === "A" ? setEtfAId : setEtfBId;
            return (
              <div key={slot} className="rounded-xl border border-border bg-surface p-3.5">
                <p className="mb-2 text-xs font-bold text-muted">
                  ETF {slot} {slot === "A" ? `(비중 ${ratioA}%)` : `(비중 ${100 - ratioA}%)`}
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {BLEND_ETFS.map((etf) => {
                    const active = currentId === etf.id;
                    const disabled = (slot === "A" ? etfBId : etfAId) === etf.id;
                    return (
                      <button
                        key={etf.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => setId(etf.id)}
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                          active
                            ? "border-accent bg-accent/10"
                            : disabled
                              ? "cursor-not-allowed border-border bg-surface opacity-35"
                              : "border-border bg-surface hover:border-muted"
                        }`}
                      >
                        <span>
                          <span className="block text-xs font-semibold text-foreground">
                            {etf.ticker}{" "}
                            <span className="font-normal text-muted">{etf.name}</span>
                          </span>
                          <span className="block text-[11px] text-muted">{etf.note}</span>
                        </span>
                        <span
                          className={`shrink-0 pl-2 text-sm font-bold ${
                            active ? "text-accent-strong" : "text-muted"
                          }`}
                        >
                          {formatPercent(etf.yieldRate)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 비율 슬라이더 */}
        <div className="mt-3 rounded-xl border border-border bg-surface p-4">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span className="text-accent-strong">
              {etfA.ticker} {ratioA}%
            </span>
            <span className="text-muted">
              {etfB.ticker} {100 - ratioA}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={ratioA}
            onChange={(e) => setRatioA(Number(e.target.value))}
            className="w-full accent-[color:var(--accent)]"
            aria-label={`${etfA.ticker} 비중 (%)`}
          />
        </div>
      </section>

      {/* Step 3: 계좌 종류 */}
      <section>
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">3</span>계좌 종류
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {ACCOUNT_TYPES.map((acc) => {
            const active = account === acc.id;
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => setAccount(acc.id)}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {acc.shortLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* 결과 */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative bg-gradient-to-b from-accent/15 to-transparent px-5 pb-6 pt-7 text-center">
          <p className="text-sm font-medium text-muted">
            {etfA.ticker} {ratioA}% + {etfB.ticker} {100 - ratioA}% · 혼합 배당률{" "}
            <strong className="text-foreground">{formatPercent(result.blendedYield)}</strong>
          </p>
          <p className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            필요 시드
            <br />
            <span className="text-accent-strong">
              {formatKoreanCurrency(result.seedAfterTax)}
            </span>
          </p>
          <p className="mt-2 text-xs text-muted">
            월 {formatManwon(monthlyTargetWon)} 배당 · 세후 실수령 기준
          </p>
          <p className="pointer-events-none absolute bottom-2 right-3 text-[10px] tracking-wide text-muted/60">
            {siteConfig.name}
          </p>
        </div>

        <div className="space-y-7 px-5 py-6">
          {/* 비율별 비교 */}
          <section>
            <h3 className="mb-3 text-sm font-bold text-foreground">
              비율을 바꾸면 필요 시드가 어떻게 달라질까?
            </h3>
            <div className="space-y-3.5">
              {result.ratioRows.map((row) => {
                const active = row.ratioA === ratioA;
                const widthPercent =
                  maxSeed > 0 ? Math.max(4, Math.round((row.seed / maxSeed) * 100)) : 0;
                return (
                  <div key={row.ratioA}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                      <span className={active ? "font-bold text-foreground" : "text-muted"}>
                        {etfA.ticker} {row.ratioA}% + {etfB.ticker} {100 - row.ratioA}%
                        <span className="ml-1.5 text-xs text-muted">
                          {formatPercent(row.blendedYield)}
                        </span>
                      </span>
                      <span
                        className={`font-bold ${active ? "text-accent-strong" : "text-foreground"}`}
                      >
                        {formatKoreanCurrency(row.seed)}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                      <div
                        className={`h-full rounded-full ${active ? "bg-accent" : "bg-accent-strong/50"}`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 트레이드오프 안내 */}
          <div
            className={`rounded-xl border p-4 text-sm leading-relaxed ${
              result.coveredCallWeight >= 0.5
                ? "border-warning/40 bg-warning/10"
                : "border-border bg-surface-elevated/50"
            }`}
          >
            <p className="mb-1 font-bold text-foreground">
              ⚖️ 필요 시드가 적다고 무조건 좋은 조합은 아니에요
            </p>
            <p className="text-muted">
              배당률이 높은 커버드콜 비중을 올릴수록 필요 시드는 줄어들지만, 그만큼 원금(NAV)
              훼손 가능성과 상승장 수익 제한이라는 비용을 치르게 됩니다. 반대로 배당성장·지수형
              비중이 높으면 지금 필요한 시드는 커지지만 장기적으로 배당과 원금이 함께 성장할
              여지가 있습니다.
              {result.coveredCallWeight >= 0.5 && (
                <>
                  {" "}
                  현재 조합은 커버드콜 비중이{" "}
                  <strong className="text-warning">
                    {Math.round(result.coveredCallWeight * 100)}%
                  </strong>
                  로 높은 편이니 이 점을 특히 유의하세요.
                </>
              )}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-muted">
            표시된 티커와 배당률은 상품 유형을 설명하기 위한 예시이며 실시간 수치가 아닙니다. 본
            계산기는 일반적인 세율 가정에 기반한 시뮬레이션으로, 특정 상품 추천이나 투자 권유가
            아닙니다. 실제 투자 전 반드시 각 상품의 최신 배당률과 상품설명서를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
