"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDE_PREFIXES = [
  "/start",
  "/medicare",
  "/roth-window",
  "/remind-me",
  "/thank-you",
  "/privacy",
];

/**
 * Mobile-only sticky CTA. Hidden on the quiz, tools with their own primary
 * actions, and screens where another CTA would compete with the task.
 */
export function StickyMobileCta() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(15,34,65,0.15)] bg-[var(--color-paper)]/95 p-3 shadow-[0_-8px_24px_rgba(15,34,65,0.12)] backdrop-blur md:hidden"
      role="region"
      aria-label="Start with what you need help with"
    >
      <Link
        href="/start"
        className="flex h-14 w-full items-center justify-center rounded-xl bg-[var(--color-navy)] text-[18px] font-bold text-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
      >
        Ask your question →
      </Link>
    </div>
  );
}
