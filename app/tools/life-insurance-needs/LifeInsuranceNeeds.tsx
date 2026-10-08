"use client";

import { useState } from "react";

import { money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  CopyNumbersButton,
  MoneyField,
  Stat,
} from "../_components/tool-shared";
import { ShareResultButton } from "../_components/share-card";

export function LifeInsuranceNeeds() {
  const [debts, setDebts] = useState(15000);
  const [income, setIncome] = useState(65000);
  const [years, setYears] = useState(10);
  const [mortgage, setMortgage] = useState(220000);
  const [education, setEducation] = useState(50000);

  const incomeReplacement = income * years;
  const total = debts + incomeReplacement + mortgage + education;

  const summary = [
    "Life insurance needs (DIME): my numbers",
    `Debts (not counting mortgage): ${money(debts)}`,
    `Income replacement: ${money(income)} x ${years} years = ${money(incomeReplacement)}`,
    `Mortgage balance: ${money(mortgage)}`,
    `Education costs: ${money(education)}`,
    `Starting-point coverage: ${money(total)}`,
    "A starting point for a conversation with an agent, not a recommendation.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField
          label="D: Debts"
          value={debts}
          onChange={(v) => setDebts(Math.max(0, v))}
          hint="Credit cards, car loans, everything except the mortgage."
        />
        <MoneyField
          label="I: Annual income to replace"
          value={income}
          onChange={(v) => setIncome(Math.max(0, v))}
          hint="The income your family would lose."
        />
        <MoneyField
          label="Years of income to replace"
          value={years}
          onChange={(v) => setYears(Math.max(0, Math.min(40, v)))}
          hint="Until the kids are grown is a common yardstick."
        />
        <MoneyField
          label="M: Mortgage balance"
          value={mortgage}
          onChange={(v) => setMortgage(Math.max(0, v))}
          hint="What is still owed on the home loan."
        />
        <MoneyField
          label="E: Future education costs"
          value={education}
          onChange={(v) => setEducation(Math.max(0, v))}
          hint="College or training costs you want covered."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label="Starting-point coverage" value={money(total)} hero />
          <Stat label="Income replacement" value={money(incomeReplacement)} sub={`${years} years`} />
        </dl>

        <div className="t-table-wrap">
          <table className="t-table">
            <caption className="t-hint" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              The DIME breakdown.
            </caption>
            <thead>
              <tr>
                <th scope="col">Letter</th>
                <th scope="col">Means</th>
                <th scope="col">Your number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>D</td>
                <td>Debts, mortgage excluded</td>
                <td>{money(debts)}</td>
              </tr>
              <tr>
                <td>I</td>
                <td>Income replacement</td>
                <td>{money(incomeReplacement)}</td>
              </tr>
              <tr>
                <td>M</td>
                <td>Mortgage balance</td>
                <td>{money(mortgage)}</td>
              </tr>
              <tr>
                <td>E</td>
                <td>Education costs</td>
                <td>{money(education)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AssumptionBox>
          <strong>A starting point, not a recommendation.</strong> This total is the opening number
          for a conversation with a licensed agent, not a coverage amount to buy. It leaves out
          existing savings, current policies, a spouse&apos;s income, and final expenses. Term and
          permanent coverage work differently, and the right type depends on your situation.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
        <ShareResultButton
          headlineNumber={money(total)}
          headlineLabel="Starting-point coverage"
          toolName="Life insurance needs calculator"
          toolPath="/tools/life-insurance-needs"
        />
      </div>
    </div>
  );
}
