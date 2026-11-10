import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { DISCIPLINE_LABEL, getSeller, projects, sellers } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected projects in web and mobile development, ePublishing and accessible eBooks, and data research, scraping and annotation.",
  path: "/projects",
});

export default function ProjectsPage() {
  const meta = Object.fromEntries(
    projects.map((p) => {
      const s = getSeller(p.seller)!;
      return [p.slug, { discipline: s.discipline, sellerName: s.name }];
    }),
  );
  const filters = [
    { id: "all", label: `All (${projects.length})` },
    ...sellers.map((s) => ({
      id: s.slug,
      label: `${DISCIPLINE_LABEL[s.discipline]} · ${s.name}`,
      discipline: s.discipline,
    })),
  ];

  return (
    <div className="container-x pb-20 pt-32">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Work", path: "/projects" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Selected work"
        title="Projects across code, books and data."
        intro="Filter by expert to see the kind of work each of us delivers."
        className="mb-12"
      />
      <ProjectGrid projects={projects} filters={filters} meta={meta} />
    </div>
  );
}
