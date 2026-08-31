import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The 401(k) and retirement-income territory, as education rather than advice.
 *
 * This is the line that matters on this page, and it is worth stating plainly
 * because it decides what the page is allowed to be:
 *
 *   Explaining how something works, in public, to everyone — publishing.
 *   Telling one person what they specifically should do with their money,
 *   for compensation — investment advice, which needs registration.
 *
 * So this page answers "what are my four options and what does each one do",
 * names the deadlines and the tax mechanics, and stops there. It does not
 * recommend a course of action, does not compare investments, and says out
 * loud which parts belong to a registered adviser or a CPA. Framed that way
 * it can rank for the searches without holding anybody out as something they
 * are not — and educational depth is what gets quoted by an assistant anyway,
 * where a services page never would be.
 */

export const metadata: Metadata = {
  title: { absolute: "What to Do With a 401(k) at Retirement — Greensboro, NC" },
  description:
    "The four options for an old 401(k), what changes at 73, and why the years before it decide your tax bill. Plain explanation from a Greensboro agent, no pitch.",
  alternates: { canonical: "/retirement-income" },
  openGraph: pageOpenGraph({
    title: "What to do with a 401(k) when you retire",
    description:
      "Four options, the deadlines that come with them, and the tax window most people do not know they are in.",
    path: "/retirement-income",
  }),
};

const OPTIONS = [
  {
    t: "Leave it where it is",
    b: "Plenty of plans let you stay after you leave. It’s the least effort and sometimes the best answer, especially if the plan has pricing you couldn’t get on your own. Check two things: whether they push you out below a certain balance, and what they charge you now that payroll isn’t covering part of it.",
  },
  {
    t: "Roll it to an IRA",
    b: "The most common move, and the one the most people have a financial interest in you making. It usually widens what you can hold and changes who charges you. Done as a direct transfer between institutions, there’s no tax. Done by check to you, there’s withholding and a 60-day clock — and missing that clock is expensive.",
  },
  {
    t: "Roll it into a new employer's plan",
    b: "An option if you’re still working somewhere whose plan takes transfers. Worth knowing about, because money in the plan where you still work can be exempt from required withdrawals in a way IRA money isn’t.",
  },
  {
    t: "Cash it out",
    b: "Almost always the expensive one. The whole amount becomes income in a single year. That’s a tax bill, and — the part nobody mentions — a spike in the income Medicare looks at two years later.",
  },
] as const;

const FAQ = [
  {
    q: "When do required minimum distributions start?",
    a: "Right now at 73, moving to 75 if you were born in 1960 or later. From then on, a formula decides how much you take out instead of you. That’s why the years before it matter so much.",
  },
  {
    q: "Why do people talk about the years between retiring and 73?",
    a: "Because it’s usually the lowest-income stretch of your whole adult life. The paycheck has stopped and the required withdrawals haven’t started. Those years are the only window where the order you pull from accounts really changes what you pay in total.",
  },
  {
    q: "How does any of this touch Medicare?",
    a: "Medicare sets the income-related part of your premium from a tax return two years old. So a big withdrawal or a Roth conversion at 63 lands on your first Medicare premium at 65 — and if you’re married, on both of your premiums. That connection is the most overlooked thing in this whole area.",
  },
  {
    q: "Is a rollover taxable?",
    a: "A direct transfer between institutions isn’t. Taking the money yourself and moving it starts a 60-day clock and mandatory withholding, and if you don’t finish in time the whole amount becomes taxable income. If you do this, do it as a direct transfer.",
  },
  {
    q: "Can you advise me on how to invest it?",
    a: "No, and I’d rather say that plainly than blur it. I hold an insurance license, not a securities license, and I’m not a registered investment adviser. What I can do is explain how the deadlines and the tax side work, and tell you when your question belongs to a CPA or an adviser.",
  },
  {
    q: "So what do you actually help with here?",
    a: "The Medicare side of it, which is the part most people miss and the part I’m licensed for. How a withdrawal or a conversion lands on your premium two years later, and what the timing is worth in dollars. There’s a tool on this site that works it out, and talking it through doesn’t cost anything.",
  },
] as const;

export default function RetirementIncomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Retirement income", path: "/retirement-income" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "What to do with a 401(k) when you retire",
              description:
                "The four options, the deadlines attached to each, and how a withdrawal lands on a Medicare premium two years later.",
              path: "/retirement-income",
              datePublished: "2026-08-25",
              dateModified: "2026-08-25",
            }),
          ),
        }}
      />

      <section className="bg-[var(--color-paper)] pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="measure-prose app-shell max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-16 text-[var(--color-ink-muted)]">
            <Link href="/" className="underline underline-offset-2">
              Home
            </Link>
            <span aria-hidden> › </span>
            <span>Retirement income</span>
          </nav>

          <p className="text-13 mt-4 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            {AGENT.city} · {AGENT.region}
          </p>
          <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
            What to do with a 401(k) when you retire
          </h1>
          <p className="text-20 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
            You have four options, and each one comes with its own deadlines. This page explains
            what they do and what it costs you to get them wrong. It won’t tell you which to pick —
            that depends on things a web page can’t know, and partly on a license I don’t hold.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The four options</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {OPTIONS.map((option, index) => (
              <li key={option.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{option.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {option.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The window nobody tells you about</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Between the day your paycheck stops and the day required withdrawals start at 73, your
            taxable income is lower than it’s been in decades and lower than it’ll be again. That
            gap is the only stretch where the order you pull from accounts changes what you pay in
            total.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            It’s also where the Medicare trap sits. Premiums come from a return two years old, so a
            big withdrawal or a Roth conversion in your early sixties shows up on your first
            Medicare premium — on both of them, if you’re married. Getting the tax right and the
            Medicare timing wrong is a common and expensive combination.
          </p>
          <div className="card-surface mt-8 border-l-4 border-l-[var(--color-gold-ink)] p-6">
            <p className="text-18 leading-relaxed">
              There’s a calculator on this site for exactly that: what converting all at once costs
              you in Medicare surcharges, against spreading it under your bracket ceiling.
            </p>
            <Link
              href="/plan"
              className="text-17 mt-4 inline-block font-medium underline underline-offset-4"
            >
              See what the timing is worth →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I stop</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I’m a licensed insurance agent finishing a master&rsquo;s in accounting. I’m not a
            registered investment adviser and I’m not a CPA yet. I don’t manage money, recommend
            investments, or tell you what to hold inside a 401(k) or an IRA. Anybody in this
            business who blurs that line is telling you something useful about themselves.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            What I do know well is where retirement income runs into Medicare, because that’s where
            what I studied meets what I’m licensed for. If your question is how a withdrawal hits
            your premium, that one’s mine. If it’s how the money should be invested, that’s an
            adviser&rsquo;s, and I’ll tell you so.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask</h2>
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
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-28 font-semibold">Working out the timing?</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            Tell me what you’re weighing up and I’ll tell you what it does to your Medicare premium,
            and which parts you should be asking a CPA or an adviser about instead.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={AGENT.phoneHref}
              className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)]"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href="/start?topic=financial_planning"
              className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-8 font-semibold text-[var(--color-navy)]"
            >
              Ask a question →
            </Link>
          </div>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
