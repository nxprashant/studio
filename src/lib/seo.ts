import type { Metadata } from "next";
import { getSeller, site, type Project, type Seller, type Service } from "@/content";

/** Absolute URL with the trailing slash the static export uses. */
export function absoluteUrl(path = "/") {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return new URL(clean, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} · ${site.name}` : site.name,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${site.name}` : site.name,
      description,
    },
  };
}

/* ---------------------------------------------------------------- JSON-LD */

const orgId = `${site.url}/#organization`;

export function organizationLd(sellers: Seller[], services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    email: site.email,
    areaServed: "Worldwide",
    sameAs: site.socials.map((s) => s.href),
    employee: sellers.map((s) => ({ "@id": personId(s) })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((svc) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: svc.title, url: absoluteUrl(`/services/${svc.slug}`) },
      })),
    },
  };
}

function personId(s: Seller) {
  return `${site.url}/team/${s.slug}/#person`;
}

export function personLd(s: Seller, services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(s),
    name: s.name,
    jobTitle: s.role,
    description: s.headline,
    url: absoluteUrl(`/team/${s.slug}`),
    worksFor: { "@id": orgId },
    knowsAbout: [...s.skills, ...services.map((x) => x.title)],
    sameAs: s.socials.map((x) => x.href),
  };
}

export function serviceLd(svc: Service) {
  const seller = getSeller(svc.seller);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.summary,
    url: absoluteUrl(`/services/${svc.slug}`),
    serviceType: svc.title,
    areaServed: "Worldwide",
    provider: { "@id": orgId },
    ...(seller ? { broker: { "@id": personId(seller) } } : {}),
  };
}

export function projectLd(p: Project) {
  const seller = getSeller(p.seller);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: absoluteUrl(`/projects/${p.slug}`),
    dateCreated: String(p.year),
    keywords: p.tech.join(", "),
    ...(seller ? { creator: { "@id": personId(seller) } } : {}),
    publisher: { "@id": orgId },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
