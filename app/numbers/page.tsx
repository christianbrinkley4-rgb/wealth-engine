import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { IRMAA_NOTE, LAST_UPDATED_ISO, LAST_UPDATED_LABEL, SECTIONS } from "./data";
import { NUMBERS_METADATA } from "./meta";

/**
 * The annual numbers hub: every 2026 and 2027 money figure in one place.
 * Designed to be cited. Every figure already appears verbatim on a sourced
 * page of this site; the fall update procedure lives in
 * docs/NUMBERS-UPDATE-PLAYBOOK.md.
 */

export const metadata = {
  ...NUMBERS_METADATA,
  openGraph: pageOpenGraph({
    title: "2026-2027 money numbers at a glance",
    description:
      "Tax brackets, retirement and HSA limits, Social Security, and Medicare costs, each tied to a named source.",
    path: "/numbers",
  }),
};

const FIGURE_SOURCES = [
  "IRS Revenue Procedure for tax year 2026",
  "SSA 2026 COLA fact sheet",
  "CMS CY2027 Rate Announcement (April 6, 2026)",
  "CMS 2027 MA/Part D landscape press release (September 28, 2026)",
  "2026 Medicare Trustees Report (projections)",
];

export default function NumbersHubPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Money numbers", path: "/numbers" },
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
              headline: "2026-2027 Money Numbers: Taxes, Medicare, Retirement",
              description:
                "Every 2026 and 2027 money number in one place: tax brackets, 401(k) and IRA limits, HSA, Social Security, and Medicare costs. All sourced.",
              path: "/numbers",
              datePublished: "2026-10-08",
              dateModified: LAST_UPDATED_ISO,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "2026-2027 money numbers: federal tax, retirement, HSA, Social Security, Medicare",
            description:
              "Reference figures for tax year 2026 and 2027: federal income tax brackets and standard deductions, retirement account contribution limits, HSA limits, Social Security wage base and COLA, and Medicare premiums, deductibles, and caps.",
            url: "https://christianbrinkleync.com/numbers",
            temporalCoverage: "2026/2027",
            datePublished: "2026-10-08",
            dateModified: LAST_UPDATED_ISO,
            creator: {
              "@type": "Person",
              name: "Christian Brinkley",
            },
          }),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Money numbers" }]}
        eyebrow={`Updated ${LAST_UPDATED_LABEL} · Sourced from the IRS, SSA, and CMS`}
        title="The 2026-2027 money numbers"
        lede="You have googled the same number three times this year and gotten three different answers. One page with the figures everyone looks up: tax brackets, retirement and HSA limits, Social Security, and Medicare costs. Every number is tied to a named source, and a 2027 cell says &quot;Not yet announced&quot; instead of guessing. Share it, cite it, print it."
        secondaryHref="/start?topic=retirement"
        secondaryLabel="Ask about your numbers →"
      />

      {SECTIONS.map((section, index) => (
        <section
          key={section.id}
          className={index % 2 === 0 ? "bg-white py-14" : "bg-[var(--color-paper)] py-14"}
        >
          <div className="measure-prose app-shell max-w-4xl">
            <h2 className="text-28 font-semibold">{section.heading}</h2>
            <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
              {section.intro}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">{section.heading}, 2026 and 2027 figures</caption>
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
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row) => (
                    <tr key={`${section.id}-${row.label}`} className="border-b border-gray-300 align-top">
                      <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                        {row.label}
                      </th>
                      <td className="text-16 whitespace-nowrap py-4 pr-4">{row.y2026}</td>
                      <td className="text-16 whitespace-nowrap py-4 pr-4 font-semibold text-[var(--color-navy)]">
                        {row.y2027}
                      </td>
                      <td className="text-15 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                        {row.note ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-16 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
              Source:{" "}
              <a href={section.sourceUrl} className="underline underline-offset-2">
                {section.sourceLabel}
              </a>
              .
            </p>
          </div>
        </section>
      ))}

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">{IRMAA_NOTE.heading}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {IRMAA_NOTE.body}{" "}
            <Link href={IRMAA_NOTE.linkHref} className="underline underline-offset-2">
              {IRMAA_NOTE.linkLabel}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">When the 2027 numbers land</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The IRS publishes the 2027 tax brackets and contribution limits in October. Social
            Security announces the 2027 wage base and COLA in October too. CMS finalizes the 2027
            Part B premium and deductible in November. This page updates as each one lands, and
            the date at the top always says when.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            These are national reference figures. Your plan&apos;s premiums and your own tax
            situation are what matter, so treat this page as the starting point, not the
            answer.{" "}
            <Link href="/medicare-numbers-2027" className="underline underline-offset-2">
              The 2027 Medicare numbers get their own page
            </Link>{" "}
            with more detail on each figure.
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <KitchenTableClose
        heading="Want these numbers applied to your situation?"
        body={`Bring your latest tax return, your plan's Annual Notice of Change, or just your questions. We will run the numbers for your household before December 7. The review is free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=retirement"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-15 leading-relaxed text-[var(--color-ink-muted)]">
          Reference sources: {FIGURE_SOURCES.join("; ")}. Page last updated {LAST_UPDATED_LABEL}.
        </p>
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
