import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * 2026 IRMAA brackets: the complete table.
 *
 * Targets "2026 IRMAA brackets" / "medicare income limits". Figures verified
 * October 8, 2026 against CMS (announced November 14, 2025): thresholds
 * $109,000 single / $218,000 joint on 2024 MAGI; Part B $202.90 through
 * $689.90; Part D surcharges $0 through $91.00.
 */

export const metadata: Metadata = {
  title: {
    absolute: "2026 IRMAA Brackets: Medicare Income Limits and Surcharges",
  },
  description:
    "The full 2026 IRMAA table: income thresholds, Part B premiums, and Part D surcharges by bracket, plus the 2-year lookback and how to appeal.",
  alternates: { canonical: "/guides/irmaa-brackets-2026" },
  openGraph: pageOpenGraph({
    title: "2026 IRMAA brackets: the complete table",
    description:
      "Every 2026 IRMAA income threshold, Part B premium, and Part D surcharge in one table. How the lookback works and when you can appeal.",
    path: "/guides/irmaa-brackets-2026",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What income does IRMAA use?",
    a: "IRMAA uses your modified adjusted gross income, which is your adjusted gross income plus tax-exempt interest. For 2026 premiums, Social Security looks at your 2024 tax return.",
  },
  {
    q: "What is the IRMAA threshold for 2026?",
    a: "IRMAA starts when 2024 MAGI passes $109,000 for single filers or $218,000 for married couples filing jointly. Below those amounts you pay the standard Part B premium of $202.90 a month with no surcharge.",
  },
  {
    q: "Does IRMAA apply to both spouses?",
    a: "Yes. IRMAA is charged per person. A married couple in the same bracket each pays the surcharge on their own Part B and Part D premiums.",
  },
  {
    q: "Can I appeal IRMAA if my income dropped?",
    a: "Yes. If a life-changing event like retirement, divorce, or the death of a spouse lowered your income, file SSA Form SSA-44 with your Social Security office. If approved, your surcharge is recalculated on more recent income.",
  },
  {
    q: "When are the 2027 IRMAA brackets announced?",
    a: "CMS announces the next year's Part B premium and IRMAA brackets each November. The 2027 figures arrive in November 2026 and take effect January 1, 2027.",
  },
  {
    q: "Can a Roth conversion trigger IRMAA?",
    a: "Yes. A Roth conversion adds to your MAGI in the year you convert. A large conversion can push you into a higher IRMAA bracket two years later. Plan the timing before you convert.",
  },
];

export default function IrmaaBrackets2026Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/irmaa-brackets-2026" },
              { name: "2026 IRMAA brackets", path: "/guides/irmaa-brackets-2026" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "2026 IRMAA Brackets: Medicare Income Limits and Surcharges",
              description:
                "The complete 2026 IRMAA brackets: income thresholds, Part B premiums, Part D surcharges, the two-year lookback, and the appeal process.",
              path: "/guides/irmaa-brackets-2026",
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
          { name: "2026 IRMAA brackets" },
        ]}
        eyebrow="Guide · Updated October 8, 2026 · Sourced from CMS"
        title="2026 IRMAA brackets: the complete table"
        lede="IRMAA is the surcharge higher earners pay on Medicare premiums. Here is every 2026 bracket, what triggers it, and how to fight it."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free premium review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              IRMAA stands for Income-Related Monthly Adjustment Amount. It is an extra charge added
              to your Part B and Part D premiums when your income is above a set limit. Medicare
              looks at your tax return from two years ago to set this year's surcharge.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The 2026 brackets</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your 2026 premiums are based on your 2024 modified adjusted gross income. CMS announced
            these figures on November 14, 2025:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                2026 IRMAA brackets with Part B premiums and Part D surcharges
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    2024 MAGI, single
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    2024 MAGI, joint
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Part B per month
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Part D surcharge per month
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$109,000 or less</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$218,000 or less</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$202.90</td>
                  <td className="text-16 whitespace-nowrap py-4">$0</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$109,001 to $137,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$218,001 to $274,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$284.10</td>
                  <td className="text-16 whitespace-nowrap py-4">+$14.50</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$137,001 to $171,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$274,001 to $342,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$405.80</td>
                  <td className="text-16 whitespace-nowrap py-4">+$37.50</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$171,001 to $205,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$342,001 to $410,000</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$527.50</td>
                  <td className="text-16 whitespace-nowrap py-4">+$60.40</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$205,001 to $499,999</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$410,001 to $749,999</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$649.20</td>
                  <td className="text-16 whitespace-nowrap py-4">+$83.30</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$500,000 or more</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$750,000 or more</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold">$689.90</td>
                  <td className="text-16 whitespace-nowrap py-4">+$91.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            The brackets are cliffs, not slopes. One dollar over a threshold moves you to the next
            tier for the whole year. The Part D surcharge adds to whatever your drug plan already
            charges.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The two-year lookback</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            IRMAA always looks backward. Your 2026 surcharge comes from your 2024 return. A one-time
            income spike, like selling property, taking a large IRA withdrawal, or doing a big Roth
            conversion, can raise your premiums two years later. The surcharge resets every year, so
            a single high-income year only affects one year of premiums.
          </p>

          <h2 className="text-28 mt-12 font-semibold">How to appeal</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If your income dropped because of a life-changing event, you can ask Social Security to
            use newer income. Qualifying events include retirement, reduced work hours, marriage,
            divorce, and the death of a spouse. File SSA Form SSA-44 with your local Social Security
            office and include proof of the income change.{" "}
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Here is the full IRMAA appeal walkthrough
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Planning a Roth conversion?{" "}
            <Link href="/roth-window" className="underline underline-offset-2">
              Use the Roth conversion calculator to stay under the next IRMAA bracket
            </Link>
            . For the rest of the 2026 cost picture,{" "}
            <Link href="/medicare-costs-2026" className="underline underline-offset-2">
              here are the 2026 Medicare costs
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
            This page is educational only, not tax advice. Got an IRMAA letter? Call or text
            Christian Brinkley in Greensboro, NC at {AGENT.phone}.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="Got an IRMAA surcharge letter?"
        body={`Bring the letter and your recent tax return. We will check whether an appeal applies and what your options are. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Get a free premium review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
