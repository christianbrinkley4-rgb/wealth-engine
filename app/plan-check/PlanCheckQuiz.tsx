"use client";

/**
 * The plan-fit quiz: "Does your Medicare plan still fit?"
 *
 * Seven plain-language questions, about 90 seconds. Educational only: the
 * quiz never recommends a plan, never names a carrier, never promises
 * savings. Every result tier ends at the same place: a free review call.
 *
 * Lead capture is progressive. After Q3 an interstitial offers to email the
 * results (name + email, consent unchecked by default). Skippers can still
 * finish; the results page offers capture once more. Captured leads POST to
 * /api/capture-lead with source "quiz-2026". The tier is included in
 * quiz_answers only on completion, which is how the server picks the
 * completer vs abandoner nurture branch.
 */

import { ArrowLeft, ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { AGENT, CONSENT_TEXT, CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/lib/agent";
import { newEventId, readAttribution } from "@/lib/attribution";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "plan-check-progress-v1";
const CALENDLY_URL = "https://calendly.com/christianbrinkley4/free-medicare-review-call";

interface QuizOption {
  label: string;
  /** Number of "flags" this answer adds to the score. */
  flags: number;
  /** Plain-words label used in the tier 2/3 results recap. Null when not a flag. */
  flagLabel: string | null;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "doctors",
    text: "Are your current doctors still in your plan's network?",
    options: [
      { label: "Yes, all of them", flags: 0, flagLabel: null },
      { label: "Some of them", flags: 1, flagLabel: "some of your doctors may be out of network" },
      { label: "Not sure", flags: 1, flagLabel: "you are not sure your doctors are still in network" },
      { label: "I don't have a regular doctor", flags: 0, flagLabel: null },
    ],
  },
  {
    id: "drugs",
    text: "Did your prescriptions change this year, or did any of your drug costs go up?",
    options: [
      { label: "No changes, costs are fine", flags: 0, flagLabel: null },
      { label: "New prescriptions this year", flags: 1, flagLabel: "you have new prescriptions this year" },
      { label: "Same drugs, but they cost more now", flags: 1, flagLabel: "your drug costs went up" },
      { label: "Not sure what I'm paying", flags: 1, flagLabel: "you are not sure what you pay for prescriptions" },
    ],
  },
  {
    id: "premium",
    text: "How do you feel about what you pay each month for your plan?",
    options: [
      { label: "Comfortable with it", flags: 0, flagLabel: null },
      { label: "It's gone up and I'm noticing", flags: 1, flagLabel: "your monthly costs have gone up" },
      { label: "I honestly don't know what I pay", flags: 1, flagLabel: "you do not know what you pay each month" },
    ],
  },
  {
    id: "health",
    text: "Has your health changed since you first picked this plan?",
    options: [
      { label: "About the same", flags: 0, flagLabel: null },
      { label: "Some new conditions or diagnoses", flags: 1, flagLabel: "your health has changed since you enrolled" },
      { label: "Had a surgery or hospital stay this year", flags: 1, flagLabel: "you had a surgery or hospital stay this year" },
    ],
  },
  {
    id: "travel",
    text: "Do you spend time outside North Carolina during the year?",
    options: [
      { label: "No, I'm home year-round", flags: 0, flagLabel: null },
      { label: "Yes, I travel or visit family out of state", flags: 1, flagLabel: "you spend time outside North Carolina" },
      { label: "I split time between two places", flags: 1, flagLabel: "you split time between two places" },
    ],
  },
  {
    id: "benefits",
    text: "How important are dental, vision, and hearing coverage to you?",
    options: [
      // Caring about these benefits is not a misfit signal on its own, so no
      // flags here. The answer still reaches Christian as a review topic.
      { label: "Very important, I use them", flags: 0, flagLabel: null },
      { label: "Nice to have", flags: 0, flagLabel: null },
      { label: "Not a priority", flags: 0, flagLabel: null },
    ],
  },
  {
    id: "review",
    text: "When did you last have someone review your plan with you, one on one?",
    options: [
      { label: "Within the last year", flags: 0, flagLabel: null },
      { label: "One to two years ago", flags: 1, flagLabel: "it has been a while since your last one-on-one review" },
      { label: "More than two years ago", flags: 1, flagLabel: "it has been years since your last one-on-one review" },
      { label: "Never", flags: 1, flagLabel: "you have never had a one-on-one plan review" },
    ],
  },
];

type Tier = "solid" | "flags" | "changed";

const TIER_COPY: Record<Tier, { headline: string; body: string; cta: string }> = {
  solid: {
    headline: "Your plan looks pretty solid.",
    body: "Based on your answers, nothing major has shifted since you enrolled. That's good news. Plans still change every year though, and a free 20-minute review makes sure nothing slipped through the cracks before enrollment closes December 7.",
    cta: "Book my free yearly check",
  },
  flags: {
    headline: "A few things are worth a second look.",
    body: "None of this means your plan is wrong. It means a free review would be smart before December 7, while you can still do something about it.",
    cta: "Book my free plan review",
  },
  changed: {
    headline: "A lot has changed since you enrolled.",
    body: "Your plan may not fit your life the way it used to. You're asking before December 7, which means there's still time to sort it out. A free 20-minute review will give you straight answers.",
    cta: "Book my free review now",
  },
};

function tierForScore(score: number): Tier {
  if (score >= 5) return "changed";
  if (score >= 3) return "flags";
  return "solid";
}

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
 * Email capture form shared by the Q3 interstitial and the results page.
 * Posts to /api/capture-lead with source "quiz-2026". The `quizPayload`
 * carries the answers so far; the results page adds tier + flags.
 */
/**
 * Shared Cloudflare Turnstile wiring. The script tag itself is loaded once by
 * app/layout.tsx whenever a site key is configured; this just polls for the
 * global, renders one widget per container, and hands back a token getter.
 * Mirrors the pattern in components/EmailResultsCapture.tsx (rendered
 * directly, never through turnstile.ready(), because the async tag throws).
 */
function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [widgetError, setWidgetError] = useState<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || ready) return;
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
  }, [ready]);

  useEffect(() => {
    const container = containerRef.current;
    const api = turnstileApi();
    if (!TURNSTILE_SITE_KEY || !ready || !container || !api) return;
    let disposed = false;
    let widgetId: string | undefined;
    try {
      widgetId = api.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        "error-callback": () => {
          if (!disposed) setWidgetError("The form check couldn't finish. Please try again, or call me.");
        },
      });
      widgetRef.current = widgetId ?? null;
    } catch {
      queueMicrotask(() => setWidgetError("The form check couldn't load. Please try again, or call me."));
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
  }, [ready, renderKey]);

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

  return { containerRef, getToken, reset, widgetError, setWidgetError };
}

