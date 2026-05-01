import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spawnSync } from "node:child_process";

// Plugin Vite : régénère public/sitemap.xml au build pour le SEO
function sitemapPlugin() {
  return {
    name: "supremenergies-sitemap",
    apply: "build" as const,
    buildStart() {
      const result = spawnSync(
        "node",
        [path.resolve(__dirname, "scripts/generate-sitemap.mjs")],
        { stdio: "inherit" },
      );
      if (result.status !== 0) {
        console.warn("[sitemap] generation failed (non-blocking)");
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
