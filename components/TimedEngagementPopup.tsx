"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_SHOWN = "timed_popup_shown";
const STORAGE_SKIP = "timed_engagement_primary_clicked";
const TIMER_MS = 90_000;

const DEFAULT_SUPPRESS_PATHS = ["/medicare", "/taxes", "/thank-you"];

export interface TimedEngagementPopupProps {
  suppressOnPaths?: string[];
  primaryCtaPath?: string;
}

function readStorage(key: string) {
  try {
    return sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeStorage(key: string) {
  try {
    sessionStorage.setItem(key, "true");
  } catch {
    //
  }
}

function clickWasPrimaryCta(target: EventTarget | null, primaryPath: string): boolean {
  if (!(target instanceof Element)) return false;
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  const href = anchor.getAttribute("href") ?? "";
  return (
    href === primaryPath ||
    href.startsWith(`${primaryPath}?`) ||
    href.startsWith(`${primaryPath}#`) ||
    href.startsWith(`${primaryPath}/`)
  );
}

export function TimedEngagementPopup({
  suppressOnPaths = DEFAULT_SUPPRESS_PATHS,
  primaryCtaPath = "/medicare",
}: TimedEngagementPopupProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const popupVisibleRef = useRef(false);

  const suppressed = suppressOnPaths.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  const dismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    popupVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      writeStorage(STORAGE_SHOWN);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    closeButtonRef.current?.focus();
  }, [isVisible]);

  useEffect(() => {
    if (suppressed || readStorage(STORAGE_SKIP) || readStorage(STORAGE_SHOWN)) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, TIMER_MS);

    return () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [suppressed]);

  useEffect(() => {
    if (suppressed || readStorage(STORAGE_SKIP) || readStorage(STORAGE_SHOWN)) {
      return;
    }

    function handleCaptureClick(event: MouseEvent) {
      if (popupVisibleRef.current) return;
      if (!clickWasPrimaryCta(event.target, primaryCtaPath)) return;
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
      writeStorage(STORAGE_SKIP);
    }

    document.addEventListener("click", handleCaptureClick, true);
    return () => document.removeEventListener("click", handleCaptureClick, true);
  }, [suppressed, primaryCtaPath]);

  useEffect(() => {
    if (!isVisible) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, dismiss]);

  function handlePrimaryCta() {
    writeStorage(STORAGE_SKIP);
    router.push(primaryCtaPath);
    dismiss();
  }

  if (suppressed || readStorage(STORAGE_SKIP)) {
    return null;
  }

  if (readStorage(STORAGE_SHOWN) && !isVisible) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="timed-engagement-title"
        className="fixed top-1/2 left-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-8 text-[var(--color-navy)] shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          type="button"
        >
          <X className="size-5" aria-hidden />
        </button>

        <p id="timed-engagement-title" className="pr-10 text-[24px] font-bold leading-snug">
          Have questions before you start?
        </p>
        <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-muted)]">
          I&apos;m a real person — not a chatbot. If you&apos;re not sure whether this tool is right
          for your situation, just send me a quick email. I reply personally.
        </p>

        <button
          type="button"
          onClick={handlePrimaryCta}
          className="mt-6 min-h-14 w-full rounded-lg bg-[var(--color-navy)] px-6 py-4 text-[18px] font-semibold text-[var(--color-paper)] transition-colors hover:bg-[#1a3460] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
        >
          Start My Free Report →
        </button>

        <p className="mt-4 text-center text-[16px] text-[var(--color-muted)]">
          Or email me first:{" "}
          <a
            href="mailto:christianbrinkley4@gmail.com"
            className="font-medium text-[var(--color-navy)] underline underline-offset-2"
          >
            christianbrinkley4@gmail.com
          </a>
        </p>
      </div>
    </>
  );
}
