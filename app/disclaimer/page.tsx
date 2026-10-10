import type { Metadata } from "next";
import Link from "next/link";

import { AGENT } from "@/lib/agent";
import { SITE_OWNER, SITE_OWNER_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "This site shares general educational information about Medicare and insurance. It is not personal advice. Talk with Christian Brinkley about your own situation.",
  alternates: { canonical: "/disclaimer" },
};

const EFFECTIVE_DATE = "October 9, 2026";

export default function DisclaimerPage() {
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="measure-prose app-shell max-w-3xl py-12 md:py-16">
        <h1 className="text-32 leading-tight font-bold">Disclaimer</h1>
        <p className="text-16 mt-2 text-[var(--color-ink-muted)]">Effective {EFFECTIVE_DATE}</p>
        <p className="text-18 mt-4 leading-[1.8] text-[var(--color-ink-muted)]">
          This site is run by {SITE_OWNER}, a licensed insurance agent in {AGENT.city},{" "}
          {AGENT.state}. Everything here is written to help you understand Medicare and insurance
          in plain language. It is general educational information, not advice about your personal
          situation.
        </p>

        <div className="text-18 mt-10 space-y-8 leading-[1.8]">
          <div>
            <h2 className="text-22 font-bold">Education, not personal advice</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              The guides, calculators, and articles on this site explain how Medicare and insurance
              generally work. They cannot account for your health history, your doctors, your
              prescriptions, your income, or the plans available at your address. Reading a page
              here is not the same as getting advice tailored to you. If you want help with your
              own situation,{" "}
              <Link href="/start" className="underline underline-offset-2">
                ask me directly
              </Link>
              . That conversation is free, and there is no obligation to enroll in anything.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Plan details change every year</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              Premiums, deductibles, copays, drug formularies, and provider networks change from
              year to year. I work to keep this site accurate, but a figure that was right when a
              page was written may be out of date by the time you read it. Before you make a
              decision, confirm the current details with the plan itself or at{" "}
              <a
                href="https://www.medicare.gov"
                className="underline underline-offset-2"
                rel="noopener noreferrer"
              >
                Medicare.gov
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">No plan recommendations on this site</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              This is an educational site. It does not recommend specific insurance plans or
              carriers, and nothing here should be read as a recommendation to buy, keep, or drop
              any particular coverage. Plan comparisons on this site are general explanations of
              how plan types differ, not guidance about which one fits you. Recommendations about
              your coverage happen in a real conversation, after I understand your situation.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">No paid placements</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              I do not accept payment from insurance companies in exchange for featuring, ranking,
              or recommending their plans on this site. There are no affiliate links and no paid
              placements for plan content. If that ever changes, this page will say so.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Calculators give estimates</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              The calculators and tools on this site use stated rates and assumptions to produce
              estimates. They are starting points for a conversation, not exact predictions of
              your costs. Each tool notes the rates it uses.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Questions</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              If anything on this page is unclear, ask me. Email{" "}
              <a href={`mailto:${SITE_OWNER_EMAIL}`} className="underline underline-offset-2">
                {SITE_OWNER_EMAIL}
              </a>{" "}
              or call{" "}
              <a href={AGENT.phoneHref} className="underline underline-offset-2">
                {AGENT.phone}
              </a>
              .
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="text-18 mt-12 inline-block font-medium underline decoration-2 underline-offset-4"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
