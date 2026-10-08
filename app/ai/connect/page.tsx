import type { Metadata } from "next";
import Link from "next/link";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, SITE_URL } from "@/lib/seo";

import { SiblingNav } from "../components/SiblingNav";

/**
 * /ai/connect: plain-English setup instructions for the MCP connector.
 * Informational only: no phone number, no sales CTA.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Connect Your AI Assistant | Christian Brinkley",
  },
  description:
    "Add Christian's site as a connector in Claude or any MCP app. Plain-English setup steps, what it answers, and example prompts.",
  alternates: { canonical: "/ai/connect" },
  openGraph: pageOpenGraph({
    title: "Connect your AI assistant",
    description:
      "Let Claude or another AI app read the site's guides, calculators, and 2027 numbers directly. Setup steps, what it answers, example prompts.",
    path: "/ai/connect",
  }),
};

const ENDPOINT = `${SITE_URL}/api/mcp`;

const EXAMPLES = [
  "Using Christian Brinkley's connector, what is the 2027 Part D deductible, and is that number final?",
  "Search his guides for the 6-month HSA trap with Medicare and give me the short version.",
  "What free calculators does he have? Which one fits someone choosing between avalanche and snowball?",
  "Using the connector, what are the 2027 Medicare numbers, and which ones are still projections?",
] as const;

const FAQ = [
  {
    q: "Does the connector cost anything?",
    a: "No. Connecting is free. Your AI app may have its own free or paid plan, but the connector itself adds nothing.",
  },
  {
    q: "Does it work on my phone?",
    a: "It depends on your AI app. Some apps support connectors only on desktop or web, some everywhere. If the Connectors option is missing in the phone app, try the web version.",
  },
  {
    q: "My app does not have a connectors option. What now?",
    a: "Skip the connector and browse the guides directly on the site. Everything the connector reads is published there in plain English.",
  },
  {
    q: "What can my AI app see through the connector?",
    a: "Only the public pages: the guides, the wealth articles, the calculator list, and the 2027 numbers. It cannot see your chats, your accounts, or anything about you.",
  },
  {
    q: "Can it give me personal financial or Medicare advice?",
    a: "No. It reads educational content. Use it to learn the vocabulary and the numbers, then make decisions with a licensed professional.",
  },
  {
    q: "Do I still need to double-check answers?",
    a: "Yes. Connectors reduce guessing, but Medicare and tax rules change. Verify dates and figures against the official source before acting.",
  },
] as const;

export default function AiConnectPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "Connect your AI assistant", path: "/ai/connect" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Connect Your AI Assistant: Setup Guide",
              description:
                "Add the site as a connector in Claude or any MCP app. Setup steps, what it answers, and example prompts.",
              path: "/ai/connect",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        hidePhoneCta
        crumbs={[
          { name: "Home", href: "/" },
          { name: "AI for regular people", href: "/ai" },
          { name: "Connect your AI assistant" },
        ]}
        eyebrow="AI guides · Connectors"
        title="Connect your AI assistant"
        lede="Your AI app can read this site directly instead of guessing about it. One setup step, then it answers from the actual guides, calculators, and 2027 numbers."
        secondaryHref="/ai"
        secondaryLabel="Back to the AI guides →"
        proof={["Free to connect", "Reads the real pages", "No account needed"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a connector is, in plain English</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A connector is a bridge between your AI app and a website. Without one, the chatbot
            answers from memory, which is where confident mistakes come from. With one, it reads
            the site&apos;s actual pages and quotes them. The technology behind it is called MCP,
            short for Model Context Protocol. You do not need to understand that to use it.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Once connected, your assistant can search the guides, read a full guide, list the
            calculators, and pull the 2027 Medicare numbers, all labeled final or projected with
            their sources.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Add it in Claude</h2>
          <ol className="mt-6 flex list-decimal flex-col gap-4 pl-6">
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              Open Claude on the web or the desktop app, and go to Settings.
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              Find Connectors (it may be under Profile, then Settings, then Connectors).
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              Choose Add custom connector. Paste this address:
              <code className="mt-2 block overflow-x-auto rounded-lg bg-white p-3 text-16 font-mono">
                {ENDPOINT}
              </code>
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              Save it. Ask Claude a money or Medicare question and mention the connector, for
              example: &quot;Using the Christian Brinkley connector, what is the 2027 Part D
              cap?&quot;
            </li>
          </ol>
          <p className="text-16 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Claude renames menus sometimes. If Connectors moved, search Claude&apos;s help for
            &quot;custom connector&quot;. The address above stays the same.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Add it in another AI app</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Most apps that support MCP call it one of these: MCP servers, connectors, or
            integrations. Open the app&apos;s settings, look for one of those, and add a new
            server with this URL:
          </p>
          <code className="mt-4 block overflow-x-auto rounded-lg bg-[var(--color-paper)] p-3 text-16 font-mono">
            {ENDPOINT}
          </code>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The connection type is Streamable HTTP. If the app asks for a name, call it anything
            you like, for example &quot;Christian Brinkley guides&quot;. If your app has no
            connector option at all, it does not support MCP yet, and the guides on this site
            are still right here to read.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What it can answer</h2>
          <ul className="mt-6 flex list-disc flex-col gap-4 pl-6">
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              <strong className="font-semibold">The guides, in full.</strong> Forty-plus guides
              on Medicare, taxes, Social Security, and everyday money, answered first and quoted
              in full when you ask.
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              <strong className="font-semibold">The wealth articles.</strong> Plain-English notes
              on budgeting, credit, 401(k)s, Roth IRAs, and more.
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              <strong className="font-semibold">The calculators.</strong> All eight tools with
              descriptions and links, so your assistant can point you to the right one.
            </li>
            <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
              <strong className="font-semibold">The 2027 numbers.</strong> The key Medicare
              figures for 2027, each labeled final or projected, plus the enrollment dates.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Example prompts</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Copy one of these into your connected AI app to see what the connector does:
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {EXAMPLES.map((example) => (
              <blockquote
                key={example}
                className="rounded-xl border border-gray-300 bg-[var(--color-paper)] p-5"
              >
                <p className="text-16 leading-relaxed italic text-[var(--color-ink-muted)]">
                  &ldquo;{example}&rdquo;
                </p>
              </blockquote>
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

      <SiblingNav current="connect" />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Keep going</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            New to AI entirely?{" "}
            <Link href="/ai" className="underline underline-offset-2">
              Start with what AI can actually do for a normal person
            </Link>
            . Want the money side?{" "}
            <Link href="/wealth" className="underline underline-offset-2">
              Browse the wealth notes
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
