import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS, getTool } from "@/lib/wealth/site";

const PATH = "/wealth/buying-first-home-money-guide";
const TITLE = "Buying Your First Home";
const DESCRIPTION =
  "The price is only the start. Down payment, closing costs, PITI, and the emergency fund you keep after closing, in plain English.";
const MINUTES = 6;
const UPDATED = "October 8, 2026";

const ANSWER =
  "Plan for three buckets: the down payment, closing costs, and an emergency fund that survives the move. Learn PITI: principal, interest, taxes, insurance. The house is affordable when all four fit your budget with room to spare.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "The down payment",
    paragraphs: [
      "The down payment is your upfront share of the price. A bigger down payment means a smaller loan and smaller monthly payments.",
      "Some loan programs allow low down payments. Those come with trade-offs like mortgage insurance, so read the terms.",
    ],
  },
  {
    heading: "Closing costs",
    paragraphs: [
      "Closing costs are the fees to finish the purchase: lender fees, title work, prepaid taxes and insurance. They add a meaningful chunk on top of the price.",
      "Get the written estimate early and read every line. Ask about any fee you do not understand.",
    ],
  },
  {
    heading: "PITI in plain English",
    paragraphs: [
      "Your monthly housing payment is all four together. Quotes that show principal and interest only are telling half the story. [The budget builder](/tools/budget).",
    ],
    list: [
      "Principal: the part of each payment that shrinks your loan balance.",
      "Interest: the lender's charge for lending you the money.",
      "Taxes: property tax, folded into your monthly payment by the lender.",
      "Insurance: homeowners insurance, folded into your monthly payment the same way.",
    ],
  },
  {
    heading: "The emergency fund after buying",
    paragraphs: [
      "Houses break on their own schedule. Roofs, furnaces, and water heaters do not check your bank balance first.",
      "Keep an emergency fund intact after closing, separate from the down payment. A house with no cash cushion is fragile. [Emergency fund guide](/wealth/emergency-fund-guide).",
    ],
  },
  {
    heading: "The real affordability test",
    paragraphs: [
      "Add up PITI plus utilities and upkeep, then run that total against take-home pay. Leave room for savings to keep growing. [Rent vs buy, the math](/wealth/rent-vs-buy-math).",
      "If one surprise repair would break the budget, the house is too much house. Waiting costs less than a forced sale.",
    ],
  },
];

const SOURCES = [
  { label: "CFPB: assess your spending before home shopping", href: "https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/" },
];

const FAQ = [
  {
    q: "How much house can I afford?",
    a: "Start from your budget, not the lender's number. PITI plus upkeep should leave savings growing each month.",
  },
  {
    q: "Is renting throwing money away?",
    a: "No. Rent buys flexibility and caps your repair risk. Buying builds equity but adds closing costs and maintenance.",
  },
  {
    q: "What credit score do I need to buy a home?",
    a: "Minimums vary by loan program. Higher scores earn better rates, so improving your score before shopping pays off.",
  },
  {
    q: "Should I drain my emergency fund for a bigger down payment?",
    a: "Keep the fund. A bigger down payment helps, but a new homeowner with no cash cushion is fragile.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

/** Render [label](href) spans as internal links. */
function rich(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={index} href={match[2]}>
          {match[1]}
        </Link>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function BuyingFirstHomeMoneyGuidePage() {
  const tool = getTool("budget");
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
                  <p key={paragraph}>{rich(paragraph)}</p>
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
          { href: "/wealth/credit-score-basics", label: "Credit Scores, Explained Plainly", kind: "Article" },
          { href: "/wealth/student-loans-payoff-plan", label: "A Student Loan Payoff Plan That Fits on One Page", kind: "Article" },
        ]}
      />
    </main>
  );
}
