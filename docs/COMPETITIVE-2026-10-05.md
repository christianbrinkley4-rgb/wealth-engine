# Competitive teardown, October 5, 2026

How christianbrinkleync.com stacks up against seven national sites, what this pass changed, and what's still open.

**How to read the scores.** Every competitor score is an estimate. Their sites were not opened for this pass (by instruction), so the numbers come from the descriptions in the brief plus general knowledge of each brand. Our own scores come from reading the code and from screenshots of the production build at 390, 768 and 1440 px. "Page speed feel" is estimated for everyone, us included: it was only checked on a local machine, not on a phone over a real connection.

Internal document. Nothing here is site copy, and the site itself names no competitors.

## The short version

- **For someone in the Triad who wants a person to call, we rank first.** No national site puts a named, local, reachable human on the page. That is two full dimensions (local presence, human connection) where the nearest competitor scores 4 to 6 and we score 9 and 10.
- **For someone typing a general Medicare question into Google or an AI assistant, we rank about fourth**, behind Medicare.gov, AARP and NerdWallet. They have thousands of pages and decades of links. We have 37.
- **Three gaps are still open after this pass**, and none of them can be closed with code: reviews, content volume, and outside links. Details under "Still open."

## Scores

Scale is 1 to 10. "Us, before" is the site as it stood after this morning's remodel (commit d5d5032). "Us, after" is this pass.

| Dimension | Us, before | Us, after | eHealth | SelectQuote | Medicare.gov | AARP | NerdWallet | SmartAsset | Ramsey |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Visual design | 8 | 8 | 6 | 5 | 6 | 7 | 8 | 7 | 8 |
| Trust signals | 5 | 6 | 7 | 5 | 10 | 9 | 8 | 6 | 8 |
| Clarity of next step | 8 | 9 | 7 | 7 | 4 | 5 | 5 | 8 | 7 |
| Content depth | 5 | 6 | 8 | 5 | 10 | 9 | 9 | 7 | 8 |
| Local presence | 9 | 9 | 3 | 1 | 3 | 4 | 1 | 2 | 1 |
| Human connection | 8 | 10 | 2 | 2 | 1 | 4 | 2 | 2 | 6 |
| Conversion ease | 8 | 8 | 8 | 7 | 6 | 4 | 4 | 8 | 6 |
| Mobile experience | 8 | 9 | 7 | 6 | 7 | 6 | 8 | 7 | 8 |
| Page speed feel (est.) | 8 | 8 | 6 | 6 | 7 | 5 | 6 | 7 | 7 |
| AI-search readiness | 6 | 7 | 7 | 5 | 10 | 9 | 9 | 7 | 7 |
| **Total (of 100)** | **73** | **80** | **61** | **49** | **64** | **62** | **60** | **61** | **66** |

The total flatters us. It weights every dimension the same, and two of the ten are ones the nationals don't try to compete on. Read the rows, not the bottom line.

## Our rank per dimension (after this pass)

| Dimension | Rank of 8 | Who's ahead |
| --- | --- | --- |
| Visual design | 1st, tied with NerdWallet and Ramsey | nobody |
| Trust signals | 6th, tied with SmartAsset | Medicare.gov, AARP, NerdWallet, Ramsey, eHealth |
| Clarity of next step | 1st | nobody |
| Content depth | 7th | everyone but SelectQuote |
| Local presence | 1st, by a wide margin | nobody |
| Human connection | 1st, by a wide margin | nobody |
| Conversion ease | 1st, tied with eHealth and SmartAsset | nobody |
| Mobile experience | 1st | nobody |
| Page speed feel | 1st (estimated) | nobody |
| AI-search readiness | 4th, tied with eHealth, SmartAsset and Ramsey | Medicare.gov, AARP, NerdWallet |

## Dimension by dimension

**Visual design: 8.** The remodel already put us level with the best-designed sites on the list. No change in score this pass. The gain was the face in the header, which is a human-connection win more than a design one.

**Trust signals: 5 to 6.** This is our weakest row that matters. Medicare.gov is the government, AARP has had decades to earn its name, and NerdWallet shows editorial standards on every article. We have zero published reviews and a young domain. What moved the score: a named, pictured author on every article, a "How I keep this honest" section on the Learning Hub, and a glossary where every entry links to its official source. What would move it to 8: real Google reviews (see "Still open").

**Clarity of next step: 8 to 9.** The nationals either bury the next step (Medicare.gov, AARP, NerdWallet) or make it a long form that routes you to a stranger (eHealth, SelectQuote, SmartAsset). Ours is a phone number and one question, and now every article and every page close says who picks up.

**Content depth: 5 to 6.** The honest gap. Medicare.gov answers everything and NerdWallet has hundreds of Medicare articles. We have 37 entries. The brief's answer was right: don't try to out-table eHealth, out-explain them. This pass added `/medicare-words`, 23 terms in a sentence or two each, with 2026 figures and an official source on every one. It still doesn't make us deep. Volume takes months of publishing.

**Local presence: 9.** Town pages, Triad hospital systems, Granville County, a Google Business Profile. Nobody on the list is close. It stays at 9 instead of 10 because there are no local photos and no local reviews yet.

**Human connection: 8 to 10.** Before this pass the first phone screen of the homepage, About and the Learning Hub showed no face, and the header carried a "CB" monogram. Now his photo is in the header of every page, the article byline and end card show him with his name, license line and towns, and the page-close card does the same. Ramsey is the only competitor with a personality, and you can't call him.

