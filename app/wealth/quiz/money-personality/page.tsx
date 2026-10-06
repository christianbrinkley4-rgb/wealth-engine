import type { Metadata } from "next";

import { PersonalityQuiz } from "@/app/wealth/quiz/money-personality/PersonalityQuiz";
import { Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";
import { PERSONALITIES } from "@/lib/wealth/quizzes";

const path = "/wealth/quiz/money-personality";
const description =
  "Free money personality quiz. Eight questions, four types: The Vault, The Vibe, The Ghost and The Grinder. See your strengths, blind spots and next steps.";

export const metadata: Metadata = wealthMetadata({
  title: "Money Personality Quiz: 8 Questions, 4 Types",
  description,
  path,
});

const FAQ = [
  {
    q: "What are the four money personalities in this quiz?",
    a: PERSONALITIES.map((type) => `${type.name}: ${type.tagline}`).join(" "),
  },
  {
    q: "How long does the quiz take?",
    a: "About two minutes. It's eight multiple-choice questions and there's nothing to sign up for.",
  },
  {
    q: "Is this a scientific test?",
    a: "No. I wrote the four types as a way to notice your own habits. It's for self-reflection. Nobody is 100% one type, and the result shows your mix.",
  },
  {
    q: "Can I share my result?",
    a: "Yes. The share button makes a link that opens on your type. It doesn't include your answers.",
  },
] as const;

export default function MoneyPersonalityPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "Money personality quiz", description, path })} />
      <PageHead
        eyebrow="Quiz · about 2 minutes"
        title={
          <>
            What&apos;s your <span className="w-mark">money personality?</span>
          </>
        }
        lede="Eight questions. Go with your gut. You'll get one of four types, with strengths, blind spots and what to do next."
        crumbs={[
          { name: "Quizzes", path: "/wealth/quiz" },
          { name: "Money personality", path },
        ]}
      />
      <section className="w-section">
        <div className="w-shell">
          <PersonalityQuiz />
        </div>
      </section>

      <section className="w-section" style={{ paddingTop: 0 }}>
        <div className="w-shell">
          <p className="w-eyebrow">The four types</p>
          <div className="w-grid w-grid-4">
            {PERSONALITIES.map((type) => (
              <div key={type.id} className="w-card">
                <h2 className="w-h3">{type.name}</h2>
                <p style={{ margin: "8px 0 0", fontFamily: "var(--w-mono)", fontSize: "0.85rem" }}>{type.tagline}</p>
                <p style={{ margin: "10px 0 0", color: "var(--w-muted)" }}>{type.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={FAQ} title="About the quiz" />
      <NextUp
        links={[
          { href: "/wealth/quiz/first-1000", label: "What do I do with my first $1,000?", kind: "Quiz" },
          { href: "/wealth/calculators/budget", label: "50/30/20 budget builder", kind: "Calculator" },
          { href: "/wealth/learn", label: "Read the money basics", kind: "Learn" },
        ]}
      />
    </main>
  );
}
