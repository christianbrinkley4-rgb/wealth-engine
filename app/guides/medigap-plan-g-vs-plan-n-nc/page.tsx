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
 * Medigap Plan G vs Plan N in North Carolina.
 *
 * Targets "medigap plan g vs plan n north carolina". Educational
 * comparison using standardized Medigap benefit definitions. No premium
 * figures quoted (they vary by carrier, age, and rating method). No
 * carrier names. The excess-charge difference is the key decision point.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medigap Plan G vs Plan N in North Carolina: Which Fits You?",
  },
  description:
    "Plan G and Plan N are the two most popular Medigap plans. The differences: excess charges, copays, and the monthly cost tradeoff.",
  alternates: { canonical: "/guides/medigap-plan-g-vs-plan-n-nc" },
  openGraph: pageOpenGraph({
    title: "Medigap Plan G vs Plan N in North Carolina",
    description:
      "The real differences between the two most popular Medigap plans, and how to pick.",
    path: "/guides/medigap-plan-g-vs-plan-n-nc",
  }),
  twitter: pageTwitter({
    title: "Medigap Plan G vs Plan N in North Carolina",
    description:
      "The real differences between the two most popular Medigap plans, and how to pick.",
    path: "/guides/medigap-plan-g-vs-plan-n-nc",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is the main difference between Medigap Plan G and Plan N?",
    a: "Three things. Plan G covers Part B excess charges; Plan N does not. Plan N has copays of up to $20 for office visits and up to $50 for emergency room visits that do not lead to admission; Plan G has no copays. And Plan N premiums are generally lower than Plan G premiums, though the exact difference varies by carrier.",
  },
  {
    q: "What are Part B excess charges?",
    a: "Doctors who do not accept Medicare assignment can charge up to 15 percent more than the Medicare-approved amount. That extra is the excess charge. Plan G pays it. Plan N does not, so you pay it yourself. Most doctors accept assignment, but specialists are the ones most likely not to.",
  },
  {
    q: "Is Plan N worth the lower premium?",
    a: "It can be. If you are healthy, see your doctors a few times a year, and your doctors accept Medicare assignment, Plan N often costs less over a full year even with the copays. If you see specialists often, travel a lot, or want the most predictable costs, Plan G is usually the calmer choice. The math depends on your actual doctor visits.",
  },
  {
    q: "Can I switch from Plan N to Plan G later in North Carolina?",
    a: "You can apply to switch at any time, but outside your initial enrollment period or a guaranteed-issue situation, the carrier can require medical underwriting and turn you down based on health. This is the real risk of starting with Plan N to save money: if your health declines, switching to Plan G later is not guaranteed.",
  },
  {
    q: "Do Plan G and Plan N cover the Part B deductible?",
    a: "No. Neither plan covers the annual Part B deductible. You pay that yourself each year before either plan starts paying. No Medigap plan sold to new enrollees covers the Part B deductible; that changed by federal law for anyone who became eligible for Medicare on or after January 1, 2020.",
  },
  {
    q: "Are Plan G benefits the same from every insurance company?",
    a: "Yes. Medigap plans are standardized by federal law. Plan G from one company covers exactly the same benefits as Plan G from another. The differences between companies are the premium, the customer service, and the rate history. Shop the price, not the benefits.",
  },
];

