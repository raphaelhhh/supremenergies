import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spawnSync } from "node:child_process";

// Plugin Vite SEO :
// - buildStart : régénère public/sitemap.xml (toutes les routes + blog)
// - closeBundle : crée un index.html pré-rendu par route dans dist/ pour
//   que Googlebot indexe le contenu sans exécuter le JS (SPA fallback).
function seoPlugin() {
  return {
    name: "supremenergies-seo",
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
    closeBundle() {
      const result = spawnSync(
        "node",
        [path.resolve(__dirname, "scripts/prerender.mjs")],
        { stdio: "inherit" },
      );
      if (result.status !== 0) {
        console.warn("[prerender] generation failed (non-blocking)");
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
    seoPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
