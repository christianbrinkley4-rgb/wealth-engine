import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ConsultationActions } from "@/app/components/ConsultationActions";

import { INSURANCE_SERVICES } from "@/lib/insuranceServices";
import {
  breadcrumbJsonLd,
  localBusinessJsonLd,
  pageOpenGraph,
  pageTwitter,
  SITE_URL,
} from "@/lib/seo";

const title = "Insurance Services in Greensboro, NC | Christian Brinkley";
const description =
  "Medicare, life insurance, care coverage and annuity help in Greensboro, NC. Compare the services Christian Brinkley offers and what to bring to a consultation.";
const path = "/insurance-services";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

export default function InsuranceServicesPage() {
  const directory = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#service` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INSURANCE_SERVICES.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.name,
        url: `${SITE_URL}${service.href}`,
      })),
    },
  };
  return (
    <main>
      {[
        localBusinessJsonLd(),
        directory,
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insurance services", path },
        ]),
      ].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Insurance services" }]}
        eyebrow="Greensboro, North Carolina"
        title="Insurance Help in Greensboro, NC"
        lede="I'm Christian Brinkley, a licensed NC Life & Health insurance agent in Greensboro. Start with your question, then see what I can review with you."
        secondaryHref="#services"
        secondaryLabel="Explore my services"
      />
      <section
        className="app-shell measure-prose max-w-3xl py-10"
        aria-labelledby="nc-help-heading"
      >
        <h2 id="nc-help-heading" className="text-28 font-semibold">
          Insurance and retirement questions across the Triad and Triangle
        </h2>
        <p className="text-17 mt-4">
          I'm based in Greensboro and grew up in Creedmoor. I serve the Triad, Triangle, and
          Granville County by phone. In-person meetings are arranged individually. I don't have
          offices in each town.
        </p>
        <p className="text-17 mt-4">
          My work covers insurance, annuities, and financial education. I don't provide investment
          management or personalized investment or tax advice.
        </p>
        <ul className="text-17 mt-5 space-y-3">
          <li>
            <Link className="underline" href="/medicare-nc-towns">
              Find Medicare help for your town
            </Link>
          </li>
          <li>
            <Link className="underline" href="/life-insurance">
              Life insurance questions and coverage choices
            </Link>
          </li>
          <li>
            <Link className="underline" href="/annuities">
              Understand annuity costs and tradeoffs
            </Link>
          </li>
          <li>
            <Link className="underline" href="/financial-planning-nc">
              Financial planning questions in North Carolina
            </Link>
          </li>
        </ul>
        <p className="mt-5">
          <a className="underline" href="tel:+19194086671">
            (919) 408-6671
          </a>
        </p>
      </section>

      <section className="section" id="services" aria-labelledby="services-heading">
        <div className="shell">
          <h2 id="services-heading">What can I help you with?</h2>
          <p className="measure-prose">
            Consultations have no cost or obligation. Insurance coverage has its own costs,
            eligibility rules and limits. I represent a limited number of companies.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {INSURANCE_SERVICES.map((service) => (
              <article key={service.href} className="card min-w-0 p-6">
                <h3 className="text-2xl font-semibold">{service.name}</h3>
                <p className="mt-3 font-semibold">{service.question}</p>
                <p className="mt-3">{service.description}</p>
                <p className="mt-3">{service.prepare}</p>
                <Link
                  className="btn btn-outline mt-5"
                  style={{ whiteSpace: "normal", maxWidth: "100%" }}
                  href={service.href}
                >
                  Explore {service.name.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell measure-prose">
          <h2>Start with a question.</h2>
          <p>
            I&apos;m based in Greensboro. Check my{" "}
            <Link className="underline" href="/service-area">
              service area
            </Link>{" "}
            for nearby communities and meeting options.
          </p>
          <p className="mt-3">
            I&apos;m licensed for insurance, not securities. I&apos;m not a CPA or a registered
            investment adviser. Personal tax and investment advice needs the right professional.
          </p>
          <p className="mt-3">
            Use the request form to tell me what you want to discuss. It does not reserve an
            appointment.
          </p>
          <ConsultationActions href="/start" label="Ask me a question" location="page_close" />
        </div>
      </section>
      <div className="shell">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
