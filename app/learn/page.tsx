import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LearnLibrary } from "@/components/LearnLibrary";
import { AGENT } from "@/lib/agent";
import { learnEntries, SITUATIONS } from "@/lib/learn";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

const title = "Medicare & Retirement Learning Hub";
const description =
  "Plain-English guides on Medicare, Social Security, taxes in retirement, and insurance, organized by where you are. From Christian Brinkley in Greensboro, NC.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/learn" },
  openGraph: pageOpenGraph({ title: "The Learning Hub", description, path: "/learn" }),
};

const RULES = [
  {
    title: "My name is on every page.",
    text: "I answer for what’s written here, and my number is right next to it. If something reads wrong or doesn’t fit your situation, call me and tell me.",
  },
  {
    title: "The numbers come from the source.",
    text: "Medicare figures come from Medicare.gov and CMS. Social Security and tax rules come from SSA and the IRS. Answers and explainers list their sources at the bottom.",
  },
  {
    title: "Every article shows its date.",
    text: "Medicare’s numbers change each year. Articles show when they were last updated, and I go back through the yearly figures when the new ones come out.",
  },
  {
    title: "No plan pitches.",
    text: "These pages explain how things work. They don’t name insurance companies or tell you which plan to pick. That part depends on your doctors, your prescriptions, and your budget.",
  },
] as const;

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
            <div className="lh-author">
              <Image
                src="/christian-brinkley-square.jpg"
                alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}`}
                width={160}
                height={160}
                sizes="72px"
              />
              <p>
                <strong>
                  By <Link href="/about">{AGENT.name}</Link>
                </strong>
                <span>
                  {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
                </span>
                <span>
                  Stuck on something? Call me at <a href={AGENT.phoneHref}>{AGENT.phone}</a>.
                </span>
              </p>
            </div>
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

      <section className="section-tight lh-rules" aria-labelledby="lh-rules-heading">
        <div className="shell lh-rules-grid">
          <div>
            <p className="eyebrow" data-reveal>
              How I keep this honest
            </p>
            <h2 id="lh-rules-heading" data-reveal>
              One name. Official sources. <em>Dates on everything.</em>
            </h2>
          </div>
          <ul className="lh-rules-list">
            {RULES.map((rule, index) => (
              <li key={rule.title} data-reveal style={{ "--i": index } as React.CSSProperties}>
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
