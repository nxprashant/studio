import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Avatar } from "@/components/ui/Avatar";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { DISCIPLINE_LABEL, getSeller, projectsBySeller, sellers, servicesBySeller } from "@/content";
import { pageMetadata, personLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return sellers.map((s) => ({ seller: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[seller]">) {
  const { seller: slug } = await params;
  const s = getSeller(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.name}, ${s.role}`,
    description: `${s.headline} ${servicesBySeller(s.slug)
      .map((x) => x.title)
      .slice(0, 4)
      .join(", ")}.`.slice(0, 160),
    path: `/team/${s.slug}`,
    keywords: s.skills,
  });
}

export default async function SellerPage({ params }: PageProps<"/team/[seller]">) {
  const { seller: slug } = await params;
  const s = getSeller(slug);
  if (!s) notFound();
  const svcs = servicesBySeller(s.slug);
  const work = projectsBySeller(s.slug);

  return (
    <div data-page-discipline={s.discipline} data-discipline={s.discipline} className="pb-20 pt-32">
      <JsonLd data={personLd(s, svcs)} />
      <div className="container-x">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Team", path: "/team" },
            { name: s.name, path: `/team/${s.slug}` },
          ]}
        />

        {/* Profile bento */}
        <div className="bento">
          <div className="card flex flex-col justify-between gap-8 p-6 md:col-span-6 lg:col-span-8 lg:row-span-2 lg:p-10">
            <div>
              <p className="eyebrow mb-4">
                {DISCIPLINE_LABEL[s.discipline]} · {s.chapter}
              </p>
              <h1 className="text-h1">
                {s.name}
                <span className="block text-muted-foreground">{s.role}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl">{s.headline}</p>
              <div className="mt-4 max-w-2xl space-y-3 text-muted-foreground">
                {s.bio.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <Link href={`/contact/?topic=${s.discipline}`} className="btn btn-accent">
                  Hire {s.name} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Magnetic>
              {s.socials.map((x) => (
                <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  {x.label} <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>

          <div
            className="card grid place-items-center p-6 md:col-span-3 lg:col-span-4"
            style={{ background: "color-mix(in oklab, var(--accent) 8%, var(--card))" }}
          >
            <Avatar seller={s} size={140} className="rounded-3xl" />
            {s.location && (
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={16} aria-hidden="true" /> {s.location}
              </p>
            )}
          </div>

          <dl className="card grid grid-cols-3 gap-4 p-6 md:col-span-3 lg:col-span-4">
            {[
              { v: s.yearsExperience, suf: "+", l: "Years" },
              { v: svcs.length, suf: "", l: "Services" },
              { v: work.length, suf: "", l: "Projects" },
            ].map((x) => (
              <div key={x.l}>
                <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-muted-foreground">{x.l}</dt>
                <dd className="font-display text-3xl font-bold">
                  <Counter value={x.v} suffix={x.suf} />
                </dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="skills" className="card p-6 md:col-span-6 lg:col-span-5 lg:p-8" data-reveal>
            <h2 id="skills" className="font-display text-2xl font-semibold">
              Skills & tools
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.skills.map((k) => (
                <li key={k} className="chip px-3 py-1.5 text-foreground">
                  {k}
                </li>
              ))}
            </ul>
          </section>

          {s.experience.length > 0 && (
            <section aria-labelledby="experience" className="card p-6 md:col-span-6 lg:col-span-7 lg:p-8" data-reveal>
              <h2 id="experience" className="font-display text-2xl font-semibold">
                Experience
              </h2>
              <ol className="relative mt-6 space-y-8 border-l border-border pl-6">
                {s.experience.map((e) => (
                  <li key={e.period + e.title} className="relative">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full border-2 border-accent bg-card" />
                    <p className="font-mono text-[0.8125rem] text-accent">{e.period}</p>
                    <p className="mt-1 font-semibold">
                      {e.title} <span className="font-normal text-muted-foreground">· {e.org}</span>
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-muted-foreground">{e.summary}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <section aria-labelledby="services" className="mt-20">
          <h2 id="services" className="text-h2" data-reveal>
            Services
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {svcs.map((svc) => (
              <ServiceCard key={svc.slug} service={svc} discipline={s.discipline} />
            ))}
          </div>
        </section>

        {work.length > 0 && (
          <section aria-labelledby="work" className="mt-20">
            <h2 id="work" className="text-h2" data-reveal>
              Selected work
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {work.map((p) => (
                <ProjectCard key={p.slug} project={p} discipline={s.discipline} sellerName={s.name} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
