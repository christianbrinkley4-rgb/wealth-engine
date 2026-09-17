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
import {
  getTriadCity,
  lifePlaceBeat,
  relatedPlaces,
  retirementPlaceBeat,
  TRIAD_CITIES,
  type TriadCity,
} from "@/lib/triad";

export type LocalServiceKind = "life" | "retirement";

const COPY: Record<
  LocalServiceKind,
  {
    crumb: string;
    pathPrefix: string;
    parentHref: string;
    parentName: string;
    startHref: string;
    compliance: "medicare" | "general";
    pick: (city: TriadCity) => { intro: string; detail: string; faq: TriadCity["faq"] };
    title: (city: string) => string;
    description: (city: string, county: string) => string;
    headline: (city: string) => string;
    closeHeading: string;
    closeBody: (city: string) => string;
    closeLabel: string;
  }
> = {
  life: {
    crumb: "Life insurance",
    pathPrefix: "/life-insurance-in",
    parentHref: "/life-insurance",
    parentName: "Life insurance",
    startHref: "/start?topic=life_insurance",
    compliance: "general",
    pick: (city) => ({ intro: city.lifeIntro, detail: city.lifeDetail, faq: city.lifeFaq }),
    title: (city) => `Life Insurance Review in ${city}, NC`,
    description: (city) =>
      `Get a personal life insurance review in ${city}. Check employer coverage, beneficiaries, policy dates, and family needs with a local licensed agent.`,
    headline: (city) => `Personal life insurance review in ${city}`,
    closeHeading: "Would you like to review your coverage together?",
    closeBody: (city) =>
      `We can meet at your home in ${city} or talk by phone. Bring your current policy and your questions. The consultation is no cost, with no obligation to buy anything.`,
    closeLabel: "Request a free consultation →",
  },
  retirement: {
    crumb: "Retirement income",
    pathPrefix: "/retirement-in",
    parentHref: "/retirement-income",
    parentName: "Retirement income",
    startHref: "/start?topic=financial_planning",
    compliance: "general",
    pick: (city) => ({
      intro: city.retirementIntro,
      detail: city.retirementDetail,
      faq: city.retirementFaq,
    }),
    title: (city) => `Retirement and Medicare Education in ${city}, NC`,
    description: (city) =>
      `Learn how 401(k) options, Social Security timing, and retirement income may affect Medicare in ${city}. Education, not investment advice.`,
    headline: (city) => `Coordinate retirement income and Medicare in ${city}`,
    closeHeading: "Let’s talk about your retirement questions.",
    closeBody: (city) =>
      `We can meet in ${city} to discuss your Medicare and insurance needs. For financial planning, I work with an advisor so you have the right support.`,
    closeLabel: "Ask a question →",
  },
};

export function localServiceStaticParams() {
  return TRIAD_CITIES.map((city) => ({ city: city.slug }));
}

export function localServiceMetadata(kind: LocalServiceKind, slug: string) {
  const city = getTriadCity(slug);
  if (!city) return {};
  const copy = COPY[kind];
  const title = copy.title(city.name);
  const description = copy.description(city.name, city.county);
  const path = `${copy.pathPrefix}/${city.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({
      title: copy.headline(city.name),
      description,
      path,
    }),
  };
}

export function LocalCityServicePage({ kind, slug }: { kind: LocalServiceKind; slug: string }) {
  const city = getTriadCity(slug);
  if (!city) notFound();

  const copy = COPY[kind];
  const content = copy.pick(city);
  const others = relatedPlaces(city);
  const path = `${copy.pathPrefix}/${city.slug}`;

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: copy.parentName, path: copy.parentHref },
              { name: `${copy.crumb} in ${city.name}`, path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: copy.headline(city.name),
              description: copy.description(city.name, city.county),
              path,
              datePublished: "2026-09-01",
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
              name: `${copy.crumb} in ${city.name}`,
              description: copy.description(city.name, city.county),
              path,
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: copy.parentName, href: copy.parentHref },
          { name: city.name },
        ]}
        eyebrow={`${city.name} · ${city.county}`}
        title={copy.headline(city.name)}
        lede={content.intro}
        secondaryHref={copy.startHref}
        secondaryLabel={
          kind === "life" ? "Review my coverage →" : "Discuss my retirement questions →"
        }
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <CitySnapshot city={city} topic={kind} />
          <h2 className="text-28 mt-10 font-semibold">What we can review together</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {content.detail}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {kind === "life" ? lifePlaceBeat(city) : retirementPlaceBeat(city)}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions you may have</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {content.faq.map((item) => (
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(content.faq)) }}
          />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Also serving</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            In-person service is also available in nearby communities, including{" "}
            {city.nearby.join(", ")}. Phone consultations are available throughout North Carolina.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`${copy.pathPrefix}/${other.slug}`}
                  className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(21,46,52,0.14)] bg-[var(--color-paper)] px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
                >
                  <span className="text-18 font-semibold">
                    {copy.crumb} in {other.name} →
                  </span>
                  <span className="text-16 mt-1 text-[var(--color-ink-muted)]">{other.county}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-17 mt-8">
            <Link href={copy.parentHref} className="underline underline-offset-2">
              Back to {copy.parentName.toLowerCase()}
            </Link>
            {" · "}
            <Link href="/service-area" className="underline underline-offset-2">
              View all communities
            </Link>
            {" · "}
            <Link href={`/medicare-in/${city.slug}`} className="underline underline-offset-2">
              Medicare in {city.name}
            </Link>
            {kind !== "life" ? (
              <>
                {" · "}
                <Link
                  href={`/life-insurance-in/${city.slug}`}
                  className="underline underline-offset-2"
                >
                  Life insurance
                </Link>
              </>
            ) : null}
            {kind !== "retirement" ? (
              <>
                {" · "}
                <Link href={`/retirement-in/${city.slug}`} className="underline underline-offset-2">
                  Retirement
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading={copy.closeHeading}
        body={copy.closeBody(city.name)}
        href={copy.startHref}
        label={copy.closeLabel}
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant={copy.compliance} />
      </div>
    </main>
  );
}
