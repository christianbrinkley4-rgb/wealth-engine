import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Part D (prescription drug coverage) for Greensboro readers.
 *
 * 2027 figures below are finalized CMS amounts: $700 maximum deductible and
 * $2,400 annual out-of-pocket cap. Part D base premium figures are CMS
 * projections. Presented educationally; no carrier or plan recommendations.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Part D Plans in Greensboro NC (2027)",
  },
  description:
    "Medicare Part D in Greensboro, NC for 2027: the $700 deductible, the $2,400 out-of-pocket cap, and how to pick a drug plan. From a licensed local agent.",
  alternates: { canonical: "/medicare-part-d-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Part D Plans in Greensboro, NC",
    description:
      "Drug coverage explained for 2027: costs, the cap, the penalty, and how to compare plans with your prescriptions.",
    path: "/medicare-part-d-greensboro-nc",
  }),
};

const PHASES = [
  {
    t: "Deductible: up to $700",
    b: "For 2027, no Part D plan can charge a deductible above $700. Some plans charge less, and some charge $0, often applying the deductible only to higher tiers. If your drugs are all cheap generics on a $0-deductible plan, you may never notice the deductible at all.",
  },
  {
    t: "Initial coverage: you and the plan split costs",
    b: "After the deductible, you pay copays or coinsurance based on your plan's formulary tiers. Generics might be a few dollars; brand names and specialty drugs cost more. Every dollar you pay counts toward the annual out-of-pocket cap.",
  },
  {
    t: "Catastrophic: $0 after $2,400",
    b: "Once your out-of-pocket spending on covered drugs reaches $2,400 in 2027, you pay nothing more for covered drugs for the rest of the year. This hard cap, created by the Inflation Reduction Act, replaced the old donut hole. It is the single most important number on this page if you take expensive medications.",
  },
] as const;

const FAQ = [
  {
    q: "What is the Medicare Part D deductible in 2027?",
    a: "The maximum standard deductible is $700, up from $615 in 2026. Not every plan charges the full amount. Some plans charge less, some waive it for generics, and insulin is exempt from the deductible. Check your plan's details.",
  },
  {
    q: "What is the Part D out-of-pocket maximum in 2027?",
    a: "$2,400 for covered drugs. Once your counted spending reaches that, you pay $0 for covered Part D drugs for the rest of the calendar year. Premiums and non-covered drugs do not count toward the cap.",
  },
  {
    q: "Do I need Part D if I take no prescriptions?",
    a: "You are not required to enroll, but waiting has a cost. If you go 63 or more days without creditable drug coverage, Medicare adds a permanent late enrollment penalty to your Part D premium when you do enroll. Many people enroll in a low-premium plan just to avoid the penalty.",
  },
  {
    q: "How do I compare Part D plans in Greensboro?",
    a: "Enter your exact prescriptions, dosages, and preferred pharmacy on Medicare.gov's plan finder. Sort by total yearly cost, not monthly premium. The cheapest premium is often not the cheapest year if your drugs land on expensive tiers.",
  },
  {
    q: "Is Part D included in Medicare Advantage?",
    a: "Most Advantage plans include drug coverage (MAPD), but not all. If yours does not, or if you have Original Medicare with Medigap, you buy a standalone Part D plan. Medigap never includes drug coverage.",
  },
  {
    q: "What if my drug is not on my plan's formulary?",
    a: "You have options: ask your doctor about a covered alternative, request a formulary exception from the plan, or switch plans during the Annual Enrollment Period, October 15 through December 7. Formularies change every year, so check yours each fall even if nothing else changed.",
  },
] as const;

export default function MedicarePartDGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Medicare Part D in Greensboro",
                path: "/medicare-part-d-greensboro-nc",
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
              headline: "Medicare Part D Plans in Greensboro NC (2027)",
              description:
                "How Part D works in 2027: the deductible, the out-of-pocket cap, the penalty, and how to compare drug plans with your prescriptions.",
              path: "/medicare-part-d-greensboro-nc",
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare Part D in Greensboro" }]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medicare Part D in Greensboro"
        lede="Your prescriptions, your pharmacy, your plan. How Part D works in 2027, what it costs, and how to compare plans without overpaying."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Review my drug coverage →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How Part D works in 2027</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Part D is Medicare's prescription drug coverage. You can get it two ways: bundled
            inside most Medicare Advantage plans, or as a standalone plan paired with Original
            Medicare and Medigap. Either way, the structure is the same.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {PHASES.map((item, index) => (
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
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            The average standalone Part D premium is projected around $36 a month for 2027.
            Actual premiums vary by plan and area. Your premium does not count toward the
            $2,400 cap.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The penalty nobody warns you about</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Part D is optional, but skipping it is not free. If you go 63 or more days in a row
            without creditable prescription drug coverage after your initial enrollment period,
            Medicare adds a late enrollment penalty to your Part D premium. It is 1% of the
            national base premium for each month you were uncovered, and it is permanent.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Creditable means coverage at least as good as Part D, like most employer plans or
            VA benefits. If you are working past 65 with employer drug coverage, confirm in
            writing that it counts as creditable before you delay Part D.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is why many healthy 65-year-olds enroll in an inexpensive Part D plan even
            with no prescriptions: the premium is small, and the penalty for waiting is forever.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to compare plans the right way</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Every fall during the Annual Enrollment Period, October 15 through December 7, you
            can switch Part D plans for the next year. Here is how to use that window well.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              List every prescription exactly.
            </strong>{" "}
            Name, dosage, frequency. A plan that is cheap for generics can be brutal for one
            brand-name drug. The plan finder on Medicare.gov does the math if you give it the
            full list.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Set your pharmacy.
            </strong>{" "}
            Plans have preferred pharmacies with lower copays. In Greensboro that might be a
            chain or an independent you trust. Enter it and watch how the totals change.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Sort by total yearly cost.
            </strong>{" "}
            Premium plus deductible plus your copays for the year. The lowest premium rarely
            wins once your actual drugs are in the math.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Check the formulary every year.
            </strong>{" "}
            Plans change their drug lists annually. A drug covered this year may move to a
            higher tier or off the formulary next year. The plan you picked last fall deserves
            a fresh look each October.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If drug costs are a big part of your Medicare decision, the{" "}
            <Link
              href="/greensboro-medicare-cost-calculator"
              className="underline underline-offset-2"
            >
              Greensboro Medicare cost calculator
            </Link>{" "}
            includes a medications input so you can see how prescriptions change the yearly
            totals. And if you are deciding between the Advantage path and the Medigap path,
            start with{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              the turning 65 guide
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about Part D</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
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

      <KitchenTableClose
        heading="Let's check your prescriptions against 2027 plans"
        body={`Send me your medication list and preferred pharmacy. I will run it through the plan finder and show you which plans cost least for your actual drugs. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free drug plan review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
