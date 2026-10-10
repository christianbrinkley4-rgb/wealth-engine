import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EducationNote, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { SITE_URL } from "@/lib/seo";
import { WEALTH_ARTICLES, WEALTH_PILLAR_LABELS, type WealthPillarId } from "@/lib/wealth/articles";
import { wealthMetadata } from "@/lib/wealth/seo";

const path = "/wealth/learn";
const description =
  "Plain-English money guides for your 20s: budgeting on your first job, Roth IRAs, credit scores, emergency funds, the 50/30/20 rule and what accountants do.";

export const metadata: Metadata = wealthMetadata({
  title: "Learn Money Basics in Plain English",
  description,
  path,
});

const PILLAR_ORDER: WealthPillarId[] = ["money-basics", "accounting-explained"];
const PILLAR_LINES: Record<WealthPillarId, string> = {
  "money-basics": "The class nobody gave you. Start anywhere.",
  "accounting-explained": "How businesses keep score, and how to read the scoreboard.",
};

export default function WealthLearnPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Money guides",
          itemListElement: WEALTH_ARTICLES.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: `${SITE_URL}/wealth/learn/${article.slug}`,
          })),
        }}
      />
      <PageHead
        eyebrow="Learn"
        title={
          <>
            Short reads. <span className="w-mark">Zero jargon.</span>
          </>
        }
        lede="Each one answers a single question in about four minutes, then hands you a calculator to try it yourself."
        crumbs={[{ name: "Learn", path }]}
      />
      {PILLAR_ORDER.map((pillar) => (
        <section className="w-section-tight" id={pillar} key={pillar} style={{ scrollMarginTop: 120 }}>
          <div className="w-shell">
            <p className="w-eyebrow">{PILLAR_LINES[pillar]}</p>
            <h2 className="w-h2" style={{ marginBottom: 22 }}>
              {WEALTH_PILLAR_LABELS[pillar]}
            </h2>
            <ul className="w-next-list">
              {WEALTH_ARTICLES.filter((article) => article.pillar === pillar).map((article) => (
                <li key={article.slug} data-reveal>
                  <Link href={`/wealth/learn/${article.slug}`}>
                    <span>{article.minutes} min read</span>
                    <strong style={{ fontFamily: "var(--w-serif)", fontSize: "1.3rem" }}>{article.title}</strong>
                    <ArrowUpRight size={20} aria-hidden />
                    <span style={{ color: "var(--w-muted)", textTransform: "none", letterSpacing: 0, fontFamily: "inherit", fontSize: "0.92rem" }}>
                      {article.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <div className="w-shell" style={{ paddingBottom: 48 }}>
        <EducationNote />
      </div>
      <NextUp
        links={[
          { href: "/tools", label: "Play with the calculators", kind: "Calculators" },
          { href: "/wealth/quiz/first-1000", label: "What do I do with my first $1,000?", kind: "Quiz" },
          { href: "/wealth/journey", label: "Follow the journey", kind: "Building in public" },
        ]}
      />
    </main>
  );
}
