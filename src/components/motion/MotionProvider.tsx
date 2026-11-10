"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide motion + interaction wiring (runs after every route change):
 *  - [data-reveal]          → fade/rise in on scroll (skipped under reduced motion)
 *  - [data-chapter="dev"]   → re-inks the page accent while that chapter is in view
 *  - [data-page-discipline] → sets the accent for a whole page (team/service pages)
 *  - .card-interactive      → cursor spotlight coordinates (fine pointers only)
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const pageDiscipline = document.querySelector<HTMLElement>("[data-page-discipline]")?.dataset.pageDiscipline;
    if (pageDiscipline) root.dataset.discipline = pageDiscipline;
    else delete root.dataset.discipline;

    const mm = gsap.matchMedia();

    // Reveal on scroll
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(els, { opacity: 0, y: 16, animation: "none" });
      ScrollTrigger.batch(els, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.06, overwrite: true }),
      });
    });

    // Chapter accent switching (color only, so it also runs under reduced motion)
    const triggers = gsap.utils.toArray<HTMLElement>("[data-chapter]").map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          const d = el.dataset.chapter!;
          if (self.isActive) root.dataset.discipline = d;
          else if (root.dataset.discipline === d && !pageDiscipline) delete root.dataset.discipline;
        },
      }),
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, [pathname]);

  // Cursor spotlight on interactive cards + 3D tilt on [data-tilt] elements
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canTilt = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    let frame = 0;
    let tilted: HTMLElement | null = null;
    const resetTilt = (el: HTMLElement) =>
      gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)", overwrite: "auto" });

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.<HTMLElement>(".card-interactive");
      const tiltEl = canTilt ? (target?.closest?.<HTMLElement>("[data-tilt]") ?? null) : null;
      if (tilted && tilted !== tiltEl) {
        resetTilt(tilted);
        tilted = null;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        if (tiltEl) {
          tilted = tiltEl;
          const r = tiltEl.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(tiltEl, {
            rotateY: px * 10,
            rotateX: -py * 10,
            y: -4,
            transformPerspective: 900,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };
    const onLeaveWindow = () => {
      if (tilted) resetTilt(tilted);
      tilted = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
