"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { TechLogo } from "@/components/ui/TechLogo";

/** Infinite skill marquee with a visible pause control (WCAG 2.2.2). Static wrap under reduced motion. */
export function StackMarquee({ items, label }: { items: string[]; label: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">{label}</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play tech stack animation" : "Pause tech stack animation"}
          className="grid h-11 w-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent motion-reduce:hidden"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>
      <div className="marquee" data-paused={paused}>
        {[false, true].map((hidden) => (
          <ul key={String(hidden)} className="marquee-track" aria-label={hidden ? undefined : label} aria-hidden={hidden || undefined}>
            {items.map((s) => (
              <li key={s} className="chip gap-2 px-4 py-2 text-[0.9375rem] text-foreground">
                <TechLogo name={s} size={16} className="text-accent" />
                {s}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
