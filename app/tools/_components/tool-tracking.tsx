"use client";
import { useRef, type ReactNode } from "react";
import { useToolTracking } from "@/hooks/useToolTracking";
import type { ToolId } from "@/lib/analytics";
export function ToolTracking({ toolId, children }: { toolId: ToolId; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const change = useToolTracking(toolId);
  const changed = () =>
    change(() => {
      const result = root.current?.querySelector(".t-stat");
      if (!result) return false;
      const rect = result.getBoundingClientRect();
      return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
    });
  return (
    <div
      ref={root}
      onChangeCapture={changed}
      onClickCapture={(event) => {
        if ((event.target as Element).closest(".t-radio")) changed();
      }}
    >
      {children}
    </div>
  );
}
