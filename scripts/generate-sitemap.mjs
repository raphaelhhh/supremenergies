// Génère un sitemap index + sous-sitemaps dans public/ au build :
//   - public/sitemap.xml         → index qui référence les sous-sitemaps
//   - public/sitemap-pages.xml   → pages statiques (services, zones, légales, etc.)
//   - public/sitemap-blog.xml    → articles de blog publiés (lus depuis Supabase)
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://supremenergies.com";
const SUPABASE_URL = "https://epeomgifqjbgzyurcnaz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZW9tZ2lmcWpiZ3p5dXJjbmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTUyOTEsImV4cCI6MjA5MTU3MTI5MX0.7WTHMDXIKtK007D_g_z3iHRWGe-K3_RRmDkCIXJWgGQ";

// URL de la edge function qui sert un sitemap blog en temps réel
// (filet de sécurité entre deux déploiements pour les articles auto-générés)
const DYNAMIC_BLOG_SITEMAP_URL = `${SUPABASE_URL}/functions/v1/generate-sitemap`;

const ZONE_SLUGS = [
  "paris",
  "versailles",
  "boulogne-billancourt",
  "saint-denis",
  "nanterre",
  "montreuil",
];

const STATIC_URLS = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/services", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/isolation-thermique", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/pompe-a-chaleur", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/panneaux-solaires", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/renovation-globale", changefreq: "monthly", priority: "0.9" },
  { loc: "/simulateur-aides", changefreq: "monthly", priority: "0.9" },
  { loc: "/temoignages", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/devis-gratuit", changefreq: "monthly", priority: "0.9" },
  { loc: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
  ...ZONE_SLUGS.map((slug) => ({
    loc: `/zones/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

async function fetchBlogPosts() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at,published_at&published=eq.true&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) {
      console.warn(`[sitemap] blog fetch failed: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("[sitemap] blog fetch error:", err.message);
    return [];
  }
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function urlsetXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function sitemapIndexXml(items) {
  const inner = items
    .map(
      (it) => `  <sitemap>
    <loc>${it.loc}</loc>
    <lastmod>${it.lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${inner}
</sitemapindex>
`;
}

const today = new Date().toISOString().split("T")[0];
const posts = await fetchBlogPosts();

// 1) Sous-sitemap : pages statiques
const staticEntries = STATIC_URLS.map((u) =>
  urlEntry(u.loc, today, u.changefreq, u.priority),
).join("\n");
const pagesXml = urlsetXml(staticEntries);

// 2) Sous-sitemap : blog (snapshot au build)
const blogEntries = posts
  .map((p) => {
    const lastmod = (p.updated_at || p.published_at || "").split("T")[0] || today;
    return urlEntry(`/blog/${p.slug}`, lastmod, "monthly", "0.6");
  })
  .join("\n");
const blogXml = urlsetXml(blogEntries || "");

// 3) Index : référence les sous-sitemaps + le sitemap dynamique en temps réel
const indexXml = sitemapIndexXml([
  { loc: `${SITE_URL}/sitemap-pages.xml`, lastmod: today },
  { loc: `${SITE_URL}/sitemap-blog.xml`, lastmod: today },
  { loc: DYNAMIC_BLOG_SITEMAP_URL, lastmod: today },
]);

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

writeFileSync(resolve(publicDir, "sitemap.xml"), indexXml, "utf8");
writeFileSync(resolve(publicDir, "sitemap-pages.xml"), pagesXml, "utf8");
writeFileSync(resolve(publicDir, "sitemap-blog.xml"), blogXml, "utf8");

console.log(
  `[sitemap] index written: 1 static-pages sitemap (${STATIC_URLS.length} URLs) + 1 blog sitemap (${posts.length} posts) + 1 dynamic edge sitemap`,
);
