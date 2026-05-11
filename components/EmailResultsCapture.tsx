"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { thankYouUrl } from "@/lib/thankYouUrl";

interface EmailResultsCaptureProps {
  initialEmail?: string;
  /** Capture source; thank-you redirect uses source ?? "pdf_request". */
  source?: string;
  variant?: "medicare" | "tax";
  wizardData: {
    zip_code: string;
    filing_status: "individual" | "married_jointly";
    age: number;
    annual_income: number;
    calculated_premium: number;
    irmaa_bracket: string;
  };
}

type SubmitState = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailResultsCapture({
  initialEmail = "",
  source = "pdf_request",
  variant = "medicare",
  wizardData,
}: EmailResultsCaptureProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const isTax = variant === "tax";

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
        body: JSON.stringify({
          email: cleanEmail,
          source,
          ...wizardData,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setEmailError(data.error ?? "Something went wrong on our end. Try again?");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setTimeout(() => {
        router.push(thankYouUrl(source ?? "pdf_request", cleanEmail));
      }, 600);
    } catch {
      setEmailError("Something went wrong on our end. Try again?");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-[12px] border-2 border-[var(--color-success)] bg-white p-6 text-center"
      >
        <p className="text-[20px] font-semibold text-[var(--color-success)]">
          On its way to your inbox.
        </p>
        <p className="mt-2 text-[18px] leading-relaxed text-[var(--color-navy)]">
          {isTax ? (
            <>
              Check your email for your personalized 2026 tax-impact notes. If it does not show up
              in a few minutes, check your spam folder.
            </>
          ) : (
            <>
              Check your email for your personalized 2026 Medicare summary. If it does not show up
              in a few minutes, check your spam folder.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface mt-4 rounded-[12px] border-gray-300 bg-white p-6"
      noValidate
    >
      <p className="text-[20px] font-semibold text-[var(--color-navy)]">
        {isTax ? "Want a copy of your tax analysis?" : "Want a copy of these results?"}
      </p>
      <p className="mt-2 text-[18px] leading-relaxed text-[var(--color-muted)]">
        {isTax ? (
          <>
            I can email you a plain-English summary of how 2026 rules may affect your situation. No
            spam - just your numbers.
          </>
        ) : (
          <>
            I can email you a plain-English summary you can save, print, or bring to your next
            doctor visit. No spam - just your numbers.
          </>
        )}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="results-email" className="sr-only">
            Your email address
          </label>
          <input
            id="results-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(null);
            }}
            placeholder="christianbrinkley4@gmail.com"
            aria-describedby={emailError ? "results-email-error" : undefined}
            aria-invalid={!!emailError}
            className={`min-h-14 w-full rounded-lg border px-4 py-3 text-[18px] transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
              emailError ? "border-[var(--color-error)] bg-white" : "border-gray-300 bg-white"
            }`}
            style={{ fontSize: "18px" }}
          />
          {emailError ? (
            <p
              id="results-email-error"
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
          className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-6 text-[18px] font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] ${
            submitState === "loading"
              ? "cursor-not-allowed bg-gray-300 text-gray-700"
              : "bg-[var(--color-navy)] text-[var(--color-paper)] hover:bg-[#1a3460]"
          }`}
          aria-busy={submitState === "loading"}
        >
          <Mail className="size-5" aria-hidden />
          {submitState === "loading" ? "One moment…" : "Send My Results →"}
        </button>
      </div>

      <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-muted)]">
        No account needed. Unsubscribe from any email with one click.
      </p>
    </form>
  );
}
