import { EditorialNote, ArticleContents } from "@/app/components/EditorialNote";
import { SITE_URL } from "@/lib/seo";
import { ROTH_DEFINITION } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { getTool } from "@/lib/wealth/site";

/** Flagship explainer: Roth IRA. All 2026 figures from IRS sources, checked October 8, 2026. */

const PATH = "/wealth/roth-ira-explained";
const TITLE = "Roth IRA, explained";
const DESCRIPTION =
  "What a Roth IRA is, how the taxes work, the 2026 limits, and when early-career savers look at it first.";

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

const ANSWER =
  "A Roth IRA is a retirement account you fund with after-tax money. You pay tax now, and qualified withdrawals in retirement come out tax-free. The 2026 limit is $7,500 if you are under 50.";

type Section = { heading: string; paragraphs: string[]; list?: string[] };

const SECTIONS: Section[] = [
  {
    heading: "Before you contribute",
    paragraphs: [
      "Your combined traditional and Roth IRA contributions share an annual limit. Contributions also cannot exceed eligible compensation, subject to spousal IRA rules.",
      "An employer plan has a separate contribution limit. Having a workplace plan does not automatically prevent Roth IRA contributions.",
      "Check your filing status and modified adjusted gross income before contributing. Married people filing separately can face much lower income limits.",
      "The withdrawal clock starts with the first tax year for which you contributed to any Roth IRA. It does not restart for each account.",
      "A penalty exception does not necessarily make earnings tax-free. Keep records separating regular contributions, conversions, and earnings.",
    ],
  },
  {
    heading: "The one-sentence version",
    paragraphs: [
      "A Roth IRA holds money you already paid income tax on. Qualified withdrawals are tax-free. Nonqualified earnings can be taxable.",
    ],
  },
  {
    heading: "A container, not an investment",
    paragraphs: [
      "Think of it as a container. The account itself is not an investment.",
      "The money you put inside gets invested in things you choose. Those investments rise and fall on their own.",
    ],
  },
  {
    heading: "Tax now, none later",
    paragraphs: [
      "You contribute money you already paid tax on. In retirement, qualified withdrawals are tax-free.",
      "Traditional IRA contributions may be deductible. Eligibility depends on income, filing status, and workplace retirement coverage.",
    ],
  },
  {
    heading: "The 2026 numbers",
    paragraphs: ["These are the IRS limits for 2026. Copy them, do not trust memory."],
    list: [
      "Under 50: $7,500",
      "Age 50 and up: $8,600, including a $1,100 catch-up contribution",
      "Single filers: contributions phase out from $153,000 to $168,000 MAGI",
      "Joint filers: contributions phase out from $242,000 to $252,000 MAGI",
      "Roth 401(k) employee deferral limit: $24,500",
    ],
  },
  {
    heading: "Who looks at it first",
    paragraphs: [
      "Early-career workers look at it first. So do people in a lower bracket than they expect in retirement.",
      "If your income is near the phase-out range, check the numbers before you contribute.",
    ],
  },
  {
    heading: "Your contributions can come back out",
    paragraphs: [
      "Regular contributions come out first under IRS ordering rules, without income tax or an early-withdrawal penalty. Converted amounts have separate rules.",
      "Qualified earnings withdrawals require a five-tax-year period plus a qualifying condition. Conditions include reaching age 59.5, disability, death, or qualifying first-home expenses.",
      "Compare it against a traditional account with the [Roth vs traditional calculator](/wealth/calculators/roth-vs-traditional). My short intro guide is here: [What is a Roth IRA?](/wealth/learn/what-is-a-roth-ira).",
    ],
  },
];

const FAQ = [
  { q: "What is a Roth IRA?", a: ROTH_DEFINITION.text },
  {
    q: "What is the Roth IRA contribution limit for 2026?",
    a: "$7,500 if you are under 50. $8,600 if you are 50 or older.",
  },
  {
    q: "Can I withdraw Roth IRA money early?",
    a: "Regular contributions can come out without income tax or penalty. Converted amounts and earnings follow separate rules.",
  },
  {
    q: "What makes a withdrawal qualified?",
    a: "The five-tax-year requirement must be met. A qualifying condition must also apply, such as age 59.5, disability, death, or eligible first-home expenses.",
  },
  {
    q: "Can I contribute if I earn too much?",
    a: "Direct contributions phase out between $153,000 and $168,000 MAGI for single filers. For joint filers, the range is $242,000 to $252,000.",
  },
];

const SOURCES = [
  {
    href: "https://www.irs.gov/publications/p590b",
    label: "IRS Publication 590-B: Roth withdrawals and ordering rules",
  },
  {
    href: "https://www.irs.gov/publications/p590a",
    label: "IRS Publication 590-A: contribution and deduction eligibility",
  },
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

export default function RothIraExplainedPage() {
  const tool = getTool("roth-vs-traditional");
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          path: PATH,
          datePublished: "2026-10-08",
          dateModified: "2026-10-09",
          abstract: ROTH_DEFINITION.text,
          citations: SOURCES.map((source) => source.href),
          speakableSelectors: ["h1", ".w-answer"],
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: ROTH_DEFINITION.name,
          description: ROTH_DEFINITION.text,
          url: SITE_URL + PATH + "#definition",
        }}
      />
      <PageHead
        eyebrow="Money basics"
        title={TITLE}
        lede="The Roth IRA rewards early savers. Here is how it works, in plain English."
        crumbs={[{ name: TITLE, path: PATH }]}
      >
        <ul className="w-meta">
          <li>6 min read</li>
          <li>Updated October 9, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer" id="definition">
            <span>Short answer</span>
            {ANSWER}
          </p>
          <ArticleContents
            items={SECTIONS.map((section, index) => ({
              id: "section-" + index,
              label: section.heading,
            }))}
          />
          <div className="w-prose">
            {SECTIONS.map((section, index) => (
              <section key={section.heading}>
                <h2 id={"section-" + index}>{section.heading}</h2>
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

          <EditorialNote sources={SOURCES} />
          <EducationNote />

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Start a conversation">
            <p className="w-eyebrow">No cost, no pressure</p>
            <h2 className="w-h3">Talk it through</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Have a money question or want a second set of eyes? Start a conversation and we will
              take it one question at a time.
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
          {
            href: "/wealth/money-moves-in-your-20s",
            label: "Five money moves for your 20s",
            kind: "Article",
          },
          {
            href: "/wealth/calculators/roth-vs-traditional",
            label: "Roth vs traditional",
            kind: "Calculator",
          },
          {
            href: "/wealth/learn/what-is-a-roth-ira",
            label: "What is a Roth IRA?",
            kind: "Article",
          },
        ]}
      />
    </main>
  );
}
