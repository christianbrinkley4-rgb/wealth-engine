import { SHIIP_CONTACT_URL } from "@/lib/planChecklist";

/**
 * Free Medicare counseling that is independent of this practice.
 *
 * Every entry here was read on its source page on the date shown. Nothing is
 * added from memory or from a search snippet: a wrong phone number on a page
 * for people sorting out Medicare is worse than no number. Counties without a
 * verified local contact fall back to the statewide SHIIP line, which is
 * correct everywhere in North Carolina.
 */
export type CounselingContact = {
  name: string;
  phone: string;
  phoneHref: string;
  sourceUrl: string;
  checkedOn: string;
};

/** NC Department of Insurance, Seniors' Health Insurance Information Program. */
export const NC_SHIIP: CounselingContact = {
  name: "NC SHIIP",
  phone: "855-408-1212",
  phoneHref: "tel:+18554081212",
  sourceUrl: SHIIP_CONTACT_URL,
  checkedOn: "2026-10-09",
};

/** Keyed by the county string used in lib/triad.ts. */
export const COUNTY_COUNSELING: Record<string, CounselingContact> = {
  "Forsyth County": {
    name: "The Shepherd’s Center",
    phone: "336-748-0217",
    phoneHref: "tel:+13367480217",
    sourceUrl: "https://www.shepherdscenter.org/shiip-medicare-counseling",
    checkedOn: "2026-10-09",
  },
};

export function countyCounseling(county: string): CounselingContact | null {
  return COUNTY_COUNSELING[county] ?? null;
}
