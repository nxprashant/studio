import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DISCIPLINE_LABEL, sellers, servicesBySeller, site } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-border">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl font-bold">{site.name}</p>
          <p className="mt-3 max-w-sm text-muted-foreground">{site.tagline}</p>
          <p className="mt-6 text-sm text-muted-foreground">{site.location}</p>
          <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block font-semibold">
            {site.email}
          </a>
        </div>

        {sellers.map((s) => (
          <nav key={s.slug} aria-label={`${DISCIPLINE_LABEL[s.discipline]} services`} data-discipline={s.discipline} className="lg:col-span-2">
            <p className="eyebrow mb-4">{DISCIPLINE_LABEL[s.discipline]}</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {servicesBySeller(s.slug).map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/services/${svc.slug}/`} className="text-muted-foreground transition-colors hover:text-accent">
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Studio" className="lg:col-span-2">
          <p className="eyebrow mb-4 text-muted-foreground">Studio</p>
          <ul className="space-y-2.5 text-[0.9375rem]">
            {sellers.map((s) => (
              <li key={s.slug}>
                <Link href={`/team/${s.slug}/`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects/" className="text-muted-foreground transition-colors hover:text-foreground">
                Work
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-4">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                {s.label}
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
