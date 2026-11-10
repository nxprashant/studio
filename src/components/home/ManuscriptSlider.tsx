"use client";

import { useId, useState } from "react";

/**
 * Before/after comparison: raw manuscript vs. typeset, accessible eBook page.
 * Operated by a native range input, so it works with keyboard, touch and screen readers.
 */
export function ManuscriptSlider() {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Manuscript → eBook</p>
        <p className="font-mono text-[0.8125rem] text-muted-foreground" aria-hidden="true">
          drag to compare
        </p>
      </div>

      <div className="group/slider relative min-h-[260px] flex-1 select-none overflow-hidden rounded-2xl border border-border">
        {/* AFTER: typeset page */}
        <div className="absolute inset-0 bg-card p-5 sm:p-7" aria-hidden="true">
          <p className="font-mono text-[0.75rem] uppercase tracking-widest text-accent">Chapter One</p>
          <p className="mt-2 font-display text-2xl font-bold leading-tight">The River Remembers</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground" style={{ fontFamily: "Georgia, serif" }}>
            <span className="float-left mr-2 mt-1 font-display text-5xl font-bold leading-[0.8] text-accent">T</span>
            he morning came slowly to the valley, as if it, too, were reluctant to wake. Mira stood at the water&rsquo;s edge and
            listened for the sound her grandmother had promised.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">EPUB 3</span>
            <span className="chip">alt text</span>
            <span className="chip">WCAG AA</span>
          </div>
        </div>

        {/* BEFORE: raw manuscript, clipped by slider */}
        <div
          className="absolute inset-0 bg-muted p-5 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground sm:p-7"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <p>manuscript_FINAL_v7(2).docx</p>
          <p className="mt-3">CHAPTER 1&nbsp;&nbsp;&nbsp;&nbsp;the river remembers</p>
          <p className="mt-2">
            the morning came slowly to the valley,as if it ,too were reluctant to wake.&nbsp;&nbsp;Mira stood at the waters
            edge and listened for the sound her grandmother had promised. [IMAGE HERE?] [[check font]]
          </p>
          <p className="text-danger-strong mt-2">14 style errors · no alt text · broken TOC</p>
        </div>

        {/* Divider handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
          style={{ left: `calc(${pos}% - 1px)` }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-lg group-has-[input:focus-visible]/slider:outline-2 group-has-[input:focus-visible]/slider:outline-offset-3 group-has-[input:focus-visible]/slider:outline-accent group-has-[input:focus-visible]/slider:outline-solid">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3 1 8l4 5M11 3l4 5-4 5" />
            </svg>
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Compare raw manuscript and finished eBook page: {pos}% manuscript shown
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
