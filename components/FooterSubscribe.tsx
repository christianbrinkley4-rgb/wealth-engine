"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { thankYouUrl } from "@/lib/thankYouUrl";

type SubmitState = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FooterSubscribe() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setEmailError("Just need a real email address to send this to.");
      return;
    }

    setEmailError(null);
    setSubmitState("loading");

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, source: "footer_subscribe" }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setEmailError(data.error ?? "Something went wrong on our end. Try again?");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setTimeout(() => {
        router.push(thankYouUrl("footer_subscribe", cleanEmail));
      }, 600);
    } catch {
      setEmailError("Something went wrong on our end. Try again?");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="border-t border-gray-300 bg-white py-8 text-center">
        <p
          role="status"
          aria-live="polite"
          className="text-[18px] font-semibold text-[var(--color-success)]"
        >
          You are on the list. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-300 bg-white py-10">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl px-4 text-center" noValidate>
        <p className="text-[20px] font-semibold text-[var(--color-navy)]">
          Get the 2026 Triad Retirement Brief
        </p>
        <p className="mt-2 text-[18px] leading-relaxed text-[var(--color-muted)]">
          Free. Plain English. No sales calls.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <input
              id="footer-email"
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
              aria-describedby={emailError ? "footer-email-error" : undefined}
              className={`min-h-14 w-full rounded-lg border px-4 py-3 text-[18px] transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
                emailError ? "border-[var(--color-error)] bg-white" : "border-gray-300 bg-white"
              }`}
              style={{ fontSize: "18px" }}
            />
            {emailError ? (
              <p
                id="footer-email-error"
                role="alert"
                className="mt-2 text-left text-[18px] text-[var(--color-error)]"
              >
                {emailError}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={submitState === "loading"}
            aria-busy={submitState === "loading"}
            className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-6 text-[18px] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
              submitState === "loading"
                ? "cursor-not-allowed bg-gray-300 text-gray-700"
                : "bg-[var(--color-navy)] text-[var(--color-paper)] hover:bg-[#1a3460]"
            }`}
          >
            <Mail className="size-5" aria-hidden />
            {submitState === "loading" ? "One moment…" : "Get Free Updates →"}
          </button>
        </div>

        <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-muted)]">
          Unsubscribe anytime. No spam, ever.
        </p>
      </form>
    </div>
  );
}
