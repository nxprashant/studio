/** Icon names that content files may reference. Add a name here AND in Icon.tsx to use a new icon. */
export const ICON_NAMES = [
  "code",
  "smartphone",
  "layers",
  "server",
  "database",
  "puzzle",
  "book",
  "type",
  "layout",
  "palette",
  "accessibility",
  "file-code",
  "search",
  "pickaxe",
  "tags",
  "spider",
  "sparkles",
  "message",
  "file-text",
  "hammer",
  "send",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
