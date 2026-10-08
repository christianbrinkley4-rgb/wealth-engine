import type { Metadata } from "next";
import Link from "next/link";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Money, Tax, and Medicare Guides | Christian Brinkley" },
  description:
    "Find practical tax and money guides for U.S. readers, plus Medicare enrollment guides for Greensboro and the Triad.",
  alternates: { canonical: "/guides" },
};

const existing = [
  ["what-medicare-does-not-cover", "What Medicare doesn't cover"],
  ["medicare-hsa-contributions", "Medicare and HSA contributions"],
  ["working-while-collecting-social-security", "Working while collecting Social Security"],
  ["is-social-security-taxed", "Is Social Security taxed?"],
  ["missed-medicare-enrollment", "Missed Medicare enrollment"],
  ["medicare-automatic-renewal", "Medicare automatic renewal"],
  ["medicare-part-b-employer-coverage", "Part B and employer coverage"],
  ["medicare-travel", "Medicare while traveling"],
  ["irmaa-brackets-2026", "2026 IRMAA brackets"],
  ["standard-deduction-seniors-2026", "2026 standard deduction for seniors"],
];

export default function GuidesPage() {
  return (
    <main className="app-shell max-w-4xl py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              headline: "Money, tax, and Medicare guides",
              description: metadata.description!,
              path: "/guides",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ]),
          ]),
        }}
      />
      <h1 className="text-40 font-semibold">Money, tax, and Medicare guides</h1>
      <p className="text-17 mt-4">
        Start with the question in front of you. Money and tax guides cover federal rules for U.S.
        readers. Medicare help focuses on the Triad in North Carolina.
      </p>
      <h2 className="text-28 mt-10 font-semibold">Work, taxes, and account changes</h2>
      <ul className="mt-5 space-y-4">
        {TRAFFIC_GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link className="text-19 underline" href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
            <p className="mt-1">{guide.description}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-28 mt-10 font-semibold">Retirement and Medicare</h2>
      <ul className="mt-5 list-disc space-y-3 pl-6">
        {existing.map(([slug, title]) => (
          <li key={slug}>
            <Link className="underline" href={`/guides/${slug}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        Explore the{" "}
        <Link href="/wealth" className="underline">
          money library
        </Link>{" "}
        and{" "}
        <Link href="/tools" className="underline">
          calculators
        </Link>
        , or{" "}
        <Link href="/start" className="underline">
          start an insurance conversation
        </Link>
        .
      </p>
      <p className="mt-6">
        Educational information only, not personalized tax, legal, or investment advice. Christian
        is an insurance agent (NC Life &amp; Health), not a CPA or registered investment adviser.
      </p>
      <address className="mt-4 not-italic">
        Christian Brinkley · Greensboro, NC ·{" "}
        <a className="underline" href="tel:+19194086671">
          (919) 408-6671
        </a>
      </address>
    </main>
  );
}
