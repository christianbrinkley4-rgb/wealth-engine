import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Crawl hub for every town-specific Medicare page: the /medicare-[town]-nc
 * pages, /medicare-creedmoor-nc, and the /medicare-in/[city] pages. Grouped
 * by county so it reads like a service area, not a link farm. No orphan
 * pages: every town page links back here.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help Across North Carolina Towns | Christian Brinkley",
  },
  description:
    "Free local Medicare help across the Piedmont Triad and beyond: Greensboro, High Point, Burlington, Asheboro, Oxford, Roxboro, and more. Find your town from Christian Brinkley, licensed NC agent.",
  alternates: { canonical: "/medicare-nc-towns" },
  openGraph: pageOpenGraph({
    title: "Medicare help in your town",
    description:
      "Free local Medicare reviews across Guilford, Alamance, Randolph, Rockingham, Granville, Person, and nearby counties.",
    path: "/medicare-nc-towns",
  }),
};

interface TownLink {
  name: string;
  href: string;
  blurb: string;
}

interface CountyGroup {
  county: string;
  towns: TownLink[];
}

const COUNTIES: CountyGroup[] = [
  {
    county: "Alamance County",
    towns: [
      {
        name: "Burlington",
        href: "/medicare-in/burlington",
        blurb: "The county hub. How plan networks treat a town your doctors may span.",
      },
      {
        name: "Elon",
        href: "/medicare-in/elon",
        blurb: "College town dynamics and what they mean for local plan availability.",
      },
      {
        name: "Graham",
        href: "/medicare-graham-nc",
        blurb: "The county seat. Historic downtown, mill-town roots, and Medicare basics.",
      },
      {
        name: "Mebane",
        href: "/medicare-mebane-nc",
        blurb: "The commuter town between the Triad and the Triangle, and why that matters for networks.",
      },
    ],
  },
  {
    county: "Granville County",
    towns: [
      {
        name: "Butner",
        href: "/medicare-butner-nc",
        blurb: "Just down the road from Creedmoor. Same neighborly service, in person or by phone.",
      },
      {
        name: "Creedmoor",
        href: "/medicare-creedmoor-nc",
        blurb: "My hometown. Medicare help from someone who grew up here.",
      },
      {
        name: "Oxford",
        href: "/medicare-oxford-nc",
        blurb: "The county seat. Durham-direction specialists and SHIIP counseling at Senior Services.",
      },
    ],
  },
  {
    county: "Guilford County",
    towns: [
      { name: "Browns Summit", href: "/medicare-in/browns-summit", blurb: "Medicare help in Browns Summit." },
      { name: "Colfax", href: "/medicare-in/colfax", blurb: "Medicare help in Colfax." },
      { name: "Gibsonville", href: "/medicare-in/gibsonville", blurb: "Medicare help in Gibsonville." },
      { name: "Greensboro", href: "/medicare-in/greensboro", blurb: "My base. The full Triad network picture." },
      { name: "High Point", href: "/medicare-in/high-point", blurb: "Why High Point buys Guilford plans but sees Winston-Salem doctors." },
      { name: "Jamestown", href: "/medicare-in/jamestown", blurb: "Medicare help in Jamestown." },
      { name: "McLeansville", href: "/medicare-in/mcleansville", blurb: "Medicare help in McLeansville." },
      { name: "Oak Ridge", href: "/medicare-in/oak-ridge", blurb: "Medicare help in Oak Ridge." },
      { name: "Pleasant Garden", href: "/medicare-in/pleasant-garden", blurb: "Medicare help in Pleasant Garden." },
      { name: "Stokesdale", href: "/medicare-in/stokesdale", blurb: "Medicare help in Stokesdale." },
      { name: "Summerfield", href: "/medicare-in/summerfield", blurb: "Medicare help in Summerfield." },
      { name: "Whitsett", href: "/medicare-in/whitsett", blurb: "Medicare help in Whitsett." },
    ],
  },
  {
    county: "Person County",
    towns: [
      {
        name: "Roxboro",
        href: "/medicare-roxboro-nc",
        blurb: "The county seat. Rural-county Medicare notes and local resources.",
      },
    ],
  },
  {
    county: "Randolph County",
    towns: [
      {
        name: "Archdale",
        href: "/medicare-in/archdale",
        blurb: "Between Asheboro and High Point, and what that means for your network.",
      },
      {
        name: "Asheboro",
        href: "/medicare-asheboro-nc",
        blurb: "The county seat and medical hub. Zoo town, and where most Randolph County care happens.",
      },
      {
        name: "Liberty",
        href: "/medicare-liberty-nc",
        blurb: "Small-town Randolph County. Same free review, by phone or in person.",
      },
      {
        name: "Ramseur",
        href: "/medicare-ramseur-nc",
        blurb: "Mill-town roots near Asheboro. Local resources and Medicare basics.",
      },
      {
        name: "Randleman",
        href: "/medicare-in/randleman",
        blurb: "Medicare help in Randleman.",
      },
    ],
  },
  {
    county: "Rockingham County",
    towns: [
      {
        name: "Eden",
        href: "/medicare-eden-nc",
        blurb: "Former mill town on the northern corridor. Smith River country.",
      },
      {
        name: "Madison",
        href: "/medicare-madison-nc",
        blurb: "Small Rockingham town near the Dan River. Local help, plain English.",
      },
      {
        name: "Reidsville",
        href: "/medicare-in/reidsville",
        blurb: "Rockingham's largest town, and why its plan market stands apart.",
      },
    ],
  },
  {
    county: "Forsyth & Davidson Counties",
    towns: [
      { name: "Kernersville", href: "/medicare-in/kernersville", blurb: "Medicare help in Kernersville." },
      { name: "Thomasville", href: "/medicare-in/thomasville", blurb: "Medicare help in Thomasville." },
      { name: "Winston-Salem", href: "/medicare-in/winston-salem", blurb: "A different county list, twenty-five minutes away." },
    ],
  },
];

