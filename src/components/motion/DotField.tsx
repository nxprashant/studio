"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot grid on <canvas>. Dots near the cursor swell, take the current accent colour
 * and drift away from the pointer. Static (no listeners, no RAF) under reduced motion or on touch.
 * Pauses when offscreen; re-reads theme/accent colours as they change.
 */
export function DotField({ spacing = 26, radius = 150 }: { spacing?: number; radius?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const interactive = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let fg = "#0b0f19";
    let accent = "#1d4ed8";
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let energy = 0; // 0..1, eases in/out with pointer presence
    let target = 0;
    let raf = 0;
    let visible = true;

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      fg = cs.getPropertyValue("--foreground").trim() || fg;
      accent = cs.getPropertyValue("--accent").trim() || accent;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = (w % spacing) / 2;
      const oy = (h % spacing) / 2;
      for (let y = oy; y < h; y += spacing) {
        for (let x = ox; x < w; x += spacing) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - d / radius) * energy; // 0..1 influence
          const push = t * 10;
          const px = d > 0 ? x + (dx / d) * push : x;
          const py = d > 0 ? y + (dy / d) * push : y;
          ctx.globalAlpha = 0.14 + t * 0.75;
          ctx.fillStyle = t > 0.02 ? accent : fg;
          ctx.beginPath();
          ctx.arc(px, py, 1.1 + t * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      energy += (target - energy) * 0.08;
      draw();
      const settled = Math.abs(target - energy) < 0.005 && Math.abs(pointer.tx - pointer.x) < 0.5;
      raf = settled || !visible ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (target === 0) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      target = 1;
      kick();
    };
    const onLeave = () => {
      target = 0;
      kick();
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // Re-read colours when theme or chapter accent changes (accent transitions take ~400ms)
    const onColorChange = () => {
      readColors();
      draw();
      window.setTimeout(() => {
        readColors();
        draw();
      }, 450);
    };
    const mo = new MutationObserver(onColorChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-discipline"] });
    mo.observe(host, { attributes: true, attributeFilter: ["data-discipline"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onColorChange);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) kick();
    });
    io.observe(host);

    if (interactive) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      mq.removeEventListener("change", onColorChange);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [spacing, radius]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />;
}
