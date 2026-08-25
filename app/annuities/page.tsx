import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Annuities, written to be trusted rather than to convert.
 *
 * Every other page ranking for "annuities" in this market is either an
 * insurer's brochure or a lead form wearing an article's clothes, and the
 * people searching know it — which is why the query converts so badly for
 * everyone running it. The gap in the market is the page that says plainly
 * when an annuity is the wrong answer, and it happens to be the page a
 * language model will quote, because it is the only one making a falsifiable
 * claim rather than a promise.
 *
 * Scope note: fixed and indexed annuities are insurance products and sit
 * inside a life licence. Variable annuities are securities and do not, so this
 * page says so rather than quietly blurring the line.
 */

export const metadata: Metadata = {
  title: { absolute: "Annuities in Greensboro, NC — Straight Answers, No Pitch" },
  description:
    "What a fixed or indexed annuity does, when it is the wrong answer, and what to ask before signing. From a licensed agent in Greensboro. No cost to talk.",
  alternates: { canonical: "/annuities" },
  openGraph: pageOpenGraph({
    title: "Annuities, explained without the pitch",
    description:
      "When a fixed or indexed annuity makes sense, when it does not, and the questions worth asking first.",
    path: "/annuities",
  }),
};

const FAQ = [
  {
    q: "What does an annuity actually do?",
    a: "You hand an insurance company a sum of money, and in exchange it promises income — either starting now or starting later, for a set number of years or for as long as you live. That is the whole idea. Everything else is terms and conditions on top of it.",
  },
  {
    q: "Is an annuity a good investment?",
    a: "It is generally not an investment, and treating it as one is where people get disappointed. It is insurance against running out of money, and it is priced like insurance. If what you want is growth, an annuity is usually the wrong tool. If what you want is a floor under your income that does not move when the market does, it is the tool built for that.",
  },
  {
    q: "What is the catch?",
    a: "Access. Most of these contracts charge you to take more than a set amount out during the early years, and that surrender period can run several years. If there is any chance you need that money back soon, that is the reason not to do it, and it is the question I ask first rather than last.",
  },
  {
    q: "Can I put my 401(k) into one?",
    a: "Money from a 401(k) can be moved into a fixed or indexed annuity, and whether it should be is a different question that depends on what the 401(k) is currently doing and what else you have. I am licensed for insurance products, not securities, so if the right answer involves staying invested in the market, that is a conversation for an investment adviser and I will tell you so.",
  },
  {
    q: "Do you sell variable annuities?",
    a: "No. Variable annuities are securities and require a securities licence, which I do not hold. I work with fixed and indexed contracts. If a variable product is genuinely what suits you, you need someone registered for it.",
  },
  {
    q: "How are you paid on an annuity?",
    a: "The insurance company pays a commission when a contract is issued. You do not pay me a fee, and the rate on your contract is what the company sets. I will tell you the shape of that arrangement on any product I show you if you ask, and it is a reasonable thing to ask.",
  },
] as const;

const WRONG_FITS = [
  {
    t: "You might need the money in the next few years",
    b: "Surrender charges exist precisely to stop that. If the money is earmarked for a roof, a car, or an unknown, it should not be in a contract that penalises you for reaching it.",
  },
  {
    t: "You are looking for growth",
    b: "An indexed annuity limits how much of a good year you keep, in exchange for not participating in a bad one. That trade is worth making for stability and a poor one to make for return.",
  },
  {
    t: "Somebody has quoted you a number that sounds too good",
    b: "Illustrated values are not guaranteed values, and the two are printed on the same page in similar type. The guaranteed column is the promise. Everything else is an illustration of what could happen.",
  },
  {
    t: "It would take most of what you have",
    b: "An annuity is a floor, not a foundation for everything. If a proposal moves the large majority of your savings into one contract, that is worth a second opinion from someone who is not being paid on it.",
  },
] as const;

export default function AnnuitiesPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annuities", path: "/annuities" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Annuities in Greensboro, explained without the pitch",
              description:
                "What a fixed or indexed annuity does, when it is the wrong answer, and what to ask before signing.",
              path: "/annuities",
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
            <span>Annuities</span>
          </nav>

          <p className="text-13 mt-4 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            {AGENT.city} · {AGENT.region}
          </p>
          <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
            Annuities, explained by someone willing to tell you not to buy one.
          </h1>
          <p className="text-20 mt-5 leading-relaxed text-[var(--color-ink-muted)]">
            Annuities are the most oversold product in this business and the most misunderstood, and
            those two facts are related. Here is what one actually does, the four situations where
            it is the wrong answer, and the questions worth asking anybody who puts a proposal in
            front of you — including me.
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
              href="/start?topic=financial_planning"
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              Ask a question first →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What you are actually buying</h2>
          <p className="text-18 mt-4 leading-relaxed">
            You give an insurance company money. It promises to pay you income — now or later, for a
            fixed number of years or for as long as you live. That promise is the product. It is not
            a fund, it is not a market position, and its value to you is not its return. Its value
            is that the payment arrives whether or not the market cooperated that year.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The honest case for one is narrow and real: you have enough saved that running out is
            unlikely but not impossible, and you would rather convert some of that uncertainty into
            a payment you can count on. That is insurance, and it is a reasonable thing to buy.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four times the answer is no</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            If any of these describes you, the right move is to keep your money where it is.
          </p>
          <ul className="mt-8 flex flex-col gap-6">
            {WRONG_FITS.map((item) => (
              <li key={item.t} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What I am and am not licensed for</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I hold a North Carolina insurance licence, which covers fixed and indexed annuities,
            life insurance, and Medicare. Variable annuities are securities and require a securities
            licence I do not hold. Neither am I a registered investment adviser, so I do not manage
            portfolios or advise on what to hold in a 401(k) or brokerage account.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            That matters here more than on most pages, because a great deal of annuity marketing is
            aimed at money currently invested in the market. If the right answer for you is to leave
            it invested, you need somebody registered to tell you how — and I will say so rather
            than sell around it.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about annuities</h2>
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
          <h2 className="text-28 font-semibold">Have a proposal in front of you?</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            Bring it. I will read the guaranteed column with you, tell you what the surrender
            schedule actually says, and tell you if I think it is wrong for you — including when the
            honest answer is to do nothing.
          </p>
          <a
            href={AGENT.phoneHref}
            className="text-18 mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 py-4 font-semibold text-[var(--color-paper)]"
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            {AGENT.phone}
          </a>
          <p className="text-17 mt-6 text-[var(--color-ink-muted)]">
            Serving Greensboro, High Point, Winston-Salem and the rest of the Triad. {AGENT.hours}
          </p>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
