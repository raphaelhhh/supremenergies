## Objectif

Garantir que le sitemap reste exhaustif, à jour et signalé à Google automatiquement, sans dépendre d'un rebuild manuel.

## Ce qui est déjà bon (à conserver)

- `scripts/generate-sitemap.mjs` régénère `public/sitemap.xml` au build avec : 21 pages statiques (toutes les pages services, zones, légales, simulateur, témoignages) + tous les articles `published = true`.
- Plugin `seoPlugin()` dans `vite.config.ts` qui exécute ce script à chaque `buildStart`.
- `robots.txt` référence le sitemap.
- Le sitemap en ligne contient actuellement 40 URLs (21 statiques + 19 articles), conforme à la base.

## Améliorations à apporter

### 1. Notifier Google automatiquement à chaque nouvel article

Modifier `supabase/functions/generate-blog-post/index.ts` : après chaque insertion réussie d'un article (`published = true`), envoyer en parallèle :

- Un `GET` vers `https://www.google.com/ping?sitemap=https://supremenergies.com/sitemap.xml`
- Un `GET` vers `https://www.bing.com/ping?sitemap=https://supremenergies.com/sitemap.xml`

Échecs non bloquants (try/catch + log).

### 2. Servir aussi le sitemap dynamiquement (filet de sécurité)

L'edge function `generate-sitemap` existe déjà et lit en direct la base. On la garde comme **source de vérité dynamique** accessible via :
`https://epeomgifqjbgzyurcnaz.supabase.co/functions/v1/generate-sitemap`

Ajouter dans `public/robots.txt` une **seconde ligne `Sitemap:`** pointant vers cette URL. Google accepte plusieurs sitemaps ; cela garantit qu'il voit toujours les derniers articles, même entre deux déploiements Lovable.

### 3. Vérification de cohérence (one-shot)

Après déploiement, exécuter une vérification :

- `curl` sur les deux sitemaps
- compter les `<loc>`
- comparer avec `select count(*) from blog_posts where published = true` (actuellement 19) + 21 statiques

## Détails techniques

- L'edge function `generate-sitemap` a déjà CORS, cache-control 1h, et la même liste de pages statiques que le script de build → cohérence garantie.
- `verify_jwt` doit être désactivé pour cette fonction (accessible publiquement) — à vérifier dans `supabase/config.toml` et corriger si besoin.
- Aucune migration DB requise.

## Fichiers modifiés

- `supabase/functions/generate-blog-post/index.ts` : ajout du ping Google/Bing post-insertion.
- `public/robots.txt` : ajout d'une seconde ligne `Sitemap:` (URL edge function).
- `supabase/config.toml` : vérifier `[functions.generate-sitemap] verify_jwt = false` (ajouter si manquant).

## Hors périmètre

- Pas de changement de structure du sitemap (déjà conforme schéma 0.9).
- Pas de sitemap d'images / vidéos (non nécessaire pour l'instant).
