import { FileCheck2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Seller, Service } from "@/content";

/** Deliverables that let a client verify the work themselves (reports, docs, logs, proofs). */
const VERIFIABLE = /report|docs|documentation|log\b|tests|proof rounds/i;

function proofFor(services: Service[]) {
  const items = [...new Set(services.flatMap((s) => s.deliverables))].filter((d) => VERIFIABLE.test(d));
  // Reports first: they are the most direct evidence.
  return items.sort((a, b) => Number(/report/i.test(b)) - Number(/report/i.test(a))).slice(0, 4);
}

/**
 * Honest stand-in for testimonials while there are no real ones (PRODUCT.md: "Honest until proven").
 * Lists the checkable evidence each specialist already ships, taken from their own service deliverables.
 */
export function Proof({ people }: { people: { seller: Seller; services: Service[] }[] }) {
  return (
    <section aria-labelledby="proof-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="proof-title"
          title="Every job ships with its own proof."
          intro="Validation reports, QA checks and documentation come with the files, so you can verify the work yourself instead of taking our word for it."
        />
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {people.map(({ seller, services }) => (
            <li key={seller.slug} data-discipline={seller.discipline} className="border-t border-border pt-6" data-reveal>
              <p className="font-display text-xl font-semibold">
                From <span className="text-accent">{seller.name}</span>
              </p>
              <ul className="mt-4 space-y-3">
                {proofFor(services).map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <FileCheck2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
