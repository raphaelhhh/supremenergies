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


const ZONE_SLUGS = [
  "paris",
  "versailles",
  "boulogne-billancourt",
  "saint-denis",
  "nanterre",
  "montreuil",
];

// IMPORTANT : lastmod doit refléter la VRAIE date de dernière modification
// éditoriale de la page. Mettre `today` partout dégrade la confiance de Google.
// Quand tu modifies réellement le contenu d'une page, mets sa date à jour ici.
const STATIC_PAGES_LAST_REVIEW = "2026-05-03"; // dernière revue SEO globale
const ZONES_LAST_REVIEW = "2026-04-15";
const LEGAL_LAST_REVIEW = "2026-01-10";

const STATIC_URLS = [
  { loc: "/", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "weekly", priority: "1.0" },
  { loc: "/about", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.8" },
  { loc: "/services", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/services/isolation-thermique", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/services/pompe-a-chaleur", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/services/panneaux-solaires", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/services/renovation-globale", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/simulateur-aides", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/temoignages", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "weekly", priority: "0.7" },
  { loc: "/contact", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.8" },
  { loc: "/devis-gratuit", lastmod: STATIC_PAGES_LAST_REVIEW, changefreq: "monthly", priority: "0.9" },
  { loc: "/mentions-legales", lastmod: LEGAL_LAST_REVIEW, changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy", lastmod: LEGAL_LAST_REVIEW, changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", lastmod: LEGAL_LAST_REVIEW, changefreq: "yearly", priority: "0.3" },
  ...ZONE_SLUGS.map((slug) => ({
    loc: `/zones/${slug}`,
    lastmod: ZONES_LAST_REVIEW,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

// Pour le blog : on utilise le timestamp ISO complet (W3C datetime), plus précis
// que la simple date — Google s'en sert pour prioriser le re-crawl.

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

// 1) Sous-sitemap : pages statiques (lastmod réel par page)
const staticEntries = STATIC_URLS.map((u) =>
  urlEntry(u.loc, u.lastmod, u.changefreq, u.priority),
).join("\n");
const pagesXml = urlsetXml(staticEntries);

// 2) Sous-sitemap : blog — timestamp ISO complet (W3C datetime), précis à la seconde
const blogEntries = posts
  .map((p) => {
    const raw = p.updated_at || p.published_at;
    const lastmod = raw ? new Date(raw).toISOString() : `${today}T00:00:00Z`;
    return urlEntry(`/blog/${p.slug}`, lastmod, "monthly", "0.6");
  })
  .join("\n");
const blogXml = urlsetXml(blogEntries || "");

// 3) Index : lastmod de chaque sous-sitemap = max des lastmod qu'il contient
const pagesIndexLastmod = STATIC_URLS.map((u) => u.lastmod).sort().pop();
const blogIndexLastmod = posts.length
  ? new Date(
      Math.max(
        ...posts.map((p) => new Date(p.updated_at || p.published_at).getTime()),
      ),
    ).toISOString()
  : `${today}T00:00:00Z`;

const indexXml = sitemapIndexXml([
  { loc: `${SITE_URL}/sitemap-pages.xml`, lastmod: pagesIndexLastmod },
  { loc: `${SITE_URL}/sitemap-blog.xml`, lastmod: blogIndexLastmod },
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
