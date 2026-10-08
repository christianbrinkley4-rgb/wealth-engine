import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS, getTool } from "@/lib/wealth/site";

const PATH = "/wealth/student-loans-payoff-plan";
const TITLE = "Student Loan Payoff Plan";
const DESCRIPTION =
  "Avalanche or snowball: two plain-English ways to attack student loans. List the loans, pick a method, automate the payments.";
const MINUTES = 5;
const UPDATED = "October 8, 2026";

const ANSWER =
  "Avalanche targets the highest interest rate first and costs the least in interest. Snowball targets the smallest balance first and delivers wins sooner. Both beat paying minimums everywhere. Automate every payment so the plan survives busy months.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "List every loan",
    paragraphs: [
      "Write down each loan with three numbers: balance, interest rate, minimum payment. Your servicer shows all three. You cannot plan what you cannot see.",
    ],
  },
  {
    heading: "Avalanche, plainly",
    paragraphs: [
      "Pay minimums on every loan. Send every extra dollar to the highest rate. When that loan is gone, roll its payment into the next highest rate.",
      "This method costs the least in total interest. It rewards patience with math.",
    ],
  },
  {
    heading: "Snowball, plainly",
    paragraphs: [
      "Pay minimums on every loan. Send every extra dollar to the smallest balance. When that loan is gone, roll its payment into the next smallest.",
      "This method clears loans fastest, and early wins keep momentum high. It costs a bit more interest than avalanche.",
    ],
  },
  {
    heading: "Automate everything",
    paragraphs: [
      "Set autopay for at least the minimums on every loan. Add the extra payment as a separate automatic transfer.",
      "A plan that runs itself survives busy months and forgotten logins.",
    ],
  },
  {
    heading: "Point extra money at the plan",
    paragraphs: [
      "Decide in advance where windfalls go: raises, refunds, side income. Money without a job gets spent. Money with a job kills loans.",
    ],
  },
];

const SOURCES = [
  { label: "Federal Student Aid: income-driven repayment plans", href: "https://studentaid.gov/manage-loans/repayment/plans/income-driven" },
];

const FAQ = [
  {
    q: "Which method saves more money?",
    a: "Avalanche. Attacking the highest rate first means less interest paid over the life of the loans.",
  },
  {
    q: "What if all my rates are the same?",
    a: "Then both methods point the same way. Start with the smallest balance and keep rolling payments forward.",
  },
  {
    q: "Should I skip my 401(k) match to pay loans faster?",
    a: "The match is part of your pay, and skipping it leaves money behind. A sensible order: capture the match first, then attack loans.",
  },
  {
    q: "What about refinancing?",
    a: "Refinancing can lower your rate. Refinancing federal loans privately means losing federal protections. Read that trade before signing.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function StudentLoansPayoffPlanPage() {
  const tool = getTool("debt-payoff");
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
          { href: "/wealth/budgeting-that-actually-works", label: "Budgeting That Actually Works", kind: "Article" },
          { href: "/wealth/buying-first-home-money-guide", label: "Buying Your First Home: The Money Parts", kind: "Article" },
        ]}
      />
    </main>
  );
}
