"use client";

/**
 * Private prep sheet builder for Christian.
 *
 * Everything stays in this component's state. This file makes no network
 * request, writes nothing to browser storage, and reports nothing to
 * analytics. Reload the page and the sheet is gone. A test in
 * lib/__tests__/prep-sheet.test.ts keeps it that way.
 */

import { useMemo, useState } from "react";

import { AGENT } from "@/lib/agent";
import {
  buildPrepSheet,
  DRUG_PLAN_QUESTION,
  EMPTY_PREP_FIELDS,
  parseIntakeEmail,
  PREP_LIMITS,
  type PrepFields,
} from "@/lib/prepSheet";

const FIELDS: ReadonlyArray<{
  name: keyof PrepFields;
  label: string;
  hint: string;
  rows?: number;
}> = [
  { name: "clientName", label: "Client name", hint: "As it appears on the Medicare card." },
  {
    name: "appointment",
    label: "Appointment date and time",
    hint: "In your own words. Example: Tuesday, November 17 at 2:00 PM, at the client's home.",
  },
  {
    name: "planType",
    label: "Current plan type",
    hint: "In your own words. Write what the client told you, not what you expect.",
    rows: 2,
  },
  {
    name: "medications",
    label: "Medications",
    hint: "One per line, with the dose and how often.",
    rows: 6,
  },
  {
    name: "doctors",
    label: "Doctors and hospitals",
    hint: "One per line, with the practice name or town.",
    rows: 4,
  },
  { name: "pharmacy", label: "Pharmacy", hint: "Name and street. Note mail order if used." },
  {
    name: "questions",
    label: "The client's questions",
    hint: "One per line.",
    rows: 4,
  },
];

function Box() {
  return <span className="prep-box" aria-hidden />;
}

