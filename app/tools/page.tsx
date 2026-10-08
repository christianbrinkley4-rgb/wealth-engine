import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { ToolsDisclaimer } from "./_components/tool-footer";

/**
 * The /tools hub: seven interactive calculators, all client-side. The
 * heading, intro, and card descriptions render on the server; each tool is
 * its own client component on its own page. Every tool states its math and
 * frames results as estimates for education.
 */

const path = "/tools";
const description =
  "Seven free money calculators that show their math: Roth vs traditional, emergency fund, debt payoff, retirement projector, take-home pay, life insurance needs, and compound interest. No account, nothing leaves your device.";

export const metadata: Metadata = {
  title: { absolute: "Free Money Calculators | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({
    title: "Free money calculators",
    description,
    path,
  }),
};

const TOOLS = [
  {
    href: "/tools/roth-vs-traditional",
    title: "Roth vs traditional",
    body: "Put the same paycheck dollars in both accounts and see which leaves more after tax. Uses the real 2026 IRA limits.",
  },
  {
    href: "/tools/emergency-fund",
    title: "Emergency fund",
    body: "Turn your monthly spending into a savings target, then build a month-by-month plan to reach it.",
  },
  {
    href: "/tools/debt-payoff",
    title: "Debt payoff",
    body: "List your debts and compare avalanche vs snowball: months to zero and total interest, side by side.",
  },
  {
    href: "/tools/retirement-projector",
    title: "Retirement projector",
    body: "Project your savings at an assumed rate you choose. Labeled as assumed throughout, never a prediction.",
  },
  {
    href: "/tools/take-home-pay",
    title: "Take-home pay",
    body: "Gross salary to paycheck, with 2026 federal, North Carolina, and payroll taxes shown line by line.",
  },
  {
    href: "/tools/life-insurance-needs",
    title: "Life insurance needs",
    body: "The DIME method as a starting point for a conversation with an agent. Not a recommendation.",
  },
  {
    href: "/tools/compound-interest",
    title: "Compound interest",
    body: "Watch small monthly deposits grow year by year at a rate you pick, with the full table underneath.",
  },
] as const;

const PROOF = [
  "Free to use, no account",
  "Everything runs on your device",
  "Math shown in plain English",
  "Results are estimates for education",
] as const;

export default function ToolsHubPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Free money calculators",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools" }]}
        eyebrow="Free tools · no account · nothing leaves your device"
        title="Money tools that show their math"
        lede="Numbers beat guesses. These calculators run the math on the money questions I hear most: Roth or traditional, emergency fund size, debt payoff speed, and real take-home pay. Everything runs on your device. Nothing is saved and nothing is sent anywhere."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell">
          <div className="t-hub-grid">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="t-hub-card card-surface card-interactive"
              >
                <h2>{tool.title}</h2>
                <p>{tool.body}</p>
                <span className="t-go">Open the tool →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What these tools can and cannot do</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Each tool takes numbers you type in and runs one clear piece of math on them. Tax tools use
              2026 figures from the IRS and the State of North Carolina. Growth tools use the rate you pick,
              compounded monthly, and say so on the page.
            </p>
            <p>
              A calculator does not know your full situation. It cannot see your health, your job, your
              debts beyond what you type, or how tax law changes next year. That is why every result on
              these pages is framed as an estimate for education.
            </p>
            <p>
              I built these as a learning aid, not as advice. I am a licensed insurance agent (NC Life
              &amp; Health), not a registered investment adviser. If a number here changes a decision for
              you, talk it through with a qualified professional before you act.
            </p>
          </div>
        </div>
      </section>

      <KitchenTableClose
        heading="A number raised a question? Bring it to me"
        body="The tools give you the estimate. A free 20-minute call gives you the context: your situation, your timeline, and what the number actually means for you."
        href="/start"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ToolsDisclaimer />
        <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Questions go directly to {AGENT.name} in {AGENT.city}, {AGENT.state} at{" "}
          <a href={AGENT.phoneHref} className="underline underline-offset-2">
            {AGENT.phone}
          </a>
          . They are not sold to other agents.
        </p>
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
