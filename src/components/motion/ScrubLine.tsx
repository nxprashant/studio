"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** A line that draws itself as you scroll through its section. Fully drawn under reduced motion. */
export function ScrubLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, []);
  return <span ref={ref} aria-hidden="true" className={className} style={{ transformOrigin: "left center" }} />;
}
