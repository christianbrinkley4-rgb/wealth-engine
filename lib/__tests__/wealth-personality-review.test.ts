// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PersonalityQuiz } from "@/app/wealth/quiz/money-personality/PersonalityQuiz";
import { PERSONALITIES, PERSONALITY_QUESTIONS } from "@/lib/wealth/quizzes";

vi.mock("@/app/wealth/ui/Confetti", () => ({ Confetti: () => null }));
vi.mock("@/app/wealth/ui/hooks", () => ({ useMarkExplored: () => undefined }));

let reduced = false;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("React", React);
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduced })));
  reduced = false;
  window.history.replaceState({}, "", "/wealth/quiz/money-personality");
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function choose(position: number) {
  fireEvent.click(document.querySelectorAll<HTMLButtonElement>(".w-option")[position]);
}
function finishDelay() {
  act(() => vi.advanceTimersByTime(300));
}

describe("money personality quiz review", () => {
  for (const personality of PERSONALITIES) {
    it(`completes all 8 answers for ${personality.id}, focuses results and shares its own path`, async () => {
      const share = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "share", { configurable: true, value: share });
      render(React.createElement(PersonalityQuiz));
      for (const question of PERSONALITY_QUESTIONS) {
        expect(screen.getByRole("heading", { name: question.question })).toBeTruthy();
        // The display order of the type data need not match its answer position.
        const answerPosition = question.options.findIndex((option) => option.type === personality.id);
        choose(answerPosition);
        finishDelay();
      }
      const result = screen.getByRole("heading", { name: personality.name });
      expect(document.activeElement).toBe(result);
      await act(async () => fireEvent.click(screen.getByRole("button", { name: "Share my result" })));
      expect(share).toHaveBeenCalledWith(expect.objectContaining({
        url: `${window.location.origin}/wealth/quiz/money-personality/${personality.id}`,
      }));
      fireEvent.click(screen.getByRole("button", { name: "Take it again" }));
      expect(document.activeElement).toBe(screen.getByRole("heading", { name: PERSONALITY_QUESTIONS[0].question }));
      expect(document.querySelectorAll(".w-option")).toHaveLength(4);
    });
  }

  it("cancels a pending answer when Back is pressed", () => {
    render(React.createElement(PersonalityQuiz));
    choose(0);
    finishDelay();
    choose(1);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    finishDelay();
    expect(screen.getByText("Question 1 of 8")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: PERSONALITY_QUESTIONS[0].question }));
    choose(2);
    finishDelay();
    expect(screen.getByText("Question 2 of 8")).toBeTruthy();
  });

  it("accepts only one answer during the lock-in and clears the timer on unmount", () => {
    const view = render(React.createElement(PersonalityQuiz));
    choose(0);
    choose(1);
    finishDelay();
    expect(screen.getByText("Question 2 of 8")).toBeTruthy();
    const baselineTimers = vi.getTimerCount();
    choose(0);
    expect(vi.getTimerCount()).toBe(baselineTimers + 1);
    view.unmount();
    expect(vi.getTimerCount()).toBeLessThanOrEqual(baselineTimers);
  });

  it("moves straight to the next question with reduced motion", () => {
    reduced = true;
    render(React.createElement(PersonalityQuiz));
    const schedule = vi.spyOn(globalThis, "setTimeout");
    choose(0);
    expect(screen.getByText("Question 2 of 8")).toBeTruthy();
    expect(schedule).not.toHaveBeenCalledWith(expect.any(Function), 300);
    const heading = screen.getByRole("heading", { name: PERSONALITY_QUESTIONS[1].question });
    expect(document.activeElement).toBe(heading);
    expect(document.getElementById(heading.getAttribute("aria-describedby")!)?.textContent).toBe("Question 2 of 8");
  });

  it("limits letter shortcuts to the focused quiz and ignores editable fields and held keys", () => {
    render(React.createElement("div", null,
      React.createElement("input", { "aria-label": "Email" }),
      React.createElement(PersonalityQuiz),
    ));
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "a" });
    fireEvent.keyDown(window, { key: "1" });
    finishDelay();
    expect(screen.getByText("Question 1 of 8")).toBeTruthy();
    const quiz = document.querySelector(".w-quiz")!;
    const editor = document.createElement("div");
    editor.contentEditable = "true";
    editor.setAttribute("contenteditable", "true");
    quiz.append(editor);
    fireEvent.keyDown(editor, { key: "b" });
    const first = document.querySelector<HTMLButtonElement>(".w-option")!;
    fireEvent.keyDown(first, { key: "a", repeat: true });
    finishDelay();
    expect(screen.getByText("Question 1 of 8")).toBeTruthy();
    first.focus();
    fireEvent.keyDown(first, { key: "a" });
    finishDelay();
    expect(screen.getByText("Question 2 of 8")).toBeTruthy();
  });

  for (const personality of PERSONALITIES) {
    it(`opens the legacy ${personality.id} query result and restarts at question 1`, async () => {
      window.history.replaceState({}, "", `?type=${personality.id}`);
      render(React.createElement(PersonalityQuiz));
      await act(async () => { await Promise.resolve(); });
      expect(screen.getByRole("heading", { name: personality.name })).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Take the quiz" }));
      expect(screen.getByText("Question 1 of 8")).toBeTruthy();
    });
  }

  for (const value of ["__proto__", "constructor", "<script>alert(1)</script>", "../../vault", "vault%00"]) {
    it(`ignores hostile or unknown query value ${value}`, async () => {
      window.history.replaceState({}, "", `?type=${encodeURIComponent(value)}`);
      render(React.createElement(PersonalityQuiz));
      await act(async () => { await Promise.resolve(); });
      expect(screen.getByText("Question 1 of 8")).toBeTruthy();
      expect(document.querySelector(".w-result")).toBeNull();
    });
  }
});
