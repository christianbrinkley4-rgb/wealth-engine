import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolsDisclaimer, WealthLinkCard } from "../_components/tool-footer";
import { DATA, FAQS, META } from "./data";
import { MedigapQuizClient } from "./QuizClient";

const path = "/tools/medigap-or-advantage-quiz";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Medigap or Medicare Advantage quiz", description: META.description, path }),
};

const PROOF = [
  "Seven questions, about two minutes",
  "No recommendation, just better questions",
  "Everything runs on your device",
  "Results are educational only",
] as const;

export default function MedigapQuizPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Medigap or Advantage quiz", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Medigap or Advantage quiz" }]}
        eyebrow={`Quiz · ${DATA.questions.length} questions · your answers stay on your device`}
        title="Medigap or Medicare Advantage: 7 questions to ask yourself"
        lede="Everyone at the senior center has an opinion, and they all contradict each other. This quiz will not pick a plan for you. It asks how you use health care, what you want to spend, and how much flexibility matters, then hands you a short list of questions to bring to a licensed agent."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <MedigapQuizClient />
        </div>
      </section>

      <MathSection
        title="How the quiz works"
        howTo={[
          "Answer all seven questions, picking the option closest to your situation.",
          "Read your result. It hands you questions to ask, not a recommendation.",
          "Bring the question list to a licensed agent to compare real plans.",
        ]}
        howToTitle="How to use this quiz"
        formula={{
          label: "The scoring rule",
          expression:
            "Score for each outcome = points from every answer leaning toward it\n\nWinning outcome = the highest score\nTie = genuinely mixed, stated plainly instead of a forced pick",
          note: "Skipped questions add no points.",
        }}
      >
        <p>
          Each answer leans a little toward one path or the other: Medigap, Medicare Advantage, or
          genuinely mixed. The path with the most leans wins. If your answers split evenly, the
          result says so plainly instead of forcing a pick.
        </p>
        <p>
          The result is not a recommendation. It is a personalized list of questions about doctors,
          drugs, costs, and timing, the same questions a good agent would ask you in a first
          conversation.
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

      <WealthLinkCard
        href="/advantage-vs-medigap"
        eyebrow="Go deeper"
        title="Medicare Advantage vs Medigap, side by side"
        body="The full comparison: how each path handles doctors, drugs, travel, and costs, in plain English."
      />
      <KitchenTableClose
        heading="The quiz raised a question? Bring it to me"
        body="Bring your result and your question list to a free 20-minute call. We will go through your doctors, your prescriptions, and what each path would really cost you."
        href="/start"
        label="Start a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ToolsDisclaimer />
        <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Questions go directly to {AGENT.name} in {AGENT.city}, {AGENT.state} at{" "}
          <a href={AGENT.phoneHref} className="underline underline-offset-2">
            {AGENT.phone}
          </a>
          . They are not sold to other agents.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
