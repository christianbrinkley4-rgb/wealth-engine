"use client";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/app/components/Analytics";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import { CHECKLIST_PRIORITIES, CHECKLIST_SERVICE_COUNTIES, isChecklistServiceCounty, PLAN_COMPARE_URL, SHIIP_CONTACT_URL } from "@/lib/planChecklist";

const STEPS = ["ZIP and county", "Doctors and hospitals", "Prescriptions and pharmacy", "Costs and priorities", "Your research sheet"];
const EMPTY = { zip: "", county: "", doctors: "", hospitals: "", prescriptions: "", pharmacy: "", travel: "", budget: "" };
type Field = keyof typeof EMPTY;

/** Entries live only in React state. No persistence, form endpoint or URL parameters. */
export function PlanChecklist() {
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState(EMPTY);
  const [priorities, setPriorities] = useState<string[]>([]);
  const started = useRef(false);
  const completed = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [step]);
  function start() {
    if (!started.current) { started.current = true; trackEvent("checklist_start"); }
  }
  function update(field: Field, value: string) { start(); setEntries(previous => ({ ...previous, [field]: value })); }
  function next() {
    start();
    if (step === 3 && !completed.current) {
      // Empty optional steps are valid, and still represent a deliberate checklist run.
      start(); completed.current = true; trackEvent("checklist_complete");
    }
    setStep(value => Math.min(4, value + 1));
  }
  function clear() { setEntries(EMPTY); setPriorities([]); setStep(0); }
  function field(name: Field, label: string, hint: string, multiline = true) {
    const id = `checklist-${name}`;
    return <div className="checklist-field"><label htmlFor={id}>{label}</label><p id={`${id}-hint`}>{hint}</p>
      {multiline ? <textarea id={id} rows={4} maxLength={2000} value={entries[name]} onChange={e => update(name, e.target.value)} aria-describedby={`${id}-hint`} /> :
        <input id={id} type="text" maxLength={name === "zip" ? 5 : 160} inputMode={name === "zip" ? "numeric" : undefined} value={entries[name]} onChange={e => update(name, e.target.value)} aria-describedby={`${id}-hint`} />}</div>;
  }
  return <section className="checklist app-shell max-w-3xl" aria-label="Medicare research checklist">
    <p className="checklist-progress" aria-live="polite">{step < 4 ? `Step ${step + 1} of 4` : "Ready to carry forward"}</p>
    <h2 ref={heading} tabIndex={-1}>{STEPS[step]}</h2>
    <p className="checklist-privacy">Everything is optional. Your entries stay here until you clear them, reload, or leave this page. They are never sent to Christian or included in analytics.</p>
    {step === 0 ? <>
      {field("zip", "ZIP code", "Carry this to Medicare.gov. This checklist does not look up your county or plans.", false)}
      <div className="checklist-field"><label htmlFor="checklist-county">County</label>
        <select id="checklist-county" value={entries.county} onChange={e => update("county", e.target.value)}><option value="">Choose if you know it</option>{CHECKLIST_SERVICE_COUNTIES.map(county => <option key={county}>{county}</option>)}<option>Another county</option><option>I am not sure</option></select>
      </div>
      {entries.county && !isChecklistServiceCounty(entries.county) ? <p role="status">I have not confirmed local service for your county here. You can still use this sheet, Medicare.gov, and the free SHIIP counselor locator below.</p> : null}
      <p>County is selected by you, not inferred from ZIP. Confirm it when researching coverage.</p>
    </> : null}
    {step === 1 ? <>{field("doctors", "Doctors", "One per line. Include the practice name or location so you can check the right office.")}{field("hospitals", "Hospitals", "List the hospitals you would want to check.")}</> : null}
    {step === 2 ? <>{field("prescriptions", "Prescriptions", "One per line, with dose, form, and how often you refill. Use the exact label on the bottle.")}{field("pharmacy", "Pharmacies", "Include the location and any mail-order preference.")}</> : null}
    {step === 3 ? <>
      {field("travel", "Travel", "Where you spend time away from home and how often.")}
      {field("budget", "Monthly budget", "A cost range you would like to discuss. This is not a premium estimate.", false)}
      <fieldset><legend>What matters most?</legend>{CHECKLIST_PRIORITIES.map(priority => <label className="checklist-choice" key={priority}><input type="checkbox" checked={priorities.includes(priority)} onChange={e => { start(); setPriorities(previous => e.target.checked ? [...previous, priority] : previous.filter(value => value !== priority)); }} />{priority}</label>)}</fieldset>
    </> : null}
    {step === 4 ? <>
      <article className="plan-sheet" aria-label="Printable research sheet">
        <h3>My Medicare research sheet</h3><p>Prepared on this device. This sheet does not show, compare, or check coverage for any plan.</p>
        <dl>{Object.entries(entries).map(([key, value]) => <div key={key}><dt>{{ zip: "ZIP", county: "County (self-selected)", doctors: "Doctors", hospitals: "Hospitals", prescriptions: "Prescriptions and doses", pharmacy: "Pharmacies", travel: "Travel", budget: "Monthly budget" }[key]}</dt><dd>{value.trim() || "Not added"}</dd></div>)}<div><dt>Priorities</dt><dd>{priorities.join(", ") || "Not added"}</dd></div></dl>
        <p>Enter your ZIP, prescriptions, and pharmacies on Medicare.gov. Confirm the coverage year, provider participation, drug coverage, and costs before enrolling. Bring questions about doctors and travel to the plan or a licensed agent.</p>
        <p>{AGENT.name} · {AGENT.licenseLine} · {AGENT.phone}</p>
      </article>
      <div className="checklist-actions"><button type="button" className="btn" onClick={() => window.print()}>Print my sheet</button><button type="button" className="btn btn-outline" onClick={() => setStep(0)}>Edit my sheet</button></div>
      <h3>Research on Medicare.gov</h3><p>Use your sheet to enter the same details in the official tool. This link carries none of your entries.</p>
      <a data-handoff href={PLAN_COMPARE_URL} className="btn">Open Medicare.gov Plan Compare</a>
      <h3>Bring this to Christian</h3><p>Print it or keep this page open. Your consultation is no cost, with no obligation to enroll or buy.</p>
      <div className="checklist-actions"><a data-cta-location="tool_result" href={AGENT.phoneHref} className="btn">Call {AGENT.phone}</a><TrackedLink href="/schedule" ctaLocation="tool_result" className="btn btn-outline">Book a time</TrackedLink></div>
    </> : null}
    <p><a data-handoff href={SHIIP_CONTACT_URL}>Find your county SHIIP counselor</a> for free, unbiased Medicare counseling.</p>
    <div className="checklist-actions">
      {step > 0 && step < 4 ? <button type="button" className="btn btn-outline" onClick={() => setStep(value => value - 1)}>Back</button> : null}
      {step < 4 ? <button type="button" className="btn" onClick={next}>{step === 3 ? "Make my sheet" : "Continue"}</button> : null}
      <button type="button" className="btn btn-outline" onClick={clear}>Clear all entries</button>
    </div>
  </section>;
}
