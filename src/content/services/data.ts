import type { ServiceInput } from "../schema";

/** Lokesh — Signal. Each entry becomes a page at /services/<slug>/ */
const dataServices: ServiceInput[] = [
  {
    slug: "data-research",
    title: "Data Research",
    seller: "lokesh",
    icon: "search",
    featured: true,
    summary:
      "Desk research, lead generation and market datasets compiled from verified sources and delivered in your format.",
    description: [
      "Targeted online research to build lead lists, competitor databases, product catalogues and market maps.",
      "Every record is source-linked and verified, so your sales and strategy teams can trust it.",
    ],
    deliverables: ["Structured dataset (CSV / Excel / Google Sheets)", "Source links per record", "Research summary"],
    tools: ["Google Sheets", "Excel", "LinkedIn Sales Navigator"],
  },
  {
    slug: "data-mining",
    title: "Data Mining",
    seller: "lokesh",
    icon: "pickaxe",
    summary:
      "Patterns, segments and insights extracted from large datasets to answer real business questions.",
    description: [
      "Exploration, segmentation and pattern discovery on your existing data, from sales records to survey responses.",
      "Findings are delivered as clear reports and reusable notebooks.",
    ],
    deliverables: ["Analysis notebook", "Insight report with charts", "Cleaned analytical dataset"],
    tools: ["Python", "Pandas", "SQL", "Jupyter"],
  },
  {
    slug: "data-annotation",
    title: "Data Annotation",
    seller: "lokesh",
    icon: "tags",
    featured: true,
    summary:
      "Accurate text, image and video labelling for machine-learning teams, with multi-pass quality review.",
    description: [
      "Bounding boxes, polygons, classification, NER and sentiment labelling following your guidelines.",
      "A multi-pass QA process and agreement checks keep label quality consistent across the dataset.",
    ],
    deliverables: ["Labelled dataset (COCO / YOLO / JSONL)", "QA and agreement report", "Edge-case log"],
    tools: ["Label Studio", "CVAT", "Python"],
  },
  {
    slug: "data-scraping",
    title: "Data Scraping",
    seller: "lokesh",
    icon: "spider",
    featured: true,
    summary:
      "Reliable, respectful web scraping of public data, delivered once or on a schedule, as clean structured files.",
    description: [
      "Scrapers for public websites, directories and marketplaces, including JavaScript-heavy pages, with rate limits that respect the source.",
      "Delivered as one-off exports or scheduled feeds to CSV, JSON, Sheets or your database.",
    ],
    deliverables: ["Structured export (CSV / JSON / Excel)", "Reusable scraper script", "Scheduling setup (optional)"],
    tools: ["Python", "Scrapy", "Playwright", "BeautifulSoup"],
    faqs: [
      {
        q: "What data can you scrape?",
        a: "Publicly available data, collected in line with the site's terms and applicable law. Personal data needs a lawful basis, which we discuss first.",
      },
    ],
  },
  {
    slug: "data-cleansing",
    title: "Data Cleansing",
    seller: "lokesh",
    icon: "sparkles",
    summary:
      "Deduplication, standardisation and validation that turns messy spreadsheets and CRMs into trustworthy data.",
    description: [
      "Remove duplicates, fix formats, fill gaps and validate emails, phones and addresses across spreadsheets, CRMs and databases.",
      "You get a before-and-after quality report and the rules used, so the data stays clean.",
    ],
    deliverables: ["Cleaned dataset", "Data-quality report (before / after)", "Reusable cleaning rules"],
    tools: ["Python", "Pandas", "OpenRefine", "Excel"],
  },
];

export default dataServices;
