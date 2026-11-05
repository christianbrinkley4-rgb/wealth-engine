import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT, GOVERNMENT_DISCLAIMER } from "@/lib/agent";
import { formatDollars } from "@/lib/ncLandscapeCopy";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { loadUsIndex, moopChanges } from "@/lib/usMedicareIndex";

import { StatePicker } from "./StatePicker";

/**
 * The Medicare Advantage Index: one national page, every state, 2022-2027.
 *
 * One page on purpose, not 50 templated state pages (doorway risk, and the
 * site's local focus is the Triad). Christian is licensed in North Carolina
 * only, so this page has no call or booking prompt for other states; it
 * points everyone else to their State Health Insurance Assistance Program.
 * Every number is computed from public/data/us-medicare (CMS Landscape files).
 */

export const dynamic = "force-static";

const PATH = "/medicare-index";
const UPDATED = "2026-11-04";

const INDEX = loadUsIndex();
const YEARS = INDEX.years;
const FIRST = YEARS[0];
const LAST = YEARS[YEARS.length - 1];
const CHANGES = moopChanges(INDEX);
const ROSE = CHANGES.filter((c) => c.pct > 0);
const TOP = CHANGES.slice(0, 10);
const FELL = CHANGES.filter((c) => c.pct < 0);
const NC = CHANGES.find((c) => c.code === "NC");
const STATES = Object.entries(INDEX.states)
  .map(([code, s]) => ({ code, name: s.name }))
  .sort((a, b) => a.name.localeCompare(b.name));
const FEWER_THAN_2025 = Object.values(INDEX.states).filter(
  (s) => (s.statewide["2025"]?.plans ?? 0) > (s.statewide[String(LAST)]?.plans ?? 0),
).length;

const TITLE = `Medicare Advantage Index ${LAST}: Every State, ${FIRST}-${LAST}`;
const DESCRIPTION = `How Medicare Advantage changed in every state from ${FIRST} to ${LAST}: plan counts, $0-premium plans and out-of-pocket limits by state and county, from CMS data.`;

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Are Medicare Advantage out-of-pocket limits going up?",
    a: `In most states, yes. The typical (median) in-network out-of-pocket maximum rose in ${ROSE.length} of the ${CHANGES.length} states and territories with data between ${FIRST} and ${LAST}. The largest increase was in ${TOP[0].name}, from ${formatDollars(TOP[0].from)} to ${formatDollars(TOP[0].to)}, about ${TOP[0].pct}%.`,
  },
  {
    q: "Which states saw out-of-pocket limits go down?",
    a: FELL.length
      ? `${FELL.map((c) => `${c.name} (${formatDollars(c.from)} to ${formatDollars(c.to)})`).join(", ")}.`
      : `None. Every state with data had the same or a higher typical limit for ${LAST}.`,
  },
  {
    q: `Are there fewer Medicare Advantage plans for ${LAST}?`,
    a: `In many states. ${FEWER_THAN_2025} states and territories have fewer Medicare Advantage plans open to anyone for ${LAST} than they did in 2025. Fewer plans doesn't automatically mean worse options, but it means more people have to change plans.`,
  },
  {
    q: "Where does this data come from?",
    a: `The Centers for Medicare & Medicaid Services Landscape Source Files for ${FIRST} through ${LAST}. Counts include Medicare Advantage plans open to anyone with Medicare and leave out Special Needs Plans and employer plans. No plan or insurer names are shown.`,
  },
  {
    q: "Where can I get free help with Medicare in my state?",
    a: "Every state has a State Health Insurance Assistance Program (SHIP) with free, unbiased counselors. Find yours at shiphelp.org, or call 1-800-MEDICARE.",
  },
];

