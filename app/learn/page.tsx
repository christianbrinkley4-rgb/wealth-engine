import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LearnLibrary } from "@/components/LearnLibrary";
import { learnEntries, SITUATIONS } from "@/lib/learn";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

const title = "The Learning Hub: Medicare, Taxes & Retirement in Plain English";
const description =
  "Plain-English guides on Medicare, Social Security, taxes in retirement, and insurance, organized by where you are. From Christian Brinkley in Greensboro, NC.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/learn" },
  openGraph: pageOpenGraph({ title: "The Learning Hub", description, path: "/learn" }),
};

export default function LearnPage() {
  const entries = learnEntries();
  const start = entries.find((entry) => entry.href === "/turning-65");
  const check = entries.find((entry) => entry.href === "/plan-check");

  return (
    <main className="lh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Learning Hub", path: "/learn" },
            ]),
          ),
        }}
      />

      <section className="lh-hero">
        <div className="lh-hero-bg" aria-hidden />
        <div className="shell lh-hero-grid">
          <div>
            <p className="eyebrow">The Learning Hub</p>
            <h1 className="lh-title">
              Plain answers to the money questions <em>nobody explains.</em>
            </h1>
            <p className="lh-lede">
              {entries.length} guides, answers, and tools on Medicare, Social Security, taxes, and
              insurance. Organized by where you are, written the way I’d explain it at your
              kitchen table. No sales pitch. No email wall.
            </p>
          </div>
          <div className="lh-start">
            <p className="lh-start-label">New here? Start with one of these.</p>
            {[start, check].map((entry) =>
              entry ? (
                <Link key={entry.href} href={entry.href} className="card lh-start-card">
                  <span className="lib-kind">{entry.kind}</span>
                  <span className="lh-start-title">{entry.title}</span>
                  <ArrowRight size={20} aria-hidden />
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <LearnLibrary situations={SITUATIONS} entries={entries} />

      <KitchenTableClose
        heading="Didn’t find your question?"
        body="Ask me. If it’s a good one, there’s a decent chance it becomes the next guide here."
        href="/start"
        label="Ask me your question"
      />

      <div className="shell pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
