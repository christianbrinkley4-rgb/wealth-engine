import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The door that was missing.
 *
 * Everything here aimed at Medicare was written for somebody turning 65 — a
 * group that refreshes once a year and is a fraction of the market. The larger
 * group is everybody already enrolled, and between October 15 and December 7
 * they are all asked to make a decision at once. That is the highest-volume
 * Medicare search there is, it repeats every autumn, and the site had no page
 * for it.
 *
 * The position, which almost nobody publishing on this query takes: most
 * people should keep what they have. Saying so is what makes the page worth
 * reading, and it is the only claim on the topic a language model can quote
 * without hedging.
 */

export const metadata: Metadata = {
  title: { absolute: "Medicare Annual Enrollment, Oct 15–Dec 7 — Greensboro, NC" },
  description:
    "What actually changes for you this fall, the one letter that matters, and why most people should keep the plan they have. Straight answers from a local licensed agent.",
  alternates: { canonical: "/annual-enrollment" },
  openGraph: pageOpenGraph({
    title: "Medicare annual enrollment, without the sales pitch",
    description:
      "Most people should keep what they have. Here is how to tell whether you are one of them.",
    path: "/annual-enrollment",
  }),
};

const STEPS = [
  {
    t: "Find the letter, not the commercials",
    b: "Your plan mails an Annual Notice of Change every September. It’s dull, and it’s the only document that matters, because it lists exactly what your plan is doing differently in January — premium, deductible, copays, drug list. Ten minutes with that letter tells you more than a month of television.",
  },
  {
    t: "Check your prescriptions against next year’s list",
    b: "This is where people get hurt. Plans drop medications and move them between tiers every year, so a drug that cost you a little in December can cost a lot in January with no warning beyond that letter. Check each one by name.",
  },
  {
    t: "Check your doctors are still in network",
    b: "Networks change in both directions — a practice can leave a plan, and a plan can drop a health system. Around here that usually means Cone Health, Novant or Atrium Health Wake Forest Baptist, and it’s worth confirming rather than assuming.",
  },
  {
    t: "Only then look at whether anything else fits better",
    b: "If your drugs are covered, your doctors are in, and the costs look about the same, you’re done. Do nothing and your coverage rolls over on its own. Switching because a mailer told you to is how people end up worse off than they started.",
  },
] as const;

const FAQ = [
  {
    q: "When is Medicare annual enrollment?",
    a: "October 15 through December 7 every year, and anything you change starts January 1. If you’re on a Medicare Advantage plan there’s a second window from January 1 to March 31, but it’s narrower — it lets you switch Advantage plans or go back to Original Medicare, not shop freely.",
  },
  {
    q: "Do I have to do anything?",
    a: "No. Do nothing and your plan renews itself. That’s the right answer for most people most years, and I’d rather tell you so than talk you into a change you didn’t need.",
  },
  {
    q: "How do I know if I should switch?",
    a: "Three things. Did a prescription you take get dropped or moved to a worse tier, did a doctor you see leave the network, and did your out-of-pocket costs jump. If all three are no, keep what you have. If any one is yes, it’s worth a real look.",
  },
  {
    q: "Why do I get so much mail and so many calls this time of year?",
    a: "Because the whole industry is paid on plans that change hands during those eight weeks. The volume tells you about the commission structure, not about whether your plan is still right for you.",
  },
  {
    q: "Can I change my Medigap policy during this window?",
    a: "This window is for Medicare Advantage and Part D drug plans. Medigap runs on its own schedule — you can apply any time of year, but outside your original six-month window an insurer in North Carolina is allowed to review your health history and say no.",
  },
  {
    q: "My premium went up and I didn’t change anything. Why?",
    a: "That’s often IRMAA rather than your plan — an income-based surcharge Medicare sets from your tax return two years back. A one-time event in that year, like selling a house or a large withdrawal, can raise your premium long after the money is gone. If your income has since dropped for a qualifying reason, it can be appealed.",
  },
] as const;

export default function AnnualEnrollmentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment", path: "/annual-enrollment" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare annual enrollment, without the sales pitch",
              description:
                "What changes for you this fall, the one letter that matters, and why most people should keep the plan they have.",
              path: "/annual-enrollment",
              datePublished: "2026-08-31",
              dateModified: "2026-08-31",
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
            <span>Annual enrollment</span>
          </nav>

          <p className="text-13 mt-4 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            October 15 – December 7 · {AGENT.city}, {AGENT.state}
          </p>
          <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
            Most people should keep the plan they have.
          </h1>
          <p className="text-20 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
            From the middle of October to the first week of December your mailbox fills up and the
            phone starts ringing, and every one of those calls gets paid when you switch. I don’t.
            Here’s how to work out in about twenty minutes whether anything actually needs to change
            — and most years, for most people, nothing does.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={AGENT.phoneHref}
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href="/start?topic=medicare&stage=already_on_medicare"
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              Have me check your plan →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The twenty-minute version</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The dates, all of them</h2>
          <dl className="mt-6 flex flex-col gap-5">
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">October 15 – December 7</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Annual enrollment. Join, switch or drop a Medicare Advantage or Part D drug plan.
                Whatever you pick starts January 1.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">January 1 – March 31</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Medicare Advantage open enrollment, if you’re already on an Advantage plan. One
                change: to a different Advantage plan, or back to Original Medicare with a drug
                plan.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Any time, if your life changed</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Moving out of your plan’s county, losing employer coverage, or your plan leaving the
                area each open a special enrollment period of their own. If one of those happened to
                you, the fall window isn’t your only chance.
              </dd>
            </div>
          </dl>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Advantage and Part D plans are sold county by county, so what’s available in Guilford
            isn’t the same list as Forsyth or Davidson.{" "}
            <Link href="/medicare-in/greensboro" className="underline underline-offset-2">
              What that means where you live
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get every October</h2>
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

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-28 font-semibold">Send me your notice and your prescriptions</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            I’ll tell you whether anything changed that matters to you, including when the answer is
            that nothing did. No appointment, no pitch.
          </p>
          <Link
            href="/start?topic=medicare&stage=already_on_medicare"
            className="text-18 mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 font-semibold text-[var(--color-paper)]"
          >
            Start here →
          </Link>
          <p className="text-17 mt-6 text-[var(--color-ink-muted)]">
            Or call{" "}
            <a
              href={AGENT.phoneHref}
              className="font-semibold text-[var(--color-navy)] underline underline-offset-2"
            >
              {AGENT.phone}
            </a>{" "}
            — {AGENT.hours}
          </p>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
