// Vérifie en production :
//  1. robots.txt référence le sitemap index
//  2. Le sitemap index répond en 200 et liste les sous-sitemaps attendus
//  3. Chaque sous-sitemap (pages, blog, dynamique) répond en 200 et contient des <url>
//
// Usage : node scripts/verify-sitemap.mjs
// Code de sortie : 0 si tout OK, 1 sinon (utilisable en CI / post-deploy).

const SITE_URL = "https://supremenergies.com";
const DYNAMIC_SITEMAP =
  "https://epeomgifqjbgzyurcnaz.supabase.co/functions/v1/generate-sitemap";

const EXPECTED_SITEMAPS = [
  `${SITE_URL}/sitemap-pages.xml`,
  `${SITE_URL}/sitemap-blog.xml`,
  DYNAMIC_SITEMAP,
];

let failures = 0;
const log = (ok, msg) => {
  console.log(`${ok ? "✅" : "❌"} ${msg}`);
  if (!ok) failures++;
};

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  return { status: res.status, text, contentType: res.headers.get("content-type") || "" };
}

// 1) robots.txt référence le sitemap index
try {
  const robots = await get(`${SITE_URL}/robots.txt`);
  log(robots.status === 200, `robots.txt → HTTP ${robots.status}`);
  log(
    robots.text.includes(`Sitemap: ${SITE_URL}/sitemap.xml`),
    `robots.txt référence Sitemap: ${SITE_URL}/sitemap.xml`,
  );
} catch (e) {
  log(false, `robots.txt unreachable: ${e.message}`);
}

// 2) sitemap.xml (index) répond en 200 et liste les 3 sous-sitemaps
let indexText = "";
try {
  const index = await get(`${SITE_URL}/sitemap.xml`);
  log(index.status === 200, `sitemap.xml (index) → HTTP ${index.status}`);
  log(
    index.contentType.includes("xml"),
    `sitemap.xml content-type contient "xml" (${index.contentType || "vide"})`,
  );
  log(index.text.includes("<sitemapindex"), "sitemap.xml est un <sitemapindex>");
  indexText = index.text;
  for (const sm of EXPECTED_SITEMAPS) {
    log(indexText.includes(sm), `index référence ${sm}`);
  }
} catch (e) {
  log(false, `sitemap.xml unreachable: ${e.message}`);
}

// 3) chaque sous-sitemap répond en 200 et contient des <url>
for (const sm of EXPECTED_SITEMAPS) {
  try {
    const sub = await get(sm);
    log(sub.status === 200, `${sm} → HTTP ${sub.status}`);
    const urlCount = (sub.text.match(/<url>/g) || []).length;
    log(urlCount > 0, `${sm} contient ${urlCount} <url>`);
    const lastmodCount = (sub.text.match(/<lastmod>/g) || []).length;
    log(
      lastmodCount === urlCount && urlCount > 0,
      `${sm} : ${lastmodCount}/${urlCount} URLs ont un <lastmod>`,
    );
  } catch (e) {
    log(false, `${sm} unreachable: ${e.message}`);
  }
}

console.log(
  failures === 0
    ? "\n🎉 Tous les checks sitemap sont OK"
    : `\n💥 ${failures} check(s) en échec`,
);
process.exit(failures === 0 ? 0 : 1);