function CaptureForm({
  quizPayload,
  onCaptured,
  mode,
}: {
  quizPayload: Record<string, string>;
  onCaptured: (email: string, name: string, phoneDigits: string | null) => void;
  /** "interstitial" appears mid-quiz after Q3; "results" appears on the results page. */
  mode: "interstitial" | "results";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const { containerRef, getToken, reset, widgetError } = useTurnstile();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (cleanName.length < 2) {
      setError("Add your first name so I know who I'm writing to.");
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("That email doesn't look right. Check it so your results reach you.");
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
    const phoneDigits = phone.replace(/\D/g, "");
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
          quiz_answers: quizPayload,
          attribution: readAttribution(),
          event_id: newEventId(),
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
      onCaptured(cleanEmail, cleanName, phoneDigits.length >= 10 ? phoneDigits : null);
    } catch {
      setError("Something went wrong on my end. Please try again, or call me.");
      setSending(false);
    }
  }

  const isInterstitial = mode === "interstitial";
  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-20 font-semibold">
        {isInterstitial ? "Want your results emailed when you finish?" : "Want me to send this summary?"}
      </h3>
      <p className="text-16 mt-2 text-[var(--color-ink-muted)]">
        {isInterstitial
          ? "Three questions to go. Drop your email and I'll send your personalized summary when you're done, plus a note before December 7."
          : "Drop your email and I will send your personalized summary, plus a note before December 7."}
      </p>
      <div className="mt-4 grid gap-4">
        <div>
          <label htmlFor="quiz-name" className="text-15 font-medium">
            First name
          </label>
          <input
            id="quiz-name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-17"
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="quiz-email" className="text-15 font-medium">
            Email
          </label>
          <input
            id="quiz-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-17"
            placeholder="jane@example.com"
          />
        </div>
        {!isInterstitial && (
          <div>
            <label htmlFor="quiz-phone" className="text-15 font-medium">
              Phone <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
            </label>
            <input
              id="quiz-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-17"
              placeholder="(919) 555-0123"
            />
            <label className="mt-2 flex items-start gap-2 text-15 text-[var(--color-ink-muted)]">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-1"
              />
              <span>It is okay to text me a reminder before December 7.</span>
            </label>
          </div>
        )}
        <label className="flex items-start gap-2 text-15 text-[var(--color-ink-muted)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>
            It is okay to email me my results and follow up about Medicare plan reviews. No spam,
            no sharing my info, unsubscribe anytime.
          </span>
        </label>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
        />
        {TURNSTILE_SITE_KEY && <div ref={containerRef} />}
        {error && <p className="text-15 font-medium text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 text-18 font-semibold text-[var(--color-paper)] transition-all duration-200 ease-out hover:-translate-y-px disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send my results"}
        </button>
      </div>
    </form>
  );
}

