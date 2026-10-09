import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { getTool } from "@/lib/wealth/site";

/** Flagship article: five money moves for your 20s. Copy audited for plain voice, 2026 figures. */

const PATH = "/wealth/money-moves-in-your-20s";
const TITLE = "Five money moves for your 20s";
const DESCRIPTION =
  "Five money moves for your 20s: budget from take-home pay, build an emergency fund, kill high-interest debt, grab the 401(k) match, open a Roth IRA.";

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

const ANSWER =
  "Budget from take-home pay, save a starter emergency fund, kill high-interest debt, grab your full 401(k) match, and open a Roth IRA. Do those five in order and your 30s start on solid ground.";

type Section = { heading: string; paragraphs: string[]; list?: string[] };

const SECTIONS: Section[] = [
  {
    heading: "Move 1: Budget from take-home pay",
    paragraphs: [
      "Your budget starts with what lands in your account, not your salary. Take-home pay is what you can actually spend.",
      "Write down where your money goes for one month. You cannot fix what you cannot see.",
      "My budgeting guide walks through the whole setup: [Budgeting on your first job](/wealth/learn/budgeting-on-your-first-job). The [budget builder](/tools/budget) gives you a place to run the numbers.",
    ],
  },
  {
    heading: "Move 2: Build a starter emergency fund",
    paragraphs: [
      "An emergency fund is cash for the car repair or the sudden bill. It keeps a bad week from turning into debt.",
      "Start with a small cushion, then work toward three to six months of expenses.",
      "My emergency fund guide breaks it down step by step: [Emergency funds](/wealth/learn/emergency-funds).",
    ],
  },
  {
    heading: "Move 3: Kill high-interest debt first",
    paragraphs: [
      "High-interest debt grows while you sleep. Every month you carry it costs you.",
      "List every debt, then attack the highest rate first. That is the avalanche method.",
      "The [debt payoff calculator](/tools/debt-payoff) runs avalanche and snowball side by side, in months and in interest.",
    ],
  },
  {
    heading: "Move 4: Get the full 401(k) match",
    paragraphs: [
      "If your job offers a 401(k) match, take all of it. That match is part of your pay.",
      "For 2026, the employee deferral limit is $24,500. That is the most you can contribute from your own paycheck.",
      "My 401(k) guide covers the rest: [401(k) explained](/wealth/401k-explained).",
    ],
  },
  {
    heading: "Move 5: Open a Roth IRA and start small",
    paragraphs: [
      "You pay tax on the money going in, and qualified withdrawals come out tax-free in retirement. Young workers get a lot of runway out of that trade.",
      "The 2026 limit is $7,500 if you are under 50. Small, steady contributions beat a big plan you never start.",
      "The full Roth IRA guide lives here: [Roth IRA, explained](/wealth/roth-ira-explained).",
    ],
  },
  {
    heading: "Your 20s build your 60s",
    paragraphs: [
      "Retirement feels far away at 22. It arrives anyway.",
      "Health care is one of the biggest costs in retirement. Saving early helps you meet it later.",
      "See what retirement health care costs look like: [Medicare costs](/medicare-costs).",
    ],
  },
];

const FAQ = [
  {
    q: "Do I have to do all five at once?",
    a: "No. Work them in order. Each one makes the next one easier.",
  },
  {
    q: "My job has no 401(k). What do I do?",
    a: "Focus on the emergency fund and the Roth IRA. You can still build retirement savings on your own.",
  },
  {
    q: "How much should I put in my Roth IRA?",
    a: "Up to $7,500 for 2026 if you are under 50. Start with whatever fits your budget and build up from there.",
  },
  {
    q: "Is this financial advice?",
    a: "No. This is education. I am not your advisor, and I do not tell anyone what to buy.",
  },
];

const SOURCES = [
  {
    href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    label: "IRS: 2026 retirement plan limits (401(k) and IRA)",
  },
  {
    href: "https://www.irs.gov/retirement-plans/roth-iras",
    label: "IRS: Roth IRAs",
  },
];

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

export default function MoneyMovesInYour20sPage() {
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
        lede="Five moves that matter early. Built from what I have seen working with a financial advisor and real client files."
        crumbs={[{ name: TITLE, path: PATH }]}
      >
        <ul className="w-meta">
          <li>5 min read</li>
          <li>Updated October 8, 2026</li>
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
                      <li key={item}>{rich(item)}</li>
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

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Start a conversation">
            <p className="w-eyebrow">No cost, no pressure</p>
            <h2 className="w-h3">Talk it through</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Have a money question or want a second set of eyes? Start a conversation and we will take it
              one question at a time.
            </p>
            <div className="w-btn-row">
              <Link href="/start" className="w-btn">
                Start a conversation <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <p style={{ margin: "14px 0 0", color: "var(--w-on-ink-muted)" }}>
              Christian Brinkley, Greensboro, NC, <a href="tel:+19194086671">(919) 408-6671</a>
            </p>
          </aside>
        </div>
      </article>

      <Faq items={FAQ} title="Quick answers" />
      <NextUp
        title="Read next"
        links={[
          { href: "/wealth/roth-ira-explained", label: "Roth IRA, explained", kind: "Article" },
          { href: "/wealth/learn/budgeting-on-your-first-job", label: "Budgeting on your first job", kind: "Article" },
          { href: "/tools/budget", label: "50/30/20 budget builder", kind: "Calculator" },
        ]}
      />
    </main>
  );
}
