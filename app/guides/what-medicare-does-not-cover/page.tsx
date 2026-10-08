import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * What Medicare does not cover: the gap list people search for every fall.
 *
 * Targets "what does medicare not cover". All figures match the figures
 * already published on this site (medicare-costs-2026). Nothing invented.
 */

export const metadata: Metadata = {
  title: {
    absolute: "What Medicare Does Not Cover: The Full List of Gaps",
  },
  description:
    "Original Medicare leaves real gaps: dental, vision, hearing aids, long-term care, and more. The full list, plus how people fill each gap.",
  alternates: { canonical: "/guides/what-medicare-does-not-cover" },
  openGraph: pageOpenGraph({
    title: "What Medicare does not cover",
    description:
      "The full list of Medicare gaps: dental, vision, hearing aids, long-term care, foreign travel, and the cost-sharing with no cap.",
    path: "/guides/what-medicare-does-not-cover",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does Medicare cover dental work like crowns or dentures?",
    a: "Original Medicare does not cover routine dental care. That includes cleanings, fillings, crowns, root canals, extractions, dentures, and implants. Coverage only applies when dental work is part of a covered medical procedure.",
  },
  {
    q: "Does Medicare pay for hearing aids?",
    a: "No. Original Medicare does not cover hearing aids or routine hearing exams. It covers a hearing and balance exam only when a doctor orders it to diagnose a medical condition.",
  },
  {
    q: "Does Medicare cover nursing home care?",
    a: "Medicare covers up to 100 days of skilled nursing after a qualifying hospital stay. It does not cover long-term custodial care, which is help with bathing, dressing, and eating at home or in a facility.",
  },
  {
    q: "Does Medicare cover medical care in another country?",
    a: "Original Medicare does not pay for care outside the United States except in rare border situations. Some Medigap plans include foreign travel emergency coverage. Check your plan before you travel.",
  },
  {
    q: "Is there a cap on what I pay with Original Medicare?",
    a: "No. Original Medicare has no yearly limit on your out-of-pocket costs. The Part B 20 percent coinsurance keeps adding up. This is why people add Medigap or choose a Medicare Advantage plan with a yearly maximum.",
  },
  {
    q: "Does Medicare cover prescription drugs?",
    a: "Parts A and B do not cover most outpatient prescription drugs. You need a Part D plan, either standalone or bundled with a Medicare Advantage plan. In 2026 the Part D out-of-pocket cap is $2,100 a year.",
  },
];

export default function WhatMedicareDoesNotCoverPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/what-medicare-does-not-cover" },
              { name: "What Medicare does not cover", path: "/guides/what-medicare-does-not-cover" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "What Medicare Does Not Cover: The Full List of Gaps",
              description:
                "Every major Medicare coverage gap in one place: dental, vision, hearing, long-term care, foreign travel, and cost-sharing with no cap.",
              path: "/guides/what-medicare-does-not-cover",
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
          { name: "What Medicare does not cover" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="What Medicare does not cover"
        lede="Medicare covers a lot. It does not cover everything. Here is the full list of the gaps, so nothing surprises you later."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Original Medicare (Parts A and B) pays for care that is medically necessary. Federal
              law excludes several common services outright. Dental, vision, hearing aids, and
              long-term custodial care top the list. On top of that, your share of covered costs has
              no yearly cap.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Services Medicare excludes</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            These are services Original Medicare does not pay for, no matter which doctor you see:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Routine dental care.</strong> Cleanings,
              exams, fillings, crowns, root canals, extractions, dentures, and implants are all
              excluded. The only exception is dental work tied to a covered medical procedure.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Routine vision care.</strong> Eye exams
              for glasses, eyeglasses, and contact lenses are not covered. Medical eye care is
              covered, including cataract surgery and treatment for glaucoma and macular
              degeneration.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Hearing aids.</strong> Neither hearing
              aids nor routine hearing exams are covered. A hearing and balance exam is covered when
              a doctor orders it for a medical diagnosis.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Long-term custodial care.</strong>{" "}
              Medicare pays for recovery, not residency. Help with bathing, dressing, and eating, at
              home or in a nursing facility, is not covered.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Care outside the United States.</strong>{" "}
              Original Medicare does not pay for care received in another country, except in rare
              situations near the border.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Cosmetic surgery.</strong> Procedures
              done only to improve appearance are excluded. Surgery to repair an injury or deformity
              can be covered.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">
                Routine foot care and most alternative care.
              </strong>{" "}
              Routine foot care is excluded. Acupuncture is covered only for chronic low back pain.
              Chiropractic care is covered only to correct a spinal subluxation.
            </li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">The cost-sharing gaps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Even for covered services, Medicare leaves you with a share of the bill. These are the
            2026 figures:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">
                Your share of Medicare costs in 2026
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Cost
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Your share in 2026
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Part A hospital deductible
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    $1,736 per benefit period
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Part B annual deductible
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    $283 per year
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Part B coinsurance
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    20 percent of covered services, with no yearly cap
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Skilled nursing facility
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Days 1 to 20 cost $0. Days 21 to 100 have a daily coinsurance. After day 100,
                    you pay the full cost. A 3-day inpatient hospital stay is required first.
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Prescription drugs
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Not covered by Parts A and B. A Part D plan caps covered drug costs at $2,100
                    out of pocket in 2026.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-28 mt-12 font-semibold">How people fill the gaps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Nobody is expected to face these gaps unprotected. Here is how people cover each one:
          </p>
          <ol className="text-17 mt-4 flex list-decimal flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Medigap</strong> pays much of the Part A
              and Part B cost-sharing, including the 20 percent coinsurance.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Medicare Advantage</strong> plans have a
              yearly out-of-pocket maximum and add dental, vision, and hearing benefits.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Part D</strong> covers outpatient
              prescription drugs with a yearly cap on your costs.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">
                Standalone dental and vision plans
              </strong>{" "}
              cover the routine care Medicare excludes.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">
                Long-term care insurance
              </strong>{" "}
              covers custodial care that Medicare never pays for.
            </li>
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Comparing your options side by side?{" "}
            <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
              Here is Medicare Advantage vs. Medigap in plain English
            </Link>
            . For the full cost picture,{" "}
            <Link href="/medicare-costs" className="underline underline-offset-2">
              here is what Medicare costs
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
            Questions about your own coverage? Call or text Christian Brinkley in Greensboro, NC
            at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="Find out what your plan actually covers"
        body={`Bring your current plan details. We will walk through the gaps that apply to you and what fills them, before December 7. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
