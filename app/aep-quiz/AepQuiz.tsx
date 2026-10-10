"use client";

/**
 * "Do I Need to Act During AEP?" quiz.
 *
 * Five plain-language questions, about 60 seconds. After the last question,
 * the visitor gives contact details BEFORE seeing the result, which posts to
 * /api/capture-lead with source "quiz-2026" and interest_topic "medicare".
 * The quiz_answers payload carries the tier, so the server picks the
 * completer nurture branch.
 *
 * Educational only: results never recommend a plan, name a carrier, or
 * promise savings. Every tier ends at a free review conversation.
 */

import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { AGENT, CONSENT_TEXT, CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/lib/agent";
import {
  aepQuizPayload,
  aepQuizResult,
  aepQuizTier,
  AEP_QUIZ_QUESTIONS,
  type AepQuizAnswers,
  type AepQuizResult,
} from "@/lib/aepQuiz";
import { newEventId, readAttribution } from "@/lib/attribution";
import { loadTurnstile } from "@/lib/loadTurnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme: "light"; "error-callback": () => void },
  ) => string | undefined;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function turnstileApi(): TurnstileApi | undefined {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

/**
 * Shared Cloudflare Turnstile wiring. Mirrors the pattern in
 * app/plan-check/PlanCheckQuiz.tsx: render directly, never through
 * turnstile.ready(), because the async tag throws.
 */
function useTurnstile(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [widgetError, setWidgetError] = useState<string | null>(null);

  useEffect(() => {
    if (!active || !TURNSTILE_SITE_KEY || ready) return;
    loadTurnstile();
    const poll = setInterval(() => {
      if (turnstileApi()) {
        setReady(true);
        clearInterval(poll);
      }
    }, 100);
    const giveUp = setTimeout(() => clearInterval(poll), 20000);
    return () => {
      clearInterval(poll);
      clearTimeout(giveUp);
    };
  }, [active, ready]);

  useEffect(() => {
    const container = containerRef.current;
    const api = turnstileApi();
    if (!active || !TURNSTILE_SITE_KEY || !ready || !container || !api) return;
    let disposed = false;
    let widgetId: string | undefined;
    try {
      widgetId = api.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        "error-callback": () => {
          if (!disposed)
            setWidgetError("The form check couldn't finish. Please try again, or call me.");
        },
      });
      widgetRef.current = widgetId ?? null;
    } catch {
      queueMicrotask(() =>
        setWidgetError("The form check couldn't load. Please try again, or call me."),
      );
    }
    return () => {
      disposed = true;
      widgetRef.current = null;
      if (widgetId) {
        try {
          api.remove(widgetId);
        } catch {
          /* already removed */
        }
      }
    };
  }, [active, ready, renderKey]);

  const getToken = useCallback((): string => {
    try {
      if (widgetRef.current) return turnstileApi()?.getResponse(widgetRef.current) ?? "";
    } catch {
      /* fall through */
    }
    return "";
  }, []);

  const reset = useCallback(() => {
    if (!TURNSTILE_SITE_KEY) return;
    try {
      const api = turnstileApi();
      if (widgetRef.current && api) api.reset(widgetRef.current);
      else throw new Error("unavailable");
    } catch {
      widgetRef.current = null;
      setRenderKey((v) => v + 1);
    }
  }, []);

  return { containerRef, getToken, reset, widgetError };
}

const optionClass =
  "relative min-h-16 w-full rounded-xl border-2 border-gray-300 bg-white px-5 py-5 text-left text-19 leading-snug font-semibold text-[var(--color-navy)] transition-[border-color,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] hover:border-[var(--color-navy)]/40 active:border-[var(--color-navy)]";

const inputClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-18 text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";

type Phase = "questions" | "capture" | "result";

