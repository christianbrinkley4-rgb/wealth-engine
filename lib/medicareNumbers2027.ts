/**
 * The 2027 Medicare figures, single-sourced here. The visitor-facing page at
 * /medicare-numbers-2027 and the MCP connector both read from this module so
 * the numbers can never drift between them.
 *
 * Rules are the same as on the page: every figure is labeled final or
 * projected with its CMS source. CMS announced the final 2027 Part A, Part B,
 * and IRMAA figures on November 17, 2026, so the Part B premium and
 * deductible for 2027 are final now, not projections.
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
    y2027: "$209.40 / month",
    status:
      "Final. CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026.",
  },
  {
    figure: "Part B annual deductible",
    y2026: "$283",
    y2027: "$292",
    status:
      "Final. CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026.",
  },
  {
    figure: "Part A hospital deductible",
    y2026: "$1,736",
    y2027: "$1,776",
    status:
      "Final. CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026. Part A has no monthly premium for most people.",
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
    t: "November 17, 2026",
    b: "CMS announced the final 2027 Part B premium, Part B deductible, Part A deductible, and income-related adjustment amounts.",
  },
];

/** Plain markdown version of the figures, for machine readers (MCP, llms.txt). */
export function medicareNumbers2027Markdown(): string {
  const lines: string[] = [
    "# 2027 Medicare numbers at a glance",
    "",
    "Source: christianbrinkleync.com/medicare-numbers-2027. Figures checked November 19, 2026. Each figure is labeled final or projected.",
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
    "Sources: Centers for Medicare and Medicaid Services, 2027 Medicare Parts A & B Premiums and Deductibles (November 17, 2026); CY2027 Rate Announcement (April 6, 2026); 2027 MA/Part D landscape press release (September 28, 2026).",
    "",
    "National figures. A plan's actual premiums, deductibles, and drug costs are in its Annual Notice of Change.",
  );
  return lines.join("\n");
}
