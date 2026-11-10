import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)} data-reveal>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
        {title}
      </Tag>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
