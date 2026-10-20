import type { Metadata } from "next";
import Link from "next/link";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import { MedicareByline } from "@/app/components/MedicareByline";
import { MedicareFactBlock } from "@/app/components/MedicareFactBlock";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ShiipAndAgent } from "@/app/components/ShiipAndAgent";
import { MedicareGuideTools } from "@/components/MedicareGuideTools";
import {
  GREENSBORO_MEDICARE_FAQ,
  GREENSBORO_MEDICARE_SECTIONS,
} from "@/lib/greensboroMedicareGuide";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  pageTwitter,
  serviceJsonLd,
} from "@/lib/seo";

const path = "/medicare-agent-greensboro-nc";
const title = "Medicare Agent in Greensboro, NC | Free Local Medicare Help";
const description =
  "Christian Brinkley, a licensed Medicare agent in Greensboro, NC (NPN 22217190). Free help comparing Guilford County plans, doctors, and prescriptions.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

export default function MedicareAgentGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      {[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "NC service area", path: "/medicare-nc-towns" },
          { name: "Medicare agent in Greensboro", path },
        ]),
        articleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-12",
          dateModified: "2026-10-20",
        }),
        serviceJsonLd({ name: "Free Medicare consultation in Greensboro", description, path }),
        faqJsonLd(GREENSBORO_MEDICARE_FAQ),
      ].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <LocationBusinessMarkup path={path} />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare agent in Greensboro" }]}
        eyebrow="Greensboro and Guilford County"
        title="Medicare agent in Greensboro, NC"
        lede="Get free Medicare help in Greensboro, NC from Christian Brinkley, a licensed local insurance agent. I can review your doctors, prescriptions, enrollment dates, and the plans I represent. Meet at home or talk by phone. There's no obligation to enroll."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free Medicare conversation"
      />
      <MedicareByline reviewed="2026-10-20" />
      <nav className="app-shell max-w-3xl py-6" aria-label="In this Greensboro guide">
        <ul className="space-y-2">
          {GREENSBORO_MEDICARE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a className="underline" href={`#${s.id}`}>
                {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {GREENSBORO_MEDICARE_SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="measure-prose app-shell max-w-3xl py-8">
          <h2 className="text-28 font-semibold">{s.heading}</h2>
          <p className="text-18 mt-4">{s.answer}</p>
          {"table" in s ? (
            <div className="art-table-wrap mt-4">
              <ResponsiveTable className="art-table">
                <caption className="text-16">{s.table.caption}</caption>
                <thead>
                  <tr>
                    {s.table.headers.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </ResponsiveTable>
            </div>
          ) : null}
          {s.paragraphs.map((p) => (
            <p key={p} className="text-17 mt-4 leading-relaxed">
              {p}
            </p>
          ))}
          {"sources" in s ? (
            <p className="text-16 mt-4">
              Sources:{" "}
              {s.sources.map((source, i) => (
                <span key={source.href}>
                  {i ? "; " : ""}
                  <a className="underline" href={source.href}>
                    {source.label}
                  </a>
                </span>
              ))}
              .
            </p>
          ) : null}
          {"related" in s ? (
            <p className="text-17 mt-4">
              <Link className="underline" href={s.related.href}>
                {s.related.label}
              </Link>
              .
            </p>
          ) : null}
        </section>
      ))}
      <MedicareFactBlock heading="Medicare facts for 2026, with sources" />
      <ShiipAndAgent />
      <MedicareGuideTools currentYear={new Date().getFullYear()} />
      <section
        className="measure-prose app-shell max-w-3xl py-10"
        aria-labelledby="greensboro-questions"
      >
        <h2 id="greensboro-questions" className="text-28 font-semibold">
          Questions about Medicare in Greensboro
        </h2>
        {GREENSBORO_MEDICARE_FAQ.map((item) => (
          <div key={item.q} className="mt-6">
            <h3 className="text-20 font-semibold">{item.q}</h3>
            <p className="text-17 mt-2">{item.a}</p>
          </div>
        ))}
        <p className="text-16 mt-6">
          Enrollment assistance source:{" "}
          <a
            className="underline"
            href="https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-prescription-drug-plan-part-d"
          >
            NC DOI: Part D enrollment assistance through SHIIP
          </a>
          .
        </p>
      </section>
      <section className="app-shell max-w-3xl py-8">
        <h2 className="text-24 font-semibold">Serving Greensboro and nearby communities</h2>
        <p className="text-17 mt-4">
          My home base is Greensboro, NC. I also offer Medicare consultations in{" "}
          <Link className="underline" href="/medicare-agent-high-point-nc">
            High Point
          </Link>
          ,{" "}
          <Link className="underline" href="/medicare-agent-winston-salem-nc">
            Winston-Salem
          </Link>
          ,{" "}
          <Link className="underline" href="/medicare-agent-burlington-nc">
            Burlington
          </Link>
          , and{" "}
          <Link className="underline" href="/medicare-agent-kernersville-nc">
            Kernersville
          </Link>
          . Read the{" "}
          <Link className="underline" href="/medicare-nc-towns">
            county service-area guide
          </Link>{" "}
          for nearby towns.
        </p>
      </section>
      <RelatedMedicareGuides />
      <KitchenTableClose
        heading="Bring your Medicare questions"
        body="I’ll go through your doctors, prescriptions, and coverage options with you. Free, with no obligation to enroll."
        href="/start?topic=medicare&quick=1"
        label="Request a free conversation"
      />
      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
