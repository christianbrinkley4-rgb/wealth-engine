"use client";

/**
 * Standalone IRMAA checker.
 *
 * The tier and both surcharges come from lib/irmaaChecker.ts, which reads the
 * existing bracket logic. Nothing is sent anywhere until the visitor submits
 * the email form at the bottom, and that form sends only what it shows.
 */

import Link from "next/link";
import { useMemo, useState } from "react";

import { AssumptionBox, Stat } from "@/app/tools/_components/tool-shared";
import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { AGENT } from "@/lib/agent";
import type { FilingStatus } from "@/lib/irmaa";
import {
  checkIrmaa,
  IRMAA_CHECKER_CHECKED_LABEL,
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaLeadLabel,
  normalizeIncomeInput,
  parseIncome,
} from "@/lib/irmaaChecker";
import { CMS_PARTS_AB_SOURCE } from "@/lib/medicareCosts2026";

const FILING_OPTIONS: ReadonlyArray<{ value: FilingStatus; label: string }> = [
  { value: "individual", label: "Single" },
  { value: "married_jointly", label: "Married, filing jointly" },
];

function dollars(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function wholeDollars(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function IrmaaChecker() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("individual");
  const [incomeText, setIncomeText] = useState("");

  const income = useMemo(() => parseIncome(incomeText), [incomeText]);
  const result = useMemo(
    () => (income === null ? null : checkIrmaa(income, filingStatus)),
    [income, filingStatus],
  );
  const joint = filingStatus === "married_jointly";

  return (
    <div>
      <div className="t-grid">
        <div className="t-field">
          <span
            id="irmaa-filing-label"
            style={{ fontWeight: 600, fontSize: "max(var(--minimum-text, 0px), 0.9444rem)" }}
          >
            How you filed your {IRMAA_CHECKER_TAX_YEAR} tax return
          </span>
          <div className="t-radio-row" role="group" aria-labelledby="irmaa-filing-label">
            {FILING_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="t-radio"
                aria-pressed={filingStatus === option.value}
                onClick={() => setFilingStatus(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="t-hint">
            Head of household or qualifying surviving spouse? Choose Single. Married filing separately and lived apart from your spouse all year? Choose Single. Married filing separately and lived with your spouse at any time that year? Different limits apply, and this tool does not cover them.
          </p>
        </div>

        <div className="t-field">
          <label htmlFor="irmaa-income">Income on your {IRMAA_CHECKER_TAX_YEAR} tax return</label>
          <div className="t-money">
            <span aria-hidden>$</span>
            <input
              id="irmaa-income"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0"
              value={incomeText}
              onChange={(event) => {
                setIncomeText(normalizeIncomeInput(event.target.value));
              }}
              aria-describedby="irmaa-income-hint"
            />
          </div>
          <p className="t-hint" id="irmaa-income-hint">
            Use your adjusted gross income plus any tax-exempt interest. On the{" "}
            {IRMAA_CHECKER_TAX_YEAR} Form 1040, that is line 11 plus line 2a.
          </p>
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <>
            <dl className="t-results">
              <Stat
                hero
                label={`Your ${result.year} IRMAA tier`}
                value={result.tier === 0 ? "No surcharge" : `Tier ${result.tier} of ${result.tierCount}`}
                sub={
                  result.tier === 0
                    ? "You pay the standard premium."
                    : `Based on your ${result.taxYear} income.`
                }
              />
              <Stat
                label={`Part B premium, ${result.year}`}
                value={dollars(result.partBPremium)}
                sub={
                  result.partBSurcharge > 0
                    ? `a month. That is the standard ${dollars(result.standardPartBPremium)} plus a ${dollars(result.partBSurcharge)} surcharge.`
                    : "a month. This is the standard amount."
                }
              />
              <Stat
                label={`Part D surcharge, ${result.year}`}
                value={result.partDSurcharge > 0 ? `+${dollars(result.partDSurcharge)}` : "$0.00"}
                sub={
                  result.partDSurcharge > 0
                    ? "a month, added to your drug plan premium."
                    : "a month. No amount is added to your drug plan premium."
                }
              />
            </dl>

            <p className="t-verdict">
              {result.tier === 0 ? (
                <>
                  With {wholeDollars(result.income)} of income, you do not pay an IRMAA surcharge
                  in {result.year}.
                  {result.nextTierLine !== null ? (
                    <>
                      {" "}
                      The first tier starts when income is more than{" "}
                      <strong>{wholeDollars(result.nextTierLine)}</strong>.
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  The two surcharges add <strong>{dollars(result.monthlySurcharge)} a month</strong>
                  , or <strong>{dollars(result.annualSurcharge)} for the year</strong>, for one
                  person.
                  {result.nextTierLine !== null ? (
                    <>
                      {" "}
                      The next tier starts when income is{" "}
                      {result.nextTierStartsAtLine ? "" : "more than "}
                      <strong>{wholeDollars(result.nextTierLine)}</strong>
                      {result.nextTierStartsAtLine ? " or more" : ""}.
                    </>
                  ) : (
                    <> This is the highest tier.</>
                  )}
                </>
              )}
              {joint && result.tier > 0
                ? " On a joint return, each spouse who has Medicare pays these amounts."
                : ""}
            </p>

            {result.tier > 0 ? (
              <p className="t-hint">
                Has your income gone down since {result.taxYear} because you retired, because
                your spouse died, or because of another major life change? You can ask Social
                Security to use a more recent year.{" "}
                <Link href="/irmaa-appeal" className="underline underline-offset-2">
                  Read how to ask for a new decision
                </Link>
                .
              </p>
            ) : null}
          </>
        ) : (
          <p className="t-verdict">
            Choose how you filed and enter your income. Your {IRMAA_CHECKER_YEAR} tier and both
            surcharge amounts will show here.
          </p>
        )}
      </div>

      <AssumptionBox>
        <p>
          <strong>What this tool uses.</strong> The official {IRMAA_CHECKER_YEAR} amounts from
          CMS, for people who file single or married filing jointly. As of{" "}
          {IRMAA_CHECKER_CHECKED_LABEL}, CMS has not announced the 2027 amounts. Social Security makes the real decision and
          mails it to you. This result is an estimate for education. Source:{" "}
          <a
            href={CMS_PARTS_AB_SOURCE.url}
            className="underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {CMS_PARTS_AB_SOURCE.title}
          </a>
          .
        </p>
      </AssumptionBox>

      {result ? (
        <>
          <p className="t-hint" style={{ marginTop: "1.5rem" }}>
            Your numbers stay on your device unless you send them with the form below. The form
            sends your filing status, your income, and this result to {AGENT.name}.
          </p>
          <EmailResultsCapture
            source="wizard_completion"
            heading="Email me these numbers"
            intro="Send me a copy of this result and I will look it over with you. Your request comes to me only."
            submitLabel="Email this result to me"
            wizardData={{
              zip_code: "",
              filing_status: result.filingStatus,
              annual_income: result.income,
              calculated_premium: result.partBPremium,
              irmaa_bracket: irmaaLeadLabel(result),
            }}
          />
        </>
      ) : null}
    </div>
  );
}
