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
    "What a fixed or indexed annuity does, when it’s the wrong answer, and what to ask before you sign. From a licensed agent in Greensboro. No cost to talk.",
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
    a: "You hand an insurance company money. It promises you income back — starting now or starting later, for a set number of years or for as long as you live. That’s the whole idea. Everything else is terms and conditions stacked on top of it.",
  },
  {
    q: "Is an annuity a good investment?",
    a: "It’s generally not an investment, and treating it like one is where people end up disappointed. It’s insurance against running out of money, and it’s priced like insurance. If you want growth, this is the wrong tool. If you want a floor under your income that doesn’t move when the market does, it’s the tool built for exactly that.",
  },
  {
    q: "What is the catch?",
    a: "Access. Most of these contracts charge you for taking out more than a set amount in the early years, and that surrender period can run a while. If there’s any chance you need the money back soon, that’s your reason not to do it. It’s the first thing I ask, not the last.",
  },
  {
    q: "Can I put my 401(k) into one?",
    a: "You can move money from a 401(k) into a fixed or indexed annuity. Whether you should is a different question, and it depends on what that 401(k) is doing now and what else you’ve got. I’m licensed for insurance, not securities. If the right answer is to stay invested in the market, that’s a conversation for an adviser and I’ll tell you so.",
  },
  {
    q: "Do you sell variable annuities?",
    a: "No. Those are securities and need a securities license, which I don’t have. I work with fixed and indexed contracts. If a variable product is genuinely what suits you, you need somebody registered for it.",
  },
  {
    q: "How are you paid on an annuity?",
    a: "The insurance company pays a commission when the contract is issued. You don’t pay me a fee, and your rate is whatever the company sets. Ask me how that works on anything I show you and I’ll tell you. It’s a fair question.",
  },
] as const;

const WRONG_FITS = [
  {
    t: "You might need the money in the next few years",
    b: "Surrender charges exist to stop exactly that. If the money is spoken for — a roof, a car, something you can’t name yet — it shouldn’t be sitting in a contract that charges you for reaching it.",
  },
  {
    t: "You are looking for growth",
    b: "An indexed annuity caps how much of a good year you keep, in exchange for sitting out the bad ones. That’s a fair trade if you want stability. It’s a bad one if you want a return.",
  },
  {
    t: "Somebody has quoted you a number that sounds too good",
    b: "Illustrated values aren’t guaranteed values, and they’re printed on the same page in the same size type. The guaranteed column is the promise. Everything next to it is a picture of what might happen.",
  },
  {
    t: "It would take most of what you have",
    b: "An annuity is a floor, not the whole house. If somebody’s proposal moves most of your savings into one contract, get a second opinion from a person who isn’t paid on it.",
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
            those two things are related. Here’s what one actually does, the four times the answer
            is no, and what to ask anybody who puts a proposal in front of you. Me included.
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
            set number of years or for as long as you live. That promise is the product. It isn’t a
            fund and it isn’t a market position, and what it’s worth to you isn’t the return. It’s
            that the payment shows up whether or not the market had a good year.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The honest case for one is narrow, and it’s real. You’ve saved enough that running out
            is unlikely but not impossible, and you’d rather turn some of that uncertainty into a
            payment you can count on. That’s insurance, and it’s a reasonable thing to buy.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four times the answer is no</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            If any of these sounds like you, keep your money where it is.
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
            I hold a North Carolina insurance license. It covers fixed and indexed annuities, life
            insurance, and Medicare. Variable annuities are securities and need a license I don’t
            have. I’m not a registered investment adviser either, so I don’t manage portfolios or
            tell you what to hold in a 401(k) or a brokerage account.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            That matters more here than on most pages, because a lot of annuity marketing is aimed
            at money that’s currently in the market. If the right answer for you is to leave it
            there, you need somebody registered to tell you how. I’ll say so instead of selling
            around it.
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
            Bring it. I’ll read the guaranteed column with you and tell you what the surrender
            schedule actually says. If I think it’s wrong for you, I’ll say that too, including when
            the honest answer is to do nothing at all.
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
