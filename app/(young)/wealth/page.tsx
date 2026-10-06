import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { WealthLane, type WealthCard, type WealthSection } from "@/lib/wealthLane";

const title = "Money lessons for a first paycheck";
const description =
  "Plain-language lessons on pay stubs, a starter emergency fund, a first budget, and insurance questions. Education only, from Christian Brinkley in Greensboro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wealth" },
  openGraph: pageOpenGraph({ title, description, path: "/wealth" }),
  twitter: pageTwitter({ title, description }),
};

export default function WealthPage() {
  const hero = WealthLane.hero();
  const stub = WealthLane.stubHeading();
  const [before, mark, after] = WealthLane.splitTitle(hero.title, hero.titleMark);
  const sections = WealthLane.sections();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Wealth", path: "/wealth" },
            ]),
          ),
        }}
      />

      <section className="wealth-hero" aria-labelledby="wealth-title">
        <div className="wealth-shell wealth-hero-grid">
          <div>
            <p className="wealth-eyebrow">{hero.eyebrow}</p>
            <h1 id="wealth-title">
              {before}
              <em>{mark}</em>
              {after}
            </h1>
            <p className="wealth-lede">{hero.lede}</p>
            <Link href={hero.ctaHref} className="wealth-cta">
              {hero.cta}
              <ArrowRight size={20} aria-hidden />
            </Link>
            <p className="wealth-note">{hero.note}</p>
            <ul className="wealth-facts">
              {hero.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>

          <figure className="wealth-stub" aria-label="Pay stub line map, labels only">
            <div className="wealth-stub-top">
              <span>{stub.title}</span>
              <span>{stub.meta}</span>
            </div>
            <ol>
              {WealthLane.stubLines().map((line) => (
                <li key={line}>
                  <span>{line}</span>
                  <span className="wealth-track" aria-hidden />
                </li>
              ))}
            </ol>
            <figcaption className="wealth-stub-note">{hero.stubCaption}</figcaption>
          </figure>
        </div>
      </section>

      <CardSection meta={sections.guides} items={WealthLane.guides()} cols={3} />
      <CardSection meta={sections.calculators} items={WealthLane.calculators()} cols={2} />
      <CardSection meta={sections.quizzes} items={WealthLane.quizzes()} cols={2} />

      <section
        id={sections.building.id}
        className="wealth-section"
        aria-labelledby="building-title"
      >
        <div className="wealth-shell">
          <SectionHead meta={sections.building} headingId="building-title" />
          <ol className="wealth-log">
            {WealthLane.log().map((entry) => (
              <li key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CardSection meta={sections.checklists} items={WealthLane.checklists()} cols={2} />
    </main>
  );
}

function SectionHead({ meta, headingId }: { meta: WealthSection; headingId: string }) {
  return (
    <header className="wealth-section-head">
      <p className="wealth-index">{meta.index}</p>
      <div>
        <h2 id={headingId}>{meta.title}</h2>
        <p>{meta.lede}</p>
      </div>
    </header>
  );
}

function CardSection({
  meta,
  items,
  cols,
}: {
  meta: WealthSection;
  items: readonly WealthCard[];
  cols: 2 | 3;
}) {
  const headingId = `${meta.id}-title`;
  return (
    <section id={meta.id} className="wealth-section" aria-labelledby={headingId}>
      <div className="wealth-shell">
        <SectionHead meta={meta} headingId={headingId} />
        <div className="wealth-grid" data-cols={String(cols)}>
          {items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className={item.href ? "wealth-card wealth-card-lead" : "wealth-card"}
            >
              <p className="wealth-kicker">
                <span>{item.kicker}</span>
                <span className="wealth-status">{item.status}</span>
              </p>
              <h3>{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
