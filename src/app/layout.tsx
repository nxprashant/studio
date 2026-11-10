import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { sellers, services, site } from "@/content";
import { absoluteUrl, organizationLd } from "@/lib/seo";

const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const code = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: sellers.map((s) => ({ name: s.name, url: absoluteUrl(`/team/${s.slug}`) })),
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

/** Runs before first paint: applies saved theme and enables reveal animations only when motion is allowed. */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("js-motion")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${code.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={organizationLd(sellers, services)} />
        <Header name={site.name} />
        <ViewTransition>
          <main id="main" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MotionProvider />
      </body>
    </html>
  );
}
