import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/social-security-explained";
const title = "Social Security, Explained in Plain English";
const description =
  "How Social Security works: where the money comes from, how your benefit is set, and what full retirement age really means.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Is Social Security enough to live on in retirement?",
    a: "The average retired worker gets $2,071 a month in 2026. That covers some bills, not a full budget. SSA designed it as one leg of retirement income, alongside savings and any pension.",
  },
  {
    q: "Does my benefit keep up with inflation?",
    a: "SSA applies a cost-of-living adjustment most years. The 2026 adjustment was 2.8%. Some years the adjustment is zero.",
  },
  {
    q: "What if I never worked enough to qualify?",
    a: "You need 40 work credits, roughly 10 years of work, to qualify on your own record. Spouses and survivors follow separate rules.",
  },
  {
    q: "Are Social Security benefits taxed?",
    a: "Part of your benefits can be subject to income tax, depending on total income. IRS Publication 915 covers the exact rules.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "SSA 2026 COLA fact sheet (benefit amounts, wage base)",
    href: "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf",
  },
];

export default function SocialSecurityExplainedPage() {
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
        eyebrow="Retirement basics"
        title={title}
        lede={description}
        crumbs={[{ name: "Social Security", path }]}
      >
        <ul className="w-meta">
          <li>7 min read</li>
          <li>Updated October 8, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            Social Security is a federal program that pays monthly income to retired workers who paid
            payroll taxes during their careers. Your benefit is based on your 35 highest-earning
            years. Filing early shrinks the check. Waiting past full retirement age grows it, up to
            age 70.
          </p>

          <div className="w-prose">
            <section>
              <h2>Where the money comes from</h2>
              <p>
                Every paycheck, workers and employers each pay 6.2% of wages into Social Security. In
                2026 that tax applies to the first $184,500 of earnings. That money pays benefits to
                current retirees, not to a personal account in your name.
              </p>
              <p>
                Medicare runs on a separate 1.45% payroll tax with no wage cap. Social Security and
                Medicare are separate programs with separate trust funds.
              </p>
            </section>

            <section>
              <h2>How your benefit is set</h2>
              <p>
                SSA looks at your 35 highest-earning years and adjusts them for wage growth. It
                averages those years, then runs them through a benefit formula. The result is your
                full monthly benefit at full retirement age.
              </p>
              <p>
                Fewer than 35 years of earnings means some zero years enter the average, and that
                lowers the result.
              </p>
            </section>

            <section>
              <h2>What full retirement age means</h2>
              <p>
                Full retirement age is 67 for anyone born in 1960 or later. It is the anchor SSA uses
                to set your benefit, so filing at that age gets the full amount.
              </p>
              <p>
                Filing at 62 is the earliest option, and it permanently reduces your monthly check.
                Every year you wait past full retirement age increases the check, up to age 70. After
                70, waiting gains you nothing.
              </p>
              <p>
                This page explains the mechanics. It is not a recommendation about when you should
                file.
              </p>
            </section>

            <section>
              <h2>The 2026 numbers</h2>
              <p>
                The Social Security wage base for 2026 is $184,500. Earnings above that are not taxed
                for Social Security that year.
              </p>
              <p>
                The maximum monthly benefit at full retirement age in 2026 is $4,152. Reaching it
                takes roughly 35 years of earnings at or above the wage base. The average retired
                worker gets $2,071 a month.
              </p>
            </section>

            <section>
              <h2>Working while collecting</h2>
              <p>
                SSA reduces benefits for some workers who earn above a limit before full retirement
                age. The reduction ends once you reach full retirement age. SSA then recalculates
                your benefit to credit back the months that were withheld.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article · 6 min</p>
            <h2 className="w-h3">Required Minimum Distributions at 73</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Social Security is one stream of retirement income. RMDs are another. See how the IRS
              sets a withdrawal deadline at 73.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/rmd-explained-73" className="w-btn">
                Read it <ArrowRight size={18} aria-hidden />
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
          { href: "/wealth/rmd-explained-73", label: "Required Minimum Distributions at 73", kind: "Article" },
          { href: "/wealth/hsa-explained", label: "The HSA, Explained in Plain English", kind: "Article" },
        ]}
      />
    </main>
  );
}
