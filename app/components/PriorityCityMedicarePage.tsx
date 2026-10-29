import type { Metadata } from "next";
import Link from "next/link";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import { MedicareByline } from "@/app/components/MedicareByline";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ServiceHero } from "@/app/components/ServiceHero";
import { PRIORITY_MEDICARE_CITIES, type PriorityMedicareCity } from "@/lib/priorityMedicareCities";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const CONE = { label: "Cone Health", href: "/guides/cone-health-medicare-doctors" };
const ATRIUM = {
  label: "Atrium Health Wake Forest Baptist",
  href: "/guides/atrium-wake-forest-baptist-medicare-doctors",
};
const NOVANT = { label: "Novant Health", href: "/guides/novant-health-medicare-doctors" };

/** The health-system guides that matter for each town's doctors. */
const HOSPITAL_GUIDES: Partial<Record<PriorityMedicareCity, Array<{ label: string; href: string }>>> = {
  "high-point": [ATRIUM, CONE],
  "winston-salem": [ATRIUM, NOVANT],
  kernersville: [NOVANT, CONE, ATRIUM],
  burlington: [CONE],
};

export function priorityCityMetadata(slug: PriorityMedicareCity): Metadata {
  const city = PRIORITY_MEDICARE_CITIES[slug];
  const path = `/medicare-agent-${slug}-nc`;
  return {
    title: { absolute: city.title },
    description: city.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({ title: city.title, description: city.description, path }),
    twitter: pageTwitter({ title: city.title, description: city.description }),
  };
}

export function PriorityCityMedicarePage({ slug }: { slug: PriorityMedicareCity }) {
  const city = PRIORITY_MEDICARE_CITIES[slug];
  const path = `/medicare-agent-${slug}-nc`;
  return (
    <main className="text-[var(--color-navy)]">
      {[
        articleJsonLd({
          headline: city.heading,
          description: city.description,
          path,
          datePublished: "2026-10-10",
          dateModified: "2026-10-13",
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "NC service area", path: "/medicare-nc-towns" },
          { name: city.name, path },
        ]),
        faqJsonLd(city.faq),
      ].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <LocationBusinessMarkup path={path} />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: city.name }]}
        eyebrow={city.county}
        title={city.heading}
        lede={`Free Medicare help in ${city.name} from Christian Brinkley, a licensed NC insurance agent. I can review your county, doctors, prescriptions, and enrollment dates by phone or at an agreed meeting. No obligation to enroll.`}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free conversation"
      />
      <MedicareByline reviewed="2026-10-13" />
      <section className="measure-prose app-shell max-w-3xl py-10">
        <h2 className="text-28 font-semibold">{city.localHeading}</h2>
        {city.paragraphs.map((p) => (
          <p key={p} className="text-17 mt-4 leading-relaxed">
            {p}
          </p>
        ))}
        <p className="text-16 mt-6">
          Local sources checked October 12, 2026:{" "}
          {city.sources.map((s, i) => (
            <span key={s.href}>
              {i ? "; " : ""}
              <a className="underline" href={s.href}>
                {s.label}
              </a>
            </span>
          ))}
          .
        </p>
        <p className="text-17 mt-4">
          Provider location reference:{" "}
          <a
            className="underline"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.provider)}`}
          >
            {city.provider}
          </a>
          .
        </p>
      </section>
      <section className="measure-prose app-shell max-w-3xl py-10">
        <h2 className="text-28 font-semibold">{city.hospitalsHeading}</h2>
        {city.hospitals.map((h) => (
          <div key={h.name} className="mt-6">
            <h3 className="text-20 font-semibold">
              {"url" in h && h.url ? (
                <a className="underline" href={h.url}>
                  {h.name}
                </a>
              ) : (
                h.name
              )}
            </h3>
            <p className="text-17 mt-2">{h.note}</p>
          </div>
        ))}
        <p className="text-17 mt-6">{city.hospitalTakeaway}</p>
        {HOSPITAL_GUIDES[slug] && (
          <p className="text-17 mt-4">
            How to check your doctors for 2027:{" "}
            {HOSPITAL_GUIDES[slug]!.map((g, i, all) => (
              <span key={g.href}>
                <Link className="underline" href={g.href}>
                  {g.label}
                </Link>
                {i < all.length - 1 ? (i === all.length - 2 ? " and " : ", ") : "."}
              </span>
            ))}
          </p>
        )}
        <p className="text-14 mt-4">{city.hospitalNote}</p>
      </section>
      <section className="measure-prose app-shell max-w-3xl py-10">
        <h2 className="text-28 font-semibold">Questions about Medicare in {city.name}</h2>
        {city.faq.map((item) => (
          <div key={item.q} className="mt-6">
            <h3 className="text-20 font-semibold">{item.q}</h3>
            <p className="text-17 mt-2">{item.a}</p>
          </div>
        ))}
      </section>
      <nav className="app-shell max-w-3xl py-8" aria-label="Medicare tools">
        <h2 className="text-24 font-semibold">Tools to prepare for your conversation</h2>
        <ul className="text-17 mt-4 space-y-3">
          <li>
            <Link className="underline" href="/aep">
              Review your coverage during Annual Enrollment
            </Link>
          </li>
          <li>
            <Link className="underline" href="/aep-quiz">
              Check whether you need to act during Annual Enrollment
            </Link>
          </li>
          <li>
            <Link className="underline" href="/part-b-penalty">
              Estimate a Part B late enrollment penalty
            </Link>
          </li>
          <li>
            <Link className="underline" href="/turning-65#enrollment-dates">
              Find your Medicare enrollment dates
            </Link>
          </li>
          {/* These two pages had no links from anywhere on the site, so Google
              only knew them from the sitemap (Search Console, Oct 29, 2026). */}
          {slug === "high-point" ? (
            <li>
              <Link className="underline" href="/medigap-plans-high-point-nc">
                How Medigap plans work in High Point
              </Link>
            </li>
          ) : null}
          <li>
            <Link className="underline" href="/questions-to-ask-medicare-agent">
              Questions to ask a Medicare agent before you meet
            </Link>
          </li>
        </ul>
      </nav>
      <RelatedMedicareGuides />
      <KitchenTableClose
        heading={city.ctaHeading}
        body={city.ctaLine}
        href="/start?topic=medicare&quick=1"
        label="Request a free Medicare conversation"
      />
      <div className="app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
