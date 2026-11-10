import type { SellerInput } from "../schema";

// TODO: replace placeholder bio, years and experience with real details.
const prashant: SellerInput = {
  slug: "prashant",
  name: "Prashant",
  role: "Full-stack & Mobile Developer",
  discipline: "dev",
  chapter: "Code",
  headline: "Fast, accessible web and mobile products, built end to end.",
  bio: [
    "I design and build websites, web apps and mobile apps with JavaScript and TypeScript, from the first wireframe to production.",
    "My stack is React and Next.js on the front end, NestJS on the back end, and MongoDB or SQL for data, so one person owns the whole product.",
  ],
  location: "India · Remote",
  yearsExperience: 5,
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "NestJS",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "REST & GraphQL",
    "Tailwind CSS",
  ],
  experience: [
    {
      period: "2023 — Now",
      title: "Freelance Full-stack Developer",
      org: "Inkcode Labs",
      summary: "Building web platforms, dashboards and mobile apps for startups and agencies.",
    },
    {
      period: "2021 — 2023",
      title: "Software Engineer",
      org: "Product company (placeholder)",
      summary: "Shipped React/Next.js features and NestJS microservices used by thousands of users.",
    },
  ],
};

export default prashant;
