# SEO + AI-search baseline, 2026-10-20 (before any change)

Checked live by Claude on 2026-10-20 between about 2:15 and 2:45 PM ET, from the Claude desktop app's built-in browser (logged out, no personalization: `hl=en&gl=us&pws=0`). Google results are organic blue links only; ads and "People also ask" are not counted. Google rotates results between loads, so where two loads differed both are listed.

## Google

| Query | christianbrinkleync.com | Other Christian Brinkley results | Notes |
|---|---|---|---|
| "Christian Brinkley" | Load 1: homepage #3. Load 2: not in top 10 | Bankers Life agent page #7 to #8 | A musician with the same name holds the Knowledge Panel ("Christian Brinkley, Singer"). Results 1 to 6 are mostly the musician, a LinkedIn for a different Christian Brinkley, a hockey player and an FL counselor |
| Christian Brinkley Greensboro | Load 1: homepage #2, /about #5, /insurance-services #9. Load 2: /about #6 | Bankers Life page #1 both loads. MapQuest (Bankers Life listing) #3/#9, Medicare Agents Hub #4, LinkedIn #5, Cal.com #8, FB page #10 | /insurance-services snippet shows broken text "s direct line" |
| Medicare agent Greensboro NC | Not on page 1 | none | Page 1: medicareagentshub, healthshoppenc, medicareplanning, AmeriLife, medicaresupp.org, Gaiser, Gate City, HealthMarkets, The Medicare Dude. Pages 2 to 3 returned unrelated "agent" results in this browser, so positions past 10 can't be read reliably from here |
| Medicare help Greensboro NC | Not on page 1 | none | SHIIP (Senior Resources of Guilford) #1, NCDOI #2 |
| turning 65 Medicare Greensboro | /turning-65 #9 | none | Moser Insurance #1 |
| site:stupendous-rugelach-44e473.netlify.app | n/a | 0 results | Google has no pages indexed from the stale subdomain today |

## Bing (ChatGPT search draws on Bing)

| Query | christianbrinkleync.com | Other |
|---|---|---|
| "Christian Brinkley" | not in top 10 | Bankers Life #1, LinkedIn (his) #3, Yelp #6, Instagram #9, YouTube @christianbrinkleync #10 |
| Christian Brinkley Greensboro | homepage #1, /about #3 | Bankers Life #2, Medicare Agents Hub #4, LinkedIn #5, Yelp #6 |
| Medicare agent Greensboro NC | not in top 10 | medicareagentshub #1, Yelp #2 |

## AI answers

| Engine | Prompt | Result |
|---|---|---|
| ChatGPT (logged out, search on) | Who is a good Medicare agent in Greensboro NC | **Named Christian Brinkley as option 3 of 3**, linked christianbrinkleync.com, phone 919-408-6671. Also said "newly licensed in 2026 and represents a limited selection of insurers" |
| ChatGPT (logged out) | Christian Brinkley Medicare | Identified him correctly from christianbrinkleync.com: NC Life & Health, Greensboro/Triad, (919) 408-6671, free consults, limited number of carriers |
| Gemini (logged out, Flash-Lite) | Who is a good Medicare agent in Greensboro NC | Not named. Named Gate City, Gaiser, The Medicare Dude, Medicare Agents Hub agents |
| Gemini (logged out) | Christian Brinkley Medicare | Identified him correctly with NPN 22217190, Triad towns, services, (919) 408-6671, citing christianbrinkleync.com and Medicare Agents Hub. First attempt hung on "Searching the web"; second attempt answered |
| Perplexity | both | Could not run: logged-out Perplexity answered "Sign up and repeat your request" |

The brief said "NO verified AI citations" as of Oct 19 to 20. That is out of date: ChatGPT and Gemini both cite the site for the name query today, and ChatGPT names him for the head-term question.

## Stale Netlify subdomain

`https://stupendous-rugelach-44e473.netlify.app/` returns 200, title "Greensboro Retirement Readiness | October Milestone Quiz", self-canonical, `index, follow`, and links to a Bankers Life agent page. It is a separate Netlify project; its source is not in this repo.
