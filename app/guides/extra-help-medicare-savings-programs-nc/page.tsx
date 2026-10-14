import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
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
 * Extra Help and Medicare Savings Programs in North Carolina.
 *
 * Targets "extra help medicare nc" / "medicare savings programs north
 * carolina". Local NC angle. Income limits change yearly, so the guide
 * explains the programs and points to current figures without quoting
 * stale numbers.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Extra Help and Medicare Savings Programs in North Carolina",
  },
  description:
    "Struggling with Medicare costs in North Carolina? Extra Help and Medicare Savings Programs can lower your drug and premium costs. Here is who qualifies and how to apply.",
  alternates: { canonical: "/guides/extra-help-medicare-savings-programs-nc" },
  openGraph: pageOpenGraph({
    title: "Extra Help and Medicare Savings Programs in North Carolina",
    description:
      "Two programs that lower Medicare costs for people with limited income: Extra Help for prescriptions, and Medicare Savings Programs for premiums and cost sharing.",
    path: "/guides/extra-help-medicare-savings-programs-nc",
  }),
  twitter: pageTwitter({
    title: "Extra Help and Medicare Savings Programs in North Carolina",
    description:
      "Two programs that lower Medicare costs for people with limited income: Extra Help for prescriptions, and Medicare Savings Programs for premiums and cost sharing.",
    path: "/guides/extra-help-medicare-savings-programs-nc",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is Extra Help for Medicare prescription costs?",
    a: "Extra Help is a federal program that lowers Part D prescription drug costs for people with limited income and resources. It can reduce your drug plan premium, deductible, and copays significantly. You apply through Social Security.",
  },
  {
    q: "What are Medicare Savings Programs?",
    a: "Medicare Savings Programs are state-run programs that help pay Medicare costs. Depending on the program level, they can pay your Part B premium, and some cover deductibles and coinsurance too. North Carolina administers them through county social services offices.",
  },
  {
    q: "Can I get Extra Help and a Medicare Savings Program at the same time?",
    a: "Yes. They are separate programs with separate applications, and qualifying for one does not disqualify you from the other. Many people with limited income qualify for both, which together can make Medicare nearly free.",
  },
  {
    q: "How do I apply for Extra Help in North Carolina?",
    a: "Apply through Social Security online, by phone, or at a local office. You can also get free help with the application from North Carolina SHIIP counselors, who walk people through it every day.",
  },
  {
    q: "Where do I apply for a Medicare Savings Program in NC?",
    a: "Apply through your county Department of Social Services. In Guilford County, that is the Guilford County DSS office. SHIIP counselors can also help you figure out which program level you might qualify for before you apply.",
  },
];

export default function ExtraHelpMedicareSavingsProgramsNcPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/extra-help-medicare-savings-programs-nc" },
              { name: "Extra Help and MSPs", path: "/guides/extra-help-medicare-savings-programs-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Extra Help and Medicare Savings Programs in North Carolina",
              description:
                "Who qualifies for Extra Help and Medicare Savings Programs in NC, what each one pays for, and how to apply through Social Security and county DSS.",
              path: "/guides/extra-help-medicare-savings-programs-nc",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
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
          { name: "Extra Help and MSPs" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Extra Help and Medicare Savings Programs in North Carolina"
        lede="Medicare costs too much for a lot of good people. Two programs exist for exactly that situation, and most people who qualify have never heard of them."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Extra Help lowers your prescription drug costs through Social Security. Medicare
              Savings Programs, run by North Carolina counties, can pay your Part B premium and
              sometimes your deductibles and coinsurance. Both are for people with limited income
              and resources. You can qualify for both at once, and applying is free.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Extra Help: for prescription costs</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Extra Help is the federal program that makes Part D affordable. If you qualify, it
            pays most of your drug plan premium, lowers or eliminates your deductible, and drops
            your copays to a few dollars per prescription. For someone taking several daily
            medications, the savings can be hundreds of dollars a month.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You apply through Social Security: online, by phone, or at a local office. The
            application asks about your income and resources, and Social Security decides if you
            qualify. Some people are enrolled automatically, including anyone on both Medicare
            and Medicaid, anyone receiving Supplemental Security Income, and anyone in a Medicare
            Savings Program. If you were auto-enrolled, you should have gotten a letter.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Medicare Savings Programs: for premiums and more</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Savings Programs are the state side. North Carolina runs four levels, and
            which one you qualify for depends on your income. The basic level pays your Part B
            premium every month, which immediately puts that money back in your Social Security
            check. Higher levels can also cover your Part A and B deductibles, coinsurance, and
            copays.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You apply through your county Department of Social Services. In Guilford County,
            that means the Guilford County DSS office. In Forsyth County, the Forsyth County
            DSS. Every county in North Carolina has one, and the program rules are the same
            statewide. The income limits change each year, so check the current figures when you
            apply rather than relying on last year&apos;s numbers.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Why so many eligible people never apply</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The estimates are striking. A large share of people who qualify for Extra Help never
            apply, often because they assume they earn too much or own too much. The resource
            limits are more generous than most people expect: your home, one car, and burial
            plots generally do not count. Income from a part-time job does not automatically
            disqualify you either.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The other barrier is the paperwork. The applications ask detailed financial
            questions, and that stops people cold. This is exactly what North Carolina SHIIP
            counselors do every day: sit with you, go through the forms line by line, and make
            sure nothing gets missed. It is free, it is unbiased, and they know these programs
            inside out.{" "}
            <Link href="/medicare-help-directory" className="underline underline-offset-2">
              Here is the directory of free Medicare help in the Triad, including SHIIP
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">How the two programs work together</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            They stack. Extra Help handles your drug costs. A Medicare Savings Program handles
            your Part B premium and possibly your medical cost sharing. Together, they can take
            someone from paying full Medicare costs to paying almost nothing. If your income is
            limited, apply for both. The applications are separate, the agencies are different,
            and neither one hurts your chances with the other.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One more thing worth knowing: qualifying for Extra Help also gives you a special
            enrollment period to change Part D plans outside the normal windows. If your drug
            needs change mid-year, you are not stuck waiting for fall.{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Annual Enrollment is still the best time to review everything at once
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
            Think you might qualify for Extra Help or a Medicare Savings Program? Call or text
            Christian Brinkley in Greensboro, NC at {AGENT.phone}. The review is free, with no
            obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="extra-help-medicare-savings-programs-nc" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Pay less for Medicare if you qualify"
        body={`Bring your income details and your current plan. I will check whether Extra Help or a Medicare Savings Program fits, and help you apply. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
