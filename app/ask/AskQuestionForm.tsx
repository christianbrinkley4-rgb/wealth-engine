"use client";

import { trackEvent } from "@/app/components/Analytics";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  NAME_MAX_LENGTH,
  QUESTION_MAX_LENGTH,
  QUESTION_MIN_LENGTH,
  validateQuestion,
} from "@/lib/askWall";
import { readAttribution } from "@/lib/attribution";
import { loadTurnstile } from "@/lib/loadTurnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-18 text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";

/**
 * The wall's question box. Name is optional, the question is not.
 * Turnstile + honeypot follow the same pattern as every other form on the
 * site. A successful ask swaps the form for a confirmation in place, no
 * navigation, so nothing the visitor typed is lost.
 */
export function AskQuestionForm() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // The widget renders itself (class "cf-turnstile") once the script arrives.
  useEffect(() => loadTurnstile(), []);

  const remaining = QUESTION_MAX_LENGTH - question.length;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validated = validateQuestion(question);
    if (!validated.ok) {
      setError(validated.error);
      return;
    }
    if (name.trim().length > NAME_MAX_LENGTH) {
      setError("Keep the name under 120 characters.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const turnstileToken =
        (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)
          ?.value ?? "";

      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "question",
          full_name: name.trim() || null,
          question: validated.question,
          attribution: readAttribution(),
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setError(
          data?.error ??
            "I couldn't save that. Hang onto your question and try once more.",
        );
        setSubmitting(false);
        return;
      }

      trackEvent("ask_submit");
      setDone(true);
    } catch {
      setError("Something went wrong. Hang onto your question and try once more.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card-surface p-6 text-center md:p-8" role="status">
        <CheckCircle2 className="mx-auto size-12 text-[var(--color-success)]" aria-hidden />
        <h2 className="text-24 mt-4 font-bold text-[var(--color-navy)]">
          Got it. Your question is in the pile.
        </h2>
        <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]">
          I read every one myself. When I answer it, the answer goes up on this wall, so check
          back soon.
        </p>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          This wall is for general education, not personal advice. If something is time-sensitive,
          the guides above might already cover it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6 md:p-8">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="ask-website">Website</label>
        <input
          id="ask-website"
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
          htmlFor="ask-name"
          className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
        >
          Your name <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
        </label>
        <input
          id="ask-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={NAME_MAX_LENGTH}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name is plenty"
          className={fieldClass}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="ask-question"
          className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
        >
          Your question
        </label>
        <textarea
          id="ask-question"
          name="question"
          rows={5}
          minLength={QUESTION_MIN_LENGTH}
          maxLength={QUESTION_MAX_LENGTH}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask it like you'd ask a neighbor. The more specific, the better the answer."
          className={fieldClass}
          aria-describedby="ask-question-hint"
        />
        <p
          id="ask-question-hint"
          className="text-17 mt-2 text-[var(--color-ink-muted)]"
          aria-live="polite"
        >
          {remaining} characters left
          {question.trim().length > 0 && question.trim().length < QUESTION_MIN_LENGTH
            ? `, at least ${QUESTION_MIN_LENGTH - question.trim().length} more to go`
            : ""}
        </p>
      </div>

      <div className="cf-turnstile mt-4" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />

      {error ? (
        <p className="text-18 mt-4 text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="text-18 mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Ask your question"}
      </button>
    </form>
  );
}
