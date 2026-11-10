# Inkcode Labs: studio website

Static, SEO-first portfolio for a three-person studio (Dev · ePublishing · Data).
Built with Next.js 16 (static export), Tailwind CSS 4, GSAP and Lucide icons.
Design rules live in [`design-system/inkcode-labs/MASTER.md`](design-system/inkcode-labs/MASTER.md).

## Run it

Requires **Node.js 20.9 or newer** (Next.js 16).

```bash
nvm use 24        # or any Node >= 20.9
npm install
npm run dev       # http://localhost:3000
npm run build     # static site written to ./out (upload anywhere: Vercel, Netlify, S3, cPanel…)
```

## Edit content (no code changes needed)

All text lives in `src/content/`. Every file is validated when you build, so a typo
(missing field, unknown seller, wrong service slug) stops the build with a clear message.

| What | File |
|------|------|
| Studio name, tagline, email, domain, socials, form endpoint | `src/content/site.ts` |
| A person (bio, skills, experience, photo) | `src/content/sellers/<name>.ts` |
| Services (one page each at `/services/<slug>/`) | `src/content/services/dev.ts`, `publishing.ts`, `data.ts` |
| Portfolio projects (one page each at `/projects/<slug>/`) | `src/content/projects/index.ts` |
| Testimonials | `src/content/testimonials.ts` |
| "How we work" steps | `src/content/process.ts` |

Common tasks:

- **Rename the studio**: change `name`, `shortName` and `url` in `site.ts`.
- **Rename a project or service**: edit its `title`. Changing `slug` changes its URL.
- **Add a photo**: put `prashant.jpg` in `public/team/` and set `photo: "/team/prashant.jpg"`.
- **Add a project cover**: put an image in `public/projects/` and set `cover: "/projects/name.jpg"`. Without one, a themed cover is generated.
- **Add a service**: copy an entry in the right `services/*.ts` file. `icon` must be a name from `src/components/ui/icon-names.ts`.
- **Add a seller**: create `sellers/<name>.ts` and add it to `sellerFiles` in `src/content/index.ts`.
- **Contact form**: by default it opens the visitor's email app. To receive submissions directly, create a free form endpoint (Formspree, Web3Forms…) and paste its URL into `formEndpoint` in `site.ts`.

## Before launch

- Replace all **placeholder** content: email, domain, socials, bios, years of experience, sample projects (marked "(sample)").
- Replace the **placeholder testimonials** with real quotes from clients (with permission).
- Add real photos and project screenshots.

## SEO built in

Static HTML for every page, per-page titles, descriptions and canonical URLs, Open Graph/Twitter tags,
`sitemap.xml`, `robots.txt`, and JSON-LD structured data (ProfessionalService, Person, Service,
CreativeWork, FAQPage, BreadcrumbList).
