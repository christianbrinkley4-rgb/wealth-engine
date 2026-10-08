import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
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

const PROOF = [
  "Real 2026 federal brackets",
  "Bracket-fill plan, year by year",
  "Lifetime tax comparison",
  "Results are estimates for education",
] as const;

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

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Roth conversion planner" }]}
        eyebrow="Free tool · your numbers stay on your device"
        title="Roth conversions, year by year"
        lede="The years between retirement and required minimum distributions are a window. Each year, this tool fills your current tax bracket with a conversion, without crossing into the next one, then compares the lifetime tax bill against doing nothing."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <RothConversionLadder />
        </div>
      </section>

      <MathSection title="The math, in plain English">
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
          <ToolsDisclaimer />
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/roth-ira-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Roth IRA, explained without jargon"
        wealthBody="What a Roth actually is, how the tax trade works, and who it fits. Five minutes, plain English."
        ctaHeading="The numbers raised a question? Bring it to me"
        ctaBody="A calculator shows you the arithmetic. A free 20-minute call puts it next to your real tax picture, your timeline, and what the answer means for you."
      />
    </main>
  );
}
