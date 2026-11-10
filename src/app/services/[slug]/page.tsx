import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { getSeller, getService, processSteps, projectsByService, services, servicesBySeller } from "@/content";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return pageMetadata({ title: svc.title, description: svc.summary, path: `/services/${svc.slug}`, keywords: [svc.title, ...svc.tools] });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();
  const seller = getSeller(svc.seller)!;
  const related = servicesBySeller(seller.slug).filter((s) => s.slug !== svc.slug).slice(0, 3);
  const work = projectsByService(svc.slug).slice(0, 2);

  return (
    <div data-page-discipline={seller.discipline} data-discipline={seller.discipline} className="pb-20 pt-32">
      <JsonLd data={svc.faqs.length ? [serviceLd(svc), faqLd(svc.faqs)] : serviceLd(svc)} />
      <div className="container-x">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: svc.title, path: `/services/${svc.slug}` },
          ]}
        />

        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span
              className="mb-6 grid h-14 w-14 place-items-center rounded-2xl text-accent"
              style={{ background: "color-mix(in oklab, var(--accent) 12%, transparent)" }}
            >
              <Icon name={svc.icon} size={28} />
            </span>
            <h1 className="text-h1">{svc.title}</h1>
            <p className="mt-5 max-w-2xl text-xl text-muted-foreground">{svc.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href={`/contact/?topic=${seller.discipline}`} className="btn btn-accent">
                  Get a quote <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Magnetic>
              <Link href={`/team/${seller.slug}/`} className="btn btn-secondary">
                Meet {seller.name}
              </Link>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-5 lg:col-span-4">
            <Avatar seller={seller} size={56} />
            <div>
              <p className="text-sm text-muted-foreground">Delivered by</p>
              <p className="font-display text-lg font-semibold">{seller.name}</p>
              <p className="text-sm text-muted-foreground">
                {seller.role} · {seller.yearsExperience}+ yrs
              </p>
            </div>
          </div>
        </div>

        {/* Details bento */}
        <div className="bento mt-16">
          <section aria-labelledby="overview" className="card p-6 md:col-span-6 lg:col-span-7 lg:p-8" data-reveal>
            <h2 id="overview" className="font-display text-2xl font-semibold">
              Overview
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {svc.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
          <section aria-labelledby="deliverables" className="card p-6 md:col-span-6 lg:col-span-5 lg:p-8" data-reveal>
            <h2 id="deliverables" className="font-display text-2xl font-semibold">
              What you get
            </h2>
            <ul className="mt-4 space-y-3">
              {svc.deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>
          {svc.tools.length > 0 && (
            <section aria-labelledby="tools" className="card p-6 md:col-span-6 lg:col-span-5 lg:p-8" data-reveal>
              <h2 id="tools" className="font-display text-2xl font-semibold">
                Tools & standards
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {svc.tools.map((t) => (
                  <li key={t} className="chip px-3 py-1.5 text-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section aria-labelledby="process" className="card p-6 md:col-span-6 lg:col-span-7 lg:p-8" data-reveal>
            <h2 id="process" className="font-display text-2xl font-semibold">
              How it works
            </h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2">
              {processSteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="font-mono text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* FAQ */}
        {svc.faqs.length > 0 && (
          <section aria-labelledby="faq" className="mt-20 max-w-3xl">
            <h2 id="faq" className="text-h2" data-reveal>
              Questions
            </h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {svc.faqs.map((f) => (
                <details key={f.q} className="group py-2">
                  <summary className="flex min-h-12 list-none items-center justify-between gap-4 py-3 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-4 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {work.length > 0 && (
          <section aria-labelledby="work" className="mt-20">
            <h2 id="work" className="text-h2" data-reveal>
              Related work
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {work.map((p) => (
                <ProjectCard key={p.slug} project={p} discipline={seller.discipline} sellerName={seller.name} />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-20">
            <h2 id="related" className="text-h2" data-reveal>
              More from {seller.name}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} discipline={seller.discipline} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
