"use client";

import { useState } from "react";

type State = "idle" | "working" | "done" | "error";

export function UnsubscribeForm({ token }: { token: string }) {
  // The token arrives from the email link; an empty token means the visitor
  // landed here some other way, and there's nothing to unsubscribe.
  const [state, setState] = useState<State>(token ? "idle" : "error");

  async function confirm() {
    setState("working");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { ok?: boolean };
      setState(data.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card-surface">
        <h2>You&apos;re unsubscribed.</h2>
        <p className="personal-body">
          You won&apos;t get follow-up emails from me anymore. If you ever want to talk Medicare or
          insurance, just reach out — I&apos;m still here in Greensboro.
        </p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="card-surface">
        <h2>That link didn&apos;t work.</h2>
        <p className="personal-body">
          The unsubscribe link may be old or incomplete. Just reply to any of my emails with
          &ldquo;unsubscribe&rdquo; and I&apos;ll take care of it personally.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface">
      <h2>Stop the follow-up emails?</h2>
      <p className="personal-body">
        I&apos;ll stop emailing you right away. This won&apos;t affect anything else — if we&apos;ve
        talked or have a consultation scheduled, that&apos;s all still on.
      </p>
      <button
        type="button"
        className="personal-button"
        onClick={confirm}
        disabled={state === "working"}
      >
        {state === "working" ? "Working…" : "Yes, unsubscribe me"}
      </button>
    </div>
  );
}
