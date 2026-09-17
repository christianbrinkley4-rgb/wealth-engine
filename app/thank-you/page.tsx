"use client";

import Link from "next/link";
import { CalendarClock, CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { trackLeadOnce } from "@/app/components/Analytics";
import { AGENT } from "@/lib/agent";
import { inSentence, TOPIC_LABELS, type InterestTopic } from "@/lib/helpQuiz";

function topicLabel(raw: string | null): string | null {
  if (!raw) return null;
  if (Object.hasOwn(TOPIC_LABELS, raw)) return TOPIC_LABELS[raw as InterestTopic];
  return null;
}

const NEXT_READS: Record<InterestTopic, Array<{ href: string; label: string; blurb: string }>> = {
  care_coverage: [
    {
      href: "/care-coverage",
      label: "Care and critical illness coverage",
      blurb: "Questions to bring to a conversation about your family’s protection",
    },
  ],
  medicare: [
    {
      href: "/turning-65",
      label: "Turning 65",
      blurb: "Medicare enrollment dates and when to review Medigap options",
    },
    {
      href: "/annual-enrollment",
      label: "Annual enrollment",
      blurb: "What the fall letter means, and when nothing should change",
    },
    {
      href: "/keep-my-doctor",
      label: "Keeping your doctor",
      blurb: "How to check a specific practice against a specific plan",
    },
  ],
  financial_planning: [
    {
      href: "/retirement-income",
      label: "Retirement income",
      blurb: "Four options for an old 401(k) and the Medicare timing trap",
    },
    {
      href: "/social-security-timing",
      label: "Social Security timing",
      blurb: "What claiming at 62, FRA, and 70 each cost a household",
    },
    {
      href: "/plan",
      label: "Conversion timing",
      blurb: "What a Roth conversion does to a Medicare premium two years later",
    },
  ],
  life_insurance: [
    {
      href: "/life-insurance",
      label: "Life insurance",
      blurb: "Term vs permanent decided by how long the money is needed",
    },
    {
      href: "/retirement-income",
      label: "Retirement income",
      blurb: "Group coverage that ends when the job does, and what replaces it",
    },
    {
      href: "/annuities",
      label: "Annuities",
      blurb: "How to read a proposal without buying the pitch",
    },
  ],
};

/**
 * The booking button used to read "Conversation options", which told a visitor
 * who had just answered four Medicare questions nothing about where it went.
 * Naming the topic is the difference between a link and an invitation.
 */
const BOOKING_CTA: Record<InterestTopic, string> = {
  medicare: "See Medicare times",
  life_insurance: "See life insurance times",
  financial_planning: "See times for retirement questions",
  care_coverage: "See times for care coverage",
};

function ThankYouInner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const topicRaw = searchParams.get("topic");
  const topic = topicLabel(topicRaw);
  const topicKey =
    topicRaw && Object.hasOwn(TOPIC_LABELS, topicRaw) ? (topicRaw as InterestTopic) : null;
  const eventId = searchParams.get("eid");
  /* Set by the API when no email provider is configured — see thankYouUrl. */
  const emailUnavailable = searchParams.get("noemail") === "1";

  // The conversion event. Shares its id with the server-side event so the ad
  // platform counts one lead rather than two.
  useEffect(() => {
    if (!eventId) return;
    trackLeadOnce(eventId, topicRaw ?? undefined);
  }, [eventId, topicRaw]);

  const isHelpQuiz = source === "help_quiz";
  const isWizard = source === "wizard_completion" || source === "roth_calculator";
  const isReminder = source === "reminder";

  const headline = emailUnavailable
    ? "Got it — I have your answers."
    : isHelpQuiz
      ? "Got it — check your email."
      : isWizard
        ? "Got it — your estimate is saved."
        : isReminder
          ? "You’re on the list."
          : "You’re all set.";

  const lede = emailUnavailable ? (
    <>
      They came straight to me{topic ? <> about {inSentence(topic)}</> : null}, and I’ll follow up
      personally. If you would rather not wait, the number below is mine.
    </>
  ) : isHelpQuiz ? (
    <>
      Your answers are on their way to your inbox right now
      {topic ? <> about {inSentence(topic)}</> : null}. I’ll follow up personally to talk through
      your next step.
    </>
  ) : isWizard ? (
    <>
      I’ll look at what you entered
      {topic ? <> for {inSentence(topic)}</> : null} and follow up personally. If you’d rather talk
      through the numbers now, call me.
    </>
  ) : isReminder ? (
    <>
      I’ll email you when your Medicare enrollment window opens. That is a reminder only — not a
      sales sequence — and you can unsubscribe any time.
    </>
  ) : (
    <>
      Thanks. I’ll follow up if you asked me to get in touch
      {topic ? <> about {inSentence(topic)}</> : null}.
    </>
  );

  const reads = topicKey ? NEXT_READS[topicKey] : null;
  const schedulingHref = topicKey
    ? `${AGENT.schedulingUrl}?topic=${encodeURIComponent(topicKey)}`
    : AGENT.schedulingUrl;

  return (
    <div className="bg-[var(--color-paper)] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto size-12 text-[var(--color-success)]" aria-hidden />
          <h1 className="text-30 md:text-34 mt-5 font-semibold tracking-tight text-balance text-[var(--color-navy)]">
            {headline}
          </h1>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-navy)]">{lede}</p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            "One person reads this — me",
            "Your information is never sold",
            "Free consultation. No obligation",
          ].map((point) => (
            <li
              key={point}
              className="text-15 flex items-start gap-2 rounded-xl border border-[rgba(21,46,52,0.12)] bg-white px-4 py-3 text-left text-[var(--color-navy)]"
            >
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-[var(--color-gold-ink)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Booking is the action worth taking, so it gets the whole card. */}
        <div className="card-surface mt-10 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <CalendarClock
              className="mt-1 size-8 shrink-0 text-[var(--color-gold-ink)]"
              strokeWidth={1.5}
              aria-hidden
            />
            <div>
              <h2 className="text-22 font-semibold text-[var(--color-navy)]">
                Let’s arrange a conversation.
              </h2>
              <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                Your answers are saved, so there is nothing to send again. You can pick a time now,
                or wait for me to follow up — whichever you prefer.
              </p>
            </div>
          </div>

          <Link
            href={schedulingHref}
            className="text-18 mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
          >
            {topicKey ? BOOKING_CTA[topicKey] : "See available times"} →
          </Link>

          {/* Details below the button: what the meeting is, for someone who
              has decided to tap, not a paragraph standing in their way. */}
          <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            We set aside 60 minutes, every day at 9am, 11am, 1pm, 3pm, and 5pm Eastern, with at
            least 24 hours’ notice.
            {topicKey === null || topicKey === "medicare"
              ? " For a Medicare conversation, I’ll confirm with you personally before we meet."
              : ""}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={AGENT.phoneHref}
            className="text-18 flex min-h-16 items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-navy)] bg-white px-4 font-semibold text-[var(--color-navy)]"
          >
            <Phone className="size-5" aria-hidden />
            {AGENT.phone}
          </a>
          <a
            href={`mailto:${AGENT.email}`}
            className="text-17 flex min-h-16 items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-navy)] bg-white px-4 font-semibold break-all text-[var(--color-navy)]"
          >
            <Mail className="size-5 shrink-0" aria-hidden />
            Email me
          </a>
        </div>

        {reads ? (
          <div className="mt-12">
            <h2 className="text-20 font-semibold text-[var(--color-navy)]">
              While you wait, these are worth reading
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {reads.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(21,46,52,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
                  >
                    <span className="text-17 font-semibold text-[var(--color-navy)]">
                      {item.label} →
                    </span>
                    <span className="text-16 mt-1 text-[var(--color-ink-muted)]">{item.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {emailUnavailable ? null : (
          <p className="text-16 mt-8 text-center leading-relaxed text-[var(--color-ink-muted)]">
            Nothing arrived in a few minutes? Check your spam folder for a message from{" "}
            {AGENT.name.split(" ")[0]}, or just call me.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link href="/" className="text-16 text-[var(--color-navy)] underline underline-offset-4">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouInner />
    </Suspense>
  );
}
