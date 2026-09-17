"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <div
      className="sticky-cta md:hidden"
      data-tucked={tucked ? "true" : undefined}
      role="region"
      aria-label="Call or get started"
      inert={tucked}
    >
      <a href={AGENT.phoneHref} className="sticky-cta-call">
        <Phone size={20} aria-hidden />
        Call Christian
      </a>
      {isHome ? (
        <a href="#your-timeline" className="sticky-cta-second">
          My dates
        </a>
      ) : (
        <Link href="/start" className="sticky-cta-second">
          Ask a question
        </Link>
      )}
    </div>
  );
}
