"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AGENT } from "@/lib/agent";

/**
 * Exact paths and path prefixes where the bar steps aside. Every Medicare
 * page keeps it, including the Medicare tool and the town pages: those are
 * where people decide to call. Matching is exact or by "/prefix/" so that
 * "/plan" never hides "/plan-check" and "/medicare" never hid
 * "/medicare-in/greensboro" again.
 */
const HIDE_PREFIXES = [
  "/lp",
  "/start",
  "/plan",
  "/roth-window",
  "/remind-me",
  "/schedule",
  "/thank-you",
  "/privacy",
  "/unsubscribe",
  // The money hub for younger visitors has its own calls to action.
  "/wealth",
  "/links",
  // The /ai guides are purely informational; no phone number or sales CTA.
  "/ai",
];

/** Medicare pages offer the plan check as the second step; elsewhere, a question. */
function secondStep(pathname: string): { href: string; label: string } {
  if (pathname === "/plan-check") return { href: "/schedule?topic=medicare", label: "Book a time" };
  if (
    pathname.startsWith("/medicare") ||
    ["/aep", "/anoc", "/annual-enrollment", "/advantage-vs-medigap", "/answers"].some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    return { href: "/plan-check", label: "Plan check" };
  }
  return { href: "/start", label: "Ask a question" };
}

const FIELD_SELECTOR = "input, select, textarea";

/**
 * Mobile-only sticky bar: call first, one other step second.
 *
 * Hidden on the quiz, on tools with their own primary actions, and on screens
 * where another button would compete. On /schedule it used to cover the one tap
 * that books a conversation.
 *
 * It also steps aside in two moments. On the homepage it waits until the
 * hero's own call and date buttons have scrolled away, so the first screen
 * never shows the same two buttons twice. And while someone is typing in a
 * form, it hides so it can't sit on top of the field or its submit button
 * above the phone's keyboard.
 */
export function StickyMobileCta() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const [heroVisible, setHeroVisible] = useState(isHome);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.getElementById("home-hero-actions");
    if (!hero || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setHeroVisible(false));
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    function onFocusIn(event: FocusEvent) {
      if ((event.target as Element | null)?.matches?.(FIELD_SELECTOR)) setTyping(true);
    }
    function onFocusOut(event: FocusEvent) {
      const next = event.relatedTarget as Element | null;
      if (!next?.matches?.(FIELD_SELECTOR)) setTyping(false);
    }
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const hidden = HIDE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;

  const tucked = typing || (isHome && heroVisible);
  const second = secondStep(pathname);

  return (
    <div
      className="scta"
      data-tucked={tucked ? "true" : undefined}
      role="region"
      aria-label="Call or get started"
      inert={tucked}
    >
      <a href={AGENT.phoneHref} className="scta-call">
        <Phone size={20} aria-hidden />
        Call Christian
      </a>
      {isHome ? (
        <Link href="/plan-check" className="scta-second">
          Plan check
        </Link>
      ) : (
        <Link href={second.href} className="scta-second">
          {second.label}
        </Link>
      )}
    </div>
  );
}
