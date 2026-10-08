"use client";

import { useMemo, useState } from "react";

import { money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  ChoiceField,
  CopyNumbersButton,
  MiniChart,
  MoneyField,
  PercentField,
  SelectField,
  Stat,
} from "../_components/tool-shared";
import { ShareResultButton } from "../_components/share-card";
import { bracketTop, computeLadder, FEDERAL_BRACKETS_2026, type FilingStatus } from "./math";

const RATE_OPTIONS = FEDERAL_BRACKETS_2026.single
  .filter(([, rate]) => rate < 1)
  .map(([, rate]) => ({
    value: String(rate),
    label: `${Math.round(rate * 100)}%`,
  }));

export function RothConversionLadder() {
  const [birthYear, setBirthYear] = useState(1966);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [baselineIncome, setBaselineIncome] = useState(80000);
  const [balance, setBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState("0.22");
  const [retirementRate, setRetirementRate] = useState("0.22");
  const [growth, setGrowth] = useState(7);

  const result = useMemo(
    () =>
      computeLadder({
        birthYear: Math.max(1926, Math.min(2009, birthYear)),
        filingStatus: status,
        baselineIncome: Math.max(0, baselineIncome),
        preTaxBalance: Math.max(0, balance),
        currentRate: Number(currentRate),
        retirementRate: Number(retirementRate),
        growthRate: growth / 100,
      }),
    [birthYear, status, baselineIncome, balance, currentRate, retirementRate, growth],
  );

  const top = bracketTop(status, Number(currentRate));
  const headroom = Math.max(0, top - Math.max(0, baselineIncome));
  const savings = result.lifetimeSavings;
  const currentRatePct = Math.round(Number(currentRate) * 100);
  const retirementRatePct = Math.round(Number(retirementRate) * 100);

  const summary = [
    "Roth conversion plan: my numbers",
    `Birth year: ${birthYear} (RMD age ${result.rmdAgeValue}, ${result.yearsUntilRmd} conversion years)`,
    `Filing status: ${status === "single" ? "single" : "married filing jointly"}`,
    `Other taxable income: ${money(Math.max(0, baselineIncome))} a year`,
    `Pre-tax balance: ${money(Math.max(0, balance))}, assumed growth: ${growth}%`,
    `Tax now: ${currentRatePct}%, expected tax in retirement: ${retirementRatePct}%`,
    `Total converted: ${money(result.totalConverted)}`,
    `Lifetime tax with conversions: ${money(result.taxWithConversions)}`,
    `Lifetime tax without conversions: ${money(result.taxWithoutConversions)}`,
    `Estimated lifetime savings: ${money(savings)}`,
    "Simplified model for education, not tax advice.",
  ].join("\n");

  const verdict =
    result.pastRmd ? "past" : result.notBeneficial ? "not-beneficial" : savings > 0 ? "saves" : "costs";

  return (
    <div className="t-calc">
      <div className="t-controls">
        <div className="t-field">
          <label htmlFor="birth-year">Birth year</label>
          <div className="t-money">
            <input
              id="birth-year"
              type="number"
              inputMode="numeric"
              min={1926}
              max={2009}
              value={Number.isFinite(birthYear) ? birthYear : 1966}
              onChange={(event) => {
                const next = Math.round(Number(event.target.value));
                setBirthYear(
                  Number.isFinite(next) ? Math.max(1926, Math.min(2009, next)) : 1966,
                );
              }}
            />
          </div>
          <p className="t-hint">Sets your RMD age: 73 for 1951-1959 births, 75 for 1960 and later.</p>
        </div>
        <ChoiceField<FilingStatus>
          label="Filing status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "single", label: "Single" },
            { value: "joint", label: "Married filing jointly" },
          ]}
        />
        <MoneyField
          label="Other taxable income per year"
          value={baselineIncome}
          onChange={(v) => setBaselineIncome(Math.max(0, v))}
          hint="Wages, pension, taxable Social Security. Assumed the same every year."
        />
        <MoneyField
          label="Pre-tax balance today"
          value={balance}
          onChange={(v) => setBalance(Math.max(0, v))}
          hint="Traditional IRA, 401(k), and similar pre-tax accounts combined."
        />
        <SelectField
          label="Your tax bracket now"
          value={currentRate}
          onChange={setCurrentRate}
          options={RATE_OPTIONS}
          hint={Number.isFinite(top) ? `Fills up to ${money(top)} a year.` : "Top bracket: no ceiling to fill."}
        />
        <SelectField
          label="Expected tax bracket in retirement"
          value={retirementRate}
          onChange={setRetirementRate}
          options={RATE_OPTIONS}
        />
        <PercentField
          label="Assumed yearly growth"
          value={growth}
          onChange={setGrowth}
          hint="You pick the rate. Nobody knows the real one ahead of time."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat
            label={verdict === "saves" ? "Estimated lifetime tax savings" : "Estimated lifetime tax difference"}
            value={verdict === "past" ? "See note below" : money(savings)}
            hero
            sub={
              verdict === "past"
                ? undefined
                : `Conversions pay tax at ${currentRatePct}%; RMDs would pay at ${retirementRatePct}%`
            }
          />
          <Stat label="Total converted" value={money(result.totalConverted)} />
          <Stat label="Years converting" value={result.pastRmd ? "0" : String(result.yearsUntilRmd)} />
          <Stat
            label="Yearly conversion room"
            value={money(headroom)}
            sub={
              Number.isFinite(top)
                ? `Top of the ${currentRatePct}% bracket (${status === "single" ? "single" : "joint"}) minus your other income`
                : "No ceiling in the top bracket"
            }
          />
        </dl>

        {result.pastRmd ? (
          <AssumptionBox>
            <strong>You are already at RMD age, so this plan cannot run.</strong> Conversions still
            work after RMDs begin, but they no longer shrink future required withdrawals the way
            pre-RMD conversions do. A tax pro can tell you whether converting still helps your
            situation.
          </AssumptionBox>
        ) : null}

        {result.notBeneficial && !result.pastRmd ? (
          <AssumptionBox>
            <strong>Conversions probably do not help here.</strong> Your expected retirement bracket
            ({retirementRatePct}%) is not lower than your bracket now ({currentRatePct}%), so paying tax early
            buys you nothing in this model. The conversion case is usually strongest when your rate
            now is lower than the rate you expect later.
          </AssumptionBox>
        ) : null}

        {!result.pastRmd && result.exhaustedAtAge !== null ? (
          <AssumptionBox>
            <strong>Your balance converts fully by age {result.exhaustedAtAge}.</strong> Later years
            in the table convert $0 because there is nothing left to move.
          </AssumptionBox>
        ) : null}

        {!result.pastRmd ? (
          <>
            <div className="t-table-wrap">
              <table className="t-table">
                <thead>
                  <tr>
                    <th scope="col">Lifetime tax</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>With the conversion plan</td>
                    <td>{money(result.taxWithConversions)}</td>
                  </tr>
                  <tr>
                    <td>Doing nothing, taxed at RMD time</td>
                    <td>{money(result.taxWithoutConversions)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Difference</strong>
                    </td>
                    <td>
                      <strong>{money(savings)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <MiniChart
              ariaTitle="Pre-tax balance remaining each year, with conversions versus doing nothing"
              labels={{
                start: `Age ${result.currentAge}`,
                mid: `Age ${Math.round((result.currentAge + result.rmdAgeValue) / 2)}`,
                end: `Age ${result.rmdAgeValue} (RMDs)`,
              }}
              series={[
                {
                  name: "Without conversions",
                  color: "#152e34",
                  values: result.noConversionBalanceSeries,
                },
                {
                  name: "With conversions",
                  color: "#8fa3ff",
                  dashed: true,
                  values: result.years.map((y) => y.balanceAfter),
                },
              ]}
            />

            <h3 className="text-19 font-semibold">Year by year</h3>
            <div className="t-table-wrap">
              <table className="t-table">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Age</th>
                    <th scope="col">Convert</th>
                    <th scope="col">Tax on conversion</th>
                    <th scope="col">Pre-tax balance left</th>
                  </tr>
                </thead>
                <tbody>
                  {result.years.map((y) => (
                    <tr key={y.year}>
                      <td>{y.year}</td>
                      <td>{y.age}</td>
                      <td>{money(y.conversion)}</td>
                      <td>{money(y.taxOnConversion)}</td>
                      <td>{money(y.balanceAfter)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        <AssumptionBox>
          <strong>What this leaves out.</strong> Bracket tops and the standard deduction stay fixed
          in this tool; in reality they move with inflation. State tax, IRMAA Medicare surcharges,
          and the five-year Roth rules are not modeled. Growth is steady here; real returns move
          around. The five-year Roth withdrawal clock is not shown either. Simplified model for
          education, not tax advice: talk to a tax pro before converting.
        </AssumptionBox>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CopyNumbersButton summary={summary} />
          {!result.pastRmd ? (
            <ShareResultButton
              headlineNumber={money(savings)}
              headlineLabel={
                savings > 0
                  ? "Estimated lifetime tax savings"
                  : savings < 0
                    ? "Estimated lifetime tax cost"
                    : "No lifetime tax difference"
              }
              toolName="Roth conversion planner"
              toolPath="/tools/roth-conversion-ladder"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
