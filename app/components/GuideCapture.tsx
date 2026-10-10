"use client";
import { useDeferredFormCheck } from "@/hooks/useDeferredFormCheck";
import { trackEvent } from "@/app/components/Analytics";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { loadTurnstile } from "@/lib/loadTurnstile";
import { DROPS_EMAIL_PATTERN, GUIDE_DROPS_CONSENT_TEXT } from "@/lib/wealth/drops";

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
 * Email capture for the Medicare side: "Get the next guide by email".
 * Posts to /api/wealth-drops with list=guides, which emails Christian and
 * stores nothing. Same spam rules as the /wealth drops form.
 */
export function GuideCapture({
  heading = "Get the next guide by email",
  body = "New guides go out when they are published. No spam, no selling your address, unsubscribe any time.",
}: {
  heading?: string;
  body?: string;
}) {
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
        body: JSON.stringify({ email, company, turnstileToken, list: "guides" }),
      });
      if (response.ok) {
        trackEvent("guide_signup", { list_id: "guides" });
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
      <div className="card-surface p-6 md:p-8" role="status">
        <CheckCircle2 className="size-10 text-[var(--color-success)]" aria-hidden />
        <h2 className="text-24 mt-4 font-bold text-[var(--color-navy)]">You&apos;re on the list.</h2>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          I&apos;ll email you when the next guide is out. Until then, the guides above are all
          yours.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface p-6 md:p-8">
      <h2 className="text-24 font-bold text-[var(--color-navy)]">{heading}</h2>
      <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">{body}</p>
      <form ref={formRef} onFocusCapture={activate} onSubmit={submit} noValidate className="mt-6">
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
          </label>
        </div>
        <label htmlFor={id} className="text-17 font-semibold text-[var(--color-navy)]">
          Your email
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
            className="text-17 min-h-14 flex-1 rounded-xl border-2 border-[var(--color-navy)] bg-white px-4 text-[var(--color-navy)]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)]"
          >
            {status === "sending" ? "Sending..." : "Notify me"} <ArrowRight size={18} aria-hidden />
          </button>
        </div>
        {TURNSTILE_SITE_KEY ? <div ref={container} className="mt-4" /> : null}
        {error ? (
          <p role="alert" className="text-16 mt-3 font-semibold text-red-700">
            {error}
          </p>
        ) : null}
        <p id={`${id}-note`} className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          {GUIDE_DROPS_CONSENT_TEXT}
        </p>
      </form>
    </div>
  );
}
