"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AGENT, GOVERNMENT_DISCLAIMER } from "@/lib/agent";
import { TRIAD_CITIES } from "@/lib/triad";

/**
 * The site footer, absent on paid-traffic landing pages.
 *
 * Those pages exist to offer exactly one next step. Twelve footer links is
 * eleven ways to leave without calling, so /lp/* gets the disclosures it is
 * legally required to carry and nothing else.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/lp/")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="app-shell text-17 border-t border-gray-300 py-10 leading-relaxed text-[var(--color-navy)]">
      <p className="text-18 font-semibold">{AGENT.name}</p>
      <p className="mt-1 text-[var(--color-ink-muted)]">
        Licensed insurance agent · {AGENT.city}, {AGENT.state} ·{" "}
        <a href={AGENT.phoneHref} className="underline underline-offset-2">
          {AGENT.phone}
        </a>
      </p>
      <p className="text-16 mt-1 text-[var(--color-ink-muted)]">
        {AGENT.hours} {AGENT.afterHoursPromise}
      </p>

      <p className="text-15 mt-5 max-w-[72ch] text-[var(--color-ink-muted)]">
        {GOVERNMENT_DISCLAIMER} This site is operated by {AGENT.name}, a licensed insurance agent
        who represents a limited number of insurance companies. It is not affiliated with the
        University of North Carolina at Greensboro. Nothing here is tax, legal, or investment
        advice.
      </p>

      <p className="text-16 mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <Link href="/start" className="underline underline-offset-2">
          Ask a question
        </Link>
        <Link href="/annual-enrollment" className="underline underline-offset-2">
          Annual enrollment
        </Link>
        <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
          Advantage vs Medigap
        </Link>
        <Link href="/keep-my-doctor" className="underline underline-offset-2">
          Keep my doctor?
        </Link>
        <Link href="/irmaa-appeal" className="underline underline-offset-2">
          Appeal a high premium
        </Link>
        <Link href="/helping-a-parent" className="underline underline-offset-2">
          Helping a parent
        </Link>
        <Link href="/remind-me" className="underline underline-offset-2">
          Remind me later
        </Link>
        <Link href="/annuities" className="underline underline-offset-2">
          Annuities
        </Link>
        <Link href="/life-insurance" className="underline underline-offset-2">
          Life insurance
        </Link>
        <Link href="/social-security-timing" className="underline underline-offset-2">
          When to take Social Security
        </Link>
        <Link href="/retirement-income" className="underline underline-offset-2">
          401(k) at retirement
        </Link>
        <Link href="/about" className="underline underline-offset-2">
          About
        </Link>
        <Link href="/plan" className="underline underline-offset-2">
          Conversion timing planner
        </Link>
        <Link href="/medicare" className="underline underline-offset-2">
          Medicare estimate
        </Link>
        <Link href="/roth-window" className="underline underline-offset-2">
          Roth estimate
        </Link>
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>
      </p>

      <p className="text-16 mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <span className="text-[var(--color-ink-muted)]">Medicare help near you:</span>
        {TRIAD_CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/medicare-in/${city.slug}`}
            className="underline underline-offset-2"
          >
            {city.name}
          </Link>
        ))}
      </p>

      <p className="text-15 mt-5 text-[var(--color-ink-muted)]">
        © {year} {AGENT.name}. All rights reserved.
      </p>
    </footer>
  );
}
