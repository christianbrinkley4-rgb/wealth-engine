import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { DataFreshness } from "@/app/components/DataFreshness";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { RothVsTraditional } from "./RothVsTraditional";

const path = "/tools/roth-vs-traditional";
const description =
  "Free Roth vs traditional calculator. Put the same paycheck dollars in both, using the real 2026 IRA limits, and see which leaves more after tax.";

export const metadata: Metadata = {
  title: { absolute: "Roth vs Traditional Calculator | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Roth vs traditional calculator", description, path }),
};

const PROOF = [
  "2026 IRA limits built in",
  "Same dollars in, side by side",
  "Everything runs on your device",
  "Results are estimates for education",
] as const;

export default function RothVsTraditionalPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Roth vs traditional", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Roth vs traditional calculator",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        variant="compact"
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Roth vs traditional" }]}
        eyebrow="Free tool · your numbers stay on your device"
        title="Roth vs traditional, in real dollars"
        lede="The tax question, answered with arithmetic. Type in the same contribution for both accounts. The tool grows each side at your assumed rate, takes the tax out where it belongs, and shows which leaves more after tax."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <RothVsTraditional />
          <div className="mt-6">
            <DataFreshness date="October 2026" source="IRS" />
          </div>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Enter your age. It sets your 2026 IRA limit.",
          "Set your yearly contribution. The tool caps it at the limit.",
          "Choose how many years you keep contributing.",
          "Set your tax rate now and your best guess for withdrawal time.",
        ]}
        formula={{
          label: "The formula",
          expression: "Growth factor = ((1 + r)^n - 1) / r\n\nTraditional after tax = contribution x factor x (1 - tax later)\nRoth after tax = contribution x (1 - tax now) x factor\n\nr = assumed yearly growth, n = years",
          note: "When the two tax rates match, both sides tie exactly. Contributions compound yearly in this tool.",
        }}
      >
        <p>
          <strong>Traditional side:</strong> your full contribution goes in before tax. It grows for the
          number of years you set. At the end, tax comes out at your withdrawal rate.
        </p>
        <p>
          <strong>Roth side:</strong> tax comes out first, at your current rate. The smaller deposit
          grows the same way. No tax comes out at the end.
        </p>
        <p>
          When both tax rates match, the two sides tie exactly. That is the core insight: the choice
          is mostly a bet on whether your rate now is higher or lower than your rate later.
        </p>
        <p>
          Contributions are capped at the 2026 IRA limit for your age: $7,500 under 50, $8,600 at 50
          and older. Growth compounds yearly in this tool.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/roth-ira-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Roth IRA, explained without jargon"
        wealthBody="What a Roth IRA actually is, how the tax trade works, and who it fits. Five minutes, plain English."
        ctaHeading="The numbers raised a question? Bring it to me"
        ctaBody="A calculator shows you the arithmetic. A free 20-minute call puts it next to your real tax picture, your timeline, and what the answer means for you."
      />
    </main>
  );
}
