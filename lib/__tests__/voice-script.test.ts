import { describe, expect, it } from "vitest";

import { checkRetirement } from "@/lib/retirementChecker";
import {
  answerWith,
  currentStep,
  getStep,
  goBack,
  normalizeSpeech,
  parseAmount,
  parseYesNo,
  respond,
  resultsSpeech,
  sortFindings,
  spokenPhone,
  startConversation,
  toCheckerInputs,
  type StepId,
  type VoiceState,
} from "@/lib/voiceScript";

const TODAY = new Date("2026-11-05T12:00:00");
const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);

/** What a step makes of one spoken answer, after normalization. */
function heard(step: StepId, text: string) {
  return getStep(step).parse(normalizeSpeech(text));
}

/** Run a whole conversation from spoken lines. */
function converse(lines: string[]) {
  let turn = startConversation();
  const said = [turn.say];
  for (const line of lines) {
    turn = respond(turn.state, [line], TODAY);
    said.push(turn.say);
    if (turn.kind !== "ask") break;
  }
  return { turn, said };
}

describe("normalizeSpeech", () => {
  it.each([
    ["Nineteen fifty eight", "1958"],
    ["June nineteen fifty-eight.", "june 1958"],
    ["twenty twenty four", "2024"],
    ["forty thousand dollars", "40000 dollars"],
    ["about forty-five thousand", "about 45000"],
    ["one hundred and fifty thousand", "150000"],
    ["$40,000", "$40000"],
    ["$1,250,000", "$1250000"],
    ["40 thousand", "40000"],
    ["Yes.", "yes"],
    ["I don't know!", "i don't know"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeSpeech(input)).toBe(expected);
  });
});

describe("parseAmount", () => {
  it.each([
    ["$40000", 40000],
    ["40k", 40000],
    ["about 30 grand", 30000],
    ["1.5 million", 1500000],
    ["no", null],
  ])("%s -> %s", (input, expected) => {
    expect(parseAmount(normalizeSpeech(input))).toBe(expected);
  });
});

describe("parseYesNo", () => {
  it.each([
    ["Yes", "yes"],
    ["yeah I am", "yes"],
    ["I think so", "yes"],
    ["Nope", "no"],
    ["No, we're not", "no"],
    ["I don't think so", "no"],
    ["not yet", "no"],
    ["I'm not sure", null],
    ["I don't know", null],
    ["purple", null],
  ])("%s -> %s", (input, expected) => {
    expect(parseYesNo(normalizeSpeech(input))).toBe(expected);
  });
});

describe("birth date", () => {
  it.each([
    ["June 1958", "1958-6"],
    ["I was born in June of 1958", "1958-6"],
    ["june nineteen fifty eight", "1958-6"],
    ["Sept 1961", "1961-9"],
    ["6/1958", "1958-6"],
    ["March of 62", "1962-3"],
  ])("%s", (input, token) => {
    expect(heard("birth", input)).toBe(token);
  });

  it.each(["1958", "June", "June 2030", "my birthday"])("rejects %s", (input) => {
    expect(heard("birth", input)).toBeNull();
  });
});

describe("Medicare status, including common mishearings", () => {
  it.each([
    ["not yet", "none"],
    ["No, I don't have Medicare", "none"],
    ["Part A only", "part_a_only"],
    ["just part a", "part_a_only"],
    ["I have part A but not part B", "part_a_only"],
    ["I don't have part B", "part_a_only"],
    ["Part A and Part B", "part_a_and_b"],
    ["both", "part_a_and_b"],
    ["a and b", "part_a_and_b"],
    ["part bee", "part_a_and_b"],
    ["I have a Medicare Advantage plan", "part_a_and_b"],
    ["I have a supplement", "part_a_and_b"],
  ])("%s -> %s", (input, token) => {
    expect(heard("medicare", input)).toBe(token);
  });

  it.each(["yes", "just a minute", "I have Medicare"])("asks again for %s", (input) => {
    expect(heard("medicare", input)).toBeNull();
  });
});

