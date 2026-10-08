import type { Metadata } from "next";
import Link from "next/link";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { AI_GUIDES } from "./components/ai-guides";

/**
 * The /ai hub: what AI can actually do for a normal person, honest about
 * the limits, written from Christian's real daily use.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI for Regular People | Christian Brinkley",
  },
  description:
    "What AI can actually do for a normal person, in plain English, from someone who uses it daily. Five things it does well, three it does badly.",
  alternates: { canonical: "/ai" },
  openGraph: pageOpenGraph({
    title: "AI for regular people",
    description:
      "What AI can actually do for a normal person, in plain English. Five things it does well, three it does badly, and how I use it every day.",
    path: "/ai",
  }),
};

const DOES_WELL = [
  {
    title: "Writing help",
    body: "It drafts emails, letters, and lists in seconds. You stay the editor. Give it a rough idea and it returns clean sentences.",
  },
  {
    title: "Summarizing",
    body: "Paste in a long article or a confusing notice and ask for the short version. It pulls out the main points so you can skim faster.",
  },
  {
    title: "Learning",
    body: "Ask it to explain a topic like you are brand new to it. It walks through ideas one step at a time, at your pace.",
  },
  {
    title: "Planning",
    body: "It builds checklists, packing lists, and project steps. Tell it your limits and it plans around them.",
  },
  {
    title: "Organizing",
    body: "Dump a messy list of thoughts and ask it to sort them. It groups ideas, finds duplicates, and spots gaps.",
  },
] as const;

const DOES_BADLY = [
  {
    title: "Facts it invents",
    body: "Chatbots sometimes state wrong facts with total confidence. This is called a hallucination. Verify dates, numbers, and names yourself.",
  },
  {
    title: "Anything needing a license",
    body: "AI cannot give legal advice, medical diagnoses, or financial advice for your situation. Licensed professionals exist for a reason.",
  },
  {
    title: "Anything private",
    body: "Never paste account numbers, passwords, or Social Security numbers into a chatbot. If you would not say it out loud, do not type it in.",
  },
] as const;

const FAQ = [
  {
    q: "Do I need to be good with computers to use AI?",
    a: "No. If you can send a text message, you can use a chatbot. You type a question in plain words and read the answer. That is the whole skill.",
  },
  {
    q: "Is AI free to use?",
    a: "The well-known chatbots offer free versions that handle everyday tasks. Paid plans exist for heavier use. Start free and see if you ever need more.",
  },
  {
    q: "Can AI replace talking to a real person?",
    a: "No. It handles drafts, summaries, and first looks. For money, health, legal, or insurance decisions, talk to a licensed professional.",
  },
  {
    q: "Where should I start?",
    a: "Pick one small task. Rewrite an email. Summarize an article. Plan a grocery list. One small win teaches more than any tutorial.",
  },
] as const;

export default function AiHubPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI for Regular People: What It Can Actually Do",
              description:
                "What AI can actually do for a normal person, in plain English. Five things it does well, three it does badly.",
              path: "/ai",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        variant="info"
        hidePhoneCta
        crumbs={[{ name: "Home", href: "/" }, { name: "AI for regular people" }]}
        eyebrow="Practical AI · Plain English"
        title="AI for regular people"
        lede="This section explains what AI can actually do for a normal person, in plain English. It also covers what it cannot do, because that part matters more."
        secondaryHref="/wealth"
        secondaryLabel="Browse the wealth notes →"
        proof={["Plain English, no jargon", "No hype", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What AI is, in plain English</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI chatbots are programs trained on huge amounts of text. You type a question in
            normal words, and the program writes back an answer. It sounds confident every time,
            even when it is wrong. Think of it as a very fast assistant that never sleeps and
            sometimes makes things up.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Five things it does well for regular people</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {DOES_WELL.map((item) => (
              <div key={item.title} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.title}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Three things it does badly</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {DOES_BADLY.map((item) => (
              <div key={item.title} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.title}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            The traps deserve their own page.{" "}
            <Link href="/ai/ai-mistakes-to-avoid" className="underline underline-offset-2">
              Here are the AI mistakes to avoid, and the fix for each one
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The AIs, explained</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            There are five chatbots worth knowing: ChatGPT, Claude, Gemini, Microsoft Copilot,
            and Perplexity. None is the best at everything. Each has things it does well and
            honest limits.{" "}
            <Link href="/ai/ai-tools-compared" className="underline underline-offset-2">
              Read the honest comparison
            </Link>
            , or skip straight to{" "}
            <Link href="/ai/which-ai-for-which-task" className="underline underline-offset-2">
              which AI fits which task
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Money questions deserve the same plain-English treatment.{" "}
            <Link href="/wealth" className="underline underline-offset-2">
              The wealth notes cover budgeting, saving, taxes, and building from zero
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <h2 className="text-28 font-semibold">The guides</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {AI_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/ai/${guide.slug}`}
                className="block rounded-xl border border-gray-300 p-6 transition-colors hover:border-[var(--color-navy)]"
              >
                <p className="text-19 font-semibold">{guide.title}</p>
                <p className="text-16 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {guide.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
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
