import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { STANDALONE_GUIDES } from "@/lib/standaloneGuides";
export const ALL_GUIDES = [...TRAFFIC_GUIDES, ...STANDALONE_GUIDES];
export function isMedicareGuide(slug: string): boolean {
  return /medicare|social-security|irmaa|missed-medicare/.test(slug);
}
export const MEDICARE_GUIDES = ALL_GUIDES.filter((g) => isMedicareGuide(g.slug));
export const MONEY_GUIDES = ALL_GUIDES.filter((g) => !isMedicareGuide(g.slug));