describe("other coverage", () => {
  it.each([
    ["COBRA", "cobra"],
    ["copra from my old job", "cobra"],
    ["through my job", "employer_active"],
    ["my husband's work insurance", "employer_active"],
    ["retiree coverage from the state", "retiree"],
    ["the State Health Plan", "retiree"],
    ["from my previous employer", "retiree"],
    ["Obamacare", "marketplace"],
    ["a marketplace plan", "marketplace"],
    ["just Medicare", "medicare_only"],
    ["Medicare", "medicare_only"],
    ["I'm retired, I have a supplement", "medicare_only"],
    ["none", "none"],
    ["no other insurance", "none"],
  ])("%s -> %s", (input, token) => {
    expect(heard("coverage", input)).toBe(token);
  });

  it("does not read 'I don't work' as coverage through a job", () => {
    expect(heard("coverage", "I don't work anymore, just Medicare")).toBe("medicare_only");
    expect(heard("coverage", "I stopped working")).toBeNull();
  });
});

describe("employer size", () => {
  it.each([
    ["20 or more", "20_plus"],
    ["more than twenty", "20_plus"],
    ["it's a big company", "20_plus"],
    ["about 50 people", "20_plus"],
    ["fewer than 20", "under_20"],
    ["only 8 of us", "under_20"],
    ["a small business", "under_20"],
    ["I'm not sure", "unknown"],
  ])("%s -> %s", (input, token) => {
    expect(heard("employerSize", input)).toBe(token);
  });
});

describe("work earnings", () => {
  it.each([
    ["No, I'm retired", "0"],
    ["not working", "0"],
    ["yes about 30 thousand", "30000"],
    ["$24,000", "24000"],
    ["forty five thousand dollars", "45000"],
  ])("%s -> %s", (input, token) => {
    expect(heard("wages", input)).toBe(token);
  });

  it("asks for a number when someone only says they still work", () => {
    expect(heard("wages", "yes I'm still working")).toBeNull();
  });
});

describe("tax filing", () => {
  it.each([
    ["single", "individual"],
    ["married filing jointly", "married_jointly"],
    ["jointly with my wife", "married_jointly"],
    ["married filing separately", "individual"],
    ["head of household", "individual"],
    ["I'm a widow", "individual"],
  ])("%s -> %s", (input, token) => {
    expect(heard("filing", input)).toBe(token);
  });
});

describe("life change answers", () => {
  it.each([
    ["my husband passed away last year", "yes"],
    ["I retired in 2025", "yes"],
    ["yes", "yes"],
    ["no", "no"],
    ["no, I didn't retire", "no"],
  ])("%s -> %s", (input, token) => {
    expect(heard("lifeChange", input)).toBe(token);
  });
});

