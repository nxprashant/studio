import type { MetadataRoute } from "next";
import { projects, sellers, services } from "@/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/services", 0.9),
    page("/projects", 0.8),
    page("/team", 0.7),
    page("/contact", 0.7),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    ...sellers.map((s) => page(`/team/${s.slug}`, 0.7)),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.6)),
  ];
}
