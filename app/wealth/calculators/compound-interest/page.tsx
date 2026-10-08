import type { Metadata } from "next";

import { CompoundCalculator } from "@/app/wealth/calculators/compound-interest/CompoundCalculator";
import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";

const path = "/wealth/calculators/compound-interest";
const description =
  "Free compound interest calculator with live sliders. See your balance grow year by year, and what starting at 22 instead of 32 is worth.";

export const metadata: Metadata = wealthMetadata({
  title: "Compound Interest Calculator",
  description,
  path,
});

const FAQ = [
  {
    q: "What is compound interest?",
    a: "It's growth on top of growth. Your money earns a return, then that return earns its own return. Over long stretches most of the final balance can come from growth, not from what you deposited.",
  },
  {
    q: "How does this calculator do the math?",
    a: "It compounds monthly. Each month the balance grows by one twelfth of the yearly rate you set, then your monthly contribution is added. It repeats that for every month in the timeline.",
  },
  {
    q: "What return should I use?",
    a: "That's your call, and nobody knows the future number. Try a few. A low rate, a middle one and a high one show you a range instead of a single guess. A savings account and a stock fund behave very differently, and investments can lose money.",
  },
  {
    q: "Why does starting ten years earlier matter so much?",
    a: "Starting 10 years earlier adds 120 deposits. Those deposits also get more time to grow. At 0% return, the entire gap is deposits.",
  },
  {
    q: "Does this include taxes, fees or inflation?",
    a: "No. It's the plain math. Taxes depend on the account type, fees depend on what you hold, and inflation means future dollars buy less than today's.",
  },
] as const;

export default function CompoundInterestPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "Compound interest calculator", description, path })} />
      <PageHead
        eyebrow="Calculator"
        title={
          <>
            Compound interest, <span className="w-mark">live.</span>
          </>
        }
        lede="Drag the sliders. The curve redraws as you go. Then scroll down to see what waiting costs."
        crumbs={[
          { name: "Calculators", path: "/wealth/calculators" },
          { name: "Compound interest", path },
        ]}
      />
      <section className="w-section-tight">
        <div className="w-shell">
          <CompoundCalculator />
        </div>
      </section>

      <section className="w-section">
        <div className="w-shell w-narrow w-prose">
          <h2>How to read this</h2>
          <p>
            The solid line is your balance. The dotted line is what you actually put in. The space between
            them is growth. Early on the lines hug each other. Later they split, and the gap gets wide fast.
            That bend is compounding.
          </p>
          <h2>Three things that move the number</h2>
          <ol>
            <li>
              <strong>Time.</strong> Slide years from 20 to 40 and watch. More years add more deposits
              and more time for growth at a positive rate.
            </li>
            <li>
              <strong>The amount.</strong> Start with $0 and double the monthly amount. That doubles the result.
            </li>
            <li>
              <strong>The rate.</strong> Small changes add up over decades. It&apos;s also the one you
              don&apos;t control.
            </li>
          </ol>
          <h2>What it can&apos;t tell you</h2>
          <p>
            This is a steady-rate model. Real life isn&apos;t steady. Some years are up, some are down, and
            the order matters. Use it to understand the shape of the curve, not to predict a balance.
          </p>
          <EducationNote />
        </div>
      </section>

      <Faq items={FAQ} title="Compound interest, quick answers" />
      <NextUp
        links={[
          { href: "/wealth/calculators/roth-vs-traditional", label: "Roth vs traditional", kind: "Calculator" },
          { href: "/wealth/quiz/first-1000", label: "What do I do with my first $1,000?", kind: "Quiz" },
          { href: "/wealth/learn/what-is-a-roth-ira", label: "What a Roth IRA actually is", kind: "Article" },
        ]}
      />
    </main>
  );
}
