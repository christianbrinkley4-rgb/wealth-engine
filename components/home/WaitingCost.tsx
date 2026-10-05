"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";

import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { formatMoney, partBPenalty } from "@/lib/partBPenalty";

const MAX_MONTHS = 72;

function describeMonths(months: number) {
  if (months === 0) return "On time";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  return `${parts.join(", ")} late`;
}

/**
 * Signature visual: what waiting on Part B adds to the bill, month by month.
 * Uses the same tested arithmetic as the Part B penalty calculator: 10% of the
 * standard premium for each full 12 months, for as long as you have Part B.
 */
export function WaitingCost() {
  const [months, setMonths] = useState(14);
  const id = useId();
  const result = partBPenalty(months);
  const base = STANDARD_BASE_PREMIUM_2026;
  const total = base + result.monthlyPenalty;
  // The bar scale tops out at the largest penalty the slider can show.
  const scaleMax = base + partBPenalty(MAX_MONTHS).monthlyPenalty;
  const nextStep = 12 - (months % 12);

  return (
    <div className="wc">
      <div className="wc-control">
        <label htmlFor={id} className="wc-label">
          How late you sign up for Part B
        </label>
        <output htmlFor={id} className="wc-months">
          {describeMonths(months)}
        </output>
        <input
          id={id}
          type="range"
          min={0}
          max={MAX_MONTHS}
          step={1}
          value={months}
          onChange={(event) => setMonths(Number(event.target.value))}
          className="wc-range"
          style={{ "--p": `${(months / MAX_MONTHS) * 100}%` } as React.CSSProperties}
          aria-valuetext={describeMonths(months)}
        />
        <div className="wc-ticks" aria-hidden>
          {[0, 1, 2, 3, 4, 5, 6].map((y) => (
            <span key={y}>{y === 0 ? "0" : `${y} yr`}</span>
          ))}
        </div>
      </div>

      <div className="wc-result" aria-live="polite">
        <div className="wc-figure">
          <span className="wc-figure-num">+{result.percent}%</span>
          <span className="wc-figure-note">
            {result.percent === 0
              ? months === 0
                ? "No penalty."
                : `No penalty yet. Only full 12-month stretches count. ${nextStep} more ${nextStep === 1 ? "month" : "months"} adds 10%.`
              : `Added to your Part B premium for as long as you have Part B.`}
          </span>
        </div>

        <div className="wc-bar" aria-hidden>
          <span className="wc-bar-base" style={{ width: `${(base / scaleMax) * 100}%` }} />
          <span
            className="wc-bar-extra"
            style={{ width: `${(result.monthlyPenalty / scaleMax) * 100}%` }}
          />
        </div>

        <dl className="wc-stats">
          <div>
            <dt>Standard premium, 2026</dt>
            <dd>{formatMoney(base)}/mo</dd>
          </div>
          <div>
            <dt>Penalty added</dt>
            <dd className="wc-accent">{formatMoney(result.monthlyPenalty)}/mo</dd>
          </div>
          <div>
            <dt>Over a year</dt>
            <dd>{formatMoney(result.annualPenalty)}</dd>
          </div>
          <div>
            <dt>You&apos;d pay</dt>
            <dd>{formatMoney(total)}/mo</dd>
          </div>
        </dl>
      </div>

      <p className="wc-foot">
        Estimate for education, at the 2026 standard premium. If you or your spouse have coverage
        through a current job, you can usually wait without any penalty.{" "}
        <Link href="/part-b-penalty" className="link-draw">
          <span>Work out your own number</span> <ArrowRight size={16} aria-hidden />
        </Link>
      </p>
    </div>
  );
}
