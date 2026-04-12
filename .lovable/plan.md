

## Génération automatique d'articles de blog par IA

### Concept

Mettre en place un système qui, tous les 3 jours, génère automatiquement un article de blog sur la rénovation énergétique en s'appuyant sur l'actualité du secteur, puis le publie directement sur le site.

### Architecture technique

```text
┌─────────────┐    ┌──────────────────┐    ┌──────────────┐    ┌─────────┐
│  pg_cron     │───▶│ Edge Function    │───▶│ Lovable AI   │───▶│  Table  │
│ (tous les   │    │ generate-blog    │    │ (rédaction)  │    │  blog_  │
│  3 jours)   │    │                  │    │              │    │  posts  │
│             │    │  - choisit sujet │    └──────────────┘    └─────────┘
│             │    │  - recherche web │                              │
│             │    │  - génère article│                              ▼
│             │    │  - sauve en BDD  │                     Blog.tsx / BlogPost.tsx
└─────────────┘    └──────────────────┘                     (lecture dynamique)
```

### Étapes

#### 1. Créer la table `blog_posts` en base de données
Stocker les articles (titre, contenu HTML, extrait, date, image, slug, statut publié/brouillon) au lieu des données codées en dur actuellement.

#### 2. Migrer les 8 articles existants dans la table
Insérer les articles actuellement hardcodés pour ne perdre aucun contenu.

#### 3. Créer l'edge function `generate-blog-post`
- Choisit un sujet parmi une liste tournante (MaPrimeRénov', CEE, pompes à chaleur, isolation, solaire, réglementation, DPE, aides locales...)
- Utilise Lovable AI pour générer un article complet (~800-1200 mots) avec titre, extrait et contenu HTML
- Sauvegarde l'article dans la table `blog_posts`

#### 4. Planifier l'exécution automatique (pg_cron)
Un job cron déclenche la fonction tous les 3 jours.

#### 5. Adapter Blog.tsx et BlogPost.tsx
Remplacer les données hardcodées par des requêtes vers la table `blog_posts`. Le blog devient entièrement dynamique.

### Points d'attention

- **Qualité du contenu** : Un bon prompt système avec les consignes de style, ton professionnel, et mots-clés SEO pertinents garantit des articles de qualité
- **Pas de duplicate** : La fonction vérifie les sujets déjà traités pour varier les thèmes
- **SEO** : Chaque article généré inclut un title et une meta description optimisés
- **Images** : Utilisation d'images Unsplash pertinentes sélectionnées par l'IA selon le sujet
- **Coût** : Utilise Lovable AI (inclus dans votre plan), donc pas de coût API supplémentaire pour la génération de texte

### Fichiers concernés

- **Créés** : `supabase/functions/generate-blog-post/index.ts`
- **Modifiés** : `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` (lecture depuis la BDD)
- **Migration SQL** : création table `blog_posts` + insertion des 8 articles existants + job cron

