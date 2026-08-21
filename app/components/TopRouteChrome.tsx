"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { AGENT } from "@/lib/agent";

/**
 * A tap-to-call header. A good share of this audience would rather call than
 * fill in a form — before this the number appeared on two pages, neither of
 * them the home page.
 */
export function TopRouteChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <div className="trust-pill sticky top-0 z-50 w-full">
        <div className="app-shell flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
          <Link
            href="/"
            className="text-[15px] leading-snug font-medium text-[var(--color-paper)] no-underline"
          >
            {AGENT.name} · Licensed agent · {AGENT.city}
          </Link>
          <a
            href={AGENT.phoneHref}
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--color-paper)] underline underline-offset-4"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>{AGENT.phone}</span>
          </a>
        </div>
      </div>

      {!isHome ? (
        <div className="app-shell py-3">
          <Link
            href="/"
            className="inline-flex items-center text-[18px] font-medium underline decoration-2 underline-offset-4"
          >
            ← Home
          </Link>
        </div>
      ) : null}
    </>
  );
}
