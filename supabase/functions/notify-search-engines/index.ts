// Edge function : notifie les moteurs de recherche (IndexNow + Google ping)
// pour accélérer l'indexation des nouvelles URLs (articles blog, pages mises à jour).
//
// POST { urls: string[] } -> ping IndexNow (Bing/Yandex/etc.) + ping Google sitemap.
// Aucun JWT requis (config dans supabase/config.toml).

import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const INDEXNOW_KEY = "3b29658ff635be34988fe8d0e024438b";
const HOST = "supremenergies.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

interface Body {
  urls?: string[];
  /** Si true, on ping aussi le sitemap général à Google/Bing */
  pingSitemap?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    /* body vide ok */
  }

  const urls = (body.urls ?? []).filter(
    (u) => typeof u === "string" && u.startsWith(`https://${HOST}/`)
  );
  const results: Record<string, unknown> = {};

  // 1) IndexNow — un seul appel pour toutes les URLs
  if (urls.length > 0) {
    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: KEY_LOCATION,
          urlList: urls,
        }),
      });
      results.indexnow = { status: res.status, ok: res.ok };
    } catch (e) {
      results.indexnow = { error: String(e) };
    }
  }

  // 2) Ping Google + Bing sitemap (legacy mais encore utile)
  if (body.pingSitemap !== false) {
    const pings = [
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    ];
    results.sitemapPings = await Promise.all(
      pings.map(async (u) => {
        try {
          const r = await fetch(u);
          return { url: u, status: r.status };
        } catch (e) {
          return { url: u, error: String(e) };
        }
      })
    );
  }

  return new Response(JSON.stringify({ ok: true, urls: urls.length, results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
