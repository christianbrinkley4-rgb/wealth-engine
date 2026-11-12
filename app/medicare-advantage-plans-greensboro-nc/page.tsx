import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";

/** General Medicare Advantage information. Check address-specific options at Medicare.gov. */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
  },
  description:
    "Guilford County has 57 Medicare Advantage plans for 2027, 45 with drug coverage. Compare plans at Medicare.gov, or book a time to check the plans.",
  alternates: { canonical: "/medicare-advantage-plans-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
    description:
      "Guilford County has 57 Medicare Advantage plans for 2027, 45 with drug coverage. Compare plans at Medicare.gov, or book a time to check the plans.",
    path: "/medicare-advantage-plans-greensboro-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
    description:
      "Guilford County has 57 Medicare Advantage plans for 2027, 45 with drug coverage. Compare plans at Medicare.gov, or book a time to check the plans.",
    path: "/medicare-advantage-plans-greensboro-nc",
  }),
};

const HOW_IT_WORKS = [
  {
    t: "One bundled plan replaces the pieces",
    b: "Medicare Advantage (Part C) bundles your hospital, medical, and usually drug coverage into one plan from a private insurer. Instead of Original Medicare plus a Medigap policy plus a separate drug plan, you get one card, one premium, one set of rules. Most plans in Guilford County also include extras Original Medicare does not cover, like dental, vision, and hearing.",
  },
  {
    t: "Your county decides your plan list",
    b: "Medicare Advantage plans are approved county by county. Plan options depend on your ZIP code. Compare every plan at Medicare.gov.",
  },
  {
    t: "Networks, not open access",
    b: "Most Advantage plans use networks. HMOs generally require you to use in-network doctors and hospitals except in emergencies, and some require referrals to specialists. PPOs let you go out of network for a higher cost. If your doctors are with Cone Health or an independent practice in the Triad, check each plan's provider directory before you enroll. Original Medicare with Medigap generally lets you see any doctor who accepts Medicare nationwide.",
  },
  {
    t: "Compare costs when you need care",
    b: "Compare copays, coinsurance, and the annual out-of-pocket maximum. The maximum limits covered spending during the year.",
  },
] as const;

const FAQ = [
  {
    q: "How many Medicare Advantage plans are available in Greensboro?",
    a: "Guilford County has 57 Medicare Advantage plans for 2027 that are not Special Needs Plans. Forty-five include prescription drug coverage, and 34 of those charge a $0 total monthly premium. Forty more are Special Needs Plans for people with specific needs. Check the plans at your ZIP code, because availability varies by address.",
  },
  {
    q: "What is the average premium for Medicare Advantage in Greensboro?",
    a: "Across the 45 drug plans, the average total monthly premium is $11.90, and 34 of them charge $0. Your premium depends on the plan you pick, so compare your total yearly cost, not the average.",
  },
  {
    q: "Do Medicare Advantage plans cover my Greensboro doctors?",
    a: "Advantage plans use provider networks. Check each plan's directory for your doctors, hospital, and pharmacy.",
  },
  {
    q: "What is the out-of-pocket maximum on Advantage plans here?",
    a: "In Guilford County the in-network out-of-pocket maximum averages $6,648 across the 45 drug plans, with a median of $6,750 and a range of $3,400 to $9,850. The lowest maximum is the Alignment Health Smart plan at $3,400. Add premium plus maximum to see your worst-case year.",
  },
  {
    q: "Do star ratings matter when I compare plans?",
    a: "Ratings run 1 to 5 stars per contract, not per plan, and they measure quality, not cost. Thirty-seven of the 57 Guilford County plans sit under contracts rated 4 stars or more. A high rating is a good sign, but it does not tell you whether your doctors are in network or what your drugs will cost.",
  },
  {
    q: "Can I switch Medicare Advantage plans during the year?",
    a: "Generally no. You can change plans during the Annual Enrollment Period, October 15 through December 7 each year, for coverage starting January 1. There are special enrollment periods for certain life events like moving. Outside those windows, you are generally locked in for the year.",
  },
  {
    q: "Should I pick Medicare Advantage or Medigap?",
    a: "Neither is better in general. Advantage tends to suit people who want a low monthly cost and are comfortable with networks. Medigap tends to suit people who want predictable costs and open access to doctors. Here is the full Greensboro comparison of the two paths.",
  },
] as const;

export default function MedicareAdvantagePlansGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Medicare Advantage plans in Greensboro",
                path: "/medicare-advantage-plans-greensboro-nc",
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Advantage Plans in Greensboro NC (2027)",
              description:
                "Guilford County has 57 Medicare Advantage plans for 2027, 45 with drug coverage. Compare plans at Medicare.gov, or book a time to check the plans.",
              path: "/medicare-advantage-plans-greensboro-nc",
              datePublished: "2026-10-09",
              dateModified: "2026-11-07",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare Advantage plans in Greensboro" },
        ]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medicare Advantage plans in Greensboro"
        lede="Guilford County has 57 Medicare Advantage plans for 2027, and 45 of them include drug coverage. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How Advantage works, in plain terms</h2>
          <p className="text-18 mt-4 leading-relaxed">
            If you are turning 65 in Greensboro, you will hear about Medicare Advantage a lot.
            It is the private-plan alternative to Original Medicare, and more than half of all
            Medicare beneficiaries nationally are in one. Here is what that actually means for
            you.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {HOW_IT_WORKS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The questions that actually decide it</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Start with your doctors, prescriptions, and questions about costs.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Which doctors and hospitals must stay?
            </strong>{" "}
            Make a list: your primary care doctor, specialists, preferred hospital, and pharmacy.
            Then check that list against each plan&rsquo;s directory. A plan that does not include
            your cardiologist is not a bargain at any price.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              What do your prescriptions cost under each plan?
            </strong>{" "}
            Drug coverage varies more than anything else between plans. Enter your exact
            medications on Medicare.gov&rsquo;s plan finder and sort by total yearly cost, not
            premium.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              What does your worst year look like?
            </strong>{" "}
            The out-of-pocket maximum is your real protection. Add up premium plus maximum for
            each plan you are considering. That is the most you would pay in a year for
            covered services, and it is the honest way to compare.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you want a side-by-side estimate built for Guilford County, try the{" "}
            <Link
              href="/greensboro-medicare-cost-calculator"
              className="underline underline-offset-2"
            >
              Greensboro Medicare cost calculator
            </Link>
            . And if you are torn between Advantage and the Medigap path, read{" "}
            <Link
              href="/medicare-advantage-vs-medigap-greensboro-nc"
              className="underline underline-offset-2"
            >
              the full Greensboro comparison
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Every contract with plans in Guilford County for 2027</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Guilford County has 57 Medicare Advantage plans for 2027 that are not Special Needs
            Plans, and 45 of them include prescription drug coverage. Thirty-four of the 45
            charge a $0 total monthly premium. The average total premium across the 45 is $11.90
            a month. The average in-network out-of-pocket maximum is $6,648, the median is
            $6,750, and the range runs from $3,400 to the $9,850 ceiling. The lowest maximum in
            the county is the Alignment Health Smart plan, $0 premium and a $3,400 maximum.
            Thirty-seven of the 57 plans sit under contracts rated 4 stars or more, and one
            small contract has no published rating.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The table below lists every contract with plans in the county, with its 2027 star
            rating, how many drug plans it offers here, and the premium and out-of-pocket
            ranges. Star ratings are per contract, not per plan. This is a comparison, not a
            recommendation: the right plan depends on your doctors, your drugs, and your total
            yearly cost.
          </p>
          <ResponsiveTable className="mt-8 w-full text-left text-17">
            <caption className="mb-4 text-left font-semibold">
              Guilford County Medicare Advantage drug plans by contract, 2027
            </caption>
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 pr-4 font-semibold">Carrier</th>
                <th className="py-3 pr-4 font-semibold">Contract</th>
                <th className="py-3 pr-4 font-semibold">2027 stars</th>
                <th className="py-3 pr-4 font-semibold">Drug plans</th>
                <th className="py-3 pr-4 font-semibold">Monthly premium</th>
                <th className="py-3 font-semibold">Out-of-pocket max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Alignment Health Plan</td>
                <td className="py-3 pr-4">H5296</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$3,400-$4,300</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Alignment Health Plan</td>
                <td className="py-3 pr-4">H7074</td>
                <td className="py-3 pr-4">Not published</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$20</td>
                <td className="py-3">$3,900</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Aetna Medicare</td>
                <td className="py-3 pr-4">H3146</td>
                <td className="py-3 pr-4">3.5</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">$0-$49</td>
                <td className="py-3">$5,200-$5,900</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Aetna Medicare</td>
                <td className="py-3 pr-4">H5521</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$5,900-$7,500</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Wellcare</td>
                <td className="py-3 pr-4">H1914</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$6,500-$7,150</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Wellcare</td>
                <td className="py-3 pr-4">H4073</td>
                <td className="py-3 pr-4">3.5</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$6,700</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Blue Cross and Blue Shield of North Carolina</td>
                <td className="py-3 pr-4">H3449</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">$0-$41</td>
                <td className="py-3">$4,900-$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Blue Cross and Blue Shield of North Carolina</td>
                <td className="py-3 pr-4">H3404</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$45</td>
                <td className="py-3">$6,900</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Devoted Health</td>
                <td className="py-3 pr-4">H5299</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$4,050-$7,950</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Devoted Health</td>
                <td className="py-3 pr-4">H9700</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$4,850-$9,250</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">HealthSpring</td>
                <td className="py-3 pr-4">H7849</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$6,900</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">HealthSpring</td>
                <td className="py-3 pr-4">H9725</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$4,450-$6,750</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Humana</td>
                <td className="py-3 pr-4">H1036</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$3,950-$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Humana</td>
                <td className="py-3 pr-4">H5216</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0-$67</td>
                <td className="py-3">$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Humana</td>
                <td className="py-3 pr-4">H5525</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0-$13.30</td>
                <td className="py-3">$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Humana</td>
                <td className="py-3 pr-4">H7617</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$13</td>
                <td className="py-3">$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">Humana</td>
                <td className="py-3 pr-4">R0110</td>
                <td className="py-3 pr-4">3.5</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$158</td>
                <td className="py-3">$9,850</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">HealthTeam Advantage</td>
                <td className="py-3 pr-4">H2624</td>
                <td className="py-3 pr-4">4.5</td>
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">$0</td>
                <td className="py-3">$4,200</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">HealthTeam Advantage</td>
                <td className="py-3 pr-4">H9808</td>
                <td className="py-3 pr-4">3.5</td>
                <td className="py-3 pr-4">3</td>
                <td className="py-3 pr-4">$0-$34</td>
                <td className="py-3">$4,700-$5,200</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">UnitedHealthcare</td>
                <td className="py-3 pr-4">H2406</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">2</td>
                <td className="py-3 pr-4">$0-$53</td>
                <td className="py-3">$4,450-$7,150</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4 font-medium">UnitedHealthcare</td>
                <td className="py-3 pr-4">H5253</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">4</td>
                <td className="py-3 pr-4">$0-$42</td>
                <td className="py-3">$4,450-$9,500</td>
              </tr>
            </tbody>
          </ResponsiveTable>
          <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: CMS CY2027 landscape file, data last updated September 22, 2026, and CMS
            2027 Star Ratings, published October 8, 2026. One small contract, Alignment H7074,
            has no published rating because CMS reported not enough data. Premiums are total
            monthly premiums (Part C plus Part D) for drug plans. Check your exact plan at
            Medicare Plan Finder, because plan details change.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about Advantage plans</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.q === "Should I pick Medicare Advantage or Medigap?" ? (
                    <>
                      Neither is better in general. Advantage tends to suit people who want a
                      low monthly cost and are comfortable with networks. Medigap tends to suit
                      people who want predictable costs and open access to doctors. Here is the{" "}
                      <Link
                        href="/medicare-advantage-vs-medigap-greensboro-nc"
                        className="underline underline-offset-2"
                      >
                        full Greensboro comparison of the two paths
                      </Link>
                      .
                    </>
                  ) : (
                    item.a
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Related Greensboro Medicare guides</h2>
          <ul>
            <li><Link href="/greensboro-medicare-cost-calculator" className="underline underline-offset-2">Greensboro Medicare cost calculator</Link> - estimate your yearly costs</li>
            <li><Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">Part D drug coverage in Greensboro</Link></li>
            <li><Link href="/medigap-plans-greensboro-nc" className="underline underline-offset-2">Medigap plan letters explained</Link></li>
            <li><Link href="/medicare-costs-north-carolina" className="underline underline-offset-2">What Medicare costs in North Carolina</Link></li>
            <li><Link href="/turning-65" className="underline underline-offset-2">Turning 65 in Greensboro</Link> - the full local guide</li>
          </ul>
        </div>
      </section>

      <KitchenTableClose
        heading="Let's compare plans with your doctors and drugs"
        body="Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address."
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Book a 45-minute phone review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-sm text-gray-600">
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated November 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>, <a href="https://www.cms.gov/files/zip/cy2027-landscape-202609.zip" className="underline underline-offset-2" target="_blank" rel="noopener">CMS CY2027 landscape file</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-11-07" />
      <RelatedMedicareGuides />
    </main>
  );
}
