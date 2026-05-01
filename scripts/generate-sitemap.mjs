// Génère public/sitemap.xml au build avec toutes les routes connues
// + les articles de blog publiés (lecture via API REST Supabase publique).
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

const today = new Date().toISOString().split("T")[0];
const posts = await fetchBlogPosts();

const staticEntries = STATIC_URLS.map((u) =>
  urlEntry(u.loc, today, u.changefreq, u.priority),
).join("\n");

const blogEntries = posts
  .map((p) => {
    const lastmod = (p.updated_at || p.published_at || "").split("T")[0] || today;
    return urlEntry(`/blog/${p.slug}`, lastmod, "monthly", "0.6");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}${blogEntries ? "\n" + blogEntries : ""}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "public", "sitemap.xml");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, "utf8");

const total = STATIC_URLS.length + posts.length;
console.log(`[sitemap] wrote ${outPath} with ${total} URLs (${posts.length} blog posts)`);
