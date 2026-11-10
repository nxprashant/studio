"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Work" },
  { href: "/team/", label: "Team" },
];

/** Theme = explicit data-theme on <html>, else the OS preference. Read as an external store. */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}
function getDark() {
  const attr = document.documentElement.dataset.theme;
  return attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function ThemeToggle() {
  const dark = useSyncExternalStore<boolean | null>(subscribeTheme, getDark, () => null);

  const toggle = () => {
    const value = dark ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("theme", value);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark === null ? "Switch theme" : dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
    >
      <Moon size={18} aria-hidden="true" className="theme-icon-moon" />
      <Sun size={18} aria-hidden="true" className="theme-icon-sun" />
    </button>
  );
}

export function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation (state adjusted during render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Reading progress + elevated header after scroll
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Mobile menu: Escape closes, focus moves in, body scroll locked
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={cn(
        "ink-transition fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled || open ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
          <span aria-hidden="true" className="flex gap-[3px]">
            <span className="h-5 w-1.5 rounded-full bg-dev transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="h-5 w-1.5 rounded-full bg-pub transition-transform delay-75 duration-300 group-hover:-translate-y-0.5" />
            <span className="h-5 w-1.5 rounded-full bg-data transition-transform delay-150 duration-300 group-hover:-translate-y-0.5" />
          </span>
          {name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(n.href) && "text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact/" className="btn btn-primary hidden min-h-11 px-5 py-2 text-[0.9375rem] sm:inline-flex">
            Start a brief
          </Link>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-border md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Reading progress, tinted with the current chapter accent */}
      <div
        ref={barRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
          {[...NAV, { href: "/contact/", label: "Contact" }].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="rounded-xl px-3 py-4 font-display text-3xl font-semibold transition-colors hover:text-accent"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
