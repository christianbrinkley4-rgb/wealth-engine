/**
 * Text-only page parts for the lead-to-appointment pages (November 2026).
 *
 * These pages carry no photo of Christian, so they cannot use MedicareByline
 * or KitchenTableClose, which both render his headshot. These parts give the
 * same information in text: who wrote the page, when it was checked, where
 * the figures come from, and how to reach him.
 */

import { formatArticleDate } from "@/app/components/ArticleBody";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT, hasPublishableNpn } from "@/lib/agent";

export function TextByline({ reviewed }: { reviewed: string }) {
  return (
    <aside className="app-shell max-w-3xl py-6" aria-label="About the author">
      <p className="text-16 leading-relaxed text-[var(--color-ink-muted)]">
        By{" "}
        <TrackedLink href="/about" className="underline underline-offset-2">
          {AGENT.name}
        </TrackedLink>
        , licensed North Carolina insurance agent
        {hasPublishableNpn() ? ` (NPN ${AGENT.npn})` : ""}, {AGENT.city}, {AGENT.state}. Last
        reviewed <time dateTime={reviewed}>{formatArticleDate(reviewed)}</time>.
      </p>
    </aside>
  );
}

export function PlainHeader({
  crumbs,
  title,
  lede,
  short,
}: {
  crumbs: ReadonlyArray<{ name: string; href?: string }>;
  title: string;
  lede: string;
  /** The answer in two or three sentences, shown in a box under the lede. */
  short?: string;
}) {
  return (
    <header className="app-shell max-w-3xl py-6">
      <nav aria-label="Breadcrumb">
        <ol className="text-15 flex flex-wrap gap-2">
          {crumbs.map((crumb, index) => (
            <li key={crumb.name}>
              {index > 0 ? <span aria-hidden>/ </span> : null}
              {crumb.href ? (
                <TrackedLink href={crumb.href} className="underline underline-offset-2">
                  {crumb.name}
                </TrackedLink>
              ) : (
                <span aria-current="page">{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="text-32 mt-4 font-semibold">{title}</h1>
      <p className="text-18 mt-4 leading-relaxed">{lede}</p>
      {short ? (
        <div className="mt-5 rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-5">
          <p className="text-18 font-semibold">In short</p>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{short}</p>
        </div>
      ) : null}
    </header>
  );
}

export function SourceList({
  sources,
}: {
  /** Leave `url` out when the source was not opened and read for this page. */
  sources: ReadonlyArray<{ title: string; url?: string; note?: string }>;
}) {
  return (
    <section className="bg-white py-10">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-24 font-semibold">Where these figures come from</h2>
        <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
          {sources.map((source) => (
            <li key={source.title}>
              {source.url ? (
                <a
                  href={source.url}
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
              ) : (
                source.title
              )}
              {source.note ? ` ${source.note}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The question and answer list every answer page ends with. */
export function FaqList({
  heading,
  items,
}: {
  heading: string;
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <section className="bg-[var(--color-paper)] py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">{heading}</h2>
        <dl className="mt-8 flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.q} className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">{item.q}</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function PlainClose({
  heading,
  body,
  href = "/start?topic=medicare",
  label = "Send Christian a question",
}: {
  heading: string;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-[var(--color-paper)] py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">{heading}</h2>
        <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">{body}</p>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          No cost, no obligation. Your question goes to {AGENT.name} only.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a data-cta-location="page_close" href={AGENT.phoneHref} className="btn">
            Call {AGENT.phone}
          </a>
          <TrackedLink href={href} ctaLocation="page_close" className="btn btn-outline">
            {label}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
