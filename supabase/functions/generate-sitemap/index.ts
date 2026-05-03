import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://supremenergies.com";

const ZONE_SLUGS = [
  "paris",
  "versailles",
  "boulogne-billancourt",
  "saint-denis",
  "nanterre",
  "montreuil",
];

// IMPORTANT : lastmod doit refléter la VRAIE date de dernière modification.
// Garder synchronisé avec scripts/generate-sitemap.mjs.
const STATIC_PAGES_LAST_REVIEW = "2026-05-03";
const ZONES_LAST_REVIEW = "2026-04-15";
const LEGAL_LAST_REVIEW = "2026-01-10";

const STATIC_URLS: Array<{
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}> = [
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;

    const today = new Date().toISOString().split("T")[0];

    const staticEntries = STATIC_URLS.map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    ).join("\n");

    const blogEntries = (posts || [])
      .map((post) => {
        const raw = post.updated_at || post.published_at;
        const lastmod = raw ? new Date(raw).toISOString() : `${today}T00:00:00Z`;
        return `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
      status: 200,
    });
  } catch (err) {
    console.error("Erreur génération sitemap:", err);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>\n<error>${(err as Error).message}</error>`,
      {
        headers: { ...corsHeaders, "Content-Type": "application/xml" },
        status: 500,
      }
    );
  }
});
