import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Avatar } from "@/components/ui/Avatar";
import { DISCIPLINE_LABEL, sellers, services, servicesBySeller } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: `Web & mobile development, ePublishing and eBook conversion, and data services: ${services.length} services from three dedicated experts.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="container-x pb-20 pt-32">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <SectionHeading
        as="h1"
        eyebrow={`${services.length} services · 3 experts`}
        title="Everything we do, in one place."
        intro="Each service is handled end to end by the expert who specialises in it. Pick a service to see deliverables, tools and FAQs."
      />

      <div className="mt-16 space-y-20">
        {sellers.map((s) => (
          <section key={s.slug} data-discipline={s.discipline} aria-labelledby={`svc-${s.slug}`}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6" data-reveal>
              <div className="flex items-center gap-4">
                <Avatar seller={s} size={56} />
                <div>
                  <p className="eyebrow">{s.chapter}</p>
                  <h2 id={`svc-${s.slug}`} className="text-h2">
                    {DISCIPLINE_LABEL[s.discipline]}
                  </h2>
                </div>
              </div>
              <Link href={`/team/${s.slug}/`} className="group inline-flex items-center gap-2 font-semibold text-accent">
                With {s.name}, {s.role}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesBySeller(s.slug).map((svc) => (
                <ServiceCard key={svc.slug} service={svc} discipline={s.discipline} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
