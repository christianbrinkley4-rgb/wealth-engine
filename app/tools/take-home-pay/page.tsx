import { EditorialNote } from "@/app/components/EditorialNote";
import { SOURCES } from "@/lib/editorial";
import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
import { TakeHomePay } from "./TakeHomePay";

const path = "/tools/take-home-pay";
const description =
  "Free take-home pay calculator. Turn a gross salary into a real paycheck using 2026 federal brackets, the NC flat tax, and payroll taxes, line by line.";

export const metadata: Metadata = {
  title: { absolute: "Take-Home Pay Calculator (2026) | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Take-home pay calculator", description, path }),
};

const PROOF = [
  "2026 IRS brackets and deduction",
  "NC flat 3.99% included",
  "Every assumption labeled",
  "Results are estimates",
] as const;

export default function TakeHomePayPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Take-home pay", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Take-home pay calculator (2026)",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Free tools", href: "/tools" },
          { name: "Take-home pay" },
        ]}
        eyebrow="Free tool · your numbers stay on your device"
        title="What does that salary actually pay?"
        lede="A salary number and a paycheck are two different things. Type in your gross salary and filing status. The tool subtracts the 2026 standard deduction, runs the federal brackets, and adds NC tax and payroll taxes. It estimates after-tax wages before other paycheck deductions."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <TakeHomePay />
        </div>
      </section>

      <MathSection title="The math, in plain English">
        <p>
          <strong>Federal income tax:</strong> the 2026 standard deduction ($16,100 single, $32,200
          married filing jointly) comes off first. What is left runs through the seven federal
          brackets, 10% to 37%, each rate applying only to the slice inside it.
        </p>
        <p>
          <strong>North Carolina tax:</strong> 3.99% after the NC standard deduction: $12,750 single
          or $25,500 joint. <strong>Payroll taxes:</strong> 6.2% Social Security up to $184,500 of
          wages, plus 1.45% Medicare on all wages. An extra 0.9% Medicare applies above $200,000
          single or $250,000 joint.
        </p>
        <p>
          Divide the yearly take-home by your pay frequency and you get the per-check number. This
          leaves out pre-tax deductions like 401(k) contributions and health premiums, which would
          reduce taxable income but also reduce available cash.
        </p>
        <p>
          This is an annual tax estimate for a single wage earner, divided into equal pay periods.
          It is not a payroll withholding calculation.
        </p>
        <p>
          Filing jointly does not mean the tool models two earners. Social Security wage limits
          apply separately to each worker, so combined salaries need separate treatment.
        </p>
        <p>
          The estimate assumes full-year wages, standard deductions, no dependents, no credits, and
          no other income. It excludes age-based deductions and state adjustments.
        </p>
        <p>
          Payroll withholding follows your W-4 and your employer&apos;s pay schedule. Additional
          Medicare withholding can differ from the tax ultimately due on a joint return.
        </p>
        <p>
          Salary deductions can reduce taxable income while also reducing cash deposited into your
          bank account. A smaller tax bill does not erase the deduction itself.
        </p>
        <p>
          Compare an estimate with a recent pay statement. Separate taxes from insurance, retirement
          contributions, and other deductions before looking for a discrepancy.
        </p>
        <p>
          An employer match is not included in spendable pay. Bonuses and irregular work can also
          make an equal-period estimate differ from an actual check.
        </p>
        <EditorialNote
          sources={[
            SOURCES.tax,
            SOURCES.ncDeduction,
            SOURCES.ncRate,
            SOURCES.payroll,
            SOURCES.additional,
          ]}
        />
      </MathSection>

      <div className="bg-white px-4">
        <div className="app-shell max-w-3xl py-10">
          <ToolsDisclaimer />
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/money-moves-in-your-20s"
        wealthEyebrow="Go deeper"
        wealthTitle="Money moves in your 20s"
        wealthBody="What to do with the paycheck once you know its real size. Short, practical, no jargon."
        ctaHeading="Salary talk coming up? Walk in knowing the number"
        ctaBody="The tool tells you what a salary pays. A free 20-minute call helps you plan around the real number before you sign anything."
      />
    </main>
  );
}
