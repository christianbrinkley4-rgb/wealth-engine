# Measuring what your advertising actually produces

**Status, September 17, 2026: Google Analytics is live.** The property `ChristianBrinkleyNC.com` (measurement ID `G-6EL64CP7S8`) is created, the Netlify setting is in place, the site is deployed with it, and a test on the live site was received. Steps 1 and 3 below are done. What remains is Google Ads, in "Still to do" at the end.

Without this you cannot tell a campaign that produced three appointments from one that produced none, which is why it goes in before any ad spend.

## What gets counted

| What a visitor does               | What it's called         | Counted as a conversion |
| --------------------------------- | ------------------------ | ----------------------- |
| Taps any phone number on the site | `phone_click`            | Yes                     |
| Finishes a completed request form | `generate_lead`          | Yes                     |
| Finishes the Medicare date tool   | `timeline_complete`      | No, interest only       |
| Asks for their dates by email     | `timeline_email_request` | No, interest only       |

The two marked "interest only" are deliberate. If you tell Google that reading a date tool counts as success, it will buy you people who read date tools. You want the phone to ring.

## What is never sent

Only the name of the action and the page it happened on. Not your visitors' answers, dates of birth, income, ZIP codes, email addresses or phone numbers — not even scrambled. Personalized advertising signals are turned off, so a visit isn't used to build an advertising profile of someone researching their health coverage. A test locks this down, so a later change can't quietly start sending more.

## Step 1: create the Google Analytics property — DONE

1. Go to **analytics.google.com** and sign in with the Google account you want to own this.
2. **Admin** (bottom left) → **Create** → **Property**.
3. Name it `Christian Brinkley`, set the time zone to Eastern and the currency to US dollars.
4. Answer the business questions: industry "Finance", small business, and pick "Generate leads" as the goal.
5. Choose **Web** as the platform, enter `https://christianbrinkleync.com`, and name the stream `Website`.
6. Copy the **Measurement ID**. It looks like `G-ABCD1234`.

## Step 2: create the two Google Ads conversion actions — BLOCKED, needs you

The Google Ads account (942-024-4184) is still part-way through signup: every page redirects into a campaign-creation flow that ends at billing. Finishing a signup and entering payment details is yours to do, not something to hand to an assistant.

Once the account is open, you have a shortcut. Because Analytics is already running, you can import its key events into Ads as conversions instead of creating tag labels by hand: in Google Ads, **Goals → Conversions → New conversion action → Import → Google Analytics 4**, and pick `phone_click` and `generate_lead`. Then the two label settings below stay empty and nothing needs redeploying.

If you would rather use the tag labels anyway, here is that route.

1. Go to **ads.google.com** → **Goals** → **Conversions** → **Summary** → **New conversion action**.
2. Choose **Website**, enter `christianbrinkleync.com`, and continue.
3. Create the first action by hand:
   - Category: **Contact** → **Phone call lead**
   - Name: `Phone tap`
   - Value: **Use the same value**, and put in what one appointment is worth to you. Your own working figure is about $400 per Medicare enrollment, so a sensible starting value is roughly what a tap is worth on average — for example $40 if about one in ten callers enrolls. It's a guide for the bidding, not an accounting entry.
   - Count: **One**. Five taps from the same person is one person.
4. Create the second action the same way:
   - Category: **Submit lead form**
   - Name: `Request sent`
   - Count: **One**
5. On each action, open **Tag setup** → **Use Google Tag Manager or another method** and copy two things: the **Conversion ID** (looks like `AW-123456789`) and the **Conversion label** (a short mix of letters, like `AbC-D_efGhIj`).

You'll end up with one conversion ID and two labels.

## Step 3: put them into Netlify — DONE for Analytics, the Ads rows remain

1. Go to **app.netlify.com** → your site → **Site configuration** → **Environment variables**.
2. Add these four, exactly as named:

| Name                                | Value                           |
| ----------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_GA4_ID`                | your `G-…` measurement ID       |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`         | your `AW-…` conversion ID       |
| `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL` | the label from **Phone tap**    |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | the label from **Request sent** |

3. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**. These settings are baked in at build time, so saving them alone changes nothing until the site rebuilds.

The privacy page updates itself. It says measurement is off while it is off, and names the services once they're on — which is what the current version promises to do.

## Step 4: check it works (about 10 minutes, after the deploy finishes)

1. In Google Analytics, open **Reports** → **Realtime**.
2. On your phone, open christianbrinkleync.com and tap your own phone number, then hang up before it connects.
3. Within a minute, `phone_click` should appear in the realtime event list.
4. Run the date tool and submit a test request with your own email. `timeline_complete` and `generate_lead` should appear. Then delete that test lead from your command center.
5. In Google Ads, **Goals** → **Conversions**, the two actions move from "No recent conversions" to "Recording conversions" within a few hours. It is not instant.

If nothing appears: check that the deploy finished after you added the settings, and turn off any ad blocker on your phone, which blocks these tags exactly as it would for a visitor.

## Still to do

1. **Finish the Google Ads account** (you), then import the two key events as conversions, per step 2.
2. **Mark the key events** in Analytics. Google only lets an event be starred once it has listed the name, which takes up to 24 hours from the first time it happens. From about September 18: **Admin → Data display → Events**, find `phone_click` and `generate_lead`, and click the star beside each.
3. **Netlify is on the Personal plan** as of September 17: $9 a month for 1,000 credits, up from 300. A production deploy costs 15 credits, bandwidth 20 per GB, web requests 2 per 10,000; deploy previews are free. That is roughly 60 deploys a month plus real traffic, so the site pausing mid-campaign is no longer a live risk. Keep an eye on it during a heavy build week.

## What this still doesn't tell you

It counts taps and submitted requests, not conversations. Someone can tap and not call, or call and not show up. The number that decides whether an ad is worth repeating is **cost per attended appointment**, so keep counting appointments in your command center. Measurement narrows the guessing; it doesn't replace the follow-up.
