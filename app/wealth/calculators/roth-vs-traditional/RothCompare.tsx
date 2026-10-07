"use client";

import { LiveBar, LiveMoney, SliderField } from "@/app/wealth/ui/controls";
import { useMarkExplored, usePersistentState } from "@/app/wealth/ui/hooks";
import { money, rothVsTraditional } from "@/lib/wealth/math";

import { normalizeRothState, ROTH_DEFAULTS } from "./state";

const KEY = "cbw:roth";

export function RothCompare() {
  useMarkExplored("roth-vs-traditional");
  const [saved, setState] = usePersistentState(KEY, ROTH_DEFAULTS);
  const state = normalizeRothState(saved);
  const set = (patch: Partial<typeof ROTH_DEFAULTS>) =>
    setState((previous) => normalizeRothState({ ...normalizeRothState(previous), ...patch }));

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
      ? `Both tax rates are ${state.taxNow}%. Roth and traditional tie under these assumptions.`
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
          hint="2026 limits under 50: $7,500 for IRAs, $24,500 for 401(k) employee contributions. This slider compares pre-tax pay."
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
              Tax paid first. {money(result.rothDeposit)} goes in each year. This example assumes qualified, tax-free Roth withdrawals.
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
          Compare 1 slice of pre-tax pay, with deposits at each year&apos;s end and a steady return.
          Traditional contributions are fully deductible here. Roth withdrawals qualify for tax-free treatment.
          Each side uses 1 flat tax rate. Employer matches, state taxes, contribution limits, income limits and required withdrawals are excluded.
          This is an estimate, not your tax bill.
        </p>
      </div>
    </div>
  );
}
