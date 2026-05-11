"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { thankYouUrl } from "@/lib/thankYouUrl";

interface ExitIntentPopupProps {
  shouldSuppress?: boolean;
}

type SubmitState = "idle" | "loading" | "success" | "error";

const SESSION_KEY = "exit_intent_shown";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasShownThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markShownThisSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Session storage can be blocked; the popup should still remain usable.
  }
}

function ExitIntentPopupInner({ shouldSuppress = false }: ExitIntentPopupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMedicareResults = pathname === "/medicare" && searchParams.get("step") === "5";
  const suppressed = Boolean(shouldSuppress || isMedicareResults);

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const showOnce = useCallback(() => {
    if (suppressed || hasShownThisSession()) return;
    setIsVisible(true);
    markShownThisSession();
  }, [suppressed]);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    markShownThisSession();
  }, []);

  useEffect(() => {
    if (suppressed || hasShownThisSession()) return;

    let mobileTimer: ReturnType<typeof setTimeout> | undefined;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) showOnce();
    }

    function resetMobileTimer() {
      if (!isCoarsePointer) return;
      if (mobileTimer) clearTimeout(mobileTimer);
      mobileTimer = setTimeout(showOnce, 45_000);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchstart", resetMobileTimer, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    resetMobileTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", resetMobileTimer);
      document.removeEventListener("keydown", handleKeyDown);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [dismiss, suppressed, showOnce]);

  useEffect(() => {
    if (!isVisible) return;
    closeButtonRef.current?.focus();
  }, [isVisible]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setEmailError("Double-check that email - we want to make sure it reaches you.");
      return;
    }

    setEmailError(null);
    setSubmitState("loading");

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, source: "exit_intent" }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setEmailError(data.error ?? "Something went wrong on our end. Try again?");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setTimeout(() => {
        router.push(thankYouUrl("exit_intent", cleanEmail));
      }, 600);
    } catch {
      setEmailError("Something went wrong on our end. Try again?");
      setSubmitState("error");
    }
  }

  if (!isVisible) return null;

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
        aria-labelledby="exit-popup-title"
        className="fixed top-1/2 left-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-[var(--color-paper)] p-8 shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={dismiss}
          aria-label="Close this popup"
          className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-navy)] transition-colors duration-150 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          type="button"
        >
          <X className="size-5" aria-hidden />
        </button>

        {submitState === "success" ? (
          <div role="status" aria-live="polite" className="text-center">
            <p className="text-[24px] font-bold text-[var(--color-navy)]">You are in.</p>
            <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-navy)]">
              Watch your inbox for the free 2026 Triad Retirement Brief.
            </p>
            <button
              onClick={dismiss}
              className="mt-6 min-h-14 w-full rounded-lg bg-[var(--color-navy)] px-6 py-4 text-[18px] font-semibold text-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
              type="button"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <p
              id="exit-popup-title"
              className="pr-10 text-[24px] font-bold text-[var(--color-navy)]"
            >
              Before you go
            </p>
            <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-navy)]">
              Want a free plain-English breakdown of how the 2026 Medicare changes affect Greensboro
              retirees? I will send it straight to your inbox.
            </p>

            <div className="mt-5">
              <label htmlFor="exit-email" className="sr-only">
                Your email address
              </label>
              <input
                id="exit-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="christianbrinkley4@gmail.com"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "exit-email-error" : undefined}
                className={`min-h-14 w-full rounded-lg border px-4 py-3 text-[18px] transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
                  emailError ? "border-[var(--color-error)] bg-white" : "border-gray-300 bg-white"
                }`}
                style={{ fontSize: "18px" }}
              />
              {emailError ? (
                <p
                  id="exit-email-error"
                  role="alert"
                  className="mt-2 text-[18px] text-[var(--color-error)]"
                >
                  {emailError}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={submitState === "loading"}
              aria-busy={submitState === "loading"}
              className={`mt-4 min-h-14 w-full rounded-lg px-6 py-4 text-[18px] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
                submitState === "loading"
                  ? "cursor-not-allowed bg-gray-300 text-gray-700"
                  : "bg-[var(--color-navy)] text-[var(--color-paper)] hover:bg-[#1a3460]"
              }`}
            >
              {submitState === "loading" ? "One moment…" : "Send Me the Free Brief →"}
            </button>

            <p className="mt-3 text-center text-[18px] leading-relaxed text-[var(--color-navy)]">
              No spam. One click to unsubscribe.
            </p>
          </form>
        )}
      </div>
    </>
  );
}

export function ExitIntentPopup(props: ExitIntentPopupProps) {
  return (
    <Suspense fallback={null}>
      <ExitIntentPopupInner {...props} />
    </Suspense>
  );
}
