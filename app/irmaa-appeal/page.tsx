import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";

/**
 * The tax-aware moat, as a page.
 *
 * Almost nobody selling Medicare in this market can talk about Form SSA-44,
 * and the people it applies to — anyone who just retired and is being charged
 * on the income they earned two years ago — are exactly the households worth
 * knowing. It is also genuinely useful whether or not they ever call.
 *
 * Everything here is a structural rule rather than a dollar figure, so it does
 * not go stale. The bracket amounts live in the calculator at /medicare.
 */

export const metadata: Metadata = {
  title: "Appealing a high Medicare premium (Form SSA-44)",
  description:
    "Medicare sets your premium from a tax return two years old. If you retired, lost a pension, or your household changed since then, Form SSA-44 can get it recalculated. What qualifies, what doesn't, and how to file.",
  alternates: { canonical: "/irmaa-appeal" },
  openGraph: {
    title: "Appealing a high Medicare premium (Form SSA-44)",
    description:
      "Retired since the tax year Medicare is using? You may not have to pay the higher premium. Here's what qualifies.",
    url: "/irmaa-appeal",
    type: "website",
  },
};

const QUALIFYING = [
  { event: "You stopped working", note: "Retirement is the most common one by a wide margin." },
  { event: "You reduced your hours", note: "A genuine cut in work, not a slow year." },
  { event: "You got married", note: "Filing status changes which thresholds apply to you." },
  { event: "You divorced, or had a marriage annulled", note: "Same reason." },
  {
    event: "Your spouse died",
    note: "Often the year a survivor's premium jumps for no obvious reason.",
  },
  {
    event: "You lost a pension",
    note: "The pension income itself ending — not a change in how much you draw from savings.",
  },
  {
    event: "You lost income-producing property",
    note: "Through a disaster, or something outside your control. Selling it does not count.",
  },
  {
    event: "You received an employer settlement",
    note: "From a bankruptcy, a closure, or a reorganization.",
  },
] as const;

const NOT_QUALIFYING = [
  "Selling a house, even if the gain is what pushed your income up",
  "A one-off capital gain from selling investments",
  "A Roth conversion — which is why the timing of one matters so much before 65",
  "A large withdrawal from a retirement account",
  "An inheritance, or a distribution from an inherited account",
] as const;

const FAQ = [
  {
    q: "How would I even know this applies to me?",
    a: "Social Security sends a letter — an initial determination notice — telling you your Part B and Part D premiums for the coming year. If it shows an income-related amount on top of the standard premium and your income has dropped since the tax year they used, that's the signal.",
  },
  {
    q: "Which tax year is Medicare using?",
    a: "Generally the return from two years before the premium year. That two-year lag is the whole reason this form exists — someone who retired last year is being charged on the income they earned while still working.",
  },
  {
    q: "What if the income is right but I disagree with the determination?",
    a: "That's a different route — a request for reconsideration rather than a life-changing-event form. It's also what you'd use if Social Security worked from the wrong year's data or you've since filed an amended return.",
  },
  {
    q: "Does it cost anything to have you look at this?",
    a: "No. I'm not a tax preparer and I don't file the form for you, but I can tell you whether your situation looks like one of the eight events, what evidence you'd need, and where it goes. If it turns out you need a CPA, I'll say so.",
  },
] as const;

