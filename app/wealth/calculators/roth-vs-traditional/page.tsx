import type { Metadata } from "next";
import Link from "next/link";

import { RothCompare } from "@/app/wealth/calculators/roth-vs-traditional/RothCompare";
import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";

const path = "/wealth/calculators/roth-vs-traditional";
const description =
  "Roth vs traditional, explained first and calculated second. See how your tax rate now and later decides which one leaves you more to spend.";

export const metadata: Metadata = wealthMetadata({
  title: "Roth vs Traditional Calculator",
  description,
  path,
});

const FAQ = [
  {
    q: "What is the difference between Roth and traditional?",
    a: "It's when you pay income tax. Traditional: your contribution may lower your taxable income today, and withdrawals are taxed later. Roth: you contribute money that's already been taxed, and qualified withdrawals are tax-free.",
  },
  {
    q: "Which is better, Roth or traditional?",
    a: "Neither is better across the board. Lower tax rate now than at withdrawal: Roth wins. Higher now: traditional wins. Equal rates: they tie. The catch is that nobody knows their future rate for sure.",
  },
  {
    q: "What are the 2026 contribution limits?",
    a: "For 2026 the IRS limit is $7,500 for IRAs and $24,500 for 401(k) plans if you're under 50. Roth IRA contributions phase out at higher incomes: $153,000 to $168,000 for single filers and $242,000 to $252,000 for married couples filing jointly.",
  },
  {
    q: "Can I have both a Roth and a traditional account?",
    a: "Yes. Plenty of people hold both: a traditional 401(k) at work and a Roth IRA on their own. The IRA limit is shared across all your IRAs.",
  },
  {
    q: "Is this calculator tax advice?",
    a: "No. It uses one flat rate on each side to show the idea. Real taxes have brackets, deductions and rules that depend on your situation. A tax professional can look at your actual numbers.",
  },
] as const;

export default function RothVsTraditionalPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "Roth vs traditional calculator", description, path })} />
      <PageHead
        eyebrow="Explainer + calculator"
        title={
          <>
            Roth vs traditional: <span className="w-mark">tax now or tax later.</span>
          </>
        }
        lede="Read the 60-second version first. Then drag the two tax sliders and watch the answer flip."
        crumbs={[
          { name: "Calculators", path: "/wealth/calculators" },
          { name: "Roth vs traditional", path },
        ]}
      />

      <section className="w-section-tight">
        <div className="w-shell">
          <div className="w-grid">
            <div className="w-card">
              <p className="w-eyebrow">Roth</p>
              <h2 className="w-h3">Pay tax now. Take it out tax-free.</h2>
              <p style={{ margin: "10px 0 0" }}>
                You put in money that&apos;s already been taxed. It grows. Qualified withdrawals in retirement
                aren&apos;t taxed again.
              </p>
            </div>
            <div className="w-card">
              <p className="w-eyebrow">Traditional</p>
              <h2 className="w-h3">Skip tax now. Pay it later.</h2>
              <p style={{ margin: "10px 0 0" }}>
                Your contribution may lower your taxable income today. It grows. Withdrawals are taxed as
                income when you take them.
              </p>
            </div>
          </div>
          <p className="w-answer">
            <span>The whole idea</span>
            Both are containers for retirement money. The question is which tax rate you&apos;d rather pay:
            today&apos;s or your future one. Lower now, Roth looks better. Higher now, traditional does.
          </p>
        </div>
      </section>

      <section className="w-section-tight">
        <div className="w-shell">
          <RothCompare />
        </div>
      </section>

      <section className="w-section">
        <div className="w-shell w-narrow w-prose">
          <h2>Try this</h2>
          <ol>
            <li>Set both tax sliders to the same number. The bars tie. Every time.</li>
            <li>Drop the tax rate today below the retirement rate. Roth pulls ahead.</li>
            <li>Flip them. Traditional pulls ahead.</li>
          </ol>
          <p>
            That&apos;s the lesson. The account doesn&apos;t create the difference. The gap between your two
            tax rates does.
          </p>
          <h2>Things the math leaves out</h2>
          <ul>
            <li>Roth IRA contributions (not earnings) can come out at any time without tax or penalty.</li>
            <li>Roth IRAs have income limits. Traditional IRA deductions can be limited too if you have a plan at work.</li>
            <li>An employer match is a separate question. It doesn&apos;t depend on which type you pick.</li>
            <li>Having some of each spreads out the guess about future tax rates.</li>
          </ul>
          <p>
            More on the account itself in <Link href="/wealth/learn/what-is-a-roth-ira">What a Roth IRA actually is</Link>.
            Limits come from the{" "}
            <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500">
              IRS 2026 announcement
            </a>
            .
          </p>
          <EducationNote />
        </div>
      </section>

      <Faq items={FAQ} title="Roth vs traditional, quick answers" />
      <NextUp
        links={[
          { href: "/wealth/learn/what-is-a-roth-ira", label: "What a Roth IRA actually is", kind: "Article" },
          { href: "/wealth/calculators/compound-interest", label: "Compound interest, live", kind: "Calculator" },
          { href: "/wealth/quiz/money-personality", label: "Money personality quiz", kind: "Quiz" },
        ]}
      />
    </main>
  );
}
