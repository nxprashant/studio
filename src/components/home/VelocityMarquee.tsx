"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechLogo } from "@/components/ui/TechLogo";
import type { Discipline } from "@/content";

gsap.registerPlugin(ScrollTrigger);

type Item = { label: string; href: string; discipline: Discipline };

/**
 * Kinetic two-row band: big service names (links) and tech logos, moving in opposite directions.
 * Scrolling speeds it up and scroll direction flips it (scroll-velocity marquee).
 * Hover pauses a row; the pause button stops everything (WCAG 2.2.2). Static under reduced motion.
 */
export function VelocityMarquee({ services, tech }: { services: Item[]; tech: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims = () => Array.from(root.querySelectorAll<HTMLElement>(".marquee-track")).flatMap((el) => el.getAnimations());
    let velocity = 0;
    let dir = 1;
    let rate = 1;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        velocity = self.getVelocity();
        dir = self.direction;
      },
    });
    const tick = () => {
      if (pausedRef.current) return;
      const target = (1 + Math.min(Math.abs(velocity) / 250, 5)) * dir;
      rate += (target - rate) * 0.1;
      velocity *= 0.9;
      for (const a of anims()) a.playbackRate = rate;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  const serviceRow = (hidden: boolean) => (
    <ul className="marquee-track items-center !gap-10 pr-10" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Services"}>
      {services.map((s, i) => (
        <li key={s.label} data-discipline={s.discipline} className="flex items-center gap-10">
          <Link
            href={s.href}
            tabIndex={hidden ? -1 : undefined}
            className={
              i % 2
                ? "marquee-outline font-display text-5xl font-bold tracking-tight whitespace-nowrap transition-colors md:text-7xl"
                : "font-display text-5xl font-bold tracking-tight whitespace-nowrap text-foreground transition-colors hover:text-accent md:text-7xl"
            }
          >
            {s.label}
          </Link>
          <span aria-hidden="true" className="h-3 w-3 rotate-45 rounded-[3px] bg-accent md:h-4 md:w-4" />
        </li>
      ))}
    </ul>
  );

  const techRow = (hidden: boolean) => (
    <ul className="marquee-track reverse items-center" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Tools we use"}>
      {tech.map((t) => (
        <li
          key={t}
          className="flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 font-medium whitespace-nowrap text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
        >
          <TechLogo name={t} size={20} />
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What we do" className="relative border-y border-border py-10 md:py-14">
      <div ref={rootRef} className="space-y-8" data-paused={paused}>
        <div className="marquee hover-pause" data-paused={paused}>
          {serviceRow(false)}
          {serviceRow(true)}
        </div>
        <div className="marquee hover-pause" data-paused={paused}>
          {techRow(false)}
          {techRow(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play moving banners" : "Pause moving banners"}
        className="absolute right-4 bottom-3 grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent motion-reduce:hidden md:right-8"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </section>
  );
}
