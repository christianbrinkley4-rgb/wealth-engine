"use client";

import { Plus, Trash2 } from "lucide-react";

import { LineChart } from "@/app/wealth/ui/charts";
import { LiveBar, LiveMoney, MoneyField, SliderField } from "@/app/wealth/ui/controls";
import { useMarkExplored, usePersistentState } from "@/app/wealth/ui/hooks";
import { type Debt, type PayoffResult, money, monthsLabel, simulatePayoff } from "@/lib/wealth/math";

const KEY = "cbw:debts:v2";
/** Made-up starter numbers so the chart has something to show. */
const DEFAULTS: { extra: number; debts: Debt[] } = {
  extra: 100,
  debts: [
    { id: "a", name: "Credit card", balance: 4200, apr: 26, minPayment: 105 },
    { id: "b", name: "Student loan", balance: 3000, apr: 5.5, minPayment: 60 },
    { id: "c", name: "Medical bill", balance: 800, apr: 0, minPayment: 40 },
    { id: "d", name: "Car loan", balance: 6500, apr: 7.5, minPayment: 210 },
  ],
};

function payoffDescription(name: string, result: PayoffResult): string {
  return result.stuck
    ? `${name} still has ${money(result.timeline[result.timeline.length - 1])} owed after 50 years. Interest over those 50 years: ${money(result.totalInterest)}.`
    : `${name} pays off in ${result.months} months with ${money(result.totalInterest)} interest.`;
}