export function AepQuiz() {
  const [phase, setPhase] = useState<Phase>("questions");
  const [answers, setAnswers] = useState<AepQuizAnswers>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<AepQuizResult | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const { containerRef, getToken, reset, widgetError } = useTurnstile(phase === "capture");

  // Move focus to the new question so screen reader and keyboard users are
  // not stranded after each step.
  useEffect(() => {
    headingRef.current?.focus();
  }, [phase, index]);

  const question = AEP_QUIZ_QUESTIONS[index];
  const isLast = index >= AEP_QUIZ_QUESTIONS.length - 1;

  function answer(value: boolean) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    setError(null);
    if (isLast) {
      setPhase("capture");
    } else {
      setIndex(index + 1);
    }
  }

  function goBack() {
    if (phase === "capture") {
      setPhase("questions");
      setIndex(AEP_QUIZ_QUESTIONS.length - 1);
      return;
    }
    if (phase === "questions" && index > 0) setIndex(index - 1);
  }

  async function submitCapture(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const phoneDigits = phone.replace(/\D/g, "");

    if (cleanName.length < 2) {
      setError("Add your first name so I know who I am sending this to.");
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("Enter a valid email address so I can send your results.");
      return;
    }
    if (!consent) {
      setError("Check the box so I know it's alright to contact you.");
      return;
    }
    if (widgetError) {
      setError(widgetError);
      return;
    }
    const turnstileToken = getToken();
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please finish the quick form check, then send again.");
      reset();
      return;
    }
    setError(null);
    setSending(true);
    const eventId = newEventId();

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          source: "quiz-2026",
          interest_topic: "medicare",
          email: cleanEmail,
          full_name: cleanName,
          phone_number: phoneDigits.length >= 10 ? phoneDigits : null,
          quiz_answers: aepQuizPayload(answers),
          attribution: readAttribution(),
          event_id: eventId,
          consent_given: true,
          consent_text: CONSENT_TEXT,
          consent_version: CONSENT_VERSION,
          sms_consent: phoneDigits.length >= 10 && smsConsent,
          sms_consent_text: phoneDigits.length >= 10 && smsConsent ? SMS_CONSENT_TEXT : null,
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        reset();
        setError(data?.error ?? "Something went wrong on my end. Please try again, or call me.");
        setSending(false);
        return;
      }
      // The result is revealed only after the lead is captured.
      setResult(aepQuizResult(aepQuizTier(answers)));
      setPhase("result");
    } catch {
      setError("Something went wrong on my end. Please try again, or call me.");
      setSending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      {(phase === "questions" && index > 0) || phase === "capture" ? (
        <button
          type="button"
          onClick={goBack}
          className="text-18 mb-6 inline-flex min-h-12 items-center gap-2 rounded-lg px-2 font-medium text-[var(--color-navy)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
        >
          <ArrowLeft className="size-5 shrink-0" aria-hidden />
          Back
        </button>
      ) : null}

      {phase === "questions" ? (
        <section aria-labelledby="aep-quiz-heading">
          <div
            className="mb-8 h-3 overflow-hidden rounded-full bg-[rgba(21,46,52,0.08)]"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={AEP_QUIZ_QUESTIONS.length}
            aria-valuenow={index + 1}
            aria-label={`Question ${index + 1} of ${AEP_QUIZ_QUESTIONS.length}`}
          >
            <div
              className="h-full rounded-full bg-[var(--color-navy)] transition-all duration-200 ease-out"
              style={{ width: `${((index + 1) / AEP_QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className="text-16 font-medium text-[var(--color-ink-muted)]" aria-live="polite">
            Question {index + 1} of {AEP_QUIZ_QUESTIONS.length}
          </p>
          <h2
            id="aep-quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-26 md:text-28 mt-2 leading-tight font-bold text-[var(--color-navy)] outline-none"
          >
            {question.text}
          </h2>
          {question.help ? (
            <p className="text-18 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {question.help}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3">
            <button type="button" onClick={() => answer(true)} className={optionClass}>
              Yes
            </button>
            <button type="button" onClick={() => answer(false)} className={optionClass}>
              No
            </button>
          </div>
        </section>
      ) : null}

      {phase === "capture" ? (
        <section aria-labelledby="aep-quiz-heading">
          <h2
            id="aep-quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-26 md:text-28 leading-tight font-bold text-[var(--color-navy)] outline-none"
          >
            Your result is ready.
          </h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]/85">
            Drop your email and I will send your personalized result, plus a reminder before the
            December 7 deadline. Your answers go directly to me, never to a call center.
          </p>
          <form onSubmit={submitCapture} className="relative mt-6 space-y-5" noValidate>
            <div className="absolute top-auto -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="aep-quiz-website">Website</label>
              <input
                id="aep-quiz-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="aep-quiz-name"
                className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
              >
                First name
              </label>
              <input
                id="aep-quiz-name"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="aep-quiz-email"
                className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
              >
                Email
              </label>
              <input
                id="aep-quiz-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="aep-quiz-phone"
                className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
              >
                Phone <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
              </label>
              <input
                id="aep-quiz-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(919) 555-0123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>

            <label className="text-16 flex cursor-pointer gap-3 rounded-xl bg-[rgba(21,46,52,0.04)] px-4 py-4 text-left leading-relaxed text-[var(--color-navy)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-5 shrink-0 rounded border-gray-400"
              />
              <span>
                {CONSENT_TEXT}{" "}
                <Link
                  href="/privacy"
                  className="font-medium underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
                >
                  Privacy
                </Link>
              </span>
            </label>

            {phone.replace(/\D/g, "").length >= 10 ? (
              <label className="text-15 flex cursor-pointer gap-3 rounded-xl bg-[rgba(21,46,52,0.04)] px-4 py-4 text-left leading-relaxed text-[var(--color-navy)]">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-1 size-5 shrink-0 rounded border-gray-400"
                />
                <span>
                  <span className="font-medium">Texting is fine too (optional).</span>{" "}
                  {SMS_CONSENT_TEXT}
                </span>
              </label>
            ) : null}

            {TURNSTILE_SITE_KEY ? <div ref={containerRef} /> : null}

            {error ? (
              <div
                role="alert"
                className="rounded-xl border border-[rgba(185,79,92,0.35)] bg-[rgba(185,79,92,0.06)] px-4 py-3"
              >
                <p className="text-16 text-[var(--color-error)]">{error}</p>
                <a
                  href={AGENT.phoneHref}
                  className="text-16 mt-2 inline-flex font-semibold text-[var(--color-navy)] underline underline-offset-2"
                >
                  Call {AGENT.phone}
                </a>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={sending}
              className="text-18 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none"
            >
              {sending ? "Sending…" : "Show my result"}
            </button>
            <p className="text-15 text-center text-[var(--color-ink-muted)]">
              Or call{" "}
              <a
                href={AGENT.phoneHref}
                className="font-semibold text-[var(--color-navy)] underline"
              >
                {AGENT.phone}
              </a>{" "}
              to skip the quiz entirely.
            </p>
          </form>
        </section>
      ) : null}

      {phase === "result" && result ? (
        <section aria-labelledby="aep-quiz-heading">
          <div className="card-surface p-6 md:p-8">
            <p className="text-14 font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase">
              Your result
            </p>
            <h2
              id="aep-quiz-heading"
              ref={headingRef}
              tabIndex={-1}
              className="text-24 md:text-27 mt-3 leading-tight font-bold text-[var(--color-navy)] outline-none"
            >
              {result.headline}
            </h2>
            <p className="text-18 mt-4 leading-relaxed text-[var(--color-navy)]">{result.lede}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {result.points.map((point) => (
                <li key={point} className="text-17 flex gap-3 leading-relaxed">
                  <CheckCircle2
                    className="mt-1 size-5 shrink-0 text-[var(--color-gold-ink)]"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-15 mt-5 border-t border-gray-300 pt-4 leading-relaxed text-[var(--color-ink-muted)]">
              {result.note}
            </p>
          </div>

          <Link
            href={result.ctaHref}
            className="text-18 mt-8 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          >
            {result.ctaLabel} →
          </Link>
          <p className="text-16 mt-3 text-center text-[var(--color-ink-muted)]">
            Prefer to talk it through?{" "}
            <a
              href={AGENT.phoneHref}
              className="font-semibold text-[var(--color-navy)] underline"
            >
              <Phone className="mr-1 inline size-4" aria-hidden />
              {AGENT.phone}
            </a>
          </p>
        </section>
      ) : null}
    </div>
  );
}
