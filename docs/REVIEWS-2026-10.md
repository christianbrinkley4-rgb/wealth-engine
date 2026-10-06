# Getting real Google reviews, October 2026

This is the plan, what got built, and how Christian uses it. Internal document. Nothing here is site copy.

## The plan

**Who is on the site and wants to leave a review?** Past clients, at three moments:

1. **Right after a meeting.** They are on their phone, the conversation is fresh, and Christian can hand them a link or a card. This is the best moment by far.
2. **Weeks later, coming back to check something.** They land on the homepage, About, or the footer looking for his number. A quiet "worked with me?" line catches them.
3. **A friend or family member who got Christian's text.** They tap a link and want it to just work.

New visitors never need a review prompt. They need the call button. Everything below is written for past clients and says so.

**What got built, per moment**

| Moment | What it is |
| --- | --- |
| After a meeting | `/review?from=meeting`, a thank-you page with his photo and one big button to Google |
| In person | A printable card at `/review/card` with a QR code to `/review?from=card` |
| By text | `/review?from=text`, same page, same button |
| Coming back later | A quiet line in the footer, on About, and on the homepage review card, all pointing at `/review` |
| Once reviews exist | The homepage already swaps in real reviews from `lib/testimonials.ts`. A small "Worked with me? Leave a review" line now sits under them |
| Measuring it | Two new events, `review_page_view` and `review_click` |

**What I decided not to build, and why**

- **A popup or banner asking for a review.** Your visitors are on phones, and the site's job is the call.
- **A "how was it?" step before the Google button.** That is review gating. Everyone gets the same link.
- **Pre-written or suggested review wording.** The page has two plain questions about the visit. Nothing about results, savings, or plans.
- **Review stars or review markup in the page code.** Not until real reviews exist. A test already guards the Google rating (it only shows with a real count behind it).
- **Showing reviews on the review page itself.** A past client writing a review doesn't need to read others first, and it adds clutter. The homepage shows them.
- **Showing reviews on About.** The review block's styles belong to the homepage. Easy to add later if you want it.
- **A new automatic email or text.** Nothing here sends anything. See "Needs Christian" below.

## What it looks like

- `/review` is a short page. His photo, his name and license line, one sentence of thanks, one big "Write a Google review" button, a note that Google opens in a new tab and needs a Google account, two plain questions, and a line saying he gives nothing in return for a review.
- Anyone who finds it without having worked with him sees: "Haven't worked with me yet? No review needed," with his phone number and a link to ask a question.
- With `?from=meeting` the heading reads "Thanks for sitting down with me." Without it, "Worked with me? Thank you."
- The page is not indexed by search engines. It is a short link, not a page to find on Google.

## How Christian uses it, day to day

| When | What to send or hand over |
| --- | --- |
| Right after a meeting, by text | `https://christianbrinkleync.com/review?from=text` |
| In an email after a meeting | `https://christianbrinkleync.com/review?from=meeting` |
| In person | Print the card at `https://christianbrinkleync.com/review/card` (the Print button is on the page), hand it over, and point at the square |
| On a business card or flyer | The QR code image is `public/review-qr.svg`. It points at `/review?from=card` |

**What to say, in your own words.** Something like: "If you ever have a minute, a Google review helps neighbors find me. Say whatever's true. Here's the link." Say it to everyone you have worked with, the same way. Don't ask only the people who seemed happy. Don't offer anything for it, and don't suggest what to write.

The `from` word only changes the heading and shows up in the counts below. It never carries a name.

## What gets measured

Both events carry the page path and, optionally, which kind of link brought the visitor. Nothing else. No names, no contact details, no health information.

| Event | Fires when | Extra detail |
| --- | --- | --- |
| `review_page_view` | Someone opens `/review` | `review_source`: `meeting`, `card`, or `text`, only when the link had one |
| `review_click` | Someone taps the Google button | Same |

The allow-list lives in `lib/analytics.ts`, and a test fails if someone adds anything to it. Anything that isn't `meeting`, `card` or `text` is dropped.

A tap on the Google button tells you someone reached Google's box. It can't tell you whether they finished writing a review. Google's own review count is the real number.

## Needs Christian

1. **Medicare marketing rules and testimonials.** Before any real review is shown on the site, please ask your compliance contact whether CMS or carrier marketing rules limit how client testimonials can be displayed on an agent's own website (for example, whether a testimonial can be quoted, or needs a disclaimer). I did not guess. The current rules in `lib/testimonials.ts` (first name, last initial, town, no outcome or savings claims, written permission) are cautious defaults, not a legal opinion.
2. **The second review email (changed, October 6).** It lives in `lib/nurture.ts` (`review-reminder`). It used to say "If you were happy with our review", which read as asking only happy people and looked like a typo. It now says "If our time together was useful, a short Google review helps more than you know." That still ties the ask to the visit being useful. If you want it fully neutral, something like "If you have a minute, a short Google review helps more than you know" avoids any condition.
3. **Where the review emails point.** Both review emails link straight to Google. They could point at `/review?from=meeting` instead (so the visit counts show up in the numbers above). That changes what an automatic email contains, so I left it alone.
4. **Old printed links.** `/review` used to jump straight to Google. It now opens the thank-you page first, one extra tap. If you have already handed out cards with the old link, they still work. If you'd rather keep the old direct behavior for them, say so.
5. **Print the card once and look at it.** I checked it on screen, not on paper. Print one and scan the QR code with your phone before you print a stack.
6. **New dependency.** `qrcode` (dev only) makes the QR image. It does not ship to visitors. To make the image again: `node scripts/make-review-qr.mjs`.
