"use client";

/**
 * Public appointment prep form.
 *
 * The answers hold health details (medications, doctors, pharmacy). They go
 * to one place only: the email-only route at /api/prep-intake. This file
 * sends no campaign data and no analytics event, and it keeps nothing in
 * browser storage. After a successful send the form is replaced in place, so
 * nothing is put in the address bar.
 */

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AGENT } from "@/lib/agent";
import { loadTurnstile } from "@/lib/loadTurnstile";
import {
  EMPTY_PREP_FIELDS,
  INTAKE_CONSENT_TEXT,
  INTAKE_CONSENT_VERSION,
  PREP_LIMITS,
  type PrepFields,
} from "@/lib/prepSheet";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-18 text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";
const labelClass = "text-18 mb-1 block font-medium text-[var(--color-navy)]";
const hintClass = "text-16 mb-2 leading-relaxed text-[var(--color-ink-muted)]";

const LIST_FIELDS: ReadonlyArray<{
  name: keyof PrepFields;
  label: string;
  hint: string;
  rows: number;
}> = [
  {
    name: "planType",
    label: "What coverage do you have now?",
    hint: "Use your own words. For example: Medicare with a supplement, a Medicare Advantage plan, coverage from my job, or not sure.",
    rows: 2,
  },
  {
    name: "medications",
    label: "Your medicines",
    hint: "One on each line. Write the name, the dose, and how often you take it. You can copy this from the bottle.",
    rows: 6,
  },
  {
    name: "doctors",
    label: "Your doctors and hospitals",
    hint: "One on each line. Add the name of the office or the town.",
    rows: 4,
  },
  {
    name: "pharmacy",
    label: "Your pharmacy",
    hint: "The name and the street. Tell me if you use mail order.",
    rows: 2,
  },
  {
    name: "questions",
    label: "Your questions",
    hint: "Anything you want me to answer when we meet.",
    rows: 4,
  },
];

export function IntakeForm() {
  const [fields, setFields] = useState<PrepFields>(EMPTY_PREP_FIELDS);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // The check renders itself (class "cf-turnstile") once the script arrives.
  useEffect(() => loadTurnstile(), []);

  function update(name: keyof PrepFields, value: string) {
    setFields((previous) => ({ ...previous, [name]: value.slice(0, PREP_LIMITS[name]) }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (fields.clientName.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Please enter a phone number or an email address, so I can reach you.");
      return;
    }
    if (!consent) {
      setError("Please check the box so I know it is alright to send this to me.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const turnstileToken =
        (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)
          ?.value ?? "";

      const res = await fetch("/api/prep-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          phone,
          email,
          consent_given: true,
          consent_text: INTAKE_CONSENT_TEXT,
          consent_version: INTAKE_CONSENT_VERSION,
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setError(
          data?.error ??
            `I could not receive this form just now. Your answers were not sent. Please call me at ${AGENT.phone}.`,
        );
        setSubmitting(false);
        return;
      }

      setFields(EMPTY_PREP_FIELDS);
      setPhone("");
      setEmail("");
      setDone(true);
    } catch {
      setError(
        `Something went wrong and your answers were not sent. Please try once more, or call me at ${AGENT.phone}.`,
      );
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card-surface p-6 text-center md:p-8" role="status">
        <CheckCircle2 className="mx-auto size-12 text-[var(--color-success)]" aria-hidden />
        <h2 className="text-24 mt-4 font-bold text-[var(--color-navy)]">
          Thank you. I have your list.
        </h2>
        <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]">
          I will read it before we meet. If something changes before then, call me at{" "}
          <a href={AGENT.phoneHref} className="font-semibold underline underline-offset-2">
            {AGENT.phone}
          </a>
          .
        </p>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          Please bring your Medicare card and your medicine bottles to the appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6 md:p-8">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="intake-website">Website</label>
        <input
          id="intake-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="intake-name" className={labelClass}>
          Your name
        </label>
        <input
          id="intake-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={PREP_LIMITS.clientName}
          value={fields.clientName}
          onChange={(event) => update("clientName", event.target.value)}
          className={fieldClass}
        />
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>How can I reach you?</legend>
        <p className={hintClass}>A phone number or an email address. One is enough.</p>
        <label htmlFor="intake-phone" className="text-16 mb-1 block text-[var(--color-navy)]">
          Phone
        </label>
        <input
          id="intake-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={fieldClass}
        />
        <label htmlFor="intake-email" className="text-16 mt-3 mb-1 block text-[var(--color-navy)]">
          Email
        </label>
        <input
          id="intake-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </fieldset>

      <div className="mt-5">
        <label htmlFor="intake-appointment" className={labelClass}>
          When is your appointment?{" "}
          <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
        </label>
        <input
          id="intake-appointment"
          name="appointment"
          type="text"
          autoComplete="off"
          maxLength={PREP_LIMITS.appointment}
          value={fields.appointment}
          onChange={(event) => update("appointment", event.target.value)}
          className={fieldClass}
        />
      </div>

      {LIST_FIELDS.map((field) => {
        const id = `intake-${field.name}`;
        return (
          <div className="mt-5" key={field.name}>
            <label htmlFor={id} className={labelClass}>
              {field.label}
            </label>
            <p id={`${id}-hint`} className={hintClass}>
              {field.hint}
            </p>
            <textarea
              id={id}
              name={field.name}
              rows={field.rows}
              autoComplete="off"
              maxLength={PREP_LIMITS[field.name]}
              value={fields[field.name]}
              onChange={(event) => update(field.name, event.target.value)}
              aria-describedby={`${id}-hint`}
              className={fieldClass}
            />
          </div>
        );
      })}

      <p className="text-16 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
        Please do not write your Medicare number or your Social Security number on this form.
      </p>

      <label className="text-16 mt-4 flex cursor-pointer gap-3 rounded-lg bg-[rgba(21,46,52,0.04)] px-4 py-4 leading-relaxed text-[var(--color-navy)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 size-5 shrink-0 rounded border-gray-400"
        />
        <span>{INTAKE_CONSENT_TEXT}</span>
      </label>

      <div className="cf-turnstile mt-4" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />

      {error ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-[rgba(185,79,92,0.35)] bg-[rgba(185,79,92,0.06)] px-4 py-3"
        >
          <p className="text-17 text-[var(--color-error)]">{error}</p>
          <a
            href={AGENT.phoneHref}
            className="text-17 mt-2 inline-flex font-semibold text-[var(--color-navy)] underline underline-offset-2"
          >
            Or call {AGENT.phone}
          </a>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="text-18 mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Send my list to Christian"}
      </button>
    </form>
  );
}
