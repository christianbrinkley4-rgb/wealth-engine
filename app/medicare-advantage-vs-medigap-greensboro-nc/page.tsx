import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Advantage vs. Medigap, localized for Greensboro.
 *
 * The national comparison lives at /advantage-vs-medigap. This page answers
 * the same decision with Greensboro specifics: the county that decides your
 * plan list, the health systems people ask about, and what each path tends
 * to cost here. Educational only; no carrier or plan recommendations.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage vs. Medigap in Greensboro, NC (2027 Guide)",
  },
  description:
    "Medicare Advantage or Medigap in Greensboro, NC? Compare monthly costs, doctor choice, and the switching rules that matter, explained plainly by a licensed local agent.",
  alternates: { canonical: "/medicare-advantage-vs-medigap-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage vs. Medigap in Greensboro, NC",
    description:
      "The honest framework for choosing: your doctors, your budget, and whether you can switch later.",
    path: "/medicare-advantage-vs-medigap-greensboro-nc",
  }),
};

const DECIDERS = [
  {
    t: "Which doctors you want to keep",
    b: "This is where Greensboro specifics matter. If your doctors are with Cone Health, including Moses Cone or Wesley Long, or an independent practice here, we check each one against the plans you are considering. Original Medicare with Medigap generally lets you see providers who accept Medicare nationwide. Medicare Advantage plans generally use networks, and the networks are built county by county.",
  },
  {
    t: "What you pay each month, and when you need care",
    b: "In North Carolina, Medicare Advantage premiums averaged about $12.86 a month in 2026, and many plans charge no premium beyond your Part B. Medigap Plan G in the Greensboro area runs roughly $130 a month for a 65-year-old, varying by insurer, age, and tobacco use. The tradeoff: Medigap costs more monthly and usually much less when you need care. Look at both a routine year and a bad year before you decide.",
  },
  {
    t: "Whether you can change your mind later",
    b: "This is the one people miss. Your six-month Medigap open enrollment starts when you are 65 or older and enrolled in Part B. During it, insurers must sell you a policy regardless of health. After it ends, switching from Medicare Advantage to Medigap usually means answering health questions, and an insurer can decline you. Treat the first decision as the one that counts.",
  },
] as const;

const FAQ = [
  {
    q: "Which is better, Medicare Advantage or Medigap?",
    a: "Neither is better in general. It comes down to your doctors, your prescriptions, your budget, and how much you value predictable costs versus a low monthly premium. We can compare both paths with your actual situation instead of guessing.",
  },
  {
    q: "What does each cost per month in North Carolina?",
    a: "Medicare Advantage premiums in North Carolina averaged about $12.86 a month in 2026, with many plans at $0 beyond your Part B premium. Medigap Plan G in the Greensboro area is roughly $130 a month for a 65-year-old, varying by insurer. But the monthly premium is only half the picture: compare copays, deductibles, and the yearly out-of-pocket maximum too.",
  },
  {
    q: "Can I switch from Medicare Advantage back to Medigap later?",
    a: "You may be able to, but it is not guaranteed. Outside your Medigap open enrollment period and special protections, insurers in North Carolina can ask health questions and decline your application. Before leaving a Medicare Advantage plan, check your Medigap eligibility first.",
  },
  {
    q: "Which Greensboro doctors and hospitals take which plans?",
    a: 'That depends on the specific plan, not the type. Bring a list of your doctors, your preferred hospital, and your pharmacy, and we will check them against the plans you are considering for the year your coverage begins. "Takes Medicare" and "in my plan\'s network" are two different things.',
  },
  {
    q: "How do I decide between them?",
    a: "Start with the three questions above: your doctors, your budget in a good year and a bad year, and whether you want the door to stay open later. Then talk it through with someone who will check the details instead of selling you a default. That is what a free review is for.",
  },
] as const;

export default function AdvantageVsMedigapGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Advantage vs Medigap in Greensboro",
                path: "/medicare-advantage-vs-medigap-greensboro-nc",
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
              headline: "Medicare Advantage vs. Medigap in Greensboro, NC (2027 Guide)",
              description:
                "Doctors, monthly costs, and switching rules for choosing between Medicare Advantage and Medigap in Greensboro.",
              path: "/medicare-advantage-vs-medigap-greensboro-nc",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Advantage vs Medigap in Greensboro" }]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medicare Advantage or Medigap in Greensboro?"
        lede="The biggest Medicare decision most people make, answered for Greensboro: what each path costs here, which doctors you can keep, and the switching rule that makes the first choice the one that counts."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Talk it through with me →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The two paths, briefly</h2>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Original Medicare with a Medigap policy.</strong> Medigap helps pay costs
            Original Medicare leaves to you, like deductibles and coinsurance. You pay a separate
            monthly premium, you buy drug coverage separately through Part D, and you can generally
            see providers who accept Medicare nationwide.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Medicare Advantage.</strong> A private plan provides your Part A and Part B
            benefits, and most plans include drug coverage. You keep paying your Part B premium.
            Plans use provider networks, have copays, and set a yearly limit on your covered medical
            costs. Some include dental, vision, or hearing benefits.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            For the full national comparison, see{" "}
            <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
              Medicare Advantage vs Medigap across the Triad
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Three questions that decide it</h2>
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
          <p className="text-18 mt-8 rounded-lg bg-[#f3f0e6] px-5 py-4 leading-relaxed">
            <strong>Before you change coverage.</strong> Going from Medicare Advantage to Original
            Medicare does not automatically mean you can buy a Medigap policy.{" "}
            <Link
              href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when"
              className="underline underline-offset-2"
            >
              Medicare.gov explains when you can buy Medigap
            </Link>
            , including situations with extra protections.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Greensboro specifics worth knowing</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medicare Advantage and Part D plans are sold by county. Greensboro is in Guilford
            County, which decides the exact list of plans you can buy. Someone fifteen minutes away
            in Forsyth or Alamance County shops from a different list.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            When we compare, we use your home address and check the doctors and hospitals you
            actually use. If you see specialists at Cone Health, get prescriptions at a particular
            pharmacy, or spend part of the year elsewhere, bring that up so we review how each
            option handles it.
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people in Greensboro ask me</h2>
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
        heading="Let's compare both paths for you"
        body={`Bring your doctor list and your prescriptions. We will walk through what each option costs and covers, in Greensboro, for you. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
