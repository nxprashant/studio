import { Icon } from "@/components/ui/Icon";
import { ScrubLine } from "@/components/motion/ScrubLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/content/schema";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section aria-labelledby="process-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="One simple process, whichever expert you hire."
          intro="Clear scope, fixed pricing and regular previews. No surprises."
        />
        <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ScrubLine className="absolute top-[52px] right-[12%] left-[12%] hidden h-0.5 rounded-full bg-border lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="card relative p-6" data-reveal>
              <div className="mb-6 flex items-center justify-between">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border border-border bg-card text-foreground">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-mono text-4xl font-bold text-muted-foreground/45" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
