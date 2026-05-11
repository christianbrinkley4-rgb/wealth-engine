"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "scroll_banner_shown";

const DEFAULT_SUPPRESS_PATHS = ["/medicare", "/taxes"];

export interface ScrollTriggerBannerProps {
  suppressOnPaths?: string[];
}

function hasDismissedBanner() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    //
  }
}

export function ScrollTriggerBanner({
  suppressOnPaths = DEFAULT_SUPPRESS_PATHS,
}: ScrollTriggerBannerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedLocally, setDismissedLocally] = useState(false);

  const suppressed = useMemo(
    () => suppressOnPaths.some((p) => pathname === p || pathname?.startsWith(`${p}/`)),
    [pathname, suppressOnPaths],
  );

  const dismiss = useCallback(() => {
    markDismissed();
    setDismissedLocally(true);
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (suppressed || hasDismissedBanner() || dismissedLocally) {
      return;
    }

    const SCROLL_RATIO = 0.6;

    function updateScrollGate() {
      const scrolled = window.scrollY;
      const totalRaw = document.documentElement.scrollHeight - window.innerHeight;
      const total = Math.max(totalRaw, 1);
      if (scrolled / total >= SCROLL_RATIO) {
        setIsVisible(true);
      }
    }

    window.addEventListener("scroll", updateScrollGate, { passive: true });
    updateScrollGate();

    return () => {
      window.removeEventListener("scroll", updateScrollGate);
    };
  }, [suppressed, dismissedLocally]);

  if (suppressed || hasDismissedBanner() || dismissedLocally) {
    return null;
  }

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-40 flex min-h-16 translate-y-full flex-col justify-center gap-3 bg-[var(--color-navy)] px-6 py-3 transition-transform duration-300 ease-out sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:min-h-16 ${
        isVisible ? "pointer-events-auto translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scroll-banner-caption"
      aria-live="polite"
    >
      <p
        id="scroll-banner-caption"
        className="min-w-0 flex-1 text-base leading-snug text-[var(--color-paper)] sm:text-lg"
      >
        Still reading? Your free 2026 Medicare report is waiting.
      </p>
      <div className="flex shrink-0 flex-row items-center gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-gold)] px-5 py-2 text-sm font-semibold whitespace-nowrap text-[var(--color-navy)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
          onClick={() => router.push("/medicare")}
        >
          Start My Report →
        </button>
        <button
          type="button"
          aria-label="Dismiss banner"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-[rgba(245,240,232,0.35)] bg-transparent text-[var(--color-paper)] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-paper)]"
          onClick={dismiss}
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
