import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medigap plan letters and how to buy one in Greensboro, NC.
 *
 * Compliance: no premiums invented. Figures are presented as approximate
 * published ranges with the factors that move them. No carrier or plan
 * recommendations. Standardized benefits described from federal rules.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medigap Plans in Greensboro NC: Letters, Costs, Enrollment",
  },
  description:
    "Medigap plans in Greensboro, NC: every plan letter explained, what they cost here, and the enrollment window that protects you. From a licensed local agent.",
  alternates: { canonical: "/medigap-plans-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medigap Plans in Greensboro, NC",
    description:
      "The plan letters, what they cover, what they cost in the Triad, and the six-month window you cannot afford to miss.",
    path: "/medigap-plans-greensboro-nc",
  }),
};

const LETTERS = [
  {
    t: "Plan G: the standard choice",
    b: "Covers nearly everything Original Medicare leaves behind: Part A deductible and coinsurance, Part B coinsurance, skilled nursing coinsurance, foreign travel emergencies, and more. You pay the yearly Part B deductible yourself, then Plan G handles the rest of the approved costs. It is the most popular Medigap plan in North Carolina for people who want predictable costs.",
  },
  {
    t: "Plan N: lower premium, small copays",
    b: "Costs less per month than Plan G. In exchange you pay the Part B deductible, plus copays of up to $20 for some office visits and up to $50 for emergency room visits that do not lead to admission. People who rarely see the doctor often come out ahead with N. People who go often usually do better with G.",
  },
  {
    t: "High-deductible Plan G: the budget option",
    b: "Same coverage as Plan G, but you pay a high annual deductible before coverage kicks in. The monthly premium is much lower. It suits people who want catastrophic protection at the lowest monthly cost and can handle a bad year out of savings.",
  },
  {
    t: "Plans A, B, D, K, L, M: mostly legacy",
    b: "These letters still exist but are rarely the right answer for someone turning 65 now. Plan F is closed to anyone who became eligible for Medicare after January 1, 2020. Plan C is closed the same way. For most people, the real decision is G, N, or high-deductible G.",
  },
] as const;

const FAQ = [
  {
    q: "What is the most popular Medigap plan in Greensboro?",
    a: "Plan G, by a wide margin. It covers nearly everything Original Medicare does not, except the Part B deductible. Plan N is the main alternative for people who want a lower premium and are comfortable with small copays.",
  },
  {
    q: "How much does Medigap cost in Greensboro?",
    a: "For a 65-year-old in the Greensboro area, Plan G runs roughly $130 a month, but that is an approximation, not a quote. Your price depends on the insurer, your age, tobacco use, and discounts. Plan N and high-deductible G cost less per month. The only way to know your price is a real quote.",
  },
  {
    q: "Are Medigap benefits the same from every company?",
    a: "Yes. Medigap plans are standardized by federal law. A Plan G from one insurer covers exactly the same benefits as a Plan G from another. What differs is the premium, the company's rate history, and how they handle claims and customer service.",
  },
  {
    q: "When can I buy Medigap without health questions?",
    a: "During your six-month Medigap open enrollment period, which starts when you are 65 or older and enrolled in Part B. During it, any insurer selling Medigap in North Carolina must sell to you at the best available rate for your age, regardless of health. After it ends, insurers can ask health questions and decline you.",
  },
  {
    q: "Does Medigap cover prescription drugs?",
    a: "No. Medigap has never included drug coverage. You pair it with a separate Part D plan. That is a second comparison with its own enrollment rules and its own penalty for waiting.",
  },
  {
    q: "Can I switch Medigap plans later?",
    a: "You can apply to switch any time, but outside your open enrollment period and special protections, insurers in North Carolina can ask health questions and turn you down. If you are thinking about switching, apply and get approved before you cancel anything.",
  },
] as const;

export default function MedigapPlansGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medigap plans in Greensboro", path: "/medigap-plans-greensboro-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medigap Plans in Greensboro NC: Letters, Costs, Enrollment",
              description:
                "Every Medigap plan letter explained, what they cost in the Triad, and the enrollment window that protects you. Educational, no recommendations.",
              path: "/medigap-plans-greensboro-nc",
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medigap plans in Greensboro" }]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medigap plans in Greensboro"
        lede="The letters, what each one covers, what they tend to cost here, and the enrollment window that protects you. Plain English, no sales pitch."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Get real Medigap quotes →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The plan letters, explained</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medigap plans are sold by letter, and the letters are standardized nationwide. A
            Plan G in Greensboro covers the same benefits as a Plan G in California. The
            letter tells you the coverage. The company tells you the price.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {LETTERS.map((item, index) => (
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
          <h2 className="text-28 font-semibold">What Medigap costs in the Triad</h2>
          <p className="text-18 mt-4 leading-relaxed">
            For a 65-year-old in the Greensboro area, Plan G runs roughly $130 a month. Plan N
            runs meaningfully less. High-deductible G runs less still. Those are
            approximations from published ranges, not quotes for you.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your actual premium depends on the insurer, your exact age, whether you use
            tobacco, and household or other discounts. Two companies can charge very
            different prices for the identical Plan G. That is why comparing quotes matters
            more than comparing letters.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Two things matter more than the starting premium: how the insurer raises rates
            over time, and the company behind the policy. A cheap Plan G from a company with
            steep annual increases is not the bargain it looks like in year one. I will show
            you real quotes with rate histories so you see the full picture.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Remember that Medigap does not include drug coverage. Budget for a separate Part
            D plan on top:{" "}
            <Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">
              how Part D works in 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The six-month window that protects you</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Your Medigap open enrollment period lasts six months. It starts when you are 65 or
            older and enrolled in Part B. During it, any insurer selling Medigap in North
            Carolina must sell you a policy at the best available rate for your age. No
            health questions. No denials.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            After it ends, the rules change. Insurers can ask about your health and decline
            your application. This is the single most misunderstood part of the
            Advantage-versus-Medigap decision:{" "}
            <Link
              href="/medicare-advantage-vs-medigap-greensboro-nc"
              className="underline underline-offset-2"
            >
              the Greensboro comparison
            </Link>
            . Treat your first decision as the one that counts.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are turning 65 soon, the timeline matters. Start here:{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              the turning 65 guide for Greensboro
            </Link>
            .
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

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Related Greensboro Medicare guides</h2>
          <ul>
            <li><Link href="/greensboro-medicare-cost-calculator" className="underline underline-offset-2">Greensboro Medicare cost calculator</Link> - estimate your yearly costs</li>
            <li><Link href="/medicare-advantage-plans-greensboro-nc" className="underline underline-offset-2">Advantage plans in Greensboro</Link></li>
            <li><Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">Part D drug coverage in Greensboro</Link></li>
            <li><Link href="/medicare-costs-north-carolina" className="underline underline-offset-2">What Medicare costs in North Carolina</Link></li>
            <li><Link href="/turning-65" className="underline underline-offset-2">Turning 65 in Greensboro</Link> - the full local guide</li>
          </ul>
        </div>
      </section>

      <KitchenTableClose
        heading="Let's get your real Medigap numbers"
        body={`I will pull actual quotes for your age and zip code, show you rate histories, and help you decide before your window closes. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free Medigap review →"
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
    </main>
  );
}
