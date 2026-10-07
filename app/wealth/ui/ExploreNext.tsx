"use client";

import Link from "next/link";
import { nextUnopenedTool } from "@/lib/wealth/explore";
import { EXPLORED_KEY, NO_SLUGS, usePersistentState } from "./hooks";

export function ExploreNext() {
  const [explored] = usePersistentState(EXPLORED_KEY, NO_SLUGS);
  const next = nextUnopenedTool(explored);
  if (!next) return null;
  return (
    <aside className="w-card w-explore-next" aria-label="Your next tool">
      <p className="w-eyebrow">1 next move</p>
      <h3 className="w-h3">{next.title}</h3>
      <p>{next.blurb}</p>
      <Link className="w-btn" href={next.href}>Try this next</Link>
    </aside>
  );
}
