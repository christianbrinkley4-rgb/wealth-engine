import Link from "next/link";
import { STANDALONE_GUIDES } from "@/lib/standaloneGuides";

/** "Read next" links for the ten standalone /guides pages. Data lives in lib/standaloneGuides.ts. */
export function StandaloneRelatedLinks({ slug }: { slug: string }) {
  const guide = STANDALONE_GUIDES.find((item) => item.slug === slug);
  if (!guide || !guide.related.length) return null;
  return (
    <section className="app-shell max-w-3xl py-12" aria-label="Read next">
      <h2 className="text-24 font-semibold">Read next</h2>
      <ul className="text-18 mt-4 space-y-3">
        {guide.related.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="underline underline-offset-4">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
