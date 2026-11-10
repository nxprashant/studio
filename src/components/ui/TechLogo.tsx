import { techIcon } from "@/lib/tech-icons";

/** Monochrome brand logo for a tech name (decorative; pair it with visible text). Renders nothing if unknown. */
export function TechLogo({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const icon = techIcon(name);
  if (!icon) return null;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