export default function MedicareTownsHubPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Towns we serve", path: "/medicare-nc-towns" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/service-area" },
          { name: "Towns we serve" },
        ]}
        eyebrow="Service area · free Medicare reviews"
        title="Medicare help in your town."
        lede="I'm Christian Brinkley, a licensed insurance agent based in Greensboro and raised in Creedmoor. I help folks across the Piedmont Triad and the surrounding counties understand their Medicare options. Pick your town below for local notes, or start with the 90-second plan check."
        secondaryHref="/plan-check"
        secondaryLabel="Take the 90-second plan check →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage availability is decided county by county, so where you live shapes
            your options. Each page below has genuinely local notes: the library and senior center
            that serve the town, the commute patterns that affect plan networks, and what locals
            tend to run into. No call centers, just me.{" "}
            <Link href="/service-area" className="underline underline-offset-2">
              See the full service area
            </Link>
            .
          </p>

          <div className="mt-10 space-y-10">
            {COUNTIES.map((group) => (
              <div key={group.county}>
                <h2 className="text-22 font-semibold">{group.county}</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {group.towns.map((town) => (
                    <li
                      key={town.href}
                      className="rounded-xl border border-gray-200 bg-[var(--color-paper)] p-5"
                    >
                      <Link
                        href={town.href}
                        className="text-18 font-semibold underline-offset-2 hover:underline"
                      >
                        {town.name}
                      </Link>
                      <p className="text-16 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                        {town.blurb}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-17 mt-10 leading-relaxed text-[var(--color-ink-muted)]">
            Do not see your town? I serve the wider Triad and take calls from anywhere in North
            Carolina.{" "}
            <Link href="/plan-check" className="underline underline-offset-2">
              Take the plan check
            </Link>{" "}
            or call me at{" "}
            <a href="tel:+19194086671" className="underline underline-offset-2">
              (919) 408-6671
            </a>
            .
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="Start with your town, or start with the quiz"
        body="Every town page ends at the same free review. Twenty minutes, plain English, no obligation."
        href="/plan-check"
        label="Take the 90-second plan check →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
