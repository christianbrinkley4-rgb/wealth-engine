import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medigap plan letters and how to buy one in Winston-Salem, NC.
 *
 * Compliance: no premiums invented. Figures are presented as approximate
 * published ranges with the factors that move them. No carrier or plan
 * recommendations. Standardized benefits described from federal rules.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medigap Plans in Winston-Salem NC: Letters, Costs, Enrollment",
  },
  description:
    "Medigap plans in Winston-Salem, NC: every plan letter explained, what they cost here, and the enrollment window that protects you. From a licensed local agent.",
  alternates: { canonical: "/medigap-plans-winston-salem-nc" },
  openGraph: pageOpenGraph({
    title: "Medigap Plans in Winston-Salem, NC",
    description:
      "The plan letters, what they cover, what they cost in the Triad, and the six-month window you cannot afford to miss.",
    path: "/medigap-plans-winston-salem-nc",
  }),
  twitter: pageTwitter({
    title: "Medigap Plans in Winston-Salem, NC",
    description:
      "The plan letters, what they cover, what they cost in the Triad, and the six-month window you cannot afford to miss.",
    path: "/medigap-plans-winston-salem-nc",
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
    q: "What is the most popular Medigap plan in Winston-Salem?",
    a: "Plan G, by a wide margin. It covers nearly everything Original Medicare does not, except the Part B deductible. Plan N is the main alternative for people who want a lower premium and are comfortable with small copays.",
  },
  {
    q: "How much does Medigap cost in Winston-Salem?",
    a: "For a 65-year-old in the Triad, Plan G runs roughly $130 a month, but that is an approximation, not a quote. Your price depends on the insurer, your age, tobacco use, and discounts. Plan N and high-deductible G cost less per month. The only way to know your price is a real quote.",
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

export default function MedigapPlansWinstonSalemPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medigap plans in Winston-Salem", path: "/medigap-plans-winston-salem-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medigap Plans in Winston-Salem NC: Letters, Costs, Enrollment",
              description:
                "Every Medigap plan letter explained, what they cost in the Triad, and the enrollment window that protects you. Educational, no recommendations.",
              path: "/medigap-plans-winston-salem-nc",
              datePublished: "2026-11-07",
              dateModified: "2026-11-07",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medigap plans in Winston-Salem" }]}
        eyebrow="Winston-Salem, NC · Forsyth County"
        title="Medigap plans in Winston-Salem"
        lede="The letters, what each one covers, what they tend to cost here, and the enrollment window that protects you. Plain English, no sales pitch."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Get real Medigap quotes →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The plan letters, explained</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medigap plans are sold by letter, and the letters are standardized nationwide. A
            Plan G in Winston-Salem covers the same benefits as a Plan G in California. The
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
            For a 65-year-old in the Triad, Plan G runs roughly $130 a month. Plan N
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
            D plan on top. And if your doctors are split between Atrium Health Wake Forest
            Baptist and Novant Health, that matters more for a Medicare Advantage plan than
            for Medigap: with Original Medicare plus a Supplement, any doctor who accepts
            Medicare is covered, whichever system they work in.
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
              href="/medicare-advantage-vs-medigap"
              className="underline underline-offset-2"
            >
              the Advantage vs. Medigap comparison
            </Link>
            . Treat your first decision as the one that counts.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are turning 65 soon, the timeline matters. Start here:{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              the turning 65 guide
            </Link>
            . For local help, see the{" "}
            <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
              Medicare agent in Winston-Salem
            </Link>{" "}
            page.
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
          <h2>Related Winston-Salem Medicare guides</h2>
          <ul>
            <li><Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">Medicare agent in Winston-Salem</Link> - free local help in Forsyth County</li>
            <li><Link href="/medicare-winston-salem-nc" className="underline underline-offset-2">Medicare in Winston-Salem</Link> - costs, enrollment dates, and local help</li>
            <li><Link href="/medicare-advantage-plans-winston-salem-nc" className="underline underline-offset-2">Advantage plans in Winston-Salem</Link></li>
            <li><Link href="/medicare-costs-north-carolina" className="underline underline-offset-2">What Medicare costs in North Carolina</Link></li>
            <li><Link href="/turning-65" className="underline underline-offset-2">Turning 65 in Winston-Salem</Link> - the full local guide</li>
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
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated November 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-11-07" />
      <RelatedMedicareGuides />
    </main>
  );
}
