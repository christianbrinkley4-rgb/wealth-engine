import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS, getTool } from "@/lib/wealth/site";

const PATH = "/wealth/budgeting-that-actually-works";
const TITLE = "Budgeting That Actually Works";
const DESCRIPTION =
  "Budgets fail when they are wish lists. This is an ongoing system: take-home pay, a starting split, one payday move, and a weekly check.";
const MINUTES = 6;
const UPDATED = "October 8, 2026";

const ANSWER =
  "Build the budget from take-home pay, not salary. Use 50/30/20 as a starting split: needs, wants, savings. Move savings out on payday, before spending. Review the numbers for five minutes each week.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Not first-job budgeting",
    paragraphs: [
      "This is the ongoing system for anyone with rent, goals, and a life that refuses to sit still. It assumes real bills and real surprises.",
    ],
  },
  {
    heading: "Start from take-home pay",
    paragraphs: [
      "Your salary is not your budget. Your take-home pay is. Every number in the plan comes from what actually lands in your account.",
    ],
  },
  {
    heading: "The 50/30/20 split, as a starting point",
    paragraphs: [
      "Fifty percent for needs: rent, groceries, transport, minimum debt payments. Thirty percent for wants. Twenty percent for savings and extra debt payments.",
      "Treat it as a starting point, not a law. High housing costs break the fifty percent line, so adjust the split until it matches your life.",
    ],
  },
  {
    heading: "Pay yourself first on payday",
    paragraphs: [
      "Move savings the day money arrives. Money moved on payday never sits in checking waiting to be spent.",
      "Set the transfer once and let it run. Adjust the amount when income changes.",
    ],
  },
  {
    heading: "The weekly five-minute check",
    paragraphs: [
      "Once a week, open your accounts and read three numbers: money in, money out, money left. Five minutes catches small problems before they grow.",
      "Put it on the calendar. A check that has a time slot happens. One without it does not.",
    ],
  },
  {
    heading: "When the budget breaks",
    paragraphs: [
      "Budgets break when life happens: a car repair, a slow month, a surprise bill. Keep a small buffer in checking for exactly this.",
      "When one category overspends, move money from another instead of quitting. Repair the plan the same week it breaks.",
    ],
  },
];

const SOURCES = [
  { label: "CFPB: how to create a budget and stick with it", href: "https://www.consumerfinance.gov/archive/blog/budgeting-how-to-create-a-budget-and-stick-with-it/" },
];

const FAQ = [
  {
    q: "What if 50/30/20 does not fit my income?",
    a: "Keep the idea and change the numbers. High housing costs break the fifty percent line. Your split is yours to set.",
  },
  {
    q: "Should I track with cash or an app?",
    a: "Use whichever you will actually open each week. The best system is the one you keep using.",
  },
  {
    q: "How do I budget irregular income?",
    a: "Plan from your lowest typical month. In good months, send the extra straight to savings on payday.",
  },
  {
    q: "Is budgeting the same as never spending?",
    a: "No. A budget assigns every dollar a job, including fun money. Named fun money gets spent without guilt.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function BudgetingThatActuallyWorksPage() {
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
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.heading === "The 50/30/20 split, as a starting point" ? (
                  <p>
                    <Link href="/wealth/learn/the-50-30-20-rule">Read the full 50/30/20 breakdown.</Link>
                  </p>
                ) : null}
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
          { href: "/wealth/student-loans-payoff-plan", label: "A Student Loan Payoff Plan That Fits on One Page", kind: "Article" },
        ]}
      />
    </main>
  );
}
