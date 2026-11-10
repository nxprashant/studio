import {
  Accessibility,
  BookOpen,
  Bug,
  CodeXml,
  Database,
  FileCode2,
  FileText,
  Hammer,
  Layers,
  LayoutTemplate,
  MessageSquare,
  Palette,
  Pickaxe,
  Puzzle,
  Search,
  Send,
  Server,
  Smartphone,
  Sparkles,
  Tags,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "./icon-names";

const ICONS: Record<IconName, LucideIcon> = {
  code: CodeXml,
  smartphone: Smartphone,
  layers: Layers,
  server: Server,
  database: Database,
  puzzle: Puzzle,
  book: BookOpen,
  type: Type,
  layout: LayoutTemplate,
  palette: Palette,
  accessibility: Accessibility,
  "file-code": FileCode2,
  search: Search,
  pickaxe: Pickaxe,
  tags: Tags,
  spider: Bug,
  sparkles: Sparkles,
  message: MessageSquare,
  "file-text": FileText,
  hammer: Hammer,
  send: Send,
};

/** Decorative by default (aria-hidden). Pass `label` when the icon carries meaning on its own. */
export function Icon({
  name,
  size = 20,
  className,
  label,
}: {
  name: IconName;
  size?: number;
  className?: string;
  label?: string;
}) {
  const Cmp = ICONS[name];
  return (
    <Cmp
      size={size}
      strokeWidth={1.75}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
