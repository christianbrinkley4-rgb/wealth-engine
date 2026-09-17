"use client";

import { Mail } from "lucide-react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AGENT, CONSENT_TEXT, CONSENT_VERSION } from "@/lib/agent";
import { newEventId, readAttribution } from "@/lib/attribution";
import { thankYouUrl } from "@/lib/thankYouUrl";

interface EmailResultsCaptureProps {
  initialEmail?: string;
  /** Capture source. Must be one the API accepts. */
  source?: "wizard_completion" | "roth_calculator";
  variant?: "medicare" | "roth";
  wizardData: {
    zip_code: string;
    filing_status: "individual" | "married_jointly";
    age: number;
    annual_income: number;
    calculated_premium: number;
    irmaa_bracket: string;
  };
}

type SubmitState = "idle" | "loading" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TurnstileApi = {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme: "light"; "error-callback": () => void },
  ) => string | undefined;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function turnstileApi(): TurnstileApi | undefined {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

export function EmailResultsCapture({
  initialEmail = "",
  source = "wizard_completion",
  variant = "medicare",
  wizardData,
}: EmailResultsCaptureProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileRender, setTurnstileRender] = useState(0);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | null>(null);
  const isRoth = variant === "roth";

  useEffect(() => {
    const container = turnstileContainer.current;
    const api = turnstileApi();
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !container || !api) return;
    let disposed = false;
    let widgetId: string | undefined;
    api.ready(() => {
      if (disposed) return;
      try {
        widgetId = api.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          "error-callback": () => {
            if (!disposed)
              setError("The form check couldn’t finish. Please try again, or call me.");
          },
        });
        turnstileWidget.current = widgetId ?? null;
      } catch {
        setError("The form check couldn’t load. Please try again, or call me.");
      }
    });
    return () => {
      disposed = true;
      turnstileWidget.current = null;
      if (widgetId) {
        try {
          api.remove(widgetId);
        } catch {
          // Already removed by a navigation or a blocked script.
        }
      }
    };
  }, [turnstileReady, turnstileRender]);

  function resetFormCheck() {
    if (!TURNSTILE_SITE_KEY) return;
    try {
      const widgetId = turnstileWidget.current;
      const api = turnstileApi();
      if (!widgetId || !api) throw new Error("Form check unavailable");
      api.reset(widgetId);
    } catch {
      turnstileWidget.current = null;
      setTurnstileRender((value) => value + 1);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("That email doesn’t look right — check it so my reply reaches you.");
      return;
    }
    if (!consent) {
      setError("Check the box so I know it’s alright to contact you.");
      return;
    }

    const turnstileToken = turnstileWidget.current
      ? (turnstileApi()?.getResponse(turnstileWidget.current) ?? "")
      : "";
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please finish the quick form check, then send again.");
      resetFormCheck();
      return;
    }

    setError(null);
    setSubmitState("loading");
    const eventId = newEventId();

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          email: cleanEmail,
          full_name: fullName.trim() || null,
          source,
          event_id: eventId,
          attribution: readAttribution(),
          consent_given: true,
          consent_text: CONSENT_TEXT,
          consent_version: CONSENT_VERSION,
          ...wizardData,
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        emailConfigured?: boolean;
      };

      if (!res.ok) {
        resetFormCheck();
        const configFail = data.code === "storage_unavailable" || res.status === 503;
        setError(
          data.error ??
            (configFail
              ? `I can’t save that right now — please call me at ${AGENT.phone} or email ${AGENT.email}.`
              : "Something went wrong on my end. Try again?"),
        );
        setSubmitState("error");
        return;
      }

      router.push(
        thankYouUrl({
          source,
          topic: isRoth ? "financial_planning" : "medicare",
          eventId,
          emailConfigured: data.emailConfigured,
        }),
      );
    } catch {
      resetFormCheck();
      setError(`Something went wrong on my end. Try again, or call me at ${AGENT.phone}.`);
      setSubmitState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card-surface mt-8 p-6 md:p-7"
      aria-labelledby="results-capture-heading"
    >
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
          onReady={() => setTurnstileReady(true)}
        />
      ) : null}
      <h2
        id="results-capture-heading"
        className="text-22 flex items-center gap-3 font-semibold text-[var(--color-navy)]"
      >
        <Mail className="size-6 shrink-0 text-[var(--color-gold-ink)]" aria-hidden />
        {isRoth ? "Send me this conversion estimate" : "Send me these numbers"}
      </h2>
      <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        Request a copy and a personal review of what these numbers could mean for your situation.
        Your request goes directly to Christian.
      </p>

      <div className="tl-honeypot" aria-hidden>
        <label htmlFor="results-website">Website</label>
        <input
          id="results-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="results-name"
            className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
          >
            Your name <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
          </label>
          <input
            id="results-name"
            name="full_name"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="text-18 min-h-14 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          />
        </div>

        <div>
          <label
            htmlFor="results-email"
            className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
          >
            Email
          </label>
          <input
            id="results-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "results-capture-error" : undefined}
            className="text-18 min-h-14 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
          />
        </div>

        <label className="text-16 flex cursor-pointer gap-3 rounded-lg bg-[rgba(21,46,52,0.04)] px-4 py-4 leading-relaxed text-[var(--color-navy)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 size-5 shrink-0 rounded border-gray-400"
          />
          <span>{CONSENT_TEXT}</span>
        </label>

        {TURNSTILE_SITE_KEY ? <div ref={turnstileContainer} /> : null}

        {error ? (
          <div
            id="results-capture-error"
            role="alert"
            className="rounded-xl border border-[rgba(185,79,92,0.35)] bg-[rgba(185,79,92,0.06)] px-4 py-3"
          >
            <p className="text-17 text-[var(--color-error)]">{error}</p>
            <a
              href={AGENT.phoneHref}
              className="text-17 mt-2 inline-flex font-semibold text-[var(--color-navy)] underline underline-offset-2"
            >
              Or call {AGENT.phone}
            </a>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitState === "loading"}
          className="text-18 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "loading" ? "Sending…" : "Email it to me →"}
        </button>
      </div>
    </form>
  );
}
