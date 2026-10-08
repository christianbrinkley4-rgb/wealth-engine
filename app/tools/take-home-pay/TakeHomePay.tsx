"use client";

import { useState } from "react";

import { money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  ChoiceField,
  CopyNumbersButton,
  MoneyField,
  SelectField,
  Stat,
} from "../_components/tool-shared";

type FilingStatus = "single" | "joint";
type Frequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

/**
 * 2026 federal brackets, copied from the verified figures doc (IRS Rev.
 * Proc. 2025-32). Each row is [top of bracket, rate].
 */
const BRACKETS: Record<FilingStatus, Array<[number, number]>> = {
  single: [
    [12400, 0.1],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  joint: [
    [24800, 0.1],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
};

const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 16100, joint: 32200 };
const NC_RATE = 0.0399;
const SS_RATE = 0.062;
const SS_WAGE_BASE = 184500;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = { single: 200000, joint: 250000 };

const PERIODS: Record<Frequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

function federalTax(taxable: number, status: FilingStatus): number {
  let tax = 0;
  let floor = 0;
  for (const [cap, rate] of BRACKETS[status]) {
    if (taxable <= floor) break;
    tax += (Math.min(taxable, cap) - floor) * rate;
    floor = cap;
  }
  return tax;
}

export function TakeHomePay() {
  const [gross, setGross] = useState(65000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");

  const annual = Math.max(0, gross);
  const periods = PERIODS[frequency];
  const taxable = Math.max(0, annual - STANDARD_DEDUCTION[status]);
  const fed = federalTax(taxable, status);
  const nc = annual * NC_RATE;
  const ss = Math.min(annual, SS_WAGE_BASE) * SS_RATE;
  const medicare = annual * MEDICARE_RATE;
  const addlMedicare = Math.max(0, annual - ADDL_MEDICARE_THRESHOLD[status]) * ADDL_MEDICARE_RATE;
  const totalTax = fed + nc + ss + medicare + addlMedicare;
  const net = annual - totalTax;
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
        <MoneyField label="Gross salary (per year)" value={gross} onChange={(v) => setGross(Math.max(0, v))} hint="Your pay before taxes and deductions, for the whole year." />
        <ChoiceField<FilingStatus>
          label="Filing status"
          value={status}
          onChange={setStatus}
          hint="Single or married filing jointly. It changes which tax brackets apply."
          options={[
            { value: "single", label: "Single" },
            { value: "joint", label: "Married filing jointly" },
          ]}
        />
        <SelectField<Frequency>
          label="Pay frequency"
          value={frequency}
          onChange={setFrequency}
          hint="How often you get a paycheck. It only changes the per-paycheck split."
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
          <Stat label="Total tax" value={money(totalTax)} sub={`${((totalTax / Math.max(1, annual)) * 100).toFixed(1)}% effective`} />
        </dl>

        <div>
          <h3 className="text-19 font-semibold">Where the paycheck goes</h3>
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
          <strong>Every assumption, labeled.</strong> Uses the 2026 standard deduction only
          (${status === "single" ? "16,100" : "32,200"}): no itemizing. No pre-tax deductions such as
          401(k) or health premiums, which lower taxable income. No tax credits and no other income.
          NC tax is 3.99% of gross salary. The real NC math starts from federal AGI with state
          adjustments. Payroll taxes are the employee share
          only. Social Security stops at $184,500 of wages. Results are estimates.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
      </div>
    </div>
  );
}
