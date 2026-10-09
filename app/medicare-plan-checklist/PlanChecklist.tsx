"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/app/components/Analytics";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import {
  CHECKLIST_COUNTIES,
  CHECKLIST_PRIORITIES,
  isChecklistCounty,
  PLAN_COMPARE_URL,
  SHIIP_CONTACT_URL,
} from "@/lib/planChecklist";

const STEPS = [
  "Where you live",
  "Doctors and hospitals",
  "Prescriptions and pharmacy",
  "What matters most",
  "Your sheet",
] as const;
const LAST_QUESTION_STEP = 3;
const SHEET_STEP = 4;

const EMPTY = {
  zip: "",
  county: "",
  doctors: "",
  hospitals: "",
  prescriptions: "",
  pharmacy: "",
  travel: "",
  budget: "",
};
type Field = keyof typeof EMPTY;

const SHEET_LABELS: Record<Field, string> = {
  zip: "ZIP",
  county: "County",
  doctors: "Doctors",
  hospitals: "Hospitals",
  prescriptions: "Prescriptions and doses",
  pharmacy: "Pharmacy",
  travel: "Travel",
  budget: "Monthly budget",
};

/**
 * Everything typed here stays in this component's state. Nothing is saved,
 * sent, put in the address bar, or reported to analytics. The two events say
 * only that a checklist was started and finished.
 */
