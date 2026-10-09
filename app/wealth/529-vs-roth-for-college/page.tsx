import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/529-vs-roth-for-college";
const title = "529 vs. Roth IRA for College";
const description =
  "Two ways to fund education compared plainly: the 529 plan and the Roth IRA, plus the SECURE 2.0 rollover.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Does North Carolina give a tax break for 529 contributions?",
    a: "No. North Carolina offers no state income tax deduction for 529 contributions. The federal tax-free growth and qualified withdrawals still apply.",
  },
  {
    q: "Can I use a Roth IRA for college and retirement?",
    a: "Yes. Contributions come out tax-free for any purpose, so money not needed for college simply stays in your retirement savings.",
  },
  {
    q: "What counts as a qualified 529 expense?",
    a: "Tuition, books, supplies, and room and board at eligible schools. Non-qualified withdrawals face income tax plus a 10% penalty on the earnings.",
  },
  {
    q: "How does the 529-to-Roth rollover work?",
    a: "Unused 529 funds can roll into the beneficiary's Roth IRA, up to a $35,000 lifetime cap. The account must be at least 15 years old, and annual Roth limits apply.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "IRS: Roth IRAs",
    href: "https://www.irs.gov/retirement-plans/roth-iras",
  },
  {
    label: "Saving for College: 529 to Roth IRA rollover rules",
    href: "https://www.savingforcollege.com/article/roll-over-529-plan-funds-to-a-roth-ira",
  },
];

export default function FiveTwentyNineVsRothPage() {
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
        eyebrow="College savings"
        title={title}
        lede={description}
        crumbs={[{ name: "529 vs. Roth IRA", path }]}
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
            A 529 plan grows tax-free and comes out tax-free when spent on education. A Roth IRA
            grows tax-free too, and you can withdraw contributions anytime for any reason. North
            Carolina offers no state tax deduction for 529 contributions. SECURE 2.0 added a path to
            roll unused 529 money into a Roth IRA, capped at $35,000 lifetime.
          </p>

          <div className="w-prose">
            <section>
              <h2>How a 529 works</h2>
              <p>
                A 529 is a state-run account built for education savings. <Link href="/tools/compound-interest">Growth inside the account is
                tax-deferred</Link>, and withdrawals for qualified education costs are tax-free.
              </p>
              <p>
                Qualified costs include tuition, books, and room and board at eligible schools. North
                Carolina offers no state income tax deduction for 529 contributions.
              </p>
              <p>
                Non-education withdrawals face income tax plus a 10% penalty on the earnings. That
                penalty is the part that makes families hesitate to overfund.
              </p>
            </section>

            <section>
              <h2>How a Roth IRA works for education</h2>
              <p>
                <Link href="/wealth/roth-ira-explained">A Roth IRA</Link> is a retirement account funded with after-tax dollars. You can withdraw
                your contributions at any time, for any reason, with no tax or penalty.
              </p>
              <p>
                Earnings follow stricter rules and can face tax and penalties if withdrawn early.
                That contribution flexibility is why some families use a Roth as a backup education
                fund.
              </p>
            </section>

            <section>
              <h2>Comparing the two</h2>
              <p>
                The 529 wins on education-specific tax treatment: tax-free growth and tax-free
                qualified withdrawals. The Roth wins on flexibility: contributions come back out for
                any purpose.
              </p>
              <p>
                A 529 locks the tax break to education. A Roth keeps the money usable for retirement
                if college costs less. Neither choice is right for everyone. This page compares them,
                it does not pick one.
              </p>
            </section>

            <section>
              <h2>The SECURE 2.0 rollover</h2>
              <p>
                Since 2024, unused <Link href="/wealth/529-college-savings-basics">529</Link> money can roll into the beneficiary&apos;s Roth IRA. The
                lifetime cap is $35,000 per beneficiary.
              </p>
              <p>
                The 529 account must be open at least 15 years, and recent contributions do not
                qualify. Yearly rollovers count against the annual Roth IRA contribution limit, and
                the beneficiary needs earned income.
              </p>
              <p>
                This eases the fear of overfunding a 529, but the rules are strict. Read them before
                counting on it.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">Now try it · Calculator · 1 min</p>
            <h2 className="w-h3">Compound interest</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              College savings grow with time. Drag the sliders and see what starting early changes.
            </p>
            <div className="w-btn-row">
              <Link href="/tools/compound-interest" className="w-btn">
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
          { href: "/wealth/529-college-savings-basics", label: "529 College Savings Basics", kind: "Article" },
          { href: "/wealth/roth-ira-explained", label: "Roth IRA, Explained", kind: "Article" },
        ]}
      />
    </main>
  );
}
