import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <JsonLd data={breadcrumbLd(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.8125rem] text-muted-foreground">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="link-underline hover:text-foreground">
                    {it.name}
                  </Link>
                  <ChevronRight size={14} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
