import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center pb-20 pt-32 text-center">
      <div>
        <p className="font-mono text-[0.8125rem] uppercase tracking-widest text-muted-foreground">Error 404</p>
        <h1 className="text-display mt-4">
          Lost <span className="text-dev">in</span> <span className="text-pub">the</span>{" "}
          <span className="text-data">margins</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
          This page doesn&rsquo;t exist, or it moved. Let&rsquo;s get you back on track.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          <ArrowLeft size={18} aria-hidden="true" /> Back home
        </Link>
      </div>
    </div>
  );
}
