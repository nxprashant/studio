import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Seller } from "@/content";

/** Seller photo, or an accent-ink monogram when no photo is set in content. */
export function Avatar({ seller, size = 64, className }: { seller: Seller; size?: number; className?: string }) {
  if (seller.photo) {
    return (
      <Image
        src={seller.photo}
        alt={`Portrait of ${seller.name}`}
        width={size}
        height={size}
        className={cn("rounded-2xl object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      data-discipline={seller.discipline}
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-2xl border border-border font-display font-bold text-accent",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: "color-mix(in oklab, var(--accent) 12%, var(--card))",
      }}
    >
      {seller.name.charAt(0)}
    </span>
  );
}
