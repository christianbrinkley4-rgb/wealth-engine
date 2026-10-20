# SEO entity release, 2026-10-20

One batched deploy. Baseline evidence: [SEO-ENTITY-BASELINE-2026-10-20.md](SEO-ENTITY-BASELINE-2026-10-20.md).

## Audit findings (with evidence)

1. **Conflicting schema.** The homepage, /medicare-agent-greensboro-nc, /turning-65, /insurance-services and the town pages each published two InsuranceAgency nodes with the same `@id` and different `description`, `areaServed` and `knowsAbout`. The About page published a second Person node with its own `sameAs` and phone format. Checked by parsing live JSON-LD.
2. **Wrong and missing profiles.** Instagram pointed at @brinkleyc4 (personal, 0 posts) instead of @triadmedicare (business, "Christian Brinkley (@triadmedicare)"). TikTok was empty. Reddit was missing. The About page showed only 6 of 9 profiles.
3. **No license-verification link** that actually opens the lookup. The one link pointed at a general NCDOI licensing page.
4. **The head-term page didn't say "agent".** /medicare-agent-greensboro-nc was titled "Medicare Help in Greensboro, NC | Local Licensed Agent" with H1 "Medicare help in Greensboro, NC". It had no county comparison, no Novant or Atrium mention, no license section.
5. **Stale figure.** The Guilford 2027 average in-network out-of-pocket maximum is now $7,055.45 at the cited source (MedicareAdvantage.com, checked 2026-10-20). The site said $6,697.27 on 5 pages.
6. **llms.txt** was 77 KB with the entity facts spread out, and a comparison table claiming he can explain "Any plan, including ones he does not sell".
7. **Sitemap (326 URLs):** 0 non-200s, 0 noindex, 0 canonical mismatches, 0 duplicate titles. Every Medicare page already links to /aep. The only thin pages are /wealth quiz and hub pages (under-35 money section, out of scope). No fix needed.
8. **Articles** already carry the byline, NPN and license line, sources, and an end call-to-action. They lacked an in-body link to their matching service page.
9. **Stale Netlify subdomain** stupendous-rugelach-44e473.netlify.app is a separate Netlify project (not in this repo). It serves an old quiz page with `index, follow`, a self-canonical, and a link to a Bankers Life agent page. Google has 0 pages from it indexed today.

## Changes (every file touched)

| File | Change |
|---|---|
| `lib/agent.ts` | Instagram to @triadmedicare, TikTok @triadmedicare added, Reddit u/Dense_Gas_9025 added, new `LICENSE_LOOKUP_URL` |
| `lib/seo.ts` | One shared `AGENCY_AREA_SERVED` (15 towns + 5 counties), description and `knowsAbout` for every InsuranceAgency node. `localBusinessJsonLd` no longer contradicts the sitewide node. Person gains given/family name, work location, UNCG affiliation, credential lookup URL, full personal `sameAs` (LinkedIn, Instagram, TikTok, Threads, YouTube, Reddit). Service markup uses the same area list |
| `app/about/page.tsx`, `app/pages.css` | ProfilePage now references the one Person by `@id`. New "At a glance" block: name, license + NPN + lookup link, base, service area, services, phone, hours, cost, real Google review count linked to Google. All profiles listed |
| `app/components/SiteFooter.tsx` | NPN, "one local person, not a call center", and "Check my license with the state" link on every page |
| `app/components/TrustFacts.tsx` | License link now opens the actual lookup |
| `app/components/MedicareFactBlock.tsx` (new) | Six quotable, source-cited facts read from `lib/medicareCosts2026.ts` and `lib/irmaa.ts` |
| `app/medicare-agent-greensboro-nc/page.tsx` | Title "Medicare Agent in Greensboro, NC \| Free Local Medicare Help", H1 "Medicare agent in Greensboro, NC", new meta description with NPN, county table, fact block, modified date |
| `lib/greensboroMedicareGuide.ts` | New county section (Guilford, Forsyth, Alamance, Davidson, Granville: plan counts, averages, Cone Health, Novant, Atrium Health Wake Forest Baptist, Granville Health System, all sourced). New license-check section. Guilford figure updated |
| `app/aep/page.tsx`, `app/turning-65/page.tsx` | Fact block added |
| `app/components/ArticleBody.tsx` | Insurance and Medicare articles link to their matching service page and to /aep with descriptive anchors. Money articles for younger readers are left alone |
| `app/llms.txt/route.ts` | Entity card, main pages, and key facts with source URLs at the top. Call-center table replaced with factual lines |
| `app/greensboro-medicare-cost-calculator/data.ts`, `app/medicare-advantage-plans-greensboro-nc/page.tsx`, `app/medicare-advantage-north-carolina/page.tsx` | Guilford out-of-pocket average updated to $7,055.45 |
| `lib/__tests__/searchDiscovery.test.ts` | Profile expectations updated |
| `docs/stale-netlify-redirect/_redirects` | Ready-to-deploy 301 for the stale subdomain |

Checks: `tsc` clean, `eslint` clean, 1,491 of 1,491 tests pass, production build passes. Locally, 0 conflicting schema properties on /, /about, /aep, /medicare-agent-greensboro-nc, /medicare-agent-high-point-nc, /turning-65 and /insurance-services (live before: 3 conflicts on each of 4 of those pages).

## Not changed, on purpose

- Town pages for High Point, Winston-Salem, Kernersville, Burlington, Lexington and Granville towns already exist and are indexable. No new spun pages were added.
- Quora is not in `sameAs`: the quora.com/profile/Christian-Brinkley account is an empty profile from 2017 and may not be his.
- The NAIC lookup was not run, because searching requires accepting NAIC's terms.
