import { Quote } from "lucide-react";

import { TESTIMONIALS } from "@/lib/testimonials";

/**
 * Renders nothing until there is something true to render.
 *
 * An empty testimonials section with placeholder quotes would be worse than no
 * section at all — invented praise on a licensed agent's site is both a
 * regulatory problem and the exact thing this site spends its homepage
 * promising not to do. So the component returns null while lib/testimonials.ts
 * is empty, and the section appears the moment a real quote is added.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-30 font-semibold text-[var(--color-navy)]">
          What people around here say
        </h2>

        <ul className="mt-8 flex flex-col gap-8">
          {TESTIMONIALS.map((item) => (
            <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
              <figure className="m-0 border-t border-gray-300 pt-6">
                <Quote
                  className="size-7 text-[var(--color-gold-ink)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <blockquote className="text-19 mt-3 leading-relaxed text-[var(--color-navy)]">
                  {item.quote}
                </blockquote>
                <figcaption className="text-17 mt-3 text-[var(--color-ink-muted)]">
                  <span className="font-semibold text-[var(--color-navy)]">{item.name}</span> ·{" "}
                  {item.location}
                  {item.context ? ` · ${item.context}` : ""}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
