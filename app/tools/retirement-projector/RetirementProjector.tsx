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

export function RetirementProjector() {
  const [currentAge, setCurrentAge] = useState(21);
  const [retireAge, setRetireAge] = useState(65);
  const [saved, setSaved] = useState(5000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);

  const years = Math.max(0, retireAge - currentAge);
  const series = growthSeries({ start: saved, monthly, years, annualReturn: rate });
  const end = finalPoint(series);
  const growth = end.balance - end.contributed;

  const summary = [
    "Retirement projector: my numbers",
    `Current age: ${currentAge}, retirement age: ${retireAge}`,
    `Saved so far: ${money(saved)}, monthly contribution: ${money(monthly)}`,
    `Assumed growth: ${rate}% (assumed, not a prediction)`,
    `Projected balance: ${money(end.balance)}`,
    `You contributed: ${money(end.contributed)}, growth: ${money(growth)}`,
    "Estimate for education, not advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField label="Your age now" value={currentAge} onChange={(v) => setCurrentAge(Math.max(16, Math.min(100, v)))} />
        <MoneyField
          label="Age you want to retire"
          value={retireAge}
          onChange={(v) => setRetireAge(Math.max(17, Math.min(100, v)))}
        />
        <MoneyField label="Saved so far" value={saved} onChange={(v) => setSaved(Math.max(0, v))} />
        <Slider
          label="Monthly contribution"
          value={monthly}
          min={0}
          max={5000}
          step={25}
          display={money(monthly)}
          onChange={setMonthly}
        />
        <PercentField
          label="Assumed yearly growth"
          value={rate}
          onChange={setRate}
          hint="This is an assumed rate, not a prediction. Try a few and compare."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label={`Projected at age ${retireAge}`} value={money(end.balance)} hero />
          <Stat label="You put in" value={money(end.contributed)} />
          <Stat label="Growth" value={money(growth)} />
        </dl>

        <MiniChart
          ariaTitle={`Projected balance by year, reaching ${money(end.balance)} at age ${retireAge}`}
          labels={{ start: `Age ${currentAge}`, mid: `Age ${Math.round((currentAge + retireAge) / 2)}`, end: `Age ${retireAge}` }}
          series={[
            { name: "Projected balance", color: "#152e34", values: series.map((p) => p.balance) },
            { name: "You put in", color: "#8fa3ff", dashed: true, values: series.map((p) => p.contributed) },
          ]}
        />

        <AssumptionBox>
          <strong>Assumed rate, not a prediction.</strong> This uses a steady {rate}% a year,
          compounded monthly, for {years} years. Real returns bounce around year to year and can be
          negative. No taxes, fees, or inflation are included. Change the rate and watch how wide the
          range gets.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
      </div>
    </div>
  );
}
