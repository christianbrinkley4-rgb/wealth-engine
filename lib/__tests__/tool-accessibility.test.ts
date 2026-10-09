// @vitest-environment jsdom
import { createElement, Fragment } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import {
  MoneyField,
  PercentField,
  Slider,
  SelectField,
  ChoiceField,
  CopyNumbersButton,
  Stat,
} from "@/app/tools/_components/tool-shared";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
it("keeps repeated labels uniquely associated with their input and hint", () => {
  const fields = [MoneyField, PercentField];
  for (const Field of fields) {
    const { unmount } = render(
      createElement(
        Fragment,
        null,
        ...[1, 2].map((value) =>
          createElement(Field, {
            key: value,
            label: "Amount",
            value,
            onChange: () => {},
            hint: "Explain " + value,
          }),
        ),
      ),
    );
    const inputs = screen.getAllByLabelText("Amount");
    expect(new Set(inputs.map((input) => input.id)).size).toBe(2);
    inputs.forEach((input, index) =>
      expect(document.getElementById(input.getAttribute("aria-describedby")!)?.textContent).toBe(
        "Explain " + (index + 1),
      ),
    );
    unmount();
  }
});
it("associates range, select, and segmented controls with visible labels", () => {
  render(
    createElement(
      Fragment,
      null,
      createElement(Slider, {
        label: "Years",
        value: 10,
        min: 1,
        max: 50,
        display: "10",
        hint: "Time invested",
        onChange: () => {},
      }),
      createElement(SelectField, {
        label: "Frequency",
        value: "monthly",
        options: [{ value: "monthly", label: "Monthly" }],
        hint: "Pay periods",
        onChange: () => {},
      }),
      createElement(ChoiceField, {
        label: "Filing status",
        value: "single",
        options: [
          { value: "single", label: "Single" },
          { value: "joint", label: "Joint" },
        ],
        onChange: () => {},
      }),
    ),
  );
  expect(
    screen.getByRole("slider", { name: "Years" }).getAttribute("aria-describedby"),
  ).toBeTruthy();
  expect(
    screen.getByRole("combobox", { name: "Frequency" }).getAttribute("aria-describedby"),
  ).toBeTruthy();
  expect(screen.getByRole("group", { name: "Filing status" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Single" }).getAttribute("aria-pressed")).toBe("true");
});
it("announces a successful copy and clears feedback when the numbers change", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  const { rerender } = render(createElement(CopyNumbersButton, { summary: "First estimate" }));
  fireEvent.click(screen.getByRole("button", { name: "Copy my numbers" }));
  await waitFor(() =>
    expect(screen.getByRole("status").textContent).toBe("Your numbers were copied."),
  );
  expect(writeText).toHaveBeenCalledWith("First estimate");
  rerender(createElement(CopyNumbersButton, { summary: "New estimate" }));
  expect(screen.getByRole("status").textContent).toBe("");
  expect(screen.getByRole("button", { name: "Copy my numbers" })).toBeTruthy();
});
it("offers a manual copy fallback when clipboard access fails", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockRejectedValue(new Error("Unavailable")) },
  });
  const prompt = vi.spyOn(window, "prompt").mockReturnValue(null);
  render(createElement(CopyNumbersButton, { summary: "Estimate" }));
  fireEvent.click(screen.getByRole("button", { name: "Copy my numbers" }));
  await waitFor(() => expect(prompt).toHaveBeenCalledWith("Copy your numbers:", "Estimate"));
  expect(screen.getByRole("status").textContent).toBe("");
});

it("preserves the hero result class names", () => {
  const { container } = render(
    createElement(
      "dl",
      null,
      createElement(Stat, { label: "Take-home", value: "$2,012", hero: true }),
    ),
  );
  expect(container.querySelector(".t-stat.t-stat-hero")).toBeTruthy();
});
