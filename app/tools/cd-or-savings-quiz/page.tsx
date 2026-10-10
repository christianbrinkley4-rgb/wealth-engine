import type { Metadata } from "next";

import { ToolHeader } from "../_components/tool-header";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { FAQS, META } from "./data";
import { CdSavingsQuizClient } from "./QuizClient";

const path = "/tools/cd-or-savings-quiz";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "CD or savings quiz", description: META.description, path }),
};


export default function CdSavingsQuizPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "CD or savings quiz", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "CD or savings quiz" }]} title="CD or high-yield savings: which fits your cash?" lede="The bank is offering 4% and you are not sure if you should lock it in. Six questions about when you will need the money and how much access matters." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <CdSavingsQuizClient />
        </div>
      </section>

      <MathSection
        title="How the quiz works"
        howTo={[
          "Answer all six questions, picking the option closest to how you use cash.",
          "Read your result. It is a plain-English read, not a recommendation.",
          "Work through the comparison checklist before you open any account.",
        ]}
        howToTitle="How to use this quiz"
        formula={{
          label: "The scoring rule",
          expression:
            "Score for each outcome = points from every answer leaning toward it\n\nWinning outcome = the highest score\nTie = high-yield savings, the simpler option",
          note: "Skipped questions add no points.",
        }}
      >
        <p>
          Each answer leans toward one of three outcomes: a high-yield savings account, a CD, or a
          mix of the two. The outcome with the most leans wins, and ties go to the simpler option.
        </p>
        <p>
          The quiz weighs three things: when you will need the money, how you feel about
          early-withdrawal penalties, and whether you prefer a locked-in rate or a flexible one.
        </p>
        <p>
          This is a starting point, not advice. Rates change, and the quiz cannot see your full
          finances. Every result ends with a checklist so you can compare real accounts yourself.
        </p>
      </MathSection>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions about this quiz</h2>
          <div className="mt-6 space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-17 font-semibold">{faq.q}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolClose
        wealthHref="/wealth/emergency-fund-guide"
        wealthEyebrow="Go deeper"
        wealthTitle="The emergency fund guide"
        wealthBody="How much to keep reachable, where to keep it, and how to build it month by month. Plain English, no jargon."
        ctaHeading="Sorting out where your cash should live?"
        ctaBody="A free 20-minute call can help you decide how much stays reachable and how much can work harder, in the context of your whole picture."
        related={[
          { href: "/tools/compound-interest", label: "Compound interest calculator" },
          { href: "/guides/hysa-vs-money-market-account", label: "HYSA vs money market account" },
          { href: "/wealth/learn/emergency-funds", label: "Emergency funds, step by step" },
        ]}
      />
    </main>
  );
}
