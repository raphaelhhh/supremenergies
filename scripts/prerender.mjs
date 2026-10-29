// Post-build: crée un index.html pré-rendu par route avec
// title/description/canonical/OG/JSON-LD/H1/intro spécifiques.
// Objectif: indexation Google même sans exécuter le JS (SPA fallback).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const baseHtmlPath = resolve(distDir, "index.html");

if (!existsSync(baseHtmlPath)) {
  console.warn("[prerender] dist/index.html introuvable, skip");
  process.exit(0);
}

const baseHtml = readFileSync(baseHtmlPath, "utf8");
const SITE_URL = "https://supremenergies.com";
const OG_IMG = `${SITE_URL}/og-image.jpg`;
const blogConsolidation = JSON.parse(readFileSync(resolve(__dirname, "../src/data/blog-consolidation.json"), "utf8"));

/**
 * Routes à pré-rendre. Chaque entrée définit le contenu SEO injecté côté serveur
 * (Googlebot voit ce HTML statique avant que le JS hydrate la SPA).
 */
const ZONES = [
  { slug: "paris", name: "Paris", code: "75" },
  { slug: "versailles", name: "Versailles", code: "78" },
  { slug: "boulogne-billancourt", name: "Boulogne-Billancourt", code: "92" },
  { slug: "saint-denis", name: "Saint-Denis", code: "93" },
  { slug: "nanterre", name: "Nanterre", code: "92" },
  { slug: "montreuil", name: "Montreuil", code: "93" },
];

