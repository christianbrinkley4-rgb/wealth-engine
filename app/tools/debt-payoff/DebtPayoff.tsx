"use client";

import { useState } from "react";

import { money, monthsLabel, simulatePayoff } from "@/lib/wealth/math";
import { debtRiskScenarios } from "@/lib/wealth/risk";

import { AssumptionBox, CopyNumbersButton, MoneyField, Stat } from "../_components/tool-shared";
import { DEBT_PAYOFF_SAMPLE_DEBTS, DEBT_PAYOFF_SAMPLE_EXTRA } from "../_components/share-card-data";
import { ShareResultButton } from "../_components/share-card";
import { RiskSection } from "../_components/risk-section";

type DebtInput = {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
};

const SAMPLE_DEBTS: DebtInput[] = DEBT_PAYOFF_SAMPLE_DEBTS.map((debt) => ({ ...debt }));

let nextId = 100;

export function DebtPayoff() {
  const [debts, setDebts] = useState<DebtInput[]>(SAMPLE_DEBTS);
  const [extra, setExtra] = useState(DEBT_PAYOFF_SAMPLE_EXTRA);

  const update = (id: string, patch: Partial<DebtInput>) =>
    setDebts((prev) => prev.map((debt) => (debt.id === id ? { ...debt, ...patch } : debt)));

  const addDebt = () => {
    nextId += 1;
    setDebts((prev) => [
      ...prev,
      { id: String(nextId), name: "New debt", balance: 0, apr: 0, minPayment: 0 },
    ]);
  };

  const removeDebt = (id: string) => setDebts((prev) => prev.filter((debt) => debt.id !== id));

  const live = debts.map((debt) => ({ ...debt }));
  const avalanche = simulatePayoff(live, extra, "avalanche");
  const snowball = simulatePayoff(live, extra, "snowball");

  const interestSaved = snowball.totalInterest - avalanche.totalInterest;
  const winner: "avalanche" | "snowball" | "tie" =
    Math.abs(interestSaved) < 1 ? "tie" : interestSaved > 0 ? "avalanche" : "snowball";
  const sharePlan = winner === "snowball" ? snowball : avalanche;
  const riskStrategy = winner === "snowball" ? "snowball" : "avalanche";
  const debtRisk = debtRiskScenarios({ debts: live, extra, strategy: riskStrategy });

  const summary = [
    "Debt payoff: my numbers",
    ...debts.map(
      (d) => `- ${d.name}: ${money(d.balance)} at ${d.apr}% APR, ${money(d.minPayment)} minimum`,
    ),
    `Extra payment: ${money(extra)} a month`,
    `Avalanche: ${monthsLabel(avalanche.months)}, ${money(avalanche.totalInterest)} interest`,
    `Snowball: ${monthsLabel(snowball.months)}, ${money(snowball.totalInterest)} interest`,
    winner === "tie"
      ? "Result: both methods cost the same here"
      : `Result: ${winner} saves ${money(Math.abs(interestSaved))} in interest`,
    "Estimate for education, not advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <div>
          <p className="text-15 font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
            Your debts
          </p>
          <p className="t-hint">
            Sample debts are filled in. Edit them to match your real balances.
          </p>
        </div>
        {debts.map((debt) => (
          <div className="t-debt-row" key={debt.id}>
            <div className="t-field">
              <label htmlFor={`name-${debt.id}`}>Name</label>
              <input
                id={`name-${debt.id}`}
                className="t-text-input"
                value={debt.name}
                onChange={(event) => update(debt.id, { name: event.target.value })}
              />
              <p className="t-hint">A nickname so you can tell your debts apart.</p>
            </div>
            <div className="t-field">
              <label htmlFor={`bal-${debt.id}`}>Balance ($)</label>
              <input
                id={`bal-${debt.id}`}
                className="t-text-input"
                type="number"
                min={0}
                value={debt.balance}
                onChange={(event) =>
                  update(debt.id, { balance: Math.max(0, Number(event.target.value) || 0) })
                }
              />
              <p className="t-hint">What you still owe on this debt.</p>
            </div>
            <div className="t-field">
              <label htmlFor={`apr-${debt.id}`}>APR %</label>
              <input
                id={`apr-${debt.id}`}
                className="t-text-input"
                type="number"
                min={0}
                step={0.1}
                value={debt.apr}
                onChange={(event) =>
                  update(debt.id, { apr: Math.max(0, Number(event.target.value) || 0) })
                }
              />
              <p className="t-hint">The yearly interest rate from your statement.</p>
            </div>
            <div className="t-field">
              <label htmlFor={`min-${debt.id}`}>Minimum ($)</label>
              <input
                id={`min-${debt.id}`}
                className="t-text-input"
                type="number"
                min={0}
                value={debt.minPayment}
                onChange={(event) =>
                  update(debt.id, { minPayment: Math.max(0, Number(event.target.value) || 0) })
                }
              />
              <p className="t-hint">The smallest payment the lender requires.</p>
            </div>
            <button type="button" className="t-link-btn" onClick={() => removeDebt(debt.id)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-outline t-copy-btn" onClick={addDebt}>
          Add a debt
        </button>
        <MoneyField
          label="Extra payment each month"
          value={extra}
          onChange={(v) => setExtra(Math.max(0, v))}
          hint="Everything above the minimums goes at one target debt."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat
            label="Avalanche: debt-free in"
            value={avalanche.stuck ? "50+ years" : monthsLabel(avalanche.months)}
            sub={`${money(avalanche.totalInterest)} interest`}
            hero={winner === "avalanche"}
          />
          <Stat
            label="Snowball: debt-free in"
            value={snowball.stuck ? "50+ years" : monthsLabel(snowball.months)}
            sub={`${money(snowball.totalInterest)} interest`}
            hero={winner === "snowball"}
          />
        </dl>

        {avalanche.stuck || snowball.stuck ? (
          <AssumptionBox>
            <strong>Minimums are not covering the interest.</strong> With these numbers the balances
            never reach zero inside 50 years. Raise the extra payment or the minimums.
          </AssumptionBox>
        ) : (
          <div className="t-compare">
            <div className="t-compare-card" data-winner={winner === "avalanche"}>
              <h3>
                Avalanche
                {winner === "avalanche" ? <span className="t-winner-tag">Cheapest</span> : null}
              </h3>
              <p className="t-hint">Highest APR first. Least interest paid.</p>
              <ul className="t-kv">
                <li>
                  <span>Total interest</span>
                  <strong>{money(avalanche.totalInterest)}</strong>
                </li>
                <li>
                  <span>Payoff order</span>
                  <strong>{avalanche.order.join(" → ") || "None left"}</strong>
                </li>
              </ul>
            </div>
            <div className="t-compare-card" data-winner={winner === "snowball"}>
              <h3>
                Snowball
                {winner === "snowball" ? <span className="t-winner-tag">Cheapest</span> : null}
              </h3>
              <p className="t-hint">Smallest balance first. Fastest first win.</p>
              <ul className="t-kv">
                <li>
                  <span>Total interest</span>
                  <strong>{money(snowball.totalInterest)}</strong>
                </li>
                <li>
                  <span>Payoff order</span>
                  <strong>{snowball.order.join(" → ") || "None left"}</strong>
                </li>
              </ul>
            </div>
          </div>
        )}

        <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
          {winner === "tie"
            ? "Here both methods cost the same. The tiebreaker is which order keeps you going."
            : `Avalanche saves ${money(Math.abs(interestSaved))} in interest here. Snowball still wins on psychology: killing the smallest balance first gives you a win early.`}
        </p>

        <AssumptionBox>
          <strong>How the simulation works.</strong> Every month, interest is added to each balance,
          every minimum is paid, and the extra payment goes to the target debt. When a debt hits
          zero, its minimum rolls into the next target, so your total monthly payment never drops.
        </AssumptionBox>

        <RiskSection scenarios={debtRisk.scenarios} />

        <CopyNumbersButton summary={summary} />
        <ShareResultButton
          headlineNumber={sharePlan.stuck ? "50+ years" : monthsLabel(sharePlan.months)}
          headlineLabel={
            winner === "tie" ? "Debt-free, both plans agree" : `Debt-free with the ${winner} plan`
          }
          toolName="Debt payoff calculator"
          toolPath="/tools/debt-payoff"
          riskLine={debtRisk.riskLine}
        />
      </div>
    </div>
  );
}