const DATASET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: `Medicare Advantage Index: every U.S. state and county, ${FIRST}-${LAST}`,
  description: `Yearly Medicare Advantage plan counts, plans with drug coverage, $0-premium plans with drug coverage, PPO and HMO counts, plans rated 4 stars or higher, median in-network out-of-pocket maximum and Special Needs Plan counts for every county in the 50 states, Washington DC and Puerto Rico, plus statewide stand-alone Part D plan counts and lowest premiums, ${FIRST} through ${LAST}. Counts only.`,
  url: `https://christianbrinkleync.com${PATH}`,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: "https://christianbrinkleync.com/data/us-medicare/index.json",
    },
  ],
  keywords: [
    "Medicare Advantage",
    "out-of-pocket maximum",
    "state",
    "county",
    "CMS Landscape",
    "trend",
  ],
  spatialCoverage: { "@type": "Place", name: "United States" },
  temporalCoverage: `${FIRST}/${LAST}`,
  dateModified: UPDATED,
  isAccessibleForFree: true,
  creator: { "@type": "Person", name: AGENT.name, url: "https://christianbrinkleync.com/about" },
  isBasedOn: {
    "@type": "Dataset",
    name: `CMS Medicare Advantage and Part D Landscape Source Files, CY${FIRST} to CY${LAST}`,
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Centers for Medicare & Medicaid Services",
    },
  },
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: `Medicare Advantage Index: every state, ${FIRST} to ${LAST}`,
    description: `Out-of-pocket limits rose in ${ROSE.length} of ${CHANGES.length} states and territories. Six years of CMS data for every state and county.`,
    path: PATH,
  }),
  twitter: pageTwitter({
    title: `Medicare Advantage Index: every state, ${FIRST} to ${LAST}`,
    description: `Out-of-pocket limits rose in ${ROSE.length} of ${CHANGES.length} states and territories. Six years of CMS data for every state and county.`,
    path: PATH,
  }),
};

const P = "text-17 leading-relaxed text-[var(--color-ink-muted)]";
const TH = "text-16 py-3 pr-4 font-semibold";
const TD = "text-16 py-3 pr-4";

function ChangeTable({ rows, caption }: { rows: typeof CHANGES; caption: string }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <ResponsiveTable className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-[var(--color-navy)]">
            <th scope="col" className={TH}>
              State
            </th>
            <th scope="col" className={TH}>
              Typical out-of-pocket max, first year
            </th>
            <th scope="col" className={TH}>
              {LAST}
            </th>
            <th scope="col" className="text-16 py-3 font-semibold">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.code} className="border-b border-gray-300 align-top">
              <th scope="row" className={TH}>
                {c.name}
              </th>
              <td className={`${TD} whitespace-nowrap`}>
                {formatDollars(c.from)} ({c.fromYear})
              </td>
              <td className={`${TD} whitespace-nowrap`}>{formatDollars(c.to)}</td>
              <td className="text-16 py-3 whitespace-nowrap">
                {c.pct > 0 ? "+" : ""}
                {c.pct}%
              </td>
            </tr>
          ))}
        </tbody>
      </ResponsiveTable>
    </div>
  );
}

