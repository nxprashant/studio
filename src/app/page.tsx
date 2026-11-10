import { Hero, type HeroTile } from "@/components/home/Hero";
import { Chapter } from "@/components/home/Chapter";
import { Process } from "@/components/home/Process";
import { VelocityMarquee } from "@/components/home/VelocityMarquee";
import { ChapterNav } from "@/components/home/ChapterNav";
import { techIcon } from "@/lib/tech-icons";
import { Proof } from "@/components/home/Proof";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  DISCIPLINE_LABEL,
  processSteps,
  sellers,
  servicesBySeller,
  site,
} from "@/content";
import { personLd } from "@/lib/seo";
import type { IconName } from "@/components/ui/icon-names";

const PHRASE: Record<string, string> = { dev: "build software", pub: "publish books", data: "refine data" };
const ICON: Record<string, IconName> = { dev: "code", pub: "book", data: "database" };

export default function HomePage() {
  const tiles: HeroTile[] = sellers.map((s) => {
    const svcs = servicesBySeller(s.slug);
    return {
      seller: s,
      discipline: s.discipline,
      phrase: PHRASE[s.discipline],
      serviceCount: svcs.length,
      topServices: svcs.slice(0, 3).map((x) => x.title),
    };
  });

  return (
    <>
      <JsonLd data={sellers.map((s) => personLd(s, servicesBySeller(s.slug)))} />
      <Hero tiles={tiles} description={site.description} />

      <VelocityMarquee
        services={sellers.flatMap((s) =>
          servicesBySeller(s.slug).map((svc) => ({ label: svc.title, href: `/services/${svc.slug}/`, discipline: s.discipline })),
        )}
        tech={[
          // one entry per logo (e.g. "XML" and "XML / XSLT" share an icon)
          ...new Map(
            sellers
              .flatMap((s) => [...s.skills, ...servicesBySeller(s.slug).flatMap((x) => x.tools)])
              .filter((t) => techIcon(t))
              .reverse()
              .map((t) => [techIcon(t)!.slug, t] as const),
          ).values(),
        ].reverse()}
      />
      <ChapterNav
        items={sellers.map((s) => ({ slug: s.slug, label: s.chapter, discipline: s.discipline, icon: ICON[s.discipline] }))}
      />

      {sellers.map((s) => (
        <Chapter key={s.slug} seller={s} services={servicesBySeller(s.slug)} />
      ))}

      <Process steps={processSteps} />
      {/* Real client quotes replace this once they exist (see src/content/testimonials.ts). */}
      <Proof people={sellers.map((s) => ({ seller: s, services: servicesBySeller(s.slug) }))} />

      <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-title"
              title="Start a brief."
              intro="Pick the person you want to work with, tell them about the job, and get a clear plan and quote within one business day."
            />
          </div>
          <div className="card p-6 sm:p-8 lg:col-span-7" data-reveal>
            <ContactForm
              email={site.email}
              endpoint={site.formEndpoint || undefined}
              topics={sellers.map((s) => ({ id: s.discipline, label: DISCIPLINE_LABEL[s.discipline], who: s.name }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
