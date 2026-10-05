import { describe, expect, it } from "vitest";

import { calLinkFrom } from "@/components/CalEmbed";

describe("embedding the Cal.com calendar", () => {
  it("reads the user/event path from a Cal.com booking link", () => {
    expect(calLinkFrom("https://cal.com/christianbrinkleync/medicare-questions")).toBe(
      "christianbrinkleync/medicare-questions",
    );
    expect(calLinkFrom("https://app.cal.com/christianbrinkleync/life-insurance-conversation/")).toBe(
      "christianbrinkleync/life-insurance-conversation",
    );
  });

  it("refuses anything it should not frame", () => {
    expect(calLinkFrom("http://cal.com/a/b")).toBeNull();
    expect(calLinkFrom("https://calendly.com/a/b")).toBeNull();
    expect(calLinkFrom("https://evil.example/cal.com/a/b")).toBeNull();
    expect(calLinkFrom("https://cal.com/only-user")).toBeNull();
    expect(calLinkFrom("https://cal.com/a/b?x=<script>")).toBe("a/b");
    expect(calLinkFrom("not a url")).toBeNull();
  });
});
