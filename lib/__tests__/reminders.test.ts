import { describe, expect, it } from "vitest";

import {
  getNextAepReminder,
  getT65Dates,
  getT65Window,
  isValidBirthMonth,
  isValidBirthYear,
  selectableBirthYears,
} from "@/lib/reminders";

const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));

describe("getT65Window", () => {
  it("opens three months before the birthday month and closes three after", () => {
    // Turns 65 in June 2027.
    const w = getT65Window(6, 1962, utc(2026, 8, 21));

    expect(w.opensOn.toISOString().slice(0, 10)).toBe("2027-03-01");
    expect(w.birthdayMonth.toISOString().slice(0, 10)).toBe("2027-06-01");
    expect(w.closesOn.toISOString().slice(0, 10)).toBe("2027-09-30");
  });

  it("emails two weeks before the window opens", () => {
    const w = getT65Window(6, 1962, utc(2026, 8, 21));
    expect(w.sendOn.toISOString().slice(0, 10)).toBe("2027-02-15");
  });

  it("handles a January birthday, where the window opens in the previous year", () => {
    const w = getT65Window(1, 1962, utc(2026, 8, 21));

    expect(w.opensOn.toISOString().slice(0, 10)).toBe("2026-10-01");
    expect(w.closesOn.toISOString().slice(0, 10)).toBe("2027-04-30");
    expect(w.sendOn.toISOString().slice(0, 10)).toBe("2026-09-17");
  });

  it("handles a December birthday, where the window closes in the following year", () => {
    const w = getT65Window(12, 1962, utc(2026, 8, 21));

    expect(w.opensOn.toISOString().slice(0, 10)).toBe("2027-09-01");
    expect(w.closesOn.toISOString().slice(0, 10)).toBe("2028-03-31");
  });

  it("reports status against the window, not the birthday", () => {
    // Turns 65 in June 2026; window ran March–September 2026.
    expect(getT65Window(6, 1961, utc(2026, 1, 10)).status).toBe("upcoming");
    expect(getT65Window(6, 1961, utc(2026, 3, 1)).status).toBe("open");
    expect(getT65Window(6, 1961, utc(2026, 8, 21)).status).toBe("open");
    expect(getT65Window(6, 1961, utc(2026, 9, 30)).status).toBe("open");
    expect(getT65Window(6, 1961, utc(2026, 10, 1)).status).toBe("closed");
  });

  it("treats the first and last day of the window as inside it", () => {
    const opensOn = getT65Window(6, 1961).opensOn;
    const closesOn = getT65Window(6, 1961).closesOn;

    expect(getT65Window(6, 1961, opensOn).status).toBe("open");
    expect(getT65Window(6, 1961, closesOn).status).toBe("open");
  });
});

describe("getNextAepReminder", () => {
  it("targets October 1 of this year when that is still ahead", () => {
    const { sendOn, opensOn } = getNextAepReminder(utc(2026, 8, 21));
    expect(sendOn.toISOString().slice(0, 10)).toBe("2026-10-01");
    expect(opensOn.toISOString().slice(0, 10)).toBe("2026-10-15");
  });

  it("rolls to next year once this year's date has passed", () => {
    const { sendOn } = getNextAepReminder(utc(2026, 11, 20));
    expect(sendOn.toISOString().slice(0, 10)).toBe("2027-10-01");
  });

  it("still sends this year when asked on October 1 itself", () => {
    const { sendOn } = getNextAepReminder(utc(2026, 10, 1));
    expect(sendOn.toISOString().slice(0, 10)).toBe("2026-10-01");
  });
});

describe("input validation", () => {
  it("accepts real months only", () => {
    expect(isValidBirthMonth(1)).toBe(true);
    expect(isValidBirthMonth(12)).toBe(true);
    expect(isValidBirthMonth(0)).toBe(false);
    expect(isValidBirthMonth(13)).toBe(false);
    expect(isValidBirthMonth("6")).toBe(false);
  });

  it("accepts birth years near the Medicare window and rejects nonsense", () => {
    const today = utc(2026, 8, 21);
    expect(isValidBirthYear(1962, today)).toBe(true);
    expect(isValidBirthYear(1900, today)).toBe(false);
    expect(isValidBirthYear(2020, today)).toBe(false);
    expect(isValidBirthYear(null, today)).toBe(false);
  });

  it("offers a span of birth years that validation will accept", () => {
    const today = utc(2026, 8, 21);
    for (const year of selectableBirthYears(today)) {
      expect(isValidBirthYear(year, today)).toBe(true);
    }
  });
});

describe("getT65Dates", () => {
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  it("sets the deadline at the end of the month before the birthday month", () => {
    // Turns 65 in June 2027, so the last on-time month is May.
    const d = getT65Dates(6, 1962);
    expect(iso(d.signUpBy)).toBe("2027-05-31");
    expect(iso(d.coverageStarts)).toBe("2027-06-01");
  });

  it("runs the Medigap window six months inclusive of the birthday month", () => {
    const d = getT65Dates(6, 1962);
    expect(iso(d.medigapOpens)).toBe("2027-06-01");
    expect(iso(d.medigapCloses)).toBe("2027-11-30");
  });

  it("rolls back a year for a January birthday", () => {
    const d = getT65Dates(1, 1962);
    expect(iso(d.signUpBy)).toBe("2026-12-31");
    expect(iso(d.coverageStarts)).toBe("2027-01-01");
    expect(iso(d.medigapCloses)).toBe("2027-06-30");
  });

  it("rolls forward a year for a December birthday", () => {
    const d = getT65Dates(12, 1962);
    expect(iso(d.signUpBy)).toBe("2027-11-30");
    expect(iso(d.coverageStarts)).toBe("2027-12-01");
    expect(iso(d.medigapCloses)).toBe("2028-05-31");
  });

  it("keeps the Medigap window inside the enrollment window it depends on", () => {
    // Medigap opens the month Part B starts, never before the IEP does.
    for (let month = 1; month <= 12; month += 1) {
      const w = getT65Window(month, 1962, new Date(Date.UTC(2026, 7, 21)));
      const d = getT65Dates(month, 1962);
      expect(d.medigapOpens.getTime()).toBeGreaterThan(w.opensOn.getTime());
      expect(d.signUpBy.getTime()).toBeLessThan(d.coverageStarts.getTime());
    }
  });
});
