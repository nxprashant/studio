"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ProjectCard } from "./ProjectCard";
import type { Discipline, Project } from "@/content";

gsap.registerPlugin(Flip);

type Filter = { id: string; label: string; discipline?: Discipline };

/** Filterable project grid; cards reflow with GSAP Flip. Filters are real toggle buttons. */
export function ProjectGrid({
  projects,
  filters,
  meta,
}: {
  projects: Project[];
  filters: Filter[];
  meta: Record<string, { discipline: Discipline; sellerName: string }>;
}) {
  const [active, setActive] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const state = useRef<Flip.FlipState | null>(null);

  const select = (id: string) => {
    if (id === active) return;
    if (gridRef.current) state.current = Flip.getState(gridRef.current.children);
    setActive(id);
  };

  useLayoutEffect(() => {
    const s = state.current;
    state.current = null;
    if (!s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = Flip.from(s, {
      targets: gridRef.current?.children,
      duration: 0.5,
      ease: "expo.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }),
    });
    return () => {
      tl.kill();
    };
  }, [active]);

  const visible = active === "all" ? projects : projects.filter((p) => p.seller === active);
  const activeFilter = filters.find((f) => f.id === active);

  return (
    <div data-discipline={activeFilter?.discipline} className="ink-transition">
      <div role="group" aria-label="Filter projects by expert" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            data-discipline={f.discipline}
            aria-pressed={active === f.id}
            onClick={() => select(f.id)}
            className="chip chip-toggle"
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
      </p>
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            discipline={meta[p.slug].discipline}
            sellerName={meta[p.slug].sellerName}
            headingLevel="h2"
          />
        ))}
      </div>
    </div>
  );
}
