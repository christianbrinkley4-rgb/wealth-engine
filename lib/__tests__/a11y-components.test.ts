import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..", "..");

describe("accessibility: interactive components", () => {
  it("slider thumb meets minimum touch target and has focus ring", () => {
    const src = readFileSync(join(root, "components/ui/slider.tsx"), "utf8");
    // Thumb must be at least 28px (h-8/w-8) for the 65+ audience
    expect(src).toMatch(/h-8 w-8/);
    // Must have visible focus indicator
    expect(src).toContain("focus-visible:ring-");
    // Must have accessible name
    expect(src).toContain('aria-label="Slider thumb"');
  });

  it("stepper field has 48px buttons, labels, and live region", () => {
    const src = readFileSync(join(root, "components/ui/stepper-field.tsx"), "utf8");
    // Buttons must be 48px (size-12)
    expect(src).toContain("size-12");
    // Buttons must have accessible labels
    expect(src).toMatch(/aria-label=\{`Lower /);
    expect(src).toMatch(/aria-label=\{`Raise /);
    // Input must have accessible label
    expect(src).toContain("aria-label={label}");
    // Screen reader live region for value changes
    expect(src).toContain('aria-live="polite"');
    expect(src).toContain('role="status"');
    // Focus indicators must be present, not removed
    expect(src).toContain("focus-visible:outline");
  });

  it("input has focus indicator and min 44px height", () => {
    const src = readFileSync(join(root, "components/ui/input.tsx"), "utf8");
    expect(src).toContain("min-h-11");
    expect(src).toContain("focus-visible:");
  });

  it("button meets 44px minimum on all sizes", () => {
    const src = readFileSync(join(root, "components/ui/button.tsx"), "utf8");
    // All sizes use min-h-11 (44px)
    expect(src).toMatch(/default: "min-h-11/);
    expect(src).toMatch(/sm: "min-h-11/);
    expect(src).toMatch(/lg: "min-h-11/);
    expect(src).toMatch(/icon: "min-h-11 min-w-11"/);
  });

  it("reduced-motion is respected globally", () => {
    const css = readFileSync(join(root, "app/globals.css"), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("mobile menu manages focus for keyboard users", () => {
    const src = readFileSync(join(root, "app/components/TopRouteChrome.tsx"), "utf8");
    // Focus moves into menu on open
    expect(src).toContain('document.querySelector("#site-menu a")');
    // Focus returns to menu button on close
    expect(src).toContain('document.querySelector(".nav-menu-button")');
    // Escape closes the menu
    expect(src).toContain('event.key === "Escape"');
    // Menu button has proper ARIA
    expect(src).toContain('aria-expanded={menuOpen}');
    expect(src).toContain('aria-controls="site-menu"');
  });

  it("breadcrumb uses semantic list structure", () => {
    const src = readFileSync(join(root, "app/components/ServiceHero.tsx"), "utf8");
    expect(src).toContain('aria-label="Breadcrumb"');
    expect(src).toContain("<ol>");
    expect(src).toContain('aria-current="page"');
  });

  it("decorative brand image has empty alt", () => {
    const src = readFileSync(join(root, "app/components/TopRouteChrome.tsx"), "utf8");
    // Brand image next to visible name text should be decorative
    expect(src).toMatch(/alt=""/);
  });
});
