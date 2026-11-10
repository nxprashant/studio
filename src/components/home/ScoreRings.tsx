"use client";

import { useEffect, useRef, useState } from "react";

const SCORES = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best practices", value: 100 },
  { label: "SEO", value: 100 },
];

/** Lighthouse-style score rings that fill when scrolled into view. */
export function ScoreRings() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="px-6">
      <p className="eyebrow mb-3">Lighthouse targets, every build</p>
      <ul className="grid grid-cols-4 gap-2">
        {SCORES.map((s, i) => (
          <li key={s.label} className="flex flex-col items-center gap-2 text-center">
            <span className="relative grid h-16 w-16 place-items-center">
              <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="28" cy="28" r={r} fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle
                  cx="28"
                  cy="28"
                  r={r}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={on ? c * (1 - s.value / 100) : c}
                  style={{ transition: `stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1) ${i * 120}ms` }}
                />
              </svg>
              <span className="font-mono text-sm font-bold text-accent">{s.value}</span>
            </span>
            <span className="text-[0.8125rem] leading-tight text-muted-foreground">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
