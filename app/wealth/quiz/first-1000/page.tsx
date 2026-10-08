import type { Metadata } from "next";

import { FirstThousandQuiz } from "@/app/wealth/quiz/first-1000/FirstThousandQuiz";
import { Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";

const path = "/wealth/quiz/first-1000";
const description =
  "What should you do with your first $1,000? Answer a few quick questions about debt, savings and your job, and get a short plan to think over.";

export const metadata: Metadata = wealthMetadata({
  title: "First $1,000 Quiz",
  description,
  path,
});

const FAQ = [
  {
    q: "What should I do with my first $1,000?",
    a: "It depends on three things: whether you have high-rate debt, whether you have any emergency cushion, and whether your job offers a retirement match. The standard order: a small buffer, high-rate debt, the match, a full emergency fund, then long-term goals.",
  },
  {
    q: "Should I pay off debt or save first?",
    a: "Both, in order. Keep a $500 starter buffer so a surprise doesn't go on a card. Then put extra money at any debt charging 20% or more. After that, build the emergency fund to three to six months of expenses.",
  },
  {
    q: "Does this quiz tell me what to invest in?",
    a: "No. I'm not securities licensed, and the quiz never names an investment. It covers the order of the basics and points you to the tools to run your own numbers.",
  },
  {
    q: "Is my answer saved?",
    a: "No. The quiz runs in your browser. If you share your result, the link only carries which plan you landed on.",
  },
] as const;

export default function FirstThousandPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "What should I do with my first $1,000?", description, path })} />
      <PageHead
        eyebrow="Quiz · about 1 minute"
        title={
          <>
            Your first <span className="w-mark">$1,000.</span>
          </>
        }
        lede="A few honest questions. No email, no sign-up. You leave with a short plan to think over."
        crumbs={[
          { name: "Quizzes", path: "/wealth/quiz" },
          { name: "First $1,000", path },
        ]}
      />
      <section className="w-section-tight" style={{ paddingBottom: 56 }}>
        <div className="w-shell">
          <FirstThousandQuiz />
        </div>
      </section>
      <Faq items={FAQ} title="First $1,000, quick answers" />
      <NextUp
        links={[
          { href: "/wealth/quiz/money-personality", label: "Money personality quiz", kind: "Quiz" },
          { href: "/wealth/calculators/budget", label: "50/30/20 budget builder", kind: "Calculator" },
          { href: "/wealth/learn/emergency-funds", label: "Emergency funds, explained", kind: "Article" },
        ]}
      />
    </main>
  );
}