export function DebtPayoff() {
  useMarkExplored("debt-payoff");
  const [state, setState] = usePersistentState(KEY, DEFAULTS);
  const debts = state.debts;

  const update = (id: string, patch: Partial<Debt>) =>
    setState((previous) => ({
      ...previous,
      debts: previous.debts.map((debt) => (debt.id === id ? { ...debt, ...patch } : debt)),
    }));
  const add = () =>
    setState((previous) => ({
      ...previous,
      debts: [
        ...previous.debts,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, name: `Debt ${previous.debts.length + 1}`, balance: 1000, apr: 20, minPayment: 35 },
      ],
    }));
  const remove = (id: string) =>
    setState((previous) => ({ ...previous, debts: previous.debts.filter((debt) => debt.id !== id) }));

  const avalanche = simulatePayoff(debts, state.extra, "avalanche");
  const snowball = simulatePayoff(debts, state.extra, "snowball");
  const minimumOnly = simulatePayoff(debts, 0, "avalanche");
  const total = debts.reduce((sum, debt) => sum + Math.max(0, debt.balance), 0);
  const minimums = debts.reduce((sum, debt) => sum + (debt.balance > 0 ? debt.minPayment : 0), 0);
  const interestSaved = snowball.totalInterest - avalanche.totalInterest;
  const monthsSaved = snowball.months - avalanche.months;
  const stuck = avalanche.stuck || snowball.stuck;
  const length = Math.max(avalanche.timeline.length, snowball.timeline.length);
  const pad = (values: number[]) => [...values, ...Array(Math.max(0, length - values.length)).fill(0)];

  let takeaway: string;
  if (total === 0) takeaway = "Start with 1 debt to compare both plans.";
  else if (stuck)
    takeaway =
      "At least 1 plan still has debt after 50 years. Raise the extra payment to test a shorter payoff.";
  else if (interestSaved < 1 && monthsSaved === 0)
    takeaway = "With these debts, both methods land in the same place. Pick the one you'll stick with.";
  else
    takeaway = `Avalanche saves ${money(interestSaved)} in interest${
      monthsSaved > 0 ? ` and finishes ${monthsLabel(monthsSaved)} sooner` : ""
    }. Snowball goes after the small balances first, which feels faster even when it costs more.`;

  return (
    <div className="w-calc">
      <div className="w-controls">
        {debts.map((debt) => (
          <div className="w-debt" key={debt.id}>
            <div className="w-debt-top">
              <input
                className="w-text-input"
                aria-label="Debt name"
                value={debt.name}
                maxLength={24}
                onChange={(event) => update(debt.id, { name: event.target.value })}
              />
              <button
                type="button"
                className="w-icon-btn"
                aria-label={`Remove ${debt.name}`}
                onClick={() => remove(debt.id)}
              >
                <Trash2 size={18} aria-hidden />
              </button>
            </div>
            <div className="w-debt-fields">
              <MoneyField compact label="Balance" value={debt.balance} onChange={(balance) => update(debt.id, { balance })} />
              <MoneyField
                compact
                label="APR"
                prefix=""
                suffix="%"
                max={99}
                value={debt.apr}
                onChange={(apr) => update(debt.id, { apr })}
              />
              <MoneyField
                compact
                label="Minimum"
                max={100_000}
                value={debt.minPayment}
                onChange={(minPayment) => update(debt.id, { minPayment })}
              />
            </div>
          </div>
        ))}
        {debts.length < 8 ? (
          <button type="button" className="w-btn w-btn-ghost" onClick={add}>
            <Plus size={18} aria-hidden /> Add a debt
          </button>
        ) : null}
        <SliderField
          label="Extra per month"
          value={state.extra}
          min={0}
          max={1000}
          step={10}
          onChange={(extra) => setState((previous) => ({ ...previous, extra }))}
          display={money(state.extra)}
          hint={`On top of ${money(minimums)} in minimums. Total: ${money(minimums + state.extra)} a month.`}
        />
      </div>

      <LiveBar targetId="result" label="Debt-free in">
        {total === 0 ? "No debts" : avalanche.stuck ? "Over 50 yr" : monthsLabel(avalanche.months)}
      </LiveBar>
      <div className="w-panel w-calc-sticky" id="result" style={{ scrollMarginTop: 110 }}>
        <div className="w-versus">
          {(
            [
              ["Avalanche", "Highest rate first", avalanche, interestSaved >= 1 || monthsSaved > 0],
              ["Snowball", "Smallest balance first", snowball, false],
            ] as const
          ).map(([name, how, result, win]) => (
            <div key={name} data-win={win && !stuck ? "true" : undefined}>
              <h3>{name}</h3>
              <p>{how}</p>
              <strong>{result.stuck ? "Over 50 yr" : monthsLabel(result.months)}</strong>
              <p>
                {result.stuck ? "Interest in 50 years: " : "Interest: "}<LiveMoney value={result.totalInterest} />
              </p>
              {!result.stuck && result.order.length > 1 ? (
                <ol className="w-order" aria-label={`${name} payoff order`}>
                  {result.order.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          ))}
        </div>
        <LineChart
          series={[
            { name: "Avalanche", color: "var(--w-lime)", values: pad(avalanche.timeline), area: true },
            { name: "Snowball", color: "var(--w-coral)", values: pad(snowball.timeline), dashed: true },
          ]}
          xLabel={(index) => `Month ${index}`}
          xTitle="Total owed by month."
          describe={`${payoffDescription("Avalanche", avalanche)} ${payoffDescription("Snowball", snowball)}`}
        />
        <p className="w-callout">{takeaway}</p>
        {!stuck && total > 0 && state.extra > 0 && !minimumOnly.stuck ? (
          <p className="w-callout w-callout-quiet">
            Minimums only would take {monthsLabel(minimumOnly.months)} and cost {money(minimumOnly.totalInterest)}{" "}
            in interest. Your extra {money(state.extra)} a month cuts{" "}
            {monthsLabel(Math.max(0, minimumOnly.months - avalanche.months))} off.
          </p>
        ) : null}
        <p className="w-assume">
          Assumes fixed rates, no new charges, and that each paid-off debt&apos;s payment rolls into the next
          one. Lenders figure interest daily, so expect small differences.
        </p>
      </div>
    </div>
  );
}
