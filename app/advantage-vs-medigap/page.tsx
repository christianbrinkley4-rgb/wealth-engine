import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The comparison everybody searches and almost nobody answers straight.
 *
 * "Medicare Advantage vs Medigap" is the single biggest decision query in the
 * turning-65 space, and nearly every page ranking for it is published by
 * somebody who sells one of the two. This one takes the position the rest of
 * the site takes: neither is better in general, the honest answer depends on
 * three specific things about you, and one of the three has a deadline that
 * never comes back.
 *
 * That last part is the reason this page is worth writing. Most comparisons
 * treat the choice as reversible. Going Advantage first and switching to a
 * Medigap policy later usually means medical underwriting, and in most states
 * an insurer can decline you — which turns "you can always change your mind"
 * into something closer to a one-way door.
 */

export const metadata: Metadata = {
  title: { absolute: "Medicare Advantage vs Medigap — Greensboro, NC" },
  description:
    "Neither one is better in general. The three things that decide it for you, and the deadline that makes the choice harder to undo than most comparisons admit.",
  alternates: { canonical: "/advantage-vs-medigap" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage vs Medigap, decided honestly",
    description: "Three things decide it, and one of them has a deadline that does not come back.",
    path: "/advantage-vs-medigap",
  }),
};

const DECIDERS = [
  {
    t: "Which doctors you want to keep",
    b: "Original Medicare with a Medigap policy has no network — any provider in the country who takes Medicare, and most do. Advantage plans work through networks, like the insurance you had at work. If keeping a particular specialist matters more to you than anything else, that is the whole answer and you can stop reading.",
  },
  {
    t: "Whether you would rather pay steadily or pay when something happens",
    b: "Medigap costs more every month and very little when you are ill. Advantage usually costs less every month — sometimes nothing beyond your Part B premium — and more when you use it, up to the plan's out-of-pocket maximum. Neither is cheaper in the abstract. One is predictable and one is contingent, and people genuinely differ on which they can live with.",
  },
  {
    t: "Whether you will still be able to switch later",
    b: "This is the one that gets left out. During your six-month Medigap open enrollment window, no insurer may turn you down or charge you more for your health history. Outside it, in most states, they can — so going Advantage first and moving to Medigap at 70 may mean answering health questions, and the answer can be no.",
  },
] as const;

const FAQ = [
  {
    q: "Which one is better?",
    a: "Neither, in general — and anybody who answers that question without asking about your doctors, your prescriptions and your appetite for risk is telling you about their contracts rather than your situation. What is true is that they fail in different directions: Medigap costs you more every month and almost nothing when you are sick, Advantage costs less every month and more when you use it.",
  },
  {
    q: "Can I switch from Medicare Advantage to Medigap later?",
    a: "You can apply. Whether you are accepted is the question. Outside your six-month Medigap open enrollment window, most states let an insurer use your health history to decline you or charge more. Some states have extra protections and North Carolina is not generous here, so treat the first decision as harder to reverse than it looks.",
  },
  {
    q: "Do I need a drug plan with each?",
    a: "With Original Medicare and a Medigap policy you buy Part D separately. Most Advantage plans include drug coverage. Either way the drug piece deserves its own look, because plans change their covered medications every year and the one that fit last year may not this year.",
  },
  {
    q: "Are the extras on Advantage plans worth it?",
    a: "Dental, vision and hearing benefits are real and people use them. They are also usually capped at amounts smaller than a single significant procedure. Worth having, not worth choosing a plan for on their own.",
  },
  {
    q: "What if my spouse and I want different things?",
    a: "Then take different plans. There is no rule that a couple has to match, and choosing together when you use different doctors is a common way one of you ends up unhappy.",
  },
  {
    q: "Which do you recommend?",
    a: "It depends on your answers to the three things above, and I will tell you plainly when the better fit is something I cannot offer — I represent a limited number of insurance companies. Tell me who you see and what you take, and I will check both routes against it.",
  },
] as const;

export default function AdvantageVsMedigapPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Advantage vs Medigap", path: "/advantage-vs-medigap" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Advantage vs Medigap, decided honestly",
              description:
                "The three things that actually decide it, and why the first choice is harder to reverse than most comparisons admit.",
              path: "/advantage-vs-medigap",
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
            <span>Advantage vs Medigap</span>
          </nav>

          <p className="text-13 mt-4 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            {AGENT.city} · {AGENT.region}
          </p>
          <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
            Medicare Advantage or Medigap? Neither one wins in general.
          </h1>
          <p className="text-20 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
            Almost every page you will find on this comparison is published by somebody who sells
            one of the two. Here is the version I would give a neighbor: three things decide it, and
            one of them has a deadline that doesn’t come back.
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
              href="/start?topic=medicare&stage=turning_65_soon"
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              Tell me your situation →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The two routes, in one paragraph each</h2>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Original Medicare plus a Medigap policy.</strong> Medicare pays its share, the
            Medigap policy pays most of what is left, and you buy a Part D drug plan separately. No
            network — any provider in the country who takes Medicare. You pay a monthly premium for
            the Medigap policy on top of your Part B premium, and very little when you are actually
            ill.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            <strong>Medicare Advantage.</strong> A private plan takes over your Part A and Part B
            coverage, usually bundles in drug coverage, and often adds dental, vision or hearing.
            Premiums are lower and sometimes zero beyond Part B. In exchange you use a network, some
            care needs prior authorization, and you pay as you go until you hit the plan’s
            out-of-pocket maximum.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The three things that actually decide it</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {DECIDERS.map((item, index) => (
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

          <p
            className="text-18 mt-8 border-l-4 py-3 pl-5 leading-relaxed"
            style={{ borderColor: "#7a5c12" }}
          >
            <strong>The part most comparisons leave out.</strong> People describe this as a choice
            you can revisit. You can always switch Advantage plans in the annual window — that part
            is true. Moving to a Medigap policy years later is the part that isn’t, because by then
            your health history is allowed to count against you.{" "}
            <Link href="/remind-me" className="underline underline-offset-2">
              Your Medigap window has exact dates
            </Link>
            , and they are worth knowing before you decide anything.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Around here specifically</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Which Advantage plans you can buy at all depends on your county — they are sold county
            by county, so Guilford and Forsyth have different lineups. Medigap doesn’t work that
            way: a Medigap policy travels with you, which matters if you spend part of the year
            somewhere else or expect to move closer to family later.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Most people here are with Cone Health, Atrium Health Wake Forest Baptist or Novant, and
            plenty use more than one.{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              How to check a specific doctor against a specific plan
            </Link>{" "}
            is a separate page, because it is the step that settles this for most households.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about this</h2>
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
          <h2 className="text-28 font-semibold">Tell me who you see and what you take</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            I’ll check both routes against your actual doctors and prescriptions, and tell you
            plainly when the better fit is something I can’t offer.
          </p>
          <Link
            href="/start?topic=medicare&stage=turning_65_soon"
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
