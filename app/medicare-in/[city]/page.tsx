import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CitySnapshot } from "@/app/components/CitySnapshot";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";
import { getTriadCity, placeCheckBeat, relatedPlaces, TRIAD_CITIES } from "@/lib/triad";

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

  const others = relatedPlaces(city);
  const startHref = "/start?topic=medicare";

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
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
              dateModified: "2026-09-03",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: `Medicare help in ${city.name}`,
              description: `In-person Medicare review in ${city.name} (${city.county}). No cost, no call center.`,
              path: `/medicare-in/${city.slug}`,
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/service-area" },
          { name: `Medicare in ${city.name}` },
        ]}
        eyebrow={`${city.name} · ${city.county}`}
        title={`Medicare help in ${city.name}, North Carolina`}
        lede={city.intro}
        secondaryHref={startHref}
        secondaryLabel="Ask a question instead →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <CitySnapshot city={city} />
          <h2 className="text-28 mt-10 font-semibold">What I actually check in {city.name}</h2>
          <p className="text-18 mt-4 leading-relaxed">{placeCheckBeat(city)}</p>
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
            I’ve named them because that’s where most people here get seen, and for no other reason.
            I’m not affiliated with any of them, and you won’t find a table on this site claiming
            which plans they take. Those deals get renegotiated every year, and a stale table is
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
            Nearby kitchen-table visits include {city.nearby.join(", ")} when they fall within the
            roughly 30-minute service area. County lines decide Medicare plan lists; they do not
            expand the in-person radius.
          </p>

          <h3 className="text-20 mt-8 font-semibold">Nearby towns I also sit down in</h3>
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
                      ? " — a different plan list from yours"
                      : " — the same plan list as yours"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-20 mt-8 font-semibold">Also in {city.name}</h3>
          <ul className="mt-3 flex flex-col gap-3">
            <li>
              <Link
                href={`/life-insurance-in/${city.slug}`}
                className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
              >
                <span className="text-18 font-semibold">Life insurance in {city.name} →</span>
                <span className="text-16 mt-1 leading-snug text-[var(--color-ink-muted)]">
                  Read the policy at the kitchen table. No cost, no obligation.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/retirement-in/${city.slug}`}
                className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
              >
                <span className="text-18 font-semibold">Retirement help in {city.name} →</span>
                <span className="text-16 mt-1 leading-snug text-[var(--color-ink-muted)]">
                  401(k) options and Medicare timing. Education, not investment advice.
                </span>
              </Link>
            </li>
          </ul>

          <h3 className="text-20 mt-8 font-semibold">Worth reading next</h3>
          <ul className="text-17 mt-3 flex list-disc flex-col gap-2 pl-6 leading-relaxed">
            <li>
              <Link href="/turning-65" className="underline underline-offset-2">
                Turning 65 — Initial Enrollment
              </Link>
            </li>
            <li>
              <Link href="/annual-enrollment" className="underline underline-offset-2">
                Already on Medicare this fall
              </Link>
            </li>
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
              <Link href="/service-area" className="underline underline-offset-2">
                Every town within 30 minutes of downtown Greensboro
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

      <KitchenTableClose
        heading={`Tell me who you see in ${city.name}`}
        body={`Give me the names and I’ll check them against what I can offer in ${city.county}. If something I can’t offer suits you better, I’ll tell you that instead.`}
        href={startHref}
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
