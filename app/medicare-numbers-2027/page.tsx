import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * 2027 Medicare numbers at a glance: the linkable one-pager.
 *
 * Built to be cited. Every figure is labeled final or projected, with the
 * CMS source and announcement date spelled out. Nothing is invented:
 * Part B premium and deductible for 2027 are NOT final until CMS announces
 * them in November, so they appear as the 2026 confirmed figure plus the
 * Trustees projection, clearly marked.
 */

export const metadata: Metadata = {
  title: {
    absolute: "2027 Medicare Costs at a Glance: Premiums, Deductibles, Caps",
  },
  description:
    "2027 Medicare numbers in one place: Part D $700 deductible and $2,400 cap (final), Part B projections, key dates. Sourced from CMS.",
  alternates: { canonical: "/medicare-numbers-2027" },
  openGraph: pageOpenGraph({
    title: "2027 Medicare numbers at a glance",
    description:
      "Part D deductible, the drug cost cap, Part B projections, and the key dates, with every figure sourced from CMS.",
    path: "/medicare-numbers-2027",
  }),
};

type Row = {
  figure: string;
  y2026: string;
  y2027: string;
  status: string;
};

const ROWS: Row[] = [
  {
    figure: "Part D standard deductible (max)",
    y2026: "$615",
    y2027: "$700",
    status: "Final. CMS CY2027 Rate Announcement, April 6, 2026.",
  },
  {
    figure: "Part D out-of-pocket cap",
    y2026: "$2,100",
    y2027: "$2,400",
    status: "Final. CMS CY2027 Rate Announcement, April 6, 2026. Once you hit the cap, you pay $0 for covered drugs the rest of the year.",
  },
  {
    figure: "Part B standard premium",
    y2026: "$202.90 / month",
    y2027: "~$209.50 / month",
    status: "Projection. 2026 Medicare Trustees Report. CMS announces the final figure in November.",
  },
  {
    figure: "Part B annual deductible",
    y2026: "$283",
    y2027: "~$292",
    status: "Projection. 2026 Medicare Trustees Report. Not final until CMS announces in November.",
  },
  {
    figure: "Part A hospital deductible",
    y2026: "$1,736",
    y2027: "Not yet announced",
    status: "CMS announces the 2027 figure in the fall, usually with the Part B numbers. Part A has no monthly premium for most people.",
  },
  {
    figure: "Medicare Advantage average premium",
    y2026: "See note",
    y2027: "~$12 / month",
    status: "CMS projection, September 28, 2026. National average; your plan's actual premium is what matters.",
  },
];

const DATES = [
  {
    t: "October 15, 2026",
    b: "Annual Enrollment Period opens. You can join, switch, or drop Medicare Advantage and Part D plans.",
  },
  {
    t: "December 7, 2026",
    b: "Annual Enrollment Period closes. This deadline does not move. Changes take effect January 1, 2027.",
  },
  {
    t: "January 1, 2027",
    b: "New coverage and the new 2027 figures take effect. The Part D cap drops to $0 cost-sharing once reached.",
  },
  {
    t: "November 2026",
    b: "CMS announces the final 2027 Part B premium, Part B deductible, and income-related adjustment amounts. This page updates when that happens.",
  },
] as const;

export default function MedicareNumbers2027Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "2027 Medicare numbers", path: "/medicare-numbers-2027" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".sh-title", ".sh-lede"],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "2027 Medicare Costs at a Glance: Premiums, Deductibles, Caps",
              description:
                "The 2027 Medicare numbers in one table: final CMS figures for Part D, projected Part B costs, and the enrollment dates that matter.",
              path: "/medicare-numbers-2027",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "2027 Medicare numbers" }]}
        eyebrow="Updated October 8, 2026 · Sourced from CMS"
        title="2027 Medicare numbers at a glance"
        lede="One page, every key 2027 figure, each one labeled final or projected with its source. Share it, print it, cite it. When CMS announces the final Part B numbers in November, this page updates."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free 2027 review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <h2 className="text-28 font-semibold">The numbers</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The Part D figures are final: CMS set them in April. The Part B premium and deductible
            are projections from the Medicare Trustees Report until CMS announces the real numbers
            in November. A number marked projected is an estimate, not a promise.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                2027 Medicare cost figures compared with 2026, with source status for each
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Figure
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    2026 (final)
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    2027
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Status and source
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.figure} className="border-b border-gray-300 align-top">
                    <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                      {row.figure}
                    </th>
                    <td className="text-16 whitespace-nowrap py-4 pr-4">{row.y2026}</td>
                    <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold text-[var(--color-navy)]">
                      {row.y2027}
                    </td>
                    <td className="text-15 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-16 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: Centers for Medicare and Medicaid Services, CY2027 Rate Announcement
            (April 6, 2026) and 2027 MA/Part D landscape press release (September 28, 2026);
            2026 Medicare Trustees Report for projections.{" "}
            <Link
              href="https://www.cms.gov/newsroom/fact-sheets"
              className="underline underline-offset-2"
            >
              CMS newsroom fact sheets
            </Link>
            . These are national figures; your plan&apos;s premiums, deductibles, and drug
            costs are in its Annual Notice of Change.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The dates that matter</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {DATES.map((item) => (
              <div key={item.t} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.t}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            What do these numbers mean for your plan?{" "}
            <Link href="/medicare-changes-2027" className="underline underline-offset-2">
              Here is what is changing for 2027, explained in plain English
            </Link>
            . For the full cost picture including Part A hospital costs,{" "}
            <Link href="/medicare-costs" className="underline underline-offset-2">
              here is what Medicare costs
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <KitchenTableClose
        heading="Want these numbers applied to your plan?"
        body={`Bring your plan's Annual Notice of Change and your prescription list. We will check what 2027 actually costs you before December 7. The review is free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