export default function IrmaaAppealPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <section className="bg-[var(--color-paper)] pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="app-shell max-w-3xl">
          <p className="text-[13px] font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            Medicare premiums · Form SSA-44
          </p>
          <h1 className="mt-3 text-[32px] leading-[1.12] font-semibold tracking-tight text-balance md:text-[42px]">
            You retired last year. Medicare is charging you on what you earned two years ago.
          </h1>
          <p className="mt-5 text-[20px] leading-relaxed text-[var(--color-ink-muted)]">
            That is not a mistake — it&apos;s how the rules work. Medicare sets the income-related
            part of your premium from a tax return two years old. But if the reason your income was
            high back then has since ended, there is a form for that, and most people have never
            heard of it.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/start?topic=medicare&stage=already_on_medicare&ask=premium"
              className="inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-8 text-[19px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
            >
              Have me look at it →
            </Link>
            <a
              href={AGENT.phoneHref}
              className="inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 text-[19px] font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              <Phone className="size-5" aria-hidden />
              {AGENT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">The eight events that qualify</h2>
          <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
            Social Security calls these life-changing events. The list is closed — it is not a
            general appeal for &ldquo;my income went down.&rdquo; If one of these applies, you can
            ask them to use a more recent year instead.
          </p>

          <dl className="mt-8 flex flex-col gap-5">
            {QUALIFYING.map((item, index) => (
              <div key={item.event} className="flex gap-4 border-t border-gray-300 pt-5">
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[15px] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <dt className="text-[19px] font-semibold">{item.event}</dt>
                  <dd className="mt-1 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {item.note}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">
            What doesn&apos;t qualify — and this is where people get caught
          </h2>
          <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
            A one-off spike in income is the most common reason someone&apos;s premium jumps, and it
            is generally <em>not</em> appealable. The event has to be one of the eight, not simply a
            year that looked unusual.
          </p>
          <ul className="mt-6 flex list-disc flex-col gap-3 pl-6 text-[18px] leading-relaxed">
            {NOT_QUALIFYING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="card-surface mt-8 border-l-4 border-l-[var(--color-gold-ink)] p-6">
            <p className="text-[18px] leading-relaxed">
              Which is the argument for planning the timing of a large withdrawal or a Roth
              conversion <strong>before</strong> you turn 63 — because at that point the two-year
              lookback means it lands on your first Medicare premium, and no form will undo it.
            </p>
            <Link
              href="/roth-window"
              className="mt-4 inline-block text-[17px] font-medium underline underline-offset-4"
            >
              Estimate a conversion against the brackets →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">How filing actually goes</h2>
          <ol className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed">
            <li>
              <strong>Wait for the determination letter.</strong> Social Security tells you what
              your premium will be and which tax year they used. That letter is what you&apos;re
              responding to.
            </li>
            <li>
              <strong>Fill in Form SSA-44.</strong> You state which event happened, when, and what
              you expect your income to be for the more recent year.
            </li>
            <li>
              <strong>Bring evidence.</strong> Whatever proves the event — a letter from your
              employer, a death certificate, a marriage certificate, a pension statement — plus
              something supporting the income figure you&apos;re claiming.
            </li>
            <li>
              <strong>File it with Social Security</strong>, not with Medicare and not with the IRS.
              Your local office or the national line can take it.
            </li>
          </ol>
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
            Get the current form and the authoritative rules from{" "}
            <a
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              ssa.gov
            </a>
            . Do not rely on this page for the filing itself — it changes, and they are the ones who
            decide.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">Questions I get about this</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-[19px] font-semibold">{item.q}</dt>
                <dd className="mt-2 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-[28px] font-semibold">Not sure whether yours qualifies?</h2>
          <p className="mt-4 text-[18px] text-[var(--color-ink-muted)]">
            Tell me what changed and I&apos;ll tell you straight whether it&apos;s one of the eight.
            No charge, and no obligation to do anything else.
          </p>
          <Link
            href="/start?topic=medicare&stage=already_on_medicare&ask=premium"
            className="mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 text-[18px] font-semibold text-[var(--color-paper)]"
          >
            Tell me what changed →
          </Link>
          <p className="mt-6 text-[17px] text-[var(--color-ink-muted)]">
            Or call{" "}
            <a
              href={AGENT.phoneHref}
              className="font-semibold text-[var(--color-navy)] underline underline-offset-2"
            >
              {AGENT.phone}
            </a>{" "}
            — {AGENT.hours}.
          </p>
        </div>
      </section>

      <div className="app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
