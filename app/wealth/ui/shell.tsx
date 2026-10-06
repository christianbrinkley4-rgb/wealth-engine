import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { EDUCATION_NOTE, WEALTH_BRAND, WEALTH_FACTS, WEALTH_NAV, type WealthTool } from "@/lib/wealth/site";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export type Crumb = { name: string; path: string };

/** Page title block with breadcrumbs and their markup. */
export function PageHead({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  const trail = [{ name: "Wealth", path: "/wealth" }, ...crumbs];
  return (
    <header className="w-head">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...trail])} />
      <div className="w-shell">
        <nav aria-label="Breadcrumb" className="w-crumbs">
          <ol>
            {trail.map((crumb, index) => (
              <li key={crumb.path}>
                {index === trail.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="w-eyebrow">{eyebrow}</p>
        <h1 className="w-h1">{title}</h1>
        <p className="w-lede">{lede}</p>
        {children}
      </div>
    </header>
  );
}

export function ToolCard({
  tool,
  index = 0,
  done = false,
}: {
  tool: WealthTool;
  index?: number;
  done?: boolean;
}) {
  return (
    <Link
      href={tool.href}
      className="w-tool"
      data-tone={tool.tone}
      data-done={done ? "true" : undefined}
      data-tilt
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
    >
      <span className="w-tool-meta">
        <span>{tool.kind}</span>
        <span>{tool.time}</span>
      </span>
      <strong>{tool.title}</strong>
      <span className="w-tool-blurb">{tool.blurb}</span>
      <span className="w-tool-go" aria-hidden>
        <ArrowUpRight size={22} />
      </span>
    </Link>
  );
}

/** Visible FAQ plus matching FAQPage markup. */
export function Faq({ items, title = "Quick answers" }: { items: ReadonlyArray<{ q: string; a: string }>; title?: string }) {
  return (
    <section className="w-section" aria-labelledby="w-faq-title">
      <JsonLd data={faqJsonLd(items)} />
      <div className="w-shell w-narrow">
        <p className="w-eyebrow">FAQ</p>
        <h2 className="w-h2" id="w-faq-title">
          {title}
        </h2>
        <div className="w-faq">
          {items.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden>+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationNote() {
  return (
    <aside className="w-note" aria-label="Education, not advice">
      <strong>Education, not advice.</strong> {EDUCATION_NOTE}
    </aside>
  );
}

/** "Keep going" strip at the bottom of every tool and article. */
export function NextUp({
  title = "Keep going",
  links,
}: {
  title?: string;
  links: ReadonlyArray<{ href: string; label: string; kind: string }>;
}) {
  return (
    <section className="w-section w-next" aria-label={title}>
      <div className="w-shell">
        <p className="w-eyebrow">{title}</p>
        <ul className="w-next-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span>{link.kind}</span>
                <strong>{link.label}</strong>
                <ArrowUpRight size={20} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WealthFooter() {
  return (
    <footer className="w-footer" data-spot>
      <div className="w-shell">
        <div className="w-footer-top">
          <p className="w-footer-brand">{WEALTH_BRAND}</p>
          <p>
            Built in {WEALTH_FACTS.city} by Christian Brinkley. Questions? Call or text{" "}
            <a href={WEALTH_FACTS.phoneHref}>{WEALTH_FACTS.phone}</a>.
          </p>
        </div>
        <nav aria-label="Wealth hub" className="w-footer-nav">
          <Link href="/wealth">Wealth home</Link>
          {WEALTH_NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/links">All links</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <p className="w-footer-note">{EDUCATION_NOTE}</p>
        <p className="w-footer-note">
          Looking for Medicare or retirement help for a parent or grandparent? That&apos;s the other half of
          this site: <Link href="/">christianbrinkleync.com</Link>.
        </p>
      </div>
    </footer>
  );
}
