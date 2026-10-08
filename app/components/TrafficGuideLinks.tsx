import Link from "next/link";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";

/** Contextual links from existing pillar and cluster pages. */
export function TrafficGuideLinks({ slugs }: { slugs: string[] }) {
  const guides = TRAFFIC_GUIDES.filter((guide) => slugs.includes(guide.slug));
  return (
    <section
      className="app-shell my-10 max-w-4xl rounded-xl border border-current p-6"
      aria-label="Related practical guides"
    >
      <h2 className="text-24 font-semibold">Questions that come up next</h2>
      <ul className="mt-4 list-disc space-y-3 pl-6">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="underline underline-offset-2">
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
