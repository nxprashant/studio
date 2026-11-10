"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/icon-names";
import type { Discipline } from "@/content";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type Item = { slug: string; label: string; discipline: Discipline; icon: IconName };

/** Floating chapter switcher with per-chapter reading progress. Appears while the chapters are on screen. */
export function ChapterNav({ items }: { items: Item[] }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const bars = useRef<Record<string, HTMLSpanElement | null>>({});

  useEffect(() => {
    const sections = items.map((it) => document.getElementById(`chapter-${it.slug}`)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const triggers = sections.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 60%",
        onUpdate: (self) => {
          const bar = bars.current[items[i].slug];
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
        },
        onToggle: (self) => self.isActive && setActive(items[i].slug),
      }),
    );
    const range = ScrollTrigger.create({
      trigger: sections[0],
      endTrigger: sections[sections.length - 1],
      start: "top 70%",
      end: "bottom 40%",
      onToggle: (self) => setVisible(self.isActive),
    });
    return () => {
      triggers.forEach((t) => t.kill());
      range.kill();
    };
  }, [items]);

  const go = (slug: string) => {
    const el = document.getElementById(`chapter-${slug}`);
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };

  return (
    <nav
      aria-label="Chapters"
      className={cn(
        "fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
      aria-hidden={!visible || undefined}
    >
      <ul className="flex items-center gap-1 rounded-2xl border border-border bg-card/85 p-1.5 shadow-lg backdrop-blur-md">
        {items.map((it, i) => (
          <li key={it.slug} data-discipline={it.discipline}>
            <button
              type="button"
              onClick={() => go(it.slug)}
              tabIndex={visible ? undefined : -1}
              aria-current={active === it.slug ? "step" : undefined}
              className={cn(
                "relative flex min-h-11 items-center gap-2 overflow-hidden rounded-xl px-3 text-sm font-semibold transition-colors sm:px-4",
                active === it.slug ? "bg-accent text-on-accent" : "text-muted-foreground hover:text-accent",
              )}
            >
              <Icon name={it.icon} size={16} />
              <span aria-hidden="true" className="font-mono text-[0.8125rem]">{String(i + 1).padStart(2, "0")}</span>
              <span className="sr-only sm:not-sr-only">{it.label}</span>
              <span
                ref={(el) => {
                  bars.current[it.slug] = el;
                }}
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-2 bottom-1 h-0.5 origin-left rounded-full",
                  active === it.slug ? "bg-on-accent/70" : "bg-accent",
                )}
                style={{ transform: "scaleX(0)" }}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
