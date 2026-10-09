import { EditorialNote, ArticleContents } from "@/app/components/EditorialNote";
import { SOURCES as PRIMARY } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/hsa-explained";
const title = "The HSA, Explained in Plain English";
const description =
  "What a Health Savings Account is, how the triple tax break works, and the 2026 contribution limits.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Can I invest the money in my HSA?",
    a: "Some HSA providers offer investments, sometimes with a minimum balance. Check account terms and fees. Investment values can fall. Federal earnings are tax-free.",
  },
  {
    q: "What happens to my HSA if I change jobs?",
    a: "Nothing changes. The account is yours, not your employer's. Contributions require eligible coverage and compliance with the other IRS eligibility rules.",
  },
  {
    q: "Can I use HSA money for my spouse or kids?",
    a: "Yes. Qualified medical expenses for a spouse and dependents count, even if they are not on your health plan.",
  },
  {
    q: "Is there a deadline to spend HSA money?",
    a: "No. Unused money rolls over every year with no expiration. It stays available for future medical costs.",
  },
];

const sources: Array<{ label: string; href: string }> = [
  {
    label: "IRS Publication 969, Health Savings Accounts and Other Tax-Favored Health Plans",
    href: "https://www.irs.gov/publications/p969",
  },
  PRIMARY.hsa,
  PRIMARY.hsaChanges,
];

export default function HsaExplainedPage() {
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-08",
          dateModified: "2026-10-09",
          citations: sources.map((source) => source.href),
        })}
      />
      <PageHead
        eyebrow="Health money"
        title={title}
        lede={description}
        crumbs={[{ name: "HSA", path }]}
      >
        <ul className="w-meta">
          <li>6 min read</li>
          <li>Updated October 9, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            An HSA is a savings account for medical costs with three tax breaks: contributions are
            tax-free, growth is tax-free, and medical withdrawals are tax-free. You must be enrolled
            in a qualifying high-deductible health plan to contribute. In 2026 the limits are $4,400
            for self-only coverage and $8,750 for family coverage.
          </p>

          <ArticleContents
            items={[
              { id: "read-0", label: "Check eligibility before contributing" },
              { id: "read-1", label: "What an HSA is" },
              { id: "read-2", label: "The triple tax advantage" },
              { id: "read-3", label: "The 2026 numbers" },
              { id: "read-4", label: "How it differs from an FSA" },
              { id: "read-5", label: "After 65" },
            ]}
          />
          <div className="w-prose">
            <section>
              <h2 id="read-0">Check eligibility before contributing</h2>
              <p>
                Medicare enrollment generally ends HSA contribution eligibility. Disqualifying
                additional coverage or being claimable as a dependent can also prevent
                contributions.
              </p>
              <p>
                Beginning in 2026, eligible bronze and catastrophic plans receive special HSA
                treatment. They need not satisfy every ordinary high-deductible-plan limit.
              </p>
              <p>
                Employer deposits count toward your annual contribution limit. Eligibility changes
                during the year can reduce that limit or trigger testing-period rules.
              </p>
              <p>
                Keep receipts for qualified expenses. A withdrawal for an ineligible expense can
                create income tax and an additional tax.
              </p>
            </section>
            <section>
              <h2 id="read-1">What an HSA is</h2>
              <p>
                A Health Savings Account is a tax-advantaged account for paying medical costs. You
                contribute money, it can grow through investments, and you withdraw it for qualified
                medical expenses. The account is yours for life, even if you change jobs or retire.
              </p>
            </section>

            <section>
              <h2 id="read-2">The triple tax advantage</h2>
              <p>
                Break one: contributions go in pre-tax or tax-deductible, which lowers your taxable
                income. Break two: the money grows tax-free while it sits in the account. Break
                three: withdrawals for qualified medical expenses come out tax-free.
              </p>
              <p>These are federal tax rules. State tax treatment can differ.</p>
            </section>

            <section>
              <h2 id="read-3">The 2026 numbers</h2>
              <p>
                For 2026 you can contribute up to $4,400 with self-only coverage. The family
                coverage limit is $8,750. At age 55 or older you can add a $1,000 catch-up on top of
                your limit.
              </p>
              <p>
                The plan behind it must qualify as a high-deductible health plan. The 2026 minimum
                deductible is $1,700 for self-only and $3,400 for family coverage. Any money your
                employer puts in counts toward your limit too.
              </p>
            </section>

            <section>
              <h2 id="read-4">How it differs from an FSA</h2>
              <p>
                HSA money rolls over year after year with no deadline. Many FSAs have a
                use-it-or-lose-it rule, so unspent money can disappear. The HSA also travels with
                you when you switch employers.
              </p>
              <p>
                The tradeoff: you need that qualifying high-deductible plan to contribute. The two
                accounts follow different contribution rules.
              </p>
            </section>

            <section>
              <h2 id="read-5">After 65</h2>
              <p>
                Once you enroll in Medicare you can no longer contribute to an HSA. Money already in
                the account stays available for medical costs.
              </p>
              <p>
                Before 65, non-medical withdrawals face income tax plus a penalty. After 65 the
                penalty ends and non-medical withdrawals are simply taxed as income.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article · 5 min</p>
            <h2 className="w-h3">Health Insurance Basics</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              An HSA starts with the right health plan. See how high-deductible plans work before
              you pick one.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/health-insurance-basics" className="w-btn">
                Read it <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <EditorialNote sources={sources} />
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
          {
            href: "/wealth/health-insurance-basics",
            label: "Health Insurance Basics",
            kind: "Article",
          },
          {
            href: "/wealth/side-hustle-taxes",
            label: "Side-Hustle Taxes, Explained",
            kind: "Article",
          },
        ]}
      />
    </main>
  );
}
