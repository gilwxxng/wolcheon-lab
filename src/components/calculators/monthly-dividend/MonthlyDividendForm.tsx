"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_INVESTMENT_ID,
  DEFAULT_MONTHLY_TARGET,
  INVESTMENT_OPTIONS,
  MONTHLY_TARGET_PRESETS,
  InvestmentId,
} from "@/config/investment-options";
import { ACCOUNT_TYPES, AccountType } from "@/config/tax-config";
import { calculateMonthlyDividend } from "@/lib/calculator";
import { formatManwon, formatPercent, parseManwonInput } from "@/lib/format";
import { ResultPanel } from "./ResultPanel";

export function MonthlyDividendForm() {
  const [monthlyTargetWon, setMonthlyTargetWon] = useState(DEFAULT_MONTHLY_TARGET);
  const [customInput, setCustomInput] = useState("");
  const [investmentId, setInvestmentId] = useState<InvestmentId>(DEFAULT_INVESTMENT_ID);
  const [yieldRatePercent, setYieldRatePercent] = useState(
    () => Number((INVESTMENT_OPTIONS.find((o) => o.id === DEFAULT_INVESTMENT_ID)!.yieldRate * 100).toFixed(2))
  );
  const [account, setAccount] = useState<AccountType>("general");

  const yieldRate = Math.max(0, yieldRatePercent) / 100;

  const result = useMemo(
    () => calculateMonthlyDividend({ monthlyTargetWon, yieldRate, account }),
    [monthlyTargetWon, yieldRate, account]
  );

  function handlePresetClick(value: number) {
    setMonthlyTargetWon(value);
    setCustomInput("");
  }

  function handleCustomInputChange(value: string) {
    setCustomInput(value);
    setMonthlyTargetWon(parseManwonInput(value));
  }

  function handleInvestmentSelect(id: InvestmentId) {
    setInvestmentId(id);
    const option = INVESTMENT_OPTIONS.find((o) => o.id === id)!;
    setYieldRatePercent(Number((option.yieldRate * 100).toFixed(2)));
  }

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
                onClick={() => handlePresetClick(preset)}
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
            onChange={(e) => handleCustomInputChange(e.target.value)}
            className="w-full bg-transparent text-right text-sm font-semibold text-foreground outline-none placeholder:text-muted/50"
          />
          <span className="text-sm text-muted">만원</span>
        </div>
      </section>

      {/* Step 2: 투자 수단 */}
      <section className="mb-7">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          <span className="mr-1.5 text-accent-strong">2</span>투자 수단
        </h2>
        <div className="space-y-2">
          {INVESTMENT_OPTIONS.map((option) => {
            const active = investmentId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleInvestmentSelect(option.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-colors ${
                  active ? "border-accent bg-accent/10" : "border-border bg-surface"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {option.label}
                  </span>
                  <span className="block text-xs text-muted">{option.description}</span>
                </span>
                <span
                  className={`shrink-0 pl-3 text-base font-bold ${
                    active ? "text-accent-strong" : "text-muted"
                  }`}
                >
                  연 {formatPercent(option.yieldRate)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5">
          <span className="text-sm text-muted">적용 배당률(연) 직접 수정</span>
          <input
            inputMode="decimal"
            value={yieldRatePercent}
            onChange={(e) => setYieldRatePercent(Number(e.target.value.replace(/[^0-9.]/g, "")) || 0)}
            className="w-16 bg-transparent text-right text-sm font-semibold text-foreground outline-none"
          />
          <span className="text-sm text-muted">%</span>
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

      <ResultPanel
        result={result}
        monthlyTargetWon={monthlyTargetWon}
        investmentId={investmentId}
        yieldRate={yieldRate}
        account={account}
      />
    </div>
  );
}
