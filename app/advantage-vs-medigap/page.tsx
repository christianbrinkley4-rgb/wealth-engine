import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The comparison everybody searches and almost nobody answers straight.
 *
 * "Medicare Advantage vs Medigap" is the single biggest decision query in the
 * turning-65 space, and nearly every page ranking for it is published by
 * somebody who sells one of the two. This one takes the position the rest of
 * the site takes: neither is better in general, the appropriate answer depends on
 * three specific things about you, and one of the three has a deadline that
 * never comes back.
 *
 * That last part is the reason this page is worth writing. Most comparisons
 * treat the choice as reversible. Going Advantage first and switching to a
 * Medigap policy later usually means medical underwriting, and in most states
 * an insurer can decline you — which turns "you can always change your mind"
 * into something closer to a one-way door.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage vs Medigap in Greensboro, Winston-Salem & High Point",
  },
  description:
    "Compare Medicare Advantage with Original Medicare and Medigap for Greensboro, High Point, and Winston-Salem. Doctors, costs, prescriptions, and enrollment rules — explained plainly.",
  alternates: { canonical: "/advantage-vs-medigap" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage vs Medigap in Greensboro, Winston-Salem & High Point",
    description:
      "Understand the differences in coverage, costs, and enrollment rules before you decide — with a local agent who meets across the Triad.",
    path: "/advantage-vs-medigap",
  }),
};

const DECIDERS = [
  {
    t: "Which doctors you want to keep",
    b: "Original Medicare generally lets you see providers who accept Medicare nationwide. Medicare Advantage plans generally use networks. Check the doctors and hospitals you want to keep with either option.",
  },
  {
    t: "Your monthly budget and costs when you receive care",
    b: "Compare the monthly premiums and what you could pay when you need care. Costs depend on the specific Medigap or Medicare Advantage plan, so it’s helpful to look at both routine care and a year with higher medical expenses.",
  },
  {
    t: "Whether you will still be able to switch later",
    b: "Your six-month Medigap open enrollment period begins when you’re 65 or older and enrolled in Part B. After it ends, health questions may affect your application unless another protection applies. We can help you understand the rules before you change coverage.",
  },
] as const;

const FAQ = [
  {
    q: "Which one is better?",
    a: "The choice depends on your doctors, prescriptions, budget, and preferences. We can compare the options and talk through the costs and coverage you would have with each.",
  },
  {
    q: "Can I switch from Medicare Advantage to Medigap later?",
    a: "You may be able to, but acceptance is not always guaranteed. Before leaving your Medicare Advantage plan, check Medigap eligibility, any health questions, and whether you have guaranteed-issue or trial rights.",
  },
  {
    q: "Do I need a drug plan with each?",
    a: "With Original Medicare and a Medigap policy you buy Part D separately. Most Advantage plans include drug coverage. Either way the drug piece deserves its own look, because plans change their covered medications every year and the one that fit last year may not this year.",
  },
  {
    q: "Are the extras on Advantage plans worth it?",
    a: "Some Medicare Advantage plans include dental, vision, or hearing benefits. Review their limits, provider requirements, and costs along with the plan’s medical and prescription coverage.",
  },
  {
    q: "What if my spouse and I want different things?",
    a: "You and your spouse can choose different Medicare plans. Each person’s doctors, prescriptions, and health needs deserve a separate review.",
  },
  {
    q: "Which do you recommend?",
    a: "We’ll begin with your needs and compare the options I offer. I represent a limited number of insurance companies, and I’ll explain where you can find information about other Medicare choices.",
  },
] as const;

export default function AdvantageVsMedigapPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Advantage vs Medigap", path: "/advantage-vs-medigap" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Understanding Medicare Advantage and Medigap in Greensboro, Winston-Salem & High Point",
              description: "Questions to consider before you choose",
              path: "/advantage-vs-medigap",
              datePublished: "2026-08-31",
              dateModified: "2026-09-18",
            }),
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to decide between Medicare Advantage and Medigap",
              description:
                "Doctors, costs, and enrollment rules to consider when comparing Medicare Advantage and Medigap.",
              path: "/advantage-vs-medigap",
              steps: DECIDERS.map((item) => ({ name: item.t, text: item.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Advantage vs Medigap" }]}
        eyebrow="Greensboro, High Point & Winston-Salem"
        title="Which Medicare option fits your needs?"
        lede="Medicare Advantage and Medigap work differently. Here’s a starting point for understanding your choices in Greensboro, High Point, and Winston-Salem — including what you may pay, which doctors you can see, and what to know about enrolling."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Tell me your situation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> Two ways to arrange your coverage </h2>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Original Medicare with a Medigap policy.</strong> Medigap helps pay certain
            costs that Original Medicare leaves to you, such as deductibles and coinsurance. What it
            pays depends on the policy. You pay a separate Medigap premium, and you can generally
            see providers nationwide who accept Medicare. Prescription coverage is available through
            a separate Part D plan.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Medicare Advantage.</strong> A private insurance plan provides your Part A and
            Part B benefits, and most plans include prescription coverage. You continue paying your
            Part B premium and may have an additional plan premium. Review the provider network, any
            approval requirements for care, copayments, and the yearly limit on covered medical
            costs. Some plans also offer dental, vision, or hearing benefits.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> Questions to consider before you choose </h2>
          <ol className="mt-8 flex flex-col gap-6">
            {DECIDERS.map((item, index) => (
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

          <p
            className="text-18 mt-8 rounded-lg bg-[#f3f0e6] px-5 py-4 leading-relaxed"
            style={{ borderColor: "#7a5c12" }}
          >
            <strong> Before you change coverage. </strong> Changing from Medicare Advantage to
            Original Medicare does not automatically guarantee you can buy a Medigap policy. Check
            your eligibility and any protections that apply before making a change.{" "}
            <Link
              href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when"
              className="underline underline-offset-2"
            >
              Medicare.gov explains when you can buy Medigap
            </Link>
            , including situations with additional protections.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Choosing coverage in the Triad</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medicare Advantage options can vary by county. When we compare plans, we’ll use your
            home address and check the doctors and hospitals you want to use. If you travel often or
            spend part of the year with family elsewhere, bring that up too so we can review how
            each option covers care away from home.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you see doctors with Cone Health, Atrium Health Wake Forest Baptist, Novant Health,
            or another provider, our guide to{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              checking your doctors before choosing a plan
            </Link>{" "}
            can help you confirm the providers you want to keep seeing.{" "}
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about this</h2>
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
        heading="Tell me who you see and what you take"
        body="We can review your doctors, prescriptions, and budget together. The consultation is no cost, with no obligation to enroll."
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