/**
 * Small follow-up for visitors who gave an email at the Q3 interstitial
 * (where the phone field is hidden for low friction) but no phone number.
 * Posts the same lead again with the phone added; the API dedupes by
 * email+source within 24h and updates the row instead of duplicating it.
 */
function PhoneFollowUp({
  email,
  name,
  quizPayload,
  onDone,
}: {
  email: string;
  name: string;
  quizPayload: Record<string, string>;
  onDone: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const { containerRef, getToken, reset, widgetError } = useTurnstile();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Enter a 10-digit US phone number.");
      return;
    }
    if (!smsConsent) {
      setError("Check the box so I know it's alright to text you.");
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
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          source: "quiz-2026",
          interest_topic: "medicare",
          email,
          full_name: name,
          phone_number: phoneDigits,
          quiz_answers: quizPayload,
          attribution: readAttribution(),
          event_id: newEventId(),
          consent_given: true,
          consent_text: CONSENT_TEXT,
          consent_version: CONSENT_VERSION,
          sms_consent: true,
          sms_consent_text: SMS_CONSENT_TEXT,
          website: "",
          turnstile_token: turnstileToken,
        }),
      });
      if (!res.ok) {
        reset();
        setError("Something went wrong. You can also just call or text me directly.");
        setSending(false);
        return;
      }
      onDone();
    } catch {
      setError("Something went wrong. You can also just call or text me directly.");
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-2xl border border-gray-200 bg-[var(--color-paper)] p-6"
    >
      <h3 className="text-18 font-semibold">Want a text reminder before December 7?</h3>
      <p className="text-15 mt-1 text-[var(--color-ink-muted)]">
        Optional. One reminder text, no spam.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="tel"
          autoComplete="tel"
          aria-label="Phone number for text reminder"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-17 sm:max-w-xs"
          placeholder="(919) 555-0123"
        />
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 text-17 font-semibold text-[var(--color-paper)] disabled:opacity-60"
        >
          {sending ? "Saving..." : "Remind me by text"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-15 text-[var(--color-ink-muted)]">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-1"
        />
        <span>It is okay to text me one reminder before December 7. Message and data rates may apply. Reply STOP to opt out.</span>
      </label>
      {TURNSTILE_SITE_KEY && <div ref={containerRef} className="mt-3" />}
      {error && <p className="text-15 mt-2 font-medium text-red-700">{error}</p>}
    </form>
  );
}

