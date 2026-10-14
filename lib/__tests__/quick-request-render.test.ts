import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { HelpQuiz } from "@/app/start/HelpQuiz";
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams("topic=medicare&quick=1"),
}));
vi.mock("@/hooks/useIsClient", () => ({ useIsClient: () => false }));
vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: () => [
    { topic: null, branchIndex: 0, answers: {}, phase: "topic", skippedFirst: false },
    vi.fn(),
    vi.fn(),
  ],
}));
vi.mock("@/hooks/useQuizTracking", () => ({
  useQuizTracking: () => ({ start: vi.fn(), step: vi.fn(), complete: vi.fn() }),
}));
describe("quick consultation first paint", () => {
  it("renders the contact form before hydration without the full topic quiz", () => {
    const html = renderToStaticMarkup(createElement(HelpQuiz));
    expect(html).toContain("How should I reach you?");
    expect(html).toContain('id="help-quiz-name"');
    expect(html).not.toContain("Pick what you need help with");
    expect(html).not.toContain("Step 1 of 5");
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*disabled=""/);
  });
});
