"use client";

import Image from "next/image";
import { TrackedLink as Link } from "@/components/TrackedLink";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AGENT } from "@/lib/agent";

export const NAV = [
  { href: "/turning-65", label: "Turning 65" },
  { href: "/annual-enrollment", label: "Already on Medicare" },
  { href: "/learn", label: "Medicare guides" },
  { href: "/service-area", label: "Towns I serve" },
  { href: "/about", label: "About" },
] as const;
const SHEET_EXTRA = [
  { href: "/wealth", label: "Money guides" },
  { href: "/start", label: "Ask a question" },
  { href: "/tools", label: "Free tools" },
] as const;

/** The /wealth hub and /links carry their own header and footer. */
function isWealthHub(pathname: string) {
  return pathname === "/links" || pathname === "/wealth" || pathname.startsWith("/wealth/");
}

/** The /ai guides are purely informational; no phone number anywhere on them. */
function isAiRoute(pathname: string) {
  return pathname === "/ai" || pathname.startsWith("/ai/");
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * On a phone the call button is the one thing that never scrolls out of reach
 * or hides behind a menu; the page links fold into the menu instead.
 */
export function TopRouteChrome() {
  const pathname = usePathname() ?? "/";
  // The menu belongs to the page it was opened on, so moving to another page closes it.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = menuOpenOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A full-screen menu should not let the page scroll underneath it.
  // Focus moves to the first menu link on open and returns to the
  // menu button on close, so keyboard and screen reader users land
  // inside the menu instead of being stranded on the page behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpenOn(null);
    window.addEventListener("keydown", onKey);
    // Move focus into the menu on open
    const firstLink = document.querySelector("#site-menu a") as HTMLElement | null;
    firstLink?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      // Return focus to the menu button on close
      const menuButton = document.querySelector(".nav-menu-button") as HTMLElement | null;
      menuButton?.focus();
    };
  }, [menuOpen]);

  if (pathname.startsWith("/lp/") || isWealthHub(pathname)) return null;

  // The sheet lives OUTSIDE the header on purpose: .nav uses backdrop-filter,
  // which makes it a containing block for fixed-position descendants. A
  // position:fixed sheet inside the header would size against the header
  // instead of the viewport and render clipped. As a sibling it covers the
  // viewport properly; the header (z-50) stays above it (z-49) so the
  // close button remains tappable.
  return (
    <>
    <header className="nav" data-scrolled={scrolled || menuOpen ? "true" : undefined}>
      <a href="#main-content" className="skip-link">
        Skip to the main content
      </a>
      <div className="shell nav-bar">
        <Link ctaLocation="header" href="/" className="nav-brand" aria-label={`${AGENT.name} ${AGENT.licenseLine} · ${AGENT.city}, ${AGENT.state}, home`}>
          <Image
            src="/christian-brinkley-square.jpg"
            alt=""
            width={96}
            height={96}
            sizes="44px"
            loading="eager"
            className="nav-face"
          />
          <span className="nav-brand-text">
            <span className="nav-name">{AGENT.name}</span>{" "}
            <span className="nav-license">
              {AGENT.licenseLine}
              <span className="nav-license-place">
                {" "}
                · {AGENT.city}, {AGENT.state}
              </span>
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="nav-links">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link ctaLocation="header"
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/wealth" className="nav-money">Money guides</Link>
          <Link ctaLocation="header" href="/plan-check" className="btn btn-accent btn-sm nav-cta">
            Plan check
          </Link>
          {!isAiRoute(pathname) && (
            <a data-cta-location="header" className="nav-call" href={AGENT.phoneHref} aria-label={`Call ${AGENT.phone}`}>
              <Phone size={17} aria-hidden />
              <span className="nav-call-number">{AGENT.phone}</span>
            </a>
          )}
          <button
            type="button"
            className="nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>
    </header>

      <nav id="site-menu" aria-label="Menu" className="nav-sheet" hidden={!menuOpen}>
        <ul>
          {[...NAV, ...SHEET_EXTRA].map((item, index) => (
            <li key={item.href} style={{ "--i": index } as React.CSSProperties}>
              <Link ctaLocation="menu"
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
                <ArrowRight size={20} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-sheet-actions">
          {!isAiRoute(pathname) && (
            <a data-cta-location="menu" href={AGENT.phoneHref} className="btn btn-block">
              <Phone size={19} aria-hidden /> {AGENT.phone}
            </a>
          )}
          <Link ctaLocation="menu" href="/plan-check" className="btn btn-accent btn-block">
            90-second plan check
          </Link>
        </div>
        <p className="nav-sheet-note">
          It&apos;s just me answering. If I&apos;m with someone, leave a message and I&apos;ll call
          you back.
        </p>
      </nav>
    </>
  );
}
