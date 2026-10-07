// @vitest-environment jsdom
import { createElement } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readStore, usePersistentState } from "@/app/wealth/ui/hooks";

const defaults = { income: 3000, debts: [{ name: "Card", balance: 1000 }], enabled: true };
let root: Root | undefined;
beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    clear: () => values.clear(),
  });
});
afterEach(async () => {
  if (root) await act(() => root?.unmount());
  root = undefined;
  window.localStorage.clear();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("hub browser storage", () => {
  it("repairs malformed fields and retains valid saved fields", () => {
    window.localStorage.setItem("shape", JSON.stringify({ income: "oops", debts: [null, { name: "Loan", balance: "bad" }], enabled: false }));
    expect(readStore("shape", defaults)).toEqual({ income: 3000, debts: [{ name: "Loan", balance: 1000 }], enabled: false });
    window.localStorage.setItem("null", "null");
    expect(readStore("null", defaults)).toEqual(defaults);
    window.localStorage.setItem("slugs", '[null,"budget",42]');
    expect(readStore("slugs", [])).toEqual(["budget"]);
  });

  it("hydrates the fallback before restoring browser state and updates across tabs", async () => {
    const onRecoverableError = vi.fn();
    function View() {
      const [state] = usePersistentState("hydrate", defaults);
      return createElement("output", null, String(state.income));
    }
    const container = document.createElement("div");
    container.innerHTML = renderToString(createElement(View));
    expect(container.textContent).toBe("3000");
    document.body.append(container);
    window.localStorage.setItem("hydrate", '{"income":4200}');
    await act(() => { root = hydrateRoot(container, createElement(View), { onRecoverableError }); });
    expect(container.textContent).toBe("4200");
    expect(onRecoverableError).not.toHaveBeenCalled();
    await act(() => {
      window.localStorage.setItem("hydrate", '{"income":5100}');
      window.dispatchEvent(Object.assign(new Event("storage"), { key: "hydrate", storageArea: window.localStorage }));
    });
    expect(container.textContent).toBe("5100");
  });
});

