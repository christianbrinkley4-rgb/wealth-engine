"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { ENGINE_CONSENT, ENGINE_CONSENT_VERSION } from "@/lib/leadEnginePublic";

type Turnstile = {
  render: (node: HTMLElement, options: object) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
const api = () => (window as Window & { turnstile?: Turnstile }).turnstile;

export function EngineContact({ answers, onSaved }: { answers?: string[]; onSaved?: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const node = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const requestId = useRef<string | null>(null);
  const previous = useRef("");
  const source = answers ? "medicare-fit" : "medicare-review";
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!ready || !sitekey || !node.current || !api()) return;
    const id = api()!.render(node.current, {
      sitekey,
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    widget.current = id;
    return () => {
      api()?.remove(id);
      widget.current = null;
    };
  }, [ready, sitekey]);

  if (saved)
    return (
      <div role="status" className="engine-card">
        <h2>Your callback request is saved.</h2>
        <p>
          This doesn&apos;t book an appointment or enroll you in a plan. You can also choose a time
          below.
        </p>
        <p>(919) 408-6671</p>
      </div>
    );

  return (
    <form
      className="engine-card engine-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (busy) return;
        setBusy(true);
        setError("");
        const form = new FormData(event.currentTarget);
        const contact = {
          name: String(form.get("name") ?? ""),
          phone: String(form.get("phone") ?? ""),
          zip: String(form.get("zip") ?? ""),
          source,
          answers,
          consent: form.get("consent") === "on",
          consent_version: ENGINE_CONSENT_VERSION,
          consent_text: ENGINE_CONSENT,
          website: String(form.get("website") ?? ""),
        };
        const identity = JSON.stringify(contact);
        if (previous.current && previous.current !== identity) {
          requestId.current = null;
          try {
            sessionStorage.removeItem(`engine-id:${source}`);
          } catch {
            /* Optional storage. */
          }
        }
        previous.current = identity;
        if (!requestId.current) {
          try {
            requestId.current = sessionStorage.getItem(`engine-id:${source}`);
          } catch {
            /* In-memory retry still works. */
          }
          requestId.current ||= crypto.randomUUID();
          try {
            sessionStorage.setItem(`engine-id:${source}`, requestId.current);
          } catch {
            /* No contact data is stored in the browser. */
          }
        }
        try {
          const query = new URLSearchParams(window.location.search);
          const attribution = Object.fromEntries(
            ["utm_source", "utm_medium", "utm_campaign", "utm_content"].map((key) => [
              key,
              query.get(key) ?? "",
            ]),
          );
          const response = await fetch("/api/quiz-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...contact,
              id: requestId.current,
              attribution,
              turnstile_token: token,
            }),
            signal: AbortSignal.timeout(20000),
          });
          const result = await response.json();
          if (!response.ok || result.stored !== true || result.id !== requestId.current) {
            if (response.status === 409) {
              requestId.current = null;
              try {
                sessionStorage.removeItem(`engine-id:${source}`);
              } catch {
                /* Optional storage. */
              }
            }
            throw new Error(
              typeof result.error === "string"
                ? result.error
                : "Your request hasn't been confirmed. Please try again.",
            );
          }
          try {
            sessionStorage.removeItem(`engine-id:${source}`);
          } catch {
            /* Optional storage. */
          }
          setSaved(true);
          onSaved?.();
        } catch (problem) {
          setError(
            (problem as Error).name === "TimeoutError" || (problem as Error).name === "TypeError"
              ? "I couldn't confirm your request was saved. Keep this page open and try again, or call (919) 408-6671."
              : (problem as Error).message,
          );
        } finally {
          setBusy(false);
          setToken("");
          if (widget.current) api()?.reset(widget.current);
        }
      }}
    >
      <h2>{answers ? "Your next steps are ready" : "Ask me to call you"}</h2>
      <p>
        {answers
          ? "Enter your name, phone, and ZIP to request a call and see your educational checklist."
          : "Tell me where to reach you about your Medicare questions."}
      </p>
      <label htmlFor="engine-name">Name</label>
      <input id="engine-name" name="name" autoComplete="name" maxLength={120} required />
      <label htmlFor="engine-phone">Phone number</label>
      <input
        id="engine-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        required
      />
      <label htmlFor="engine-zip">ZIP code</label>
      <input
        id="engine-zip"
        name="zip"
        autoComplete="postal-code"
        inputMode="numeric"
        pattern="[0-9]{5}"
        maxLength={5}
        required
      />
      <div hidden aria-hidden="true">
        <label>
          Leave blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="engine-consent">
        <input type="checkbox" name="consent" required />
        <span>{ENGINE_CONSENT}</span>
      </label>
      <p className="engine-small">
        This requests a call. It doesn&apos;t sign you up for text messages or a plan.{" "}
        <a href="/privacy">Privacy policy</a>. You can read Medicare information without requesting
        contact at <a href="https://www.medicare.gov/health-drug-plans">Medicare.gov</a>.
      </p>
      {sitekey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setReady(true)}
        />
      )}
      <div ref={node} />
      {error && (
        <p role="alert" className="engine-error">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy || Boolean(sitekey && !token)} className="engine-button">
        {busy
          ? "Saving your request..."
          : answers
            ? "Request a call and see my checklist"
            : "Request a Medicare call"}
      </button>
      <p className="engine-small">
        Prefer to call? <a href="tel:+19194086671">(919) 408-6671</a>
      </p>
    </form>
  );
}
