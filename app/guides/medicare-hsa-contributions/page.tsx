import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * HSA and Medicare: when contributions must stop.
 *
 * Targets "can you contribute to an HSA while on medicare". Figures are the
 * verified 2026 HSA limits from docs/VERIFIED-FIGURES-2026.md.
 */

export const metadata: Metadata = {
  title: {
    absolute: "HSA and Medicare: When Contributions Must Stop",
  },
  description:
    "You cannot contribute to an HSA once you enroll in any part of Medicare. The 6-month retroactive Part A trap, what stays yours, and 2026 limits.",
  alternates: { canonical: "/guides/medicare-hsa-contributions" },
  openGraph: pageOpenGraph({
    title: "HSA and Medicare: when contributions must stop",
    description:
      "The rules for HSAs at 65: when contributions must stop, the retroactive Part A trap, and how to use your HSA funds on Medicare costs.",
    path: "/guides/medicare-hsa-contributions",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Can I contribute to my HSA after I enroll in Medicare?",
    a: "No. Once you enroll in any part of Medicare, including Part A alone, you cannot make or receive HSA contributions. Contributions made while enrolled can trigger a tax penalty.",
  },
  {
    q: "Why do I have to stop HSA contributions six months before Medicare?",
    a: "Part A coverage can start up to six months before your application date when you apply after 65. Contributions during that window overlap with Medicare coverage and become excess contributions.",
  },
  {
    q: "Can I use my HSA money after I enroll in Medicare?",
    a: "Yes. Funds already in the HSA stay yours. You can use them tax-free for qualified medical expenses, including Medicare Part B, Part D, and Medicare Advantage premiums. Medigap premiums are not a qualified expense.",
  },
  {
    q: "What if my employer keeps contributing to my HSA?",
    a: "Employer contributions count the same as yours. They must stop once your Medicare coverage begins. Tell your employer and your HSA provider your Medicare start date.",
  },
  {
    q: "Can my spouse keep contributing to an HSA after I enroll in Medicare?",
    a: "Yes, in some cases. If your spouse is under 65, still on your high-deductible plan, and not enrolled in Medicare, your spouse can contribute to a separate HSA up to the family limit.",
  },
  {
    q: "What happens to my HSA after age 65 for nonmedical spending?",
    a: "After 65, you can withdraw HSA funds for any reason without the 20 percent penalty. Nonmedical withdrawals are taxed as ordinary income, like a traditional IRA distribution.",
  },
];

export default function MedicareHsaContributionsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-hsa-contributions" },
              { name: "HSA and Medicare", path: "/guides/medicare-hsa-contributions" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "HSA and Medicare: When Contributions Must Stop",
              description:
                "HSA contribution rules at Medicare enrollment: the stop date, the retroactive Part A trap, and how your existing HSA funds still help.",
              path: "/guides/medicare-hsa-contributions",
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
          { name: "HSA and Medicare" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="HSA and Medicare: when contributions must stop"
        lede="Still working at 65 with a high-deductible plan? The HSA rules change the day Medicare starts. Here is the timing that keeps you out of trouble."
        secondaryHref="/start?topic=medicare&stage=turning_65"
        secondaryLabel="Get free help timing it"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              A health savings account (HSA) pairs with a high-deductible health plan. The IRS
              allows contributions only when you have no other health coverage. Medicare counts as
              other coverage. The day any part of Medicare starts, your HSA contribution window
              closes.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The core rule</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Once you enroll in Medicare Part A, Part B, Part C, or Part D, you cannot contribute to
            an HSA. This applies even if you enroll in Part A alone and delay everything else. Your
            employer cannot contribute either. Contributions made while you have Medicare coverage
            are excess contributions and can draw a tax penalty.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 6-month retroactive Part A trap</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the part that catches working people off guard. If you apply for Medicare after
            age 65, your Part A coverage can backdate up to 6 months. That means HSA contributions
            you made in those months overlap with Medicare coverage, even though you applied later.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The safe move: stop all HSA contributions at least 6 months before you apply for
            Medicare. Tell your employer the stop date in writing. Keep a record of it.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What stays yours</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Losing contribution eligibility does not touch money already in the account. Your HSA
            balance stays yours. After Medicare starts, you can keep using it tax-free for qualified
            medical expenses:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Medicare Part B premiums</li>
            <li>Medicare Part D premiums</li>
            <li>Medicare Advantage plan premiums</li>
            <li>Deductibles, copays, and coinsurance</li>
            <li>Dental and vision costs Medicare does not cover</li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One exception to note: Medigap (Medicare Supplement) premiums are not a qualified HSA
            expense. You can pay them from the HSA, but the withdrawal is not tax-free.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 2026 HSA limits</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are still eligible and contributing, these are the 2026 IRS limits:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">2026 HSA contribution limits</caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Coverage
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    2026 limit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Self-only
                  </th>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">$4,400</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Family
                  </th>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">$8,750</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Catch-up, age 55 and older
                  </th>
                  <td className="text-16 py-4 text-[var(--color-ink-muted)]">
                    Extra $1,000 per year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Prorate these limits if you are eligible for only part of the year. The months you have
            Medicare coverage do not count as eligible months.
          </p>

          <h2 className="text-28 mt-12 font-semibold">If you keep working past 65</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You can delay Medicare entirely while you have group coverage from an employer with 20
            or more employees. During that delay, HSA contributions can continue. When the job or
            the coverage ends, you get a special enrollment period for Medicare. That is when the
            6-month lookback starts to matter.{" "}
            <Link href="/guides/medicare-part-b-employer-coverage" className="underline underline-offset-2">
              Here is how Part B works with employer coverage
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
            Timing a Medicare start around work and an HSA? Call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Get the timing right before you enroll"
        body={`Tell me about your work coverage and your HSA. We will map out when to stop contributions and when to start Medicare, so nothing overlaps. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
