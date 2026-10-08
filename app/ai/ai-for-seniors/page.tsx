import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { Note } from "../components/Note";
import { SiblingNav } from "../components/SiblingNav";

/**
 * AI for seniors: the simplest useful starting points for 65 and up, plus
 * safety warnings on scams and private information.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI for Seniors | Christian Brinkley",
  },
  description:
    "The simplest ways for seniors to use AI: plain-language questions, letter help, reading help. Plus safety warnings on scams and private info.",
  alternates: { canonical: "/ai/ai-for-seniors" },
  openGraph: pageOpenGraph({
    title: "AI for seniors",
    description:
      "The simplest useful starting points for 65 and up: ask questions in plain language, get help with letters, read confusing mail. Plus the scams to watch for.",
    path: "/ai/ai-for-seniors",
  }),
};

const SAFETY = [
  {
    title: "Keep private things private",
    body: "Never type bank account numbers, passwords, or your Social Security number into a chatbot. It is not a bank vault.",
  },
  {
    title: "Watch for voice-clone calls",
    body: "Scammers now clone voices with AI. A call that sounds like a grandchild asking for money needs a callback to their real number. Hang up and call back.",
  },
  {
    title: "Verify money and health answers",
    body: "Verify anything about money or health with a real person. Your bank, your doctor, or a licensed professional. AI guesses. People check.",
  },
] as const;

const FAQ = [
  {
    q: "Is this hard to learn?",
    a: "No. You type a question and read the answer. That is the whole skill. Everything else is practice.",
  },
  {
    q: "Do I have to pay for AI?",
    a: "No. The well-known chatbots have free versions. Do not pay for AI help until you know you need more.",
  },
  {
    q: "Can it help me with Medicare questions?",
    a: "It can explain general Medicare terms. For your specific plan or enrollment decision, talk to a licensed agent. That is what I do.",
  },
  {
    q: "What if someone calls and sounds like my grandchild?",
    a: "Hang up and call their real number. Voice cloning is real. A real emergency survives a callback.",
  },
] as const;

export default function AiForSeniorsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI for seniors", path: "/ai/ai-for-seniors" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI for Seniors: Simple Starting Points and Safety",
              description:
                "The simplest ways for seniors to use AI: plain-language questions, letter help, reading help. Plus safety warnings on scams and private info.",
              path: "/ai/ai-for-seniors",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        variant="info"
        hidePhoneCta
        crumbs={[
          { name: "Home", href: "/" },
          { name: "AI for regular people", href: "/ai" },
          { name: "AI for seniors" },
        ]}
        eyebrow="AI guides · Seniors"
        title="AI for seniors"
        lede="You do not need to be technical to use AI. If you can ask a question in plain words, you can use it. Here are the simplest starting points."
        secondaryHref="/wealth"
        secondaryLabel="Browse the wealth notes →"
        proof={["Plain English, no jargon", "No hype", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Ask questions in plain language</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Type a question the way you would ask a neighbor. There is no special format to learn.
            Ask follow-up questions when the answer is unclear.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Help writing letters</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Ask it to help you write a letter to family, a complaint to a company, or a note to a
            doctor&apos;s office. Tell it the facts and it drafts the letter. You read it, fix it,
            and sign your name.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Help reading confusing mail</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Paste in a confusing letter or notice and ask for the short version in plain words. It
            tells you what the letter is asking for. Then you decide what to do.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Safety warnings</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {SAFETY.map((item) => (
              <div key={item.title} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.title}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
          <Note title="A quick note">
            <p>
              This page is educational. For Medicare or health decisions, talk to a licensed
              professional. Nothing here is medical advice.
            </p>
          </Note>
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

      <SiblingNav current="ai-for-seniors" />

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

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