describe("conversation flow", () => {
  it("opens by saying it's automated and asking the birth date", () => {
    const turn = startConversation();
    expect(turn.say).toMatch(/tap an answer/);
    expect(turn.say).toMatch(/month and year were you born/);
  });

  it("confirms each answer back before the next question", () => {
    const turn = respond(startConversation().state, ["June 1958"], TODAY);
    expect(turn.say).toBe("Got it: June 1958. " + getStep("medicare").question);
  });

  it("runs the COBRA trap end to end and reads the same findings the form shows", () => {
    const { turn, said } = converse([
      "June 1958",
      "Part A only",
      "COBRA from the school district",
      "no",
      "not yet",
      "single",
      "no",
      "no",
    ]);
    expect(turn.kind).toBe("results");
    const direct = checkRetirement(toCheckerInputs(turn.state.answers), TODAY);
    expect(turn.findings).toEqual(direct);
    expect(turn.findings?.some((f) => f.title.includes("COBRA"))).toBe(true);
    expect(turn.say).toContain("COBRA");
    expect(said.at(-2)).toMatch(/Roth IRA/);
  });

  it("asks follow-ups only when they apply", () => {
    let state = startConversation().state;
    const ask = (token: string) => {
      const turn = answerWith(state, token, TODAY);
      state = turn.state;
      return turn;
    };
    ask("1958-6");
    ask("part_a_and_b");
    expect(currentStep(state)?.id).toBe("partBStart");
    ask("2023-6");
    ask("employer_active");
    expect(currentStep(state)?.id).toBe("employerSize");
    ask("under_20");
    ask("yes"); // HSA
    ask("yes"); // Social Security
    expect(currentStep(state)?.id).toBe("wages");
    ask("30000");
    ask("married_jointly");
    ask("yes"); // IRMAA
    expect(currentStep(state)?.id).toBe("lifeChange");
    ask("yes");
    ask("yes"); // Roth
    expect(currentStep(state)?.id).toBe("income");
    ask("120000");
    const last = ask("50000");
    expect(last.kind).toBe("results");
    expect(toCheckerInputs(state.answers)).toEqual({
      birthMonth: 6,
      birthYear: 1958,
      medicare: "part_a_and_b",
      partBStart: { month: 6, year: 2023 },
      coverage: "employer_active",
      employerSize: "under_20",
      contributesToHsa: true,
      collectsSocialSecurity: true,
      filingStatus: "married_jointly",
      incomeThisYear: 120000,
      rothConversion: 50000,
      recentLifeChange: true,
      payingIrmaa: true,
      wagesThisYear: 30000,
    });
  });

  it("goes back one question and forgets that answer", () => {
    const first = respond(startConversation().state, ["June 1958"], TODAY);
    const second = respond(first.state, ["part a only"], TODAY);
    const back = respond(second.state, ["go back"], TODAY);
    expect(back.state.answers.medicare).toBeUndefined();
    expect(back.state.answers.birth).toEqual({ month: 6, year: 1958 });
    expect(back.say).toMatch(/go back.*Medicare yet/);
    expect(goBack(startConversation().state).say).toMatch(/first question/);
  });

  it("repeats, helps, and stops on request", () => {
    const state = startConversation().state;
    expect(respond(state, ["can you repeat that"], TODAY).say).toBe(getStep("birth").question);
    expect(respond(state, ["what are my options"], TODAY).say).toBe(getStep("birth").help);
    const stop = respond(state, ["stop"], TODAY);
    expect(stop.kind).toBe("stopped");
  });

  it("does not stop when someone says they stopped working", () => {
    let state: VoiceState = startConversation().state;
    for (const token of ["1958-6", "part_a_only", "medicare_only", "no", "yes"]) {
      state = answerWith(state, token, TODAY).state;
    }
    expect(currentStep(state)?.id).toBe("wages");
    const turn = respond(state, ["I stopped working last year"], TODAY);
    expect(turn.kind).toBe("ask");
    expect(turn.state.answers.wages).toBe(0);
  });

  it("won't skip a required question, but skips optional ones", () => {
    const state = startConversation().state;
    const refused = respond(state, ["I don't know"], TODAY);
    expect(refused.say).toMatch(/I need this one/);
    expect(refused.state.answers.birth).toBeUndefined();

    let s = state;
    for (const token of ["1958-6", "part_a_only", "medicare_only"])
      s = answerWith(s, token, TODAY).state;
    const skipped = respond(s, ["not sure"], TODAY);
    expect(skipped.state.answers.hsa).toBeNull();
    expect(skipped.say).toMatch(/skip that/);
  });

  it("tries the recognizer's other guesses before giving up", () => {
    const turn = respond(startConversation().state, ["chewing 1958", "June 1958"], TODAY);
    expect(turn.state.answers.birth).toEqual({ month: 6, year: 1958 });
  });

  it("offers the on-screen answers after two misses", () => {
    const one = respond(startConversation().state, ["banana"], TODAY);
    expect(one.say).toMatch(/didn't catch that/);
    const two = respond(one.state, ["banana"], TODAY);
    expect(two.say).toMatch(/tap your answer/);
  });
});

describe("spoken results", () => {
  it("reads Christian's number digit by digit", () => {
    expect(spokenPhone("(919) 408-6671")).toBe("9 1 9, 4 0 8, 6 6 7 1");
  });

  it("puts act-soon findings first and ends with the licensed-agent line", () => {
    const findings = checkRetirement(
      toCheckerInputs({
        birth: { month: 6, year: 1958 },
        medicare: "part_a_only",
        coverage: "cobra",
        hsa: true,
        socialSecurity: false,
        filing: "individual",
        irmaa: false,
        roth: false,
      }),
      TODAY,
    );
    const sorted = sortFindings(findings);
    expect(sorted[0].severity).toBe("act_now");
    const speech = resultsSpeech(findings);
    expect(speech).toMatch(/^That's everything\. I found \d+ things? worth a look\./);
    expect(speech).toMatch(/9 1 9, 4 0 8, 6 6 7 1\.$/);
  });

  it("says plainly when nothing came up", () => {
    expect(resultsSpeech([])).toMatch(/none of the common traps came up/);
  });

  it("never speaks a dash or recommends a plan", () => {
    const every = [
      "birth",
      "medicare",
      "partBStart",
      "coverage",
      "employerSize",
      "hsa",
      "socialSecurity",
      "wages",
      "filing",
      "irmaa",
      "lifeChange",
      "roth",
      "income",
      "rothAmount",
    ] as const;
    const lines = every.flatMap((id) => [getStep(id).question, getStep(id).help]);
    lines.push(startConversation().say, resultsSpeech([]));
    for (const line of lines) {
      expect(line).not.toContain(EM);
      expect(line).not.toContain(EN);
      expect(line).not.toMatch(/\b(recommend|best plan|you should buy|switch to)\b/i);
    }
  });
});

describe("review fixes: realistic replies that used to go wrong", () => {
  const atStep = (tokens: string[]) => {
    let s: VoiceState = startConversation().state;
    for (const t of tokens) s = answerWith(s, t, TODAY).state;
    return s;
  };
  const wagesStep = () => atStep(["1958-6", "part_a_only", "medicare_only", "no", "yes"]);

  it("reads curly apostrophes from iPhones correctly", () => {
    expect(parseYesNo(normalizeSpeech("I don’t think so"))).toBe("no");
    expect(parseYesNo(normalizeSpeech("I don’t"))).toBe("no");
  });

  it("only stops on a short stop command, never on 'quit working' or 'stop working'", () => {
    for (const line of ["I quit working in 2021", "I'll stop working next year"]) {
      expect(respond(wagesStep(), [line], TODAY).kind).toBe("ask");
    }
    expect(respond(wagesStep(), ["I quit working in 2021"], TODAY).state.answers.wages).toBe(0);
    for (const line of ["stop", "okay stop", "please stop", "stop please", "goodbye"]) {
      expect(respond(wagesStep(), [line], TODAY).kind).toBe("stopped");
    }
  });

  it("never reads a year as an amount", () => {
    expect(parseAmount(normalizeSpeech("I retired in 2019"))).toBeNull();
    expect(parseAmount(normalizeSpeech("$2,019"))).toBe(2019);
    expect(heard("wages", "No, I retired in 2019")).toBe("0");
  });

  it("treats a negated life event as no", () => {
    expect(heard("lifeChange", "I haven't retired yet")).toBe("no");
    expect(heard("lifeChange", "we didn't lose anyone")).toBe("no");
    expect(heard("lifeChange", "my husband passed away last year")).toBe("yes");
  });

  it("does not read 'not through work' as job coverage", () => {
    expect(heard("coverage", "Not through work, just Medicare")).toBe("medicare_only");
    expect(heard("coverage", "nothing from my job")).toBe("none");
  });

  it("keeps the answer in a hedged reply", () => {
    const birth = respond(startConversation().state, ["I don't remember, June 1958"], TODAY);
    expect(birth.state.answers.birth).toEqual({ month: 6, year: 1958 });
    const income = atStep([
      "1958-6",
      "part_a_only",
      "medicare_only",
      "no",
      "no",
      "individual",
      "no",
      "yes",
    ]);
    expect(currentStep(income)?.id).toBe("income");
    expect(respond(income, ["Not sure, maybe 50 thousand"], TODAY).state.answers.income).toBe(
      50000,
    );
    expect(respond(income, ["no idea"], TODAY).state.answers.income).toBeNull();
  });

  it("reads employer size from numbers before vague words", () => {
    expect(heard("employerSize", "a few hundred")).toBe("20_plus");
    expect(heard("employerSize", "small, about 200 people")).toBe("20_plus");
    expect(heard("employerSize", "fewer than 20")).toBe("under_20");
    expect(heard("employerSize", "more than 50")).toBe("20_plus");
  });

  it("only treats 'again' as a repeat request on its own", () => {
    const coverage = atStep(["1958-6", "part_a_only"]);
    expect(currentStep(coverage)?.id).toBe("coverage");
    const working = respond(coverage, ["I'm working again"], TODAY);
    expect(working.state.answers.coverage).toBe("employer_active");
    expect(respond(coverage, ["again"], TODAY).say).toBe(getStep("coverage").question);
  });
});
