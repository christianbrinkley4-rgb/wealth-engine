import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const PATH = "/wealth/529-college-savings-basics";
const TITLE = "529 College Savings Plans, Explained";
const DESCRIPTION =
  "A 529 is a tax-advantaged account for education costs. How the tax treatment works, plus the North Carolina detail that surprises people.";
const MINUTES = 5;
const UPDATED = "October 8, 2026";

const ANSWER =
  "A 529 lets savings grow tax-deferred, and qualified withdrawals are tax-free federally and in North Carolina. Contributions are not federally deductible. North Carolina offers no state income tax deduction for 529 contributions.";

const SECTIONS: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "What a 529 is",
    paragraphs: [
      "A 529 is an account built for education expenses. You contribute after-tax dollars and choose investments inside the account.",
      "Qualified withdrawals cover tuition, books, supplies, and room and board for enrolled students.",
    ],
  },
  {
    heading: "The tax treatment",
    paragraphs: [
      "Growth inside the account is tax-deferred. Withdrawals for qualified education expenses are tax-free at the federal level and in North Carolina.",
      "Non-qualified withdrawals face income tax plus a penalty on the earnings. Use the money for education and the tax benefits hold.",
    ],
  },
  {
    heading: "The North Carolina detail",
    paragraphs: [
      "North Carolina offers no state income tax deduction for 529 contributions. The deduction ended in 2014.",
      "The federal tax treatment applies no matter which state you live in. That is the core benefit of the account.",
    ],
  },
  {
    heading: "Who controls the account",
    paragraphs: [
      "Every 529 has an owner and a beneficiary. The owner controls the money and can change the beneficiary to another family member.",
      "You keep control the whole time. The student never owns the account.",
    ],
  },
  {
    heading: "529 vs Roth for college",
    paragraphs: [
      "A Roth IRA can also help pay for education, under different rules. The two accounts serve different jobs.",
    ],
  },
];

const SOURCES = [
  { label: "SEC: An Introduction to 529 Plans", href: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/introduction-529-plans-investor-bulletin" },
];

const FAQ = [
  {
    q: "What counts as a qualified education expense?",
    a: "Tuition, fees, books, supplies, and room and board for enrolled students. Some K-12 tuition also qualifies under federal rules.",
  },
  {
    q: "What if my child does not go to college?",
    a: "Change the beneficiary to another family member, or use the account for your own education. Non-qualified withdrawals pay tax and a penalty on earnings.",
  },
  {
    q: "Can I open a 529 before my child is born?",
    a: "Yes. Open the account with yourself as beneficiary, then transfer it to the child later.",
  },
  {
    q: "Does a 529 hurt financial aid chances?",
    a: "A parent-owned 529 counts as a parental asset in federal aid formulas. Parental assets get lighter treatment than student-owned assets.",
  },
];

export const metadata: Metadata = wealthMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function College529SavingsBasicsPage() {
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
        eyebrow="College"
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
                {section.heading === "529 vs Roth for college" ? (
                  <p>
                    <Link href="/wealth/529-vs-roth-for-college">Read the 529 vs Roth for college comparison.</Link>
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

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article</p>
            <h2 className="w-h3">529 vs Roth for college</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Two accounts, two different jobs. A side-by-side look at saving for education in a 529 or a Roth IRA.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/529-vs-roth-for-college" className="w-btn">
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
          { href: "/wealth/529-vs-roth-for-college", label: "529 vs Roth for College", kind: "Article" },
          { href: "/wealth/teens-first-job-money-guide", label: "Your First Job: A Teen Money Guide", kind: "Article" },
        ]}
      />
    </main>
  );
}
