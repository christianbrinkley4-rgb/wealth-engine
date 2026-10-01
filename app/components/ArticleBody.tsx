import Link from "next/link";
import type { ReactNode } from "react";

import { AGENT } from "@/lib/agent";
import type { Article } from "@/lib/articles";

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
    const className = "underline underline-offset-2";
    nodes.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} className={className} rel="noopener">
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

export function ArticleBody({ article }: { article: Article }) {
  return (
    <>
      <section className="bg-white pt-12 pb-4">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-16 text-[var(--color-ink-muted)]">
            By {AGENT.name}, Licensed Insurance Agent, Greensboro, NC. Updated{" "}
            {formatArticleDate(article.updated)}.
          </p>
          <p className="text-19 mt-5 leading-relaxed">{renderInline(article.intro)}</p>
        </div>
      </section>

      {article.sections.map((section, index) => (
        <section
          key={section.h2}
          className={index % 2 === 0 ? "bg-white py-10" : "bg-[var(--color-paper)] py-10"}
        >
          <div className="measure-prose app-shell max-w-3xl">
            <h2 className="text-28 font-semibold">{section.h2}</h2>
            {section.blocks.map((block, blockIndex) =>
              block.kind === "p" ? (
                <p key={blockIndex} className="text-18 mt-4 leading-relaxed">
                  {renderInline(block.text)}
                </p>
              ) : (
                <ul key={blockIndex} className="text-18 mt-4 list-disc space-y-3 pl-6 leading-relaxed">
                  {block.items.map((item) => (
                    <li key={item}>{renderInline(item)}</li>
                  ))}
                </ul>
              ),
            )}
          </div>
        </section>
      ))}

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about this</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {article.faq.map((item) => (
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

      <section className="bg-[var(--color-paper)] py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-20 rounded-xl border-2 border-[var(--color-navy)] bg-white p-6 leading-relaxed font-semibold">
            Talk it through with a local agent, free: request a time at{" "}
            <Link href={article.startHref} className="underline underline-offset-2">
              christianbrinkleync.com/start
            </Link>{" "}
            or call/text{" "}
            <a href={AGENT.phoneHref} className="underline underline-offset-2">
              {AGENT.phone}
            </a>
            .
          </p>

          <h2 className="text-20 mt-10 font-semibold">Sources</h2>
          <ul className="text-16 mt-3 list-disc space-y-2 pl-6 leading-relaxed">
            {article.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="underline underline-offset-2" rel="noopener">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="text-20 mt-8 font-semibold">Keep reading</h2>
          <ul className="text-16 mt-3 list-disc space-y-2 pl-6 leading-relaxed">
            {article.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
