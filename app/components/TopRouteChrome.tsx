"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { AGENT } from "@/lib/agent";

const NAV = [
  { href: "/turning-65", label: "Turning 65" },
  { href: "/annual-enrollment", label: "Already on Medicare" },
  { href: "/retirement-income", label: "Retirement" },
  { href: "/life-insurance", label: "Life insurance" },
  { href: "/about", label: "Meet Christian" },
] as const;

export function TopRouteChrome() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/lp/")) return null;
  return (
    <header className="personal-header">
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-white px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to the main content
      </a>
      <div className="personal-header-top">
        Personal Medicare &amp; insurance guidance · Greensboro, High Point &amp; Winston-Salem
      </div>
      <div className="personal-shell personal-header-main">
        <Link href="/" className="personal-brand">
          {AGENT.name}
          <small>MEDICARE · INSURANCE · RETIREMENT QUESTIONS</small>
        </Link>
        <nav aria-label="Main">
          <ul className="personal-header-links">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="personal-header-phone" href={AGENT.phoneHref}>
          <Phone size={16} aria-hidden />
          {AGENT.phone}
        </a>
      </div>
    </header>
  );
}
