import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { ContactLine } from "../components/ContactLine";
import { Note } from "../components/Note";
import { SiblingNav } from "../components/SiblingNav";

/**
 * AI for money tasks: budgeting help, bill negotiation scripts, subscription
 * audits, reading statements. Educational only, never personal advice.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI for Money Tasks: Budgets, Bills, Subscriptions | Christian Brinkley",
  },
  description:
    "Use AI for budgeting help, bill negotiation scripts, subscription audits, and reading statements. Educational only, never personal advice.",
  alternates: { canonical: "/ai/ai-money-tasks" },
  openGraph: pageOpenGraph({
    title: "AI for money tasks",
    description:
      "Budgeting help, bill negotiation scripts, subscription audits, and reading statements. Educational only, never personal financial advice.",
    path: "/ai/ai-money-tasks",
  }),
};

const FAQ = [
  {
    q: "Can AI pick my investments?",
    a: "No. It can explain what terms mean. Picking investments for your situation needs a qualified professional who knows your full picture.",
  },
  {
    q: "Is it safe to paste my bank statement into a chatbot?",
    a: "Remove account numbers first. Better: describe the charge in your own words. Never paste passwords or full account numbers anywhere.",
  },
  {
    q: "Can it do my taxes?",
    a: "It can explain tax terms and organize your documents. Filing needs real software or a tax professional. Do not trust numbers you have not checked.",
  },
  {
    q: "What is the one money task to start with?",
    a: "The subscription audit. List every subscription and total the yearly cost. It takes ten minutes and finds real money.",
  },
] as const;

export default function AiMoneyTasksPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI for money tasks", path: "/ai/ai-money-tasks" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI for Money Tasks: Budgets, Bills, Subscriptions",
              description:
                "Use AI for budgeting help, bill negotiation scripts, subscription audits, and reading statements. Educational only, never personal advice.",
              path: "/ai/ai-money-tasks",
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
          { name: "AI for money tasks" },
        ]}
        eyebrow="AI guides · Money tasks"
        title="AI for money tasks"
        lede="AI can help you understand your money better. It cannot give you personal financial advice. Here is where the line is."
        secondaryHref="/start"
        secondaryLabel="Start a conversation →"
        proof={["Plain English, no jargon", "Written from daily use", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <Note title="Educational only">
            <p>
              I am a licensed insurance agent in North Carolina ({AGENT.licenseLine}). I am not a
              registered investment adviser. Nothing on this page is personal financial advice.
            </p>
          </Note>
          <h2 className="text-28 mt-10 font-semibold">Budgeting help</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Give AI your monthly income and your bills. Ask it to build a simple budget. It sorts
            spending into categories and shows the gaps. You decide what changes.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Bill negotiation scripts</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Ask it to draft a call script for lowering a bill. It gives you the words to say. You
            make the call. A script helps you ask. It does not guarantee results.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Subscription audits</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            List your subscriptions and ask AI to total the yearly cost. That yearly number catches
            people off guard. Cancel what you do not use.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Reading statements</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Paste in a confusing statement with account numbers removed and ask what each charge
            means. It explains the terms in plain words. Your provider&apos;s phone number is still
            the final word.
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
          <div className="mt-8">
            <ContactLine />
          </div>
        </div>
      </section>

      <SiblingNav current="ai-money-tasks" />

      <KitchenTableClose
        heading="Questions about your money?"
        body={`I answer my own messages. Call or text ${AGENT.phone} and we will take it one question at a time. No cost, no obligation.`}
        href="/start"
        label="Start a conversation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
