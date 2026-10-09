"use client";

import { useState } from "react";

import {
  estimateTakeHome,
  PERIODS,
  NC_STANDARD_DEDUCTION,
  type FilingStatus,
  type Frequency,
} from "@/lib/takeHomePay";
import { money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  ChoiceField,
  CopyNumbersButton,
  MoneyField,
  SelectField,
  Stat,
} from "../_components/tool-shared";

export function TakeHomePay() {
  const [gross, setGross] = useState(65000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");

  const { annual, fed, nc, ss, medicare, addlMedicare, totalTax, net } = estimateTakeHome(
    gross,
    status,
  );
  const periods = PERIODS[frequency];
  const per = (v: number) => v / periods;

  const summary = [
    "Take-home pay: my numbers",
    `Gross salary: ${money(annual)} a year`,
    `Filing status: ${status === "single" ? "single" : "married filing jointly"}, pay frequency: ${frequency}`,
    "2026 figures: federal brackets, $16,100/$32,200 standard deduction, NC 3.99%, payroll taxes as labeled.",
    `Federal income tax: ${money(fed)}`,
    `NC income tax: ${money(nc)}`,
    `Social Security: ${money(ss)}`,
    `Medicare: ${money(medicare)}${addlMedicare > 0 ? ` + ${money(addlMedicare)} additional` : ""}`,
    `Total tax: ${money(totalTax)}`,
    `Take-home: ${money(net)} a year, ${money(per(net))} per ${frequency} paycheck`,
    "Estimate for education, not tax advice.",
  ].join("\n");

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField
          label="Gross salary (per year)"
          value={gross}
          onChange={(v) => setGross(Math.max(0, v))}
        />
        <ChoiceField<FilingStatus>
          label="Filing status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "single", label: "Single" },
            { value: "joint", label: "Married filing jointly" },
          ]}
        />
        <SelectField<Frequency>
          label="Pay frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "weekly", label: "Weekly (52 paychecks)" },
            { value: "biweekly", label: "Every two weeks (26)" },
            { value: "semimonthly", label: "Twice a month (24)" },
            { value: "monthly", label: "Monthly (12)" },
          ]}
        />
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat label={`Take-home, per ${frequency} check`} value={money(per(net))} hero />
          <Stat label="Take-home, per year" value={money(net)} />
          <Stat
            label="Total tax"
            value={money(totalTax)}
            sub={`${((totalTax / Math.max(1, annual)) * 100).toFixed(1)}% effective`}
          />
        </dl>

        <div>
          <h2 className="text-19 font-semibold">Where the paycheck goes</h2>
          <div className="t-table-wrap">
            <table className="t-table">
              <thead>
                <tr>
                  <th scope="col">Line item</th>
                  <th scope="col">Per year</th>
                  <th scope="col">Per paycheck</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gross pay</td>
                  <td>{money(annual)}</td>
                  <td>{money(per(annual))}</td>
                </tr>
                <tr>
                  <td>Federal income tax</td>
                  <td>{money(fed)}</td>
                  <td>{money(per(fed))}</td>
                </tr>
                <tr>
                  <td>NC income tax (3.99%)</td>
                  <td>{money(nc)}</td>
                  <td>{money(per(nc))}</td>
                </tr>
                <tr>
                  <td>Social Security (6.2%)</td>
                  <td>{money(ss)}</td>
                  <td>{money(per(ss))}</td>
                </tr>
                <tr>
                  <td>Medicare (1.45%)</td>
                  <td>{money(medicare)}</td>
                  <td>{money(per(medicare))}</td>
                </tr>
                {addlMedicare > 0 ? (
                  <tr>
                    <td>Additional Medicare (0.9%)</td>
                    <td>{money(addlMedicare)}</td>
                    <td>{money(per(addlMedicare))}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>
                    <strong>Take-home pay</strong>
                  </td>
                  <td>
                    <strong>{money(net)}</strong>
                  </td>
                  <td>
                    <strong>{money(per(net))}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <AssumptionBox>
          <strong>Every assumption, labeled.</strong> Uses the 2026 standard deduction only ($
          {status === "single" ? "16,100" : "32,200"}): no itemizing. No pre-tax deductions such as
          401(k) or health premiums, which lower taxable income. No tax credits and no other income.
          NC tax applies after a {money(NC_STANDARD_DEDUCTION[status])} state deduction. Assumes one
          wage earner under 65, no dependents, and no state adjustments. Actual withholding depends
          on your W-4. Payroll taxes are the employee share only. Social Security stops at $184,500
          of wages. Results are estimates.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
      </div>
    </div>
  );
}
