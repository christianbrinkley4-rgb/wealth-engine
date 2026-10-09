import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { expect, it } from "vitest";
import Roth from "@/app/wealth/roth-ira-explained/page";
import Plan from "@/app/wealth/401k-explained/page";
import Hsa from "@/app/wealth/hsa-explained/page";
import Rmd from "@/app/wealth/rmd-explained-73/page";
import Senior from "@/app/guides/standard-deduction-seniors-2026/page";
import Earnings from "@/app/guides/working-while-collecting-social-security/page";
import Irmaa from "@/app/guides/irmaa-brackets-2026/page";
import Home from "@/app/page";
import Guides from "@/app/guides/page";
import Learn from "@/app/wealth/learn/page";
import Loading from "@/app/loading";
import TakeHome from "@/app/tools/take-home-pay/page";
import Compound from "@/app/tools/compound-interest/page";
import Debt from "@/app/tools/debt-payoff/page";
import Compare from "@/app/tools/roth-vs-traditional/page";
import { ROTH_DEFINITION } from "@/lib/editorial";
it.each([Roth, Plan, Hsa, Rmd, Senior, Earnings, Irmaa])(
  "keeps reading links, primary sources, and speech selectors grounded in visible content: %s",
  (Page) => {
    const dom = new JSDOM(renderToStaticMarkup(createElement(Page)));
    const d = dom.window.document;
    expect(d.querySelectorAll("h1").length).toBe(1);
    const contents = d.querySelector("nav[aria-label='On this page']");
    expect(contents).toBeTruthy();
    for (const link of contents!.querySelectorAll("a"))
      expect(d.getElementById(link.hash.slice(1))).toBeTruthy();
    const note = d.querySelector("aside[aria-label='About this information']");
    expect(note?.textContent).toContain("Christian Brinkley");
    expect(note?.querySelectorAll("a[href^='https://']").length).toBeGreaterThan(0);
    const schemas = [...d.querySelectorAll("script[type='application/ld+json']")].map((node) =>
      JSON.parse(node.textContent!),
    );
    const article = schemas.find((schema) => schema["@type"] === "Article");
    expect(article.citation.length).toBeGreaterThan(0);
    for (const selector of article.speakable.cssSelector)
      expect(d.querySelector(selector)).toBeTruthy();
    d.querySelectorAll("script").forEach((node) => node.remove());
    for (const schema of schemas.filter((schema) => schema["@type"] === "FAQPage")) {
      const visible = d.body.textContent || "";
      for (const q of schema.mainEntity) {
        expect(visible).toContain(q.name);
        expect(visible).toContain(q.acceptedAnswer.text);
      }
    }
    dom.window.close();
  },
);
it("can answer what a Roth IRA is using structured data alone", () => {
  const dom = new JSDOM(renderToStaticMarkup(createElement(Roth)));
  const schemas = [
    ...dom.window.document.querySelectorAll("script[type='application/ld+json']"),
  ].map((node) => JSON.parse(node.textContent!));
  const term = schemas.find((schema) => schema["@type"] === "DefinedTerm");
  const article = schemas.find((schema) => schema["@type"] === "Article");
  expect(term.description).toBe(ROTH_DEFINITION.text);
  expect(article.abstract).toBe(term.description);
  expect(article.citation.some((url: string) => url.includes("irs.gov/publications/p590b"))).toBe(
    true,
  );
  dom.window.close();
});

it.each([TakeHome, Compound, Debt, Compare])(
  "keeps calculator outlines and assumptions accessible: %s",
  (Page) => {
    const dom = new JSDOM(renderToStaticMarkup(createElement(Page)));
    const d = dom.window.document;
    const headings = [...d.querySelectorAll("h1,h2,h3,h4")].map((node) => Number(node.tagName[1]));
    expect(headings.filter((level) => level === 1)).toHaveLength(1);
    headings
      .slice(1)
      .forEach((level, index) => expect(level).toBeLessThanOrEqual(headings[index] + 1));
    expect(
      d.querySelector("aside[aria-label='About this information'] a[href^='https://']"),
    ).toBeTruthy();
    expect(d.querySelector(".t-assume")?.textContent).toBeTruthy();
    dom.window.close();
  },
);
it("connects the homepage to educational collections and their articles", () => {
  const home = new JSDOM(renderToStaticMarkup(createElement(Home)));
  for (const path of ["/wealth/learn", "/guides", "/tools", "/editorial-policy"])
    expect(
      [...home.window.document.querySelectorAll("main a")].some(
        (link) => link.getAttribute("href") === path,
      ),
    ).toBe(true);
  const guides = new JSDOM(renderToStaticMarkup(createElement(Guides)));
  expect(guides.window.document.querySelectorAll("main ul a").length).toBe(10);
  const learn = new JSDOM(renderToStaticMarkup(createElement(Learn)));
  expect(learn.window.document.querySelector("a[href='/wealth/roth-ira-explained']")).toBeTruthy();
  for (const dom of [home, guides, learn]) dom.window.close();
});
it("announces route loading without animation", () => {
  const dom = new JSDOM(renderToStaticMarkup(createElement(Loading)));
  expect(dom.window.document.querySelector("[role=status]")?.textContent).toContain("Loading");
  dom.window.close();
});
