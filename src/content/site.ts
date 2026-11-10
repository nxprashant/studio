import type { SiteInput } from "./schema";

/**
 * Global studio info. Rename the studio, change contact details or the domain here.
 * TODO(before launch): replace the placeholder email, url and socials.
 */
const site: SiteInput = {
  name: "Inkcode Labs",
  shortName: "Inkcode",
  tagline: "We build software, publish books and refine data.",
  description:
    "Inkcode Labs is a three-person studio for web & mobile development, ePublishing and eBook conversion, and data research, scraping and cleansing.",
  url: "https://inkcodelabs.com",
  email: "hello@inkcodelabs.com",
  location: "India · Working worldwide (remote)",
  // e.g. "https://formspree.io/f/xxxxxx". Leave empty to open the visitor's email app instead.
  formEndpoint: "",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
  // Extra headline numbers shown in the hero (services count and combined years are calculated automatically).
  stats: [{ value: 120, suffix: "+", label: "Projects delivered" }],
  keywords: [
    "web development",
    "mobile app development",
    "Next.js developer",
    "NestJS developer",
    "ebook conversion",
    "EPUB conversion",
    "typesetting",
    "accessible ebooks",
    "XML conversion",
    "data scraping",
    "data annotation",
    "data cleansing",
  ],
};

export default site;
