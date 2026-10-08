import Link from "next/link";

import { AI_GUIDES } from "./ai-guides";

/** Up link to the /ai hub plus sideways links to the other AI guides. */
export function SiblingNav({ current }: { current: string }) {
  const others = AI_GUIDES.filter((guide) => guide.slug !== current);
  return (
    <section className="bg-[var(--color-paper)] py-12">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-24 font-semibold">More AI guides</h2>
        <ul className="mt-6 flex flex-col gap-5">
          <li>
            <Link href="/ai" className="text-17 font-semibold underline underline-offset-2">
              AI for regular people
            </Link>
            <p className="text-16 mt-1 text-[var(--color-ink-muted)]">
              The starting point for this whole section.
            </p>
          </li>
          {others.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/ai/${guide.slug}`}
                className="text-17 font-semibold underline underline-offset-2"
              >
                {guide.title}
              </Link>
              <p className="text-16 mt-1 text-[var(--color-ink-muted)]">{guide.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
