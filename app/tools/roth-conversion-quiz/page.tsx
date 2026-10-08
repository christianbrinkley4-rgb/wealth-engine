import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { DATA, FAQS, META } from "./data";
import { RothConversionQuizClient } from "./QuizClient";

const path = "/tools/roth-conversion-quiz";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Roth conversion quiz", description: META.description, path }),
};

const PROOF = [
  "Six questions, about two minutes",
  "Framework, not financial advice",
  "Everything runs on your device",
  "Ends with a tax pro checklist",
] as const;

export default function RothConversionQuizPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Roth conversion quiz", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Roth conversion quiz" }]}
        eyebrow={`Quiz · ${DATA.questions.length} questions · your answers stay on your device`}
        title="Should you do a Roth conversion this year?"
        lede="Your brother-in-law swears everyone should convert, and your accountant changed the subject. A conversion is a bet on your tax rate now versus later. Six questions about your bracket, your timeline, and how you would pay the tax, then a plain-English read and a checklist to bring to a tax professional."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <RothConversionQuizClient />
        </div>
      </section>

      <MathSection
        title="How the quiz works"
        howTo={[
          "Answer all six questions, picking the option closest to your situation.",
          "Read your result. It is a plain-English read, not a recommendation.",
          "Bring the checklist at the end to a tax professional before you act on it.",
        ]}
        howToTitle="How to use this quiz"
        formula={{
          label: "The scoring rule",
          expression:
            "Score for each outcome = points from every answer leaning toward it\n\nWinning outcome = the highest score\nTie = too close to call, which is listed first",
          note: "Skipped questions add no points. This is a framework, not advice.",
        }}
      >
        <p>
          Each answer leans toward one of three outcomes: a conversion looks worth exploring, it
          probably is not worth it this year, or the call is too close and belongs with a tax pro.
          The outcome with the most leans wins.
        </p>
        <p>
          The three things that decide a conversion are your tax rate now versus later, whether you
          can pay the tax from savings outside the account, and how many years the money has to
          grow. The quiz weighs all three.
        </p>
        <p>
          This is a framework, not advice. Tax law has edges the quiz cannot see: state taxes,
          Medicare premium surcharges, and bracket thresholds. Every result ends with a checklist
          for a tax professional.
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
        wealthHref="/wealth/roth-ira-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Roth IRA, explained without jargon"
        wealthBody="What a Roth IRA actually is, how the tax trade works, and who it fits. Five minutes, plain English."
        ctaHeading="The quiz raised a tax question? Bring it to me"
        ctaBody="I am an accounting senior and a licensed agent, not a tax pro, and I will tell you straight when a question belongs with one. A free 20-minute call can sort out which of these questions matter for you."
        related={[
          { href: "/tools/roth-conversion-ladder", label: "Roth conversion ladder tool" },
          { href: "/tools/roth-vs-traditional", label: "Roth vs traditional calculator" },
          { href: "/guides/backdoor-roth-ira-steps", label: "Backdoor Roth IRA steps" },
        ]}
      />

    </main>
  );
}
