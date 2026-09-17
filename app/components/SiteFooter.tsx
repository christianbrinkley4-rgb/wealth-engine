"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AGENT, GOVERNMENT_DISCLAIMER, TPMO_DISCLAIMER } from "@/lib/agent";
import { featuredPlaces, SERVICE_AREA_LEDE } from "@/lib/triad";

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
    <footer className="border-t border-gray-300 bg-white text-[var(--color-navy)]">
      <div className="app-shell py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-22 font-serif font-semibold">{AGENT.name}</p>
            <p className="text-16 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Licensed insurance agent · {AGENT.city}, {AGENT.state}
            </p>
            <p className="text-16 mt-1">
              <a href={AGENT.phoneHref} className="font-semibold underline underline-offset-2">
                {AGENT.phone}
              </a>
            </p>
            <p className="text-15 mt-3 max-w-[36ch] leading-relaxed text-[var(--color-ink-muted)]">
              {AGENT.hours} {AGENT.afterHoursPromise}
            </p>
            <p className="text-15 mt-4 max-w-[40ch] leading-relaxed text-[var(--color-ink-muted)]">
              {SERVICE_AREA_LEDE} Free consultation. No obligation.
            </p>
          </div>

          <div>
            <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
              Get help
            </p>
            <ul className="text-16 mt-3 flex flex-col gap-1">
              <li>
                <Link
                  href="/turning-65"
                  className="inline-flex min-h-11 items-center underline-offset-2 hover:underline"
                >
                  Turning 65
                </Link>
              </li>
              <li>
                <Link
                  href="/annual-enrollment"
                  className="inline-flex min-h-11 items-center underline-offset-2 hover:underline"
                >
                  Annual enrollment
                </Link>
              </li>
              <li>
                <Link
                  href="/life-insurance"
                  className="inline-flex min-h-11 items-center underline-offset-2 hover:underline"
                >
                  Life insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/retirement-income"
                  className="inline-flex min-h-11 items-center underline-offset-2 hover:underline"
                >
                  Retirement income
                </Link>
              </li>
              <li>
                <Link
                  href="/start"
                  className="inline-flex min-h-11 items-center font-semibold underline-offset-2 hover:underline"
                >
                  Request a consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center underline-offset-2 hover:underline"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
              Guides
            </p>
            <ul className="text-16 mt-3 flex flex-col gap-2">
              <li>
                <Link href="/keep-my-doctor" className="underline-offset-2 hover:underline">
                  Keep my doctor?
                </Link>
              </li>
              <li>
                <Link href="/advantage-vs-medigap" className="underline-offset-2 hover:underline">
                  Advantage vs Medigap
                </Link>
              </li>
              <li>
                <Link href="/irmaa-appeal" className="underline-offset-2 hover:underline">
                  Appeal a high premium
                </Link>
              </li>
              <li>
                <Link href="/helping-a-parent" className="underline-offset-2 hover:underline">
                  Helping a parent
                </Link>
              </li>
              <li>
                <Link href="/social-security-timing" className="underline-offset-2 hover:underline">
                  Social Security timing
                </Link>
              </li>
              <li>
                <Link href="/annuities" className="underline-offset-2 hover:underline">
                  Annuities
                </Link>
              </li>
              <li>
                <Link href="/care-coverage" className="underline-offset-2 hover:underline">
                  Care and critical illness coverage
                </Link>
              </li>
              <li>
                <Link
                  href="/turning-65#enrollment-dates"
                  className="underline-offset-2 hover:underline"
                >
                  Find my Medicare dates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
              Near you
            </p>
            <ul className="text-16 mt-3 flex flex-col gap-3">
              {featuredPlaces().map((city) => (
                <li key={city.slug}>
                  <span className="block font-medium">{city.name}</span>
                  <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <Link
                      href={`/medicare-in/${city.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      Medicare
                    </Link>
                    <Link
                      href={`/life-insurance-in/${city.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      Life
                    </Link>
                    <Link
                      href={`/retirement-in/${city.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      Retirement
                    </Link>
                  </span>
                </li>
              ))}
              <li>
                <Link
                  href="/service-area"
                  className="font-medium underline-offset-2 hover:underline"
                >
                  View all communities →
                </Link>
              </li>
              <li>
                <Link href="/medicare" className="underline-offset-2 hover:underline">
                  Premium estimate
                </Link>
              </li>
              <li>
                <Link href="/plan" className="underline-offset-2 hover:underline">
                  Conversion timing
                </Link>
              </li>
              <li>
                <Link href="/roth-window" className="underline-offset-2 hover:underline">
                  Roth conversion window
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="underline-offset-2 hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-13 mt-10 max-w-[72ch] leading-relaxed text-[var(--color-ink-muted)]">
          {GOVERNMENT_DISCLAIMER} This site is operated by {AGENT.name}, a licensed insurance agent
          who represents a limited number of insurance companies. It is not affiliated with the
          University of North Carolina at Greensboro. Nothing here is tax, legal, or investment
          advice.
        </p>
        <p className="text-13 mt-3 max-w-[72ch] leading-relaxed text-[var(--color-ink-muted)]">
          {TPMO_DISCLAIMER}
        </p>
        <p className="text-13 mt-4 text-[var(--color-ink-muted)]">
          © {year} {AGENT.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
