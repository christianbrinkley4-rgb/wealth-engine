"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { LearnEntry, SituationId } from "@/lib/learn";

type Situation = { id: SituationId; label: string; blurb: string };

/**
 * The library, grouped by situation, with a search box that narrows every
 * group at once. Everything is rendered on the server first, so the page is
 * complete and crawlable before any script runs.
 */
export function LearnLibrary({
  situations,
  entries,
}: {
  situations: readonly Situation[];
  entries: LearnEntry[];
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      situations.map((situation) => ({
        ...situation,
        items: entries.filter(
          (entry) =>
            entry.situation === situation.id &&
            (!needle || `${entry.title} ${entry.blurb}`.toLowerCase().includes(needle)),
        ),
      })),
    [situations, entries, needle],
  );
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="ll">
      <div className="ll-bar">
        <div className="shell ll-bar-inner">
          <label className="ll-search">
            <Search size={18} aria-hidden />
            <span className="sr-only">Search the Learning Hub</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search: Part B, RMD, Social Security…"
              autoComplete="off"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={16} aria-hidden />
              </button>
            ) : null}
          </label>
          <nav aria-label="Situations" className="ll-chips">
            <ul>
              {groups.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`} data-empty={group.items.length === 0 ? "true" : undefined}>
                    {group.label}
                    <span>{group.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="shell">
        <p className="ll-count" aria-live="polite">
          {needle
            ? total === 0
              ? `Nothing matches “${query.trim()}” yet. Try another word, or ask me directly.`
              : `${total} ${total === 1 ? "result" : "results"} for “${query.trim()}”`
            : null}
        </p>
        {groups.map((group) =>
          group.items.length === 0 ? null : (
            <section key={group.id} id={group.id} className="ll-group" aria-labelledby={`${group.id}-h`}>
              <div className="ll-group-head">
                <h2 id={`${group.id}-h`}>{group.label}</h2>
                <p>{group.blurb}</p>
              </div>
              <ul className="lib-grid">
                {group.items.map((entry) => (
                  <li key={entry.href}>
                    <Link href={entry.href} className="card lib-card">
                      <span className="lib-kind">
                        {entry.kind}
                        {entry.minutes ? ` · ${entry.minutes} min read` : ""}
                      </span>
                      <span className="lib-title">{entry.title}</span>
                      <span className="lib-blurb">{entry.blurb}</span>
                      <ArrowRight size={20} className="lib-arrow" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ),
        )}
        {needle && total === 0 ? (
          <div className="ll-empty">
            <Link href="/start" className="btn">
              Ask me your question <ArrowRight size={18} className="arrow" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
