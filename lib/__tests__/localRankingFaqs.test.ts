import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  getTriadCity,
  lifeCityFaqs,
  medicareCityFaqs,
  retirementCityFaqs,
  TRIAD_CITIES,
} from "@/lib/triad";

const MEDICARE_AGENT_IN_CITY = /are you a .*medicare.*agent in/i;

function page(rel: string) {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

describe("local ranking FAQs stay on the page and in FAQ schema", () => {
  it("turning-65 keeps Triad meeting and county questions in the shared FAQ array", () => {
    const src = page("../../app/turning-65/page.tsx");
    expect(src).toContain("Do you meet in person in Greensboro?");
    expect(src).toContain("I am still working. Do I have to sign up at 65?");
    expect(src).toContain(
      "I live in High Point or Winston-Salem. Can we still meet before I turn 65?",
    );
    expect(src).toContain("Does it matter whether I live in Guilford County or Forsyth County?");
    expect(src).toContain("faqJsonLd(FAQ)");
  });

  it("annual-enrollment keeps a county FAQ in the shared FAQ array", () => {
    const src = page("../../app/annual-enrollment/page.tsx");
    expect(src).toContain(
      "Do Medicare Advantage plans differ across Greensboro, High Point, and Winston-Salem?",
    );
    expect(src).toContain("faqJsonLd(FAQ)");
  });

  it("keep-my-doctor keeps a cross-city specialist FAQ in the shared FAQ array", () => {
    const src = page("../../app/keep-my-doctor/page.tsx");
    expect(src).toContain(
      "I live in Greensboro and see a specialist in Winston-Salem. Can I keep both?",
    );
    expect(src).toContain("faqJsonLd(FAQ)");
  });

  it("city Medicare pages say a licensed agent serves that city and schema the same FAQs", () => {
    const src = page("../../app/medicare-in/[city]/page.tsx");
    const triad = page("../../lib/triad.ts");
    expect(src).toContain("I’m a licensed Medicare agent serving {city.name}");
    expect(src).toContain("medicareCityFaqs(city)");
    expect(src).toContain("faqJsonLd(cityFaqs)");
    expect(src).toContain("{cityFaqs.map((item) => (");
    expect(triad).toContain("Are you a licensed Medicare agent in ${city.name}?");
  });

  it("city life and retirement pages schema the featured-city FAQs already on the record", () => {
    const src = page("../../app/components/LocalCityServicePage.tsx");
    expect(src).toContain("lifeCityFaqs(city)");
    expect(src).toContain("retirementCityFaqs(city)");
    expect(src).toContain("faqJsonLd(faq)");

    const greensboroLife = lifeCityFaqs(getTriadCity("greensboro")!);
    expect(greensboroLife[0]?.q).toBe("Can you review life insurance in Greensboro?");
    const winstonRetirement = retirementCityFaqs(getTriadCity("winston-salem")!);
    expect(winstonRetirement[0]?.q).toBe("Do you help with retirement questions in Winston-Salem?");

    const kernersvilleLife = lifeCityFaqs(getTriadCity("kernersville")!);
    expect(kernersvilleLife.some((item) => /life insurance in Kernersville/i.test(item.q))).toBe(
      false,
    );
    const kernersvilleRetirement = retirementCityFaqs(getTriadCity("kernersville")!);
    expect(
      kernersvilleRetirement.some((item) => /retirement questions in Kernersville/i.test(item.q)),
    ).toBe(false);
  });

  it("keeps the Greensboro Medicare-agent FAQ on Greensboro only, without stuffing", () => {
    const greensboroQ = "Are you a Medicare insurance agent in Greensboro?";
    const greensboro = getTriadCity("greensboro");
    expect(greensboro?.faq.some((item) => item.q === greensboroQ)).toBe(true);

    for (const city of TRIAD_CITIES) {
      if (city.slug === "greensboro") continue;
      for (const item of [...city.faq, ...city.lifeFaq, ...city.retirementFaq]) {
        expect(item.q, `${city.slug}: ${item.q}`).not.toContain("in Greensboro");
        expect(item.q, `${city.slug}: ${item.q}`).not.toBe(greensboroQ);
      }
    }

    const greensboroRendered = medicareCityFaqs(greensboro!);
    expect(greensboroRendered.filter((item) => MEDICARE_AGENT_IN_CITY.test(item.q))).toHaveLength(
      1,
    );
    expect(greensboroRendered[0]?.q).toBe(greensboroQ);

    for (const slug of ["high-point", "winston-salem"] as const) {
      const city = getTriadCity(slug)!;
      const rendered = medicareCityFaqs(city);
      expect(rendered.some((item) => item.q === greensboroQ)).toBe(false);
      expect(rendered[0]?.q).toBe(`Are you a licensed Medicare agent in ${city.name}?`);
      expect(rendered.filter((item) => MEDICARE_AGENT_IN_CITY.test(item.q))).toHaveLength(1);
    }

    const kernersville = medicareCityFaqs(getTriadCity("kernersville")!);
    expect(kernersville.some((item) => MEDICARE_AGENT_IN_CITY.test(item.q))).toBe(false);
  });

  it("collapses a stuffed second Greensboro agent FAQ to the city-scoped question", () => {
    const greensboro = getTriadCity("greensboro")!;
    const stuffed = {
      ...greensboro,
      faq: [
        ...greensboro.faq,
        {
          q: "Are you a licensed Medicare agent in Greensboro?",
          a: "Yes.",
        },
      ],
    };
    const rendered = medicareCityFaqs(stuffed);
    expect(rendered.filter((item) => MEDICARE_AGENT_IN_CITY.test(item.q))).toHaveLength(1);
    expect(rendered[0]?.q).toBe("Are you a Medicare insurance agent in Greensboro?");
  });
});
