import type { Metadata } from "next";

/**
 * /numbers metadata, kept in its own module so the hub test can assert the
 * title and description length limits without rendering the page.
 */
export const NUMBERS_METADATA: Metadata = {
  title: {
    absolute: "2026-2027 Money Numbers: Taxes, Medicare, Retirement",
  },
  description:
    "Every 2026 and 2027 money number in one place: tax brackets, 401(k) and IRA limits, HSA, Social Security, and Medicare costs. All sourced.",
  alternates: { canonical: "/numbers" },
};
