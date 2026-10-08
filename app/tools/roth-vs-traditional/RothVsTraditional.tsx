"use client";

import { useState } from "react";

import { money, rothVsTraditional } from "@/lib/wealth/math";

import {
  AssumptionBox,
  CopyNumbersButton,
  MoneyField,
  PercentField,
  Slider,
  Stat,
} from "../_components/tool-shared";

/** 2026 IRA limits from the verified figures doc: $7,500 under 50, $8,600 at 50+. */
function iraLimit(age: number): number {
  return age >= 50 ? 8600 : 7500;
}

export function RothVsTraditional() {
  const [age, setAge] = useState(21);
  const [contribution, setContribution] = useState(7500);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(7);
  const [taxNow, setTaxNow] = useState(22);
  const [taxLater, setTaxLater] = useState(22);

  const limit = iraLimit(age);
  const capped = contribution > limit;
  const effective = Math.min(contribution, limit);

  const result = rothVsTraditional({
    annualPreTax: effective,
    years,
    annualReturn: rate,
    taxNow,
    taxLater,
  });

  const summary = [
    "Roth vs traditional: my numbers",
    `Age: ${age} (2026 IRA limit ${money(limit)})`,
    `Annual contribution: ${money(effective)}${capped ? " (capped at the IRA limit)" : ""}`,
    `Years: ${years}, assumed growth: ${rate}%`,
    `Tax rate now: ${taxNow}%, tax rate at withdrawal: ${taxLater}%`,
    `Roth after tax: ${money(result.roth)}`,
    `Traditional after tax: ${money(result.traditional)}`,
    result.winner === "tie"
      ? "Result: tie"
      : `Result: ${result.winner} leaves ${money(Math.abs(result.difference))} more`,
    "Estimate for education, not advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField label="Your age" value={age} onChange={(v) => setAge(Math.max(16, Math.min(100, v)))} hint="Age sets your 2026 IRA limit." />
        <MoneyField
          label="Annual contribution"
          value={contribution}
          onChange={(v) => setContribution(Math.max(0, v))}
          hint={`2026 IRA limit for your age: ${money(limit)}.`}
        />
        <Slider
          label="Years of contributions"
          value={years}
          min={1}
          max={50}
          display={`${years} years`}
          onChange={setYears}
        />
        <PercentField label="Assumed yearly growth" value={rate} onChange={setRate} hint="You pick the rate. Nobody knows the real one ahead of time." />
        <PercentField label="Your tax rate now" value={taxNow} onChange={setTaxNow} hint="Your marginal rate this year, as a percent." />
        <PercentField label="Your tax rate at withdrawal" value={taxLater} onChange={setTaxLater} hint="The rate you expect to pay when you take the money out." />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label="Roth, after tax" value={money(result.roth)} hero={result.winner === "roth"} />
          <Stat
            label="Traditional, after tax"
            value={money(result.traditional)}
            hero={result.winner === "traditional"}
          />
        </dl>

        <div className="t-compare">
          <div className="t-compare-card" data-winner={result.winner === "roth"}>
            <h3>
              Roth
              {result.winner === "roth" && result.winner !== undefined ? <span className="t-winner-tag">Leaves more</span> : null}
            </h3>
            <ul className="t-kv">
              <li>
                <span>Tax paid up front, each year</span>
                <strong>{money(result.rothTaxPaidUpFront / years)}</strong>
              </li>
              <li>
                <span>Deposited per year</span>
                <strong>{money(result.rothDeposit)}</strong>
              </li>
              <li>
                <span>Value after tax</span>
                <strong>{money(result.roth)}</strong>
              </li>
            </ul>
          </div>
          <div className="t-compare-card" data-winner={result.winner === "traditional"}>
            <h3>
              Traditional
              {result.winner === "traditional" ? <span className="t-winner-tag">Leaves more</span> : null}
            </h3>
            <ul className="t-kv">
              <li>
                <span>Deposited per year</span>
                <strong>{money(effective)}</strong>
              </li>
              <li>
                <span>Tax paid at withdrawal</span>
                <strong>{money(result.traditionalTax)}</strong>
              </li>
              <li>
                <span>Value after tax</span>
                <strong>{money(result.traditional)}</strong>
              </li>
            </ul>
          </div>
        </div>

        {result.winner === "tie" ? (
          <p className="text-17 leading-relaxed">
            At equal tax rates the two tie. That is the whole lesson: when the rate now matches the rate
            later, Roth and traditional leave you the same amount.
          </p>
        ) : (
          <p className="text-17 leading-relaxed">
            <strong>{result.winner === "roth" ? "Roth" : "Traditional"} leaves {money(Math.abs(result.difference))} more</strong>{" "}
            under these inputs. Change the two tax rates and watch the lead flip.
          </p>
        )}

        {capped ? (
          <AssumptionBox>
            <strong>Capped at the 2026 IRA limit.</strong> You entered {money(contribution)}, so the math
            uses {money(limit)}, the legal max for age {age} in 2026.
          </AssumptionBox>
        ) : null}

        <AssumptionBox>
          <strong>What this leaves out.</strong> Roth IRAs phase out at higher incomes ($153,000 to
          $168,000 single in 2026). Required minimum distributions, early-withdrawal penalties, and
          state taxes are not modeled. The growth rate is steady in this tool; real returns move
          around.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
      </div>
    </div>
  );
}
