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

/** General Medicare Advantage information. Check address-specific options at Medicare.gov. */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
  },
  description:
    "Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address.",
  alternates: { canonical: "/medicare-advantage-plans-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
    description:
      "Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address.",
    path: "/medicare-advantage-plans-greensboro-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare Advantage Greensboro NC (2027) | Plans, Doctors, and Local Help",
    description:
      "Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address.",
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
    a: "Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address.",
  },
  {
    q: "What is the average premium for Medicare Advantage in Greensboro?",
    a: "Compare copays, deductibles, drug coverage, and the out-of-pocket maximum before you decide.",
  },
  {
    q: "Do Medicare Advantage plans cover my Greensboro doctors?",
    a: "Advantage plans use provider networks. Check each plan's directory for your doctors, hospital, and pharmacy.",
  },
  {
    q: "What is the out-of-pocket maximum on Advantage plans here?",
    a: "The out-of-pocket maximum limits covered spending during the year. Check each plan at Medicare.gov.",
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
                "Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address.",
              path: "/medicare-advantage-plans-greensboro-nc",
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
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
        lede="Plan options depend on your ZIP code. Compare every plan at Medicare.gov, or book a time and I will check the plans at your address."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Compare plans with me →"
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
            Drug coverage varies more than anything else between plans. Enter your exact medications
            on Medicare.gov&rsquo;s plan finder and sort by total yearly cost, not premium.
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
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated October 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-09" />
      <RelatedMedicareGuides />
    </main>
  );
}
