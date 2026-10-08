"use client";

import { useState } from "react";

import { finalPoint, growthSeries, money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  CopyNumbersButton,
  MiniChart,
  MoneyField,
  PercentField,
  Slider,
  Stat,
} from "../_components/tool-shared";
import { ShareResultButton } from "../_components/share-card";

export function CompoundInterest() {
  const [start, setStart] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(7);

  const series = growthSeries({ start, monthly, years, annualReturn: rate });
  const end = finalPoint(series);
  const growth = end.balance - end.contributed;
  const growthShare = end.balance > 0 ? Math.round((growth / end.balance) * 100) : 0;

  const summary = [
    "Compound interest: my numbers",
    `Starting amount: ${money(start)}, monthly contribution: ${money(monthly)}`,
    `Years: ${years}, assumed yearly rate: ${rate}%`,
    `Final balance: ${money(end.balance)}`,
    `You put in: ${money(end.contributed)}, growth: ${money(growth)}`,
    "Estimate for education, not advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField label="Starting amount" value={start} onChange={(v) => setStart(Math.max(0, v))} hint="What you have saved today. Zero is a fine place to start." />
        <Slider
          label="Monthly contribution"
          value={monthly}
          min={0}
          max={2000}
          step={25}
          display={money(monthly)}
          onChange={setMonthly}
          hint="What you add each month, on top of the starting amount."
        />
        <Slider
          label="Years"
          value={years}
          min={1}
          max={50}
          display={`${years} years`}
          onChange={setYears}
          hint="How long the money stays invested and compounding."
        />
        <PercentField
          label="Assumed yearly rate"
          value={rate}
          onChange={setRate}
          hint="You pick the rate. Nobody knows the real one ahead of time."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label={`Balance after ${years} years`} value={money(end.balance)} hero />
          <Stat label="You put in" value={money(end.contributed)} />
          <Stat label="Growth" value={money(growth)} />
        </dl>

        <MiniChart
          ariaTitle={`Balance grows to ${money(end.balance)} over ${years} years`}
          labels={{ start: "Year 0", mid: `Year ${Math.round(years / 2)}`, end: `Year ${years}` }}
          series={[
            { name: "Balance", color: "#152e34", values: series.map((p) => p.balance) },
            { name: "You put in", color: "#8fa3ff", dashed: true, values: series.map((p) => p.contributed) },
          ]}
        />

        <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
          {rate === 0
            ? "At 0% there is no growth. This is just your deposits stacked up."
            : growthShare === 0
              ? "Growth makes up less than 1% of this balance. Almost all of it came from your deposits."
              : `${growthShare}% of the final balance is growth. You never deposited that money.`}
        </p>

        <div className="t-table-wrap">
          <table className="t-table">
            <caption className="t-hint" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              Balance by year.
            </caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">You put in</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {series.map((p) => (
                <tr key={p.year}>
                  <td>{p.year}</td>
                  <td>{money(p.contributed)}</td>
                  <td>{money(p.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AssumptionBox>
          <strong>Steady rate, compounded monthly.</strong> Each month the balance grows by one
          twelfth of the yearly rate, then your contribution is added. No taxes, fees, or inflation.
          Real returns are uneven and can be negative.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
        <ShareResultButton
          headlineNumber={money(end.balance)}
          headlineLabel={`Balance after ${years} years`}
          toolName="Compound interest calculator"
          toolPath="/tools/compound-interest"
        />
      </div>
    </div>
  );
}
