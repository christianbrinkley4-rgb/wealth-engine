import type { Metadata } from "next";
import Link from "next/link";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { SiblingNav } from "../components/SiblingNav";

/**
 * AI tools compared honestly: ChatGPT, Claude, Gemini, Copilot, Perplexity.
 * What each one actually is, what it is good at, honest limits, and cost.
 * Pricing from public listings, October 2026; prices change, so check the
 * official site before paying for anything.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI Tools Compared Honestly | Christian Brinkley",
  },
  description:
    "ChatGPT, Claude, Gemini, Copilot, and Perplexity compared in plain English: what each is good at, honest limits, and what the free and paid tiers cost.",
  alternates: { canonical: "/ai/ai-tools-compared" },
  openGraph: pageOpenGraph({
    title: "AI tools compared honestly",
    description:
      "ChatGPT, Claude, Gemini, Copilot, Perplexity: what each is good at, where each falls short, and what it costs.",
    path: "/ai/ai-tools-compared",
  }),
};

const TOOLS = [
  {
    name: "ChatGPT",
    maker: "OpenAI",
    what: "The one most people mean when they say AI chatbot. Type a question, get an answer. The free tier handles everyday use.",
    goodAt: "General questions, drafting emails and documents, brainstorming, explaining things simply. The most third-party integrations.",
    limits: "The free tier caps the stronger models. Like all chatbots, it invents facts confidently, so verify anything important.",
    cost: "Free tier available. Plus is $20 a month. Prices change, check openai.com before paying.",
  },
  {
    name: "Claude",
    maker: "Anthropic",
    what: "A chatbot known for careful, well-written answers. Strong on long documents and nuanced writing.",
    goodAt: "Writing help, summarizing long documents, working through complicated questions step by step.",
    limits: "Free tier has daily message caps. Free plans change what they include pretty often, so check the current features before counting on it for up-to-date facts.",
    cost: "Free tier available. Pro is $20 a month. Prices change, check anthropic.com before paying.",
  },
  {
    name: "Gemini",
    maker: "Google",
    what: "Google's chatbot, woven into Gmail, Docs, and Google Search. If you live in Google products, it meets you there.",
    goodAt: "Summarizing emails and documents in Gmail and Docs, questions where Google's search index helps, generous free tier.",
    limits: "Tied to a Google account, which means Google sees the chats. Verify important facts like with any chatbot.",
    cost: "Free tier available. Google AI Pro is $19.99 a month. Prices change, check the Google One page before paying.",
  },
  {
    name: "Microsoft Copilot",
    maker: "Microsoft",
    what: "The chatbot built into Windows, Edge, and Microsoft 365. If you use Word and Outlook all day, it is already nearby.",
    goodAt: "Summarizing Word documents, drafting Outlook emails, quick answers inside Windows and Edge.",
    limits: "The most useful features sit behind a Microsoft 365 subscription. As a standalone chatbot it is less capable than the others.",
    cost: "Basic version free. Full features need Microsoft 365. Prices change, check microsoft.com before paying.",
  },
  {
    name: "Perplexity",
    maker: "Perplexity AI",
    what: "Less a chatbot, more an answer engine. It searches the web and answers with cited sources you can click.",
    goodAt: "Research questions where you want sources. Every answer links where it came from, so checking is fast.",
    limits: "The free tier limits advanced searches per day. It is a research tool first, a weaker brainstorming partner than the chatbots.",
    cost: "Free tier available. Pro is around $20 a month. Prices change, check perplexity.ai before paying.",
  },
] as const;

const FAQ = [
  {
    q: "Which AI is the best?",
    a: "There is no single winner. ChatGPT is the best all-rounder, Claude writes the best, Gemini fits Google users, Copilot fits Microsoft users, and Perplexity is best for research with sources. Pick by task, not by hype.",
  },
  {
    q: "Do I need to pay for any of them?",
    a: "No. Every tool above has a free tier that covers normal everyday use. Pay only if you hit the free limits regularly, which most people never do.",
  },
  {
    q: "Can I use more than one?",
    a: "Yes, and that is the smart move. Use Perplexity for research, then Claude or ChatGPT to help you write it up. Free tiers make this cost nothing.",
  },
  {
    q: "Do these prices change?",
    a: "Constantly. AI pricing moves every few months. Check the official site before paying for anything, and never trust a price in an article, including this one, without checking.",
  },
] as const;

export default function AiToolsComparedPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI tools compared", path: "/ai/ai-tools-compared" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI Tools Compared Honestly: ChatGPT, Claude, Gemini, Copilot, Perplexity",
              description:
                "What each AI tool is good at, where each falls short, and what the free and paid tiers cost. Plain English, no hype.",
              path: "/ai/ai-tools-compared",
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
          { name: "AI tools compared" },
        ]}
        eyebrow="AI guides · Tool comparison"
        title="AI tools compared honestly"
        lede="You have heard five names and have no idea which one to open. Five chatbots, no single winner. Here is what ChatGPT, Claude, Gemini, Copilot, and Perplexity actually do well, where each falls short, and what each costs. No hype, no affiliate links."
        secondaryHref="/ai/which-ai-for-which-task"
        secondaryLabel="Which AI for which task →"
        proof={["Plain English, no jargon", "No affiliate links", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The short version</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            All five have free tiers that cover normal use. None of them is the best at
            everything. ChatGPT is the best all-rounder. Claude writes the best. Gemini fits
            people who live in Gmail and Docs. Copilot fits people who live in Word and Outlook.
            Perplexity is the one to use when you want sources. Start free, pick by task, and pay
            only if you hit a free limit regularly.
          </p>
        </div>
      </section>

      {TOOLS.map((tool, index) => (
        <section
          key={tool.name}
          className={index % 2 === 0 ? "bg-[var(--color-paper)] py-14" : "bg-white py-14"}
        >
          <div className="measure-prose app-shell max-w-3xl">
            <h2 className="text-28 font-semibold">
              {tool.name} <span className="text-18 font-normal text-[var(--color-ink-muted)]">by {tool.maker}</span>
            </h2>
            <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
              {tool.what}
            </p>
            <h3 className="text-20 mt-6 font-semibold">Good at</h3>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {tool.goodAt}
            </p>
            <h3 className="text-20 mt-6 font-semibold">Honest limits</h3>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {tool.limits}
            </p>
            <h3 className="text-20 mt-6 font-semibold">Cost</h3>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {tool.cost}
            </p>
          </div>
        </section>
      ))}

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The one rule</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Whichever you pick, the rule from{" "}
            <Link href="/ai/ai-mistakes-to-avoid" className="underline underline-offset-2">
              the mistakes page
            </Link>{" "}
            still applies: verify anything important against the original source. The chatbot
            with the best answer is still a chatbot, and chatbots invent facts.
          </p>
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

      <SiblingNav current="ai-tools-compared" />

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
