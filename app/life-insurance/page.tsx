import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";
import { FeaturedPlaceCards, ServiceAreaTownList } from "@/app/components/ServiceAreaTownList";
import { LeadCluster } from "@/app/components/LeadCluster";
import { SERVICE_AREA_LABEL, SERVICE_AREA_LEDE } from "@/lib/triad";

/**
 * Life insurance, organised around the only question that decides it.
 *
 * The market is saturated with pages comparing term against whole life as
 * though it were a matter of preference. It is not: it is a question of how
 * many more years the money is needed for, and once that is answered the
 * product mostly picks itself. Leading with that is both more useful and more
 * quotable than another comparison table.
 */

export const metadata: Metadata = {
  title: { absolute: "Life Insurance in Greensboro, NC — personal review" },
  description:
    "Review life insurance with Christian Brinkley in Greensboro. Understand your current coverage, your family’s needs, and what may change when you retire. No cost or obligation.",
  alternates: { canonical: "/life-insurance" },
  openGraph: pageOpenGraph({
    title: "Life insurance, reviewed in person in Greensboro",
    description:
      "Personal help reviewing your life insurance, beneficiaries, and coverage needs as you approach retirement.",
    path: "/life-insurance",
  }),
};

const FAQ = [
  {
    q: "Term or whole life?",
    a: "Term insurance covers a set period. Permanent insurance is designed to last longer when the policy’s requirements are met. We can discuss how long you need coverage, what you want it to help pay for, and what fits your budget.",
  },
  {
    q: "I have coverage through work. Is that enough?",
    a: "Your coverage may change or end when you retire. Ask your employer what you can keep and what it would cost. Bring that information so we can review it alongside any personal policies.",
  },
  {
    q: "How much do I need?",
    a: "Think about the expenses your family would need help with, such as a mortgage, everyday bills, or final expenses. We can look at those needs alongside your savings, other income, and existing coverage.",
  },
  {
    q: "I am in my sixties. Is it too late?",
    a: "You may still have options. Eligibility and cost depend on the policy, your age, health, and other factors. A conversation can help you understand what is available and whether additional coverage makes sense for you.",
  },
  {
    q: "What should I check on the policy I already have?",
    a: "Check the coverage amount, premiums, beneficiary information, and how long the policy lasts. We can review any future changes to the cost or benefits and discuss questions to ask your insurer.",
  },
  {
    q: "Do you charge for a review?",
    a: "No. Your consultation is no cost, with no obligation to buy anything. If your current coverage still meets your needs, you may decide to keep it.",
  },
  {
    q: "Do you meet in Greensboro, High Point, and Winston-Salem?",
    a: "Yes. I serve Greensboro, High Point, Winston-Salem, and nearby communities, including Kernersville, Summerfield, Jamestown, Oak Ridge, and Archdale. We can arrange a home visit or talk by phone.",
  },
] as const;

export default function LifeInsurancePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Life insurance", path: "/life-insurance" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Personal life insurance help in Greensboro",
              description:
                "Understand your life insurance options and what to review in an existing policy.",
              path: "/life-insurance",
              datePublished: "2026-08-25",
              dateModified: "2026-09-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Life insurance review",
              description:
                "Personal reviews of existing life insurance in Greensboro and nearby communities. No-cost consultation, with no obligation to buy.",
              path: "/life-insurance",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Life insurance" }]}
        eyebrow={SERVICE_AREA_LABEL}
        title="Protect the people who depend on you"
        lede="Review employer and personal coverage, beneficiaries, policy end dates, and how long your family may need protection. Work directly with a local licensed agent."
        secondaryHref="/start?topic=life_insurance"
        secondaryLabel="Get a personal coverage review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Coverage for a set period of time</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Some needs change over time, such as paying off a mortgage or helping a family member
            until another source of income begins. Term life insurance provides coverage for a set
            period. We can review the length of coverage and what happens when that period ends.
          </p>
          <h2 className="text-28 mt-10 font-semibold">Coverage for longer-term needs</h2>
          <p className="text-18 mt-4 leading-relaxed">
            You may want coverage to help with final expenses or provide support for a loved one
            over a longer period. Permanent life insurance is designed for ongoing coverage when the
            policy’s requirements are met. It’s important to understand the premiums and how the
            policy works over time.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The right fit depends on your needs, your budget, and the coverage you already have.
            We’ll talk through those details before considering a new policy.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">If you already have a policy, check two things</h2>
          <ol className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed">
            <li>
              <strong>Who your beneficiaries are.</strong> Review the people named to receive the
              benefit, especially after a marriage, divorce, death, or other family change. Ask your
              insurer how to update the records if needed.
            </li>
            <li>
              <strong>How long the coverage lasts.</strong> Check the end date, any renewal options,
              and whether the premium or benefits will change. Employer coverage deserves a review
              before your last day of work.
            </li>
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            You can review these details yourself or bring your policy to our consultation. I’m
            happy to explain the wording and help you identify questions to ask.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What our first conversation covers</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I use the first conversation to understand what matters to you, the people you care
            about, and any life insurance coverage you already have. You can ask me questions,
            describe your priorities, and decide whether you want to continue. There is no cost for
            the insurance consultation and no obligation to buy anything.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If financial planning comes up, I coordinate with an advisor. Any services they provide
            are separate and may carry their own fees, which they would explain to you before you
            agree to anything.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me</h2>
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

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Personal help across the Triad</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} You’re welcome to include a spouse or family member in our
            conversation.
          </p>
          <FeaturedPlaceCards
            hrefFor={(place) => `/life-insurance-in/${place.slug}`}
            labelFor={(place) => `Life insurance in ${place.name}`}
          />
          <p className="text-13 mt-8 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Nearby communities
          </p>
          <ServiceAreaTownList hrefFor={(place) => `/life-insurance-in/${place.slug}`} />
          <p className="text-17 mt-6">
            <Link href="/service-area" className="underline underline-offset-2">
              Every town in the service area →
            </Link>
          </p>
          <LeadCluster
            current="/life-insurance"
            heading="More questions as you approach retirement"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Ready for a personal policy review?"
        body="Bring your current policy and employer coverage details. Consultations are free and available in person or by phone."
        href="/start?topic=life_insurance"
        label="Review my coverage →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
