"use client";

import { BellRing, CalendarClock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { MedicareDates } from "@/components/MedicareDates";
import { AGENT, REMINDER_CONSENT_TEXT } from "@/lib/agent";
import { readAttribution } from "@/lib/attribution";
import {
  formatLongDate,
  getNextAepReminder,
  getT65Window,
  MONTHS,
  selectableBirthYears,
  type ReminderKind,
} from "@/lib/reminders";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-18 text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";

type Result =
  | { kind: "done"; windowOpensOn: string | null }
  | { kind: "already-open"; message: string };

export function RemindMeForm({ initialKind = "t65" }: { initialKind?: ReminderKind }) {
  const [kind, setKind] = useState<ReminderKind>(initialKind);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  /* Stamped in the change handler so the dates panel can show a countdown
     without reading the clock during render. */
  const [todayMs, setTodayMs] = useState<number | null>(null);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const years = selectableBirthYears();

  // Show them the date as soon as they pick it — the answer is useful whether
  // or not they finish the form.
  const preview =
    kind === "t65" && birthMonth && birthYear
      ? getT65Window(Number(birthMonth), Number(birthYear))
      : null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("That email doesn’t look right — check it so the reminder reaches you.");
      return;
    }
    if (kind === "t65" && (!birthMonth || !birthYear)) {
      setError("Pick the month and year you turn 65.");
      return;
    }
    if (!consent) {
      setError("Check the box so I know it’s alright to email you.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const turnstileToken =
        (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)
          ?.value ?? "";

      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          full_name: fullName.trim() || null,
          kind,
          birth_month: kind === "t65" ? Number(birthMonth) : undefined,
          birth_year: kind === "t65" ? Number(birthYear) : undefined,
          attribution: readAttribution(),
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        alreadyOpen?: boolean;
        message?: string;
        windowOpensOn?: string;
      } | null;

      if (!res.ok) {
        setError(
          data?.error ??
            `I couldn’t save that. Call me at ${AGENT.phone} or email ${AGENT.email} and I’ll add you by hand.`,
        );
        setSubmitting(false);
        return;
      }

      if (data?.alreadyOpen) {
        setResult({ kind: "already-open", message: data.message ?? "" });
      } else {
        setResult({ kind: "done", windowOpensOn: data?.windowOpensOn ?? null });
      }
    } catch {
      setError(`Something went wrong. Email me at ${AGENT.email} and I’ll add you by hand.`);
      setSubmitting(false);
    }
  }

  if (result?.kind === "already-open") {
    return (
      <div className="card-surface border-l-4 border-l-[var(--color-gold-ink)] p-6 md:p-8">
        <h2 className="text-24 font-bold text-[var(--color-navy)]">
          Your window is open right now.
        </h2>
        <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]">
          {result.message} Rather than a reminder, this is worth a conversation — enrolling early in
          the window means coverage starts sooner, and the supplemental-coverage window that runs
          alongside it is the one time your health history can’t count against you.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {/* Same tab, and carrying the topic: this page is about Medicare, so
              the next screen should be too. A new tab dropped the subject and
              left an older visitor with two windows to reconcile. */}
          <Link
            href={`${AGENT.schedulingUrl}?topic=medicare`}
            className="text-18 inline-flex min-h-14 flex-1 items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)]"
          >
            Book a time to talk →
          </Link>
          <a
            href={AGENT.phoneHref}
            className="text-18 inline-flex min-h-14 flex-1 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)]"
          >
            {AGENT.phone}
          </a>
        </div>
      </div>
    );
  }

  if (result?.kind === "done") {
    return (
      <div className="card-surface p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto size-12 text-[var(--color-success)]" aria-hidden />
        <h2 className="text-24 mt-4 font-bold text-[var(--color-navy)]">That’s set.</h2>
        <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]">
          {result.windowOpensOn ? (
            <>
              Your window opens on{" "}
              <strong>{formatLongDate(new Date(`${result.windowOpensOn}T00:00:00Z`))}</strong>, and
              I’ll email you a couple of weeks before that.
            </>
          ) : (
            <>I’ll email you before your window opens.</>
          )}
        </p>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          Nothing to do until then — check your inbox for a confirmation with my details in case
          anything comes up sooner.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="card-surface p-6 md:p-8">
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="remind-website">Website</label>
          <input
            id="remind-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <fieldset className="border-0 p-0">
          <legend className="text-18 mb-3 font-medium text-[var(--color-navy)]">
            Which reminder do you want?
          </legend>
          <div className="flex flex-col gap-3">
            {(
              [
                {
                  value: "t65" as const,
                  Icon: CalendarClock,
                  title: "I’m turning 65",
                  blurb: "I’ll email you before your seven-month sign-up window opens.",
                },
                {
                  value: "aep" as const,
                  Icon: BellRing,
                  title: "I’m already on Medicare",
                  blurb: "I’ll email you before the annual window opens on October 15.",
                },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer gap-4 rounded-xl border-2 p-4 transition-colors ${
                  kind === option.value
                    ? "border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                    : "border-gray-300 bg-white hover:border-[var(--color-navy)]/40"
                }`}
              >
                <input
                  type="radio"
                  name="kind"
                  value={option.value}
                  checked={kind === option.value}
                  onChange={() => {
                    setKind(option.value);
                    setError(null);
                  }}
                  className="mt-1 size-5 shrink-0"
                />
                <span>
                  <span className="text-19 block font-semibold text-[var(--color-navy)]">
                    {option.title}
                  </span>
                  <span className="text-16 mt-1 block leading-snug text-[var(--color-ink-muted)]">
                    {option.blurb}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {kind === "t65" ? (
          <div className="mt-6">
            <span className="text-18 mb-2 block font-medium text-[var(--color-navy)]">
              When do you turn 65?
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="remind-month" className="sr-only">
                  Month you turn 65
                </label>
                <select
                  id="remind-month"
                  value={birthMonth}
                  onChange={(e) => {
                    setBirthMonth(e.target.value);
                    setTodayMs(Date.now());
                  }}
                  className={fieldClass}
                >
                  <option value="">Month</option>
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="remind-year" className="sr-only">
                  Year you were born
                </label>
                <select
                  id="remind-year"
                  value={birthYear}
                  onChange={(e) => {
                    setBirthYear(e.target.value);
                    setTodayMs(Date.now());
                  }}
                  className={fieldClass}
                >
                  <option value="">Birth year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {preview ? (
              <p className="text-17 mt-3 rounded-lg bg-[rgba(15,34,65,0.04)] px-4 py-3 leading-relaxed text-[var(--color-navy)]">
                {preview.status === "upcoming" ? (
                  <>
                    Your window opens <strong>{formatLongDate(preview.opensOn)}</strong> and closes{" "}
                    {formatLongDate(preview.closesOn)}. Your dates are below.
                  </>
                ) : preview.status === "open" ? (
                  <>
                    Your window is <strong>open now</strong> and closes{" "}
                    {formatLongDate(preview.closesOn)} — worth a conversation rather than a
                    reminder.
                  </>
                ) : (
                  <>
                    That window closed on {formatLongDate(preview.closesOn)}. There may still be
                    options — worth a quick call.
                  </>
                )}
              </p>
            ) : null}
          </div>
        ) : null}

        {kind === "aep" ? (
          <p className="text-17 mt-6 rounded-lg bg-[rgba(15,34,65,0.04)] px-4 py-3 leading-relaxed text-[var(--color-navy)]">
            The next annual window opens{" "}
            <strong>{formatLongDate(getNextAepReminder().opensOn)}</strong> and closes December 7.
            I’ll email you a couple of weeks ahead of it.
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="remind-name"
              className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
            >
              Your name{" "}
              <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
            </label>
            <input
              id="remind-name"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="remind-email"
              className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
            >
              Email
            </label>
            <input
              id="remind-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <label className="text-16 mt-5 flex cursor-pointer gap-3 rounded-xl bg-[rgba(15,34,65,0.04)] px-4 py-4 leading-relaxed text-[var(--color-navy)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 size-5 shrink-0 rounded border-gray-400"
          />
          <span>{REMINDER_CONSENT_TEXT}</span>
        </label>

        {TURNSTILE_SITE_KEY ? (
          <div className="cf-turnstile mt-4" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
        ) : null}

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
              Call {AGENT.phone}
            </a>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="text-18 mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Setting it up…" : "Remind me →"}
        </button>

        <p className="text-16 mt-3 text-center text-[var(--color-ink-muted)]">
          One email when your window opens. No newsletter, no sales calls.
        </p>
      </form>

      {/*
        The dates are the reason most people opened this page. Show them as
        soon as there is enough to compute them, whether or not the visitor
        goes on to hand over an email address.
      */}
      {kind === "t65" && birthMonth && birthYear ? (
        <div className="mt-8">
          <MedicareDates
            birthMonth={Number(birthMonth)}
            birthYear={Number(birthYear)}
            todayMs={todayMs}
          />
        </div>
      ) : null}
    </>
  );
}
