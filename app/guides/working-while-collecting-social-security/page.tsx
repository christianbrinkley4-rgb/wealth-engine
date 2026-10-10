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
 * Working while collecting Social Security in 2026.
 *
 * Targets "how much can I earn while collecting social security". The 2026
 * earnings-test figures were verified against multiple 2026 sources on
 * October 8, 2026: $24,480 / $65,160, $1 per $2 / $1 per $3.
 */

export const metadata: Metadata = {
  title: {
    absolute: "2026 Earnings Limits While Collecting Social Security",
  },
  description:
    "How much can you earn in 2026 while collecting Social Security? The exact limits: $24,480 before full retirement age, $65,160 in the year you reach it.",
  alternates: { canonical: "/guides/working-while-collecting-social-security" },
  openGraph: pageOpenGraph({
    title: "Working while collecting Social Security: 2026 limits",
    description:
      "The 2026 earnings test in plain English: how much you can earn, what gets withheld, and what counts as earnings.",
    path: "/guides/working-while-collecting-social-security",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How much can I earn in 2026 while collecting Social Security?",
    a: "If you stay under full retirement age all year, you can earn $24,480 with no reduction. In the calendar year you reach full retirement age, the limit is $65,160. After you reach full retirement age, there is no limit.",
  },
  {
    q: "Do I lose the benefits that get withheld?",
    a: "No. Withheld benefits are not lost. Once you reach full retirement age, Social Security recalculates your benefit and your monthly checks go up to account for the months that were withheld.",
  },
  {
    q: "What counts as earnings for the earnings test?",
    a: "Wages and net self-employment income count, including bonuses and commissions. Pensions, annuities, investment income, interest, and veterans benefits do not count toward the limit.",
  },
  {
    q: "Does my spouse's income affect my earnings test?",
    a: "No. The earnings test looks at your earnings only. Your spouse's wages do not count against your limit, and yours do not count against theirs.",
  },
  {
    q: "What is full retirement age?",
    a: "Full retirement age is 67 for anyone born in 1960 or later. It is 66 and a set number of months for people born from 1943 through 1959. Your Social Security statement shows your exact age.",
  },
  {
    q: "Can working while collecting raise my future benefit?",
    a: "Yes. Social Security bases your benefit on your 35 highest-earning years. Strong earnings now can replace a low year in that average and raise your monthly benefit at full retirement age.",
  },
];

export default function WorkingWhileCollectingSocialSecurityPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/working-while-collecting-social-security" },
              {
                name: "Working while collecting Social Security",
                path: "/guides/working-while-collecting-social-security",
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
              headline: "Working While Collecting Social Security: 2026 Earnings Limits",
              description:
                "The 2026 Social Security earnings test: exact limits, withholding rates, what counts as earnings, and what happens to withheld benefits.",
              path: "/guides/working-while-collecting-social-security",
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
          { name: "Working while collecting Social Security" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Working while collecting Social Security"
        lede="You can work and collect at the same time. Before full retirement age, an earnings limit applies. Here are the exact 2026 numbers."
        secondaryHref="/start?topic=retirement"
        secondaryLabel="Talk through your timing"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              The earnings test is Social Security&apos;s rule for people who collect benefits before
              full retirement age and keep working. Earn above the limit and Social Security
              withholds part of your checks. Reach full retirement age and the rule disappears
              completely.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The 2026 limits</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                2026 Social Security earnings test limits by age situation
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Your situation in 2026
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Earnings limit
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    What gets withheld
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Under full retirement age all year
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$24,480 a year</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    $1 withheld for every $2 earned over the limit
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Reaching full retirement age during 2026
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$65,160 a year</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    $1 withheld for every $3 earned over the limit, counting only earnings before
                    the month you reach full retirement age
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    At or past full retirement age
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">No limit</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Nothing withheld, no matter how much you earn
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What the withholding looks like</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Say your benefit is $1,200 a month and you earn $34,480 from a part-time job in 2026.
            That is $10,000 over the $24,480 limit. Social Security withholds $5,000 for the year,
            about $417 a month, by holding back whole checks until the amount is covered.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Report your expected earnings to Social Security in advance. If you do not, the agency
            recovers the overpayment later. That surprise bill is the part people remember.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What counts as earnings</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The test counts wages and net self-employment income. Bonuses and commissions count.
            These do not count: pensions, annuities, investment income, interest, veterans benefits,
            and other government retirement benefits. Only money you earn by working is tested.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Withheld money comes back</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the part most articles bury. Benefits withheld under the earnings test are not
            lost. When you reach full retirement age, Social Security recalculates your benefit to
            credit the months that were withheld. Your monthly checks go up from that point on.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Deciding when to claim in the first place is the bigger question.{" "}
            <Link href="/social-security-timing" className="underline underline-offset-2">
              Here is how to think through your Social Security start date
            </Link>
            . Working also affects your taxes:{" "}
            <Link
              href="/guides/is-social-security-taxed"
              className="underline underline-offset-2"
            >
              here is when Social Security gets taxed
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
            This page is educational only. For your own earnings picture, call or text Christian
            Brinkley in Greensboro, NC at {AGENT.phone}.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="working-while-collecting-social-security" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Plan your work and your benefits together"
        body={`Tell me when you plan to claim and how much you plan to earn. We will walk through the 2026 limits for your situation. Call or text ${AGENT.phone}.`}
        href="/start?topic=retirement"
        label="Talk through your timing"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
