"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { AGENT } from "@/lib/agent";
import { cn } from "@/lib/utils";

/**
 * Header, phone number, and the site’s only navigation.
 *
 * Before this there was no nav at all — every page offered a single "← Home"
 * link, so someone reading about keeping their doctor had no way to reach the
 * page about appealing a premium without going back to the home page and
 * hunting through a strip of small print at the bottom.
 *
 * Laid out as a plain wrapping row rather than a hamburger: this audience
 * should never have to find a menu, and five links fit.
 */

const NAV = [
  { href: "/start", label: "Ask a question" },
  { href: "/keep-my-doctor", label: "Can I keep my doctor?" },
  { href: "/irmaa-appeal", label: "My premium went up" },
  { href: "/helping-a-parent", label: "Helping a parent" },
  { href: "/about", label: "About me" },
] as const;

export function TopRouteChrome() {
  const pathname = usePathname();

  // Paid-traffic landing pages carry their own minimal header; a nav bar
  // there is five ways to leave before calling.
  if (pathname?.startsWith("/lp/")) return null;

  return (
    <header>
      {/*
        Every page puts a phone number and five nav links before its first
        heading. Without this, a keyboard or screen-reader user tabs through
        all of them on every single page before reaching the content.
      */}
      <a
        href="#main-content"
        className="text-16 sr-only rounded-lg bg-[var(--color-navy)] px-4 py-3 font-semibold text-[var(--color-paper)] focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to the main content
      </a>
      <div className="trust-pill sticky top-0 z-50 w-full">
        <div className="app-shell flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
          <Link
            href="/"
            className="text-15 leading-snug font-medium text-[var(--color-paper)] no-underline"
          >
            {AGENT.name} · Licensed agent · {AGENT.city}
          </Link>
          <a
            href={AGENT.phoneHref}
            className="text-16 inline-flex items-center gap-2 font-semibold text-[var(--color-paper)] underline underline-offset-4"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>{AGENT.phone}</span>
          </a>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="border-b border-[rgba(15,34,65,0.12)] bg-[var(--color-paper)]"
      >
        <ul className="app-shell flex list-none flex-wrap gap-x-6 gap-y-1 px-4 py-2">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-17 inline-flex min-h-11 items-center font-medium text-[var(--color-navy)] underline-offset-4 hover:underline",
                    active && "underline decoration-2",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
