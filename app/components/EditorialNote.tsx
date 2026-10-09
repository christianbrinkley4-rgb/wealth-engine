import Link from "next/link";
import type { Source } from "@/lib/editorial";

/** Visible provenance uses the actual author, without implying independent review. */
export function EditorialNote({
  sources,
  reviewed = "2026-10-09",
}: {
  sources: readonly Source[];
  reviewed?: string;
}) {
  return (
    <aside className="editorial-note" aria-label="About this information">
      <p>
        <strong>
          Written by <Link href="/about">Christian Brinkley</Link>.
        </strong>{" "}
        Sources checked <time dateTime={reviewed}>{reviewed}</time>.
      </p>
      <p>
        General education. Christian is a licensed insurance agent and an accounting student, not a
        tax or investment adviser.
      </p>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href}>{source.label}</a>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/editorial-policy">How this information is prepared</Link>
      </p>
    </aside>
  );
}

export function ArticleContents({ items }: { items: readonly { id: string; label: string }[] }) {
  return (
    <nav className="article-contents" aria-label="On this page">
      <strong>On this page</strong>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
