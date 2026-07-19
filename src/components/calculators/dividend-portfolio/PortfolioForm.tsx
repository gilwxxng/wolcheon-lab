"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  DEFAULT_PORTFOLIO,
  DIVIDEND_ETFS,
  MARKET_LABELS,
  MAX_PORTFOLIO_SIZE,
  EtfMarket,
} from "@/config/dividend-etfs";
import { MONTHLY_TARGET_PRESETS } from "@/config/investment-options";
import { ACCOUNT_TYPES, AccountType } from "@/config/tax-config";
import {
  blendedYieldOf,
  buildVariants,
  categoryWeights,
  formatMonths,
  normalizePortfolio,
  PortfolioItem,
  simulatePortfolio,
} from "@/lib/portfolio";
import {
  formatKoreanCurrency,
  formatManwon,
  formatPercent,
  parseManwonInput,
} from "@/lib/format";
import { siteConfig } from "@/config/site";

const DEFAULT_TARGET = 3_000_000;
const DEFAULT_SEED = 50_000_000;
const DEFAULT_MONTHLY = 1_000_000;

export function PortfolioForm() {
  const [targetMonthlyWon, setTargetMonthlyWon] = useState(DEFAULT_TARGET);
  const [targetInput, setTargetInput] = useState("");
  const [seedInput, setSeedInput] = useState(String(DEFAULT_SEED / 10_000));
  const [monthlyInput, setMonthlyInput] = useState(String(DEFAULT_MONTHLY / 10_000));
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO);
  const [account, setAccount] = useState<AccountType>("general");

  const seedWon = parseManwonInput(seedInput);
  const monthlyContributionWon = parseManwonInput(monthlyInput);

  const normalized = useMemo(() => normalizePortfolio(portfolio), [portfolio]);
  const blendedYield = useMemo(() => blendedYieldOf(normalized), [normalized]);
  const catWeights = useMemo(() => categoryWeights(normalized), [normalized]);
  const coveredCallPercent = catWeights.coveredCall ?? 0;

  const sim = useMemo(
    () =>
      simulatePortfolio({
        seedWon,
        monthlyContributionWon,
        targetMonthlyWon,
        blendedYield,
        account,
      }),
    [seedWon, monthlyContributionWon, targetMonthlyWon, blendedYield, account]
  );

  const variants = useMemo(
    () =>
      buildVariants(portfolio, {
        seedWon,
        monthlyContributionWon,
        targetMonthlyWon,
        account,
      }),
    [portfolio, seedWon, monthlyContributionWon, targetMonthlyWon, account]
  );

  function toggleEtf(etfId: string) {
    setPortfolio((prev) => {
      const exists = prev.find((p) => p.etfId === etfId);
      if (exists) return prev.filter((p) => p.etfId !== etfId);
      if (prev.length >= MAX_PORTFOLIO_SIZE) return prev;
      return [...prev, { etfId, weight: 50 }];
    });
  }

  function setWeight(etfId: string, weight: number) {
    setPortfolio((prev) => prev.map((p) => (p.etfId === etfId ? { ...p, weight } : p)));
  }

  const markets: EtfMarket[] = ["us", "kr"];
  const achievementPercent = Math.min(100, Math.round(sim.achievementRate * 100));

  return (
    <div>
      {/* Step 1: 목표 월 배당액 */}
      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">1</span>목표 월 배당액 (세후)
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {MONTHLY_TARGET_PRESETS.map((preset) => {
            const active = targetMonthlyWon === preset && targetInput === "";
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setTargetMonthlyWon(preset);
                  setTargetInput("");
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
          <span className="shrink-0 text-sm text-muted">직접 입력</span>
          <input
            inputMode="numeric"
            placeholder="예: 700"
            value={targetInput}
            onChange={(e) => {
              setTargetInput(e.target.value);
              setTargetMonthlyWon(parseManwonInput(e.target.value));
            }}
            className="w-full bg-transparent text-right text-sm font-semibold text-foreground outline-none placeholder:text-muted/50"
          />
          <span className="shrink-0 text-sm text-muted">만원</span>
        </div>
      </section>

      {/* Step 2: 현재 시드 & 월 적립액 */}
      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">2</span>현재 시드 & 월 적립액
        </h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <label className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
            <span className="shrink-0 text-sm text-muted">현재 시드</span>
            <input
              inputMode="numeric"
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
              className="w-full bg-transparent text-right text-sm font-semibold text-foreground outline-none"
            />
            <span className="shrink-0 text-sm text-muted">만원</span>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
            <span className="shrink-0 text-sm text-muted">월 적립액</span>
            <input
              inputMode="numeric"
              value={monthlyInput}
              onChange={(e) => setMonthlyInput(e.target.value)}
              className="w-full bg-transparent text-right text-sm font-semibold text-foreground outline-none"
            />
            <span className="shrink-0 text-sm text-muted">만원</span>
          </label>
        </div>
      </section>

      {/* Step 3: ETF 선택 */}
      <section className="mb-7">
        <h2 className="mb-1 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">3</span>배당 ETF 고르기
        </h2>
        <p className="mb-3 text-xs text-muted">
          최대 {MAX_PORTFOLIO_SIZE}개까지 선택할 수 있어요. ({portfolio.length}/
          {MAX_PORTFOLIO_SIZE}) 배당률은 최근 공개 자료 기준 예시이며 실시간이 아닙니다.
        </p>

        {markets.map((market) => (
          <div key={market} className="mb-3">
            <p className="mb-1.5 text-xs font-bold text-muted">{MARKET_LABELS[market]}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {DIVIDEND_ETFS.filter((e) => e.market === market).map((etf) => {
                const selected = portfolio.some((p) => p.etfId === etf.id);
                const full = !selected && portfolio.length >= MAX_PORTFOLIO_SIZE;
                return (
                  <button
                    key={etf.id}
                    type="button"
                    disabled={full}
                    onClick={() => toggleEtf(etf.id)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                      selected
                        ? "border-accent bg-accent/10"
                        : full
                          ? "cursor-not-allowed border-border bg-surface opacity-35"
                          : "border-border bg-surface hover:border-muted"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-foreground">
                        {selected ? "✓ " : ""}
                        {etf.ticker}
                        <span className="ml-1.5 rounded bg-surface-elevated px-1 py-0.5 text-[10px] font-normal text-muted">
                          {CATEGORY_LABELS[etf.category]} · {etf.payCycle}배당
                        </span>
                      </span>
                      <span className="block truncate text-[11px] text-muted">{etf.note}</span>
                    </span>
                    <span
                      className={`shrink-0 pl-2 text-sm font-bold ${
                        selected ? "text-accent-strong" : "text-muted"
                      }`}
                    >
                      {formatPercent(etf.yieldRate)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* 비중 조정 */}
        {normalized.length >= 1 && (
          <div className="mt-4 rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 text-xs font-bold text-muted">
              비중 조정 (슬라이더를 움직이면 자동으로 100% 기준으로 환산돼요)
            </p>
            <div className="space-y-3">
              {portfolio.map((item) => {
                const norm = normalized.find((n) => n.etf.id === item.etfId);
                if (!norm) return null;
                return (
                  <div key={item.etfId}>
                    <div className="mb-1 flex items-baseline justify-between text-sm">
                      <span className="truncate pr-2 font-medium text-foreground">
                        {norm.etf.ticker}
                      </span>
                      <span className="shrink-0 font-bold text-accent-strong">
                        {norm.weightPercent.toFixed(0)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={item.weight}
                      onChange={(e) => setWeight(item.etfId, Number(e.target.value))}
                      className="w-full accent-[color:var(--accent)]"
                      aria-label={`${norm.etf.ticker} 비중`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Step 4: 계좌 종류 */}
      <section>
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">4</span>계좌 종류
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
      {normalized.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
          위에서 배당 ETF를 1개 이상 선택하면 결과가 표시돼요.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative bg-gradient-to-b from-accent/15 to-transparent px-5 pb-6 pt-7 text-center">
            <p className="text-sm font-medium text-muted">
              내 조합 혼합 배당률{" "}
              <strong className="text-foreground">{formatPercent(blendedYield)}</strong> · 월{" "}
              {formatManwon(targetMonthlyWon)} 목표
            </p>
            <p className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
              목표 달성까지
              <br />
              <span className="text-accent-strong">{formatMonths(sim.monthsToGoal)}</span>
            </p>
            <p className="mt-2 text-xs text-muted">
              현재 시드 {formatKoreanCurrency(seedWon)} + 월 {formatManwon(monthlyContributionWon)}{" "}
              적립 · 배당 전액 재투자 가정 · 세후 기준
            </p>
            <p className="pointer-events-none absolute bottom-2 right-3 text-[10px] tracking-wide text-muted/60">
              {siteConfig.name}
            </p>
          </div>

          <div className="space-y-7 px-5 py-6">
            {/* 내 조합 구성 */}
            <section>
              <h3 className="mb-3 text-sm font-bold text-foreground">내 조합 구성</h3>
              <div className="mb-2 flex h-3 w-full overflow-hidden rounded-full">
                {normalized.map((n, i) => (
                  <div
                    key={n.etf.id}
                    className={i % 2 === 0 ? "bg-accent" : "bg-accent-strong/60"}
                    style={{ width: `${n.weightPercent}%` }}
                    title={`${n.etf.ticker} ${n.weightPercent.toFixed(0)}%`}
                  />
                ))}
              </div>
              <ul className="space-y-1 text-sm">
                {normalized.map((n) => (
                  <li key={n.etf.id} className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-muted">
                      {n.etf.ticker}{" "}
                      <span className="text-xs">({CATEGORY_LABELS[n.etf.category]})</span>
                    </span>
                    <span className="shrink-0 font-semibold text-foreground">
                      {n.weightPercent.toFixed(0)}% · {formatPercent(n.etf.yieldRate)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 현재 상태 */}
            <section>
              <h3 className="mb-3 text-sm font-bold text-foreground">지금 이 조합이면</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-surface-elevated p-3.5">
                  <p className="text-xs text-muted">현재 세후 월배당</p>
                  <p className="mt-1 text-lg font-extrabold text-foreground">
                    {formatKoreanCurrency(sim.currentNetMonthly)}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-3.5">
                  <p className="text-xs text-muted">목표까지 필요한 시드</p>
                  <p className="mt-1 text-lg font-extrabold text-foreground">
                    {formatKoreanCurrency(sim.requiredSeed)}
                  </p>
                </div>
              </div>
              <div className="mt-2.5">
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>목표 달성률</span>
                  <span className="font-bold text-accent-strong">{achievementPercent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.max(2, achievementPercent)}%` }}
                  />
                </div>
              </div>
            </section>

            {/* 마일스톤 */}
            <section>
              <h3 className="mb-3 text-sm font-bold text-foreground">
                이대로 가면 월배당이 이렇게 커져요
              </h3>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {sim.milestones.map((m) => (
                  <div key={m.years} className="rounded-lg bg-surface-elevated px-1 py-2.5">
                    <p className="text-[11px] text-muted">{m.years}년 후</p>
                    <p className="mt-0.5 text-xs font-bold text-foreground">
                      {formatKoreanCurrency(m.netMonthly)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                * 배당률 고정, 가격 변동 없음, 세후 배당 전액 재투자 + 월 적립 가정의 단순
                시뮬레이션입니다.
              </p>
            </section>

            {/* 변형 조합 비교 */}
            {variants.length > 0 && (
              <section>
                <h3 className="mb-1 text-sm font-bold text-foreground">
                  같은 ETF, 비중만 바꾸면?
                </h3>
                <p className="mb-3 text-xs text-muted">
                  지금 고른 ETF 안에서 비중 배분만 달리한 3가지 변형이에요. 더 나은 조합이 있는지
                  비교해보세요.
                </p>
                <div className="space-y-2">
                  {variants.map((v) => (
                    <div
                      key={v.label}
                      className="rounded-xl border border-border bg-surface-elevated/50 p-3.5"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold text-foreground">{v.label}</span>
                        <span className="shrink-0 text-xs text-muted">
                          혼합 {formatPercent(v.blendedYield)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted">
                        {v.items
                          .map((x) => `${x.etf.ticker} ${x.weightPercent.toFixed(0)}%`)
                          .join(" + ")}
                      </p>
                      <div className="mt-1.5 flex justify-between text-xs">
                        <span className="text-muted">
                          필요 시드{" "}
                          <strong className="text-foreground">
                            {formatKoreanCurrency(v.requiredSeed)}
                          </strong>
                        </span>
                        <span className="text-muted">
                          달성{" "}
                          <strong className="text-accent-strong">
                            {formatMonths(v.monthsToGoal)}
                          </strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 커버드콜 경고 */}
            {coveredCallPercent >= 50 && (
              <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed">
                <p className="mb-1 font-bold text-warning">
                  ⚠ 커버드콜 비중 {Math.round(coveredCallPercent)}%
                </p>
                <p className="text-muted">
                  달성 기간은 짧아지지만, 커버드콜은 원금(NAV)이 서서히 줄어들 수 있고 상승장
                  수익이 제한됩니다. 이 시뮬레이션은 가격 변동과 NAV 훼손을 반영하지 않으므로,
                  커버드콜 비중이 높을수록 실제 결과는 계산보다 나빠질 가능성이 커요.
                </p>
              </div>
            )}

            <p className="text-xs leading-relaxed text-muted">
              표시된 티커·배당률은 인기 상품군을 시뮬레이션하기 위한 예시이며 실시간 수치가
              아닙니다. 본 계산기는 특정 상품 추천이나 투자 권유가 아니며, 실제 투자 전 반드시 각
              상품의 최신 분배율·상품설명서를 확인하세요. 미국 상장 ETF는 미국 원천징수세 등 과세
              방식이 국내 상장과 달라 계좌별 세금 효과가 다를 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
