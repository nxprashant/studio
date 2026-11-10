import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    // Pin the project root (a stray lockfile in the home folder confuses auto-detection)
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
