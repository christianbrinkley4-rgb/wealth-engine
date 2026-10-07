import { WEALTH_TOOLS, type WealthTool } from "./site";

const RELATED: Record<string, string[]> = {
  "first-1000": ["budget", "debt-payoff"],
  budget: ["debt-payoff", "compound-interest"],
  "debt-payoff": ["budget", "compound-interest"],
  "compound-interest": ["roth-vs-traditional", "budget"],
  "roth-vs-traditional": ["compound-interest", "first-1000"],
  "money-personality": ["first-1000", "budget"],
};

/** Suggest an unopened tool using only the existing browser exploration list. */
export function nextUnopenedTool(explored: readonly string[]): WealthTool | undefined {
  const known = explored.filter((slug) => WEALTH_TOOLS.some((tool) => tool.slug === slug));
  if (!known.length) return undefined;
  const seen = new Set(known);
  const priorities = [...known].reverse().flatMap((slug) => RELATED[slug] ?? []);
  for (const slug of priorities) {
    const tool = WEALTH_TOOLS.find((item) => item.slug === slug && !seen.has(slug));
    if (tool) return tool;
  }
  return WEALTH_TOOLS.find((tool) => !seen.has(tool.slug));
}
