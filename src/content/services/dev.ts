import type { ServiceInput } from "../schema";

/** Prashant — Code. Each entry becomes a page at /services/<slug>/ */
const devServices: ServiceInput[] = [
  {
    slug: "website-development",
    title: "Website Development",
    seller: "prashant",
    icon: "code",
    featured: true,
    summary:
      "Fast, SEO-ready websites and landing pages built with Next.js and React, designed to convert visitors into clients.",
    description: [
      "From marketing sites to content-heavy platforms, I build websites that load in under a second, rank well and are easy for your team to update.",
      "Every build is responsive, accessible (WCAG 2.2 AA) and comes with analytics, sitemaps and structured data set up from day one.",
    ],
    deliverables: [
      "Responsive website (mobile, tablet, desktop)",
      "Technical SEO: metadata, sitemap, schema markup",
      "CMS or file-based content editing",
      "Core Web Vitals optimisation",
      "Deployment and handover documentation",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A typical 5–8 page marketing site takes 2–4 weeks from approved design to launch.",
      },
      {
        q: "Can I edit the content myself?",
        a: "Yes. I set up a headless CMS or simple content files so you can update text and images without touching code.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    seller: "prashant",
    icon: "smartphone",
    featured: true,
    summary:
      "Cross-platform iOS and Android apps with React Native, sharing one TypeScript codebase with your web product.",
    description: [
      "I build cross-platform mobile apps with React Native and Expo, so you ship to iOS and Android from one codebase without sacrificing native feel.",
      "Push notifications, offline support, authentication and store submission are all handled.",
    ],
    deliverables: [
      "iOS and Android app",
      "API integration or custom backend",
      "Push notifications and analytics",
      "App Store and Play Store submission",
    ],
    tools: ["React Native", "Expo", "TypeScript", "Firebase"],
    faqs: [
      {
        q: "Do you publish the app to the stores?",
        a: "Yes, I prepare store listings and handle submission and review for both App Store and Google Play.",
      },
    ],
  },
  {
    slug: "full-stack-web-apps",
    title: "Full-stack Web Apps",
    seller: "prashant",
    icon: "layers",
    summary:
      "Dashboards, SaaS products and internal tools with React/Next.js front ends and NestJS back ends.",
    description: [
      "I build complete web applications: authentication, role-based dashboards, payments, real-time features and admin panels.",
      "The front end and back end share TypeScript types end to end, so the product stays reliable as it grows.",
    ],
    deliverables: [
      "Web application with authentication",
      "Admin dashboard",
      "Database design and migrations",
      "Automated tests and CI/CD",
    ],
    tools: ["Next.js", "React", "NestJS", "TypeScript", "MongoDB", "PostgreSQL"],
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    seller: "prashant",
    icon: "server",
    summary:
      "Secure, documented REST and GraphQL APIs with NestJS, Node.js, MongoDB and SQL databases.",
    description: [
      "Scalable APIs and services built with NestJS and Node.js, with clean data models in MongoDB, PostgreSQL or MySQL.",
      "Each API ships with OpenAPI documentation, validation, logging and tests.",
    ],
    deliverables: [
      "REST or GraphQL API",
      "Database schema and indexing",
      "OpenAPI / Swagger docs",
      "Auth, rate limiting and logging",
    ],
    tools: ["NestJS", "Node.js", "MongoDB", "PostgreSQL", "MySQL", "Docker"],
  },
];

export default devServices;
