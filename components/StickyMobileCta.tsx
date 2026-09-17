"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { AGENT } from "@/lib/agent";

const HIDE_PREFIXES = [
  "/lp",
  "/start",
  "/plan",
  "/medicare",
  "/roth-window",
  "/remind-me",
  "/schedule",
  "/thank-you",
  "/privacy",
];

/**
 * Mobile-only sticky bar. Hidden on the quiz, tools with their own primary
 * actions, and screens where another call-to-action would compete.
 *
 * /schedule is one of those screens. On a 390px phone the bar sat over the
 * topic list and over "View available times", so the one tap that books a
 * conversation was the one tap the bar intercepted — and its second button
 * sent someone already looking at the Medicare calendar back to the quiz.
 * That page carries its own booking button and a visible phone number.
 *
 * It used to offer one route: "Ask your question", which opens a five-step
 * form. On the single most valuable strip of screen the site has, for an
 * audience that reaches for the phone first and fills in forms second, that
 * left the higher-converting option off the page entirely. Both are here now,
 * with the call given equal weight — someone ready to talk should never have
 * to scroll to find a number.
 */
export function StickyMobileCta() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;

  return (
    <div
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(15,34,65,0.15)] bg-[var(--color-paper)]/95 p-3 shadow-[0_-8px_24px_rgba(15,34,65,0.12)] backdrop-blur md:hidden"
      role="region"
      aria-label="Start with what you need help with"
    >
      <div className="flex gap-3">
        <a
          href={AGENT.phoneHref}
          className="text-18 flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-[#254f46] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
        >
          <Phone className="size-5 shrink-0" aria-hidden />
          Call me
        </a>
        <Link
          href="/start"
          className="text-18 flex h-14 flex-1 items-center justify-center rounded-lg border-2 border-[#254f46] bg-white font-bold text-[#254f46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
        >
          Free consultation
        </Link>
      </div>
      <p className="text-14 mt-2 text-center text-[var(--color-ink-muted)]">
        No cost · No obligation · {AGENT.name}
      </p>
    </div>
  );
}
