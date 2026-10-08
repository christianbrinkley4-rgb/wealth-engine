import type { Metadata } from "next";
import Link from "next/link";
import { STANDALONE_GUIDES } from "@/lib/standaloneGuides";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";

import { GuideCapture } from "@/app/components/GuideCapture";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Money, Tax, and Medicare Guides | Christian Brinkley" },
  description:
    "Find practical tax and money guides for U.S. readers, plus Medicare enrollment guides for Greensboro and the Triad.",
  alternates: { canonical: "/guides" },
};


const PROOF = [
  "Plain English, no jargon",
  "Figures checked against official sources",
  "Free to read, no email wall",
] as const;

export default function GuidesPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
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

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }]}
        eyebrow="Guides · free to read"
        title="Money, tax, and Medicare guides"
        lede="Start with the question in front of you. Money and tax guides cover federal rules for U.S. readers. Medicare help focuses on the Triad in North Carolina."
        secondaryHref="/tools"
        secondaryLabel="Try the calculators →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell">
          <h2 className="text-28 font-semibold">Work, taxes, and account changes</h2>
          <div className="hub-grid mt-8">
            {TRAFFIC_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="hub-card card-surface card-interactive"
              >
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className="hub-go">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell">
          <h2 className="text-28 font-semibold">Retirement and Medicare</h2>
          <div className="hub-grid mt-8">
            {STANDALONE_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="hub-card card-surface card-interactive"
              >
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className="hub-go">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <GuideCapture />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
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
          <p className="text-15 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Educational information only, not personalized tax, legal, or investment advice.
            Christian is an insurance agent (NC Life &amp; Health), not a CPA or registered
            investment adviser.
          </p>
          <address className="text-15 mt-4 not-italic text-[var(--color-ink-muted)]">
            Christian Brinkley · Greensboro, NC ·{" "}
            <a className="underline" href="tel:+19194086671">
              (919) 408-6671
            </a>
          </address>
        </div>
      </section>
    </main>
  );
}
