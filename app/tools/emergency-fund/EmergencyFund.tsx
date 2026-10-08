"use client";

import { useState } from "react";

import { money, monthsLabel } from "@/lib/wealth/math";

import {
  AssumptionBox,
  CopyNumbersButton,
  MoneyField,
  Slider,
  Stat,
} from "../_components/tool-shared";
import { ShareResultButton } from "../_components/share-card";

export function EmergencyFund() {
  const [spending, setSpending] = useState(2500);
  const [months, setMonths] = useState(6);
  const [savePerMonth, setSavePerMonth] = useState(300);

  const target = spending * months;
  const monthsToTarget = savePerMonth > 0 ? Math.ceil(target / savePerMonth) : 0;

  const summary = [
    "Emergency fund: my numbers",
    `Monthly essential spending: ${money(spending)}`,
    `Coverage target: ${months} months`,
    `Target fund size: ${money(target)}`,
    `Saving ${money(savePerMonth)} a month: reaches the target in about ${monthsLabel(monthsToTarget)}`,
    "Estimate for education, not advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField
          label="Monthly essential spending"
          value={spending}
          onChange={(v) => setSpending(Math.max(0, v))}
          hint="Rent, food, transport, insurance, minimum debt payments. Skip the fun money."
        />
        <Slider
          label="Months of coverage"
          value={months}
          min={1}
          max={12}
          display={`${months} months`}
          onChange={setMonths}
          hint="Three covers a hiccup. Six covers a longer stretch without income."
        />
        <MoneyField
          label="What you can save each month"
          value={savePerMonth}
          onChange={(v) => setSavePerMonth(Math.max(0, v))}
          hint="Be honest. A smaller number you keep beats a big one you quit."
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label="Target fund size" value={money(target)} hero />
          <Stat
            label="Time to get there"
            value={savePerMonth > 0 ? monthsLabel(monthsToTarget) : "N/A"}
            sub={savePerMonth > 0 ? `at ${money(savePerMonth)} a month` : "Enter a monthly amount"}
          />
        </dl>

        <div>
          <h3 className="text-19 font-semibold">Your savings plan</h3>
          {savePerMonth > 0 ? (
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Save {money(savePerMonth)} every month and you hit {money(target)} in about{" "}
              <strong>{monthsLabel(monthsToTarget)}</strong>. That is {monthsToTarget} deposits of{" "}
              {money(savePerMonth)}.
            </p>
          ) : (
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Enter what you can save each month and the plan fills in here.
            </p>
          )}
        </div>

        <div className="t-table-wrap">
          <table className="t-table">
            <caption className="t-hint" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              Fund balance by month, at {money(savePerMonth)} a month.
            </caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Saved so far</th>
                <th scope="col">Left to target</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(monthsToTarget, 60) }, (_, i) => {
                const saved = Math.min(target, savePerMonth * (i + 1));
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{money(saved)}</td>
                    <td>{money(Math.max(0, target - saved))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {monthsToTarget > 60 ? (
            <p className="t-hint">Table shows the first 60 months. The full plan takes longer.</p>
          ) : null}
        </div>

        <AssumptionBox>
          <strong>Simple math, on purpose.</strong> The target is monthly spending times months of
          coverage. The plan divides the target by your monthly savings. No interest, no inflation,
          no setbacks. Life will be messier than the table.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
        <ShareResultButton
          headlineNumber={money(target)}
          headlineLabel="Target fund size"
          toolName="Emergency fund calculator"
          toolPath="/tools/emergency-fund"
        />
      </div>
    </div>
  );
}
