import Link from "next/link";

import { AGENT } from "@/lib/agent";
import type { Finding } from "@/lib/retirementChecker";

/**
 * The checker's results, shared by the typed form and voice mode so both show
 * exactly the same thing. Act-soon findings are listed first.
 */
export function CheckerResults({
  findings,
  id,
  level = 2,
  announce = true,
}: {
  findings: Finding[];
  id: string;
  /** Announce to screen readers. Off in voice mode, which reads results aloud itself. */
  announce?: boolean;
  /** Heading level for the summary; each finding sits one level below. */
  level?: 2 | 3;
}) {
  const Summary = level === 2 ? "h2" : "h3";
  const Item = level === 2 ? "h3" : "h4";
  const sorted = [...findings].sort(
    (x, y) => Number(y.severity === "act_now") - Number(x.severity === "act_now"),
  );
  return (
    <div id={id} tabIndex={-1} aria-live={announce ? "polite" : undefined} className="outline-none">
      <Summary className={`${level === 2 ? "text-28" : "text-24"} font-semibold`}>
        {sorted.length === 0
          ? "Nothing jumped out"
          : `${sorted.length} thing${sorted.length === 1 ? "" : "s"} to look at`}
      </Summary>
      {sorted.length === 0 && (
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          Based on your answers, none of the common traps apply right now. That&apos;s not a full
          review, so it&apos;s still worth checking your plan each fall.
        </p>
      )}
      <div className="mt-4 space-y-4">
        {sorted.map((f) => (
          <div
            key={f.id}
            className={`rounded-xl border-2 p-5 ${f.severity === "act_now" ? "border-[#9a3412] bg-[#fff7ed]" : "border-[var(--color-navy)] bg-white"}`}
          >
            <p className="text-15 font-semibold tracking-wide uppercase">
              {f.severity === "act_now" ? "Act soon" : "Worth checking"}
            </p>
            <Item className="text-19 mt-1 font-semibold">{f.title}</Item>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{f.detail}</p>
            <p className="text-17 mt-2 leading-relaxed">
              <strong>What to do:</strong> {f.action}
            </p>
            <p className="text-16 mt-3">
              <Link href={f.learnMore.href} className="underline underline-offset-2">
                {f.learnMore.label}
              </Link>
              {" · "}
              <a
                href={f.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Source: {f.source.label}
              </a>
            </p>
          </div>
        ))}
      </div>
      <p className="text-17 mt-6 leading-relaxed">
        Want a second set of eyes? I&apos;m a licensed agent in Greensboro and I help North Carolina
        households with exactly these questions. Call or text{" "}
        <a href={AGENT.phoneHref} className="font-semibold underline">
          {AGENT.phone}
        </a>
        .
      </p>
    </div>
  );
}
