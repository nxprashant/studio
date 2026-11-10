import Image from "next/image";
import type { Discipline } from "@/content";
import { cn } from "@/lib/cn";

/** Deterministic pseudo-random numbers from a string, so covers are stable between builds. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function DevArt({ rnd }: { rnd: () => number }) {
  const lines = Array.from({ length: 9 }, (_, i) => ({
    y: 46 + i * 22,
    indent: [0, 1, 2, 2, 1, 2, 3, 1, 0][i] * 22,
    w: 60 + rnd() * 170,
    accent: rnd() > 0.65,
  }));
  return (
    <>
      <rect x="28" y="20" width="344" height="236" rx="14" fill="var(--card)" stroke="var(--border)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={46 + i * 14} cy="34" r="4" fill="var(--border)" />
      ))}
      {lines.map((l, i) => (
        <g key={i}>
          <rect x={52 + l.indent} y={l.y} width={28} height="8" rx="4" fill="var(--muted-foreground)" opacity="0.35" />
          <rect
            x={86 + l.indent}
            y={l.y}
            width={l.w}
            height="8"
            rx="4"
            fill={l.accent ? "var(--accent)" : "var(--foreground)"}
            opacity={l.accent ? 0.9 : 0.18}
          />
        </g>
      ))}
    </>
  );
}

function PubArt({ rnd }: { rnd: () => number }) {
  const lines = Array.from({ length: 10 }, () => 0.55 + rnd() * 0.45);
  return (
    <>
      <rect x="70" y="26" width="150" height="224" rx="6" fill="var(--card)" stroke="var(--border)" transform="rotate(-4 145 138)" />
      <rect x="180" y="22" width="150" height="224" rx="6" fill="var(--card)" stroke="var(--border)" />
      <text x="198" y="92" fontSize="58" fontWeight="700" fill="var(--accent)" fontFamily="Georgia, serif">
        A
      </text>
      {lines.map((w, i) => (
        <rect
          key={i}
          x={i < 3 ? 244 : 198}
          y={50 + i * 18}
          width={(i < 3 ? 70 : 114) * w}
          height="6"
          rx="3"
          fill="var(--foreground)"
          opacity="0.2"
        />
      ))}
      <rect x="198" y="236" width="40" height="4" rx="2" fill="var(--accent)" opacity="0.7" />
    </>
  );
}

function DataArt({ rnd }: { rnd: () => number }) {
  const pts = Array.from({ length: 46 }, () => ({ x: 40 + rnd() * 320, y: 40 + rnd() * 196, r: 2 + rnd() * 4 }));
  const trend = pts.filter((_, i) => i % 6 === 0).sort((a, b) => a.x - b.x);
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="32" x2="368" y1={60 + i * 52} y2={60 + i * 52} stroke="var(--border)" />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="var(--foreground)" opacity="0.18" />
      ))}
      <polyline
        points={trend.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {trend.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="var(--accent)" />
      ))}
    </>
  );
}

/** Project cover: uses a real image when provided, otherwise a generated discipline-themed artwork. */
export function Cover({
  seed,
  discipline,
  image,
  alt,
  className,
  priority,
}: {
  seed: string;
  discipline: Discipline;
  image?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <div className={cn("relative aspect-[10/7] overflow-hidden", className)}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={priority} />
      </div>
    );
  }
  const rnd = seeded(seed);
  const Art = discipline === "dev" ? DevArt : discipline === "pub" ? PubArt : DataArt;
  return (
    <div
      data-discipline={discipline}
      className={cn("relative aspect-[10/7] overflow-hidden", className)}
      style={{ background: "color-mix(in oklab, var(--accent) 7%, var(--muted))" }}
    >
      <svg viewBox="0 0 400 276" className="absolute inset-0 h-full w-full" role="img" aria-label={alt}>
        <Art rnd={rnd} />
      </svg>
    </div>
  );
}
