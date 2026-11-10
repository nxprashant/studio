import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { Cover } from "@/components/ui/Cover";
import { TechLogo } from "@/components/ui/TechLogo";
import type { Discipline, Project } from "@/content";
import { cn } from "@/lib/cn";

/** Project tile. The cover morphs into the project page hero via a shared view transition. */
export function ProjectCard({
  project,
  discipline,
  sellerName,
  className,
  headingLevel = "h3",
}: {
  project: Project;
  discipline: Discipline;
  sellerName: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article data-discipline={discipline} data-tilt className={cn("card card-interactive group flex flex-col", className)}>
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <Cover
          seed={project.slug}
          discipline={discipline}
          image={project.cover}
          alt={`${project.title} cover`}
          className="border-b border-border [&_svg]:transition-transform [&_svg]:duration-700 group-hover:[&_svg]:scale-[1.06]"
        />
      </ViewTransition>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-[0.8125rem] text-muted-foreground">
          {project.year} · {sellerName} · {project.client}
        </p>
        <H className="font-display text-xl font-semibold leading-snug">
          <Link href={`/projects/${project.slug}/`} className="stretched-link">
            {project.title}
          </Link>
        </H>
        <p className="text-[0.9375rem] text-muted-foreground">{project.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.slice(0, 3).map((t) => (
              <li key={t} className="chip">
                <TechLogo name={t} size={13} />
                {t}
              </li>
            ))}
          </ul>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-accent transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
          >
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </article>
  );
}
