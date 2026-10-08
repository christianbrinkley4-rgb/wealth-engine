"use client";

import { useMarkExplored } from "@/app/wealth/ui/hooks";

/** Ticks both downloads off the progress strip once the tools page is opened. */
export function MarkExplored() {
  useMarkExplored("budget-spreadsheet");
  useMarkExplored("ratio-checker");
  return null;
}
