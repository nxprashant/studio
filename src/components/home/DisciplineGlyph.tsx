import type { Discipline } from "@/content";

/**
 * Tiny animated illustration per discipline. Animations only run while the parent
 * `.group` is hovered/focused or has `.is-active` (see globals.css `.glyph`).
 */
export function DisciplineGlyph({ discipline }: { discipline: Discipline }) {
  if (discipline === "dev") {
    return (
      <div aria-hidden="true" className="glyph glyph-dev">
        <span style={{ width: "70%", animationDelay: "0ms" }} />
        <span style={{ width: "48%", marginLeft: "14%", animationDelay: "180ms" }} />
        <span style={{ width: "58%", marginLeft: "14%", animationDelay: "360ms" }} />
        <span style={{ width: "34%", animationDelay: "540ms" }} />
        <i />
      </div>
    );
  }
  if (discipline === "pub") {
    return (
      <div aria-hidden="true" className="glyph glyph-pub">
        <span className="page left" />
        <span className="page right" />
        <span className="page flip" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="glyph glyph-data">
      {[0.45, 0.8, 0.6, 1, 0.7].map((v, i) => (
        <span key={i} style={{ height: `${v * 100}%`, animationDelay: `${i * 120}ms` }} />
      ))}
    </div>
  );
}