**Conversion ease: 8.** eHealth can enroll you online tonight and we can't. We win on effort instead: no account, no long form, no email wall, and the call button never leaves the screen on a phone. Left at 8. The remodel report already flags the one thing that could lift it (test a live Cal.com booking).

**Mobile experience: 8 to 9.** Checked at 390 px across ten routes: no sideways scrolling, call button always in reach, face above the fold everywhere.

**Page speed feel: 8, estimated.** Pages are static, the hero image is preloaded, and Turnstile only loads on pages with a form. Not measured on a real phone. See "Still open."

**AI-search readiness: 6 to 7.** An assistant answering "what is IRMAA" will keep citing Medicare.gov and NerdWallet, and that's not changing soon. An assistant answering "who can help me with Medicare in Greensboro" has much more to work with here than on any national site: a Person and ProfessionalService entity on every page, FAQ and Article markup, `llms.txt`, and now a DefinedTermSet for the glossary and a plain "who answers" statement in `llms.txt`. For local questions we'd score 8 or 9. For national informational questions, 4. Seven is the blend.

## What changed in this pass

**Photos**

- Header: the square photo replaces the "CB" monogram on every page. It shows at 44 px, far under the 400 px limit for that file.
- Article byline: larger photo, name links to About.
- Article end card: rebuilt as an author card. 88 to 112 px photo, name, "NC Life & Health · Greensboro, NC", the towns he meets people in, then both ways to reach him.
- Page-close card (bottom of every service and guide page): larger photo, name and license line above the heading, and "It's me who answers" in the note.
- Learning Hub hero: author line with photo, license line and phone number.
- Alt text: every photo of Christian now has descriptive alt text. Three were empty before, and two said only his name.
- No stock photos, no new image files. The square photo is never shown above 112 px.

**New page**

- `/medicare-words`: "Medicare words, in plain English." 23 terms in four groups, each with a one or two sentence definition and a link to the official Medicare.gov, CMS or Social Security page. Dollar figures are read from the same constants as `/medicare-costs-2026`, so they can't drift. Every term has its own link (for example `/medicare-words#irmaa`). Listed in the Learning Hub, footer, sitemap and `llms.txt`. Source links reuse URLs already cited elsewhere on the site.

**Trust**

- Learning Hub: new "How I keep this honest" section. Four plain rules: his name is on every page, numbers come from official sources, articles show their date, no plan pitches.

**AI search**

- DefinedTermSet structured data on the glossary.
- `llms.txt`: glossary entry, plus a "Who answers" section.

**Checks.** `npm run lint`: 0 errors, the same 3 warnings as before. `npm test`: 490 passed (6 new, for the glossary). `npm run build`: passes. Screenshots at 390, 768 and 1440 on the production build: no sideways scrolling on any of the ten routes checked.

## Still open

These are the gaps a competitor still wins, and why code alone can't close them.

1. **Reviews (trust signals).** Zero are published. This is the single biggest lever left. Five real Google reviews would do more for trust than anything else on this list. Add them to `lib/testimonials.ts` and the homepage section fills in on its own.
2. **Content volume (content depth, AI search).** 37 entries against thousands. The Learning Hub is built to take new articles with one edit each. A steady two a month, each answering a real question from a real neighbor, is the path.
3. **Outside links and mentions (AI search, trust).** AI assistants and Google both lean on who else vouches for a site. Local citations, the Google Business Profile, and a few local mentions matter more here than any markup.
4. **Real-phone speed test.** Run PageSpeed Insights on the live site after deploy and record the numbers here.
5. **Photos.** See below.

## Needs Christian

**Decisions**

- **Your age.** The brief calls "a real 21-year-old in Greensboro who answers his own phone" the unfair advantage. The site does not state your age anywhere, and this pass did not add it. It's a real judgment call for a 65-plus audience. Say the word and it goes on the About page.
- **Your name on the articles.** Bylines read "By Christian Brinkley," and the new Learning Hub section says you answer for what's written. Please read the 11 articles and the glossary before they carry that claim much longer. The remodel report already asks for a fact check on the three tax explainers.
- **The yearly-figures promise.** The Learning Hub now says you go back through the yearly figures when new ones come out. Keep that promise each January or cut the line.

**Yelp banner (AI-generated, needs your sign-off for each spot).** Not on the site. The file isn't in the repo. Three places it could go, in order of preference:

1. Learning Hub header, as a wide band behind the title. Best fit: the page is about you as the author, and a 3:1 image suits a header.
2. A wide band on the homepage between "Hey, I'm Christian" and the Learning Hub section.
3. The social share image (the picture that shows when a link is posted to Facebook or Nextdoor).

One caution: your own rule is the real headshot for anything face-forward. A generated image of your face on your own site is a bigger step than on Yelp. A real landscape photo would be better in all three spots.

**Photo requests**

- **Landscape, you at a kitchen table with paperwork.** 3:2, at least 2400 by 1600. For the homepage "Hey, I'm Christian" section and the About story.
- **Second portrait, more casual.** 4:5, at least 1600 by 2000. For the About hero.
- **Larger square headshot.** 1:1, at least 1200 by 1200. The current square is 640 px, which caps it at small sizes.
- **Wide shot somewhere recognizable in Greensboro.** 3:1, at least 2700 by 900. This is the real-photo version of the Yelp banner, for the Learning Hub header.
- **Landscape in Creedmoor or Oxford.** 3:2, at least 2400 by 1600. For the Granville County town pages.
