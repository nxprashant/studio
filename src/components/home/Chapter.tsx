import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScoreRings } from "./ScoreRings";
import { FormatStrip, Pipeline } from "./WidgetExtras";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Avatar } from "@/components/ui/Avatar";
import { StackMarquee } from "./StackMarquee";
import { ManuscriptSlider } from "./ManuscriptSlider";
import { CleanseDemo } from "./CleanseDemo";
import { DISCIPLINE_LABEL, type Seller, type Service } from "@/content";

/** Spans for the remaining (non-featured) service tiles so every row is filled. */
function restSpans(n: number) {
  if (n === 1) return ["md:col-span-6 lg:col-span-12"];
  // Desktop: rows of three (span 4); leftover items share a row at span 6.
  const r = n % 3;
  const wide = r === 0 ? 0 : r === 2 ? 2 : 4;
  return Array.from({ length: n }, (_, i) => {
    const lg = i >= n - wide ? "lg:col-span-6" : "lg:col-span-4";
    // Tablet: two per row; a lone last item spans the full row.
    const md = n % 2 === 1 && i === n - 1 ? "md:col-span-6" : "md:col-span-3";
    return `${md} ${lg}`;
  });
}

function DevWidget({ skills }: { skills: string[] }) {
  return (
    <div className="flex h-full flex-col">
      <pre
        className="m-6 mb-6 shrink-0 overflow-x-auto rounded-2xl border border-border bg-muted p-5 font-mono text-[0.8125rem] leading-relaxed"
        aria-label="Code sample"
      >
        <code>
          <span className="text-muted-foreground">{"// one TypeScript codebase, web → mobile → API"}</span>
          {"\n"}
          <span className="text-ink-strong font-bold">const</span> product = <span className="text-ink-strong font-bold">await</span> build({"{"}
          {"\n  "}web: <span className="text-ink-strong">&quot;Next.js&quot;</span>,{"\n  "}mobile:{" "}
          <span className="text-ink-strong">&quot;React Native&quot;</span>,{"\n  "}api: <span className="text-ink-strong">&quot;NestJS&quot;</span>,
          {"\n  "}db: [<span className="text-ink-strong">&quot;MongoDB&quot;</span>, <span className="text-ink-strong">&quot;SQL&quot;</span>],
          {"\n"}
          {"});"}
          {"\n"}
          <span className="text-muted-foreground">{"// → fast, accessible, SEO-ready"}</span>
        </code>
      </pre>
      <ScoreRings />
      <div className="mt-auto">
        <StackMarquee items={skills} label="Stack" />
      </div>
    </div>
  );
}

export function Chapter({
  seller,
  services,
}: {
  seller: Seller;
  services: Service[];
}) {
  const featured = [...services.filter((s) => s.featured), ...services.filter((s) => !s.featured)].slice(0, 2);
  const rest = services.filter((s) => !featured.includes(s));
  const spans = restSpans(rest.length);
  const headingId = `chapter-${seller.slug}-title`;

  return (
    <section
      id={`chapter-${seller.slug}`}
      data-chapter={seller.discipline}
      data-discipline={seller.discipline}
      aria-labelledby={headingId}
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="container-x">
        {/* Chapter header */}
        <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <h2 id={headingId} className="text-h2">
              {seller.headline}
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:col-span-4 lg:justify-end">
            <Avatar seller={seller} size={52} />
            <div>
              <p className="font-display font-semibold">{seller.name}</p>
              <p className="text-sm text-muted-foreground">{seller.role}</p>
            </div>
          </div>
        </div>

        <div className="bento">
          {/* Signature interactive tile */}
          <div className="card md:col-span-6 lg:col-span-7 lg:row-span-2" data-reveal>
            {seller.discipline === "dev" && <DevWidget skills={seller.skills} />}
            {seller.discipline === "pub" && (
              <div className="flex h-full flex-col">
                <ManuscriptSlider />
                <FormatStrip />
              </div>
            )}
            {seller.discipline === "data" && (
              <div className="flex h-full flex-col justify-between">
                <CleanseDemo />
                <Pipeline />
              </div>
            )}
          </div>

          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} discipline={seller.discipline} large className="md:col-span-3 lg:col-span-5" />
          ))}

          {rest.map((s, i) => (
            <ServiceCard key={s.slug} service={s} discipline={seller.discipline} className={spans[i]} />
          ))}

          {/* Mini CTA */}
          <div
            data-reveal
            className="card flex flex-col justify-between gap-6 p-6 md:col-span-6 lg:col-span-12 lg:flex-row lg:items-end lg:p-8"
            style={{ background: "color-mix(in oklab, var(--accent) 8%, var(--card))" }}
          >
            <div>
              <div className="flex items-center gap-4">
                <Avatar seller={seller} size={52} />
                <div>
                  <p className="font-display text-2xl font-semibold leading-snug">Work with {seller.name}</p>
                  <p className="text-muted-foreground">
                    {services.length} {DISCIPLINE_LABEL[seller.discipline]} services, one dedicated expert.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5">
                {[`${seller.name} does the work, start to finish`, "Fixed quote before work starts", "Reply within one business day"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[0.9375rem] text-muted-foreground">
                      <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-accent" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={`#brief-${seller.discipline}`} className="btn btn-accent">
                Brief {seller.name} <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link href={`/team/${seller.slug}/`} className="btn btn-secondary">
                {seller.name}&rsquo;s profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
