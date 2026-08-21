"use client";

import { ArrowLeft, CheckCircle2, HeartPulse, PiggyBank, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useIsClient } from "@/hooks/useIsClient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AGENT, CONSENT_TEXT, CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/lib/agent";
import { newEventId, readAttribution } from "@/lib/attribution";
import {
  BRANCH_QUESTIONS,
  getValueBeat,
  HELP_QUIZ_TOTAL_STEPS,
  INCOME_OPTIONS,
  isInterestTopic,
  phaseToStepNumber,
  STEP_LABELS,
  TOPIC_LABELS,
  TOPIC_META,
  TOPICS,
  type HelpQuizPhase,
  type InterestTopic,
  type QuizAnswers,
} from "@/lib/helpQuiz";
import { thankYouUrl } from "@/lib/thankYouUrl";
import { cn } from "@/lib/utils";

/**
 * Only the non-identifying part of the quiz is persisted. Name, email and
 * phone stay in component state — household computers are the norm in this
 * audience and an abandoned session shouldn't leave contact details on disk.
 */
type StoredQuiz = {
  topic: InterestTopic | null;
  branchIndex: number;
  answers: QuizAnswers;
  phase: HelpQuizPhase;
};

const STORAGE_KEY = "help_quiz_v2";

const INITIAL: StoredQuiz = {
  topic: null,
  branchIndex: 0,
  answers: {},
  phase: "topic",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPIC_ICONS: Record<InterestTopic, typeof Shield> = {
  medicare: Shield,
  financial_planning: PiggyBank,
  life_insurance: HeartPulse,
};

const PHASES: HelpQuizPhase[] = ["topic", "branch", "value", "contact"];

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function sanitize(raw: StoredQuiz): StoredQuiz {
  const topic = isInterestTopic(raw?.topic) ? raw.topic : null;
  const phase = PHASES.includes(raw?.phase) ? raw.phase : "topic";
  const branchIndex = Number.isInteger(raw?.branchIndex)
    ? Math.min(Math.max(raw.branchIndex, 0), 1)
    : 0;

  if (!topic && phase !== "topic") return INITIAL;

  return {
    topic,
    branchIndex,
    answers: raw?.answers && typeof raw.answers === "object" ? raw.answers : {},
    phase: topic ? phase : "topic",
  };
}

function optionButtonClass(selected: boolean) {
  return cn(
    "relative min-h-14 w-full rounded-xl border-2 bg-white px-5 py-5 text-left text-[18px] leading-snug font-semibold text-[var(--color-navy)] transition-[border-color,background-color] duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]",
    selected
      ? "border-[3px] border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
      : "border-gray-300 hover:border-[var(--color-navy)]/40",
  );
}

const fieldClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[18px] text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";

interface UrlEntry {
  topic: InterestTopic;
  /** Optional first answer, so a landing page can drop someone into their own branch. */
  answers: QuizAnswers;
  skipFirst: boolean;
}

/**
 * Reads /start?topic=medicare&stage=helping_spouse_or_parent
 *
 * `stage` lets a landing page written for one audience — the adult child
 * researching for a parent, say — hand people straight to the second question
 * instead of asking them something the page already established.
 */
function readUrlEntry(): UrlEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    if (!isInterestTopic(topic)) return null;

    const stage = params.get("stage");
    const firstQuestion = BRANCH_QUESTIONS[topic][0];
    const isKnownAnswer =
      Boolean(stage) && firstQuestion.options.some((option) => option.value === stage);

    return {
      topic,
      answers: isKnownAnswer ? { [firstQuestion.id]: stage as string } : {},
      skipFirst: isKnownAnswer,
    };
  } catch {
    return null;
  }
}

