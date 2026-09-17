import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { getLandingPage, LANDING_SUPPORT, LANDING_PAGES } from "@/lib/landingPages";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * A focused page for each advertised service, with a consultation request,
 * phone alternative, relevant guide, and applicable disclosures.
 * Paid pages use noindex; the public guides serve organic search visitors.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  return {
    title: { absolute: `${page.headline} — ${AGENT.city}, ${AGENT.state}` },
    description: page.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/lp/${page.slug}` },
    openGraph: pageOpenGraph({
      title: page.headline,
      description: page.description,
      path: `/lp/${page.slug}`,
    }),
    twitter: pageTwitter({
      title: page.headline,
      description: page.description,
    }),
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      {/* Keep the named agent and direct phone number easy to find. */}
      <div className="trust-pill w-full">
        <div className="app-shell flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
          <span className="text-15 leading-snug font-medium text-[var(--color-paper)]">
            {AGENT.name} · Licensed agent · {AGENT.city}
          </span>
          <a
            href={AGENT.phoneHref}
            className="text-16 inline-flex items-center gap-2 font-semibold text-[var(--color-paper)] underline underline-offset-4"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {AGENT.phone}
          </a>
        </div>
      </div>

      <section className="bg-[var(--color-navy)] pt-10 pb-14 text-[var(--color-paper)] md:pt-14 md:pb-16">
        <div className="app-shell max-w-5xl">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[3fr_2fr]">
            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
                {page.eyebrow}
              </p>
              <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
                {page.headline}
              </h1>
              <p className="text-20 mt-5 leading-relaxed text-[var(--color-paper)]/85">
                {page.subhead}
              </p>

              <Link
                href={page.primaryHref}
                className="text-20 mt-8 inline-flex min-h-16 w-full items-center justify-center rounded-[12px] bg-[var(--color-paper)] px-6 py-4 text-center font-semibold text-[var(--color-navy)] transition-opacity hover:opacity-95 sm:w-auto"
              >
                Request a free consultation →
              </Link>
              <p className="text-17 mt-3 text-[var(--color-paper)]/85">
                No cost. No obligation to buy. Your request comes directly to Christian and is never
                sold to other agents.
              </p>
              <p className="text-17 mt-3 text-[var(--color-paper)]/85">
                Meet at your home in the Triad, at a convenient public location, by phone, or by
                video. A family member is welcome.
              </p>
              <p className="text-18 mt-5 text-[var(--color-paper)]/85">
                Prefer to call?{" "}
                <a href={AGENT.phoneHref} className="font-semibold underline underline-offset-4">
                  {AGENT.phone}
                </a>
              </p>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <Image
                src="/christian-brinkley-square.jpg"
                alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}, North Carolina`}
                width={600}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, 320px"
                className="w-full rounded-xl border border-white/15 object-cover"
              />
              <p className="text-18 mt-4 font-semibold">{AGENT.name}</p>
              <p className="text-16 text-[var(--color-paper)]/75">
                Licensed insurance agent · {AGENT.city}, {AGENT.state}
              </p>
              <p className="text-16 mt-1 text-[var(--color-paper)]/75">
                One local agent, not a call center
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5">
                {page.promises.map((promise) => (
                  <li key={promise} className="text-17 flex gap-3 leading-snug">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-[var(--color-gold)]"
                      aria-hidden
                    />
                    <span>{promise}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="app-shell grid max-w-5xl gap-10 py-10 md:grid-cols-2 md:py-14">
        <div className="measure-prose">
          <h2 className="text-22 font-semibold">{page.chooseHeading}</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {page.options.map((option) => (
              <li key={option.label}>
                <Link
                  href={option.href}
                  className="text-18 flex min-h-16 items-center justify-between gap-4 rounded-xl border-2 border-[rgba(21,46,52,0.18)] bg-white px-5 py-4 font-semibold transition-colors hover:border-[var(--color-navy)]"
                >
                  {option.label}
                  <span aria-hidden className="text-[var(--color-gold-ink)]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-2xl border border-[rgba(21,46,52,0.12)] bg-white p-6 md:p-7">
          <h2 className="text-22 font-semibold">What we can cover together</h2>
          <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            We’ll start with what matters to you. Here are a few things we can talk through:
          </p>
          <ul className="mt-5 flex flex-col gap-5">
            {page.consultationTopics.map((topic) => (
              <li key={topic} className="text-18 flex gap-3 leading-relaxed">
                <Check className="mt-1 size-5 shrink-0 text-[var(--color-gold-ink)]" aria-hidden />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <p className="text-16 mt-6 border-t border-gray-200 pt-5 leading-relaxed text-[var(--color-ink-muted)]">
            If you have current coverage, keep the details handy for our conversation. It’s fine to
            start with questions—you don’t need to have everything organized.
          </p>
        </aside>
      </section>

      <section className="border-y border-[rgba(21,46,52,0.1)] bg-white py-12">
        <div className="app-shell max-w-4xl">
          <h2 className="text-26 font-semibold">Personal help, at your pace</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {LANDING_SUPPORT.map((item) => (
              <div key={item.title} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold">{item.title}</h3>
                <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(21,46,52,0.1)] bg-[var(--color-paper)] py-12">
        <div className="app-shell max-w-4xl">
          <h2 className="text-26 font-semibold">What happens after you get in touch</h2>
          <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "I review your questions",
                b: "Your request comes directly to me so I can understand what you’d like help with.",
              },
              {
                n: "2",
                t: "We confirm how and when to meet",
                b: "Tell me how you prefer to be contacted. We’ll confirm a time and arrange an in-person, phone, or video conversation.",
              },
              {
                n: "3",
                t: "We talk through your options",
                b: "Bring your questions and any current coverage you’d like to review. You can take your time deciding what to do next.",
              },
            ].map((step) => (
              <li key={step.n} className="flex flex-col gap-2">
                <span className="text-18 flex size-11 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {step.n}
                </span>
                <h3 className="text-19 font-semibold">{step.t}</h3>
                <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">{step.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="app-shell max-w-2xl py-12 text-center">
        <h2 className="text-26 font-semibold">Ready to talk through your questions?</h2>
        <Link
          href={page.primaryHref}
          className="text-20 mt-6 inline-flex min-h-16 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-6 py-4 font-semibold text-[var(--color-paper)]"
        >
          Request a free consultation →
        </Link>
        <p className="text-17 mt-4 text-[var(--color-ink-muted)]">
          No cost. No obligation to buy. You decide what to do next.
        </p>
        <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
          Or call{" "}
          <a href={AGENT.phoneHref} className="font-semibold underline underline-offset-4">
            {AGENT.phone}
          </a>
          . {AGENT.afterHoursPromise}
        </p>
      </section>

      <section className="border-t border-[rgba(21,46,52,0.1)] bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-24 font-semibold">Would you like to read a little more first?</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Take your time. The guide explains the main questions to consider before we talk.
          </p>
          <Link
            href={page.guideHref}
            className="text-18 mt-5 inline-block font-semibold underline underline-offset-4"
          >
            Read the guide →
          </Link>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pt-8 pb-12">
        <ComplianceDisclosure variant={page.compliance} />
        <p className="text-15 mt-6 text-center text-[var(--color-ink-muted)]">
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy
          </Link>
        </p>
      </div>
    </main>
  );
}
