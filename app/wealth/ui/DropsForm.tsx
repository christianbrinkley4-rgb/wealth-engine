"use client";
import { useDeferredFormCheck } from "@/hooks/useDeferredFormCheck";
import { trackEvent } from "@/app/components/Analytics";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { loadTurnstile } from "@/lib/loadTurnstile";
import { DROPS_CONSENT_TEXT, DROPS_EMAIL_PATTERN } from "@/lib/wealth/drops";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (container: HTMLElement, options: { sitekey: string; theme: "light" }) => string | undefined;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function turnstileApi(): TurnstileApi | undefined {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

/**
 * One field: an email for new-tool announcements. Posts to /api/wealth-drops,
 * which emails Christian and stores nothing.
 *
 * The spam check follows the same rules as the site's other forms: the script
 * is appended by loadTurnstile(), never rendered by React, and the widget is
 * rendered directly without turnstile.ready().
 */
export function DropsForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const { formRef, active, activate } = useDeferredFormCheck();
  const [turnstileReady, setTurnstileReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !active || turnstileReady) return;
    loadTurnstile();
    const poll = setInterval(() => {
      if (turnstileApi()) {
        setTurnstileReady(true);
        clearInterval(poll);
      }
    }, 100);
    const giveUp = setTimeout(() => clearInterval(poll), 20000);
    return () => {
      clearInterval(poll);
      clearTimeout(giveUp);
    };
  }, [turnstileReady, active]);

  useEffect(() => {
    const api = turnstileApi();
    const target = container.current;
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !target || !api) return;
    let widgetId: string | undefined;
    try {
      widgetId = api.render(target, { sitekey: TURNSTILE_SITE_KEY, theme: "light" });
      widget.current = widgetId ?? null;
    } catch {
      widget.current = null;
    }
    return () => {
      widget.current = null;
      if (widgetId) {
        try {
          api.remove(widgetId);
        } catch {
          // Already gone.
        }
      }
    };
  }, [turnstileReady, active]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    if (!DROPS_EMAIL_PATTERN.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }
    let turnstileToken: string | undefined;
    if (TURNSTILE_SITE_KEY) {
      turnstileToken = widget.current ? turnstileApi()?.getResponse(widget.current) : undefined;
      if (!turnstileToken) {
        setError("The spam check is still loading. Give it a second and tap again.");
        return;
      }
    }
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/wealth-drops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, turnstileToken }),
      });
      if (response.ok) {
        trackEvent("guide_signup", { list_id: "drops" });
        setStatus("done");
        return;
      }
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "That didn't send. Try again.");
    } catch {
      setError("That didn't send. Check your connection and try again.");
    }
    setStatus("idle");
    try {
      if (widget.current) turnstileApi()?.reset(widget.current);
    } catch {
      // The next tap asks for a fresh check.
    }
  }

  if (status === "done") {
    return (
      <div className="w-card" role="status">
        <h3 className="w-h3">
          <Check size={22} aria-hidden style={{ display: "inline", marginRight: 8 }} />
          You&apos;re on the list.
        </h3>
        <p style={{ margin: "10px 0 0", color: "var(--w-muted)" }}>
          I&apos;ll email you when the next tool is out. Until then, go break a calculator.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onFocusCapture={activate} className="w-card" onSubmit={submit} noValidate>
      <div className="w-field">
        <label htmlFor={id}>Your email</label>
        <div className="w-field-box" style={{ fontFamily: "inherit", fontSize: "1.05rem", fontWeight: 600 }}>
          <input
            id={id}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@email.com"
            value={email}
            maxLength={254}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-note`}
            onChange={(event) => setEmail(event.target.value)}
            style={{ fontSize: "1.05rem" }}
          />
        </div>
      </div>
      {/* Honeypot. Hidden from people and from screen readers. */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
      </div>
      {TURNSTILE_SITE_KEY ? <div ref={container} style={{ marginTop: 14 }} /> : null}
      {error ? (
        <p role="alert" style={{ margin: "12px 0 0", fontWeight: 700, color: "#b3261e" }}>
          {error}
        </p>
      ) : null}
      <div className="w-btn-row" style={{ marginTop: 16 }}>
        <button type="submit" className="w-btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send me the drops"} <ArrowRight size={18} aria-hidden />
        </button>
      </div>
      <p id={`${id}-note`} style={{ margin: "14px 0 0", fontSize: "0.86rem", lineHeight: 1.5, color: "var(--w-muted)" }}>
        {DROPS_CONSENT_TEXT}
      </p>
    </form>
  );
}
