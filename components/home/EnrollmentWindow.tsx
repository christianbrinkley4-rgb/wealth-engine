"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

const monthAt = (birthMonth: number, offset: number) => (((birthMonth + offset) % 12) + 12) % 12;

/**
 * When Part B coverage starts if you sign up in a given month of the window.
 * Medicare.gov: sign up in the three months before your birthday month and
 * coverage starts the first day of your birthday month; sign up in your
 * birthday month or the three months after, and it starts the first day of
 * the following month. (People born on the 1st have a window one month
 * earlier; the date tool on /turning-65 handles that case.)
 */
function coverageStart(birthMonth: number, offset: number) {
  if (offset < 0) return MONTHS[monthAt(birthMonth, 0)];
  return MONTHS[monthAt(birthMonth, offset + 1)];
}

/**
 * Signature visual: the seven-month Initial Enrollment Period, drawn around
 * the month someone turns 65. Pick a birthday month, then tap any month in
 * the window to see when coverage would start. Educational only: no answer
 * leaves the page.
 */
export function EnrollmentWindow() {
  // A fixed example month on the server, so the first render matches.
  const [birthMonth, setBirthMonth] = useState(5);
  const [focus, setFocus] = useState(-1);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setDrawn(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const chosen = offsets.includes(focus) ? focus : -1;
  const birthName = MONTHS[birthMonth];

  return (
    <div className="ew" ref={ref} data-drawn={drawn ? "true" : undefined}>
      <div className="ew-picker">
        <p className="ew-label" id="ew-picker-label">
          The month you turn 65
        </p>
        <div className="ew-months" role="radiogroup" aria-labelledby="ew-picker-label">
          {SHORT.map((label, index) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={birthMonth === index}
              aria-label={MONTHS[index]}
              className="ew-month"
              onClick={() => {
                setBirthMonth(index);
                setFocus(-1);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="ew-stage" key={birthMonth}>
        <ol
          className="ew-track"
          aria-label={`Your enrollment window if you turn 65 in ${birthName}`}
        >
          {offsets.map((offset, i) => {
            const m = monthAt(birthMonth, offset);
            return (
              <li key={offset} style={{ "--i": i } as React.CSSProperties}>
                <button
                  type="button"
                  className="ew-seg"
                  data-kind={offset < 0 ? "before" : offset === 0 ? "birthday" : "after"}
                  data-active={chosen === offset ? "true" : undefined}
                  onClick={() => setFocus(offset)}
                  onMouseEnter={() => setFocus(offset)}
                  aria-label={`Sign up in ${MONTHS[m]}: coverage starts ${coverageStart(birthMonth, offset)} 1`}
                >
                  <span className="ew-seg-bar" aria-hidden />
                  <span className="ew-seg-month">{SHORT[m]}</span>
                  {offset === 0 ? (
                    <span className="ew-seg-flag" aria-hidden>
                      65
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="ew-medigap" aria-hidden>
          <span className="ew-medigap-bar" />
          <span className="ew-medigap-label">
            Medigap window: 6 months from when Part B starts, if you&apos;re 65 or older
          </span>
        </div>

        <div className="ew-readout" aria-live="polite">
          {chosen === -1 ? (
            <p>
              <strong>Example: turning 65 in {birthName}.</strong> Your window is seven months
              long. It opens in {MONTHS[monthAt(birthMonth, -3)]}, three months before you turn
              65, and closes at the end of {MONTHS[monthAt(birthMonth, 3)]}. Tap a month to see
              when coverage would start.
            </p>
          ) : (
            <p>
              <strong>
                Sign up in {MONTHS[monthAt(birthMonth, chosen)]}, and Part B starts{" "}
                {coverageStart(birthMonth, chosen)} 1.
              </strong>{" "}
              {chosen < 0
                ? "Signing up before your birthday month means no gap. Coverage is ready the day it can be."
                : chosen === 0
                  ? "Waiting until your birthday month pushes the start to the month after."
                  : "Signing up after your birthday month still works, but coverage starts later. Wait past the window and penalties can apply."}
            </p>
          )}
        </div>
      </div>

      <div className="ew-legend" aria-hidden>
        <span>
          <i data-kind="before" /> Before your birthday month
        </span>
        <span>
          <i data-kind="birthday" /> Birthday month
        </span>
        <span>
          <i data-kind="after" /> After
        </span>
      </div>

      <p className="ew-foot">
        Still working with coverage through a job? Different rules can apply, and you may be able to
        wait without a penalty.{" "}
        <Link href="/turning-65#enrollment-dates" className="link-draw">
          <span>Get your exact dates</span> <ArrowRight size={16} aria-hidden />
        </Link>
      </p>
    </div>
  );
}
