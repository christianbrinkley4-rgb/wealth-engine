import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Is Social Security taxed? The 2026 federal and NC rules.
 *
 * Targets "is social security taxed". Federal thresholds ($25k/$34k single,
 * $32k/$44k joint) verified October 8, 2026. NC treatment: no state tax on
 * benefits. The $6,000 senior deduction is from IRS Tax Tip 2026-14.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Is Social Security Taxed? 2026 Federal and NC Rules",
  },
  description:
    "Up to 85% of Social Security can be taxed federally, based on combined income. The 2026 thresholds, the math, the new $6,000 senior deduction, and NC's rule.",
  alternates: { canonical: "/guides/is-social-security-taxed" },
  openGraph: pageOpenGraph({
    title: "Is Social Security taxed? The 2026 rules",
    description:
      "Federal tax depends on your combined income, not your benefit amount. Thresholds, the 85% cap, the senior deduction, and North Carolina's rule.",
    path: "/guides/is-social-security-taxed",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Is Social Security taxed if it is my only income?",
    a: "Usually not. If Social Security is your only income, your combined income stays below the thresholds and none of your benefit is taxed. You may not even need to file a federal return.",
  },
  {
    q: "Does North Carolina tax Social Security benefits?",
    a: "No. North Carolina does not tax Social Security retirement or disability benefits. You subtract the federally taxed amount on Schedule S of your NC return. Other retirement income, like 401(k) and IRA withdrawals, is taxed at the 3.99 percent flat rate.",
  },
  {
    q: "What does up to 85 percent taxable actually mean?",
    a: "It means up to 85 percent of your benefit is added to your taxable income. It is not an 85 percent tax rate. That added amount is then taxed at your normal bracket, such as 12 or 22 percent.",
  },
  {
    q: "What is the new $6,000 senior deduction?",
    a: "For tax years 2025 through 2028, people 65 or older can claim an extra $6,000 deduction per person, whether they itemize or take the standard deduction. It phases out above $75,000 of MAGI single or $150,000 joint.",
  },
  {
    q: "Do the Social Security tax thresholds change each year?",
    a: "No. The $25,000, $34,000, $32,000, and $44,000 thresholds have been frozen since the 1980s and 1990s. Benefits rise with cost-of-living adjustments, so more retirees cross the thresholds every year.",
  },
  {
    q: "Is SSI taxed?",
    a: "No. Supplemental Security Income is a needs-based program, not an earned benefit. SSI payments are not taxable at the federal level.",
  },
];

export default function IsSocialSecurityTaxedPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/is-social-security-taxed" },
              { name: "Is Social Security taxed?", path: "/guides/is-social-security-taxed" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Is Social Security Taxed? 2026 Federal and NC Rules",
              description:
                "When Social Security gets taxed, the 2026 combined-income thresholds, the $6,000 senior deduction, and North Carolina's no-tax rule.",
              path: "/guides/is-social-security-taxed",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "Is Social Security taxed?" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Is Social Security taxed?"
        lede="Sometimes. The IRS looks at your total income picture, not just your benefit check. Here is the formula and the 2026 thresholds."
        secondaryHref="/start?topic=retirement"
        secondaryLabel="Talk through your tax picture"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              The IRS uses a number called combined income: your adjusted gross income, plus
              tax-exempt interest, plus half of your Social Security benefits. Cross the threshold
              for your filing status and part of your benefit becomes taxable. Stay under it and
              none of it is.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The 2026 thresholds</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Federal Social Security taxation thresholds for 2026
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Filing status
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Combined income
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Share of benefit taxable
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Single, head of household
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Under $25,000</td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">0 percent</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Single, head of household
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">
                    $25,000 to $34,000
                  </td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">Up to 50 percent</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Single, head of household
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Over $34,000</td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">Up to 85 percent</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Married filing jointly
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Under $32,000</td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">0 percent</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Married filing jointly
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">
                    $32,000 to $44,000
                  </td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">Up to 50 percent</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Married filing jointly
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Over $44,000</td>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">Up to 85 percent</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Example: a single retiree with $20,000 of pension income and $18,000 of Social Security
            has combined income of $29,000 ($20,000 plus half of $18,000). That falls in the 50
            percent band, so part of the benefit is taxable.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 85 percent cap, explained</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            When people hear 85 percent, they picture an 85 percent tax rate. That is not how it
            works. At most 85 percent of your benefit is added to your taxable income. That amount
            is then taxed at your normal bracket. In the 12 percent bracket, you pay 12 percent on
            that slice. At least 15 percent of your benefit stays untaxed no matter what.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The new $6,000 senior deduction</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            For tax years 2025 through 2028, taxpayers 65 or older can claim an extra $6,000
            deduction per person. It works whether you itemize or take the standard deduction. It
            phases out when modified adjusted gross income passes $75,000 single or $150,000 joint.
            It does not change how benefits are taxed, but it can shrink the income your benefits
            are measured against.
          </p>

          <h2 className="text-28 mt-12 font-semibold">North Carolina's rule</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            North Carolina does not tax Social Security benefits. On your NC return you subtract the
            federally taxed amount on Schedule S. Other retirement income, such as 401(k) and IRA
            withdrawals and pensions, is taxed at the flat 3.99 percent rate.{" "}
            <Link href="/taxes-and-retirement" className="underline underline-offset-2">
              Here is the full picture of taxes in retirement
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            This page is educational only, not tax advice. Christian Brinkley is a licensed
            insurance agent and accounting student in Greensboro, NC, not a CPA. Call or text{" "}
            {AGENT.phone} to talk through your retirement income picture.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="is-social-security-taxed" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Understand what your retirement income really costs"
        body={`We will look at your Social Security, pensions, and withdrawals together and map the tax picture. Educational only, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=retirement"
        label="Talk through your tax picture"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
