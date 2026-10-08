// @vitest-environment jsdom
import { createElement, useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MoneyField } from "@/app/wealth/ui/controls";
import { LineChart } from "@/app/wealth/ui/charts";
afterEach(cleanup);
it("keeps a decimal separator while typing and commits a bounded number", () => {
  function Form() {
    const [value, setValue] = useState(0);
    return createElement(MoneyField, { label: "APR", value, onChange: setValue, max: 100 });
  }
  render(createElement(Form));
  const input = screen.getByLabelText("APR") as HTMLInputElement;
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "5" } });
  fireEvent.change(input, { target: { value: "5." } });
  expect(input.value).toBe("5.");
  fireEvent.change(input, { target: { value: "5.5" } });
  fireEvent.blur(input);
  expect(input.value).toBe("5.5");
  fireEvent.change(input, { target: { value: "500" } });
  expect(input.value).toBe("100");
});

it("keeps an empty debt chart at month zero without duplicate axis labels", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    const { container } = render(createElement(LineChart, { series: [{ name: "Debt", color: "red", values: [0] }], xLabel: (index) => `Month ${index}`, xTitle: "Months", describe: "No debt remains." }));
    expect(container.querySelectorAll("svg text").length).toBe(6);
    expect(container.querySelector("svg")?.outerHTML).not.toMatch(/NaN|Infinity/);
    expect((screen.getByRole("slider") as HTMLInputElement).max).toBe("0");
    expect(error).not.toHaveBeenCalled();
  } finally {
    error.mockRestore();
  }
});
