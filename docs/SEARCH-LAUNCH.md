# Search and domain launch

Updated September 15, 2026.

**Current status:** `https://christianbrinkleync.com` is live on Netlify with valid HTTPS. The Google Search Console domain property is verified under Christian's Google account using a Namecheap TXT record. Bing Webmaster Tools ownership is also verified through its CNAME record, and the live domain dashboard is accessible. No sitemap or indexing request has been submitted while the Medicare disclosure guard remains closed. An existing Google Maps practitioner profile was found; this Gmail account has no management access. Do not create a duplicate. The September 10 setup notes below are retained as history; see [live verification](LIVE-VERIFICATION-2026-09-15.md) for current delivery and booking evidence.

## Implemented in the website

- Canonical URLs, page titles, descriptions, share images, breadcrumbs, and consistent author and service information.
- Helpful guides for Medicare, life insurance, annuities, retirement questions, long-term care insurance, short-term care insurance, and critical illness insurance.
- Local pages describe the actual service area and relevant county information. Avoid adding large numbers of near-identical pages for keywords.
- The sitemap lists public content pages. Paid landing pages, consultation utilities, and the optional `llms.txt` brief are excluded.
- Paid and conversion pages use noindex. Crawlers can read their noindex instructions after the public launch gate is satisfied.
- Optional `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` environment values produce ownership meta tags. DNS verification can be used instead.

Google says its normal search requirements apply to AI Overviews and AI Mode. There is no special AI markup that guarantees inclusion. Helpful visible content, accurate information, crawlability, and clear internal links remain the priority. The public `llms.txt` summary is optional and is not evidence of indexing. [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)

## Account setup in progress

- The user signed in to Google. A URL-prefix Search Console property was started for `https://wealth-engine-h6gs.vercel.app/`; ownership is not yet verified.
- `christianbrinkley.com` was already registered and the user confirmed it is not theirs. **`christianbrinkleync.com` has now been purchased from Namecheap for $6.99 with NEWCOM679; the user confirmed the purchase and the receipt was verified.** Domain connection, final HTTPS behavior, and search verification still need to be completed. Confirm renewal settings in the registrar account.
- The user reviewed the cost discussion and explicitly authorized proceeding with setup and the domain purchase. There is no remaining general authorization hold. Netlify Free hosting and Cal.com Free booking are being connected and still need live verification. The user has cancelled external Outlook synchronization; it is not a setup requirement. See [appointment economics](APPOINTMENT-ECONOMICS.md) for planning assumptions, not proven appointment acquisition costs.
- Prefer the owned .com as the permanent Search Console property, canonical origin, ad address, and printed address once registered and connected.
- Google Business Profile and Bing Webmaster Tools have not yet been completed. Do not report them as active until verification succeeds.

## Finish in this order

1. Domain registration is complete: `christianbrinkleync.com`, $6.99 first year. Confirm registrant verification, privacy, and renewal settings in Christian’s registrar account before completing the domain connection.
2. Complete the Netlify Free deployment, connect the purchased domain, and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Redirect alternate hostnames to it and confirm the correct repository branch. A Netlify deployment/preview address may be useful for testing; it does not satisfy the explicit canonical-domain launch setting.
3. Confirm the applicable Medicare disclosure and counts, then enable indexing through the existing readiness configuration. Do not fabricate company or plan counts to pass the gate.
4. Verify the owned domain in Search Console, submit `/sitemap.xml`, and inspect the homepage and main guides. Record actual indexing outcomes; a submitted sitemap is not a ranking guarantee.
5. Add and verify the same domain in Bing Webmaster Tools. Inspect indexing and, when available, Bing’s AI Performance report. [Bing AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
6. Check Google for an existing practitioner profile before creating one. Use Christian’s real professional name, phone, accurate category, service area, and operating details. A service-area profile may hide its address, but verification still needs truthful business information. [Google Business Profile guidelines](https://support.google.com/business/answer/3038177?hl=en)

Before promoting the indexed site, complete the [booking and email connection checks](LEAD-ENGINE-LAUNCH.md#booking-and-appointment-synchronization). A searchable page, configured calendar URL, and accepted webhook settings are separate from a verified visitor booking and confirmation. The public `/api/health` reports configuration only and does not establish live delivery.

## Ongoing work

Review the searches bringing relevant local visitors, the pages they use, and the consultations they request. Improve answers to real household questions; keep annual Medicare figures and source links current. Request authentic reviews through an appropriate process after real service. Never create reviews, credential claims, affiliations, or guaranteed ranking promises.

Search tools should be evaluated alongside qualified, attended appointments. Neither first place in search nor a steady number of daily appointments can be guaranteed by site setup alone.
