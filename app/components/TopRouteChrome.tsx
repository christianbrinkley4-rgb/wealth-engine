"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AGENT } from "@/lib/agent";

const NAV = [
  { href: "/turning-65", label: "Turning 65" },
  { href: "/annual-enrollment", label: "Already on Medicare" },
  { href: "/retirement-income", label: "Retirement" },
  { href: "/life-insurance", label: "Life insurance" },
  { href: "/about", label: "Meet Christian" },
] as const;

/**
 * On a phone the call button is the one thing that never scrolls out of reach
 * or hides behind a menu; the page links fold into the menu instead.
 */
export function TopRouteChrome() {
  const pathname = usePathname() ?? "/";
  // The menu belongs to the page it was opened on, so moving to another page closes it.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;

  if (pathname.startsWith("/lp/")) return null;

  return (
    <header className="site-header">
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-white px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to the main content
      </a>
      <div className="personal-shell site-header-main">
        <Link href="/" className="site-brand">
          <span className="site-brand-name">{AGENT.name}</span>
          <span className="site-brand-role">
            <span className="site-brand-role-short">Licensed agent · {AGENT.city}</span>
            <span className="site-brand-role-long">
              Licensed insurance agent · {AGENT.city}, {AGENT.state}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header-actions">
          <a className="site-call" href={AGENT.phoneHref}>
            <Phone size={18} aria-hidden />
            <span className="site-call-short">Call</span>
            <span className="site-call-long">{AGENT.phone}</span>
          </a>
          <button
            type="button"
            className="site-menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
          >
            {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      <nav id="site-menu" aria-label="Menu" className="site-menu" hidden={!menuOpen}>
        <ul className="personal-shell">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/start">Ask a question</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
