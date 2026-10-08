/**
 * The 2027 Medicare figures, single-sourced here. The visitor-facing page at
 * /medicare-numbers-2027 and the MCP connector both read from this module so
 * the numbers can never drift between them.
 *
 * Rules are the same as on the page: every figure is labeled final or
 * projected with its CMS source. The Part B premium and deductible for 2027
 * are NOT final until CMS announces them in November 2026, so they appear as
 * the 2026 confirmed figure plus the Trustees projection, clearly marked.
 */

export type MedicareNumberRow = {
  figure: string;
  y2026: string;
  y2027: string;
  status: string;
};

export const MEDICARE_NUMBERS_2027: readonly MedicareNumberRow[] = [
  {
    figure: "Part D standard deductible (max)",
    y2026: "$615",
    y2027: "$700",
    status: "Final. CMS CY2027 Rate Announcement, April 6, 2026.",
  },
  {
    figure: "Part D out-of-pocket cap",
    y2026: "$2,100",
    y2027: "$2,400",
    status:
      "Final. CMS CY2027 Rate Announcement, April 6, 2026. Once you hit the cap, you pay $0 for covered drugs the rest of the year.",
  },
  {
    figure: "Part B standard premium",
    y2026: "$202.90 / month",
    y2027: "~$209.50 / month",
    status:
      "Projection. 2026 Medicare Trustees Report. CMS announces the final figure in November.",
  },
  {
    figure: "Part B annual deductible",
    y2026: "$283",
    y2027: "~$292",
    status:
      "Projection. 2026 Medicare Trustees Report. Not final until CMS announces in November.",
  },
  {
    figure: "Part A hospital deductible",
    y2026: "$1,736",
    y2027: "Not yet announced",
    status:
      "CMS announces the 2027 figure in the fall, usually with the Part B numbers. Part A has no monthly premium for most people.",
  },
  {
    figure: "Medicare Advantage average premium",
    y2026: "See note",
    y2027: "~$12 / month",
    status:
      "CMS projection, September 28, 2026. National average; your plan's actual premium is what matters.",
  },
];

export type MedicareDateItem = {
  t: string;
  b: string;
};

export const MEDICARE_DATES_2027: readonly MedicareDateItem[] = [
  {
    t: "October 15, 2026",
    b: "Annual Enrollment Period opens. You can join, switch, or drop Medicare Advantage and Part D plans.",
  },
  {
    t: "December 7, 2026",
    b: "Annual Enrollment Period closes. This deadline does not move. Changes take effect January 1, 2027.",
  },
  {
    t: "January 1, 2027",
    b: "New coverage and the new 2027 figures take effect. The Part D cap drops to $0 cost-sharing once reached.",
  },
  {
    t: "November 2026",
    b: "CMS announces the final 2027 Part B premium, Part B deductible, and income-related adjustment amounts. This page updates when that happens.",
  },
];

/** Plain markdown version of the figures, for machine readers (MCP, llms.txt). */
export function medicareNumbers2027Markdown(): string {
  const lines: string[] = [
    "# 2027 Medicare numbers at a glance",
    "",
    "Source: christianbrinkleync.com/medicare-numbers-2027. Figures checked October 8, 2026. Each figure is labeled final or projected.",
    "",
    "## Figures",
    "",
    "| Figure | 2026 (final) | 2027 | Status and source |",
    "| --- | --- | --- | --- |",
  ];
  for (const row of MEDICARE_NUMBERS_2027) {
    lines.push(`| ${row.figure} | ${row.y2026} | ${row.y2027} | ${row.status} |`);
  }
  lines.push("", "## Dates that matter", "");
  for (const item of MEDICARE_DATES_2027) {
    lines.push(`- **${item.t}:** ${item.b}`);
  }
  lines.push(
    "",
    "Sources: Centers for Medicare and Medicaid Services, CY2027 Rate Announcement (April 6, 2026) and 2027 MA/Part D landscape press release (September 28, 2026); 2026 Medicare Trustees Report for projections.",
    "",
    "National figures. A plan's actual premiums, deductibles, and drug costs are in its Annual Notice of Change.",
  );
  return lines.join("\n");
}