const routes = [
  {
    path: "/",
    title: "Rénovation énergétique & aides 2026 | SupremEnergies",
    description:
      "Rénovation énergétique : isolation, solaire et pompe à chaleur installée partout en France par nos équipes. Aides 2026 sous conditions. Devis gratuit.",
    h1: "Votre rénovation énergétique, menée avec sérieux de A à Z",
    intro:
      "Isolation et solaire en Île-de-France, pompe à chaleur partout en France par nos équipes. Un devis détaillé et un accompagnement pour comprendre les aides à la rénovation énergétique en 2026. MaPrimeRénov', CEE et financements sont étudiés sous conditions, sans garantie d'attribution.",
  },
  {
    path: "/about",
    title: "À propos de SupremEnergies | Expert Rénovation Énergétique IDF",
    description:
      "Découvrez SupremEnergies, entreprise spécialisée dans la rénovation énergétique en Île-de-France. Notre mission, nos valeurs et notre équipe d'experts.",
    h1: "À propos de SupremEnergies",
    intro:
      "SupremEnergies est une entreprise française spécialisée dans la rénovation énergétique. Basée à Pantin, nous intervenons dans toute l'Île-de-France pour aider particuliers et professionnels à réduire leurs consommations.",
  },
  {
    path: "/services",
    title: "Nos Services de Rénovation Énergétique | SupremEnergies",
    description:
      "Isolation thermique, pompes à chaleur, panneaux solaires, rénovation globale. Découvrez tous nos services de rénovation énergétique en Île-de-France.",
    h1: "Nos services de rénovation énergétique",
    intro:
      "Découvrez l'ensemble de nos prestations : isolation des combles, murs et planchers, installation de pompes à chaleur air/eau ou air/air, pose de panneaux photovoltaïques, et rénovation énergétique globale.",
  },
  {
    path: "/services/isolation-thermique",
    title: "Isolation Thermique en Île-de-France | SupremEnergies",
    description:
      "Expert en isolation thermique : combles, murs (ITE/ITI), fenêtres, planchers. Réduisez vos factures de 25 à 50%. Devis gratuit, aides MaPrimeRénov' 2026.",
    h1: "Isolation thermique en Île-de-France",
    intro:
      "L'isolation thermique est le premier levier d'économie d'énergie. SupremEnergies réalise l'isolation des combles perdus et aménagés, l'isolation des murs par l'extérieur (ITE) ou par l'intérieur (ITI), le remplacement de fenêtres et l'isolation des planchers bas.",
  },
  {
    path: "/services/pompe-a-chaleur",
    title: "Pompe à chaleur : installation & aides 2026 | SupremEnergies",
    description:
      "Installation de pompe à chaleur partout en France par nos équipes. PAC air/eau ou air/air, devis gratuit et étude des aides 2026 selon votre éligibilité.",
    h1: "Installation de pompe à chaleur par nos équipes",
    intro:
      "Une pompe à chaleur air/eau ou air/air adaptée à votre maison, partout en France. SupremEnergies vous accompagne de l'étude du logement à la mise en service et fait le point sur les aides 2026 sous conditions. Le prix dépend du logement, du type de PAC et des travaux nécessaires. Les aides et économies ne sont pas garanties.",
  },
  {
    path: "/services/panneaux-solaires",
    title: "Panneaux Solaires Photovoltaïques | Installation IDF | SupremEnergies",
    description:
      "Installation de panneaux solaires photovoltaïques en Île-de-France. Autoconsommation, revente, prime à l'investissement. Devis gratuit.",
    h1: "Panneaux solaires photovoltaïques",
    intro:
      "Produisez votre propre électricité grâce aux panneaux solaires photovoltaïques. Autoconsommation totale ou avec revente du surplus, dimensionnement personnalisé, démarches administratives prises en charge.",
  },
  {
    path: "/services/renovation-globale",
    title: "Rénovation Énergétique Globale | SupremEnergies Île-de-France",
    description:
      "Rénovation énergétique globale : audit, isolation, chauffage, ventilation. Gain énergétique garanti, MaPrimeRénov' Sérénité, Île-de-France.",
    h1: "Rénovation énergétique globale",
    intro:
      "La rénovation globale combine plusieurs travaux pour atteindre un saut énergétique de 2 classes minimum. Audit, isolation, changement de chauffage, ventilation : un projet complet avec accompagnement de A à Z.",
  },
  {
    path: "/simulateur-aides",
    title: "Simulateur Aides Rénovation 2026 | MaPrimeRénov' & CEE | SupremEnergies",
    description:
      "Simulez en 2 minutes vos aides à la rénovation énergétique 2026 : MaPrimeRénov', CEE, éco-PTZ. Estimation personnalisée et gratuite.",
    h1: "Simulateur d'aides à la rénovation énergétique 2026",
    intro:
      "Découvrez en quelques clics le montant des aides auxquelles vous avez droit en 2026 : MaPrimeRénov', Certificats d'Économies d'Énergie (CEE), éco-PTZ, TVA réduite à 5,5%.",
  },
  {
    path: "/temoignages",
    title: "Témoignages clients SupremEnergies | Avis Google ★★★★★",
    description:
      "Découvrez les avis et témoignages de nos clients en Île-de-France. Pompes à chaleur, isolation, panneaux solaires : retours d'expérience vérifiés.",
    h1: "Témoignages de nos clients",
    intro:
      "Découvrez les retours d'expérience de particuliers et professionnels qui ont fait confiance à SupremEnergies pour leurs travaux de rénovation énergétique en Île-de-France.",
  },
  {
    path: "/blog",
    title: "Blog Rénovation Énergétique 2026 | Conseils & Aides | SupremEnergies",
    description:
      "Articles d'experts sur la rénovation énergétique : pompes à chaleur, isolation, MaPrimeRénov' 2026, panneaux solaires. Conseils pratiques et actualités.",
    h1: "Le blog SupremEnergies",
    intro:
      "Retrouvez nos guides, conseils et actualités sur la rénovation énergétique : pompes à chaleur, isolation, aides 2026, économies d'énergie.",
  },
  {
    path: "/contact",
    title: "Devis Gratuit Rénovation Énergétique 48h ★ SupremEnergies",
    description:
      "✓ Devis gratuit en 48h ✓ Conseiller dédié. Pompe à chaleur, isolation, solaire en Île-de-France. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026.",
    h1: "Contactez SupremEnergies",
    intro:
      "Demandez votre devis gratuit en 48h. Téléphone : 01 86 04 68 89. Email : contact@supremenergies.com. Intervention dans toute l'Île-de-France.",
  },
  {
    path: "/devis-gratuit",
    title: "Devis Gratuit Rénovation Énergétique | SupremEnergies",
    description:
      "Obtenez votre devis gratuit en 48h pour vos travaux de rénovation énergétique en Île-de-France. Sans engagement.",
    h1: "Demandez votre devis gratuit",
    intro:
      "Recevez sous 48h une estimation détaillée et gratuite pour votre projet de pompe à chaleur, isolation, panneaux solaires ou rénovation globale.",
  },
  {
    path: "/mentions-legales",
    title: "Mentions Légales | SupremEnergies",
    description: "Mentions légales du site SupremEnergies.",
    h1: "Mentions légales",
    intro: "Informations légales relatives à l'éditeur du site SupremEnergies.",
  },
  {
    path: "/privacy",
    title: "Politique de Confidentialité | SupremEnergies",
    description: "Politique de confidentialité et gestion des données personnelles SupremEnergies.",
    h1: "Politique de confidentialité",
    intro: "Découvrez comment nous protégeons et utilisons vos données personnelles.",
  },
  {
    path: "/terms",
    title: "Conditions Générales d'Utilisation | SupremEnergies",
    description: "Conditions générales d'utilisation du site SupremEnergies.",
    h1: "Conditions générales d'utilisation",
    intro: "Conditions encadrant l'utilisation de notre site et de nos services.",
  },
  ...ZONES.map((z) => ({
    path: `/zones/${z.slug}`,
    title: `Rénovation Énergétique ${z.name} (${z.code}) | SupremEnergies`,
    description: `Expert en rénovation énergétique à ${z.name} : pompe à chaleur, isolation, panneaux solaires. Devis gratuit, aides MaPrimeRénov' 2026.`,
    h1: `Rénovation énergétique à ${z.name}`,
    intro: `SupremEnergies intervient à ${z.name} (${z.code}) pour tous vos travaux de rénovation énergétique : pompe à chaleur, isolation thermique, panneaux solaires, rénovation globale. Devis gratuit en 48h.`,
  })),
];

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(route) {
  const canonical = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const desc = escapeHtml(route.description);
  const h1 = escapeHtml(route.h1);
  const intro = escapeHtml(route.intro);

  // Bloc SEO injecté dans <head> (remplace le titre/description par défaut)
  const headInjection = `    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${OG_IMG}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${OG_IMG}" />`;

  // Contenu SEO visible (caché à l'œil mais lu par Googlebot — react remplace #root au mount)
  const bodyInjection = `<div id="seo-prerender" style="position:absolute;left:-99999px;top:auto;width:1px;height:1px;overflow:hidden;">
      <h1>${h1}</h1>
      <p>${intro}</p>
      <p><strong>SupremEnergies</strong> — 55 rue Cartier Bresson, 93500 Pantin. Téléphone : <a href="tel:+33186046889">01 86 04 68 89</a>. Email : <a href="mailto:contact@supremenergies.com">contact@supremenergies.com</a>.</p>
      <nav aria-label="Navigation principale">
        <a href="/">Accueil</a> · <a href="/services">Services</a> · <a href="/services/isolation-thermique">Isolation</a> · <a href="/services/pompe-a-chaleur">Pompe à chaleur</a> · <a href="/services/panneaux-solaires">Panneaux solaires</a> · <a href="/services/renovation-globale">Rénovation globale</a> · <a href="/simulateur-aides">Simulateur d'aides</a> · <a href="/blog">Blog</a> · <a href="/temoignages">Témoignages</a> · <a href="/contact">Contact</a>
      </nav>
    </div>`;

  let html = baseHtml;
  // Remplace le <title> existant
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  // Remplace meta description / og existants
  html = html.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");

  // Injecte les nouveaux tags juste avant </head>
  html = html.replace("</head>", `${headInjection}\n  </head>`);

  // Injecte le contenu SEO juste après <div id="root">
  html = html.replace(
    /<div\s+id=["']root["']\s*>\s*<\/div>/i,
    `<div id="root"></div>\n    ${bodyInjection}`,
  );
  // Si l'élément root contient déjà du contenu (HMR), fallback
  if (!html.includes("id=\"seo-prerender\"")) {
    html = html.replace("</body>", `    ${bodyInjection}\n  </body>`);
  }

  return html;
}

let written = 0;
for (const route of routes) {
  const html = buildHtml(route);
  const outDir =
    route.path === "/"
      ? distDir
      : resolve(distDir, "." + route.path);
  if (route.path !== "/") mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "index.html");
  writeFileSync(outPath, html, "utf8");
  written++;
}

