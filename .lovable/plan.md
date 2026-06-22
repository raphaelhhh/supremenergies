## Vue d'ensemble

Deux gros chantiers en parallèle :
1. **Blog Pack pro** : catégories, maillage interne, template d'article enrichi, brief mots-clés dans l'IA
2. **Tracking conversions** : remplacement du Google Form par le formulaire interne `/devis-gratuit` + événements GA4

---

## Partie A — Blog Pack pro

### A1. Schéma base de données
- Migration : ajouter `category text` et `target_keyword text` sur `blog_posts`
- Backfill : assigner une catégorie à chaque article existant via heuristique sur le titre (mots-clés "pompe à chaleur" → `pompe-a-chaleur`, etc.)
- 6 catégories : `pompe-a-chaleur`, `isolation`, `panneaux-solaires`, `aides-financieres`, `renovation-globale`, `conseils-pratiques`

### A2. Page catégorie `/blog/categorie/:slug`
- Nouvelle route + page `BlogCategory.tsx`
- En-tête SEO unique par catégorie (H1 + 150 mots de description optimisée)
- Liste des articles de la catégorie
- Helmet : title/description/canonical/JSON-LD `CollectionPage` propre à la catégorie
- Breadcrumbs schema

### A3. Template `BlogPost.tsx` enrichi
- **Breadcrumbs** (Accueil > Blog > Catégorie > Article) avec JSON-LD `BreadcrumbList`
- **Table des matières (TOC)** auto-générée depuis les `<h2>` du contenu
- **FAQ schema** si l'article contient une section FAQ détectable
- **CTA inline** injecté mi-article (après ~50% du contenu)
- **Articles liés** : 3 articles de la même catégorie en pied
- **Badge catégorie** cliquable vers la page catégorie
- Liens internes contextuels (déjà présents via `InternalLinksHub`)

### A4. Page `/blog` mise à jour
- Ajout d'une rangée de **chips catégories** sous la barre de recherche
- Filtrage par catégorie en plus de la recherche texte

### A5. Edge Function `generate-blog-post` — brief mots-clés
- Sélection d'un mot-clé long-tail dans une liste pré-définie (rotation) au lieu de prompt libre
- Le prompt IA reçoit : `target_keyword`, `category`, structure imposée (intro, 4 H2, FAQ, conclusion CTA), longueur cible 1200-1500 mots
- Stockage de `target_keyword` et `category` dans la ligne créée

### A6. Sitemap
- Ajout des 6 URLs `/blog/categorie/:slug` dans `scripts/generate-sitemap.ts`

---

## Partie B — Tracking conversions & remplacement Google Form

### B1. Audit des liens Google Form
- Recenser toutes les occurrences de `docs.google.com/forms` (Hero, CTAs, Sticky mobile, Exit intent, etc.)
- Toutes pointent désormais vers `/devis-gratuit` (formulaire interne déjà connecté à `leads` + Zapier)

### B2. Page `/devis-gratuit` — confirmation tracking
- S'assurer que la soumission déclenche un `dataLayer.push({ event: 'generate_lead', form_location: '<page d'origine>' })`
- Lire le `referrer` ou un query param `?from=...` pour tagger l'origine (hero, sticky, popup, services/...)

### B3. Événements GA4
- Hook utilitaire `trackLead({ source, projectType })` → push GTM dataLayer
- Déclenchement sur :
  - submit `/devis-gratuit` (succès)
  - submit `/contact` (succès)
  - submit simulateur d'aides (succès)
- Documentation courte dans `mem://integrations/suivi-et-marketing` sur comment configurer la **conversion** `generate_lead` dans GA4

### B4. GSC
- Pas d'action code requise — GSC ne mesure pas les conversions, il mesure impressions/clics
- Je préciserai au user : la mesure des conversions = GA4 uniquement, GSC sert au suivi indexation/positions

---

## Hors scope (à demander si besoin)
- Refonte graphique du blog
- Migration vers SSR (les og:* par catégorie resteront client-side comme aujourd'hui pour Googlebot)
- Création des 6 illustrations de catégories (utilisera des photos existantes par défaut)

## Détails techniques

- Migration SQL via `supabase--migration` avec GRANTs préservés
- Edge function modifiée puis redéployée automatiquement
- React-helmet-async déjà en place pour le SEO par route
- Catégories slugs en kebab-case, mapping en constante partagée `src/lib/blog-categories.ts`
- TOC : parse markdown `^## ` côté client, génère IDs, scroll-spy léger
- Articles liés : `.eq('category', current).neq('id', current.id).limit(3)`
- GTM dataLayer : pas de nouvelle dépendance, juste `window.dataLayer.push(...)`

## Estimation
~15-20 fichiers touchés, 1 migration, 1 edge function modifiée. Je travaille en lots et je vous tiens informé après chaque lot.
