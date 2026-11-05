import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { ATLAS_PAGE_PATH } from "@/lib/atlasEmbed";
import { NC_LANDSCAPE } from "@/lib/ncLandscape2027";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { AtlasPreview } from "./AtlasPreview";
import { CopyEmbedCode } from "./CopyEmbedCode";

/**
 * NC Medicare Atlas: the page partners use to put the county widget on their
 * own sites. The widget itself is /embed/county-medicare (lib/atlasEmbed.ts).
 */

const UPDATED = "2026-11-04";
const TITLE = "NC Medicare Atlas: Free County Medicare Tool for Websites";

/** Dataset markup so search engines and AI assistants can recognize the county data as a source. */
const DATASET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "NC Medicare Atlas: 2027 Medicare Advantage changes by North Carolina county",
  description:
    "Medicare Advantage plan counts, $0-premium plans with drug coverage, PPO and HMO counts, plans rated 4 stars or higher, number of insurers and the median in-network out-of-pocket maximum for all 100 North Carolina counties, 2026 compared with 2027. Special Needs Plans and employer plans excluded. Counts only, no plan or insurer names.",
  url: `https://christianbrinkleync.com${ATLAS_PAGE_PATH}`,
  keywords: [
    "Medicare Advantage",
    "North Carolina",
    "2027",
    "county",
    "out-of-pocket maximum",
    "Medicare plan changes",
  ],
  spatialCoverage: { "@type": "Place", name: "North Carolina, United States" },
  temporalCoverage: "2026/2027",
  dateModified: UPDATED,
  isAccessibleForFree: true,
  creator: { "@type": "Person", name: AGENT.name, url: "https://christianbrinkleync.com/about" },
  isBasedOn: {
    "@type": "Dataset",
    name: "CMS CY2027 and CY2026 Medicare Advantage Landscape files",
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Centers for Medicare & Medicaid Services",
    },
  },
};
const DESCRIPTION =
  "A free, embeddable tool that shows what changed in Medicare Advantage for 2027 in every North Carolina county. For libraries, churches, senior centers and local news.";

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does it cost anything to add the Medicare tool to our website?",
    a: "No. It's free, there's no sign-up, and there's nothing to maintain. When the numbers change each year, the tool updates on its own.",
  },
  {
    q: "Does the tool sell or recommend plans?",
    a: "No. It shows county-level counts from CMS data: how many Medicare Advantage plans, how many have a $0 premium, and how the typical out-of-pocket limit changed. It never names a plan or an insurance company, and it points people to Medicare.gov, 1-800-MEDICARE and NC SHIIP for free, unbiased help.",
  },
  {
    q: "Does it track our visitors?",
    a: "The tool runs no ads, analytics or tracking scripts, and it collects nothing from the people who use it. It's a single page of numbers.",
  },
  {
    q: "Where do the numbers come from?",
    a: `The CMS Medicare Advantage Landscape files for 2027 and 2026, last updated ${NC_LANDSCAPE.dataUpdated}. Special Needs Plans and employer plans aren't counted.`,
  },
  {
    q: "Can we remove the credit line under the tool?",
    a: "You can edit or remove anything you paste on your own site. The short credit line just tells your readers where the tool comes from.",
  },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ATLAS_PAGE_PATH },
  openGraph: pageOpenGraph({
    title: "Free 2027 Medicare tool for North Carolina websites",
    description:
      "Every NC county, 2026 vs. 2027, from CMS data. One copy-and-paste. No cost, no tracking.",
    path: ATLAS_PAGE_PATH,
  }),
  twitter: pageTwitter({
    title: "Free 2027 Medicare tool for North Carolina websites",
    description:
      "Every NC county, 2026 vs. 2027, from CMS data. One copy-and-paste. No cost, no tracking.",
    path: ATLAS_PAGE_PATH,
  }),
};

const P = "text-17 leading-relaxed text-[var(--color-ink-muted)]";

export default function NcMedicareAtlasPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "NC Medicare Atlas", path: ATLAS_PAGE_PATH },
            ]),
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
        crumbs={[{ name: "Home", href: "/" }, { name: "NC Medicare Atlas" }]}
        eyebrow="Free tool · Updated November 4, 2026"
        title="Put a free Medicare tool on your website"
        lede="The NC Medicare Atlas shows what changed in Medicare Advantage for 2027 in every North Carolina county. Libraries, churches, senior centers and local news sites can add it with one copy and paste."
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <h2 className="text-28 font-semibold">Here&apos;s what your visitors see</h2>
          <p className={`${P} mt-4`}>
            It works on phones, it&apos;s large-print friendly, and it opens on the county you pick
            below.
          </p>
          <div className="mt-6">
            <AtlasPreview />
          </div>

          <h2 className="text-28 mt-14 font-semibold">Add it to your site</h2>
          <p className={`${P} mt-4`}>
            Copy the code and paste it into your website editor as HTML. Most builders call this an
            &ldquo;embed&rdquo; or &ldquo;custom HTML&rdquo; block: WordPress, Squarespace, Wix and
            Google Sites all have one.
          </p>
          <CopyEmbedCode />

          <h2 className="text-28 mt-14 font-semibold">What it does and doesn&apos;t do</h2>
          <ul className={`${P} mt-4 list-disc space-y-2 pl-6`}>
            <li>It shows county counts from CMS data, 2026 next to 2027.</li>
            <li>
              It never names a plan or an insurance company, and it doesn&apos;t recommend anything.
            </li>
            <li>
              It runs no ads, analytics or tracking, and it collects nothing from your visitors.
            </li>
            <li>
              It points people to Medicare.gov, 1-800-MEDICARE and NC SHIIP for free, unbiased help.
            </li>
            <li>It updates itself when the numbers change. You never have to touch it again.</li>
          </ul>

          <h2 className="text-28 mt-14 font-semibold">Questions</h2>
          <div className="mt-4 space-y-6">
            {FAQS.map((item) => (
              <div key={item.q}>
                <h3 className="text-19 font-semibold">{item.q}</h3>
                <p className={`${P} mt-2`}>{item.a}</p>
              </div>
            ))}
          </div>

          <p className={`${P} mt-14`}>
            Want the full county breakdown instead? It&apos;s on{" "}
            <Link href="/medicare-2027-by-county" className="underline">
              2027 Medicare Advantage plans by NC county
            </Link>
            . Trouble adding the tool? Call or text me at{" "}
            <a href={AGENT.phoneHref} className="underline">
              {AGENT.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <ComplianceDisclosure variant="medicare" />
      <MedicareByline reviewed={UPDATED} />
    </main>
  );
}
