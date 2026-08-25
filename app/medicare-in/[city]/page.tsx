import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { getTriadCity, TRIAD_CITIES } from "@/lib/triad";

/**
 * One page per Triad city, and each one earns its place.
 *
 * Thin city pages — the same paragraph with the town name swapped — are a
 * well-known way to get a site treated as spam, and they are useless to read.
 * These are driven by lib/triad.ts, where every city carries its own county,
 * its own hospitals and its own honest complication: High Point buys plans
 * from Guilford while being treated largely by Winston-Salem's system, and
 * Winston-Salem shops from an entirely different county list twenty-five
 * minutes away. That is the local knowledge a national call centre does not
 * have, and it is the reason these pages are worth publishing at all.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return TRIAD_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getTriadCity(slug);
  if (!city) return {};

  const title = `Medicare Help in ${city.name}, NC — Licensed Local Agent`;
  // Kept under the ~160 character cutoff Google truncates at.
  const description =
    `Medicare plans are sold by county, and ${city.name} is in ${city.county}. ` +
    `What that means for your plan options and your doctors, from a licensed local agent.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/medicare-in/${city.slug}` },
    openGraph: pageOpenGraph({
      title: `Medicare help in ${city.name}, North Carolina`,
      description: `Why ${city.county} decides which plans you can buy, and what that means for your doctors.`,
      path: `/medicare-in/${city.slug}`,
    }),
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getTriadCity(slug);
  if (!city) notFound();

  const others = TRIAD_CITIES.filter((entry) => entry.slug !== city.slug);
  const startHref = "/start?topic=medicare";

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: `Medicare in ${city.name}`, path: `/medicare-in/${city.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: `Medicare help in ${city.name}, North Carolina`,
              description: `How ${city.county} determines which Medicare plans are available in ${city.name}.`,
              path: `/medicare-in/${city.slug}`,
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
            <span>Medicare in {city.name}</span>
          </nav>

          <p className="text-13 mt-4 flex items-center gap-2 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {city.name} · {city.county}
          </p>

          <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold tracking-tight text-balance">
            Medicare help in {city.name}, North Carolina
          </h1>

          <p className="text-20 mt-5 leading-relaxed text-[var(--color-ink-muted)]">{city.intro}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={AGENT.phoneHref}
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href={startHref}
              className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              Ask a question instead →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why the county matters more than the city</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Medicare Advantage and Part D plans are sold county by county. An insurance company can
            offer a plan in {city.county} and not in the county next door, and where it offers both,
            the premium and the extras can be different. So the first thing worth establishing about{" "}
            {city.name} is not which company advertises hardest here. It is that you are shopping
            from the {city.county} list.
          </p>
          {city.countyNote ? (
            <p className="text-18 mt-4 border-l-4 border-[var(--color-gold-ink)] py-2 pl-5 leading-relaxed">
              {city.countyNote}
            </p>
          ) : null}
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {city.localDetail}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where people in {city.name} are treated</h2>
          <ul className="text-18 mt-4 flex list-disc flex-col gap-2 pl-6 leading-relaxed">
            {city.hospitals.map((hospital) => (
              <li key={hospital}>{hospital}</li>
            ))}
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Named because that is where most people here are seen, and nothing more. I have no
            affiliation with any of them, and you will not find a table on this site claiming which
            plans they take — those arrangements are renegotiated every year, and a stale table is
            exactly how somebody picks a plan and loses their doctor.{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              Here is how to check it properly
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get from {city.name}</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {city.faq.map((item) => (
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(city.faq)) }}
          />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Also serving</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            {city.nearby.join(", ")}, and the rest of {city.county}.
          </p>

          <h3 className="text-20 mt-8 font-semibold">The rest of the Triad</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/medicare-in/${other.slug}`}
                  className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
                >
                  <span className="text-18 font-semibold">Medicare in {other.name} →</span>
                  <span className="text-16 mt-1 leading-snug text-[var(--color-ink-muted)]">
                    {other.county}
                    {other.county !== city.county
                      ? " — a different plan list from here"
                      : " — the same plan list as here"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-20 mt-8 font-semibold">Worth reading next</h3>
          <ul className="text-17 mt-3 flex list-disc flex-col gap-2 pl-6 leading-relaxed">
            <li>
              <Link href="/keep-my-doctor" className="underline underline-offset-2">
                Whether you can keep your doctor
              </Link>
            </li>
            <li>
              <Link href="/remind-me" className="underline underline-offset-2">
                Your enrollment dates, worked out from your birth month
              </Link>
            </li>
            <li>
              <Link href="/irmaa-appeal" className="underline underline-offset-2">
                Appealing a premium set on income you no longer earn
              </Link>
            </li>
            <li>
              <Link href="/medicare" className="underline underline-offset-2">
                Estimate your 2026 Part B premium
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-28 font-semibold">Tell me who you see in {city.name}</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            Give me the names and I will check them against what I can offer in {city.county}, and
            tell you plainly when something I cannot offer suits you better.
          </p>
          <Link
            href={startHref}
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