export function PrepSheetBuilder() {
  const [fields, setFields] = useState<PrepFields>(EMPTY_PREP_FIELDS);
  const [pasted, setPasted] = useState("");
  const [pasteNote, setPasteNote] = useState<string | null>(null);

  const sheet = useMemo(() => buildPrepSheet(fields), [fields]);

  function update(name: keyof PrepFields, value: string) {
    setFields((previous) => ({ ...previous, [name]: value.slice(0, PREP_LIMITS[name]) }));
  }

  function fillFromEmail() {
    const parsed = parseIntakeEmail(pasted);
    if (!parsed) {
      setPasteNote("That text is not an intake email from the website. Nothing was changed.");
      return;
    }
    setFields(parsed);
    setPasted("");
    setPasteNote("The sheet is filled from the email. Check each line before you print.");
  }

  function clear() {
    setFields(EMPTY_PREP_FIELDS);
    setPasted("");
    setPasteNote(null);
  }

  return (
    <div className="prep">
      <section className="prep-entry" aria-label="Enter the appointment details">
        <p className="prep-private" role="note">
          <strong>Private working page.</strong> Nothing you type here is saved or sent. Reload
          the page and it is gone. Print the sheet, then close this tab.
        </p>

        <div className="prep-field">
          <label htmlFor="prep-paste">Paste an intake email (optional)</label>
          <p id="prep-paste-hint">
            Copy the whole &quot;Appointment prep&quot; email from your inbox and paste it here.
          </p>
          <textarea
            id="prep-paste"
            rows={3}
            value={pasted}
            onChange={(event) => setPasted(event.target.value)}
            aria-describedby="prep-paste-hint"
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={fillFromEmail}
            disabled={!pasted.trim()}
          >
            Fill the sheet from this email
          </button>
          {pasteNote ? <p role="status">{pasteNote}</p> : null}
        </div>

        {FIELDS.map((field) => {
          const id = `prep-${field.name}`;
          return (
            <div className="prep-field" key={field.name}>
              <label htmlFor={id}>{field.label}</label>
              <p id={`${id}-hint`}>{field.hint}</p>
              {field.rows ? (
                <textarea
                  id={id}
                  rows={field.rows}
                  maxLength={PREP_LIMITS[field.name]}
                  value={fields[field.name]}
                  onChange={(event) => update(field.name, event.target.value)}
                  aria-describedby={`${id}-hint`}
                  autoComplete="off"
                />
              ) : (
                <input
                  id={id}
                  type="text"
                  maxLength={PREP_LIMITS[field.name]}
                  value={fields[field.name]}
                  onChange={(event) => update(field.name, event.target.value)}
                  aria-describedby={`${id}-hint`}
                  autoComplete="off"
                />
              )}
            </div>
          );
        })}

        <div className="prep-actions">
          <button type="button" className="btn" onClick={() => window.print()}>
            Print the prep sheet
          </button>
          <button type="button" className="btn btn-outline" onClick={clear}>
            Clear everything
          </button>
        </div>
      </section>

      <article className="prep-sheet" aria-label="Printable prep sheet">
        <header>
          <h2>Appointment prep sheet</h2>
          <dl className="prep-facts">
            <div>
              <dt>Client</dt>
              <dd>{sheet.clientName || "Not entered"}</dd>
            </div>
            <div>
              <dt>Appointment</dt>
              <dd>{sheet.appointment || "Not entered"}</dd>
            </div>
            <div>
              <dt>Current plan type (as described)</dt>
              <dd>{sheet.planType || "Not entered"}</dd>
            </div>
            <div>
              <dt>Pharmacy</dt>
              <dd>{sheet.pharmacy || "Not entered"}</dd>
            </div>
          </dl>
        </header>

        <section>
          <h3>Medications ({sheet.medications.length})</h3>
          {sheet.medications.length > 0 ? (
            <>
              <p className="prep-note">For each drug: {DRUG_PLAN_QUESTION}</p>
              <ol className="prep-meds">
                {sheet.medications.map((medication, index) => (
                  <li key={`${index}-${medication.text}`}>
                    <span className="prep-med-name">
                      {medication.text}
                      {medication.needsDose ? <em> (dose not given)</em> : null}
                    </span>
                    <span className="prep-med-checks">
                      <span>
                        <Box /> Dose and how often confirmed
                      </span>
                      <span>
                        <Box /> Compare with this drug
                      </span>
                      <span>
                        <Box /> Compare without this drug
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="prep-note">No drugs entered. Ask at the start of the appointment.</p>
          )}
        </section>

        <section>
          <h3>Doctors and hospitals ({sheet.doctors.length})</h3>
          {sheet.doctors.length > 0 ? (
            <ul className="prep-list">
              {sheet.doctors.map((doctor, index) => (
                <li key={`${index}-${doctor}`}>
                  <Box /> {doctor}
                </li>
              ))}
            </ul>
          ) : (
            <p className="prep-note">None entered.</p>
          )}
        </section>

        <section>
          <h3>The client&apos;s questions ({sheet.clientQuestions.length})</h3>
          {sheet.clientQuestions.length > 0 ? (
            <ul className="prep-list">
              {sheet.clientQuestions.map((question, index) => (
                <li key={`${index}-${question}`}>
                  <Box /> {question}
                </li>
              ))}
            </ul>
          ) : (
            <p className="prep-note">None entered.</p>
          )}
        </section>

        <section>
          <h3>Still to ask ({sheet.stillToAsk.length})</h3>
          {sheet.stillToAsk.length > 0 ? (
            <ul className="prep-list">
              {sheet.stillToAsk.map((item) => (
                <li key={item}>
                  <Box /> {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="prep-note">Nothing is missing from the list above.</p>
          )}
        </section>

        <section>
          <h3>Ask at every appointment</h3>
          <ul className="prep-list">
            {sheet.alwaysAsk.map((item) => (
              <li key={item}>
                <Box /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Before the appointment</h3>
          <ul className="prep-list">
            {sheet.beforeAppointment.map((item) => (
              <li key={item}>
                <Box /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Notes</h3>
          <div className="prep-lines" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
        </section>

        <footer>
          {AGENT.name} · {AGENT.licenseLine} · {AGENT.phone}. This sheet holds health details.
          Keep it in the client file or shred it.
        </footer>
      </article>
    </div>
  );
}
