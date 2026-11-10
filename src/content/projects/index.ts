import type { ProjectInput } from "../schema";

/**
 * Portfolio projects. Each entry becomes a page at /projects/<slug>/
 * SAMPLE CONTENT: replace with your real projects (add a `cover` image in /public/projects/ if you have one).
 * `services` must use slugs from src/content/services/*.ts; the build checks this.
 */
const projects: ProjectInput[] = [
  {
    slug: "learning-platform-web-app",
    title: "Learning platform web app",
    seller: "prashant",
    services: ["full-stack-web-apps", "website-development"],
    client: "EdTech startup (sample)",
    year: 2025,
    featured: true,
    summary: "A Next.js + NestJS course platform with video lessons, quizzes and an admin dashboard.",
    challenge:
      "The client's course content lived in spreadsheets and video links, with no way to track learner progress or sell access.",
    solution:
      "Built a Next.js front end and NestJS API with role-based access, progress tracking, payments and an admin dashboard for course authors.",
    outcome: ["Launched in 8 weeks", "Lighthouse 98 performance", "Admin team manages courses without developers"],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],
  },
  {
    slug: "field-service-mobile-app",
    title: "Field-service mobile app",
    seller: "prashant",
    services: ["mobile-app-development", "backend-api-development"],
    client: "Logistics company (sample)",
    year: 2024,
    featured: true,
    summary: "An offline-first React Native app that lets field teams log jobs, photos and signatures.",
    challenge: "Field staff worked in low-connectivity areas and filled in paper forms that took days to reach the office.",
    solution:
      "Built an offline-first React Native app with background sync to a NestJS + MongoDB API, plus push notifications for new jobs.",
    outcome: ["Paperwork turnaround cut from days to minutes", "Works fully offline", "Published on iOS and Android"],
    tech: ["React Native", "Expo", "NestJS", "MongoDB"],
  },
  {
    slug: "accessible-textbook-series",
    title: "Accessible textbook series",
    seller: "himanshu",
    services: ["accessible-ebooks", "ebook-conversion"],
    client: "Academic publisher (sample)",
    year: 2025,
    featured: true,
    summary: "A 12-title textbook series converted to EPUB 3 with full alt text, MathML and accessibility metadata.",
    challenge:
      "The publisher needed its backlist to meet accessibility requirements for library and education markets, and the source was print PDFs.",
    solution:
      "Converted each title to semantic EPUB 3, wrote image descriptions, converted equations to MathML and validated each title with Ace by DAISY.",
    outcome: ["12 titles remediated", "0 EPUBCheck errors", "Passed Ace by DAISY checks"],
    tech: ["EPUB 3", "MathML", "Ace by DAISY", "EPUBCheck"],
  },
  {
    slug: "literary-novel-print-ebook",
    title: "Literary novel: print & eBook",
    seller: "himanshu",
    services: ["typesetting", "cover-design", "epublishing"],
    client: "Independent author (sample)",
    year: 2024,
    featured: true,
    summary: "Interior typesetting, cover design and store-ready eBook files for a debut novel.",
    challenge: "A first-time author wanted a bookstore-quality print edition and eBook on every major store.",
    solution:
      "Designed the interior and a full cover wrap, typeset the print edition in InDesign and produced EPUB and Kindle files from the same source.",
    outcome: ["Print and eBook launched the same day", "Live on 5 major retailers"],
    tech: ["InDesign", "Photoshop", "EPUB 3", "Kindle"],
  },
  {
    slug: "b2b-lead-database",
    title: "B2B lead database",
    seller: "lokesh",
    services: ["data-research", "data-scraping", "data-cleansing"],
    client: "SaaS company (sample)",
    year: 2025,
    featured: true,
    summary: "A verified database of 8,000 B2B companies, scraped from public directories, deduplicated and enriched.",
    challenge: "The sales team was buying stale lead lists with high bounce rates and lots of duplicates.",
    solution:
      "Scraped public directories, cross-checked records against company websites, then deduplicated and standardised every field.",
    outcome: ["8,000 verified records", "Duplicate rate under 1%", "Refreshed monthly"],
    tech: ["Python", "Scrapy", "Pandas", "Google Sheets"],
  },
  {
    slug: "retail-image-annotation",
    title: "Retail image annotation",
    seller: "lokesh",
    services: ["data-annotation"],
    client: "Computer-vision startup (sample)",
    year: 2024,
    featured: true,
    summary: "25,000 shelf images labelled with bounding boxes for a product-recognition model.",
    challenge: "The ML team needed consistent labels fast, but in-house labelling was slow and inconsistent.",
    solution:
      "Set up a Label Studio workflow with clear guidelines, labelled in batches and ran a two-pass QA review with agreement checks.",
    outcome: ["25,000 images labelled", "98% QA accuracy", "Delivered in COCO format"],
    tech: ["Label Studio", "Python", "COCO"],
  },
];

export default projects;
