"use client";

import Link from "next/link";
import { CalendarClock, CheckCircle2, Mail, Phone } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { trackLead } from "@/app/components/Analytics";
import { AGENT } from "@/lib/agent";
import { TOPIC_LABELS, type InterestTopic } from "@/lib/helpQuiz";

function topicLabel(raw: string | null): string | null {
  if (!raw) return null;
  if (raw in TOPIC_LABELS) return TOPIC_LABELS[raw as InterestTopic];
  return null;
}

function ThankYouInner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const topicRaw = searchParams.get("topic");
  const topic = topicLabel(topicRaw);
  const eventId = searchParams.get("eid");

  // The conversion event. Shares its id with the server-side event so the ad
  // platform counts one lead rather than two.
  useEffect(() => {
    if (!eventId) return;
    trackLead(eventId, topicRaw ?? undefined);
  }, [eventId, topicRaw]);

  const isHelpQuiz = source === "help_quiz";

  return (
    <div className="bg-[var(--color-paper)] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto size-12 text-[var(--color-success)]" aria-hidden />
          <h1 className="mt-5 text-[30px] font-semibold tracking-tight text-balance text-[var(--color-navy)] md:text-[34px]">
            {isHelpQuiz ? "Got it — check your email." : "You're all set."}
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-[var(--color-navy)]">
            {isHelpQuiz ? (
              <>
                Your answers are on their way to your inbox right now
                {topic ? <> about {topic.toLowerCase()}</> : null}. I&apos;ll follow up personally —
                usually the same day, always within one business day.
              </>
            ) : (
              "Thanks. I'll follow up if you asked me to get in touch."
            )}
          </p>
        </div>

        {/* Booking is the action worth taking, so it gets the whole card. */}
        <div className="card-surface mt-10 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <CalendarClock
              className="mt-1 size-8 shrink-0 text-[var(--color-gold-ink)]"
              strokeWidth={1.5}
              aria-hidden
            />
            <div>
              <h2 className="text-[22px] font-semibold text-[var(--color-navy)]">
                Want to pick the time yourself?
              </h2>
              <p className="mt-2 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                Grab any slot that suits you — 15 minutes is usually plenty. Otherwise I&apos;ll
                reach out and we&apos;ll find a time.
              </p>
            </div>
          </div>

          <a
            href={AGENT.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 text-[18px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
          >
            Book a time to talk →
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={AGENT.phoneHref}
            className="flex min-h-16 items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-navy)] bg-white px-4 text-[18px] font-semibold text-[var(--color-navy)]"
          >
            <Phone className="size-5" aria-hidden />
            {AGENT.phone}
          </a>
          <a
            href={`mailto:${AGENT.email}`}
            className="flex min-h-16 items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-navy)] bg-white px-4 text-[17px] font-semibold break-all text-[var(--color-navy)]"
          >
            <Mail className="size-5 shrink-0" aria-hidden />
            Email me
          </a>
        </div>

        <p className="mt-8 text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
          Nothing arrived in a few minutes? Check your spam folder for a message from{" "}
          {AGENT.name.split(" ")[0]}, or just call me.
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-[16px] text-[var(--color-navy)] underline underline-offset-4"
          >
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
