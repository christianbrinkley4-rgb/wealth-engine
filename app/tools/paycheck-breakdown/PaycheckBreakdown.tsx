"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  PAY_PERIODS,
  PAYCHECK_RULES,
  PAYCHECK_SOURCES,
  parsePaycheckMoney,
  paycheckBreakdown,
  paycheckMoney,
  type PayFrequency,
  type PaycheckFilingStatus,
} from "@/lib/wealth/paycheck";
import { ShareCard } from "../_components/share-card";
import { CopyNumbersButton, SelectField } from "../_components/tool-shared";

const sources = PAYCHECK_SOURCES;
const inputSource = "#paycheck-inputs";
const toolUrl = "https://christianbrinkleync.com/tools/paycheck-breakdown";

function Amount({ value, href }: { value: number; href: string }) {
  return <a href={href}>{paycheckMoney(value)}</a>;
}

function DollarInput({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  optional = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="t-field">
      <label htmlFor={id}>{label}</label>
      <div className="t-money">
        <span aria-hidden="true">$</span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          required={!optional}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        />
      </div>
      <p id={`${id}-hint`} className="t-hint">
        {hint}
      </p>
      {error ? (
        <p id={`${id}-error`} className="p-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function BreakdownLine({
  label,
  value,
  href,
  children,
}: {
  label: string;
  value: number;
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="p-line">
      <div className="p-line-heading">
        <dt>{label}</dt>
        <dd>
          <Amount value={value} href={href} />
        </dd>
      </div>
      <dd className="t-hint">{children}</dd>
    </div>
  );
}

export function PaycheckBreakdown() {
  const [grossText, setGross] = useState("");
  const [netText, setNet] = useState("");
  const [ytdText, setYtd] = useState("");
  const [frequency, setFrequency] = useState<PayFrequency>("biweekly");
  const [filingStatus, setFilingStatus] = useState<PaycheckFilingStatus>("single");
  const [submitted, setSubmitted] = useState(false);
  const gross = parsePaycheckMoney(grossText);
  const net = parsePaycheckMoney(netText);
  const ytd = ytdText.trim() === "" ? undefined : parsePaycheckMoney(ytdText);
  const moneyError = "Enter a dollar amount with up to two decimal places.";
  const grossError = gross === null ? moneyError : undefined;
  const netError =
    net === null
      ? moneyError
      : gross !== null && net > gross
        ? "Net deposit cannot be greater than gross pay."
        : undefined;
  const ytdError = ytd === null ? moneyError : undefined;
  const valid = gross !== null && net !== null && ytd !== null && !netError;
  const result =
    submitted && valid
      ? paycheckBreakdown({
          gross,
          net,
          frequency,
          filingStatus,
          yearToDateGross: ytd,
        })
      : null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const rules = PAYCHECK_RULES;
  const summary = result
    ? [
        "PaycheckOS: my federal estimate",
        `Gross: ${paycheckMoney(result.gross)}. Net deposit: ${paycheckMoney(result.net)}.`,
        `Take-home: ${result.takeHomePercent.toFixed(1)}%.`,
        `Social Security: ${paycheckMoney(result.socialSecurity)}. Medicare: ${paycheckMoney(result.medicare)}.`,
        `Additional Medicare: ${paycheckMoney(result.additionalMedicare)}. Federal income tax: ${paycheckMoney(result.federalIncomeTax)}.`,
        result.reconciles
          ? `Other deductions (benefits, 401k, etc.): ${paycheckMoney(result.remainder)}.`
          : `Estimate mismatch: ${paycheckMoney(-result.remainder)}. These assumptions do not match my deposit.`,
        result.mode === "average"
          ? "Payroll taxes use annual averages."
          : "Payroll taxes use my wages before this check.",
        "Assumes taxable gross, steady pay, and a current W-4 with no adjustments.",
        "Other deductions are unexplained. State and local taxes are included in that remainder.",
        "Education only. Christian Brinkley is not a CPA.",
        `IRS withholding: ${sources.withholding}`,
        `SSA: ${sources.socialSecurity}`,
        `IRS Medicare: ${sources.medicare}`,
        `IRS additional Medicare: ${sources.additionalMedicare}`,
        toolUrl,
      ].join("\n")
    : "";

  return (
    <div className="t-calc p-calc">
      <form id="paycheck-inputs" className="t-controls" onSubmit={submit} noValidate>
        <h2>Your paycheck</h2>
        <DollarInput
          id="paycheck-gross"
          label="Gross pay for this check"
          value={grossText}
          onChange={setGross}
          hint="What you earned before anything came out. Paste the amount from your pay stub."
          error={submitted ? grossError : undefined}
        />
        <DollarInput
          id="paycheck-net"
          label="Net deposit for this check"
          value={netText}
          onChange={setNet}
          hint="What reached your bank. Add split deposits together."
          error={submitted ? netError : undefined}
        />
        <SelectField
          label="Pay frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "weekly", label: "Every week" },
            { value: "biweekly", label: "Every two weeks" },
            { value: "semimonthly", label: "Twice a month" },
            { value: "monthly", label: "Once a month" },
          ]}
        />
        <p className="t-hint">
          <a href={sources.withholding}>
            {PAY_PERIODS[frequency]} checks per year, from IRS Table 3.
          </a>
        </p>
        <SelectField
          label="Filing status"
          value={filingStatus}
          onChange={setFilingStatus}
          options={[
            { value: "single", label: "Single" },
            { value: "joint", label: "Married filing jointly" },
          ]}
        />
        <details className="p-details">
          <summary>Wages before this check, optional</summary>
          <DollarInput
            id="paycheck-ytd"
            label="This employer's taxable wages before this check"
            value={ytdText}
            onChange={setYtd}
            optional
            hint="Use wages before this paycheck, not including it. Leave blank to use annual payroll tax averages."
            error={submitted ? ytdError : undefined}
          />
          <p className="t-hint">
            This assumes the same taxable wage amount for Social Security and Medicare.
          </p>
        </details>
        <div className="t-assume">
          <strong>What this estimate assumes</strong>
          <p>Gross pay equals taxable wages. Pay stays the same all year.</p>
          <p>Your current W-4 has no extra settings, credits, or additional withholding.</p>
          <p>
            Pre-tax paycheck deductions change taxable wages. This tool cannot read your
            employer&apos;s deductions.
          </p>
          <a href={sources.withholding}>See the IRS withholding method</a>
        </div>
        <button type="submit" className="btn btn-primary">
          Break down my paycheck
        </button>
        {submitted && !valid ? (
          <p role="alert" className="p-error">
            Check the pay amounts above. Your breakdown will appear after the entries are valid.
          </p>
        ) : null}
        <p className="t-hint">Your entries stay in this browser. Nothing is saved.</p>
      </form>

      {result ? (
        <section className="t-panel p-result" aria-label="Your paycheck results">
          <div className="p-result-top" role="status" aria-live="polite">
            <p className="t-hero-eyebrow">Where did it go?</p>
            <h2>
              {result.gross === 0 ? (
                "No pay to break down"
              ) : (
                <>
                  You kept <a href={inputSource}>{result.takeHomePercent.toFixed(1)}%</a>.
                </>
              )}
            </h2>
            <p>
              {result.gross === 0 ? (
                "Both pay amounts are zero. Enter a paycheck to see your take-home share."
              ) : (
                <>
                  <Amount value={result.net} href={inputSource} /> reached your bank.{" "}
                  <Amount value={result.gross - result.net} href={inputSource} /> came out before
                  the deposit.
                </>
              )}
            </p>
          </div>
          <p className="t-assume">
            {result.mode === "average"
              ? "Payroll taxes below are annual averages. Enter wages before this check to account for yearly limits on this paycheck."
              : "Payroll taxes below use your wages before this check. Income tax uses this paycheck and the listed W-4 assumptions."}
          </p>
          {result.reconciles ? (
            <>
              <div
                className="p-pay-bar"
                role="img"
                aria-label="Your paycheck split between take-home pay, federal taxes, and other deductions"
              >
                <span style={{ width: `${result.takeHomePercent}%` }} />
                <span
                  style={{ width: `${result.gross ? (result.taxes / result.gross) * 100 : 0}%` }}
                />
                <span
                  style={{
                    width: `${result.gross ? (result.remainder / result.gross) * 100 : 0}%`,
                  }}
                />
              </div>
              <p className="p-bar-key">Take-home · Federal taxes · Other deductions</p>
              <p>
                Federal taxes account for <Amount value={result.taxes} href="#paycheck-tax-math" />.{" "}
                The remaining <Amount value={result.remainder} href="#paycheck-remainder" /> is
                unexplained.
              </p>
            </>
          ) : (
            <div role="alert" className="p-mismatch">
              <strong>These assumptions do not match your deposit.</strong>
              <p>
                Estimated taxes exceed the missing pay by{" "}
                <Amount value={-result.remainder} href="#paycheck-tax-math" />.
              </p>
              <p>
                Check taxable wages, W-4 settings, and wages before this check against your pay
                stub.
              </p>
            </div>
          )}

          <dl className="p-lines">
            <BreakdownLine label="Gross pay" value={result.gross} href={inputSource}>
              This is your pay before deductions. You supplied this amount.
            </BreakdownLine>
            <BreakdownLine
              label="Social Security"
              value={result.socialSecurity}
              href={sources.socialSecurity}
            >
              This helps pay retirement and disability benefits.{" "}
              <a href={sources.socialSecurity}>
                The rate is 6.2%, up to {paycheckMoney(rules.socialSecurityWageBase)} in yearly
                wages.
              </a>
            </BreakdownLine>
            <BreakdownLine label="Medicare" value={result.medicare} href={sources.medicare}>
              This helps fund health coverage for older people.{" "}
              <a href={sources.medicare}>The rate is 1.45% of all taxable wages.</a>
            </BreakdownLine>
            <BreakdownLine
              label="Additional Medicare withholding"
              value={result.additionalMedicare}
              href={sources.additionalMedicare}
            >
              <a href={sources.additionalMedicare}>
                Employers withhold another 0.9% after{" "}
                {paycheckMoney(rules.additionalMedicareWithholdingThreshold)} in yearly wages.
              </a>{" "}
              That payroll rule applies to both filing statuses.
            </BreakdownLine>
            <BreakdownLine
              label="Federal income tax estimate"
              value={result.federalIncomeTax}
              href={sources.withholding}
            >
              Your employer sends this money toward your federal tax bill. Each slice of pay uses
              its own rate, shown below.
            </BreakdownLine>
            <div id="paycheck-remainder">
              <BreakdownLine
                label={
                  result.reconciles
                    ? "Other deductions (benefits, 401k, etc.)"
                    : "Unexplained difference"
                }
                value={result.remainder}
                href="#paycheck-tax-math"
              >
                {result.reconciles
                  ? "This remainder includes everything outside our federal estimate, including state taxes. The tool cannot see inside employer deductions."
                  : "The estimate is larger than the amount missing from your pay. This negative difference is not an employer deduction."}
              </BreakdownLine>
            </div>
            <BreakdownLine label="Net deposit" value={result.net} href={inputSource}>
              This is the money that reached your bank. You supplied this amount.
            </BreakdownLine>
          </dl>

          <details id="paycheck-tax-math" className="p-details" open>
            <summary>See every step of the federal math</summary>
            <p>
              We use the IRS standard schedule for a current W-4. Higher rates apply only to the pay
              inside each band.
            </p>
            <ol className="p-math">
              <li>
                <a href={sources.withholding}>
                  {paycheckMoney(result.gross)} × {result.withholding.periods} checks ={" "}
                  {paycheckMoney(result.annual.gross)} yearly pay.
                </a>
              </li>
              <li>
                <a href={sources.withholding}>
                  {paycheckMoney(result.annual.gross)} minus the IRS adjustment of{" "}
                  {paycheckMoney(result.withholding.adjustment)} ={" "}
                  {paycheckMoney(result.withholding.adjustedAnnualWages)} adjusted yearly wages.
                </a>
              </li>
              {result.withholding.bracketLines.map((line) => (
                <li key={line.lower}>
                  <a href={sources.withholding}>
                    {paycheckMoney(line.lower)}{" "}
                    {Number.isFinite(line.upper) ? `to ${paycheckMoney(line.upper)}` : "and above"}:{" "}
                    {paycheckMoney(line.wages)} × {(line.rate * 100).toFixed(0)}% ={" "}
                    {paycheckMoney(line.tax)} yearly tax.
                  </a>
                </li>
              ))}
              <li>
                <a href={sources.withholding}>
                  IRS row check: {paycheckMoney(result.withholding.baseTax)} + (
                  {paycheckMoney(result.withholding.excess)} ×{" "}
                  {(result.withholding.rate * 100).toFixed(0)}%) ={" "}
                  {paycheckMoney(result.withholding.annualTax)}.
                </a>
              </li>
              <li>
                <a href={sources.withholding}>
                  {paycheckMoney(result.withholding.annualTax)} ÷ {result.withholding.periods}{" "}
                  checks = {paycheckMoney(result.federalIncomeTax)} income tax per check.
                </a>
              </li>
              <li>
                <a href={sources.socialSecurity}>
                  {paycheckMoney(result.socialSecurityTaxable)} × 6.2% ={" "}
                  {paycheckMoney(result.socialSecurity)} Social Security.
                </a>
              </li>
              <li>
                <a href={sources.medicare}>
                  {paycheckMoney(result.gross)} × 1.45% = {paycheckMoney(result.medicare)} Medicare.
                </a>
              </li>
              <li>
                <a href={sources.additionalMedicare}>
                  {paycheckMoney(result.additionalMedicareTaxable)} × 0.9% ={" "}
                  {paycheckMoney(result.additionalMedicare)} additional Medicare withholding.
                </a>
              </li>
              <li>
                <a href={inputSource}>
                  {paycheckMoney(result.gross)} minus {paycheckMoney(result.net)} minus{" "}
                  {paycheckMoney(result.taxes)} = {paycheckMoney(result.remainder)} unexplained.
                </a>
              </li>
            </ol>
            <p className="t-hint">
              Tax rows show cents. The income tax total uses unrounded bracket math.
            </p>
          </details>

          <section aria-labelledby="paycheck-annual">
            <h3 id="paycheck-annual">If every check looked like this</h3>
            <p className="t-hint">
              This repeats your pay across a full year. Payroll tax projections apply the yearly
              limits, so they differ from multiplying one check.
            </p>
            <dl className="p-annual">
              {[
                { label: "Gross pay", value: result.annual.gross, href: inputSource },
                { label: "Net deposits", value: result.annual.net, href: inputSource },
                {
                  label: "Federal income tax",
                  value: result.annual.federalIncomeTax,
                  href: sources.withholding,
                },
                {
                  label: "Social Security",
                  value: result.annual.socialSecurity,
                  href: sources.socialSecurity,
                },
                { label: "Medicare", value: result.annual.medicare, href: sources.medicare },
                {
                  label: "Additional Medicare withheld",
                  value: result.annual.additionalMedicare,
                  href: sources.additionalMedicare,
                },
                {
                  label: result.annual.remainder >= 0 ? "Other deductions" : "Projection mismatch",
                  value: result.annual.remainder,
                  href: "#paycheck-remainder",
                },
              ].map((line) => (
                <div key={line.label}>
                  <dt>{line.label}</dt>
                  <dd>
                    <Amount value={line.value} href={line.href} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="t-hint">
              <a href={sources.additionalMedicare}>
                Your tax-return threshold is{" "}
                {paycheckMoney(rules.additionalMedicareLiabilityThreshold[filingStatus])}.
              </a>{" "}
              This paycheck alone projects{" "}
              <Amount
                value={result.annual.additionalMedicareLiability}
                href={sources.additionalMedicare}
              />{" "}
              in additional Medicare tax owed.
            </p>
            <p className="t-hint">
              Joint returns combine both spouses&apos; wages. This tool has only your paycheck, so
              household tax can differ.
            </p>
          </section>

          <ShareCard
            data={{
              title: "My paycheck, explained",
              url: toolUrl,
              metrics: [
                { label: "Gross", value: paycheckMoney(result.gross), href: inputSource },
                { label: "Net", value: paycheckMoney(result.net), href: inputSource },
                {
                  label: "Take-home",
                  value: result.gross ? `${result.takeHomePercent.toFixed(1)}%` : "No pay",
                  href: inputSource,
                },
              ],
              summary:
                result.gross === 0
                  ? "No pay entered. There is no take-home percentage."
                  : result.reconciles
                    ? `I kept ${Math.round(result.takeHomePercent)}% of my paycheck. Here's where the rest went.`
                    : `I kept ${Math.round(result.takeHomePercent)}% of my paycheck. My tax estimate needs a pay stub check.`,
            }}
          />
          <CopyNumbersButton summary={summary} />
        </section>
      ) : (
        <section className="t-panel p-empty" aria-label="Your breakdown will appear here">
          <p className="t-hero-eyebrow">Your paycheck, explained</p>
          <h2>Make the missing dollars make sense.</h2>
          <p>
            Your gross pay, your deposit, and the gap between them. Every tax line comes with an
            explanation and a source.
          </p>
          <p>Start with the amounts on your latest pay stub.</p>
        </section>
      )}
    </div>
  );
}
