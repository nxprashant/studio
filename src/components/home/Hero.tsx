"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { gsap } from "gsap";
import { DotField } from "@/components/motion/DotField";
import { Avatar } from "@/components/ui/Avatar";
import { DisciplineGlyph } from "./DisciplineGlyph";
import type { Discipline, Seller } from "@/content";

export type HeroTile = {
  seller: Seller;
  discipline: Discipline;
  phrase: string;
  serviceCount: number;
  topServices: string[];
};

/**
 * People-first hero: the full three-ink sentence, then three equal doors, one per specialist.
 * Each door leads to that person's chapter or straight to a brief addressed to them.
 * Cross-discipline element, so all three inks appear together (DESIGN.md, One Ink Rule exception).
 */
export function Hero({ tiles, description }: { tiles: HeroTile[]; description: string }) {
  const inkRefs = useRef<(SVGPathElement | null)[]>([]);

  // The one authored moment: each phrase's ink underline draws in, in reading order.
  // The words are visible from the first frame; only the underline animates.
  useLayoutEffect(() => {
    const paths = inkRefs.current.filter(Boolean) as SVGPathElement[];
    if (!paths.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.8, ease: "expo.out", stagger: 0.28, delay: 0.25 },
    );
    return () => {
      tween.kill();
      gsap.set(paths, { strokeDashoffset: 0 });
    };
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
      <DotField />

      <div className="container-x">
        <h1 id="hero-title" className="text-display max-w-[17ch] leading-[1.08]">
          We{" "}
          {tiles.map((t, i) => {
            const last = i === tiles.length - 1;
            // Punctuation rides with its phrase so a line never starts with a comma.
            const trail = last ? "." : i === tiles.length - 2 ? "" : ",";
            return (
            <Fragment key={t.seller.slug}>
              {last && i > 0 && "and "}
              <span className="whitespace-nowrap">
              <span data-discipline={t.discipline} className="relative inline-block text-accent">
                {t.phrase}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[0.1em] left-0 h-[0.2em] w-full"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                >
                  <path
                    ref={(el) => {
                      inkRefs.current[i] = el;
                    }}
                    d="M3 14 C 60 4, 120 18, 180 9 S 270 6, 297 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={0}
                  />
                </svg>
              </span>
              {trail}
              </span>
              {!last && " "}
            </Fragment>
            );
          })}
        </h1>

        <div className="mt-10 max-w-xl">
          <p className="text-lg text-muted-foreground">{description}</p>
          <p className="mt-5 font-semibold">
            Not sure who you need?{" "}
            <a href="#brief-any" className="link-underline inline-flex min-h-11 items-center gap-1.5">
              Start a brief and we&rsquo;ll route it <ArrowRight size={18} aria-hidden="true" />
            </a>
          </p>
        </div>

        {/* Three equal doors: the person is the proof. */}
        <ul aria-label="Who you'll work with" className="mt-16 grid gap-4 md:grid-cols-3 lg:gap-6">
          {tiles.map((t) => {
            const { seller } = t;
            return (
              <li
                key={seller.slug}
                data-discipline={t.discipline}
                className="card card-interactive group flex flex-col p-6 lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <Avatar seller={seller} size={56} />
                  <DisciplineGlyph discipline={t.discipline} />
                </div>

                <p className="mt-6 font-display text-2xl font-semibold tracking-tight">{seller.name}</p>
                <p className="text-muted-foreground">{seller.role}</p>

                <ul className="mb-7 mt-5 space-y-1.5 text-muted-foreground">
                  {t.topServices.map((s) => (
                    <li key={s} className="flex items-baseline gap-2.5">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 -translate-y-[0.15em] rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col items-start border-t border-border pt-3">
                  <a
                    href={`#brief-${t.discipline}`}
                    className="relative z-[2] inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
                  >
                    <span className="link-underline">Brief {seller.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={`#chapter-${seller.slug}`}
                    className="stretched-link inline-flex min-h-11 items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    See {seller.name}&rsquo;s {t.serviceCount} services
                    <ArrowDownRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