export default function PlanGVsPlanNPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medigap-plan-g-vs-plan-n-nc" },
              { name: "Plan G vs Plan N", path: "/guides/medigap-plan-g-vs-plan-n-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medigap Plan G vs Plan N in North Carolina: Which Fits You?",
              description:
                "The real differences between the two most popular Medigap plans: excess charges, copays, and the cost tradeoff.",
              path: "/guides/medigap-plan-g-vs-plan-n-nc",
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
          { name: "Plan G vs Plan N" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Medigap Plan G vs Plan N in North Carolina"
        lede="The two most popular Medigap plans look almost identical. Three differences decide which one fits you."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free Medigap review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Plan G covers Part B excess charges and has no copays, but costs more each month.
              Plan N costs less each month, but you pay copays for office and ER visits and you
              pay any Part B excess charges yourself. Neither covers the Part B deductible. Both
              are standardized, so the benefits are identical from every company. The choice comes
              down to how much predictability you want versus how much premium you want to save.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What both plans cover</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Start with what is the same, because it is a lot. Both Plan G and Plan N cover your
            Part A hospital deductible and coinsurance, skilled nursing facility coinsurance, the
            Part B 20 percent coinsurance, hospice cost sharing, and the first three pints of
            blood. Neither one covers the annual Part B deductible. You pay that out of pocket
            each year before either plan kicks in. That rule applies to every Medigap plan sold
            to anyone who became eligible for Medicare on or after January 1, 2020.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Difference 1: Part B excess charges</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the biggest structural difference. Doctors who do not accept Medicare
            assignment are allowed to charge up to 15 percent more than the Medicare-approved
            amount for a service. That extra is called an excess charge.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Plan G pays excess charges. Plan N does not. With Plan N, you pay them yourself.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            How much does this matter in practice? Most doctors accept Medicare assignment, so
            most people never see an excess charge. But specialists are the ones most likely not
            to accept assignment, and specialist visits are also the expensive ones. If you see
            specialists regularly, or you want coverage that holds up no matter which doctor you
            end up seeing, Plan G removes the question entirely.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Difference 2: copays</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Plan N has copays that Plan G does not. With Plan N, you can pay up to $20 for each
            office visit and up to $50 for an emergency room visit that does not lead to a
            hospital admission. Plan G has no copays at all.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you see your primary care doctor four times a year, that is up to $80 in copays.
            Not dramatic. But if you are in and out of specialists, the copays add up, and they
            add unpredictability. Every visit is a small bill to think about.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Difference 3: the monthly premium</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Plan N premiums are generally lower than Plan G premiums. The gap varies by carrier,
            your age, and how the carrier sets rates. I am not going to quote you a number here
            because it would be outdated by the time you read it and wrong for your situation
            anyway.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The honest way to compare: take the annual premium difference between the two plans
            from the same company, then subtract what you would likely pay in Plan N copays
            based on your actual doctor visits. If you are healthy and see doctors a few times
            a year, Plan N usually wins that math. If you are in specialists&apos; offices
            monthly, Plan G often wins, and it wins on peace of mind too.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The switching risk nobody mentions</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Here is the part that actually matters most. When you first enroll in Medigap,
            during your six-month open enrollment period after you turn 65 and enroll in Part
            B, you can buy any Medigap plan with no medical underwriting. After that window
            closes, switching plans in North Carolina generally means answering health
            questions, and the carrier can decline you.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            So the real risk of choosing Plan N to save money now: if your health declines and
            you later want the fuller coverage of Plan G, you might not be able to get it. Plan
            G bought at 65 is coverage you keep. Think of the choice as a long-term decision,
            not a one-year price comparison.
          </p>

          <h2 className="text-28 mt-12 font-semibold">How to decide</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Plan N tends to fit people who are healthy, see doctors infrequently, want a lower
            monthly bill, and are comfortable with some cost sharing at each visit. Plan G
            tends to fit people who want the most predictable costs, see specialists regularly,
            travel often, or simply do not want to think about copays and excess charges.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Either way, remember that Medigap benefits are standardized. Plan G from one
            company is the same coverage as Plan G from another. Shop the premium, the
            company&apos;s rate history, and the service, not the benefits.{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Still deciding between Medigap and Medicare Advantage? Start here
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
            Comparing Medigap quotes? Call or text Christian Brinkley in Greensboro, NC at{" "}
            {AGENT.phone}. I will run the real numbers for your situation. The review is free,
            with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medigap-plan-g-vs-plan-n-nc" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Plan G or Plan N? Let's do the math together"
        body={`Tell me about your doctors and how often you see them. I will figure out which plan actually costs less for you. Call or text ${AGENT.phone}.`}
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
