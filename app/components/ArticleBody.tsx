import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { GuideCapture } from "@/app/components/GuideCapture";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import { articleText, type Article } from "@/lib/articles";
import { featuredPlaces } from "@/lib/triad";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Turns "[text](url)" into a link. Internal paths use next/link. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} rel="noopener">
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

export type ArticleNextStep = {
  heading: string;
  body: string;
  label: string;
};

const DEFAULT_NEXT_STEP: ArticleNextStep = {
  heading: "Want to talk it through?",
  body: "Bring this question and anything else on your mind. It's free, there's no obligation, and you'll be talking with me, not a call center.",
  label: "Ask me your question",
};

/**
 * The reading layout for every article: a sticky outline on wide screens, a
 * progress line under the header, numbered sections, and one honest next
 * step at the end.
 */
export function ArticleBody({
  article,
  nextStep = DEFAULT_NEXT_STEP,
  children,
}: {
  article: Article;
  nextStep?: ArticleNextStep;
  /** Rendered at the end of the article column: the page's required disclosures. */
  children?: ReactNode;
}) {
  const minutes = Math.max(2, Math.round(articleText(article).split(/\s+/).length / 220));
  const towns = featuredPlaces()
    .map((place) => place.name)
    .join(", ");
  const outline = article.sections.map((section) => ({
    id: slugify(section.h2),
    title: section.h2,
  }));

  return (
    <div className="art">
      <div className="art-progress" aria-hidden />
      <div className="shell art-grid">
        <aside className="art-aside" aria-label="On this page">
          <p className="art-aside-label">On this page</p>
          <ol>
            {outline.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#questions">
                <span>{String(outline.length + 1).padStart(2, "0")}</span>
                Common questions
              </a>
            </li>
          </ol>
        </aside>

        <article className="art-main">
          <div className="art-byline">
            <Image
              src="/christian-brinkley-square.jpg"
              alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}`}
              width={128}
              height={128}
              sizes="56px"
            />
            <p>
              <strong>
                By <Link href="/about">{AGENT.name}</Link>
              </strong>
              <span>
                Licensed agent, {AGENT.licenseLine} · Updated {formatArticleDate(article.updated)} ·{" "}
                {minutes} min read
              </span>
            </p>
          </div>

          <p className="art-lead">{renderInline(article.intro)}</p>

          <nav className="art-toc-mobile" aria-label="In this article">
            <p>In this article</p>
            <ol>
              {outline.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          {article.sections.map((section, index) => (
            <section key={section.h2} id={outline[index].id} className="art-section">
              <h2>
                <span className="art-num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.h2}
              </h2>
              {section.blocks.map((block, blockIndex) =>
                block.kind === "p" ? (
                  <p key={blockIndex}>{renderInline(block.text)}</p>
                ) : (
                  <ul key={blockIndex}>
                    {block.items.map((item) => (
                      <li key={item}>{renderInline(item)}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}

          <section id="questions" className="art-section">
            <h2>
              <span className="art-num" aria-hidden>
                {String(outline.length + 1).padStart(2, "0")}
              </span>
              Questions people ask me about this
            </h2>
            <div className="faq">
              {article.faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span className="faq-icon" aria-hidden />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <aside className="art-next" aria-label="Next step">
            <div className="art-next-who">
              <Image
                src="/christian-brinkley-square.jpg"
                alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}`}
                width={240}
                height={240}
                sizes="112px"
                className="art-next-avatar"
              />
              <p>
                <span className="art-next-kicker">From a neighbor, not a newsroom</span>
                <strong>{AGENT.name}</strong>
                <span>
                  {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
                </span>
              </p>
            </div>
            <h2>{nextStep.heading}</h2>
            <p>{nextStep.body}</p>
            <div className="art-next-actions">
              <TrackedLink
                href={article.startHref}
                className="btn"
                event="article_cta_click"
                ctaLocation="article_end"
              >
                {nextStep.label} <ArrowRight size={18} className="arrow" aria-hidden />
              </TrackedLink>
              <a data-cta-location="article_end" href={AGENT.phoneHref} className="btn btn-outline">
                <Phone size={18} aria-hidden /> {AGENT.phone}
              </a>
            </div>
            <p className="art-next-towns">
              I meet people in {towns}, and the towns around them. Or we can talk by phone.
            </p>
          </aside>

          <GuideCapture />
          <div className="art-refs">
            <div>
              <h2>Sources</h2>
              <ol className="art-sources">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} rel="noopener" data-handoff>
                      {source.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2>Keep reading</h2>
              <ul className="art-related">
                {article.related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label} <ArrowRight size={16} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {children}
        </article>
      </div>
    </div>
  );
}
