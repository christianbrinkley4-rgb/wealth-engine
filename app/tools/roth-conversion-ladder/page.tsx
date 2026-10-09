import { ToolTracking } from "../_components/tool-tracking";
import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ToolHeader } from "../_components/tool-header";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { RothConversionLadder } from "./RothConversionLadder";

const path = "/tools/roth-conversion-ladder";
const description =
  "Fill your tax bracket with Roth conversions year by year until RMD age. Uses the real 2026 federal brackets, with a lifetime tax comparison.";

export const metadata: Metadata = {
  title: { absolute: "Roth Conversion Planner | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Roth conversion multi-year planner", description, path }),
};


export default function RothConversionLadderPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Roth conversion planner", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Roth conversion multi-year planner",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Roth conversion planner" }]} title="Roth conversions, year by year" lede="Explore conversion timing using the stated assumptions, then discuss it with a tax professional." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolTracking toolId="roth_conversion_ladder"><RothConversionLadder /></ToolTracking>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Enter your birth year. It sets your RMD age under SECURE 2.0: 73 or 75.",
          "Pick your filing status and the bracket you are in this year. That sets the top the tool fills to.",
          "Enter your other yearly income and your pre-tax balance.",
          "Set your expected retirement rate and growth rate, then read the year-by-year plan and the lifetime tax comparison.",
        ]}
        formula={{
          label: "The formula",
          expression:
            "Headroom = top of your current bracket - your other taxable income\n\nEach year:\n  Grown balance = balance x (1 + growth rate)\n  Conversion = the smaller of (grown balance, headroom)\n  Tax on conversion = conversion x current bracket rate\n  Balance left = grown balance - conversion\n\nTax with the plan = conversion taxes paid\n  + (balance left at RMD age x retirement rate)\nTax without the plan = full grown balance x retirement rate\nLifetime savings = tax without - tax with",
          note: "When your other income fills the whole bracket, headroom is zero and that year's conversion is zero. Conversion taxes come from outside funds.",
        }}
      >
        <p>
          <strong>Your RMD age</strong> comes from SECURE 2.0: 73 if you were born between 1951 and
          1959, 75 if you were born in 1960 or later. Every year between now and then is one
          conversion year.
        </p>
        <p>
          <strong>Bracket fill:</strong> each year your pre-tax balance grows at your assumed rate,
          then the tool converts the smaller of two numbers: the remaining balance, or the gap
          between your other taxable income and the top of your current bracket. That keeps every
          conversion dollar inside your current bracket, taxed at that rate.
        </p>
        <p>
          <strong>Lifetime comparison:</strong> with conversions, lifetime tax is the tax paid on all
          conversions plus your retirement-bracket rate on whatever pre-tax balance is left at RMD
          age. Without conversions, it is your retirement-bracket rate on the whole balance grown to
          RMD age. The difference is the estimated savings.
        </p>
        <p>
          The model assumes bracket tops stay fixed, your other income is flat each year,
          conversion taxes are paid from outside funds, and growth is the same either way. It is a
          simplified model for education, not tax advice.
        </p>
      </MathSection>

      <div className="bg-white px-4">
        <div className="app-shell max-w-3xl py-10">
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/roth-ira-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Roth IRA, explained without jargon"
        wealthBody="What a Roth actually is, how the tax trade works, and who it fits. Five minutes, plain English."
        ctaHeading="The numbers raised a question? Bring it to me"
        ctaBody="A calculator shows you the arithmetic. A free 20-minute call puts it next to your real tax picture, your timeline, and what the answer means for you."
        related={[
          { href: "/tools/roth-vs-traditional", label: "Roth vs traditional calculator" },
          { href: "/guides/roth-conversion-ladder-explained", label: "Roth conversion ladder, explained" },
          { href: "/wealth/401k-explained", label: "Your 401(k), explained" },
        ]}
      />
    </main>
  );
}
