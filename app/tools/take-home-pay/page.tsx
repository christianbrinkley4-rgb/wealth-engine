import { ToolTracking } from "../_components/tool-tracking";
import type { Metadata } from "next";

import { DataFreshness } from "@/app/components/DataFreshness";
import { ToolHeader } from "../_components/tool-header";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { TakeHomePay } from "./TakeHomePay";

const path = "/tools/take-home-pay";
const description =
  "Free take-home pay calculator. Turn a gross salary into a real paycheck using 2026 federal brackets, the NC flat tax, and payroll taxes, line by line.";

export const metadata: Metadata = {
  title: { absolute: "Take-Home Pay Calculator (2026) | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Take-home pay calculator", description, path }),
  twitter: { ...pageTwitter({ title: "Take-home pay calculator", description }), images: [`${path}/twitter-image`] },
};


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
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Take-home pay" }]} title="What does that salary actually pay?" lede="Estimate your paycheck using the stated 2026 tax rates." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolTracking toolId="take_home_pay"><TakeHomePay /></ToolTracking>
          <div className="mt-6">
            <DataFreshness date="October 2026" source="IRS and the State of North Carolina" />
          </div>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Enter your gross yearly salary.",
          "Pick your filing status. It changes the brackets.",
          "Pick your pay frequency. It only splits the yearly number.",
          "Read the per-check take-home, with every tax shown line by line.",
        ]}
        formula={{
          label: "The formula",
          expression: "Take-home = gross - federal tax - NC tax - payroll taxes\n\nFederal tax: (gross - standard deduction) through the 2026 brackets\nNC tax: 3.99% of gross\nPayroll: 6.2% Social Security (to $184,500)\n  + 1.45% Medicare (+ 0.9% over $200k single / $250k joint)\n\nPer paycheck = take-home / paychecks per year",
        }}
      >
        <p>
          <strong>Federal income tax:</strong> the 2026 standard deduction ($16,100 single, $32,200
          married filing jointly) comes off first. What is left runs through the seven federal
          brackets, 10% to 37%, each rate applying only to the slice inside it.
        </p>
        <p>
          <strong>North Carolina tax:</strong> a flat 3.99% of income. <strong>Payroll taxes:</strong>{" "}
          6.2% Social Security up to $184,500 of wages, plus 1.45% Medicare on all wages. An extra
          0.9% Medicare applies above $200,000 single or $250,000 joint.
        </p>
        <p>
          Divide the yearly take-home by your pay frequency and you get the per-check number. This
          leaves out pre-tax deductions like 401(k) contributions and health premiums, which would
          lower the taxable part and raise the take-home.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/money-moves-in-your-20s"
        wealthEyebrow="Go deeper"
        wealthTitle="Money moves in your 20s"
        wealthBody="What to do with the paycheck once you know its real size. Short, practical, no jargon."
        ctaHeading="Salary talk coming up? Walk in knowing the number"
        ctaBody="The tool tells you what a salary pays. A free 20-minute call helps you plan around the real number before you sign anything."
        related={[
          { href: "/tools/budget", label: "Budget calculator" },
          { href: "/wealth/tax-brackets-explained-plainly", label: "Tax brackets, explained plainly" },
          { href: "/wealth/learn/budgeting-on-your-first-job", label: "Budgeting on your first job" },
        ]}
      />
    </main>
  );
}
