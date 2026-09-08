"use client";

import { ArrowLeft, CalendarDays, CheckCircle2, HeartPulse, Landmark, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useIsClient } from "@/hooks/useIsClient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AGENT, CONSENT_TEXT, CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/lib/agent";
import { newEventId, readAttribution } from "@/lib/attribution";
import {
  ASK_PROMPTS,
  BRANCH_QUESTIONS,
  describeAnswers,
  getValueBeat,
  INCOME_OPTIONS,
  isAskContext,
  isInterestTopic,
  MEET_OPTIONS,
  phaseToStepNumber,
  quizTotalSteps,
  QUIZ_SITUATIONS,
  STEP_LABELS,
  TOPIC_LABELS,
  type AskContext,
  type HelpQuizPhase,
  type InterestTopic,
  type QuizAnswers,
  type QuizSituation,
} from "@/lib/helpQuiz";
import { thankYouUrl } from "@/lib/thankYouUrl";
import { cn } from "@/lib/utils";

/**
 * Only the non-identifying part of the quiz is persisted. Name, email and
 * phone stay in component state — household computers are the norm in this
 * audience and an abandoned session shouldn’t leave contact details on disk.
 */
type StoredQuiz = {
  topic: InterestTopic | null;
  branchIndex: number;
  answers: QuizAnswers;
  phase: HelpQuizPhase;
  skippedFirst: boolean;
};

const STORAGE_KEY = "help_quiz_v2";

const INITIAL: StoredQuiz = {
  topic: null,
  branchIndex: 0,
  answers: {},
  phase: "topic",
  skippedFirst: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SITUATION_ICONS: Record<string, typeof Shield> = {
  turning_65: Shield,
  annual_enrollment: CalendarDays,
  retirement: Landmark,
  life: HeartPulse,
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
    skippedFirst: Boolean(raw?.skippedFirst) && Boolean(topic),
  };
}

function optionButtonClass(selected: boolean) {
  return cn(
    "relative min-h-14 w-full rounded-xl border-2 bg-white px-5 py-5 text-left text-18 leading-snug font-semibold text-[var(--color-navy)] transition-[border-color,background-color] duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]",
    selected
      ? "border-[3px] border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
      : "border-gray-300 hover:border-[var(--color-navy)]/40",
  );
}

const fieldClass =
  "min-h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-18 text-[var(--color-navy)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]";

interface UrlEntry {
  topic: InterestTopic;
  /** Optional first answer, so a landing page can drop someone into their own branch. */
  answers: QuizAnswers;
  skipFirst: boolean;
  /** Which landing page sent them, so the free-text prompt matches its promise. */
  ask: AskContext;
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

    const ask = params.get("ask");