// The three optimized guides use their published editorial data in both the
// initial HTML and React. Render real article content, not a hidden SEO block.
async function prerenderGuides() {
  const apiUrl = "https://epeomgifqjbgzyurcnaz.supabase.co";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZW9tZ2lmcWpiZ3p5dXJjbmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTUyOTEsImV4cCI6MjA5MTU3MTI5MX0.7WTHMDXIKtK007D_g_z3iHRWGe-K3_RRmDkCIXJWgGQ";
  const params = new URLSearchParams({
    select: "slug,title,meta_description,excerpt,content,published_at,updated_at",
    published: "eq.true",
    slug: `in.(${blogConsolidation.guideSlugs.join(",")})`,
  });
  const response = await fetch(`${apiUrl}/rest/v1/blog_posts?${params}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Guide fetch failed: ${response.status}`);
  const posts = await response.json();
  if (posts.length !== blogConsolidation.guideSlugs.length) {
    throw new Error("An optimized guide is missing from published content");
  }
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    const canonical = `${SITE_URL}${path}`;
    let html = buildHtml({ path, title: `${post.title} | SupremEnergies`, description: post.meta_description || post.excerpt, h1: post.title, intro: post.excerpt });
    html = html.replace(/<div id="seo-prerender"[\s\S]*?<\/nav>\s*<\/div>/, "");
    html = html.replace('<div id="root"></div>', `<div id="root"><main><article><h1>${escapeHtml(post.title)}</h1>${post.content}</article></main></div>`);
    html = html.replace('property="og:type" content="website"', 'property="og:type" content="article"');
    const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.meta_description || post.excerpt, datePublished: post.published_at, dateModified: post.updated_at, mainEntityOfPage: canonical, author: { "@type": "Organization", name: "SupremEnergies" } };
    html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head>`);
    const outDir = resolve(distDir, `.${path}`);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html);
    written++;
  }
  // Lovable static hosting cannot issue configured HTTP 301s. An immediate
  // HTML redirect and destination canonical also work for non-JS crawlers.
  for (const [from, to] of Object.entries(blogConsolidation.redirects)) {
    const target = `${SITE_URL}${to}`;
    const outDir = resolve(distDir, `.${from}`);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Guide éco-PTZ | SupremEnergies</title><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${target}"></head><body><p><a href="${target}">Consulter le guide éco-PTZ mis à jour</a></p></body></html>`);
    written++;
  }
}

await prerenderGuides();
console.log(`[prerender] wrote ${written} pre-rendered HTML files`);
