"use client";
import { useCallback, useEffect, useRef } from "react";
import { trackEvent } from "@/app/components/Analytics";
import type { ToolId } from "@/lib/analytics";

/** Completion means ten seconds reading a result after a deliberate input change. */
export function useToolTracking(toolId: ToolId) {
  const started = useRef(false);
  const completed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const change = useCallback((hasResult: () => boolean) => {
    if (!started.current) { started.current = true; trackEvent("tool_start", { tool_id: toolId }); }
    if (timer.current) clearTimeout(timer.current);
    if (completed.current) return;
    timer.current = setTimeout(() => {
      if (hasResult() && document.visibilityState !== "hidden") {
        completed.current = true;
        trackEvent("tool_complete", { tool_id: toolId });
      }
    }, 10000);
  }, [toolId]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return change;
}