export default function MedicareIndexPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare Advantage Index", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: TITLE,
              description: DESCRIPTION,
              path: PATH,
              datePublished: UPDATED,
              dateModified: UPDATED,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_JSON_LD) }}
      />

      <ServiceHero
        variant="info"
        proof={["Data straight from CMS", "Every state and county", "Free to use, no sign-up"]}
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare Advantage Index" }]}
        eyebrow={`CMS data, ${FIRST} to ${LAST} · Updated November 4, 2026`}
        title="How Medicare Advantage changed in every state"
        lede={`Six years of CMS data for every state and county. The typical out-of-pocket limit rose in ${ROSE.length} of ${CHANGES.length} states and territories, led by ${TOP[0].name} at about ${TOP[0].pct}%.`}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">What the data show</p>
            <ul className={`${P} mt-3 list-disc space-y-2 pl-6`}>
              <li>
                <strong>Worst-case costs are rising almost everywhere.</strong> The typical
                in-network out-of-pocket maximum went up in {ROSE.length} of {CHANGES.length} states
                and territories since {FIRST}.
              </li>
              <li>
                <strong>The biggest jumps.</strong> {TOP[0].name}, {TOP[1].name} and {TOP[2].name}{" "}
                rose {TOP[0].pct}%, {TOP[1].pct}% and {TOP[2].pct}%.
              </li>
              {FELL.length > 0 && (
                <li>
                  <strong>A few went the other way.</strong>{" "}
                  {FELL.map((c) => `${c.name} (${c.pct}%)`).join(", ")}.
                </li>
              )}
              <li>
                <strong>Plans are thinning out.</strong> {FEWER_THAN_2025} states and territories
                have fewer plans open to anyone for {LAST} than in 2025.
              </li>
            </ul>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Look up a state and county</h2>
          <StatePicker states={STATES} />

          <h2 className="text-28 mt-14 font-semibold">Biggest increases in out-of-pocket limits</h2>
          <p className={`${P} mt-4`}>
            The typical (median) in-network out-of-pocket maximum for Medicare Advantage plans open
            to anyone, from each state&apos;s first reported year to {LAST}.
          </p>
          <ChangeTable
            rows={TOP}
            caption="States with the largest increase in the typical out-of-pocket maximum"
          />

          <details className="mt-8">
            <summary className="text-19 cursor-pointer font-semibold">
              See every state ({CHANGES.length})
            </summary>
            <ChangeTable
              rows={[...CHANGES].sort((a, b) => a.name.localeCompare(b.name))}
              caption="Typical out-of-pocket maximum change for every state"
            />
          </details>

          <h2 className="text-28 mt-14 font-semibold">Why the out-of-pocket limit matters</h2>
          <p className={`${P} mt-4`}>
            It&apos;s the most you&apos;d pay in a year for covered, in-network care before the plan
            pays 100%. A $0-premium plan with a high limit can cost far more in a bad health year
            than a plan with a small premium and a low limit. When you compare plans, check the
            limit along with your doctors and your prescriptions.
          </p>

          <div className="mt-10 rounded-xl border-2 border-[var(--color-navy)] p-6">
            <p className="text-19 font-semibold">Live in North Carolina?</p>
            <p className={`${P} mt-2`}>
              {NC
                ? `North Carolina's typical limit went from ${formatDollars(NC.from)} in ${NC.fromYear} to ${formatDollars(NC.to)} for ${LAST}. `
                : ""}
              See{" "}
              <Link href="/medicare-nc-history" className="underline underline-offset-2">
                six years of data for every NC county
              </Link>
              , or call or text me at{" "}
              <a href={AGENT.phoneHref} className="underline underline-offset-2">
                {AGENT.phone}
              </a>{" "}
              for a free review.
            </p>
            <p className="text-19 mt-6 font-semibold">Somewhere else?</p>
            <p className={`${P} mt-2`}>
              I&apos;m licensed in North Carolina only, so I can&apos;t help you choose a plan in
              another state. Your State Health Insurance Assistance Program offers free, unbiased
              counseling: find yours at shiphelp.org, or call 1-800-MEDICARE.
            </p>
          </div>

          <h2 className="text-28 mt-14 font-semibold">Questions</h2>
          <div className="mt-4 space-y-6">
            {FAQS.map((item) => (
              <div key={item.q}>
                <h3 className="text-19 font-semibold">{item.q}</h3>
                <p className={`${P} mt-2`}>{item.a}</p>
              </div>
            ))}
          </div>

          <p className="text-15 mt-12 leading-relaxed text-[var(--color-ink-muted)]">
            Source: Centers for Medicare &amp; Medicaid Services, Medicare Advantage and Part D
            Landscape Source Files for CY{FIRST} through CY{LAST}. Counts include Medicare Advantage
            plans open to anyone with Medicare and exclude Special Needs Plans and employer plans.
            &ldquo;Typical&rdquo; is the median. Alaska has had almost no Medicare Advantage plans,
            and Washington DC isn&apos;t in the {FIRST} and {FIRST + 1} files. The data is free to
            reuse with credit:{" "}
            <a href="/data/us-medicare/index.json" className="underline">
              download it as JSON
            </a>
            . {GOVERNMENT_DISCLAIMER}
          </p>
        </div>
      </section>

      <ComplianceDisclosure variant="general" />
      <MedicareByline reviewed={UPDATED} />
    </main>
  );
}