export function HelpQuiz() {
  const router = useRouter();
  const isClient = useIsClient();
  const [raw, setRaw, clearStored] = useLocalStorage<StoredQuiz>(STORAGE_KEY, INITIAL);
  const [urlEntry] = useState(readUrlEntry);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  // Before hydration, render exactly what the server rendered: the topic
  // screen, with no restored progress and no deep-linked topic. Both of those
  // come from the browser, and using them on the first client render would mean
  // the markup no longer matches the prerendered HTML.
  const persisted = isClient ? sanitize(raw) : INITIAL;
  const linked = isClient ? urlEntry : null;
  const linkedTopic = linked?.topic ?? null;

  // A deep link from the home page is honored without writing to storage —
  // derived rather than applied in an effect, so there is no cascading render.
  const stored: StoredQuiz =
    !persisted.topic && linked
      ? {
          ...INITIAL,
          topic: linked.topic,
          phase: "branch",
          answers: linked.answers,
          branchIndex: linked.skipFirst ? 1 : 0,
        }
      : persisted;

  // Clicking "Life insurance" with a half-finished Medicare quiz saved is a
  // real fork in the road: ask, rather than silently ignoring one or the other.
  const resumePrompt =
    !resumeDismissed &&
    linkedTopic &&
    persisted.topic &&
    persisted.phase !== "topic" &&
    persisted.topic !== linkedTopic
      ? linkedTopic
      : null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [income, setIncome] = useState("");
  const [consent, setConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const topic = stored.topic;
  const branchQuestions = topic ? BRANCH_QUESTIONS[topic] : [];
  const currentBranch = branchQuestions[stored.branchIndex];
  const stepNumber = phaseToStepNumber(stored.phase, stored.branchIndex);

  const valueBeat = topic && stored.phase === "value" ? getValueBeat(topic, stored.answers) : null;

  // Move focus to the new question so screen reader and keyboard users aren't
  // stranded at the top of the document after each step.
  useEffect(() => {
    headingRef.current?.focus();
  }, [stored.phase, stored.branchIndex]);

  function patch(partial: Partial<StoredQuiz>) {
    setRaw(sanitize({ ...stored, ...partial }));
    setError(null);
  }

  function selectTopic(next: InterestTopic) {
    patch({ topic: next, branchIndex: 0, answers: {}, phase: "branch" });
  }

  function selectBranchAnswer(questionId: string, value: string) {
    if (!topic) return;
    const nextAnswers = { ...stored.answers, [questionId]: value };
    const isLast = stored.branchIndex >= branchQuestions.length - 1;
    if (isLast) {
      patch({ answers: nextAnswers, phase: "value" });
    } else {
      patch({ answers: nextAnswers, branchIndex: stored.branchIndex + 1, phase: "branch" });
    }
  }

  function goBack() {
    if (stored.phase === "contact") return patch({ phase: "value" });
    if (stored.phase === "value") {
      return patch({ phase: "branch", branchIndex: Math.max(0, branchQuestions.length - 1) });
    }
    if (stored.phase === "branch") {
      if (stored.branchIndex > 0) return patch({ branchIndex: stored.branchIndex - 1 });
      return patch({ phase: "topic", topic: null, answers: {}, branchIndex: 0 });
    }
  }

  /**
   * Records the lead as soon as the value screen is reached, before contact
   * details exist. Without this, everyone who abandons at the last step is
   * invisible — and on cold ad traffic that is most people.
   */
  function recordPartial(nextPhase: HelpQuizPhase) {
    if (!topic) return;
    try {
      const body = JSON.stringify({
        stage: "partial",
        interest_topic: topic,
        quiz_answers: stored.answers,
        attribution: readAttribution(),
        reached: nextPhase,
      });
      // keepalive so the request survives the visitor closing the tab.
      void fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Partial capture is best-effort by definition.
    }
  }

  async function submitContact(event: React.FormEvent) {
    event.preventDefault();
    if (!topic) return;

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const zipDigits = zip.replace(/\D/g, "").slice(0, 5);
    const phoneDigits = phone.replace(/\D/g, "");
    const hasPhone = phoneDigits.length >= 10;

    if (cleanName.length < 2) {
      setError("Add your name so I know who I'm asking for.");
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("That email doesn't look right — check it so my reply reaches you.");
      return;
    }
    if (phoneDigits.length > 0 && phoneDigits.length < 10) {
      setError("That phone number is short a few digits. Leave it blank if you'd rather I email.");
      return;
    }
    if (zipDigits.length !== 5) {
      setError("Enter your 5-digit ZIP code — coverage options are set locally.");
      return;
    }
    if (!consent) {
      setError("Check the box so I know it's alright to contact you.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const eventId = newEventId();

    try {
      const turnstileToken =
        (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)
          ?.value ?? "";

      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          source: "help_quiz",
          email: cleanEmail,
          full_name: cleanName,
          phone_number: phoneDigits.slice(0, 10) || null,
          zip_code: zipDigits,
          interest_topic: topic,
          quiz_answers: income ? { ...stored.answers, income_range: income } : stored.answers,
          attribution: readAttribution(),
          event_id: eventId,
          consent_given: true,
          consent_text: CONSENT_TEXT,
          consent_version: CONSENT_VERSION,
          sms_consent: hasPhone && smsConsent,
          sms_consent_text: hasPhone && smsConsent ? SMS_CONSENT_TEXT : null,
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setError(
          data?.error ??
            `Something went wrong on my end. Please try again, or email me directly at ${AGENT.email}.`,
        );
        setSubmitting(false);
        return;
      }

      clearStored();
      router.push(thankYouUrl({ source: "help_quiz", topic, eventId }));
    } catch {
      setError(`Something went wrong on my end. Please try again, or call me at ${AGENT.phone}.`);
      setSubmitting(false);
    }
  }

  const showBack = stored.phase !== "topic";

  return (
    <div className="mx-auto w-full max-w-[640px]">
      {resumePrompt ? (
        <div className="card-surface mb-8 border-l-4 border-l-[var(--color-gold-ink)] p-5">
          <p className="text-[17px] text-[var(--color-navy)]">
            You have answers in progress for{" "}
            <strong>{topic ? TOPIC_LABELS[topic] : "another topic"}</strong>. Pick up where you left
            off, or start fresh with <strong>{TOPIC_LABELS[resumePrompt]}</strong>?
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setResumeDismissed(true)}
              className="min-h-12 flex-1 rounded-lg border-2 border-[var(--color-navy)] px-4 text-[16px] font-semibold text-[var(--color-navy)]"
            >
              Keep going
            </button>
            <button
              type="button"
              onClick={() => {
                setRaw({
                  ...INITIAL,
                  topic: resumePrompt,
                  phase: "branch",
                  answers: linked?.answers ?? {},
                  branchIndex: linked?.skipFirst ? 1 : 0,
                });
                setResumeDismissed(true);
              }}
              className="min-h-12 flex-1 rounded-lg bg-[var(--color-navy)] px-4 text-[16px] font-semibold text-[var(--color-paper)]"
            >
              Start fresh
            </button>
          </div>
        </div>
      ) : null}

      <div className="mb-6 flex items-center justify-between gap-3">
        {showBack ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center gap-2 rounded-lg px-2 text-[18px] font-medium text-[var(--color-navy)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          >
            <ArrowLeft className="size-5 shrink-0" aria-hidden />
            Back
          </button>
        ) : (
          <span className="min-h-12" />
        )}
        <p className="text-[16px] font-medium text-[var(--color-ink-muted)]" aria-live="polite">
          Step {stepNumber} of {HELP_QUIZ_TOTAL_STEPS} · {STEP_LABELS[stored.phase]}
        </p>
      </div>

      <div
        className="mb-8 h-3 overflow-hidden rounded-full bg-[rgba(15,34,65,0.08)]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={HELP_QUIZ_TOTAL_STEPS}
        aria-valuenow={stepNumber}
        aria-label={`Step ${stepNumber} of ${HELP_QUIZ_TOTAL_STEPS}`}
      >
        <div
          className="h-full rounded-full bg-[var(--color-navy)] transition-all duration-200 ease-in-out"
          style={{ width: `${(stepNumber / HELP_QUIZ_TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {stored.phase === "topic" ? (
        <section aria-labelledby="quiz-heading">
          <h1
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-[28px] leading-tight font-bold text-[var(--color-navy)] outline-none md:text-[32px]"
          >
            What can I help you sort out?
          </h1>
          <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-navy)]/85">
            Two quick questions, then I&apos;ll show you what usually matters most in your
            situation. No cost, and nothing to sign.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TOPICS.map((item) => {
              const Icon = TOPIC_ICONS[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTopic(item.id)}
                  className={cn(
                    "card-surface flex min-h-[140px] flex-col items-start gap-3 p-6 text-left transition-[border-color,transform] duration-150",
                    "hover:scale-[1.01] hover:border-[var(--color-gold-ink)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]",
                  )}
                >
                  <Icon
                    className="size-10 text-[var(--color-navy)]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="text-[22px] font-bold text-[var(--color-navy)]">
                    {item.label}
                  </span>
                  <span className="text-[16px] leading-snug font-normal text-[var(--color-ink-muted)]">
                    {TOPIC_META[item.id].blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {stored.phase === "branch" && currentBranch ? (
        <section aria-labelledby="quiz-heading">
          <p className="text-[14px] font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase">
            {topic ? TOPIC_LABELS[topic] : ""}
          </p>
          <h1
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-[26px] leading-tight font-bold text-[var(--color-navy)] outline-none md:text-[28px]"
          >
            {currentBranch.prompt}
          </h1>
          {currentBranch.help ? (
            <p className="mt-2 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
              {currentBranch.help}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3">
            {currentBranch.options.map((opt) => {
              const selected = stored.answers[currentBranch.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectBranchAnswer(currentBranch.id, opt.value)}
                  className={optionButtonClass(selected)}
                >
                  {selected ? (
                    <CheckCircle2
                      className="absolute top-4 right-4 size-5 shrink-0 text-[var(--color-navy)]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="pr-8">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {stored.phase === "value" && valueBeat ? (
        <section aria-labelledby="quiz-heading">
          <div className="card-surface border-l-4 border-l-[var(--color-gold-ink)] p-6 md:p-8">
            <p className="text-[14px] font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase">
              Based on your answers
            </p>
            <h1
              id="quiz-heading"
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 text-[24px] leading-tight font-bold text-[var(--color-navy)] outline-none md:text-[27px]"
            >
              {valueBeat.headline}
            </h1>
            <p className="mt-4 text-[18px] leading-relaxed text-[var(--color-navy)]">
              {valueBeat.lede}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {valueBeat.points.map((point) => (
                <li key={point} className="flex gap-3 text-[17px] leading-relaxed">
                  <CheckCircle2
                    className="mt-1 size-5 shrink-0 text-[var(--color-gold-ink)]"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-gray-300 pt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
              {valueBeat.note}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              recordPartial("contact");
              patch({ phase: "contact" });
            }}
            className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 text-[18px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          >
            Send me this, and answer my questions
          </button>
          <p className="mt-3 text-center text-[16px] text-[var(--color-ink-muted)]">
            Or just call me:{" "}
            <a href={AGENT.phoneHref} className="font-semibold text-[var(--color-navy)] underline">
              {AGENT.phone}
            </a>
          </p>

          {/*
            The off-ramp. Someone whose window is eight months out has no reason
            to give up a phone number today, and pushing them harder just loses
            them — a dated reminder is the honest ask for that person.
          */}
          {topic === "medicare" ? (
            <p className="mt-6 border-t border-gray-300 pt-6 text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
              Not ready to talk yet?{" "}
              <Link
                href="/remind-me"
                className="font-medium text-[var(--color-navy)] underline underline-offset-2"
              >
                I&apos;ll email you when your enrollment window opens
              </Link>{" "}
              — one email, nothing else.
            </p>
          ) : null}
        </section>
      ) : null}

      {stored.phase === "contact" ? (
        <section aria-labelledby="quiz-heading">
          <h1
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-[26px] leading-tight font-bold text-[var(--color-navy)] outline-none md:text-[28px]"
          >
            Where should I send it?
          </h1>
          <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-navy)]/85">
            You&apos;ll get your answers by email right away. Then I&apos;ll follow up personally —
            usually the same day, always within one business day.
          </p>

          <form onSubmit={submitContact} className="relative mt-8 space-y-5" noValidate>
            <div className="absolute top-auto -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="help-quiz-website">Website</label>
              <input
                id="help-quiz-website"
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
                htmlFor="help-quiz-name"
                className="mb-2 block text-[18px] font-medium text-[var(--color-navy)]"
              >
                Your name
              </label>
              <input
                id="help-quiz-name"
                name="full_name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label
                htmlFor="help-quiz-email"
                className="mb-2 block text-[18px] font-medium text-[var(--color-navy)]"
              >
                Email
              </label>
              <input
                id="help-quiz-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="help-quiz-phone"
                  className="mb-2 block text-[18px] font-medium text-[var(--color-navy)]"
                >
                  Phone{" "}
                  <span className="font-normal text-[var(--color-ink-muted)]">
                    (optional — fastest way to get an answer)
                  </span>
                </label>
                <input
                  id="help-quiz-phone"
                  name="phone_number"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label
                  htmlFor="help-quiz-zip"
                  className="mb-2 block text-[18px] font-medium text-[var(--color-navy)]"
                >
                  ZIP code
                </label>
                <input
                  id="help-quiz-zip"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="27401"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="help-quiz-income"
                className="mb-2 block text-[18px] font-medium text-[var(--color-navy)]"
              >
                Household income{" "}
                <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
              </label>
              <p className="mb-2 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                Only useful because Medicare premiums and tax brackets are set by income. Skip it if
                you&apos;d rather talk about it later.
              </p>
              <select
                id="help-quiz-income"
                name="income_range"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className={fieldClass}
              >
                <option value="">Prefer to skip this</option>
                {INCOME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex cursor-pointer gap-3 rounded-xl bg-[rgba(15,34,65,0.04)] px-4 py-4 text-left text-[16px] leading-relaxed text-[var(--color-navy)]">
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
              <label className="flex cursor-pointer gap-3 rounded-xl bg-[rgba(15,34,65,0.04)] px-4 py-4 text-left text-[15px] leading-relaxed text-[var(--color-navy)]">
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

            {TURNSTILE_SITE_KEY ? (
              <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
            ) : null}

            {error ? (
              <p role="alert" className="text-[16px] text-[var(--color-error)]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 text-[18px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Send my answers"}
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
