import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const PATH = "/wealth/life-insurance-explained";
const TITLE = "Life Insurance Explained";
const DESCRIPTION =
  "Term and whole life do different jobs. What each one is, how agents get paid, and the questions to ask before you sign.";
const MINUTES = 6;
const UPDATED = "October 8, 2026";

const ANSWER =
  "Term life covers a set number of years and pays only if you die during the term. Whole life covers your entire life and builds cash value, with higher premiums. Match the policy to the job. Ask every agent how they get paid.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "What life insurance is for",
    paragraphs: [
      "Life insurance replaces income when someone dies. If people depend on your paycheck, it protects them. If no one depends on your income, the need is smaller.",
    ],
  },
  {
    heading: "Term life, plainly",
    paragraphs: [
      "You pick a term, like 10, 20, or 30 years. You pay premiums during the term. If you die during the term, it pays the death benefit.",
      "If you outlive the term, coverage ends. Term is the simplest type.",
    ],
  },
  {
    heading: "Whole life, plainly",
    paragraphs: [
      "Whole life covers your entire life as long as premiums are paid. Part of each premium builds cash value you can borrow against.",
      "Premiums run higher than term for the same death benefit. Read the fees and rules before committing.",
    ],
  },
  {
    heading: "How agents get paid",
    paragraphs: [
      "Most life insurance agents earn a commission from the carrier when a policy sells. The commission does not change your premium.",
      "It does shape incentives. Ask directly: how are you paid on this sale? An honest agent answers plainly.",
    ],
  },
  {
    heading: "Questions to ask any agent",
    paragraphs: [],
    list: [
      "How are you paid on this policy?",
      "What happens if I stop paying premiums?",
      "Can the premium or the coverage change later?",
      "What is excluded during the first two years?",
      "How strong is the carrier, and who rates that strength?",
    ],
  },
];

const SOURCES = [
  { label: "Insurance Information Institute: types of life insurance", href: "https://www.iii.org/article/what-are-principal-types-life-insurance/" },
];

const FAQ = [
  {
    q: "How much life insurance do I need?",
    a: "Start from your family's needs: income to replace, debts to clear, goals to fund. An agent can run the math with you.",
  },
  {
    q: "Is life insurance through work enough?",
    a: "Work coverage ends when the job ends, and the employer sets the amount. Treat it as a supplement, not the whole plan.",
  },
  {
    q: "What is cash value?",
    a: "Cash value is the savings component inside permanent policies. It grows slowly and you can borrow against it. Unpaid loans reduce the death benefit.",
  },
  {
    q: "Can I be turned down for life insurance?",
    a: "Yes. Health history affects approval and pricing. Some policies skip the exam and cost more for that trade.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function LifeInsuranceExplainedPage() {
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
        eyebrow="Insurance"
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

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article</p>
            <h2 className="w-h3">Emergency funds</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Insurance covers the big shocks. An emergency fund handles the small ones. Here is how to build yours.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/learn/emergency-funds" className="w-btn">
                Read the guide <ArrowRight size={18} aria-hidden />
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
          { href: "/wealth/buying-first-home-money-guide", label: "Buying Your First Home: The Money Parts", kind: "Article" },
          { href: "/wealth/529-college-savings-basics", label: "529 College Savings Plans, Explained", kind: "Article" },
        ]}
      />
    </main>
  );
}
