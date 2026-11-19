"use client";

/**
 * Greensboro Medicare cost calculator.
 * Everything runs in the visitor's browser. Estimates only. No data leaves
 * the page unless the visitor submits the email form at the bottom. That form
 * sends the age, the ZIP code, and the two yearly estimates. It never sends
 * the prescription count or the visit count. Educational, never a
 * recommendation.
 */

import { useMemo, useState } from "react";

import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { AGENT } from "@/lib/agent";
import {
  AssumptionBox,
  Slider,
  Stat,
} from "@/app/tools/_components/tool-shared";

import { calculate, calculatorLeadLabel, GUILFORD_ZIPS, PART_B_MONTHLY } from "./data";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function GreensboroCostCalculator() {
  const [age, setAge] = useState(67);
  const [zip, setZip] = useState("27401");
  const [meds, setMeds] = useState(2);
  const [visits, setVisits] = useState(6);
  const [showLines, setShowLines] = useState<"g" | "ma" | null>(null);

  const zipOk = useMemo(() => /^\d{5}$/.test(zip.trim()) && GUILFORD_ZIPS.has(zip.trim()), [zip]);

  const result = useMemo(
    () => calculate({ age, meds, visits }),
    [age, meds, visits],
  );

  return (
    <div>
      <div className="t-grid">
        <Slider
          label="Your age"
          value={age}
          min={65}
          max={90}
          display={`${age}`}
          onChange={setAge}
          hint="Medigap premiums rise with age. The estimate uses real filed NC rates."
        />
        <div className="t-field">
          <label htmlFor="zip-input">ZIP code</label>
          <input
            id="zip-input"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className="t-text-input"
            aria-describedby="zip-hint"
          />
          <p className="t-hint" id="zip-hint">
            {zip.trim().length === 5
              ? zipOk
                ? "In the Guilford County service area."
                : "Outside Guilford County. The plan figures may not apply to you."
              : "Enter your 5-digit ZIP."}
          </p>
        </div>
        <Slider
          label="Prescriptions per month"
          value={meds}
          min={0}
          max={10}
          display={`${meds}`}
          onChange={setMeds}
          hint="Count each regular prescription once."
        />
        <Slider
          label="Doctor visits per year"
          value={visits}
          min={0}
          max={24}
          display={`${visits}`}
          onChange={setVisits}
          hint="Include primary care and specialists."
        />
      </div>

      <div className="t-results" aria-live="polite">
        <Stat
          label="Medigap Plan G estimate"
          value={fmt(result.medigapYearly)}
          sub="/ year"
        />
        <Stat
          label="Medicare Advantage estimate"
          value={fmt(result.maYearly)}
          sub="/ year"
        />
      </div>

      <p className="t-verdict">
        On these inputs, <strong>{result.lowerPath}</strong> comes out about{" "}
        <strong>{fmt(result.difference)}</strong> lower per year. That is math, not advice.
        Your health, your doctors, and your prescriptions decide what fits.
      </p>

      <div className="t-breakdowns">
        <button
          type="button"
          className="t-toggle"
          onClick={() => setShowLines(showLines === "g" ? null : "g")}
          aria-expanded={showLines === "g"}
        >
          {showLines === "g" ? "Hide" : "Show"} what goes into the Medigap number
        </button>
        {showLines === "g" && (
          <ul className="t-lines">
            {result.medigapLines.map((l) => (
              <li key={l.label}>
                <span>{l.label}</span>
                <span>{fmt(l.amount)}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="t-toggle"
          onClick={() => setShowLines(showLines === "ma" ? null : "ma")}
          aria-expanded={showLines === "ma"}
        >
          {showLines === "ma" ? "Hide" : "Show"} what goes into the Advantage number
        </button>
        {showLines === "ma" && (
          <ul className="t-lines">
            {result.maLines.map((l) => (
              <li key={l.label}>
                <span>{l.label}</span>
                <span>{fmt(l.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AssumptionBox>
        <p>
          <strong>What these numbers assume.</strong> Part B at the 2027 final
          standard ($209.40/month). CMS announced the final 2027 amount on November 17, 2026.
          Medigap Plan G at Blue Cross NC filed non-tobacco rates for your age.
          A typical $0-premium Advantage plan with a $20 copay for each doctor visit.
          Each prescription at $12 a month. The $20 and the $12 are planning estimates
          with no official source.
          Real quotes depend on the insurer, your exact age, tobacco use, and the drugs
          you take. Nothing here is a recommendation.
        </p>
      </AssumptionBox>

      <p className="t-hint" style={{ marginTop: "1.5rem" }}>
        Your numbers stay on your device unless you send them with the form below. The form sends
        your age, your ZIP code, and the two yearly estimates to {AGENT.name}. It does not send
        your prescription count or your visit count. No cost, no obligation.
      </p>
      <EmailResultsCapture
        source="wizard_completion"
        wizardData={{
          zip_code: /^\d{5}$/.test(zip.trim()) ? zip.trim() : "",
          age,
          calculated_premium: PART_B_MONTHLY,
          irmaa_bracket: calculatorLeadLabel(result),
        }}
      />

      <div className="t-cta">
        <p>Want real numbers for your situation?</p>
        <a className="t-cta-button" href={AGENT.phoneHref}>
          Talk to Christian: {AGENT.phone}
        </a>
        <p className="t-cta-sub">Free. No obligation. You get him, not a call center.</p>
      </div>
    </div>
  );
}
