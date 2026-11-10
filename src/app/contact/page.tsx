import { Clock, Mail, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { DISCIPLINE_LABEL, sellers, site } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Tell us about your web, ePublishing or data project and get a clear plan and quote within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-x pb-20 pt-32">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            eyebrow="Start a project"
            title="Let’s talk about your project."
            intro="Pick the expert you need, share a few details, and we’ll come back with questions, a plan and a fixed quote."
          />
          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-3">
              <Mail size={20} aria-hidden="true" className="mt-1 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${site.email}`} className="link-underline font-semibold">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={20} aria-hidden="true" className="mt-1 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Response time</p>
                <p className="font-semibold">Within one business day</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={20} aria-hidden="true" className="mt-1 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{site.location}</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="card p-6 sm:p-8 lg:col-span-7">
          <ContactForm
            email={site.email}
            endpoint={site.formEndpoint || undefined}
            topics={sellers.map((s) => ({ id: s.discipline, label: DISCIPLINE_LABEL[s.discipline], who: s.name }))}
          />
        </div>
      </div>
    </div>
  );
}
