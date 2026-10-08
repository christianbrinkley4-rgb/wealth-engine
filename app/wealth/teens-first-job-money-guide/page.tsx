import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const PATH = "/wealth/teens-first-job-money-guide";
const TITLE = "Your First Job: A Teen Money Guide";
const DESCRIPTION =
  "Your first paycheck is smaller than your hours times your rate. Here is where the money goes and how to split what is left.";
const MINUTES = 5;
const UPDATED = "October 8, 2026";

const ANSWER =
  "Taxes come out of your check before you see it. Federal withholding, Social Security at 6.2 percent, and Medicare at 1.45 percent all shrink the check. What is left is yours. Split it between spending now and saving for later.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Where your check goes",
    paragraphs: [
      "Your hourly rate times your hours is your gross pay. Your net pay is what lands in your account. The gap between them is taxes and deductions.",
      "Federal income tax is withheld from each check based on your W-4 and your earnings. Teens with low earnings may owe little or nothing at filing time.",
      "Social Security takes 6.2 percent of your wages. Medicare takes 1.45 percent. These payroll taxes apply to almost every worker, including teens. [Take-home pay calculator](/tools/take-home-pay).",
    ],
  },
  {
    heading: "Run the math on one check",
    paragraphs: [
      "$12 an hour for 20 hours is $240 in gross pay. Social Security takes $14.88. Medicare takes $3.48. That leaves about $221.64 before income tax withholding.",
    ],
  },
  {
    heading: "The W-4 in one paragraph",
    paragraphs: [
      "Your employer gives you a W-4 on day one. It tells payroll how much federal tax to withhold from your checks. Fill it out, turn it in, and keep a copy.",
    ],
  },
  {
    heading: "What to do with the money",
    paragraphs: [
      "Give every check three jobs: spending, saving, and a little fun money. Move the savings part first, before you spend anything. [Budgeting on your first job](/wealth/learn/budgeting-on-your-first-job).",
      "An emergency fund is cash set aside for surprises like a car repair. Even a few hundred dollars beats scrambling when something breaks. [Emergency funds](/wealth/learn/emergency-funds).",
    ],
    list: [
      "Spend some. Your first paychecks should be fun too.",
      "Save some. Automatic transfers beat good intentions.",
      "Track it. One month of tracking shows where money really goes.",
    ],
  },
  {
    heading: "The Roth IRA, while you are young",
    paragraphs: [
      "A Roth IRA is a retirement account you fund with after-tax dollars. You need earned income to contribute, and a first job counts.",
      "For 2026, the combined IRA limit is $7,500 for savers under 50. A parent or guardian opens a custodial Roth IRA for a minor.",
      "Qualified withdrawals in retirement are tax-free. Starting early gives compound growth more years to work.",
    ],
  },
];

const SOURCES = [
  { label: "IRS: Social Security and Medicare withholding rates", href: "https://www.irs.gov/taxtopics/tc751" },
  { label: "IRS: Roth IRAs", href: "https://www.irs.gov/retirement-plans/roth-iras" },
];

const FAQ = [
  {
    q: "Do teens have to file a tax return?",
    a: "It depends on your earnings and filing status. Check the IRS filing requirements for the year. If federal tax was withheld, filing may get you a refund.",
  },
  {
    q: "Why is my first check smaller than later checks?",
    a: "First checks sometimes cover a partial pay period. Compare two full pay periods before worrying.",
  },
  {
    q: "Can a 16-year-old open a Roth IRA?",
    a: "Yes, with earned income. A parent or guardian opens a custodial account for the minor. The 2026 limit is $7,500.",
  },
  {
    q: "How much of my check should I save?",
    a: "Pick a percentage you can hold every check, even a small one. Consistency beats a big number you abandon.",
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

export default function TeensFirstJobMoneyGuidePage() {
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

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article</p>
            <h2 className="w-h3">Roth IRA, explained</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Earned income is the ticket in. This guide covers how Roth IRAs work and the 2026 limits.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/roth-ira-explained" className="w-btn">
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
          { href: "/wealth/credit-score-basics", label: "Credit Scores, Explained Plainly", kind: "Article" },
          { href: "/wealth/budgeting-that-actually-works", label: "Budgeting That Actually Works", kind: "Article" },
        ]}
      />
    </main>
  );
}
