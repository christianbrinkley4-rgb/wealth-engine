// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { PaycheckBreakdown } from "@/app/tools/paycheck-breakdown/PaycheckBreakdown";

afterEach(cleanup);

function enter(gross: string, net: string) {
  fireEvent.change(screen.getByLabelText("Gross pay for this check"), { target: { value: gross } });
  fireEvent.change(screen.getByLabelText("Net deposit for this check"), { target: { value: net } });
  fireEvent.click(screen.getByRole("button", { name: "Break down my paycheck" }));
}

it("blocks malformed and impossible deposits without displaying a misleading card", () => {
  render(createElement(PaycheckBreakdown));
  enter("$3,000.00", "4000");
  expect(screen.getByText("Net deposit cannot be greater than gross pay.")).toBeTruthy();
  expect(screen.queryByRole("region", { name: "Your share card" })).toBeNull();
  enter("", "2200");
  expect(screen.getByLabelText("Gross pay for this check").getAttribute("aria-invalid")).toBe(
    "true",
  );
});

it("shows sourced estimates, a balanced residual, and a share card for pasted pay", () => {
  const { container } = render(createElement(PaycheckBreakdown));
  enter("$3,000.00", "2,200.00");
  expect(screen.getByRole("heading", { name: "You kept 73.3%." })).toBeTruthy();
  const result = screen.getByRole("region", { name: "Your paycheck results" });
  expect(within(result).getByText("Other deductions (benefits, 401k, etc.)")).toBeTruthy();
  expect(within(result).getAllByRole("link", { name: "$320.38" })[0].getAttribute("href")).toBe(
    "https://www.irs.gov/publications/p15t",
  );
  expect(within(result).getAllByRole("link", { name: "$250.12" })).toHaveLength(2);
  const card = screen.getByRole("region", { name: "Your share card" });
  expect(
    within(card)
      .getByRole("link", { name: "christianbrinkleync.com/tools/paycheck-breakdown" })
      .getAttribute("href"),
  ).toBe("https://christianbrinkleync.com/tools/paycheck-breakdown");
  expect(container.textContent).not.toMatch(/[\u2013\u2014]/);
  for (const paragraph of container.querySelectorAll("p, .p-line > dd, .p-math li")) {
    for (const sentence of (paragraph.textContent ?? "").trim().split(/(?<=[.!?])\s+/)) {
      expect(sentence.split(/\s+/).filter(Boolean).length, sentence).toBeLessThanOrEqual(25);
    }
  }
});

it("keeps a negative residual honest and handles zero pay without NaN", () => {
  render(createElement(PaycheckBreakdown));
  enter("3000", "3000");
  expect(screen.getByRole("alert").textContent).toContain(
    "These assumptions do not match your deposit.",
  );
  expect(screen.queryByText("Other deductions (benefits, 401k, etc.)")).toBeNull();
  expect(
    screen.getByText("My tax estimate needs a pay stub check.", { exact: false }),
  ).toBeTruthy();
  enter("0", "0");
  expect(screen.getByRole("heading", { name: "No pay to break down" })).toBeTruthy();
  expect(document.body.textContent).not.toMatch(/NaN|Infinity/);
});

it("updates thresholds from year-to-date wages and keeps joint liability distinct", () => {
  render(createElement(PaycheckBreakdown));
  enter("3000", "2200");
  fireEvent.change(screen.getByLabelText("This employer's taxable wages before this check"), {
    target: { value: "199000" },
  });
  fireEvent.change(screen.getByLabelText("Filing status"), { target: { value: "joint" } });
  const row = screen.getByText("Additional Medicare withholding").closest(".p-line")!;
  expect(row.textContent).toContain("$18.00");
  const social = screen
    .getByText("Social Security", { selector: ".p-line dt" })
    .closest(".p-line")!;
  expect(social.textContent).toContain("$0.00");
  expect(screen.getByText("Your tax-return threshold is $250,000.00.")).toBeTruthy();
});
