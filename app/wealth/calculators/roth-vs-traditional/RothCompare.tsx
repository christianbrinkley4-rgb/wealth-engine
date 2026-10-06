"use client";

import { LiveBar, LiveMoney, SliderField } from "@/app/wealth/ui/controls";
import { useMarkExplored, usePersistentState } from "@/app/wealth/ui/hooks";
import { money, rothVsTraditional } from "@/lib/wealth/math";

const KEY = "cbw:roth";
const DEFAULTS = { amount: 3000, years: 40, rate: 7, taxNow: 12, taxLater: 22 };

export function RothCompare() {
  useMarkExplored("roth-vs-traditional");
  const [state, setState] = usePersistentState(KEY, DEFAULTS);
  const set = (patch: Partial<typeof DEFAULTS>) => setState((previous) => ({ ...previous, ...patch }));

  const result = rothVsTraditional({
    annualPreTax: state.amount,
    years: state.years,
    annualReturn: state.rate,
    taxNow: state.taxNow,
    taxLater: state.taxLater,
  });
  const top = Math.max(result.roth, result.traditional, 1);
  const gap = Math.abs(result.difference);

  const takeaway =
    result.winner === "tie"
      ? "Same tax rate now and later means a tie. The account type doesn't matter. The rate difference does."
      : result.winner === "roth"
        ? `With a lower rate now (${state.taxNow}%) than later (${state.taxLater}%), Roth comes out ${money(gap)} ahead in this example.`
        : `With a higher rate now (${state.taxNow}%) than later (${state.taxLater}%), traditional comes out ${money(gap)} ahead in this example.`;

  return (
    <div className="w-calc">
      <div className="w-controls">
        <SliderField
          label="Tax rate today"
          value={state.taxNow}
          min={0}
          max={45}
          onChange={(taxNow) => set({ taxNow })}
          display={`${state.taxNow}%`}
          hint="Your rate on the last dollars you earn this year."
        />
        <SliderField
          label="Tax rate in retirement"
          value={state.taxLater}
          min={0}
          max={45}
          onChange={(taxLater) => set({ taxLater })}
          display={`${state.taxLater}%`}
          hint="A guess. Nobody knows future tax law or their future income."
        />
        <SliderField
          label="Pay set aside each year"
          value={state.amount}
          min={500}
          max={24500}
          step={250}
          onChange={(amount) => set({ amount })}
          display={money(state.amount)}
          hint="Before tax. Account limits apply and change each year."
        />
        <SliderField
          label="Years until you use it"
          value={state.years}
          min={5}
          max={50}
          onChange={(years) => set({ years })}
          display={`${state.years}`}
        />
        <SliderField
          label="Yearly return"
          value={state.rate}
          min={0}
          max={12}
          step={0.5}
          onChange={(rate) => set({ rate })}
          display={`${state.rate}%`}
        />
      </div>

      <LiveBar
        targetId="result"
        label={result.winner === "tie" ? "It's a tie" : result.winner === "roth" ? "Roth ahead by" : "Traditional ahead by"}
      >
        {money(gap)}
      </LiveBar>
      <div className="w-panel w-calc-sticky" id="result" style={{ scrollMarginTop: 110 }}>
        <p className="w-eyebrow">Spendable money after tax</p>
        <ul className="w-bars">
          <li>
            <div className="w-bar-top">
              <span>Roth</span>
              <b>
                <LiveMoney value={result.roth} />
              </b>
            </div>
            <div className="w-bar-track">
              <div
                className="w-bar-fill"
                style={{ width: `${(result.roth / top) * 100}%`, background: "var(--w-lime)" }}
              />
            </div>
            <p className="w-stat-sub">
              Tax paid first. {money(result.rothDeposit)} goes in each year. Nothing owed on the way out.
            </p>
          </li>
          <li>
            <div className="w-bar-top">
              <span>Traditional</span>
              <b>
                <LiveMoney value={result.traditional} />
              </b>
            </div>
            <div className="w-bar-track">
              <div
                className="w-bar-fill"
                style={{ width: `${(result.traditional / top) * 100}%`, background: "#8fa3ff" }}
              />
            </div>
            <p className="w-stat-sub">
              All {money(state.amount)} goes in each year. Grows to {money(result.traditionalBefore)}, then{" "}
              {money(result.traditionalTax)} goes to tax.
            </p>
          </li>
        </ul>
        <p className="w-callout">{takeaway}</p>
        <p className="w-assume">
          Simplified on purpose: one flat tax rate each side, yearly deposits, a steady return, and the same
          slice of pay going to either account. It ignores employer matches, state taxes, deductions,
          income limits and required withdrawals. It shows the idea, not your tax bill.
        </p>
      </div>
    </div>
  );
}