    return {
      topic,
      answers: isKnownAnswer ? { [firstQuestion.id]: stage as string } : {},
      skipFirst: isKnownAnswer,
      ask: isAskContext(ask) ? ask : "general",
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
          skippedFirst: linked.skipFirst,
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
  const [meet, setMeet] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const askContext = linked?.ask ?? "general";
  const topic = stored.topic;
  const branchQuestions = topic ? BRANCH_QUESTIONS[topic] : [];
  const currentBranch = branchQuestions[stored.branchIndex];
  const skippedFirst = stored.skippedFirst && stored.branchIndex > 0;
  const totalSteps = quizTotalSteps(skippedFirst);
  const stepNumber = phaseToStepNumber(stored.phase, stored.branchIndex, skippedFirst);

  // The label of question one when a landing page answered it for them.
  const preAnswered =
    topic && stored.branchIndex > 0
      ? (BRANCH_QUESTIONS[topic][0].options.find(
          (o) => o.value === stored.answers[BRANCH_QUESTIONS[topic][0].id],
        )?.label ?? null)
      : null;

  const valueBeat = topic && stored.phase === "value" ? getValueBeat(topic, stored.answers) : null;

  // Move focus to the new question so screen reader and keyboard users aren’t
  // stranded at the top of the document after each step.
  useEffect(() => {
    headingRef.current?.focus();
  }, [stored.phase, stored.branchIndex]);

  function patch(partial: Partial<StoredQuiz>) {
    setRaw(sanitize({ ...stored, ...partial }));
    setError(null);
  }

  function selectSituation(situation: QuizSituation) {
    const first = situation.firstAnswer;
    if (first) {
      patch({
        topic: situation.topic,
        branchIndex: 1,
        answers: { [first.questionId]: first.value },
        phase: "branch",
        skippedFirst: true,
      });
      return;
    }
    patch({
      topic: situation.topic,
      branchIndex: 0,
      answers: {},
      phase: "branch",
      skippedFirst: false,
    });
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
      if (stored.branchIndex > 0) {
        if (stored.skippedFirst) {
          return patch({
            phase: "topic",
            topic: null,
            answers: {},
            branchIndex: 0,
            skippedFirst: false,
          });
        }
        return patch({ branchIndex: stored.branchIndex - 1 });
      }
      return patch({
        phase: "topic",
        topic: null,
        answers: {},
        branchIndex: 0,
        skippedFirst: false,
      });
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
      setError("Add your name so I know who I’m asking for.");
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("That email doesn’t look right — check it so my reply reaches you.");
      return;
    }
    if (phoneDigits.length > 0 && phoneDigits.length < 10) {
      setError("That phone number is short a few digits. Leave it blank if you’d rather I email.");
      return;
    }
    if (zipDigits.length !== 5) {
      setError("Enter your 5-digit ZIP code — coverage options are set locally.");
      return;
    }
    if (!consent) {
      setError("Check the box so I know it’s alright to contact you.");
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
          quiz_answers: {
            ...stored.answers,
            ...(meet ? { meet_preference: meet } : {}),
            ...(income ? { income_range: income } : {}),
            ...(note.trim() ? { note: note.trim().slice(0, 1000) } : {}),
          },
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

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        code?: string;
        phone?: string;
        phoneHref?: string;
        email?: string;
        emailConfigured?: boolean;
      } | null;

      if (!res.ok) {
        const configFail = data?.code === "storage_unavailable" || res.status === 503;
        setError(
          data?.error ??
            (configFail
              ? `I can’t save that right now — please call me at ${AGENT.phone} or email ${AGENT.email}.`
              : `Something went wrong on my end. Please try again, or call me at ${AGENT.phone}.`),
        );
        setSubmitting(false);
        return;
      }

      clearStored();
      router.push(
        thankYouUrl({
          source: "help_quiz",
          topic,
          eventId,
          emailConfigured: data?.emailConfigured,
        }),
      );
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
          <p className="text-17 text-[var(--color-navy)]">
            You have answers in progress for{" "}
            <strong>{topic ? TOPIC_LABELS[topic] : "another topic"}</strong>. Pick up where you left
            off, or start fresh with <strong>{TOPIC_LABELS[resumePrompt]}</strong>?
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setResumeDismissed(true)}
              className="text-16 min-h-12 flex-1 rounded-lg border-2 border-[var(--color-navy)] px-4 font-semibold text-[var(--color-navy)]"
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
                  skippedFirst: Boolean(linked?.skipFirst),
                });
                setResumeDismissed(true);
              }}
              className="text-16 min-h-12 flex-1 rounded-lg bg-[var(--color-navy)] px-4 font-semibold text-[var(--color-paper)]"
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
            className="text-18 inline-flex min-h-12 items-center gap-2 rounded-lg px-2 font-medium text-[var(--color-navy)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          >
            <ArrowLeft className="size-5 shrink-0" aria-hidden />
            Back
          </button>
        ) : (
          <span className="min-h-12" />
        )}
        <p className="text-16 font-medium text-[var(--color-ink-muted)]" aria-live="polite">
          Step {stepNumber} of {totalSteps} · {STEP_LABELS[stored.phase]}
        </p>
      </div>

      <div
        className="mb-8 h-3 overflow-hidden rounded-full bg-[rgba(15,34,65,0.08)]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={stepNumber}
        aria-label={`Step ${stepNumber} of ${totalSteps}`}
      >
        <div
          className="h-full rounded-full bg-[var(--color-navy)] transition-all duration-200 ease-in-out"
          style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
        />
      </div>

      {stored.phase === "topic" ? (
        <section aria-labelledby="quiz-heading">
          <h2
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-26 md:text-28 leading-tight font-bold text-[var(--color-navy)] outline-none"
          >
            Pick what you need help with
          </h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]/85">
            One tap, two questions at most, then a real answer. If we talk after that, it can be at
            your kitchen table — same person who reads this, not a call center.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {QUIZ_SITUATIONS.map((item) => {
              const Icon = SITUATION_ICONS[item.id] ?? Shield;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectSituation(item)}
                  className={cn(
                    "card-surface flex min-h-[148px] flex-col items-start gap-3 p-6 text-left transition-[border-color,box-shadow] duration-150",
                    "hover:border-[var(--color-navy)] hover:shadow-[0_8px_28px_rgba(15,34,65,0.08)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]",
                  )}
                >
                  <Icon
                    className="size-8 text-[var(--color-gold-ink)]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="text-22 font-bold text-[var(--color-navy)]">{item.label}</span>
                  <span className="text-16 leading-snug font-normal text-[var(--color-ink-muted)]">
                    {item.blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {stored.phase === "branch" && currentBranch ? (
        <section aria-labelledby="quiz-heading">
          <p className="text-14 font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase">
            {topic ? TOPIC_LABELS[topic] : ""}
          </p>

          {/*
            Arriving from a landing page skips question one. Show what was
            assumed, and let them change it — a step that vanishes without
            explanation reads as a glitch.
          */}
          {preAnswered ? (
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              You said: <span className="font-medium text-[var(--color-navy)]">{preAnswered}</span>{" "}
              <button
                type="button"
                onClick={() => patch({ branchIndex: 0, skippedFirst: false })}
                className="font-medium text-[var(--color-navy)] underline underline-offset-2"
              >
                change
              </button>
            </p>
          ) : null}
          <h2
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-26 md:text-28 mt-2 leading-tight font-bold text-[var(--color-navy)] outline-none"
          >
            {currentBranch.prompt}
          </h2>
          {currentBranch.help ? (
            <p className="text-18 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
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
            <p className="text-14 font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase">
              Based on your answers
            </p>
            <h2
              id="quiz-heading"
              ref={headingRef}
              tabIndex={-1}
              className="text-24 md:text-27 mt-3 leading-tight font-bold text-[var(--color-navy)] outline-none"
            >
              {valueBeat.headline}
            </h2>
            <p className="text-18 mt-4 leading-relaxed text-[var(--color-navy)]">
              {valueBeat.lede}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {valueBeat.points.map((point) => (
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
              {valueBeat.note}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              recordPartial("contact");
              patch({ phase: "contact" });
            }}
            className="text-18 mt-8 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          >
            Continue — I’ll follow up myself
          </button>
          <p className="text-16 mt-3 text-center text-[var(--color-ink-muted)]">
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
            <p className="text-16 mt-6 border-t border-gray-300 pt-6 text-center leading-relaxed text-[var(--color-ink-muted)]">
              Not ready to talk yet?{" "}
              <Link
                href="/remind-me"
                className="font-medium text-[var(--color-navy)] underline underline-offset-2"
              >
                I’ll email you when your enrollment window opens
              </Link>{" "}
              — one email, nothing else.
            </p>
          ) : null}
        </section>
      ) : null}

      {stored.phase === "contact" ? (
        <section aria-labelledby="quiz-heading">
          <h2
            id="quiz-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-26 md:text-28 leading-tight font-bold text-[var(--color-navy)] outline-none"
          >
            How should I reach you?
          </h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]/85">
            Name, email, ZIP, and the checkbox — then send. I’ll follow up myself, usually the same
            day. Nothing is sold to a lead mill.
          </p>

          {topic ? (
            <ul className="mt-5 flex flex-col gap-2 rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-5 py-4">
              {describeAnswers(topic, stored.answers).map((row) => (
                <li key={row.question} className="text-16 leading-snug">
                  <span className="text-[var(--color-ink-muted)]">{row.question}</span>
                  <span className="mt-0.5 block font-medium text-[var(--color-navy)]">
                    {row.answer}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="card-surface mt-6 border-l-4 border-l-[var(--color-gold-ink)] p-5">
            <p className="text-17 leading-relaxed text-[var(--color-navy)]">
              <strong>{AGENT.name}</strong> reads every submission. Your name is not sold to a lead
              network, and you will not get ten calls from strangers. One licensed agent in{" "}
              {AGENT.city}. No cost, no obligation. {AGENT.hours}
            </p>
          </div>

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
                className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
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
                className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
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
                  className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
                >
                  Phone{" "}
                  <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
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
                  className="text-18 mb-2 block font-medium text-[var(--color-navy)]"
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
                <p className="text-15 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  Plans follow the county, not the town name.
                </p>
              </div>
            </div>

            {/*
              Optional fields used to sit in the main path and make the last step
              feel longer than the quiz. Keep them one tap away; open by default
              only when a landing page already asked for a note.
            */}
            <details
              className="rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-4 py-3"
              open={askContext !== "general"}
            >
              <summary className="text-17 cursor-pointer font-medium text-[var(--color-navy)]">
                Optional details — how to meet, a note, income
              </summary>
              <div className="mt-4 space-y-5 border-t border-gray-200 pt-4">
                <fieldset>
                  <legend className="text-17 mb-2 font-medium text-[var(--color-navy)]">
                    How would you like to talk?
                  </legend>
                  <div className="flex flex-col gap-2">
                    {MEET_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          "text-16 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3",
                          meet === opt.value
                            ? "border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                            : "border-gray-300 bg-white",
                        )}
                      >
                        <input
                          type="radio"
                          name="meet_preference"
                          value={opt.value}
                          checked={meet === opt.value}
                          onChange={() => setMeet(opt.value)}
                          className="size-4 shrink-0"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="help-quiz-note"
                    className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
                  >
                    {ASK_PROMPTS[askContext].label}
                  </label>
                  <textarea
                    id="help-quiz-note"
                    name="note"
                    rows={3}
                    maxLength={1000}
                    placeholder={ASK_PROMPTS[askContext].placeholder}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="text-17 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 leading-relaxed text-[var(--color-navy)] outline-none placeholder:text-[var(--color-ink-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
                  />
                  <p className="text-15 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    Whatever you write here is what I look up before I call you.
                  </p>
                </div>

                {topic !== "life_insurance" ? (
                  <div>
                    <label
                      htmlFor="help-quiz-income"
                      className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
                    >
                      Household income
                    </label>
                    <p className="text-15 mb-2 leading-relaxed text-[var(--color-ink-muted)]">
                      Only useful because Medicare premiums follow income from two years ago. Skip
                      it if you would rather talk about it later.
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
                ) : null}
              </div>
            </details>

            <label className="text-16 flex cursor-pointer gap-3 rounded-xl bg-[rgba(15,34,65,0.04)] px-4 py-4 text-left leading-relaxed text-[var(--color-navy)]">
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
              <label className="text-15 flex cursor-pointer gap-3 rounded-xl bg-[rgba(15,34,65,0.04)] px-4 py-4 text-left leading-relaxed text-[var(--color-navy)]">
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
              disabled={submitting}
              className="text-18 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Send my answers"}
            </button>
            <p className="text-15 text-center text-[var(--color-ink-muted)]">
              Or call{" "}
              <a
                href={AGENT.phoneHref}
                className="font-semibold text-[var(--color-navy)] underline"
              >
                {AGENT.phone}
              </a>{" "}
              — same person.
            </p>
          </form>
        </section>
      ) : null}
    </div>
  );
}
