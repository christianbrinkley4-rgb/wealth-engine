import { TestimonialCard } from "@/components/story/TestimonialCard";
import type { Testimonial } from "@/lib/testimonials";

/** Horizontal row of real quotes. Renders nothing when the list is empty. */
export function TestimonialCarousel({ items }: { items: readonly Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="t-carousel">
      {items.map((item) => (
        <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
          <TestimonialCard item={item} />
        </li>
      ))}
    </ul>
  );
}
