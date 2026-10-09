import { EditorialNote, ArticleContents } from "@/app/components/EditorialNote";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS, getTool } from "@/lib/wealth/site";

const PATH = "/wealth/401k-explained";
const TITLE = "Your 401(k), Explained";
const DESCRIPTION =
  "A 401(k) is a retirement account through your employer. How contributions, the match, and vesting work, with the 2026 limits.";
const MINUTES = 6;
const UPDATED = "October 9, 2026";

const ANSWER =
  "A 401(k) pulls retirement savings straight from your paycheck. In 2026 you can defer up to $24,500 of your own pay. Many employers match part of it. Check your plan for the matching formula and eligibility rules.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Read the plan details",
    paragraphs: [
      "The plan document explains when you can join, how matching works, and which fees apply. Employer contributions can have different vesting rules.",
      "Your contributions remain yours, but investment values can fall. A retirement account does not guarantee growth or protect every investment from losses.",
      "The special catch-up replaces the ordinary catch-up for eligible ages. It is not an extra amount added on top of both limits.",
      "Changing jobs does not automatically move your account. Compare the old plan, new plan, and IRA rules before choosing a rollover.",
    ],
  },
  {
    heading: "What a 401(k) is",
    paragraphs: [
      "It is a retirement plan your employer sponsors. You pick a contribution amount, and it leaves your paycheck automatically.",
      "The plan offers investment options you choose from. Investment gains and losses stay inside the account until withdrawn.",
    ],
  },
  {
    heading: "Pre-tax vs Roth",
    paragraphs: [
      "Pre-tax contributions lower your taxable income now. You pay tax when you withdraw in retirement.",
      "Roth contributions use after-tax dollars. Qualified withdrawals in retirement are tax-free. The mix depends on your tax picture now versus later.",
    ],
  },
  {
    heading: "The match",
    paragraphs: [
      "Many employers match a slice of your contributions. One example formula: fifty cents per dollar up to six percent of pay. That is an example, not a rule.",
      "A match can increase retirement savings, subject to plan rules. Check your plan documents for the formula, eligibility, and vesting schedule.",
    ],
  },
  {
    heading: "Vesting in plain English",
    paragraphs: [
      "Your own contributions are always one hundred percent yours. Employer match money can vest over time.",
      "Vesting is the schedule that decides how much match money you keep if you leave. Leave early and some of it stays behind.",
    ],
  },
  {
    heading: "The 2026 limits",
    paragraphs: [
      "For 2026, the Roth catch-up requirement applies if your 2025 wages from the sponsoring employer exceeded $150,000.",
    ],
    list: [
      "$24,500: the most you can defer from your own pay.",
      "$8,000 catch-up at age 50 and older, for a $32,500 total.",
      "$11,250 super catch-up at ages 60 to 63, for a $35,750 total.",
      "$72,000: the combined employee plus employer limit, excluding catch-ups and subject to compensation limits.",
    ],
  },
];

const SOURCES = [
  {
    label: "IRS: vesting and ownership",
    href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-vesting",
  },
  {
    label: "IRS: 2026 retirement plan limits",
    href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
  },
  {
    label: "IRS: catch-up contributions",
    href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions",
  },
];

const FAQ = [
  {
    q: "What happens to my 401(k) when I change jobs?",
    a: "It stays yours. Leave it, roll it to a new plan, or roll it to an IRA. Compare fees before moving it.",
  },
  {
    q: "Can I withdraw from my 401(k) early?",
    a: "Your plan must allow the withdrawal. Tax and an additional penalty may apply, but exceptions exist. Check the distribution rules before withdrawing.",
  },
  {
    q: "Roth or pre-tax: which is better?",
    a: "There is no universal answer. Pre-tax helps when your tax rate is higher now. Roth helps when it is lower now.",
  },
  {
    q: "What if my job offers no 401(k)?",
    a: "An IRA is the next stop. For 2026 the combined IRA limit is $7,500 under 50 and $8,600 at 50 and older.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function K401ExplainedPage() {
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
          citations: SOURCES.map((source) => source.href),
        })}
      />
      <PageHead
        eyebrow="Retirement"
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
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.heading === "The 2026 limits" ? (
                  <p>
                    <Link href="/wealth/catch-up-contributions-after-50">
                      Read the catch-up contributions guide for ages 50 and up.
                    </Link>
                  </p>
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
        </div>
      </article>

      <section className="w-section-tight" aria-label="Talk it through">
        <div className="w-shell w-narrow">
          <aside className="w-panel" aria-label="Start a conversation">
            <p className="w-eyebrow">Free to talk</p>
            <h2 className="w-h3">Talk through your numbers</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              This page is general education, not personal advice. If you want to talk through your
              own situation, start here. No cost, no pressure.
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
          { href: "/wealth/roth-ira-explained", label: "Roth IRA, Explained", kind: "Article" },
          {
            href: "/wealth/catch-up-contributions-after-50",
            label: "Catch-Up Contributions After 50",
            kind: "Article",
          },
        ]}
      />
    </main>
  );
}
