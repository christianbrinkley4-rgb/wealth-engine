/** November 7 at midnight in America/New_York. No redeploy needed for the revert. */
export const SHP_METADATA_REVERT_AT = Date.parse("2026-11-07T05:00:00Z");

export function shpMetadataCopy(now = Date.now()) {
  return now < SHP_METADATA_REVERT_AT
    ? {
        title: "NC State Health Plan Medicare Retirees: Nov. 6 Enrollment Deadline",
        description: "NC state retirees on Medicare: open enrollment ends November 6, 2026. Review what to check for 2027 and where to get help with your retiree coverage.",
      }
    : {
        title: "NC State Health Plan and Medicare: Retiree Coverage Guide",
        description: "How Medicare works with NC State Health Plan retiree coverage, what to review for 2027, and where to get help with enrollment questions.",
      };
}
