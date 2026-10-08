import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatArticleDate } from "@/app/components/ArticleBody";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { GLOSSARY, GLOSSARY_UPDATED, glossaryTerms } from "@/lib/glossary";
import { breadcrumbJsonLd, pageOpenGraph, SITE_URL } from "@/lib/seo";

const PATH = "/medicare-words";
const title = "Medicare Words in Plain English: Parts A, B, C, D and More";
const description =
  "Part A, Part B, Medigap, IRMAA, ANOC: what the Medicare words mean, in a sentence or two each, with the official source. From a Greensboro agent.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({ title: "Medicare words, in plain English", description, path: PATH }),
};

function definedTermSetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}${PATH}#terms`,
    name: "Medicare words, in plain English",
    description,
    url: `${SITE_URL}${PATH}`,
    inLanguage: "en-US",
    dateModified: GLOSSARY_UPDATED,
    author: { "@id": `${SITE_URL}/#christian` },
    hasDefinedTerm: glossaryTerms().map((entry) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}${PATH}#${entry.id}`,
      name: entry.term,
      ...(entry.aka ? { alternateName: entry.aka.split(", ") } : {}),
      description: entry.definition,
      url: `${SITE_URL}${PATH}#${entry.id}`,
      inDefinedTermSet: `${SITE_URL}${PATH}#terms`,
    })),
  };
}

export default function MedicareWordsPage() {
  const count = glossaryTerms().length;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare guides", path: "/learn" },
              { name: "Medicare words", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd()) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare guides", href: "/learn" },
          { name: "Medicare words" },
        ]}
        eyebrow="Medicare, translated"
        title="Medicare words, in plain English"
        lede={`${count} words you’ll run into in the mail, on the phone, and at the doctor’s office. A sentence or two each, with the official page next to it so you can check me.`}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Ask me what a word means"
      />

      <div className="gl">
        <div className="shell">
          <p className="gl-meta">
            By <Link href="/about">{AGENT.name}</Link>, licensed agent, {AGENT.licenseLine}. Checked
            against the sources on {formatArticleDate(GLOSSARY_UPDATED)}.
          </p>
          <nav aria-label="Sections" className="gl-jump">
            <ul>
              {GLOSSARY.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`}>{group.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {GLOSSARY.map((group) => (
            <section key={group.id} id={group.id} className="gl-group" aria-labelledby={`${group.id}-h`}>
              <div className="gl-group-head">
                <h2 id={`${group.id}-h`}>{group.label}</h2>
                <p>{group.blurb}</p>
              </div>
              <dl className="gl-list">
                {group.terms.map((entry) => (
                  <div key={entry.id} id={entry.id} className="gl-term">
                    <dt>
                      {entry.term}
                      {entry.aka ? <span className="gl-aka">Also called {entry.aka}</span> : null}
                    </dt>
                    <dd>
                      <p>{entry.definition}</p>
                      <p className="gl-links">
                        <a href={entry.source.href} rel="noopener">
                          Source: {entry.source.label}
                        </a>
                        {entry.more ? (
                          <Link href={entry.more.href} className="gl-more">
                            {entry.more.label} <ArrowRight size={15} aria-hidden />
                          </Link>
                        ) : null}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>

      <KitchenTableClose
        heading="Still sounds like alphabet soup?"
        body="That’s normal. Call me with the letter or the word that’s tripping you up, and I’ll explain it for your situation. No cost, no obligation."
        href="/start?topic=medicare&quick=1"
        label="Ask me your question"
      />

      <div className="shell pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
