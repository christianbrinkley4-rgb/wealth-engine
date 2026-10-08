import type { Metadata } from "next";
import Link from "next/link";

import { BudgetBuilder } from "@/app/wealth/calculators/budget/BudgetBuilder";
import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";

const path = "/wealth/calculators/budget";
const description =
  "Free 50/30/20 budget calculator. Enter your take-home pay, drag the sliders, and see needs, wants and savings in dollars. Download your plan.";

export const metadata: Metadata = wealthMetadata({
  title: "50/30/20 Budget Calculator: Build Your Split",
  description,
  path,
});

const FAQ = [
  {
    q: "What is the 50/30/20 budget rule?",
    a: "It splits take-home pay into three parts: 50% for needs, 30% for wants, and 20% for savings and extra debt payments. It's a starting point you adjust, not a rule you pass or fail.",
  },
  {
    q: "Should I use my salary or my take-home pay?",
    a: "Take-home pay. That's what lands in your bank account after taxes and paycheck deductions, and it's the only money you can actually budget.",
  },
  {
    q: "What if my needs are more than 50%?",
    a: "Drag the needs slider to your real number. The builder shrinks the other two to fit. A first salary or a high-rent city pushes plenty of budgets past 50%. Seeing it is step one.",
  },
  {
    q: "What does the download include?",
    a: "A small CSV file with your three buckets, the percentages, and the monthly and yearly dollar amounts. It opens in Excel or Google Sheets. It's made in your browser and isn't sent anywhere.",
  },
  {
    q: "I'm paid every two weeks. How does that work?",
    a: "Switch to Every 2 weeks and enter one paycheck. The builder multiplies by 26 paychecks and divides by 12 months to get your average month.",
  },
] as const;

export default function BudgetPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "50/30/20 budget builder", description, path })} />
      <PageHead
        eyebrow="Calculator"
        title={
          <>
            Build your <span className="w-mark">50/30/20.</span>
          </>
        }
        lede="Type what you bring home. Drag one slider and the other two make room. It always adds up to 100."
        crumbs={[
          { name: "Calculators", path: "/wealth/calculators" },
          { name: "Budget builder", path },
        ]}
      />
      <section className="w-section-tight">
        <div className="w-shell">
          <BudgetBuilder />
        </div>
      </section>

      <section className="w-section">
        <div className="w-shell w-narrow w-prose">
          <h2>Need or want? One test.</h2>
          <p>
            Would something break if you stopped paying it? Rent, yes. Car insurance, yes. The streaming
            bundle, no. Wants aren&apos;t bad. They get 30% in the classic split for a reason.
          </p>
          <h2>What to do with your three numbers</h2>
          <ol>
            <li>Add up last month&apos;s real needs from your bank statement. Compare it to the needs number here.</li>
            <li>Set an automatic transfer for the savings number, timed for payday.</li>
            <li>Whatever is left is yours to spend. No tracking every coffee.</li>
          </ol>
          <p>
            Want line-by-line detail? The <Link href="/wealth/tools#budget-spreadsheet">free budget spreadsheet</Link>{" "}
            tracks planned vs actual for every bill.
          </p>
          <EducationNote />
        </div>
      </section>

      <Faq items={FAQ} title="Budget questions, quick answers" />
      <NextUp
        links={[
          { href: "/wealth/learn/the-50-30-20-rule", label: "The 50/30/20 rule, explained", kind: "Article" },
          { href: "/wealth/calculators/debt-payoff", label: "Debt payoff: avalanche vs snowball", kind: "Calculator" },
          { href: "/wealth/tools#budget-spreadsheet", label: "Budget spreadsheet (Excel)", kind: "Download" },
        ]}
      />
    </main>
  );
}
