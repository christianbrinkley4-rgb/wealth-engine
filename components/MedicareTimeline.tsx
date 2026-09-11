"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Download, LockKeyhole, Printer } from "lucide-react";
import { enrollmentTimeline, timelineCalendar, type TimelineInput } from "@/lib/enrollmentTimeline";
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

  function calculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({
      input: { month: Number(month), year: Number(year), birthdayOnFirst },
      today: new Date(),
      coverage,
    });
    requestAnimationFrame(() => {
      resultHeading.current?.focus({ preventScroll: true });
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultHeading.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
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

  return (
    <div className="timeline-tool">
      <div className="timeline-form-panel">
        <div className="timeline-tool-label">
          <CalendarDays size={21} aria-hidden />
          <span>YOUR MEDICARE TIMELINE</span>
          <span className="timeline-free">FREE TOOL</span>
        </div>
        <form onSubmit={calculate}>
          <fieldset>
            <legend>When do you turn 65?</legend>
            <div className="timeline-date-fields">
              <label>
                Month
                <select required value={month} onChange={(event) => setMonth(event.target.value)}>
                  <option value="">Select</option>
                  {MONTHS.map((label, index) => (
                    <option value={index + 1} key={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Year
                <select value={year} onChange={(event) => setYear(event.target.value)}>
                  {Array.from({ length: 7 }, (_, i) => currentYear - 1 + i).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
          <label className="timeline-checkbox">
            <input
              type="checkbox"
              checked={birthdayOnFirst}
              onChange={(event) => setBirthdayOnFirst(event.target.checked)}
            />
            <span>
              My birthday is on the 1st of the month.
              <small>Medicare dates shift one month earlier.</small>
            </span>
          </label>
          <label className="timeline-coverage">
            What coverage will you have at 65?<span className="timeline-optional">Optional</span>
            <select value={coverage} onChange={(event) => setCoverage(event.target.value)}>
              <option value="">Choose if you know</option>
              <option value="employer">Current job (mine or my spouse’s)</option>
              <option value="other">Other coverage or no coverage</option>
              <option value="unsure">Something else / I’m not sure</option>
            </select>
          </label>
          <button className="personal-button" type="submit">
            {result ? "Update my dates" : "Show my dates"}
            <ArrowRight size={19} aria-hidden />
          </button>
          <p className="timeline-privacy">
            <LockKeyhole size={14} aria-hidden />
            Calculated in your browser. No name, email, or phone required.
          </p>
        </form>
      </div>
      <div className="timeline-result-panel" aria-live="polite" aria-atomic="true">
        {dates && result ? (
          <>
            <p className="personal-eyebrow">YOUR STARTING POINT</p>
            <h3 ref={resultHeading} tabIndex={-1}>
              Your enrollment dates
            </h3>
            {result.input.birthdayOnFirst && (
              <p className="timeline-adjusted">Adjusted for a birthday on the 1st.</p>
            )}
            <dl className="timeline-dates">
              <div>
                <dt>
                  <span>01</span> Your window opens
                </dt>
                <dd>{formatLongDate(dates.opensOn)}</dd>
              </div>
              <div>
                <dt>
                  <span>02</span> Enroll by this date for the start below
                </dt>
                <dd>{formatLongDate(dates.signUpBy)}</dd>
              </div>
              <div>
                <dt>
                  <span>03</span> Earliest Part B start, if you enroll in time
                </dt>
                <dd>{formatLongDate(dates.coverageStarts)}</dd>
              </div>
              <div>
                <dt>
                  <span>04</span> Your initial window ends
                </dt>
                <dd>{formatLongDate(dates.closesOn)}</dd>
              </div>
            </dl>
            <p className="timeline-context">
              {result.coverage === "employer"
                ? "Still working? These are your initial enrollment dates, not a recommendation to leave employer coverage. Confirm employer size, Part B timing, and any HSA contributions with your benefits administrator."
                : dates.status === "closed"
                  ? "This initial window has passed. You may have another enrollment opportunity. Check with Medicare or Social Security before assuming you owe a penalty or cannot enroll."
                  : "This is an estimate for someone first eligible at 65. If you enroll in your eligibility month or the following three months, Part B generally starts the next month. Your existing coverage can affect what to do."}
            </p>
            <div className="timeline-result-actions">
              <button type="button" onClick={saveCalendar}>
                <Download size={16} aria-hidden />
                Save dates to calendar
              </button>
              <button type="button" onClick={() => window.print()}>
                <Printer size={16} aria-hidden />
                Print
              </button>
            </div>
            <Link className="timeline-next" href="/start?topic=medicare&stage=turning_65_soon">
              Talk through my timeline with Christian <ArrowRight size={18} aria-hidden />
            </Link>
            <a
              className="timeline-source"
              href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source: Medicare.gov enrollment and coverage rules
            </a>
          </>
        ) : (
          <div className="timeline-empty">
            <span className="timeline-empty-icon">
              <CalendarDays size={38} strokeWidth={1.3} aria-hidden />
            </span>
            <h3>
              A few dates.
              <br />A lot less guesswork.
            </h3>
            <p>
              See when your enrollment window opens, when coverage could start, and when your
              initial window ends.
            </p>
            <ul>
              <li>
                <Check size={17} aria-hidden />
                Your dates, in plain English
              </li>
              <li>
                <Check size={17} aria-hidden />
                Save them to your calendar
              </li>
              <li>
                <Check size={17} aria-hidden />
                Ask for help whenever you’re ready
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
