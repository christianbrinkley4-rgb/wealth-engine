import type { Metadata } from "next";
import Link from "next/link";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { SiblingNav } from "../components/SiblingNav";

/**
 * AI mistakes to avoid: hallucinations, sensitive data, blind trust on
 * money/health/legal, and the fix (verify against primary sources).
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI Mistakes to Avoid: Hallucinations, Privacy, Blind Trust | Christian Brinkley",
  },
  description:
    "The three big AI mistakes: trusting invented facts, sharing sensitive data, and trusting it blindly on money, health, or legal. The fix for each.",
  alternates: { canonical: "/ai/ai-mistakes-to-avoid" },
  openGraph: pageOpenGraph({
    title: "AI mistakes to avoid",
    description:
      "Hallucinations, sensitive data, and blind trust on money, health, or legal. The three traps, and the fix for each one.",
    path: "/ai/ai-mistakes-to-avoid",
  }),
};

const FAQ = [
  {
    q: "How do I spot a hallucination?",
    a: "You cannot spot it by tone. The chatbot sounds sure either way. Check names, dates, and numbers against the original source.",
  },
  {
    q: "Is my chat history private?",
    a: "Assume it is not. Companies may review chats to improve their systems. Never type anything you would not want read back to you.",
  },
  {
    q: "Can AI write a will or a contract?",
    a: "It can draft language, but legal documents need a licensed attorney in your state. A bad document costs more than a lawyer.",
  },
  {
    q: "What is the single biggest mistake?",
    a: "Copying an answer into a decision without checking it. The fix is simple: verify against the primary source before you act.",
  },
] as const;

export default function AiMistakesToAvoidPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI mistakes to avoid", path: "/ai/ai-mistakes-to-avoid" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI Mistakes to Avoid: Hallucinations, Privacy, Blind Trust",
              description:
                "The three big AI mistakes: trusting invented facts, sharing sensitive data, and trusting it blindly on money, health, or legal. The fix for each.",
              path: "/ai/ai-mistakes-to-avoid",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "AI for regular people", href: "/ai" },
          { name: "AI mistakes to avoid" },
        ]}
        eyebrow="AI guides · Mistakes to avoid"
        title="AI mistakes to avoid"
        lede="AI is useful and it is easy to misuse. These are the three mistakes that hurt people, and the simple fix for each one."
        secondaryHref="/wealth"
        secondaryLabel="Browse the wealth notes →"
        proof={["Plain English, no jargon", "No hype", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">It invents facts, confidently</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Chatbots invent facts and state them with total confidence. Dates, quotes, and
            statistics are the most common inventions. If a fact matters, check it against the
            original source.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Sharing sensitive data</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Never paste account numbers, Social Security numbers, passwords, or private health
            details into a chatbot. Assume anything you type could be stored. Keep private things
            private.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Trusting it blindly on money, health, or legal</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI is not licensed to advise you on money, health, or the law. Use it to learn the
            vocabulary. Make decisions with a real professional.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The fix</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Treat AI as a first draft, never the final word. Check facts against primary sources:
            the official site, the real document, the actual person. Two minutes of checking beats a
            confident mistake.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <SiblingNav current="ai-mistakes-to-avoid" />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Keep going</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI is one tool. Money is the bigger picture.{" "}
            <Link href="/wealth" className="underline underline-offset-2">
              Browse the wealth notes
            </Link>{" "}
            for plain-English guides on budgeting, saving, taxes, and building from zero.
          </p>
        </div>
      </section>
    </main>
  );
}
