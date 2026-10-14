// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ConsultationActions } from "@/app/components/ConsultationActions";
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
  secondaryLabel: "Request a free consultation",
};
describe("consultation CTA hierarchy", () => {
  it("supplies one secondary request when the page omits optional hero actions", () => {
    render(createElement(ServiceHero, {
      crumbs: hero.crumbs, eyebrow: hero.eyebrow, title: hero.title, lede: hero.lede,
    }));
    expect(document.querySelectorAll("#page-hero-actions a")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Request a free consultation" }).getAttribute("href")).toBe(hero.secondaryHref);
  });
  it("styles the custom dark hero phone as the primary action", () => {
    render(createElement(ConsultationActions, { onDark: true }));
    const actions = document.querySelectorAll("#page-hero-actions a");
    expect(actions).toHaveLength(2);
    expect(actions[0].classList.contains("btn")).toBe(true);
    expect(actions[0].classList.contains("btn-light")).toBe(true);
    expect(actions[1].classList.contains("btn-ghost-light")).toBe(true);
  });
  it("gives a service hero one primary phone action and one secondary form action", () => {
    render(createElement(ServiceHero, hero));
    const actions = document.querySelectorAll("#page-hero-actions a");
    expect(actions).toHaveLength(2);
    expect(actions[0].getAttribute("href")).toBe(AGENT.phoneHref);
    expect(actions[0].className).toContain("btn-light");
    expect(actions[1].className).toContain("btn-ghost-light");
    expect(screen.getAllByRole("link", { name: "Request a free consultation" })).toHaveLength(1);
  });
  it("does not duplicate a secondary action that points to the same phone", () => {
    render(createElement(ServiceHero, { ...hero, secondaryHref: AGENT.phoneHref }));
    expect(document.querySelectorAll("#page-hero-actions a")).toHaveLength(1);
  });
  it("keeps the closing form secondary for calendar and request destinations", () => {
    for (const href of ["/schedule?topic=life_insurance", "/start?topic=life_insurance"]) {
      render(
        createElement(KitchenTableClose, {
          heading: "Review your life insurance",
          body: "Bring your policy.",
          href,
          label: "Request a free consultation",
        }),
      );
      const actions = document.querySelectorAll(".ktc-actions a");
      expect(actions).toHaveLength(2);
      expect(actions[0].getAttribute("href")).toBe(AGENT.phoneHref);
      expect(actions[1].className).toContain("btn-outline");
      cleanup();
    }
  });
  it("keeps educational heroes free of phone sales actions", () => {
    render(createElement(ServiceHero, { ...hero, variant: "info", hidePhoneCta: true }));
    expect(document.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
  });
});
