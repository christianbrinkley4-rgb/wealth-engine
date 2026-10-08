import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS, getTool } from "@/lib/wealth/site";

const PATH = "/wealth/credit-score-basics";
const TITLE = "Credit Scores, Explained Plainly";
const DESCRIPTION =
  "A credit score is a three-digit number lenders check before lending. Here is what it measures, what builds it, and what hurts it.";
const MINUTES = 5;
const UPDATED = "October 8, 2026";

const ANSWER =
  "A credit score runs from 300 to 850 and sums up your borrowing history. Paying on time and keeping balances low build it. Late payments and maxed-out cards hurt it. No company can legitimately erase accurate history.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "What a credit score is",
    paragraphs: [
      "A credit score predicts how likely you are to repay borrowed money. Lenders check it for cards, auto loans, and mortgages. Higher means cheaper borrowing.",
      "The two big scoring brands are FICO and VantageScore. Both use the 300 to 850 range for their main scores. Your bank may show one for free.",
    ],
  },
  {
    heading: "What builds it",
    paragraphs: [],
    list: [
      "Paying every bill on time. Payment history carries the most weight.",
      "Keeping card balances low next to their limits.",
      "Keeping old accounts open. Length of history helps.",
      "Using a mix of account types over time.",
    ],
  },
  {
    heading: "What hurts it",
    paragraphs: [
      "Late or missed payments. A payment 30 days late can stay on your report for years.",
      "High balances. Maxed-out cards signal risk to lenders.",
      "Too many new applications at once. Each hard inquiry dings the score a little.",
      "Ignoring a bill sent to collections. Deal with those directly and in writing.",
    ],
  },
  {
    heading: "No quick fixes",
    paragraphs: [
      "Companies that promise to erase accurate negative history are selling hope, not help. You can dispute errors yourself for free with each bureau.",
      "Real improvement comes from months of on-time payments. Slow and steady is the whole trick.",
    ],
  },
  {
    heading: "How to check yours",
    paragraphs: [
      "Many banks and card apps show your score for free. Checking your own score never hurts it. Look monthly, not daily.",
    ],
  },
];

const SOURCES = [
  { label: "myFICO: FICO score ranges", href: "https://www.myfico.com/credit-education/blog/highest-fico-score-you-can-get" },
  { label: "Experian: what is a fair credit score", href: "https://www.experian.com/blogs/ask-experian/what-is-a-fair-credit-score/" },
];

const FAQ = [
  {
    q: "What counts as a good credit score?",
    a: "Scores near the top of the 300 to 850 range get the best terms. Every move upward helps.",
  },
  {
    q: "How long does building credit take?",
    a: "About six months of activity can generate a first score. A strong file takes years of on-time payments.",
  },
  {
    q: "Does checking my own score hurt it?",
    a: "No. Your own checks are soft pulls. Lender applications create the hard pulls that ding scores.",
  },
  {
    q: "Should I close cards I never use?",
    a: "Closing your oldest card can shorten your history. Keeping it open with autopay on one small bill works well.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function CreditScoreBasicsPage() {
  const tool = getTool("money-personality");
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          path: PATH,
          datePublished: "2026-10-08",
          dateModified: "2026-10-08",
        })}
      />
      <PageHead
        eyebrow="Money basics"
        title={TITLE}
        lede={DESCRIPTION}
        crumbs={[
          { name: "Learn", path: "/wealth/learn" },
          { name: TITLE, path: PATH },
        ]}
      >
        <ul className="w-meta">
          <li>{MINUTES} min read</li>
          <li>Updated {UPDATED}</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            {ANSWER}
          </p>
          <div className="w-prose">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">
              Now try it · {tool.kind} · {tool.time}
            </p>
            <h2 className="w-h3">{tool.title}</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>{tool.blurb}</p>
            <div className="w-btn-row">
              <Link href={tool.href} className="w-btn">
                Open it <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>Sources</h2>
            <ul>
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} rel="noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EducationNote />
        </div>
      </article>

      <section className="w-section-tight" aria-label="Talk it through">
        <div className="w-shell w-narrow">
          <aside className="w-panel" aria-label="Start a conversation">
            <p className="w-eyebrow">Free to talk</p>
            <h2 className="w-h3">Talk through your numbers</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              This page is general education, not personal advice. If you want to talk through your own situation, start here. No cost, no pressure.
            </p>
            <div className="w-btn-row">
              <Link href="/start" className="w-btn">
                Start here <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <p style={{ margin: "14px 0 0", color: "var(--w-on-ink-muted)" }}>
              Christian Brinkley, Greensboro, NC. Call or text{" "}
              <a href={WEALTH_FACTS.phoneHref}>{WEALTH_FACTS.phone}</a>.
            </p>
          </aside>
        </div>
      </section>

      <Faq items={FAQ} title="Quick answers" />
      <NextUp
        title="Read next"
        links={[
          { href: "/wealth", label: "Wealth home", kind: "Hub" },
          { href: "/wealth/teens-first-job-money-guide", label: "Your First Job: A Teen Money Guide", kind: "Article" },
          { href: "/wealth/budgeting-that-actually-works", label: "Budgeting That Actually Works", kind: "Article" },
        ]}
      />
    </main>
  );
}
