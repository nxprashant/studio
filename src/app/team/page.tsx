import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { DISCIPLINE_LABEL, projectsBySeller, sellers, servicesBySeller } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Team",
  description: "Meet the three experts behind the studio: a full-stack developer, an ePublishing specialist and a data specialist.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <div className="container-x pb-20 pt-32">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Team", path: "/team" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Three experts, one studio"
        title="Small team. Deep specialisms."
        intro="You always work directly with the specialist doing the work, never through layers of account managers."
      />
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {sellers.map((s, i) => (
          <li key={s.slug} data-discipline={s.discipline} className="card card-interactive group flex flex-col gap-6 p-6 lg:p-8" data-reveal>
            <div className="flex items-start justify-between">
              <Avatar seller={s} size={72} />
              <span className="font-mono text-[0.8125rem] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} · {s.chapter}
              </span>
            </div>
            <div>
              <p className="eyebrow mb-2">{DISCIPLINE_LABEL[s.discipline]}</p>
              <h2 className="font-display text-3xl font-bold">
                <Link href={`/team/${s.slug}/`} className="stretched-link">
                  {s.name}
                </Link>
              </h2>
              <p className="text-muted-foreground">{s.role}</p>
            </div>
            <p className="flex-1 text-[0.9375rem] text-muted-foreground">{s.headline}</p>
            <dl className="grid grid-cols-3 gap-4 border-t border-border pt-5">
              {[
                [s.yearsExperience + "+", "Years"],
                [servicesBySeller(s.slug).length, "Services"],
                [projectsBySeller(s.slug).length, "Projects"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-muted-foreground">{l}</dt>
                  <dd className="font-display text-2xl font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <span className="flex items-center gap-1.5 font-semibold text-accent" aria-hidden="true">
              View profile
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
