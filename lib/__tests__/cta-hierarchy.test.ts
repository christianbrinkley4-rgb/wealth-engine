// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ConsultationActions } from "@/app/components/ConsultationActions";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { AGENT } from "@/lib/agent";
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/components/TrackedLink", () => ({
  TrackedLink: ({
    children,
    ctaLocation,
    ...props
  }: {
    children: React.ReactNode;
    ctaLocation?: string;
  }) => createElement("a", { ...props, "data-cta-location": ctaLocation }, children),
}));
vi.mock("@/app/components/TrustFacts", () => ({ TrustFacts: () => null }));
afterEach(cleanup);
const hero = {
  crumbs: [{ name: "Medicare" }],
  eyebrow: "Medicare help",
  title: "Review your coverage",
  lede: "Bring your questions.",
  secondaryHref: "/start?topic=medicare&quick=1",
  secondaryLabel: "Review",
};
describe("booking CTA hierarchy", () => {
  it.each(["hero", "close", "custom"])(
    "provides booking for %s and preserves the phone",
    (kind) => {
      const component =
        kind === "hero"
          ? createElement(ServiceHero, hero)
          : kind === "close"
            ? createElement(KitchenTableClose, {
                heading: "Review",
                body: "Bring your questions.",
                href: "/start",
                label: "Review",
              })
            : createElement(ConsultationActions, { onDark: true });
      render(component);
      const booking = screen.getByRole("link", { name: "Book a 45-minute phone review" });
      expect(booking.getAttribute("href")).toBe(ENGINE_BOOKING_URL);
      expect(booking.getAttribute("target")).toBe("_blank");
      const actions = booking.parentElement!.querySelectorAll("a");
      expect(
        Array.from(actions).some((action) => action.getAttribute("href") === AGENT.phoneHref),
      ).toBe(true);
      if (kind !== "close") {
        expect(actions[0].getAttribute("href")).toBe(AGENT.phoneHref);
        expect(actions[1]).toBe(booking);
      }
      expect(screen.getByRole("link", { name: "Or send a question" }).getAttribute("href")).toBe(
        "/start",
      );
    },
  );
  it("preserves custom hero destinations and labels", () => {
    render(
      createElement(ServiceHero, {
        ...hero,
        secondaryHref: "/learn",
        secondaryLabel: "Read guides",
      }),
    );
    expect(screen.getByRole("link", { name: "Read guides" }).getAttribute("href")).toBe("/learn");
    expect(screen.queryByRole("link", { name: "Or send a question" })).toBeNull();
  });
  it("preserves custom consultation destinations and dark classes", () => {
    render(
      createElement(ConsultationActions, { href: "/learn", label: "Read guides", onDark: true }),
    );
    expect(screen.getByRole("link", { name: "Read guides" }).getAttribute("href")).toBe("/learn");
    expect(document.querySelector('a[href^="tel:"]')?.className).toBe("btn btn-light");
  });
  it("keeps default informational heroes without actions", () => {
    render(createElement(ServiceHero, { ...hero, secondaryHref: undefined, variant: "info" }));
    expect(document.querySelector("#page-hero-actions")?.children).toHaveLength(0);
  });
  it("keeps educational heroes without phone actions", () => {
    render(createElement(ServiceHero, { ...hero, variant: "info", hidePhoneCta: true }));
    expect(document.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
  });
});
