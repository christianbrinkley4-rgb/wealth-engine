"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { StickyCTA } from "@/components/story/StickyCTA";
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
  "/disclaimer",
  "/unsubscribe",
  // Keep contact bars clear of print cards, reviews, and interactive tool fields.
  "/review",
  "/tools",
  "/medicare-fit",
  "/medicare-plan-checklist",
  "/plan-checklist-tool",
  "/greensboro-medicare-cost-calculator",
  "/part-b-penalty",
  // The money hub for younger visitors has its own calls to action.
  "/wealth",
  "/links",
  // The /ai guides are purely informational; no phone number anywhere on them.
  "/ai",
];

const DISMISS_KEY = "we-scta-dismissed";

/** Medicare pages offer a free review; the plan check itself offers a time. */
function secondStep(pathname: string): { href: string; label: string } {
  if (
    ["/", "/turning-65", "/plan-check", "/aep", "/anoc", "/answers"].some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ) ||
    pathname.startsWith("/medicare") ||
    pathname.startsWith("/guides")
  ) {
    return { href: "/start?topic=medicare&quick=1", label: "Ask me a question" };
  }
  return { href: "/start", label: "Free Review" };
}

const FIELD_SELECTOR = "input, select, textarea";

/**
 * Mobile-only sticky bar: the phone number, then a free review.
 *
 * It stays tucked until the hero's own buttons have scrolled away, and it
 * hides while someone is typing so it cannot cover a form field. A visitor
 * can dismiss it once; that choice stays in localStorage across tabs and
 * later visits.
 */
export function StickyMobileCta() {
  const pathname = usePathname() ?? "/";
  const hidden = HIDE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const [pastHero, setPastHero] = useState(false);
  const [typing, setTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      // Read the persisted browser preference after hydration, preserving dismissal behavior.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // Private browsing can block storage. The bar still works.
    }
  }, []);

  useEffect(() => {
    function update() {
      const closeVisible = Array.from(
        document.querySelectorAll(
          ".ktc-actions, .art-next-actions, .steps-actions, .consultation-actions:not(#page-hero-actions), .ft",
        ),
      ).some((element) => {
        const rect = element.getBoundingClientRect();
        return rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
      });
      const hero =
        document.getElementById("home-hero-actions") ??
        document.getElementById("page-hero-actions");
      if (!hero) {
        setPastHero(!closeVisible);
        return;
      }
      // Shown once the hero's own buttons have left the top of the screen.
      setPastHero(!closeVisible && hero.getBoundingClientRect().bottom < 8);
    }
    if (hidden) return;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hidden, pathname]);

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

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // The bar is already gone for this view.
    }
  }

  const tucked = typing || !pastHero;
  const second = secondStep(pathname);

  return (
    <StickyCTA
      hidden={hidden || dismissed}
      tucked={tucked}
      callHref={AGENT.phoneHref}
      callLabel={AGENT.phone}
      reviewHref={second.href}
      reviewLabel={second.label}
      onDismiss={dismiss}
    />
  );
}
