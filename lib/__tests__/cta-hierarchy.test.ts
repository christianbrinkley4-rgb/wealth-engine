// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ConsultationActions } from "@/app/components/ConsultationActions";
import { ArticleBody } from "@/app/components/ArticleBody";
import LandingPage from "@/app/lp/[slug]/page";
import { ARTICLES } from "@/lib/articles";
import { LANDING_PAGES } from "@/lib/landingPages";
import { ENGINE_BOOKING_URL, isMedicareStartHref } from "@/lib/leadEnginePublic";
import { AGENT } from "@/lib/agent";
import PlanEndingHub from "@/app/medicare-plans-ending-2027/page";
import PlanEndingGuilford from "@/app/medicare-plans-ending-2027/guilford-county/page";
import PlanEndingAlamance from "@/app/medicare-plans-ending-2027/alamance-county/page";
import PlanEndingGranville from "@/app/medicare-plans-ending-2027/granville-county/page";
import { StickyCTA } from "@/components/story/StickyCTA";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
vi.mock("next/navigation", () => ({ usePathname: () => "/medicare" }));
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
  it.each(LANDING_PAGES)("keeps landing page actions in their topic: $slug", async (page) => {
    render(await LandingPage({ params: Promise.resolve({ slug: page.slug }) }));
    const medicare = page.compliance === "medicare";
    const actions = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.btn"));
    const requests = actions.filter((link) => link.getAttribute("href") === page.primaryHref);
    const bookings = actions.filter((link) => link.getAttribute("href") === ENGINE_BOOKING_URL);
    expect(requests).toHaveLength(medicare ? 0 : 2);
    expect(bookings).toHaveLength(medicare ? 2 : 0);
    for (const question of screen.queryAllByRole("link", { name: "Or send a question" })) {
      expect(question.getAttribute("href")).toBe(page.primaryHref);
    }
  });
  it.each(["medicare", "care_coverage", "money"])("keeps article-end actions in the %s topic", (topic) => {
    const article = ARTICLES.find((item) => new URL(item.startHref, "https://local.invalid").searchParams.get("topic") === topic)!;
    render(createElement(ArticleBody, { article }));
    const actions = document.querySelector(".art-next-actions")!;
    const booking = actions.querySelector(`a[href="${ENGINE_BOOKING_URL}"]`);
    const request = Array.from(actions.querySelectorAll("a")).find((link) => link.getAttribute("href") === article.startHref)!;
    if (topic === "medicare") {
      expect(booking).not.toBeNull();
      expect(request.textContent).toBe("Or send a question");
    } else {
      expect(booking).toBeNull();
      expect(request.textContent?.trim()).toBe("Ask me your question");
    }
  });
  it("makes header and menu booking primary while preserving the phone", () => {
    render(createElement(TopRouteChrome));
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    for (const selector of [".nav-actions", ".nav-sheet-actions"]) {
      const actions = document.querySelector(selector)!;
      const booking = actions.querySelector(`a[href="${ENGINE_BOOKING_URL}"]`)!;
      const phone = actions.querySelector(`a[href="${AGENT.phoneHref}"]`)!;
      expect(booking.className).not.toContain("btn-outline");
      expect(phone.className).toContain("btn-outline");
    }
  });
  it.each([PlanEndingHub, PlanEndingGuilford, PlanEndingAlamance, PlanEndingGranville])(
    "keeps plan-ending page CTAs and informational heroes intact: %s", (Page) => {
      render(createElement(Page));
      expect(document.querySelector("#page-hero-actions")?.children).toHaveLength(0);
      const bookings = screen.getAllByRole("link", { name: "book a 45-minute phone plan check" });
      expect(bookings).toHaveLength(2);
      for (const booking of bookings) expect(booking.getAttribute("href")).toBe(ENGINE_BOOKING_URL);
      expect(document.body.textContent).toContain("8 organizations which offer 65 products");
    },
  );
  it("gives sticky booking the filled style and phone the secondary style", () => {
    render(createElement(StickyCTA, {
      hidden: false, tucked: false, callHref: AGENT.phoneHref, callLabel: AGENT.phone, onDismiss: vi.fn(),
    }));
    expect(screen.getByRole("link", { name: "Book a phone review" }).className).toBe("scta-call");
    expect(document.querySelector('a[href^="tel:"]')?.className).toBe("scta-second");
  });
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
      expect(booking.className).not.toMatch(/btn-outline|btn-ghost-light/);
      const actions = booking.parentElement!.querySelectorAll("a");
      expect(
        Array.from(actions).some((action) => action.getAttribute("href") === AGENT.phoneHref),
      ).toBe(true);
      expect(document.querySelector('a[href^="tel:"]')?.className).toMatch(/btn-outline|btn-ghost-light/);
      if (kind !== "close") {
        expect(actions[0].getAttribute("href")).toBe(AGENT.phoneHref);
        expect(actions[1]).toBe(booking);
      }
      expect(screen.getByRole("link", { name: "Or send a question" }).getAttribute("href")).toBe(
        kind === "hero" ? hero.secondaryHref : kind === "close" ? "/start" : "/start?topic=medicare&quick=1",
      );
    },
  );
  it.each(["/start", "/start?quick=1", "/start?topic=medicare", "/start?topic=medicare&stage=turning_65_soon"])(
    "recognizes a generic or Medicare-only request: %s", (href) => {
      expect(isMedicareStartHref(href)).toBe(true);
    },
  );
  it.each(["life-insurance", "life_insurance", "final-expense", "care_coverage", "care-coverage", "retirement", "financial_planning", "unknown"])(
    "preserves the %s topic and its label in every shared CTA", (topic) => {
      const href = `/start?topic=${topic}`;
      expect(isMedicareStartHref(href)).toBe(false);
      const label = "Discuss my questions";
      for (const component of [
        createElement(ServiceHero, { ...hero, secondaryHref: href, secondaryLabel: label }),
        createElement(ConsultationActions, { href, label }),
        createElement(KitchenTableClose, { heading: "Questions", body: "Bring your questions.", href, label }),
      ]) {
        const view = render(component);
        expect(screen.getByRole("link", { name: label }).getAttribute("href")).toBe(href);
        expect(document.querySelector(`a[href="${ENGINE_BOOKING_URL}"]`)).toBeNull();
        const question = screen.queryByRole("link", { name: "Or send a question" });
        if (question) expect(question.getAttribute("href")).toBe(href);
        view.unmount();
      }
    },
  );
  it("does not replace mixed topics or a different route", () => {
    expect(isMedicareStartHref("/start?topic=medicare&topic=life_insurance")).toBe(false);
    expect(isMedicareStartHref("/start?topic=")).toBe(false);
    expect(isMedicareStartHref("/start-here")).toBe(false);
  });
  it("respects a custom close destination and label", () => {
    render(createElement(KitchenTableClose, {
      heading: "Read more", body: "Bring your questions.", href: "/learn", label: "Read guides",
    }));
    expect(screen.getByRole("link", { name: "Read guides" }).getAttribute("href")).toBe("/learn");
    expect(screen.queryByRole("link", { name: "Book a 45-minute phone review" })).toBeNull();
  });
  it.each(["close", "custom"])("keeps the Medicare topic on the %s question link", (kind) => {
    render(kind === "close"
      ? createElement(KitchenTableClose, { heading: "Questions", body: "Bring your questions.", href: hero.secondaryHref, label: "Review" })
      : createElement(ConsultationActions, { href: hero.secondaryHref }));
    expect(screen.getByRole("link", { name: "Or send a question" }).getAttribute("href")).toBe(hero.secondaryHref);
  });
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
