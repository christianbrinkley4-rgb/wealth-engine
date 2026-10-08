import type { Metadata } from "next";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { ContactLine } from "../components/ContactLine";
import { SiblingNav } from "../components/SiblingNav";

/**
 * AI for small business: what a one-person business can automate, from
 * Christian's real workflows, with honest limits.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI for Small Business: What One Person Can Automate | Christian Brinkley",
  },
  description:
    "What a one-person business can automate with AI: follow-ups, scheduling, bookkeeping drafts, content ideas. From real daily use, with honest limits.",
  alternates: { canonical: "/ai/ai-for-small-business" },
  openGraph: pageOpenGraph({
    title: "AI for small business",
    description:
      "What a one-person business can automate: follow-ups, scheduling, bookkeeping drafts, content ideas. From my own playbook, with honest limits.",
    path: "/ai/ai-for-small-business",
  }),
};

const FAQ = [
  {
    q: "What should a one-person business automate first?",
    a: "Follow-ups. A short message after every inquiry or appointment keeps you in front of people. That one automation pays for everything else.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Chatbots and no-code tools handle most small-business tasks. Code helps for custom work, but it is not required.",
  },
  {
    q: "Can AI handle my bookkeeping?",
    a: "It can draft summaries and organize receipts. It cannot replace your records or your accountant. Check every number.",
  },
  {
    q: "How much does this cost?",
    a: "Most of what I describe runs on free tools. Start there. Pay only when a tool earns its keep.",
  },
] as const;

export default function AiForSmallBusinessPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI for small business", path: "/ai/ai-for-small-business" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI for Small Business: What One Person Can Automate",
              description:
                "What a one-person business can automate with AI: follow-ups, scheduling, bookkeeping drafts, content ideas. From real daily use, with honest limits.",
              path: "/ai/ai-for-small-business",
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
          { name: "AI for small business" },
        ]}
        eyebrow="AI guides · Small business"
        title="AI for small business"
        lede="I run a one-person business on AI help every day. Here is what actually works, and where the limits are."
        secondaryHref="/start"
        secondaryLabel="Start a conversation →"
        proof={["Plain English, no jargon", "Written from daily use", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Follow-up messages</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I built my follow-up emails as automation with Python. The messages personalize from
            form results and inquiry type. No client waits because I got busy. That system has
            booked 25 consultations from website inquiries.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Scheduling help</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI drafts my appointment reminders and confirmation messages. It turns messy notes into
            a clean task list for the day. I still set the priorities. It just formats them.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Bookkeeping drafts</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I use AI to draft budget summaries and cash-flow notes from my numbers. It does the
            arithmetic and the first draft. I check every figure against the real records.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Content ideas</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I ask AI for post ideas and first drafts for my business pages. I rewrite everything in
            my own voice before it goes public. Nothing ships without my eyes on it.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Honest limits</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI cannot talk to your customers for you. It cannot sign contracts, give licensed
            advice, or make judgment calls. It is a staff assistant, not a partner. The decisions
            stay yours.
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
          <div className="mt-8">
            <ContactLine />
          </div>
        </div>
      </section>

      <SiblingNav current="ai-for-small-business" />

      <KitchenTableClose
        heading="Running a small business?"
        body={`I answer my own messages. Call or text ${AGENT.phone} and we will talk it through. No cost, no obligation.`}
        href="/start"
        label="Start a conversation →"
      />
    </main>
  );
}
