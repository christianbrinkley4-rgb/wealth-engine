"use client";

import { WEALTH_TOOLS } from "@/lib/wealth/site";

import { EXPLORED_KEY, NO_SLUGS, usePersistentState } from "./hooks";
import { ToolCard } from "./shell";

/**
 * Every tool in the hub, with a strip that remembers which ones this visitor
 * has opened. The memory is localStorage on their own device.
 */
export function ToolGrid({ kinds }: { kinds?: ReadonlyArray<"Calculator" | "Quiz" | "Download"> }) {
  const [explored] = usePersistentState(EXPLORED_KEY, NO_SLUGS);
  const tools = kinds ? WEALTH_TOOLS.filter((tool) => kinds.includes(tool.kind)) : WEALTH_TOOLS;
  const done = tools.filter((tool) => explored.includes(tool.slug)).length;

  return (
    <>
      {done > 0 ? (
        <div className="w-progress" role="status">
          <span>
            {done === tools.length
              ? "You've opened every one. Respect."
              : `You've explored ${done} of ${tools.length}.`}
          </span>
          <span className="w-progress-bar" aria-hidden>
            <i style={{ width: `${(done / tools.length) * 100}%` }} />
          </span>
        </div>
      ) : null}
      <div className={`w-grid ${tools.length > 4 ? "w-grid-4" : "w-grid-3"}`}>
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} done={explored.includes(tool.slug)} />
        ))}
      </div>
    </>
  );
}
