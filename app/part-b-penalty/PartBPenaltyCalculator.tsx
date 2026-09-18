"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { trackEvent } from "@/app/components/Analytics";
import { AGENT } from "@/lib/agent";
import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { formatMoney, monthsBetween, partBPenalty } from "@/lib/partBPenalty";
import { MONTHS } from "@/lib/reminders";

type Answer = {
  eligible: { month: number; year: number };
  started: { month: number; year: number };
  hadJobCoverage: boolean;
};

const CURRENT_YEAR = new Date().getUTCFullYear();
const YEARS = Array.from({ length: 22 }, (_, i) => CURRENT_YEAR - 20 + i);

export function PartBPenaltyCalculator() {
  const [eligibleMonth, setEligibleMonth] = useState("");
  const [eligibleYear, setEligibleYear] = useState(String(CURRENT_YEAR - 2));
  const [startedMonth, setStartedMonth] = useState("");
  const [startedYear, setStartedYear] = useState(String(CURRENT_YEAR));
  const [hadJobCoverage, setHadJobCoverage] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  const months = answer ? monthsBetween(answer.eligible, answer.started) : 0;
  const penalty = answer ? partBPenalty(months) : null;

  function calculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer({
      eligible: { month: Number(eligibleMonth), year: Number(eligibleYear) },
      started: { month: Number(startedMonth), year: Number(startedYear) },
      hadJobCoverage,
    });
    trackEvent("timeline_complete");
    requestAnimationFrame(() => {
      resultHeading.current?.focus({ preventScroll: true });
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultHeading.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="tl">
      <div className="tl-panels">
        <form className="tl-form" onSubmit={calculate}>
          <fieldset>
            <legend>When could you first have had Part B?</legend>
            <p className="tl-privacy" style={{ marginTop: 0 }}>
              For most people this is the month they turned 65.
            </p>
            <div className="tl-date-fields">
              <div className="tl-field">
                <label htmlFor="pb-elig-month">Month</label>
                <select
                  id="pb-elig-month"
                  required
                  value={eligibleMonth}
                  onChange={(event) => setEligibleMonth(event.target.value)}
                >
                  <option value="">Choose</option>
                  {MONTHS.map((label, index) => (
                    <option value={index + 1} key={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="tl-field">
                <label htmlFor="pb-elig-year">Year</label>
                <select
                  id="pb-elig-year"
                  value={eligibleYear}
                  onChange={(event) => setEligibleYear(event.target.value)}
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>When did Part B start, or when will it?</legend>
            <div className="tl-date-fields">
              <div className="tl-field">
                <label htmlFor="pb-start-month">Month</label>
                <select
                  id="pb-start-month"
                  required
                  value={startedMonth}
                  onChange={(event) => setStartedMonth(event.target.value)}
                >
                  <option value="">Choose</option>
                  {MONTHS.map((label, index) => (
                    <option value={index + 1} key={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="tl-field">
                <label htmlFor="pb-start-year">Year</label>
                <select
                  id="pb-start-year"
                  value={startedYear}
                  onChange={(event) => setStartedYear(event.target.value)}
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <label className="tl-check">
            <input
              type="checkbox"
              checked={hadJobCoverage}
              onChange={(event) => setHadJobCoverage(event.target.checked)}
            />
            <span>
              I had health coverage from a current job the whole time
              <small>Yours or your spouse’s. This usually means no penalty at all.</small>
            </span>
          </label>

          <button className="home-button" type="submit">
            {answer ? "Update my estimate" : "Show my estimate"}
            <ArrowRight size={20} aria-hidden />
          </button>
          <p className="tl-privacy">
            <LockKeyhole size={15} aria-hidden />
            Worked out on your device. Nothing you enter here is saved.
          </p>
        </form>

        <div className="tl-result" aria-live="polite" aria-atomic="true">
          {answer && penalty ? (
            <>
              <div className="tl-countdown">
                {answer.hadJobCoverage ? (
                  <h3 ref={resultHeading} tabIndex={-1} className="tl-countdown-closed">
                    Coverage from a current job usually means no penalty.
                  </h3>
                ) : months < 12 ? (
                  <h3 ref={resultHeading} tabIndex={-1} className="tl-countdown-closed">
                    No penalty. You were inside twelve months.
                  </h3>
                ) : (
                  <>
                    <span className="tl-countdown-number" aria-hidden>
                      {penalty.percent}%
                    </span>
                    <h3 ref={resultHeading} tabIndex={-1}>
                      <span className="sr-only">{penalty.percent}% </span>
                      added to your Part B premium, for as long as you have Part B
                    </h3>
                  </>
                )}
                <p>
                  {months <= 0
                    ? "Part B started before the month you were first eligible, so there is nothing late here."
                    : `${months} month${months === 1 ? "" : "s"} between being eligible and coverage starting` +
                      // Counting years next to "no penalty" reads like a
                      // contradiction, so it only appears when it applies.
                      (penalty.periods > 0 && !answer.hadJobCoverage
                        ? ` · ${penalty.periods} full year${penalty.periods === 1 ? "" : "s"} counted`
                        : "")}
                </p>
              </div>

              {!answer.hadJobCoverage && penalty.percent > 0 ? (
                <dl className="tl-dates">
                  <div>
                    <dt>{formatMoney(penalty.monthlyPenalty)} a month</dt>
                    <dd>
                      On top of the {formatMoney(STANDARD_BASE_PREMIUM_2026)} standard premium for
                      2026.
                    </dd>
                  </div>
                  <div className="tl-date-key">
                    <dt>{formatMoney(penalty.annualPenalty)} a year</dt>
                    <dd>Every year, not once.</dd>
                  </div>
                  <div>
                    <dt>{formatMoney(penalty.twentyYearPenalty)} over twenty years</dt>
                    <dd>
                      An illustration of the same penalty carried through a normal retirement.
                    </dd>
                  </div>
                </dl>
              ) : null}

              <p className="tl-context">
                {answer.hadJobCoverage
                  ? "Coverage through a job you or your spouse currently work at generally gives you a Special Enrollment Period, and no penalty. Retiree coverage, COBRA, and marketplace plans do not count the same way, so it is worth confirming which one you had before assuming either result."
                  : "This is an estimate for education, not a determination. Medicare decides the penalty, it is based on the standard premium rather than an income-adjusted one, and exceptions apply — coverage from current work, Special Enrollment Periods, and help paying Medicare costs can all change it."}
              </p>

              <Link className="tl-next" href="/start?topic=medicare">
                Check this with Christian before you assume it <ArrowRight size={19} aria-hidden />
              </Link>
              <p className="tl-context">
                If a penalty has been added and you think it is wrong, it can be appealed. That is
                worth a conversation — call {AGENT.phone}.
              </p>
              <a
                className="tl-source"
                href="https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: Medicare.gov, avoiding the Part B late enrollment penalty
              </a>
            </>
          ) : (
            <div className="tl-empty">
              <h3>Your estimate will show here.</h3>
              <p>Enter two dates and you’ll see:</p>
              <ul>
                <li>Whether a penalty applies at all</li>
                <li>What it adds every month, and every year</li>
                <li>What it comes to if you carry it through retirement</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
