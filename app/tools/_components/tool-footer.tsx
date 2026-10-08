/**
 * Server-rendered blocks shared by every /tools page: the education
 * disclaimer, the math explainer shell, the wealth article link card, and
 * the page close (soft CTA, contact line, compliance disclosure).
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { AGENT } from "@/lib/agent";

/** The exact education disclaimer every tool page must show. */
export function ToolsDisclaimer() {
  return (
    <div className="t-disclaimer" role="note">
      <strong>Results are estimates for education, not financial advice.</strong>{" "}Christian is a licensed insurance agent (NC Life &amp; Health), not a registered investment adviser.
    </div>
  );
}

/** Plain-English explanation of the math a tool uses. */
export function MathSection({
  title,
  children,
  howTo,
  formula,
}: {
  title: string;
  children: ReactNode;
  /** Numbered "how to use this calculator" walkthrough, shown before the formula. */
  howTo?: readonly string[];
  /** The literal formula the tool computes, for readers (and AI citations) that want it. */
  formula?: { label: string; expression: string; note?: string };
}) {
  return (
    <section className="bg-[var(--color-paper)] py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">{title}</h2>
        <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
          {children}
        </div>
        {howTo && howTo.length > 0 ? (
          <>
            <h3 className="text-19 mt-8 font-semibold">How to use this calculator</h3>
            <ol className="text-17 mt-3 space-y-2 leading-relaxed text-[var(--color-ink-muted)]">
              {howTo.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-13 font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </>
        ) : null}
        {formula ? (
          <div className="t-formula mt-8">
            <h3 className="text-19 font-semibold">{formula.label}</h3>
            <p className="t-formula-expr" aria-label={`Formula: ${formula.expression}`}>
              {formula.expression}
            </p>
            {formula.note ? (
              <p className="text-15 mt-3 leading-relaxed text-[var(--color-ink-muted)]">{formula.note}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Card linking a tool to its related wealth article. */
export function WealthLinkCard({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="bg-white py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <Link href={href} className="t-hub-card card-surface card-interactive block">
          <p className="text-15 font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
            {eyebrow}
          </p>
          <h2 className="mt-2">{title}</h2>
          <p className="mt-2">{body}</p>
          <span className="t-go">Read the guide →</span>
        </Link>
      </div>
    </section>
  );
}

/**
 * Page close: wealth link, soft CTA, contact line, disclosures. The
 * KitchenTableClose ends at /start, which is the standing soft CTA for
 * the hub.
 */
export function ToolClose({
  wealthHref,
  wealthEyebrow,
  wealthTitle,
  wealthBody,
  ctaHeading,
  ctaBody,
}: {
  wealthHref: string;
  wealthEyebrow: string;
  wealthTitle: string;
  wealthBody: string;
  ctaHeading: string;
  ctaBody: string;
}) {
  return (
    <>
      <WealthLinkCard
        href={wealthHref}
        eyebrow={wealthEyebrow}
        title={wealthTitle}
        body={wealthBody}
      />
      <KitchenTableClose heading={ctaHeading} body={ctaBody} href="/start" label="Start a free review →" />
      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ToolsDisclaimer />
        <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Questions go directly to {AGENT.name} in {AGENT.city}, {AGENT.state} at{" "}
          <a href={AGENT.phoneHref} className="underline underline-offset-2">
            {AGENT.phone}
          </a>
          . They are not sold to other agents.
        </p>
        <ComplianceDisclosure />
      </div>
    </>
  );
}
