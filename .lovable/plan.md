# Plan d'optimisation SEO

Audit rapide : la base SEO est déjà solide (Helmet sur la plupart des pages, JSON-LD, sitemap index avec lastmod, robots.txt, prerender). Voici les manques à combler pour pousser le SEO plus loin.

## 1. Combler les pages sans SEO

Trois pages n'ont **aucune balise SEO** (title, description, canonical, robots) :
- `LegalNotices.tsx` → ajouter Helmet + `noindex, follow` (page utilitaire)
- `PrivacyPolicy.tsx` → idem `noindex, follow`
- `TermsOfService.tsx` → idem `noindex, follow`
- `NotFound.tsx` → Helmet avec `noindex, nofollow` + status 404 hint + lien vers pages clés (sitemap interne pour récupérer le jus SEO)

Bonus : compléter le contenu placeholder de `LegalNotices.tsx` ([NOM DE VOTRE SOCIÉTÉ]…) avec les vraies infos SupremEnergies (depuis la mémoire projet).

## 2. Uniformiser les meta sociales (OG + Twitter)

Aujourd'hui incohérent selon les pages :
- Index : OG complet, **pas de Twitter Card**
- Services enfants : OG sans `og:image` ni Twitter
- BlogPost : OG complet mais Twitter manquant
- Plusieurs pages n'ont pas `og:image` → fallback hero

Action : créer un petit composant `<SeoMeta>` (title, description, canonical, OG complet, Twitter `summary_large_image`, robots, locale `fr_FR`) et l'utiliser partout. Garde les JSON-LD existants à part.

## 3. Enrichir les données structurées

- Ajouter `LocalBusiness` global (déjà sur ZoneLocale, le mettre aussi sur Index/Contact avec `areaServed`, `openingHours`, `telephone`, `priceRange`).
- Ajouter `BreadcrumbList` (via le composant existant `SeoBreadcrumb`) sur les pages services, blog post, zones — actuellement non utilisé partout.
- Ajouter `Article` schema sur `BlogPost` (vérifier qu'il a `datePublished`, `dateModified`, `author`, `publisher.logo`).
- Ajouter `WebSite` + `SearchAction` (sitelinks searchbox) sur l'Index.

## 4. Performance & Core Web Vitals (impact SEO direct)

- Hero `<img>` : ajouter `fetchpriority="high"`, `loading="eager"`, `decoding="async"`, `width`/`height` explicites pour éviter le CLS.
- Toutes les autres `<img>` : `loading="lazy"`, `decoding="async"`, dimensions explicites.
- Préchargement de l'image LCP du Hero via `<link rel="preload" as="image">` (injecté dans Helmet de Index).
- Vérifier les `alt` (audit rapide sur les images du Hero et des cartes services).

## 5. Maillage interne & accessibilité SEO

- Ajouter un fil d'Ariane visible (composant `Breadcrumb` existant) en haut de chaque page interne (services, blog, zones, à propos, contact). Améliore le maillage et alimente le `BreadcrumbList`.
- Vérifier qu'il n'y a qu'un seul `<h1>` par page (audit rapide).
- Footer : s'assurer que les liens vers les 4 pages services et les zones principales sont présents (boost crawl interne).

## 6. Robots.txt & sitemap

- Ajouter `Disallow: /404` et `Disallow: /*?*` (paramètres) si non bloqués.
- Ajouter une ligne `Host: https://supremenergies.com` (optionnel, ignoré par Google mais utile pour Yandex/Bing).
- Vérifier que les 3 pages "noindex" (legal/privacy/terms) ne polluent pas le sitemap statique → les retirer de `sitemap-pages.xml` si présentes.

## 7. Détails techniques

- Préconnect `images.unsplash.com` et le domaine Supabase (utilisé pour avis Google + sitemap dynamique) dans `index.html`.
- Ajouter `<html lang="fr">` est déjà OK. Ajouter `<meta name="theme-color">` pour mobile.
- 404 doit aussi servir un vrai status 404 côté hébergeur (Lovable sert la SPA → ajouter au moins `<meta name="prerender-status-code" content="404">` pour les bots).

## Livrables (ordre d'exécution)

1. Composant `SeoMeta` réutilisable + appliquer sur toutes les pages
2. SEO sur Legal/Privacy/Terms/NotFound (noindex)
3. Remplir vraies infos LegalNotices
4. Breadcrumb visible + JSON-LD sur services/blog/zones
5. Optimisations images (Hero priority, lazy ailleurs)
6. Préconnect + theme-color dans `index.html`
7. Mise à jour `robots.txt` et nettoyage `sitemap-pages.xml`
8. Enrichissement JSON-LD (WebSite SearchAction, LocalBusiness sur Contact, Article complet sur BlogPost)

Aucun changement de design, aucun ajout de stat ni mention RGE.
