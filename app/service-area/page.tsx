import type { Metadata } from "next";
import Link from "next/link";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { placesByCounty, SERVICE_AREA_LABEL, SERVICE_AREA_LEDE } from "@/lib/triad";

export const metadata: Metadata = {
  title: { absolute: "Local, Personalized Help Near Greensboro, NC" },
  description:
    "Meet Christian Brinkley for a no-cost consultation about Medicare, insurance, and retirement questions. Serving Greensboro, High Point, Winston-Salem, and nearby communities.",
  alternates: { canonical: "/service-area" },
  openGraph: pageOpenGraph({
    title: "Personal help close to home in the Triad",
    description: SERVICE_AREA_LEDE,
    path: "/service-area",
  }),
};

const FAQ = [
  {
    q: "Which communities do you serve?",
    a: "I meet with people in Greensboro, High Point, Winston-Salem, and the surrounding communities listed below. If you don’t see your town, get in touch and we can discuss a convenient way to meet.",
  },
  {
    q: "Does where I live affect my Medicare choices?",
    a: "Yes. Medicare Advantage plan availability can vary by county. We’ll check the options for your home address, along with your doctors, prescriptions, and coverage needs.",
  },
  {
    q: "Can we meet at my home?",
    a: "Yes. We can arrange a home visit, meet at a convenient public location, or talk by phone. You’re welcome to include your spouse or another family member. The consultation is no cost, with no obligation to buy anything.",
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
        title="Personal help close to home."
        lede="Whether you’re getting ready to retire or already enjoying retirement, I’m here to help you understand your Medicare and insurance options. I serve Greensboro, High Point, Winston-Salem, and nearby communities, including Kernersville, Summerfield, Jamestown, Oak Ridge, and Archdale."
        secondaryHref="/start"
        secondaryLabel="Request a free consultation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Let’s meet where you’re comfortable</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I serve individuals and families throughout the Piedmont Triad, including Greensboro,
            High Point, Winston-Salem, and the communities around them. I’m based in Greensboro and
            offer home visits in the surrounding area. We can also meet at a convenient public
            location, or talk by phone or video. Get in touch to ask about appointment options and
            whether a home visit works for where you live. There’s no need to have everything
            figured out before we talk. Bring your questions, and we’ll take them one at a time.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The communities below are grouped by county because your location can affect your
            Medicare Advantage options. Your doctors, prescriptions, and budget matter too. We’ll
            look at those together before you decide on your next step.
          </p>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-10">
        <div className="app-shell mx-auto max-w-4xl">
          <h2 className="text-22 font-semibold">Jump to a community</h2>
          <nav aria-label="Communities I serve" className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {groups.flatMap((group) =>
                group.places.map((place) => (
                  <li key={place.slug}>
                    <a
                      href={`#town-${place.slug}`}
                      className="text-16 inline-flex min-h-11 items-center rounded-lg border border-[rgba(15,34,65,0.14)] bg-[var(--color-paper)] px-3 py-2"
                    >
                      {place.name}
                    </a>
                  </li>
                )),
              )}
            </ul>
          </nav>
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
                  id={`town-${place.slug}`}
                  key={place.slug}
                  className="scroll-mt-24 rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-5 py-4"
                >
                  <p className="text-18 font-semibold">{place.name}</p>
                  <p className="text-16 mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/medicare-in/${place.slug}`}
                      className="inline-flex min-h-11 items-center rounded-lg px-2 underline underline-offset-2"
                    >
                      Medicare
                    </Link>
                    <Link
                      href={`/life-insurance-in/${place.slug}`}
                      className="inline-flex min-h-11 items-center rounded-lg px-2 underline underline-offset-2"
                    >
                      Life insurance
                    </Link>
                    <Link
                      href={`/retirement-in/${place.slug}`}
                      className="inline-flex min-h-11 items-center rounded-lg px-2 underline underline-offset-2"
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
            Don’t see your town? Get in touch and we can confirm whether a home visit fits your
            location and availability, or arrange a phone conversation. Phone consultations are
            available throughout North Carolina.
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
        heading="Let’s talk about what matters to you."
        body="We can review your coverage, answer your questions, and discuss the next steps for you and your family. Your consultation is no cost, with no obligation to buy anything."
        href="/start"
        label="Request a free consultation →"
      />
    </main>
  );
}
