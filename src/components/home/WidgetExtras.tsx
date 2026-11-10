import { BookOpen, Bug, Check, FileCode2, Printer, Send, ShieldCheck, Sparkles, Tablet } from "lucide-react";

/** Output formats strip shown under the manuscript slider. */
export function FormatStrip() {
  const formats = [
    { icon: BookOpen, label: "EPUB 3" },
    { icon: Tablet, label: "Kindle" },
    { icon: Printer, label: "Print PDF" },
    { icon: FileCode2, label: "XML" },
  ];
  return (
    <div className="px-6 pb-6">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {formats.map(({ icon: I, label }) => (
          <li
            key={label}
            className="group/f flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm font-medium transition-colors hover:border-accent"
          >
            <I size={16} aria-hidden="true" className="text-accent transition-transform group-hover/f:-translate-y-0.5" />
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Check size={14} aria-hidden="true" className="text-accent" /> EPUBCheck: 0 errors
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check size={14} aria-hidden="true" className="text-accent" /> Ace by DAISY: pass
        </span>
      </p>
    </div>
  );
}

/** Animated data pipeline (Collect → Clean → Validate → Deliver) shown under the cleanse demo. */
export function Pipeline() {
  const steps = [
    { icon: Bug, label: "Collect" },
    { icon: Sparkles, label: "Clean" },
    { icon: ShieldCheck, label: "Validate" },
    { icon: Send, label: "Deliver" },
  ];
  return (
    <div className="px-6 pb-6">
      <p className="eyebrow mb-4">Pipeline</p>
      <ol className="pipeline relative grid grid-cols-4">
        <span aria-hidden="true" className="pipeline-line" />
        <span aria-hidden="true" className="pipeline-packet" />
        <span aria-hidden="true" className="pipeline-packet" style={{ animationDelay: "-1.6s" }} />
        {steps.map(({ icon: I, label }, i) => (
          <li key={label} className="relative z-10 flex flex-col items-center gap-2 text-center">
            <span
              className="pipeline-node grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card text-accent"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <I size={20} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
