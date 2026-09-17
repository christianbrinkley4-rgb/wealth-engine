"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { AGENT, CONSENT_TEXT, CONSENT_VERSION } from "@/lib/agent";
import { newEventId, readAttribution } from "@/lib/attribution";
import { timelineAnswers, type TimelineInput } from "@/lib/enrollmentTimeline";
import { thankYouUrl } from "@/lib/thankYouUrl";
import { trackEvent } from "@/app/components/Analytics";

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

type Field = "name" | "email" | "zip" | "consent";

/**
 * "Email me these dates." Sends a normal Medicare inquiry with the month and
 * year someone turns 65, so it lands in the command center like any other
 * request and the reply email carries their dates.
 */
export function TimelineEmailCapture({
  input,
  windowClosed,
}: {
  input: TimelineInput;
  windowClosed: boolean;
}) {
  const router = useRouter();
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Field | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileRender, setTurnstileRender] = useState(0);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

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

  function reject(field: Field, message: string) {
    setInvalid(field);
    setError(message);
    const target = { name: nameRef, email: emailRef, zip: zipRef, consent: consentRef }[field];
    target.current?.focus();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const zipDigits = zip.trim();

    if (!cleanName) return reject("name", "Enter your name so I know who I’m writing to.");
    if (!EMAIL_REGEX.test(cleanEmail)) return reject("email", "Check your email address.");
    if (!/^\d{5}$/.test(zipDigits)) {
      return reject("zip", "Enter your 5-digit ZIP code. Medicare plans depend on where you live.");
    }
    if (!consent) return reject("consent", "Check the box so I know it’s alright to email you.");
    setInvalid(null);

    if (TURNSTILE_SITE_KEY && !turnstileReady) {
      setError(
        `The form check couldn’t load. Please refresh the page, or call me at ${AGENT.phone}.`,
      );
      return;
    }
    let turnstileToken = "";
    try {
      if (turnstileWidget.current) {
        turnstileToken = turnstileApi()?.getResponse(turnstileWidget.current) ?? "";
      }
    } catch {
      resetFormCheck();
      setError(`The form check couldn’t finish. Please try again, or call me at ${AGENT.phone}.`);
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please finish the quick form check, then send again.");
      resetFormCheck();
      return;
    }

    setSubmitting(true);
    setError(null);
    setInvalid(null);
    const eventId = newEventId();

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          source: "help_quiz",
          email: cleanEmail,
          full_name: cleanName,
          phone_number: null,
          zip_code: zipDigits,
          interest_topic: "medicare",
          quiz_answers: {
            ...timelineAnswers(input),
            ...(windowClosed ? {} : { medicare_stage: "turning_65_soon" }),
          },
          attribution: readAttribution(),
          event_id: eventId,
          consent_given: true,
          consent_text: CONSENT_TEXT,
          consent_version: CONSENT_VERSION,
          sms_consent: false,
          sms_consent_text: null,
          website: honeypot,
          turnstile_token: turnstileToken,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        emailConfigured?: boolean;
      } | null;

      if (!res.ok) {
        resetFormCheck();
        setError(
          data?.error ?? `Something went wrong on my end. Please call me at ${AGENT.phone}.`,
        );
        setSubmitting(false);
        return;
      }

      trackEvent("timeline_email_request");
      router.push(
        thankYouUrl({
          source: "help_quiz",
          topic: "medicare",
          eventId,
          emailConfigured: data?.emailConfigured,
        }),
      );
    } catch {
      resetFormCheck();
      setError(`Something went wrong on my end. Please try again, or call me at ${AGENT.phone}.`);
      setSubmitting(false);
    }
  }

  const errorId = `${id}-error`;
  const describe = (field: Field) => (invalid === field ? errorId : undefined);

  return (
    <form className="tl-capture" onSubmit={submit} noValidate aria-labelledby={`${id}-heading`}>
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
          onReady={() => setTurnstileReady(true)}
          onError={() =>
            setError(
              `The form check couldn’t load. Please refresh the page, or call me at ${AGENT.phone}.`,
            )
          }
        />
      ) : null}
      <div className="tl-capture-intro">
        <h3 id={`${id}-heading`}>Want these dates in your inbox?</h3>
        <p>
          I’ll email them to you so they’re easy to find later. Your request comes straight to me.
        </p>
      </div>

      <div className="tl-honeypot" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="tl-capture-fields">
        <div className="tl-field">
          <label htmlFor={`${id}-name`}>Your name</label>
          <input
            ref={nameRef}
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={invalid === "name"}
            aria-describedby={describe("name")}
          />
        </div>
        <div className="tl-field">
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            ref={emailRef}
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={invalid === "email"}
            aria-describedby={describe("email")}
          />
        </div>
        <div className="tl-field tl-field-zip">
          <label htmlFor={`${id}-zip`}>ZIP code</label>
          <input
            ref={zipRef}
            id={`${id}-zip`}
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
            aria-invalid={invalid === "zip"}
            aria-describedby={describe("zip")}
          />
        </div>
      </div>

      <label className="tl-consent">
        <input
          ref={consentRef}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          aria-invalid={invalid === "consent"}
          aria-describedby={describe("consent")}
        />
        <span>{CONSENT_TEXT}</span>
      </label>

      {TURNSTILE_SITE_KEY ? <div ref={turnstileContainer} className="tl-turnstile" /> : null}

      {error ? (
        <p id={errorId} className="tl-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="home-button home-button-ink" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Email my dates"}
      </button>
    </form>
  );
}
