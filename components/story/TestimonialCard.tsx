import { Star } from "lucide-react";
import Image from "next/image";

import type { Testimonial } from "@/lib/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="t-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          aria-hidden
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={index < rating ? 0 : 1.5}
        />
      ))}
    </span>
  );
}

/**
 * One real quote. A missing photo shows the person's initial, never a stock face.
 * The parent passes an empty list when there are no permitted quotes, and this
 * card is not rendered at all in that case.
 */
export function TestimonialCard({ item }: { item: Testimonial }) {
  const initial = item.name.trim().charAt(0).toUpperCase() || "?";
  const detail = item.benefit ?? item.context;
  return (
    <figure className="t-card">
      {item.photoSrc ? (
        <Image className="t-photo" src={item.photoSrc} alt="" width={64} height={64} />
      ) : (
        <span className="t-photo t-photo-placeholder" aria-hidden>
          {initial}
        </span>
      )}
      {item.rating ? <Stars rating={item.rating} /> : null}
      <blockquote>{item.quote}</blockquote>
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.location}</span>
        {detail ? <span>{detail}</span> : null}
      </figcaption>
    </figure>
  );
}
