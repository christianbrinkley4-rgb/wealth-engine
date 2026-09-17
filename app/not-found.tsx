import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";

/**
 * Without this file, a mistyped or retired URL rendered Next’s built-in
 * "404 | This page could not be found." — a bare line of system text wedged
 * between this site’s header and footer, offering nobody a way onward. Someone
 * arriving from an old ad or a half-copied link deserves the same page as
 * everyone else: the phone number, and the four things people actually came
 * here for.
 */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  { href: "/start", label: "Ask a question", blurb: "Two questions and a real answer, no cost." },
  {
    href: "/keep-my-doctor",
    label: "Can I keep my doctor?",
    blurb: "How networks work here, and how to check properly.",
  },
  {
    href: "/irmaa-appeal",
    label: "My Medicare premium went up",
    blurb: "The eight life events that let you appeal it.",
  },
  {
    href: "/helping-a-parent",
    label: "Helping a parent",
    blurb: "The deadlines and the paperwork that blocks you.",
  },
] as const;

export default function NotFound() {
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="measure-prose app-shell max-w-3xl py-14 md:py-20">
        <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
          Page not found
        </p>
        <h1 className="text-32 md:text-40 mt-3 leading-[1.15] font-semibold tracking-tight text-balance">
          That page isn’t here anymore.
        </h1>
        <p className="text-19 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
          Either the link was mistyped or I’ve moved something. Nothing you did wrong — and if you
          were looking for something specific, calling me is faster than hunting for it.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/start"
            className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
          >
            Ask your question →
          </Link>
          <a
            href={AGENT.phoneHref}
            className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(21,46,52,0.05)]"
          >
            <Phone className="size-5" aria-hidden />
            {AGENT.phone}
          </a>
        </div>

        <h2 className="text-22 mt-14 font-semibold">What people usually came here for</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(21,46,52,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
              >
                <span className="text-18 font-semibold">{item.label} →</span>
                <span className="text-16 mt-1 leading-snug text-[var(--color-ink-muted)]">
                  {item.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-17 mt-10 text-[var(--color-ink-muted)]">
          Or go back to{" "}
          <Link
            href="/"
            className="font-medium text-[var(--color-navy)] underline underline-offset-2"
          >
            the home page
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
