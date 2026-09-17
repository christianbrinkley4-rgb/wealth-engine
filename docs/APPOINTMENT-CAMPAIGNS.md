# Appointments from local households

Updated September 10, 2026. These are prepared campaign paths and a proposed pilot; no advertising has been launched.

Spending remains on hold for the user's cost review. See [appointment costs and break-even](APPOINTMENT-ECONOMICS.md), using Christian's estimate of $400 per Medicare enrollment. The plan now evaluates free commercial hosting before any paid upgrade.

## Start with one audience

Begin with households approaching 65 in Christian’s actual service area. This matches the existing audience and gives the campaign a clear reason to request a conversation: understanding Medicare before enrollment. Keep the offer consistent: a no-cost, no-obligation consultation with Christian, at home, at a convenient public location, or by phone.

Run annual-enrollment advertising as a separate seasonal campaign for people already on Medicare. Life insurance and general retirement campaigns are later tests, after the first campaign produces evidence about appointment quality and capacity. Four simultaneous campaigns would divide the initial budget and make it harder to understand results. A visitor’s age alone does not establish a coverage need or permission to contact them.

## First experiment

Test one ad headline at a time. Keep geography, audience eligibility, budget split, image, body, offer, and landing page consistent. Use the advertising platform’s experiment assignment rather than randomly moving visitors between pages after they click.

- Headline A: “Turning 65? Let’s talk about Medicare.”
- Headline B: “Medicare questions? Meet Christian Brinkley.”
- Shared body: “I’m a licensed insurance agent here in the Triad. We can review your questions, current coverage, and next steps together. Meet at home, at a convenient public location, or by phone. There’s no cost and no obligation to enroll.”
- Destination: `/lp/turning-65`.
- Invitation: “Request a free consultation.”

These are copy drafts, not approved or submitted advertisements. Apply current platform and product-specific marketing requirements before launch. Use the same necessary disclosures for both variants. Do not upload a prospect list or send marketing texts or email without checking the permissions and rules for that channel.

Example links on the final owned domain:

```
/go/facebook?audience=turning_65&utm_campaign=triad_t65_pilot_01&utm_content=headline_a
/go/facebook?audience=turning_65&utm_campaign=triad_t65_pilot_01&utm_content=headline_b
```

Choose the spending limit and appointment capacity before activation. Do not declare a winner from a handful of clicks or change several variables during a test. Google’s experiment guidance recommends isolating a variable and using consistent conversion actions. [Google experiment guidance](https://support.google.com/google-ads/answer/14147337)

## Match the page to the reason for visiting

| Audience parameter     | Facebook / Nextdoor destination | Mail / permitted text / email destination |
| ---------------------- | ------------------------------- | ----------------------------------------- |
| `turning_65` (default) | `/lp/turning-65`                | `/turning-65`                             |
| `aep`                  | `/lp/annual-enrollment`         | `/annual-enrollment`                      |
| `life_insurance`       | `/lp/life-insurance`            | `/life-insurance`                         |
| `retirement`           | `/lp/retirement-income`         | `/retirement-income`                      |

Each paid page opens the matching consultation questions and offers a relevant guide. Life insurance and retirement paths are ready for future testing; their availability is not a reason to spend on them immediately. Retirement copy identifies Christian as a licensed insurance agent who works with an advisor, not as a current CPA, CFP, or investment adviser.

Routing preserves approved campaign fields. Do not put names, birth dates, phone numbers, email addresses, or policy information in campaign links or QR codes.

## Measure appointments that actually happen

The main measure is cost per qualified, attended consultation. Track requests, confirmed appointments, attendance, cancellations, and whether the household’s requested help fits Christian’s current services and service area. Review these alongside cost per request and the time Christian spends following up. A low-cost form submission is not evidence of a successful appointment.

Current implementation captures the inquiry, campaign information, and contact permissions in the command center. A request is not a confirmed booking. Calendar connection and attended-appointment reporting still need setup; the site does not claim those are automated. Do not send sensitive medical or financial answers to advertising platforms as conversion properties.

Keep a record of campaign dates, spend, requests, confirmations, attendance, and the next change being tested. Scale spending only after the attended appointments justify it and Christian has capacity to serve the households.
