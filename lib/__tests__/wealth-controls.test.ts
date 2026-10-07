// @vitest-environment jsdom
import { createElement, useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { MoneyField } from "@/app/wealth/ui/controls";
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
