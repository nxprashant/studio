import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "./Icon";
import { TechLogo } from "./TechLogo";
import type { Discipline, Service } from "@/content";
import { cn } from "@/lib/cn";

export function ServiceCard({
  service,
  discipline,
  large,
  className,
  headingLevel = "h3",
}: {
  service: Service;
  discipline: Discipline;
  large?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article
      data-discipline={discipline}
      data-reveal
      className={cn("card card-interactive group flex flex-col gap-5 p-6", large && "lg:p-8", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent"
          style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)" }}
        >
          <Icon name={service.icon} size={24} />
        </span>
        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <H className={cn("font-display font-semibold leading-snug", large ? "text-2xl" : "text-xl")}>
          <Link href={`/services/${service.slug}/`} className="stretched-link">
            {service.title}
          </Link>
        </H>
        <p className="text-[0.9375rem] text-muted-foreground">{service.summary}</p>
      </div>
      {large && service.tools.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Tools">
          {service.tools.slice(0, 4).map((t) => (
            <li key={t} className="chip">
              <TechLogo name={t} size={13} />
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
