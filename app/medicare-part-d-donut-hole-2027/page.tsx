import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Is There Still a Medicare Donut Hole in 2027?
 *
 * People still search "donut hole" constantly, and the answer changed in
 * 2025. Short, direct, CMS figures only: $700 max deductible, $2,400 cap.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Is There Still a Medicare Donut Hole in 2027?",
  },
  description:
    "The Medicare donut hole ended January 1, 2025. Here is how Part D works now: the $700 deductible, the $2,400 out-of-pocket cap, and how to pick a 2027 drug plan.",
  alternates: { canonical: "/medicare-part-d-donut-hole-2027" },
  openGraph: pageOpenGraph({
    title: "Is There Still a Medicare Donut Hole in 2027?",
    description: "No, and here is what replaced it: three simple stages and a cap on what you pay.",
    path: "/medicare-part-d-donut-hole-2027",
  }),
};

const STAGES = [
  {
    t: "Stage 1: Deductible",
    b: "You pay the full cost of your covered drugs until you have spent the plan's deductible. For 2027, no Part D plan may set its deductible above $700. Many plans set it lower, and some charge no deductible on lower-cost drug tiers.",
  },
  {
    t: "Stage 2: Initial coverage",
    b: "After the deductible, you pay your plan's share for each prescription: a copay or coinsurance based on the drug's tier. This is the stage most people spend most of the year in.",
  },
  {
    t: "Stage 3: Catastrophic coverage",
    b: "Once your out-of-pocket spending on covered drugs reaches $2,400 in 2027, you enter catastrophic coverage and pay nothing for covered drugs for the rest of the year. This is what replaced the old coverage gap.",
  },
] as const;

const FAQ = [
  {
    q: "Is there still a donut hole in 2027?",
    a: "No. The coverage gap known as the donut hole was eliminated on January 1, 2025. Part D now has three stages: deductible, initial coverage, and catastrophic coverage, with a $2,400 yearly cap on what you pay out of pocket for covered drugs in 2027.",
  },
  {
    q: "How does Part D work now?",
    a: "You pay up to the deductible first (no more than $700 in 2027), then copays or coinsurance during initial coverage, and once your out-of-pocket spending hits $2,400, covered drugs cost you nothing for the rest of the year. No gap in the middle anymore.",
  },
  {
    q: "What is the 2027 Part D deductible and out-of-pocket cap?",
    a: "The maximum deductible is $700, up from $615 in 2026. The out-of-pocket cap is $2,400, up from $2,100 in 2026. Both figures are set by CMS; individual plans can set a lower deductible but cannot exceed the maximum.",
  },
  {
    q: "What changed from 2026?",
    a: "The deductible maximum rose from $615 to $700, and the out-of-pocket cap rose from $2,100 to $2,400. If you take expensive brand-name drugs, the cap is the number that protects you, and it still applies in full.",
  },
  {
    q: "How do I pick a Part D plan for 2027?",
    a: "Ignore the premium first. Make a list of every drug you take, with dosages, then check which tier each drug sits on and what it costs at your pharmacy. Drug lists and prices change every year, so last year's best plan may not be this year's. A free review walks through your list against the 2027 options.",
  },
] as const;

export default function DonutHole2027Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Donut hole 2027", path: "/medicare-part-d-donut-hole-2027" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Is There Still a Medicare Donut Hole in 2027?",
              description:
                "The donut hole ended in 2025. How Part D's three stages and the $2,400 cap work in 2027.",
              path: "/medicare-part-d-donut-hole-2027",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Donut hole 2027" }]}
        eyebrow="Medicare Part D · 2027 figures"
        title="Is there still a donut hole in 2027?"
        lede="Short answer: no. The coverage gap ended January 1, 2025. Here is how Part D actually works now, what you pay at each stage, and how to pick a drug plan for 2027."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Check my drugs for 2027 →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The direct answer</h2>
          <p className="text-18 mt-4 leading-relaxed">
            There is no donut hole in 2027. The coverage gap, where you once paid a large share of
            drug costs in the middle of the year, was eliminated on January 1, 2025. If someone
            tells you to plan around the donut hole, their information is out of date.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            What replaced it is simpler and better for people with high drug costs: a hard yearly
            cap. In 2027, once your out-of-pocket spending on covered Part D drugs reaches{" "}
            <strong>$2,400</strong>, you pay nothing for covered drugs for the rest of the year.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How Part D works now: three stages</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STAGES.map((item, index) => (
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
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Source: CMS Part D announcements for 2027. The $700 deductible is a maximum; plans may
            set it lower. The $2,400 cap applies to covered drugs.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Picking a 2027 drug plan</h2>
          <p className="text-18 mt-4 leading-relaxed">
            The premium is the least important number on a Part D plan. What matters is what{" "}
            <em>your</em> drugs cost under it. Every plan has its own list of covered drugs, its own
            tiers, and its own prices, and every one of those can change on January 1.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Bring a list of your prescriptions, with dosages, and the pharmacy you prefer. We will
            check each drug against the 2027 plans and find the one where your actual yearly cost is
            lowest. It takes about twenty minutes and it is free.{" "}
            <Link href="/medicare-changes-2027" className="underline underline-offset-2">
              See everything changing for 2027
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
        heading="Let's check your drugs for 2027"
        body={`Bring your prescription list. We will compare what your drugs cost across the 2027 Part D options and find the lowest total for you. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
