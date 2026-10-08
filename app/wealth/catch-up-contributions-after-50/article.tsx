import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd } from "@/lib/wealth/seo";

/**
 * Shared renderer for the wealth wave-1B article pages. Every page carries the
 * same structure: head, short answer, prose, resource panel, sources, education
 * note, FAQ, next-up links, soft CTA, and contact line.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  ordered?: boolean;
  table?: { caption: string; headers: string[]; rows: string[][] };
  linkRow?: { intro: string; links: { href: string; label: string }[] };
};

export type ArticleData = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  readMinutes: number;
  answer: string;
  sections: ArticleSection[];
  panel: { eyebrow: string; title: string; blurb: string; href: string; cta: string };
  sources: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
  nextLinks: { href: string; label: string; kind: string }[];
};

export function WealthArticlePage({ article }: { article: ArticleData }) {
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: article.title,
          description: article.description,
          path: article.path,
          datePublished: "2026-10-08",
          dateModified: "2026-10-08",
        })}
      />
      <PageHead
        eyebrow={article.eyebrow}
        title={article.title}
        lede={article.description}
        crumbs={[
          { name: "Learn", path: "/wealth/learn" },
          { name: article.title, path: article.path },
        ]}
      >
        <ul className="w-meta">
          <li>{`${article.readMinutes} min read`}</li>
          <li>{"Updated October 8, 2026"}</li>
          <li>{"By Christian Brinkley"}</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>{"Short answer"}</span>
            {article.answer}
          </p>
          <div className="w-prose">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.list ? (
                  section.ordered ? (
                    <ol>
                      {section.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {section.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )
                ) : null}
                {section.table ? (
                  <div style={{ overflowX: "auto", marginTop: 20 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, lineHeight: 1.5 }}>
                      <caption style={{ textAlign: "left", fontWeight: 700, marginBottom: 10 }}>
                        {section.table.caption}
                      </caption>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th
                              key={header}
                              style={{ textAlign: "left", padding: "10px 8px", borderBottom: "2px solid currentColor" }}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} style={{ padding: "10px 8px", borderBottom: "1px solid currentColor" }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {section.linkRow ? (
                  <p>
                    {section.linkRow.intro}{" "}
                    {section.linkRow.links.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? " and " : ""}
                        <Link href={link.href}>{link.label}</Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep going">
            <p className="w-eyebrow">{article.panel.eyebrow}</p>
            <h2 className="w-h3">{article.panel.title}</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>{article.panel.blurb}</p>
            <div className="w-btn-row">
              <Link href={article.panel.href} className="w-btn">
                {article.panel.cta} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>{"Sources"}</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} rel="noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EducationNote />
        </div>
      </article>

      <Faq items={article.faqs} title="Quick answers" />
      <NextUp title="Read next" links={article.nextLinks} />

      <section className="w-section">
        <div className="w-shell w-narrow">
          <aside className="w-panel" aria-label="Talk to Christian">
            <p className="w-eyebrow">{"Talk it through"}</p>
            <h2 className="w-h3">{"Questions? Bring them to Christian."}</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              {"Free consultation, no obligation. Meet at home, in a public spot, or by phone."}
            </p>
            <div className="w-btn-row">
              <Link href="/start" className="w-btn">
                {"Start here"} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>
          <p style={{ marginTop: 24, color: "var(--w-on-ink-muted)" }}>
            {"Christian Brinkley, Greensboro, NC. Call or text (919) 408-6671."}
          </p>
        </div>
      </section>
    </main>
  );
}
