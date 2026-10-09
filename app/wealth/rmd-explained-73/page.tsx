import { EditorialNote, ArticleContents } from "@/app/components/EditorialNote";
import { SOURCES as PRIMARY } from "@/lib/editorial";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/rmd-explained-73";
const title = "RMDs at 73, Explained in Plain English";
const description =
  "What required minimum distributions are, why the IRS requires them, and how the yearly math works.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Do RMDs apply to Roth IRAs?",
    a: "No. Roth IRAs have no RMDs while the original owner is alive. Beneficiaries who inherit a Roth follow separate rules.",
  },
  {
    q: "Are RMDs taxed?",
    a: "The taxable portion counts as ordinary income. Previously taxed contributions can make part of a withdrawal tax-free.",
  },
  {
    q: "Can I take my RMD as one withdrawal?",
    a: "Yes. The IRS only sets the deadline and the minimum amount. You can take it monthly, quarterly, or all at once.",
  },
  {
    q: "What if I am still working at 73?",
    a: "Some workplace plans allow a delay until retirement. Owners of more than 5% of the business cannot use this exception. IRA rules differ.",
  },
];

const sources: Array<{ label: string; href: string }> = [
  {
    label: "IRS: Retirement plan and IRA required minimum distributions FAQs",
    href: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
  },
  PRIMARY.distributions,
  {
    label: "Federal regulations: RMD starting ages",
    href: "https://www.ecfr.gov/current/title-26/section-1.401(a)(9)-2",
  },
  {
    label: "IRS proposed rules: the 1959 birth cohort",
    href: "https://www.federalregister.gov/documents/2024/07/19/2024-14543/required-minimum-distributions",
  },
];

export default function RmdExplainedPage() {
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
        eyebrow="Retirement basics"
        title={title}
        lede={description}
        crumbs={[{ name: "RMDs", path }]}
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
            <span>Short answer</span>A required minimum distribution is the smallest amount you must
            withdraw each year from tax-deferred retirement accounts like a traditional IRA or
            401(k). The starting age depends on your birth year. The amount comes from your balance
            and a life-expectancy factor in IRS tables.
          </p>

          <ArticleContents
            items={[
              { id: "read-0", label: "Your birth year and account matter" },
              { id: "read-1", label: "What an RMD is" },
              { id: "read-2", label: "When RMDs start" },
              { id: "read-3", label: "How the yearly math works" },
              { id: "read-4", label: "If you miss one" },
            ]}
          />
          <div className="w-prose">
            <section>
              <h2 id="read-0">Your birth year and account matter</h2>
              <p>
                People born in 1960 or later generally begin at age 75. Earlier birth years have
                different starting rules.
              </p>
              <p>
                Inherited accounts follow separate rules. Do not apply the original owner schedule
                to an inherited IRA without checking the beneficiary requirements.
              </p>
              <p>
                The Uniform Lifetime Table is not always the right table. A much younger spouse who
                is the sole beneficiary can change the calculation.
              </p>
              <p>
                Calculate each account separately. Some IRA distributions can be combined, but
                workplace-plan distributions generally cannot be substituted for each other.
              </p>
            </section>
            <section>
              <h2 id="read-1">What an RMD is</h2>
              <p>
                Tax-deferred accounts let your money grow without yearly income tax. The IRS only
                deferred that tax. It did not cancel it. An RMD forces withdrawals to start so the
                tax gets collected over your retirement.
              </p>
              <p>
                Roth IRAs and designated Roth workplace accounts have no lifetime RMDs for their
                owners. Traditional accounts generally do.
              </p>
            </section>

            <section>
              <h2 id="read-2">When RMDs start</h2>
              <p>
                RMDs begin at age 73 for people born between 1951 and 1958. IRS proposed rules also
                use 73 for 1959 births. Confirm current guidance for that cohort. Your first RMD is
                due by April 1 of the year after you turn 73. Every RMD after that is due by
                December 31.
              </p>
              <p>
                Delaying the first one to April 1 means two withdrawals land in the same tax year.
                The taxable portions count as income that year.
              </p>
            </section>

            <section>
              <h2 id="read-3">How the yearly math works</h2>
              <p>
                The IRS publishes life-expectancy tables in Publication 590-B. You find the factor
                for your age, then divide last December 31 balance by that factor.
              </p>
              <p>
                Here is the arithmetic with round numbers: a hypothetical $265,000 balance divided
                by 26.5 gives a $10,000 RMD. That is the Uniform Lifetime Table factor at age 73.
                The factor shrinks each year, so the required withdrawal grows as a share of the
                balance.
              </p>
              <p>
                You can always withdraw more than the minimum. Extra withdrawals do not reduce
                future RMDs.
              </p>
            </section>

            <section>
              <h2 id="read-4">If you miss one</h2>
              <p>
                The IRS charges an excise tax on the amount you failed to withdraw. Under SECURE 2.0
                that penalty is 25% of the shortfall. It drops to 10% when you correct the mistake
                within the applicable correction window. An IRS notice can end that window earlier
                than two years.
              </p>
              <p>This page explains the concept. It is not tax advice for your situation.</p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article · 7 min</p>
            <h2 className="w-h3">Social Security, Explained in Plain English</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              RMDs are one stream of retirement income. Here is how Social Security fits beside
              them.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/social-security-explained" className="w-btn">
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
            href: "/wealth/social-security-explained",
            label: "Social Security, Explained",
            kind: "Article",
          },
          {
            href: "/wealth/529-vs-roth-for-college",
            label: "529 vs. Roth IRA for College",
            kind: "Article",
          },
        ]}
      />
    </main>
  );
}
