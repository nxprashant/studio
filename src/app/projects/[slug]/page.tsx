import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Cover } from "@/components/ui/Cover";
import { Avatar } from "@/components/ui/Avatar";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProject, getSeller, getService, projects, projectsBySeller } from "@/content";
import { pageMetadata, projectLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/projects/${p.slug}`, keywords: p.tech });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const seller = getSeller(p.seller)!;
  const more = projectsBySeller(seller.slug).filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <article data-page-discipline={seller.discipline} data-discipline={seller.discipline} className="pb-20 pt-32">
      <JsonLd data={projectLd(p)} />
      <div className="container-x">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/projects" },
            { name: p.title, path: `/projects/${p.slug}` },
          ]}
        />

        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">
              {p.client} · {p.year}
            </p>
            <h1 className="text-h1">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-xl text-muted-foreground">{p.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Visit live <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </header>

        <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
          <Cover
            seed={p.slug}
            discipline={seller.discipline}
            image={p.cover}
            alt={`${p.title} cover`}
            priority
            className="card mt-12 aspect-[16/8]"
          />
        </ViewTransition>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section aria-labelledby="challenge" data-reveal>
              <h2 id="challenge" className="eyebrow mb-3">
                The challenge
              </h2>
              <p className="text-xl leading-relaxed">{p.challenge}</p>
            </section>
            <section aria-labelledby="solution" data-reveal>
              <h2 id="solution" className="eyebrow mb-3">
                What we did
              </h2>
              <p className="text-xl leading-relaxed">{p.solution}</p>
            </section>
            <section aria-labelledby="outcome" data-reveal>
              <h2 id="outcome" className="eyebrow mb-4">
                Outcome
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {p.outcome.map((o) => (
                  <li key={o} className="card flex gap-3 p-5">
                    <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    <span className="font-medium">{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4" aria-label="Project details">
            <div className="card p-6" data-reveal>
              <p className="mb-4 text-sm text-muted-foreground">Delivered by</p>
              <Link href={`/team/${seller.slug}/`} className="group flex items-center gap-4">
                <Avatar seller={seller} size={52} />
                <div>
                  <p className="font-display text-lg font-semibold group-hover:text-accent">{seller.name}</p>
                  <p className="text-sm text-muted-foreground">{seller.role}</p>
                </div>
              </Link>
            </div>
            <div className="card p-6" data-reveal>
              <p className="mb-3 text-sm text-muted-foreground">Services</p>
              <ul className="space-y-2">
                {p.services.map((s) => {
                  const svc = getService(s)!;
                  return (
                    <li key={s}>
                      <Link href={`/services/${s}/`} className="link-underline font-medium hover:text-accent">
                        {svc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {p.tech.length > 0 && (
                <>
                  <p className="mb-3 mt-6 text-sm text-muted-foreground">Stack</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Link href={`/contact/?topic=${seller.discipline}`} className="btn btn-accent w-full">
              Start a similar project <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>

        {more.length > 0 && (
          <section aria-labelledby="more" className="mt-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 id="more" className="text-h2">
                More from {seller.name}
              </h2>
              <Link href="/projects/" className="inline-flex items-center gap-2 font-semibold text-accent">
                <ArrowLeft size={18} aria-hidden="true" /> All work
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {more.map((m) => (
                <ProjectCard key={m.slug} project={m} discipline={seller.discipline} sellerName={seller.name} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
