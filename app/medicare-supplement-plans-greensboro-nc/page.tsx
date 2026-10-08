import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Supplement (Medigap) plans in Greensboro, NC.
 *
 * Compliance: premiums are never invented. Figures below are presented as
 * approximate published ranges with the factors that move them, and readers
 * are told to get their own quote. No carrier or plan recommendations.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Supplement (Medigap) Plans: Greensboro NC 2027",
  },
  description:
    "Medigap Plan G vs Plan N in Greensboro, NC: what each covers, what they tend to cost, when to buy, and how to compare. From a licensed local agent.",
  alternates: { canonical: "/medicare-supplement-plans-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Supplement Plans in Greensboro, NC",
    description:
      "Plan G vs Plan N, what they cost here, and the enrollment window that protects you.",
    path: "/medicare-supplement-plans-greensboro-nc",
  }),
};

const PLANS = [
  {
    t: "Plan G: the most complete",
    b: "Plan G covers nearly everything Original Medicare does not, except the Part B deductible. You pay the yearly Part B deductible yourself, then Plan G picks up the rest of the approved costs: hospital coinsurance, skilled nursing, doctor coinsurance, foreign travel emergencies, and more. It is the most popular Medigap plan in North Carolina for people who want predictable costs.",
  },
  {
    t: "Plan N: lower premium, small copays",
    b: "Plan N costs less per month than Plan G. In exchange, you pay the Part B deductible, plus copays of up to $20 for some office visits and up to $50 for emergency room visits that do not lead to admission. If you rarely see the doctor, Plan N can be the better value. If you go often, the copays add up.",
  },
  {
    t: "Other plans: mostly legacy",
    b: "Plans A, B, C, D, F, K, L, and M still exist, but most are legacy options. Plan F is only available if you were eligible for Medicare before January 1, 2020. For most people turning 65 now, the real choice is G versus N.",
  },
] as const;

const FAQ = [
  {
    q: "What Medigap plans are available in Greensboro?",
    a: "The standardized plans G and N are the ones most people choose here, along with the legacy plans still on the market. Because Medigap plans are standardized by the federal government, a Plan G from one insurer covers the same benefits as a Plan G from another. What differs is the premium, the company's rate history, and how they handle claims.",
  },
  {
    q: "How much does Plan G cost in Greensboro?",
    a: "For a 65-year-old in the Greensboro area, Plan G premiums are roughly $130 a month, but that is an approximation, not a quote. Your actual premium depends on the insurer, your exact age, tobacco use, and discounts. The only way to know your price is a real quote, which I can help you get at no cost.",
  },
  {
    q: "Plan G vs. Plan N: which should I pick?",
    a: "It comes down to how often you see the doctor. Plan G costs more monthly and almost nothing when you need care. Plan N costs less monthly, but you pay the Part B deductible plus copays per visit. If you are in and out of offices, G usually wins. If you are healthy and rarely go, N can save money. We can run your actual numbers.",
  },
  {
    q: "When is the best time to buy a Medigap policy?",
    a: "During your six-month Medigap open enrollment period, which starts when you are 65 or older and enrolled in Part B. During those six months, insurers must sell you any policy they offer regardless of your health. After it ends, they can ask health questions and decline you in most situations. Do not let this window pass without deciding.",
  },
  {
    q: "Can I get help comparing Medigap plans?",
    a: "Yes. I will pull real quotes from the insurers I represent, explain what each covers, and tell you where to look for the rest. The comparison is free, with no obligation to buy. Call or text (919) 408-6671.",
  },
] as const;

export default function MedigapGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Medigap plans in Greensboro",
                path: "/medicare-supplement-plans-greensboro-nc",
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
              headline: "Medicare Supplement (Medigap) Plans in Greensboro, NC for 2027",
              description:
                "Plan G vs Plan N, approximate costs, and when to buy a Medigap policy in Greensboro.",
              path: "/medicare-supplement-plans-greensboro-nc",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medigap plans in Greensboro" }]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medicare Supplement plans in Greensboro"
        lede="Medigap fills the gaps Original Medicare leaves: deductibles, coinsurance, and the bills that surprise people. Here is what Plan G and Plan N cover, what they tend to cost here, and the enrollment window you do not want to miss."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Compare real quotes →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The plans people actually buy</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medigap plans are standardized. A Plan G is a Plan G no matter which insurer sells it:
            same benefits, set by the federal government. That makes comparing them simpler than
            most insurance shopping. You compare premiums and companies, not coverage.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {PLANS.map((item, index) => (
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

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What it costs, honestly</h2>
          <p className="text-18 mt-4 leading-relaxed">
            For a 65-year-old in the Greensboro area, Plan G runs roughly $130 a month. That is an
            approximation from published ranges, not a quote for you. Your price depends on the
            insurer, your age, whether you use tobacco, and available discounts. Plan N runs
            meaningfully less per month, with the copay tradeoff described above.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Two things matter more than the starting premium: how the insurer raises rates over
            time, and the company behind the policy. A cheap Plan G from a company with steep annual
            increases is not the bargain it looks like in year one. I will show you real quotes and
            rate histories so you can see the full picture.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Remember: Medigap does not include drug coverage. You pair it with a separate Part D
            plan, which is its own comparison.{" "}
            <Link href="/medicare-part-d-donut-hole-2027" className="underline underline-offset-2">
              How Part D works in 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The window that protects you</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Your six-month Medigap open enrollment period begins when you are 65 or older and
            enrolled in Part B. During it, any insurer selling Medigap in North Carolina must sell
            to you at the best available rate for your age, no matter your health.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            After it ends, insurers can ask health questions and turn you down. That is why the
            Advantage-versus-Medigap decision deserves real thought the first time:{" "}
            <Link
              href="/medicare-advantage-vs-medigap-greensboro-nc"
              className="underline underline-offset-2"
            >
              the Greensboro comparison
            </Link>
            . If you are inside your window now, do not wait.
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about Medigap</h2>
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
        heading="Let's get your real numbers"
        body={`I will pull actual Medigap quotes for your age and zip code, explain the differences, and help you decide before your window closes. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
