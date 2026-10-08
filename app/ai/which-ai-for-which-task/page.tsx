import type { Metadata } from "next";
import Link from "next/link";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { SiblingNav } from "../components/SiblingNav";

/**
 * Which AI for which task: a decision guide. "I want to..." scenarios mapped
 * to the right tool, in plain English, no hype.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Which AI for Which Task | Christian Brinkley",
  },
  description:
    "Write better, research faster, sort your inbox: which AI should you use? A plain-English guide matching tasks to ChatGPT, Claude, Gemini, and Copilot.",
  alternates: { canonical: "/ai/which-ai-for-which-task" },
  openGraph: pageOpenGraph({
    title: "Which AI for which task",
    description:
      "Match the task to the tool: writing, research, email, learning, and everyday questions.",
    path: "/ai/which-ai-for-which-task",
  }),
};

const SCENARIOS = [
  {
    want: "I want to write something better",
    pick: "Claude",
    why: "Claude is the strongest writer of the group. Paste a draft and ask what is unclear, or describe what you want to say and ask for a first draft. Then rewrite it in your own voice. Never send AI text as-is when it represents you.",
  },
  {
    want: "I want to research something and trust the answer",
    pick: "Perplexity",
    why: "Perplexity searches the web and cites its sources, so you can click through and check. It is the only one of the five built for research first. For anything that matters, open the sources, not just the summary.",
  },
  {
    want: "I want help with Gmail, Docs, or Google Search",
    pick: "Gemini",
    why: "Gemini lives inside Google products. It can summarize a long email thread or help draft a document without you copying anything anywhere. If your life is in Gmail, this is the path of least resistance.",
  },
  {
    want: "I want help with Word, Outlook, or Windows",
    pick: "Microsoft Copilot",
    why: "Copilot lives inside Microsoft products. It can summarize a Word document or help draft an Outlook reply where you already work. The best features need a Microsoft 365 subscription.",
  },
  {
    want: "I just want one AI for everyday questions",
    pick: "ChatGPT",
    why: "ChatGPT is the best all-rounder. Everyday questions, explanations, brainstorming, drafting: the free tier handles all of it. Start here if you do not want to think about it.",
  },
  {
    want: "I want to learn something new",
    pick: "ChatGPT or Claude",
    why: "Both explain well. Ask them to explain like you are new to the topic, then ask follow-up questions. The trick: ask for examples, not just definitions. And check anything you will act on against a real source.",
  },
  {
    want: "I want to sort out my inbox or my files",
    pick: "Gemini or Copilot",
    why: "Pick whichever matches your email: Gemini for Gmail, Copilot for Outlook. They can summarize threads and find the one email you lost. Do not paste passwords or account numbers into any of them.",
  },
] as const;

const FAQ = [
  {
    q: "Should I just pick one and stick with it?",
    a: "Start with one for everyday use, but keep Perplexity bookmarked for research. Two free tools cover nearly everything, and switching costs nothing.",
  },
  {
    q: "What if my task is not on the list?",
    a: "Ask yourself whether the task needs writing, research, or something inside an app you already use. Writing goes to Claude, research goes to Perplexity, in-app work goes to Gemini or Copilot, everything else goes to ChatGPT.",
  },
  {
    q: "Will the answer change as these tools update?",
    a: "The specific features change, but the shape holds: one strong writer, one research engine, one for Google people, one for Microsoft people, one all-rounder. Revisit the comparison page when you switch tools.",
  },
] as const;

export default function WhichAiForWhichTaskPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "Which AI for which task", path: "/ai/which-ai-for-which-task" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Which AI for Which Task: A Plain-English Decision Guide",
              description:
                "Match the task to the tool: writing, research, email, learning, and everyday questions across ChatGPT, Claude, Gemini, Copilot, and Perplexity.",
              path: "/ai/which-ai-for-which-task",
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
          { name: "Which AI for which task" },
        ]}
        eyebrow="AI guides · Decision guide"
        title="Which AI for which task"
        lede="Opening the wrong tool for the job is why most people bounce off AI in a week. Do not pick an AI and then look for uses. Start from what you want to do, and match the task to the tool. Seven common wants, seven honest answers."
        secondaryHref="/ai/ai-tools-compared"
        secondaryLabel="Compare the tools →"
        proof={["Plain English, no jargon", "Task-first, not hype-first", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Find your want</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {SCENARIOS.map((item) => (
              <div key={item.want} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.want}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  <span className="font-semibold">Use {item.pick}.</span> {item.why}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The two-tool setup</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you want the simple version: keep one chatbot for everyday use (ChatGPT or Claude,
            free tier) and bookmark Perplexity for research. That pair covers nearly everything a
            normal person does with AI, and it costs nothing. Add Gemini or Copilot only if you
            live inside Google or Microsoft products and want the help where you already work.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Want the full breakdown of each tool?{" "}
            <Link href="/ai/ai-tools-compared" className="underline underline-offset-2">
              Read the honest comparison
            </Link>
            .
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

      <SiblingNav current="which-ai-for-which-task" />

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