export function PlanChecklist() {
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState(EMPTY);
  const [priorities, setPriorities] = useState<string[]>([]);
  const started = useRef(false);
  const completed = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Move focus to the step heading after a step change, never on first load.
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);

  function goTo(next: number) {
    moved.current = true;
    setStep(next);
  }

  function start() {
    if (started.current) return;
    started.current = true;
    trackEvent("checklist_start");
  }

  function update(field: Field, value: string) {
    start();
    setEntries((previous) => ({ ...previous, [field]: value }));
  }

  function next() {
    start();
    if (step === LAST_QUESTION_STEP && !completed.current) {
      completed.current = true;
      trackEvent("checklist_complete");
    }
    goTo(Math.min(SHEET_STEP, step + 1));
  }

  function clear() {
    setEntries(EMPTY);
    setPriorities([]);
    goTo(0);
  }

  function field(name: Field, label: string, hint: string, multiline = true) {
    const id = `checklist-${name}`;
    return (
      <div className="checklist-field">
        <label htmlFor={id}>{label}</label>
        <p id={`${id}-hint`}>{hint}</p>
        {multiline ? (
          <textarea
            id={id}
            rows={4}
            maxLength={2000}
            value={entries[name]}
            onChange={(e) => update(name, e.target.value)}
            aria-describedby={`${id}-hint`}
          />
        ) : (
          <input
            id={id}
            type="text"
            maxLength={name === "zip" ? 5 : 160}
            inputMode={name === "zip" ? "numeric" : undefined}
            autoComplete="off"
            value={entries[name]}
            onChange={(e) => update(name, e.target.value)}
            aria-describedby={`${id}-hint`}
          />
        )}
      </div>
    );
  }

  return (
    <section className="checklist app-shell max-w-3xl" aria-label="Medicare research checklist">
      <p className="checklist-progress" aria-live="polite">
        {step < SHEET_STEP ? `Step ${step + 1} of ${SHEET_STEP}` : "Done"}
      </p>
      <h2 ref={heading} tabIndex={-1}>
        {STEPS[step]}
      </h2>
      {step < SHEET_STEP ? (
        <p className="checklist-privacy">
          Skip anything you like. What you type stays on this screen. It is not saved, and it is not
          sent to me or anyone else. Reload the page and it is gone.
        </p>
      ) : null}

      {step === 0 ? (
        <>
          {field(
            "zip",
            "ZIP code",
            "Medicare.gov will ask for this first. I don’t look anything up with it.",
            false,
          )}
          <div className="checklist-field">
            <label htmlFor="checklist-county">County</label>
            <p id="checklist-county-hint">
              Plans are offered by county. Pick the county you live in, not where your doctor is.
            </p>
            <select
              id="checklist-county"
              value={entries.county}
              onChange={(e) => update("county", e.target.value)}
              aria-describedby="checklist-county-hint"
            >
              <option value="">Choose one</option>
              {CHECKLIST_COUNTIES.map((county) => (
                <option key={county}>{county}</option>
              ))}
              <option>Another county</option>
              <option>Not sure</option>
            </select>
          </div>
          {entries.county && !isChecklistCounty(entries.county) ? (
            <p role="status">
              That’s fine. The sheet works the same anywhere. Medicare.gov will show your county
              when you type your ZIP, and the SHIIP link below finds a free counselor in any North
              Carolina county.
            </p>
          ) : null}
        </>
      ) : null}

      {step === 1 ? (
        <>
          {field(
            "doctors",
            "Doctors",
            "One per line. Add the practice name or town, so you check the right office.",
          )}
          {field("hospitals", "Hospitals", "The ones you would want to be able to use.")}
        </>
      ) : null}

      {step === 2 ? (
        <>
          {field(
            "prescriptions",
            "Prescriptions",
            "One per line, with the dose and how often you take it. Copy it off the bottle.",
          )}
          {field("pharmacy", "Pharmacy", "Where you fill them. Note mail order if you use it.")}
        </>
      ) : null}

      {step === 3 ? (
        <>
          {field("travel", "Travel", "Where you spend time away from home, and for how long.")}
          {field(
            "budget",
            "Monthly budget",
            "Roughly what you’d be comfortable paying each month. A note to yourself, not a quote.",
            false,
          )}
          <fieldset>
            <legend>What matters most?</legend>
            {CHECKLIST_PRIORITIES.map((priority) => (
              <label className="checklist-choice" key={priority}>
                <input
                  type="checkbox"
                  checked={priorities.includes(priority)}
                  onChange={(e) => {
                    start();
                    setPriorities((previous) =>
                      e.target.checked
                        ? [...previous, priority]
                        : previous.filter((value) => value !== priority),
                    );
                  }}
                />
                {priority}
              </label>
            ))}
          </fieldset>
        </>
      ) : null}

      {step === SHEET_STEP ? (
        <>
          <article className="plan-sheet" aria-label="Printable research sheet">
            <h3>My Medicare research sheet</h3>
            <p>My own notes. This sheet does not show, compare, or check coverage for any plan.</p>
            <dl>
              {(Object.keys(entries) as Field[]).map((key) => (
                <div key={key}>
                  <dt>{SHEET_LABELS[key]}</dt>
                  <dd>{entries[key].trim() || "Not added"}</dd>
                </div>
              ))}
              <div>
                <dt>What matters most</dt>
                <dd>{priorities.join(", ") || "Not added"}</dd>
              </div>
            </dl>
            <p>
              On Medicare.gov, enter the ZIP, prescriptions and pharmacy from this sheet. Check that
              the year shown is the year you want coverage for. Before enrolling, confirm each
              doctor and hospital with the plan or the doctor’s office.
            </p>
            <p>
              {AGENT.name} · {AGENT.licenseLine} · {AGENT.phone}
            </p>
          </article>
          <div className="checklist-actions">
            <button type="button" className="btn" onClick={() => window.print()}>
              Print my sheet
            </button>
            <button type="button" className="btn btn-outline" onClick={() => goTo(0)}>
              Change something
            </button>
          </div>

          <h3>Take it to Medicare.gov</h3>
          <p>
            Plan Compare is the official tool, and it lists the plans offered in your county. Type
            in what’s on your sheet. This link opens Medicare.gov and carries nothing you typed
            here.
          </p>
          <a data-handoff href={PLAN_COMPARE_URL} className="btn">
            Open Medicare.gov Plan Compare
          </a>

          <h3>Or bring it to me</h3>
          <p>
            Print it, or keep this page open while we talk. No cost, and no obligation to enroll in
            anything.
          </p>
          <div className="checklist-actions">
            <a data-cta-location="tool_result" href={AGENT.phoneHref} className="btn">
              Call {AGENT.phone}
            </a>
            <TrackedLink href="/schedule" ctaLocation="tool_result" className="btn btn-outline">
              Book a time
            </TrackedLink>
          </div>
        </>
      ) : null}

      <div className="checklist-actions">
        {step > 0 && step < SHEET_STEP ? (
          <button type="button" className="btn btn-outline" onClick={() => goTo(step - 1)}>
            Back
          </button>
        ) : null}
        {step < SHEET_STEP ? (
          <button type="button" className="btn" onClick={next}>
            {step === LAST_QUESTION_STEP ? "Make my sheet" : "Continue"}
          </button>
        ) : null}
        <button type="button" className="checklist-clear" onClick={clear}>
          Clear everything
        </button>
      </div>

      <p className="checklist-shiip">
        Want help from someone who doesn’t sell insurance?{" "}
        <a data-handoff href={SHIIP_CONTACT_URL}>
          Find your county SHIIP counselor
        </a>
        . It’s free.
      </p>
    </section>
  );
}
