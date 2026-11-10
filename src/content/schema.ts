/**
 * Content schemas. Every content file is validated against these at build time,
 * so a typo (missing field, unknown seller, bad slug) fails `npm run build`
 * with a readable error instead of shipping a broken page.
 */
import { z } from "zod";
import { ICON_NAMES } from "@/components/ui/icon-names";

export const disciplineSchema = z.enum(["dev", "pub", "data"]);
export type Discipline = z.infer<typeof disciplineSchema>;

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase-words-with-dashes for slugs");

const iconName = z.enum(ICON_NAMES);

export const siteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(50).max(170),
  url: z.url(),
  email: z.email(),
  phone: z.string().optional(),
  location: z.string(),
  /** Optional form endpoint (e.g. Formspree/Web3Forms). Empty = the form opens the visitor's email app. */
  formEndpoint: z.string().optional(),
  socials: z.array(z.object({ label: z.string(), href: z.url() })),
  stats: z.array(z.object({ value: z.number(), suffix: z.string().default(""), label: z.string() })),
  keywords: z.array(z.string()),
});

export const sellerSchema = z.object({
  slug,
  name: z.string(),
  role: z.string(),
  discipline: disciplineSchema,
  /** Chapter label used on the home page, e.g. "Code" */
  chapter: z.string(),
  headline: z.string(),
  bio: z.array(z.string()).min(1),
  /** Optional photo in /public, e.g. "/team/prashant.jpg". Falls back to a monogram. */
  photo: z.string().optional(),
  location: z.string().optional(),
  yearsExperience: z.number().int().nonnegative(),
  email: z.email().optional(),
  socials: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
  skills: z.array(z.string()).min(1),
  experience: z
    .array(
      z.object({
        period: z.string(),
        title: z.string(),
        org: z.string(),
        summary: z.string(),
      }),
    )
    .default([]),
});

export const serviceSchema = z.object({
  slug,
  title: z.string(),
  seller: slug,
  icon: iconName,
  summary: z.string().max(160),
  description: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).min(1),
  tools: z.array(z.string()).default([]),
  /** Feature this service as a large tile in the bento grid */
  featured: z.boolean().default(false),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
});

export const projectSchema = z.object({
  slug,
  title: z.string(),
  seller: slug,
  services: z.array(slug).min(1),
  client: z.string(),
  year: z.number().int(),
  summary: z.string().max(200),
  challenge: z.string(),
  solution: z.string(),
  outcome: z.array(z.string()).min(1),
  tech: z.array(z.string()).default([]),
  /** Optional cover image in /public. Falls back to a generated cover. */
  cover: z.string().optional(),
  url: z.url().optional(),
  featured: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  seller: slug,
});

export const processStepSchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: iconName,
});

export type Site = z.infer<typeof siteSchema>;
export type Seller = z.infer<typeof sellerSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;

/** Input types (what you write in content files — defaults are optional) */
export type SiteInput = z.input<typeof siteSchema>;
export type SellerInput = z.input<typeof sellerSchema>;
export type ServiceInput = z.input<typeof serviceSchema>;
export type ProjectInput = z.input<typeof projectSchema>;
export type TestimonialInput = z.input<typeof testimonialSchema>;
export type ProcessStepInput = z.input<typeof processStepSchema>;
