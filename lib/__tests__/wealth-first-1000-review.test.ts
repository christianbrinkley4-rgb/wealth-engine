// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FirstThousandQuiz } from "@/app/wealth/quiz/first-1000/FirstThousandQuiz";
import { FIRST_1000_RESULTS, FIRST_1000_START, getPlanResult, getTreeNode } from "@/lib/wealth/quizzes";

vi.mock("@/app/wealth/ui/hooks", () => ({ useMarkExplored: () => {} }));
vi.mock("@/app/wealth/ui/Confetti", () => ({ Confetti: () => null }));
vi.mock("@/app/wealth/ui/controls", () => ({ ShareButton: () => null }));

let reduced = true;
beforeEach(() => {
  reduced = true;
  window.history.replaceState({}, "", "/wealth/quiz/first-1000");
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduced })));
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const routes: { choices: string[]; result: string }[] = [];
function walk(id: string, choices: string[]) {
  for (const option of getTreeNode(id)!.options) {
    const next = [...choices, option.label];
    if (option.next.startsWith("result:")) routes.push({ choices: next, result: option.next.slice(7) });
    else walk(option.next, next);
  }
}
walk(FIRST_1000_START, []);

describe("first $1,000 quiz transitions", () => {
  for (const route of routes) {
    it(`reaches ${route.result} with reduced motion and moves focus to its result`, () => {
      render(createElement(FirstThousandQuiz));
      for (const choice of route.choices) fireEvent.click(screen.getByRole("button", { name: choice }));
      expect(document.activeElement).toBe(screen.getByRole("heading", { name: getPlanResult(route.result)!.title }));
      fireEvent.click(screen.getByRole("button", { name: "Start over" }));
      expect(document.activeElement).toBe(screen.getByRole("heading", { name: getTreeNode(FIRST_1000_START)!.question }));
    });
  }

  it("ignores typing outside the quiz and accepts shortcuts after its heading receives focus", () => {
    render(createElement("div", null, createElement("input", { "aria-label": "Email" }), createElement(FirstThousandQuiz)));
    const input = screen.getByRole("textbox");
    input.focus();
    fireEvent.keyDown(input, { key: "a" });
    expect(screen.getByRole("heading", { name: getTreeNode(FIRST_1000_START)!.question })).toBeTruthy();
    expect(document.activeElement).toBe(input);
    const heading = screen.getByRole("heading");
    heading.focus();
    fireEvent.keyDown(heading, { key: "a" });
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: getTreeNode("cushion-with-debt")!.question }));
  });

  it("cancels a pending answer when Back is pressed", () => {
    vi.useFakeTimers();
    reduced = false;
    render(createElement(FirstThousandQuiz));
    fireEvent.click(screen.getByRole("button", { name: "Yes, I carry a balance" }));
    act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByRole("button", { name: "No, I'd have to borrow" }));
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: getTreeNode(FIRST_1000_START)!.question }));
  });

  it("locks rapid repeated answers and clears the pending timer on unmount", () => {
    vi.useFakeTimers();
    reduced = false;
    const view = render(createElement(FirstThousandQuiz));
    const answer = screen.getByRole("button", { name: "Yes, I carry a balance" });
    fireEvent.click(answer);
    fireEvent.click(answer);
    expect(vi.getTimerCount()).toBe(1);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("first $1,000 shared links", () => {
  for (const result of FIRST_1000_RESULTS) {
    it(`opens and focuses the ${result.id} plan`, async () => {
      window.history.replaceState({}, "", `?plan=${result.id}`);
      await act(async () => { render(createElement(FirstThousandQuiz)); });
      expect(document.activeElement).toBe(screen.getByRole("heading", { name: result.title }));
    });
  }

  it.each(["<script>alert(1)</script>", "__proto__", "result:attack-debt", "", "Infinity"])("ignores hostile or unknown plan %s", async (plan) => {
    window.history.replaceState({}, "", `?plan=${encodeURIComponent(plan)}`);
    await act(async () => { render(createElement(FirstThousandQuiz)); });
    expect(screen.getByRole("heading", { name: getTreeNode(FIRST_1000_START)!.question })).toBeTruthy();
  });
});
