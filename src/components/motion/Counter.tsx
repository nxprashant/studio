"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Counts up once when scrolled into view. Server HTML contains the final number (SEO / no-JS safe). */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { n: 0 };
    el.textContent = `0${suffix}`;
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tween = gsap.to(obj, {
          n: value,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}${suffix}`;
          },
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