export function PlanCheckQuiz() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "interstitial" | "results">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
  const [capturedName, setCapturedName] = useState("");
  const [phoneProvided, setPhoneProvided] = useState(false);
  const [interstitialShown, setInterstitialShown] = useState(false);

  // Resume: answers persist on this device so abandoners can pick up where
  // they left off, including on the results screen after a reload.
  // Nothing leaves the device until they submit the form. Deferred to a
  // macrotask so the effect body itself never sets state synchronously.
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as {
            answers?: Record<string, number>;
            index?: number;
            phase?: string;
          };
          if (saved.answers && Object.keys(saved.answers).length > 0) {
            setAnswers(saved.answers);
            if (saved.phase === "results") {
              setQuestionIndex(QUESTIONS.length);
              setPhase("results");
            } else {
              setQuestionIndex(Math.min(saved.index ?? 0, QUESTIONS.length - 1));
              if ((saved.index ?? 0) < QUESTIONS.length) setPhase("quiz");
            }
          }
        }
        const capRaw = localStorage.getItem("plan-check-capture-v1");
        if (capRaw) {
          const cap = JSON.parse(capRaw) as { email?: string; name?: string; phone?: boolean };
          if (cap.email) {
            setCapturedEmail(cap.email);
            setCapturedName(cap.name ?? "");
            if (cap.phone) setPhoneProvided(true);
          }
        }
      } catch {
        /* corrupted save: start fresh */
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persist = useCallback(
    (nextAnswers: Record<string, number>, nextIndex: number, nextPhase: string) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ answers: nextAnswers, index: nextIndex, phase: nextPhase }),
        );
      } catch {
        /* private mode: quiz still works, just no resume */
      }
    },
    [],
  );

  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("plan-check-capture-v1");
    } catch {
      /* ignore */
    }
  }, []);

  function handleCaptured(email: string, name: string, phoneDigits: string | null) {
    setCapturedEmail(email);
    setCapturedName(name);
    if (phoneDigits) setPhoneProvided(true);
    // Persist so a reload on the results screen keeps the confirmation view
    // instead of reverting to the capture form.
    try {
      localStorage.setItem(
        "plan-check-capture-v1",
        JSON.stringify({ email, name, phone: Boolean(phoneDigits) }),
      );
    } catch {
      /* ignore */
    }
  }

  function answerQuestion(optionIndex: number) {
    const question = QUESTIONS[questionIndex];
    const nextAnswers = { ...answers, [question.id]: optionIndex };
    const nextIndex = questionIndex + 1;
    setAnswers(nextAnswers);
    // Progressive capture: after Q3 (index 2), offer the email interstitial
    // once, unless they already gave an email.
    if (questionIndex === 2 && !interstitialShown && !capturedEmail) {
      setInterstitialShown(true);
      setPhase("interstitial");
      persist(nextAnswers, 3, "quiz");
      return;
    }
    if (nextIndex >= QUESTIONS.length) {
      setPhase("results");
      persist(nextAnswers, nextIndex, "results");
      return;
    }
    setQuestionIndex(nextIndex);
    setPhase("quiz");
    persist(nextAnswers, nextIndex, "quiz");
  }

  function goBack() {
    if (questionIndex > 0) {
      const prev = questionIndex - 1;
      setQuestionIndex(prev);
      persist(answers, prev, "quiz");
      setPhase("quiz");
    }
  }

  /** quiz_answers payload: answer labels keyed by question id. */
  function quizPayload(includeTier: boolean): Record<string, string> {
    const payload: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const idx = answers[q.id];
      if (idx !== undefined && q.options[idx]) payload[q.id] = q.options[idx].label.slice(0, 200);
    }
    if (includeTier) {
      const { score, tier } = scoreQuiz();
      payload.tier = tier;
      payload.flags = String(score);
    }
    return payload;
  }

  function scoreQuiz(): { score: number; tier: Tier; flagLabels: string[]; benefitsMatter: boolean } {
    let score = 0;
    const flagLabels: string[] = [];
    for (const q of QUESTIONS) {
      const idx = answers[q.id];
      if (idx === undefined) continue;
      const opt = q.options[idx];
      score += opt.flags;
      if (opt.flagLabel) flagLabels.push(opt.flagLabel);
    }
    return {
      score,
      tier: tierForScore(score),
      flagLabels,
      benefitsMatter: answers["benefits"] === 0,
    };
  }

  const progress = Math.round((questionIndex / QUESTIONS.length) * 100);

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center sm:p-10">
        <h2 className="text-28 font-semibold">Does your Medicare plan still fit?</h2>
        <p className="text-17 mx-auto mt-4 max-w-xl leading-relaxed text-[var(--color-ink-muted)]">
          Medicare plans change every year. So do you. Answer 7 quick questions, about 90
          seconds, and I will tell you whether your plan is worth a second look before Annual
          Enrollment ends December 7.
        </p>
        <p className="text-15 mx-auto mt-3 max-w-xl text-[var(--color-ink-muted)]">
          This is educational, not advice. I won&apos;t recommend a specific plan here. Just a
          straight answer on whether a free review makes sense.
        </p>
        <button
          onClick={() => setPhase("quiz")}
          className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-10 text-18 font-semibold text-[var(--color-paper)] transition-all duration-200 ease-out hover:-translate-y-px"
        >
          Start the plan check <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
    );
  }

  if (phase === "interstitial") {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-15 font-medium text-[var(--color-ink-muted)]">
            Question 4 of 7 coming up
          </p>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-[var(--color-navy)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <CaptureForm
          mode="interstitial"
          quizPayload={quizPayload(false)}
          onCaptured={(email, name, phoneDigits) => {
            handleCaptured(email, name, phoneDigits);
            setQuestionIndex(3);
            setPhase("quiz");
          }}
        />
        <button
          onClick={() => {
            setQuestionIndex(3);
            setPhase("quiz");
          }}
          className="text-16 mt-4 w-full py-3 font-medium text-[var(--color-ink-muted)] underline underline-offset-2"
        >
          Skip, just show me the next question
        </button>
      </div>
    );
  }

  if (phase === "results") {
    const { tier, flagLabels, benefitsMatter } = scoreQuiz();
    const copy = TIER_COPY[tier];
    return (
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
          <p className="text-15 font-semibold uppercase tracking-wide text-[var(--color-gold-ink)]">
            Your plan check result
          </p>
          <h2 className="text-28 mt-2 font-semibold">{copy.headline}</h2>
          {tier !== "solid" && flagLabels.length > 0 && (
            <ul className="mt-4 space-y-2">
              {flagLabels.slice(0, 4).map((label) => (
                <li key={label} className="text-17 flex items-start gap-3 text-[var(--color-ink-muted)]">
                  <span aria-hidden className="mt-1 inline-block size-2 shrink-0 rounded-full bg-[var(--color-navy)]" />
                  <span>{label.charAt(0).toUpperCase() + label.slice(1)}.</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">{copy.body}</p>
          {benefitsMatter && (
            <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              You said dental, vision, and hearing coverage matter to you. We will make that part
              of the review too.
            </p>
          )}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={CALENDLY_URL}
              className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] transition-all duration-200 ease-out hover:-translate-y-px"
            >
              <CalendarCheck className="size-5" aria-hidden />
              {copy.cta}
            </a>
            <a
              href={AGENT.phoneHref}
              className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] transition-all duration-200 ease-out hover:-translate-y-px"
            >
              <Phone className="size-5" aria-hidden />
              {AGENT.phone}
            </a>
          </div>
          <p className="text-15 mt-4 text-[var(--color-ink-muted)]">
            Free, no pressure, no obligation. I am a licensed agent in North Carolina and I will
            give you straight answers either way. Prefer to talk? Call or text.
          </p>
        </div>
        {capturedEmail ? (
          <>
            <p className="text-16 mt-6 rounded-2xl border border-gray-200 bg-[var(--color-paper)] p-5 text-[var(--color-ink-muted)]">
              Your summary is on its way to <strong>{capturedEmail}</strong>. If it does not show
              up, check spam, or just call me at {AGENT.phone}.
            </p>
            {!phoneProvided && (
              <PhoneFollowUp
                email={capturedEmail}
                name={capturedName}
                quizPayload={quizPayload(true)}
                onDone={() => setPhoneProvided(true)}
              />
            )}
          </>
        ) : (
          <CaptureForm
            mode="results"
            quizPayload={quizPayload(true)}
            onCaptured={handleCaptured}
          />
        )}
        <button
          onClick={() => {
            setAnswers({});
            setQuestionIndex(0);
            setInterstitialShown(false);
            setCapturedEmail(null);
            setCapturedName("");
            setPhoneProvided(false);
            clearSaved();
            setPhase("quiz");
          }}
          className="text-16 mt-6 w-full py-3 font-medium text-[var(--color-ink-muted)] underline underline-offset-2"
        >
          Retake the plan check
        </button>
      </div>
    );
  }

  const question = QUESTIONS[questionIndex];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-15 font-medium text-[var(--color-ink-muted)]">
          Question {questionIndex + 1} of {QUESTIONS.length}
        </p>
        <div
          className="h-2 w-40 overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-[var(--color-navy)]" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <h2 className="text-24 font-semibold sm:text-28">{question.text}</h2>
      <div className="mt-6 grid gap-3">
        {question.options.map((option, idx) => {
          const selected = answers[question.id] === idx;
          return (
            <button
              key={option.label}
              onClick={() => answerQuestion(idx)}
              aria-pressed={selected}
              className={`text-17 rounded-xl border-2 px-6 py-4 text-left font-medium transition-all duration-150 ${
                selected
                  ? "border-[var(--color-navy)] bg-[var(--color-paper)]"
                  : "border-gray-200 bg-white hover:border-[var(--color-navy)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {questionIndex > 0 && (
          <button
            onClick={goBack}
            className="text-16 inline-flex items-center gap-1 font-medium text-[var(--color-ink-muted)] underline underline-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
        )}
      </div>
      <p className="text-15 mt-8 text-[var(--color-ink-muted)]">
        Educational only. Your answers stay on this device unless you ask me to send your results.
      </p>
    </div>
  );
}
