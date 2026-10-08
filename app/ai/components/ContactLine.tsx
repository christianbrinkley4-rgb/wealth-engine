import { AGENT } from "@/lib/agent";

/** The contact line carried on every /ai page. */
export function ContactLine() {
  return (
    <p className="text-16 leading-relaxed text-[var(--color-ink-muted)]">
      {AGENT.name}, {AGENT.city}, {AGENT.state} ·{" "}
      <a href={AGENT.phoneHref} className="underline underline-offset-2">
        {AGENT.phone}
      </a>
    </p>
  );
}
