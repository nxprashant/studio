import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { disciplineOf, getSeller } from "@/content";
import type { Testimonial } from "@/content/schema";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="Kind words" title="What clients say." />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <li key={i} data-discipline={disciplineOf(t.seller)} className="card flex flex-col gap-6 p-6 lg:p-8" data-reveal>
              <Quote size={28} aria-hidden="true" className="text-accent" />
              <blockquote className="flex-1 text-lg leading-relaxed">
                <p>{t.quote}</p>
              </blockquote>
              <footer className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <span className="chip">with {getSeller(t.seller)?.name}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
