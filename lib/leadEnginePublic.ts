// Browser-safe wording. Keep the server validator on these same constants.
export const ENGINE_CONSENT_VERSION = "2026-10-15.v1";
// Existing public Medicare event, checked in a browser on October 15, 2026.
export const ENGINE_BOOKING_URL = "https://cal.com/christianbrinkleync/medicare-questions";
export const ENGINE_CONSENT =
  "I ask Christian Brinkley, a licensed NC insurance agent, to call me about my Medicare questions at the number I provided. This isn't a request to enroll. I can ask him to stop contacting me. My information won't be sold or shared with other agents.";

export const FIT_QUESTIONS = [
  {
    title: "How would you describe your health needs?",
    options: [
      ["healthy", "Mostly routine care"],
      ["moderate", "Some ongoing conditions"],
      ["complex", "Several conditions or specialists"],
    ],
  },
  {
    title: "How important is keeping your doctors?",
    options: [
      ["keep", "I want to keep my doctors"],
      ["flexible", "I'd consider other doctors"],
      ["open", "I'm open to a new doctor"],
    ],
  },
  {
    title: "How often do you travel outside North Carolina?",
    options: [
      ["travel", "Often"],
      ["sometimes", "Sometimes"],
      ["local", "Rarely"],
    ],
  },
  {
    title: "What would you like to understand first?",
    options: [
      ["lowcost", "Monthly premiums and other costs"],
      ["predictable", "What I'd pay when I need care"],
      ["freedom", "Where I can receive care"],
    ],
  },
  {
    title: "Do you have Medicare and Medicaid?",
    options: [
      ["dual", "Yes, both"],
      ["nond", "Medicare, without Medicaid"],
      ["unsure", "I'm not sure"],
    ],
  },
];
