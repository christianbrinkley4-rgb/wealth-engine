"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, LockKeyhole, Printer } from "lucide-react";

import { trackEvent } from "@/app/components/Analytics";
import { TimelineEmailCapture } from "@/components/TimelineEmailCapture";
import {
  enrollmentTimeline,
  timelineCalendar,
  timelineCountdown,
  type TimelineInput,
} from "@/lib/enrollmentTimeline";
import { formatLongDate, MONTHS } from "@/lib/reminders";

export function MedicareTimeline({ currentYear }: { currentYear: number }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(String(currentYear));
  const [birthdayOnFirst, setBirthdayOnFirst] = useState(false);
  const [coverage, setCoverage] = useState("");
  const [result, setResult] = useState<{
    input: TimelineInput;
    today: Date;
    coverage: string;
  } | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const dates = result ? enrollmentTimeline(result.input, result.today) : null;
  const countdown = dates && result ? timelineCountdown(dates, result.today) : null;

  function calculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({
      input: { month: Number(month), year: Number(year), birthdayOnFirst },
      today: new Date(),
      coverage,
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

  function saveCalendar() {
    if (!result) return;
    const url = URL.createObjectURL(
      new Blob([timelineCalendar(result.input, result.today)], {
        type: "text/calendar;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-medicare-dates.ics";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const turningLabel = result
    ? `Turning 65 in ${MONTHS[result.input.month - 1]} ${result.input.year}`
    : "";

  return (
    <div className="tl">
      <div className="tl-panels">
        <form className="tl-form" onSubmit={calculate}>
          <fieldset>
            <legend>When do you turn 65?</legend>
            <div className="tl-date-fields">
              <div className="tl-field">
                <label htmlFor="tl-month">Month</label>
                <select
                  id="tl-month"
                  required
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
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
                <label htmlFor="tl-year">Year</label>
                <select id="tl-year" value={year} onChange={(event) => setYear(event.target.value)}>
                  {Array.from({ length: 7 }, (_, i) => currentYear - 1 + i).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
          <label className="tl-check">
            <input
              type="checkbox"
              checked={birthdayOnFirst}
              onChange={(event) => setBirthdayOnFirst(event.target.checked)}
            />
            <span>
              My birthday is on the 1st of the month
              <small>Medicare moves your dates one month earlier.</small>
            </span>
          </label>
          <div className="tl-field">
            <label htmlFor="tl-coverage">
              Coverage you’ll have at 65 <span className="tl-optional">Optional</span>
            </label>
            <select
              id="tl-coverage"
              value={coverage}
              onChange={(event) => setCoverage(event.target.value)}
            >
              <option value="">Choose if you know</option>
              <option value="employer">A current job (mine or my spouse’s)</option>
              <option value="other">Other coverage, or none</option>
              <option value="unsure">I’m not sure</option>
            </select>
          </div>
          <button className="home-button" type="submit">
            {result ? "Update my dates" : "Show my dates"}
            <ArrowRight size={20} aria-hidden />
          </button>
          <p className="tl-privacy">
            <LockKeyhole size={15} aria-hidden />
            Worked out on your device. Nothing you enter here is saved.
          </p>
        </form>

        <div className="tl-result" aria-live="polite" aria-atomic="true">
          {dates && result && countdown ? (
            <>
              <div className="tl-countdown">
                {countdown.kind === "closed" ? (
                  <h3 ref={resultHeading} tabIndex={-1} className="tl-countdown-closed">
                    This first enrollment window has passed.
                  </h3>
                ) : (
                  <>
                    <span className="tl-countdown-number" aria-hidden>
                      {countdown.days}
                    </span>
                    <h3 ref={resultHeading} tabIndex={-1}>
                      <span className="sr-only">{countdown.days} </span>
                      {countdown.kind === "upcoming"
                        ? countdown.days === 1
                          ? "day until your enrollment window opens"
                          : "days until your enrollment window opens"
                        : countdown.days === 1
                          ? "day left in your enrollment window"
                          : "days left in your enrollment window"}
                    </h3>
                  </>
                )}
                <p>
                  {turningLabel}
                  {result.input.birthdayOnFirst ? " · adjusted for a birthday on the 1st" : ""}
                </p>
              </div>

              <dl className="tl-dates">
                <div>
                  <dt>{formatLongDate(dates.opensOn)}</dt>
                  <dd>Your window opens. You can sign up for Parts A and B.</dd>
                </div>
                <div className="tl-date-key">
                  <dt>{formatLongDate(dates.signUpBy)}</dt>
                  <dd>
                    Enroll by this date so Part B can start{" "}
                    <strong>{formatLongDate(dates.coverageStarts)}</strong>.
                  </dd>
                </div>
                <div>
                  <dt>{formatLongDate(dates.closesOn)}</dt>
                  <dd>Your window closes. Late penalties can apply after this.</dd>
                </div>
                <div>
                  <dt>
                    {formatLongDate(dates.medigapOpens)} to {formatLongDate(dates.medigapCloses)}
                  </dt>
                  <dd>Your Medigap window, if Part B starts then. No health questions.</dd>
                </div>
              </dl>

              <p className="tl-context">
                {result.coverage === "employer"
                  ? "Still working? These are your first enrollment dates, not a reason to leave your job’s coverage. Your employer’s size and any HSA contributions change the right timing, so check with your benefits office first."
                  : dates.status === "closed"
                    ? "You may have another chance to enroll. Check with Medicare or Social Security before assuming you owe a penalty."
                    : "If you have coverage through your job or your spouse’s job, your timing can be different. I can check it with you."}
              </p>

              <div className="tl-actions">
                <button type="button" onClick={saveCalendar}>
                  <Download size={18} aria-hidden />
                  Save to my calendar
                </button>
                <button type="button" onClick={() => window.print()}>
                  <Printer size={18} aria-hidden />
                  Print
                </button>
              </div>
              <Link className="tl-next" href="/start?topic=medicare&stage=turning_65_soon">
                Go over these dates with Christian <ArrowRight size={19} aria-hidden />
              </Link>
              <a
                className="tl-source"
                href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: Medicare.gov enrollment rules
              </a>
            </>
          ) : (
            <div className="tl-empty">
              <h3>Your dates will show here.</h3>
              <p>Pick the month you turn 65. You’ll see:</p>
              <ul>
                <li>When your enrollment window opens</li>
                <li>The date to enroll by so coverage starts on time</li>
                <li>When the window closes, and penalties can begin</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {result && dates ? (
        <TimelineEmailCapture input={result.input} windowClosed={dates.status === "closed"} />
      ) : null}
    </div>
  );
}
