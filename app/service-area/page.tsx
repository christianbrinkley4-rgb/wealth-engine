import type { Metadata } from "next";
import Link from "next/link";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { placesByCounty, SERVICE_AREA_LABEL, SERVICE_AREA_LEDE, TRIAD_CITIES } from "@/lib/triad";

export const metadata: Metadata = {
  title: { absolute: "local, personalized help Within 30 Minutes of Downtown Greensboro, NC" },
  description:
    "Medicare, life insurance, and retirement questions answered in person anywhere about 30 minutes from downtown Greensboro — including High Point, Winston-Salem, Kernersville, Summerfield, Jamestown, and the towns in between. Not only the three big cities.",
  alternates: { canonical: "/service-area" },
  openGraph: pageOpenGraph({
    title: "Within 30 minutes of downtown Greensboro",
    description: SERVICE_AREA_LEDE,
    path: "/service-area",
  }),
};

const FAQ = [
  {
    q: "How far will you actually drive?",
    a: "About 30 minutes from downtown Greensboro in ordinary traffic. High Point and Winston-Salem are inside that. Burlington, Reidsville, Thomasville, and Randleman are the edges. Asheboro proper and Clemmons are farther, so they are not on the list.",
  },
  {
    q: "Why does each town have its own Medicare page?",
    a: "Medicare Advantage and Part D are sold by county. Guilford, Forsyth, Randolph, Davidson, Alamance, and Rockingham all show up inside this drive. Two kitchens fifteen minutes apart can be shopping from different lists.",
  },
  {
    q: "Do you only sit down in Greensboro, High Point, and Winston-Salem?",
    a: "Those are the three hubs. Kernersville, Summerfield, Jamestown, Oak Ridge, Archdale, and the rest of the towns on this page are first-class in-person meetings.",
  },
] as const;

export default function ServiceAreaPage() {
  const groups = placesByCounty();

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Service area" }]}
        eyebrow={SERVICE_AREA_LABEL}
        title="If I can sit down at your table in about 30 minutes, you’re in the service area."
        lede="High Point and Winston-Salem are in it. They are not the outer edge. Kernersville, Summerfield, Jamestown, Oak Ridge, Archdale, and the rest of the towns on this page are first-class — each with its own Medicare county facts, not a city name swapped into a template."
        secondaryHref="/start"
        secondaryLabel="Ask a question →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What “30 minutes” actually means</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Downtown Greensboro is the center. I drive to the household. Burlington and Reidsville
            are the highway edges — about half an hour on I-40 and US-29 in ordinary traffic.
            Randleman is as far toward Asheboro as I claim in person. Asheboro proper and Clemmons
            are farther than that, so they are not on this list.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage is sold by county. Inside this radius you will find Guilford,
            Forsyth, Randolph, Davidson, Alamance, and Rockingham. Two kitchens fifteen minutes
            apart can be shopping from different lists. That is why each town has its own page.
          </p>
        </div>
      </section>

      {groups.map((group) => (
        <section
          key={group.county}
          className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-12"
        >
          <div className="app-shell mx-auto max-w-4xl">
            <h2 className="text-24 font-semibold">{group.county}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.places.map((place) => (
                <li
                  key={place.slug}
                  className="rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-5 py-4"
                >
                  <p className="text-18 font-semibold">{place.name}</p>
                  <p className="text-16 mt-1 text-[var(--color-ink-muted)]">
                    {place.minutesFromDowntown === 0
                      ? "Where I live"
                      : `About ${place.minutesFromDowntown} minutes`}
                    {place.countyNote ? " · county line to confirm" : ""}
                  </p>
                  <p className="text-16 mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    <Link
                      href={`/medicare-in/${place.slug}`}
                      className="underline underline-offset-2"
                    >
                      Medicare
                    </Link>
                    <Link
                      href={`/life-insurance-in/${place.slug}`}
                      className="underline underline-offset-2"
                    >
                      Life insurance
                    </Link>
                    <Link
                      href={`/retirement-in/${place.slug}`}
                      className="underline underline-offset-2"
                    >
                      Retirement
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            {TRIAD_CITIES.length} places, each with Medicare, life insurance, and retirement pages.
            If your town is not named and you are still about 30 minutes from downtown Greensboro,
            call me. The list is the towns I can document honestly — not a claim that nobody else
            can get a visit.
          </p>
          <dl className="mt-10 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <KitchenTableClose
        heading="Want me to come to your table?"
        body="Greensboro, High Point, Winston-Salem, or a town in between. Free consultation. No obligation, and I’ll tell you if what you have is already fine."
        href="/start"
        label="Start here →"
      />
    </main>
  );
}
