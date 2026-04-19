

## Plan SEO : améliorer l'indexation et générer de la demande entrante

### Constat actuel (rapport GSC du 19/04)
- Seulement **4 pages indexées sur 23**
- 15 pages "Découvertes mais non indexées" → manque de signal de qualité
- 3 pages "Page avec redirection" → sitemap obsolète
- Pas de données structurées Schema.org sur les pages
- Maillage interne faible entre blog et pages services

### Stratégie en 4 axes

#### 1. Données structurées Schema.org (impact fort, rapide)
Ajouter du JSON-LD sur toutes les pages via `react-helmet-async` :
- **LocalBusiness** sur toutes les pages (NAP : SupremEnergies, 01 86 04 68 89, zone d'intervention)
- **Service** sur chaque page service (Isolation, PAC, Solaire, Rénovation Globale) avec prix, zone, description
- **FAQPage** sur les pages services (questions fréquentes)
- **Article + BreadcrumbList** sur les articles de blog (auteur, date, image)
- **Organization** + sameAs (réseaux sociaux) sur la home

#### 2. Enrichissement contenu pages services (résout "Discovered – not indexed")
Google ignore les pages jugées "thin content". Pour chaque page service :
- Ajouter une section **FAQ** (6-8 questions) avec accordéon
- Ajouter une section **"Pourquoi choisir SupremEnergies"** avec bénéfices détaillés
- Ajouter une section **"Notre processus"** (étapes 1-2-3-4)
- Ajouter **liens internes contextuels** vers les autres services et articles de blog pertinents
- Cibler des **mots-clés longue traîne** dans les H2/H3 (ex : "prix pompe à chaleur air-eau Île-de-France 2026")

#### 3. Maillage interne renforcé
- **Footer** : ajouter une colonne "Articles populaires" avec 4-5 derniers articles
- **Pages services** : bloc "Articles liés" en bas (3 articles du blog filtrés par thème)
- **Articles de blog** : bloc "Services associés" + "Articles similaires" en bas
- **BlogPost** : breadcrumb visible (Accueil > Blog > Article)

#### 4. Sitemap & technique
- **Régénérer `public/sitemap.xml`** dynamiquement (ou à jour manuellement) avec :
  - Toutes les pages services
  - Tous les articles de blog (lus depuis Supabase au build, ou liste statique mise à jour)
  - Suppression des URLs en redirect
  - `lastmod`, `priority` et `changefreq` corrects
- **Edge function `generate-sitemap`** : génère un sitemap XML dynamique à partir de la table `blog_posts` (servi sur `/sitemap.xml` via redirect Netlify ou route React)
- Vérifier que les meta `description` sont uniques et < 160 caractères sur chaque page
- Ajouter balises **canonical** sur toutes les pages
- Ajouter **Open Graph** spécifique par page (pas seulement le défaut)

### Architecture technique

```text
Pages services (Isolation, PAC, Solaire, Rénov)
    ├── <Helmet> JSON-LD Service + FAQPage
    ├── <FAQSection /> (nouveau composant)
    ├── <ProcessSteps /> (nouveau composant)
    └── <RelatedArticles theme="..." /> (nouveau composant, query Supabase)

Pages blog
    ├── <Helmet> JSON-LD Article + BreadcrumbList
    ├── <Breadcrumb />
    ├── <RelatedServices /> (CTA contextuel)
    └── <RelatedArticles excludeId={...} />

Footer
    └── Colonne "Articles populaires" (5 derniers)

Edge function generate-sitemap
    └── Lit blog_posts → génère XML → sert /sitemap.xml
```

### Fichiers concernés
- **Créés** : 
  - `src/components/FAQSection.tsx`
  - `src/components/ProcessSteps.tsx`
  - `src/components/RelatedArticles.tsx`
  - `src/components/RelatedServices.tsx`
  - `src/components/SEO.tsx` (wrapper Helmet + JSON-LD réutilisable)
  - `supabase/functions/generate-sitemap/index.ts`
- **Modifiés** : 
  - 4 pages services (`src/pages/services/*.tsx`) — ajout FAQ, process, JSON-LD, contenu enrichi
  - `src/pages/BlogPost.tsx` — breadcrumb, JSON-LD Article, blocs liés
  - `src/pages/Blog.tsx` — JSON-LD CollectionPage
  - `src/pages/Index.tsx` — JSON-LD LocalBusiness + Organization
  - `src/components/Footer.tsx` — colonne articles populaires
  - `public/_redirects` — rediriger `/sitemap.xml` vers l'edge function
  - `public/sitemap.xml` — supprimer (remplacé par edge function)

### Résultat attendu
- Indexation : passer de 4 à 20+ pages indexées sous 4-6 semaines
- Apparition en SERP sur des requêtes longue traîne (ex : "prix pompe à chaleur Paris", "MaPrimeRénov 2026 conditions")
- Rich snippets (FAQ, breadcrumb, étoiles) visibles dans Google
- Plus de demandes entrantes via le formulaire grâce aux CTA contextuels dans les articles et pages enrichies

