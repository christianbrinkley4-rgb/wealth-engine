import { TrafficGuideLinks } from "@/app/components/TrafficGuideLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/side-hustle-taxes";
const title = "Side-Hustle Taxes, Explained in Plain English";
const description =
  "Self-employment tax at 15.3%, tracking income and expenses, and the quarterly estimated payment system.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Do I owe taxes if no one sends me a 1099?",
    a: "Yes. Every dollar of net earnings counts, whether or not a form arrives. The form is the payer's paperwork, not your tax trigger.",
  },
  {
    q: "Can I deduct business expenses?",
    a: "Yes. Ordinary and necessary expenses for the work reduce your net earnings, which lowers both income tax and self-employment tax.",
  },
  {
    q: "What if my side hustle loses money?",
    a: "A net loss can offset other income on your return, within IRS rules. Track expenses carefully either way.",
  },
  {
    q: "Do I need estimated payments in my first year?",
    a: "The IRS expects payments as income arrives, even in year one. The concept is simple: pay during the year, settle up at filing.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "IRS: Small business and self-employed FAQs",
    href: "https://www.irs.gov/faqs/small-business-self-employed-other-business",
  },
  {
    label: "IRS: Instructions for Schedule SE",
    href: "https://www.irs.gov/instructions/i1040sse",
  },
];

export default function SideHustleTaxesPage() {
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-08",
          dateModified: "2026-10-08",
        })}
      />
      <PageHead
        eyebrow="Taxes, plain English"
        title={title}
        lede={description}
        crumbs={[{ name: "Side-hustle taxes", path }]}
      >
        <ul className="w-meta">
          <li>6 min read</li>
          <li>Updated October 8, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            Side-hustle income faces the same income tax as wages, plus a 15.3% self-employment tax
            that covers Social Security and Medicare. Nobody withholds it for you, so you track
            income and expenses yourself. The IRS expects quarterly estimated payments as the income
            comes in.
          </p>

          <div className="w-prose">
            <section>
              <h2>Two taxes, not one</h2>
              <p>
                W-2 wages split payroll taxes between you and your employer. Self-employed workers
                pay both halves themselves.
              </p>
              <p>
                That combined rate is 15.3%: 12.4% for Social Security and 2.9% for Medicare. The
                Social Security half applies to net earnings up to the $184,500 wage base for 2026.
                The Medicare half has no wage cap.
              </p>
              <p>
                On top of that, your net profit faces ordinary income tax like any other income. This
                page explains the concept, not your tax bill.
              </p>
            </section>

            <section>
              <h2>What counts</h2>
              <p>
                The tax applies to net earnings: income minus ordinary business expenses. Track every
                payment you receive and every receipt you spend.
              </p>
              <p>
                Self-employment tax kicks in at $400 of net earnings for the year. Income tax
                applies too, once your total income passes the filing threshold.
              </p>
            </section>

            <section>
              <h2>Paying as you go</h2>
              <p>
                Nobody withholds tax from freelance payments. The IRS runs a pay-as-you-go system for
                everyone, employees included.
              </p>
              <p>
                Employees pay through withholding. Self-employed people pay through quarterly
                estimated payments. Four times a year you send the IRS a payment covering income tax
                and self-employment tax on recent earnings.
              </p>
              <p>Miss the rhythm and you can face an underpayment penalty at filing time.</p>
            </section>

            <section>
              <h2>The forms</h2>
              <p>
                Schedule C reports your business income and expenses on your tax return. Schedule SE
                figures the self-employment tax from your net earnings. Both ride along with your
                regular Form 1040.
              </p>
              <p>A separate bank account or a simple spreadsheet makes April far less painful.</p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">Now try it · Quiz · 1 min</p>
            <h2 className="w-h3">What do I do with my first $1,000?</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Side income starts somewhere. Answer a few honest questions and leave with a short
              plan to think over.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/quiz/first-1000" className="w-btn">
                Open it <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>Sources</h2>
            <ul>
              {sources.map((source) => (
                <li key={source.label}>
                  {source.href ? (
                    <a href={source.href} rel="noopener">
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <EducationNote />

          <section className="w-section">
            <div style={{ textAlign: "center" }}>
              <p className="w-eyebrow">Talk it through</p>
              <h2 className="w-h2">Questions about your own money?</h2>
              <p>A free, no-obligation chat with Christian. No pressure and no sales pitch.</p>
              <div className="w-btn-row" style={{ justifyContent: "center" }}>
                <Link href="/start" className="w-btn">
                  Start here <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
              <p style={{ marginTop: 18 }}>
                Christian Brinkley, Greensboro, NC,{" "}
                <a href={WEALTH_FACTS.phoneHref}>{WEALTH_FACTS.phone}</a>
              </p>
            </div>
          </section>
        </div>
      </article>

      <Faq items={faqItems} />
      <NextUp
        title="Read next"
        links={[
          { href: "/wealth", label: "Wealth home", kind: "Hub" },
          { href: "/wealth/hsa-explained", label: "The HSA, Explained in Plain English", kind: "Article" },
          { href: "/wealth/529-vs-roth-for-college", label: "529 vs. Roth IRA for College", kind: "Article" },
        ]}
      />
    <TrafficGuideLinks
        slugs={["1099-k-personal-items-sold-at-loss", "teen-tax-return-dependent", "estimated-quarterly-taxes-guide", "1099-vs-w2-classification", "tax-deductions-side-hustlers-miss", "tip-income-reporting-rules"]}
      />
    </main>
  );
}
