import { localBusinessJsonLd, speakableJsonLd } from "@/lib/seo";

/**
 * The same business record on every location page: one name, one phone,
 * one service area, free consultation. Speakable points at the hero title
 * and lede, which ServiceHero renders on these pages.
 */
export function LocationBusinessMarkup() {
  const graph = JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c");
  const speakable = JSON.stringify(speakableJsonLd()).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: speakable }} />
    </>
  );
}
