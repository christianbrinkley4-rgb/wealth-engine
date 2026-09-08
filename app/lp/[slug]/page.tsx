import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { LeadCluster } from "@/app/components/LeadCluster";
import { AGENT } from "@/lib/agent";
import { getLandingPage, LANDING_CONTRAST, LANDING_PAGES } from "@/lib/landingPages";
import { pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * The page paid traffic lands on, and nothing else.
 *
 * The rest of the site is built for someone browsing. This is built for
 * someone who clicked an ad eight seconds ago, and the difference is removal
 * rather than addition: no navigation, no footer link farm, no sticky bar
 * competing with the buttons. The chrome components each check for the /lp
 * prefix and render nothing, so this page offers five links where the home
 * page offers thirty-seven.
 *
 * Three things it keeps on purpose:
 *
 *   The phone first. This audience calls. Most landing pages in the category
 *   lead with a form because forms are easier to count.
 *
 *   Buttons that deep-link into the real quiz with the topic already chosen,
 *   so the first click happens here and costs nothing to make.
 *
 *   The CMS disclosures in full on Medicare angles. A Medicare marketing page
 *   without them is a compliance problem no conversion rate makes up for.
 *
 * noindex, so these never compete with the organic pages for the same terms.
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
      {/* A header with no navigation: the number is the only thing to click. */}
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

              <a
                href={AGENT.phoneHref}
                className="text-20 mt-8 inline-flex h-16 w-full items-center justify-center gap-3 rounded-[12px] bg-[var(--color-paper)] px-8 font-semibold text-[var(--color-navy)] transition-opacity hover:opacity-95 sm:w-auto"
              >
                <Phone className="size-6 shrink-0" aria-hidden />
                Call {AGENT.phone}
              </a>
              <p className="text-16 mt-3 text-[var(--color-paper)]/70">
                {AGENT.hours} {AGENT.afterHoursPromise}
              </p>
              <p className="text-16 mt-2 text-[var(--color-paper)]/70">
                in person or by phone. No cost, and your name is never sold.
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
              <p className="text-16 mt-1 text-[var(--color-paper)]/75">{AGENT.education}</p>

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

      <section className="app-shell max-w-5xl py-10 md:py-14">
        <div className="measure-prose max-w-3xl">
          <h2 className="text-22 font-semibold">{page.chooseHeading}</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {page.options.map((option) => (
              <li key={option.label}>
                <Link
                  href={option.href}
                  className="text-18 flex min-h-16 items-center justify-between gap-4 rounded-xl border-2 border-[rgba(15,34,65,0.18)] bg-white px-5 py-4 font-semibold transition-colors hover:border-[var(--color-navy)]"
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
      </section>

      <section className="border-y border-[rgba(15,34,65,0.1)] bg-white py-12">
        <div className="app-shell max-w-4xl">
          <h2 className="text-26 font-semibold">
            Those ads match you through a matching service. I sit down.
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-[rgba(15,34,65,0.12)]">
            <div className="grid grid-cols-1 bg-[var(--color-paper)] md:grid-cols-2">
              <p className="text-13 border-b border-[rgba(15,34,65,0.1)] px-6 py-3 font-medium tracking-[0.08em] text-[var(--color-ink-muted)] uppercase md:border-r">
                large online marketplaces
              </p>
              <p className="text-13 hidden border-b border-[rgba(15,34,65,0.1)] px-6 py-3 font-medium tracking-[0.08em] text-[var(--color-navy)] uppercase md:block">
                Here
              </p>
            </div>
            {LANDING_CONTRAST.map((row) => (
              <div
                key={row.them}
                className="grid grid-cols-1 border-t border-[rgba(15,34,65,0.1)] md:grid-cols-2"
              >
                <p className="text-17 px-6 py-4 text-[var(--color-ink-muted)] md:border-r md:border-[rgba(15,34,65,0.1)]">
                  {row.them}
                </p>
                <p className="text-17 bg-[var(--color-paper)] px-6 py-4 font-medium text-[var(--color-navy)] md:bg-white">
                  {row.us}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,34,65,0.1)] bg-[var(--color-paper)] py-12">
        <div className="app-shell max-w-4xl">
          <h2 className="text-26 font-semibold">What happens after you get in touch</h2>
          <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "I read what you sent",
                b: "Me, personally. It doesn’t go to an assistant or anybody else.",
              },
              {
                n: "2",
                t: "I call or email you",
                b: "Usually the same day, always within one business day.",
              },
              {
                n: "3",
                t: "You decide what happens",
                b: "Sometimes that’s comparing options. Sometimes it’s me saying you’re already fine.",
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
        <h2 className="text-26 font-semibold">The fastest way is still the phone.</h2>
        <a
          href={AGENT.phoneHref}
          className="text-20 mt-6 inline-flex h-16 items-center justify-center gap-3 rounded-[12px] bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)]"
        >
          <Phone className="size-6 shrink-0" aria-hidden />
          {AGENT.phone}
        </a>
        <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
          {AGENT.hours} Or leave a message — I return calls the next business day.
        </p>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.1)] bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <LeadCluster heading="Or read the longer page for your situation" />
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
