"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

type Row = { id: string; company: string; country: string; phone: string; dup?: boolean };

const RAW: Row[] = [
  { id: "a", company: "  acme corp ", country: "usa", phone: "5551234567" },
  { id: "b", company: "Northwind Ltd.", country: "U.K.", phone: "+44 20 7946 0958" },
  { id: "c", company: "ACME Corp", country: "United States", phone: "(555) 123-4567", dup: true },
  { id: "d", company: "globex", country: "DE", phone: "030 1234567" },
  { id: "e", company: "Initech  ", country: "india", phone: "9876543210" },
];

const CLEAN: Record<string, Omit<Row, "id">> = {
  a: { company: "Acme Corp", country: "US", phone: "+1 555 123 4567" },
  b: { company: "Northwind Ltd", country: "GB", phone: "+44 20 7946 0958" },
  d: { company: "Globex", country: "DE", phone: "+49 30 1234567" },
  e: { company: "Initech", country: "IN", phone: "+91 98765 43210" },
};

/** Interactive "run cleanse" demo: duplicates collapse and fields normalise, animated with GSAP Flip. */
export function CleanseDemo() {
  const [clean, setClean] = useState(false);
  const listRef = useRef<HTMLTableSectionElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const toggle = () => {
    if (listRef.current) flipState.current = Flip.getState(listRef.current.querySelectorAll("tr"));
    setClean((c) => !c);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    flipState.current = null;
    const tl = Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: false,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35 }),
    });
    return () => {
      tl.kill();
    };
  }, [clean]);

  const rows = clean ? RAW.filter((r) => !r.dup).map((r) => ({ ...r, ...CLEAN[r.id] })) : RAW;

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">{clean ? "leads_clean.csv" : "leads_raw.csv"}</p>
        <button type="button" onClick={toggle} className="btn btn-accent min-h-11 px-4 py-2 text-sm">
          {clean ? <RotateCcw size={16} aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}
          {clean ? "Reset" : "Run cleanse"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[420px] text-left font-mono text-[0.8125rem]">
          <caption className="sr-only">
            Sample lead data {clean ? "after cleansing: duplicates removed and formats standardised" : "before cleansing"}
          </caption>
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">company</th>
              <th scope="col" className="px-3 py-2 font-medium">country</th>
              <th scope="col" className="px-3 py-2 font-medium">phone</th>
            </tr>
          </thead>
          <tbody ref={listRef} className={clean ? "cells-flash" : undefined}>
            {rows.map((r) => (
              <tr key={r.id} data-flip-id={r.id} className="border-t border-border">
                <td className="whitespace-pre px-3 py-2">
                  {r.company}
                  {!clean && r.dup && (
                    <span className="text-danger-strong ml-2 rounded bg-danger/15 px-1.5 py-0.5 text-[0.8125rem]">dup</span>
                  )}
                </td>
                <td className="px-3 py-2">{r.country}</td>
                <td className="whitespace-nowrap px-3 py-2">{r.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {clean ? "1 duplicate merged · 12 fields standardised · 100% valid" : "5 rows · 1 duplicate · 3 formats"}
      </p>
    </div>
  );
}
