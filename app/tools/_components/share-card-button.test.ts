// @vitest-environment jsdom
/**
 * The "Share your result" button renders on every tool page, and at default
 * inputs its headline matches the OG default card, so crawlers and visitors
 * see numbers from the same math.
 */

import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Budget } from "@/app/tools/budget/Budget";
import { CompoundInterest } from "@/app/tools/compound-interest/CompoundInterest";
import { DebtPayoff } from "@/app/tools/debt-payoff/DebtPayoff";
import { EmergencyFund } from "@/app/tools/emergency-fund/EmergencyFund";
import { LifeInsuranceNeeds } from "@/app/tools/life-insurance-needs/LifeInsuranceNeeds";
import { RetirementProjector } from "@/app/tools/retirement-projector/RetirementProjector";
import { RothVsTraditional } from "@/app/tools/roth-vs-traditional/RothVsTraditional";
import { TakeHomePay } from "@/app/tools/take-home-pay/TakeHomePay";
import { TOOL_CARD_DEFAULTS, type ToolSlug } from "./share-card-data";

afterEach(cleanup);

const TOOLS: Array<{ slug: ToolSlug; component: () => React.JSX.Element }> = [
  { slug: "budget", component: Budget },
  { slug: "compound-interest", component: CompoundInterest },
  { slug: "debt-payoff", component: DebtPayoff },
  { slug: "emergency-fund", component: EmergencyFund },
  { slug: "life-insurance-needs", component: LifeInsuranceNeeds },
  { slug: "retirement-projector", component: RetirementProjector },
  { slug: "roth-vs-traditional", component: RothVsTraditional },
  { slug: "take-home-pay", component: TakeHomePay },
];

describe("ShareResultButton on every tool", () => {
  for (const { slug, component } of TOOLS) {
    it(`renders on the ${slug} tool`, () => {
      render(createElement(component));
      const button = screen.getByRole("button", { name: "Share your result" });
      expect(button).toBeTruthy();
      expect(button.getAttribute("data-tool-path")).toBe(`/tools/${slug}`);
    });
  }

  it("shows the tool's own computed headline at default inputs", () => {
    for (const { slug, component } of TOOLS) {
      const { unmount } = render(createElement(component));
      const button = screen.getByRole("button", { name: "Share your result" });
      const expected = TOOL_CARD_DEFAULTS[slug];
      expect(button.getAttribute("data-headline-number")).toBe(expected.headlineNumber);
      expect(button.getAttribute("data-headline-label")).toBe(expected.headlineLabel);
      expect(button.getAttribute("data-tool-name")).toBe(expected.toolName);
      unmount();
    }
  });

  it("exposes the risk line on the honestly-calculator tools", () => {
    const { unmount: unmountRetirement } = render(createElement(RetirementProjector));
    const retirementButton = screen.getByRole("button", { name: "Share your result" });
    expect(retirementButton.getAttribute("data-risk-line")).toBe(
      TOOL_CARD_DEFAULTS["retirement-projector"].riskLine,
    );
    expect(retirementButton.getAttribute("data-risk-line")).toContain("26 of the last 98 years");
    unmountRetirement();

    const { unmount: unmountDebt } = render(createElement(DebtPayoff));
    const debtButton = screen.getByRole("button", { name: "Share your result" });
    expect(debtButton.getAttribute("data-risk-line")).toBe(
      TOOL_CARD_DEFAULTS["debt-payoff"].riskLine,
    );
    expect(debtButton.getAttribute("data-risk-line")).toMatch(/^Minimums only: /);
    unmountDebt();
  });
});

/** A recording stand-in for CanvasRenderingContext2D. */
function fakeCanvasContext() {
  const calls: Array<{ method: string; args: unknown[] }> = [];
  const ctx = new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === "measureText") return () => ({ width: 100 });
        if (typeof prop === "string") {
          return (...args: unknown[]) => {
            calls.push({ method: prop, args });
          };
        }
        return undefined;
      },
      set(_target, prop, value) {
        calls.push({ method: `set:${String(prop)}`, args: [value] });
        return true;
      },
    },
  );
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
}

describe("share flow", () => {
  let createdAnchors: HTMLAnchorElement[];

  beforeEach(() => {
    createdAnchors = [];
    const originalCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation(((
      tag: string,
      options?: ElementCreationOptions,
    ) => {
      const el = originalCreate(tag, options);
      if (tag === "a") createdAnchors.push(el as HTMLAnchorElement);
      return el;
    }) as typeof document.createElement);
    URL.createObjectURL = vi.fn(() => "blob:fake-card") as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function stubCanvas() {
    const { ctx, calls } = fakeCanvasContext();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
    ) {
      callback(new Blob(["fake-png"], { type: "image/png" }));
    } as unknown as typeof HTMLCanvasElement.prototype.toBlob);
    return calls;
  }

  it("draws the branded card and downloads the PNG when Web Share is unavailable", async () => {
    const calls = stubCanvas();
    render(createElement(Budget));
    fireEvent.click(screen.getByRole("button", { name: "Share your result" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy());

    const texts = calls.filter((c) => c.method === "fillText").map((c) => c.args[0]);
    expect(texts).toContain("$300");
    expect(texts).toContain("Left over each month");
    expect(texts).toContain("Christian Brinkley");
    expect(texts).toContain("christianbrinkleync.com");
    const fills = calls.filter((c) => c.method === "set:fillStyle").map((c) => c.args[0]);
    expect(fills).toContain("#152e34");
    expect(createdAnchors.some((a) => a.download === "budget-result.png")).toBe(true);
  });

  it("uses the Web Share sheet with the image file when the browser supports it", async () => {
    const calls = stubCanvas();
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "canShare", {
      value: () => true,
      configurable: true,
    });
    Object.defineProperty(window.navigator, "share", { value: share, configurable: true });
    try {
      render(createElement(Budget));
      fireEvent.click(screen.getByRole("button", { name: "Share your result" }));
      await waitFor(() => expect(screen.getByRole("button", { name: "Shared" })).toBeTruthy());
      expect(share).toHaveBeenCalledTimes(1);
      const [payload] = share.mock.calls[0] as Array<{
        files: File[];
        title: string;
        text: string;
      }>;
      expect(payload.files).toHaveLength(1);
      expect(payload.files[0].name).toBe("budget-result.png");
      expect(payload.files[0].type).toBe("image/png");
      expect(payload.text).toContain("$300");
      expect(createdAnchors).toHaveLength(0);
      expect(calls.some((c) => c.method === "fillText" && c.args[0] === "$300")).toBe(true);
    } finally {
      delete (window.navigator as unknown as Record<string, unknown>).canShare;
      delete (window.navigator as unknown as Record<string, unknown>).share;
    }
  });
});
