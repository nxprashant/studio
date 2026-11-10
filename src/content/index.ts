/**
 * Content entry point. Pages import ONLY from here.
 * Everything is validated at build time; cross-references (seller/service slugs) are checked too.
 *
 * To add a seller: create sellers/<name>.ts and add it to `sellerFiles` below.
 * To add services: add entries to services/*.ts (or a new file added to `serviceFiles`).
 */
import { z } from "zod";
import {
  processStepSchema,
  projectSchema,
  sellerSchema,
  serviceSchema,
  siteSchema,
  testimonialSchema,
  type Discipline,
  type Project,
  type Seller,
  type Service,
} from "./schema";

import siteInput from "./site";
import prashant from "./sellers/prashant";
import himanshu from "./sellers/himanshu";
import lokesh from "./sellers/lokesh";
import devServices from "./services/dev";
import publishingServices from "./services/publishing";
import dataServices from "./services/data";
import projectsInput from "./projects";
import testimonialsInput from "./testimonials";
import processInput from "./process";

/** Order here = order of chapters on the home page. */
const sellerFiles = [prashant, himanshu, lokesh];
const serviceFiles = [devServices, publishingServices, dataServices];

function parse<T extends z.ZodType>(schema: T, data: unknown, label: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in ${label}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const site = parse(siteSchema, siteInput, "site.ts");
export const sellers: Seller[] = sellerFiles.map((s, i) => parse(sellerSchema, s, `sellers[${i}]`));
export const services: Service[] = serviceFiles
  .flat()
  .map((s, i) => parse(serviceSchema, s, `services[${i}] (${(s as { slug?: string }).slug})`));
export const projects: Project[] = projectsInput.map((p, i) =>
  parse(projectSchema, p, `projects[${i}] (${p.slug})`),
);
export const testimonials = testimonialsInput.map((t, i) => parse(testimonialSchema, t, `testimonials[${i}]`));
export const processSteps = processInput.map((p, i) => parse(processStepSchema, p, `process[${i}]`));

/* ---------------------------------------------------------------- integrity checks */

function assertUnique(items: { slug: string }[], label: string) {
  const seen = new Set<string>();
  for (const { slug } of items) {
    if (seen.has(slug)) throw new Error(`Duplicate ${label} slug "${slug}"`);
    seen.add(slug);
  }
}
assertUnique(sellers, "seller");
assertUnique(services, "service");
assertUnique(projects, "project");

const sellerSlugs = new Set(sellers.map((s) => s.slug));
const serviceSlugs = new Set(services.map((s) => s.slug));
for (const s of services) {
  if (!sellerSlugs.has(s.seller)) throw new Error(`Service "${s.slug}" references unknown seller "${s.seller}"`);
}
for (const p of projects) {
  if (!sellerSlugs.has(p.seller)) throw new Error(`Project "${p.slug}" references unknown seller "${p.seller}"`);
  for (const svc of p.services) {
    if (!serviceSlugs.has(svc)) throw new Error(`Project "${p.slug}" references unknown service "${svc}"`);
  }
}
for (const t of testimonials) {
  if (!sellerSlugs.has(t.seller)) throw new Error(`Testimonial by "${t.name}" references unknown seller "${t.seller}"`);
}

/* ---------------------------------------------------------------- helpers */

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  dev: "Development",
  pub: "ePublishing",
  data: "Data",
};

export function getSeller(slug: string) {
  return sellers.find((s) => s.slug === slug);
}
export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
export function servicesBySeller(slug: string) {
  return services.filter((s) => s.seller === slug);
}
export function projectsBySeller(slug: string) {
  return projects.filter((p) => p.seller === slug);
}
export function projectsByService(slug: string) {
  return projects.filter((p) => p.services.includes(slug));
}
export function disciplineOf(sellerSlug: string): Discipline {
  return getSeller(sellerSlug)?.discipline ?? "dev";
}

export const stats = [
  { value: services.length, suffix: "", label: "Services offered" },
  { value: sellers.reduce((n, s) => n + s.yearsExperience, 0), suffix: "+", label: "Years combined" },
  ...site.stats,
];

export type { Discipline, Project, Seller, Service };
