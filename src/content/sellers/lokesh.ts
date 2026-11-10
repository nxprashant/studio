import type { SellerInput } from "../schema";

// TODO: replace placeholder bio, years and experience with real details.
const lokesh: SellerInput = {
  slug: "lokesh",
  name: "Lokesh",
  role: "Data Specialist",
  discipline: "data",
  chapter: "Signal",
  headline: "Messy, scattered data turned into clean, usable datasets.",
  bio: [
    "I find, collect and prepare data: web research, scraping, mining, labelling and cleansing for analytics and AI teams.",
    "Every dataset ships documented and validated, in the format your team actually uses.",
  ],
  location: "India · Remote",
  yearsExperience: 4,
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/" }],
  skills: [
    "Python",
    "Pandas",
    "Scrapy",
    "Playwright",
    "SQL",
    "Excel / Google Sheets",
    "Label Studio",
    "CVAT",
    "Data validation",
    "Deduplication",
  ],
  experience: [
    {
      period: "2022 — Now",
      title: "Freelance Data Specialist",
      org: "Inkcode Labs",
      summary: "Research, scraping, annotation and cleansing projects for startups and research teams.",
    },
    {
      period: "2020 — 2022",
      title: "Data Analyst",
      org: "Research firm (placeholder)",
      summary: "Built lead lists and market datasets and kept CRM data clean.",
    },
  ],
};

export default lokesh;
