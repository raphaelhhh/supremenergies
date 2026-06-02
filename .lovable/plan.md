## Sprint 2 — Contenu, lead magnets et conversion

Objectif : transformer le trafic SEO (long tail local + pilier Aides 2026) en demandes entrantes qualifiées, sans budget Ads.

### 1. Lead magnet PDF "Guide Aides Rénovation 2026"

- Nouveau composant `src/components/LeadMagnetForm.tsx` : formulaire 3 champs (prénom, email, code postal) + checkbox RGPD.
- Insertion dans : `Index.tsx` (section dédiée après SocialProof), `AidesRenovation2026.tsx` (CTA milieu + fin), `BlogPost.tsx` (après 60% de lecture).
- Edge function `supabase/functions/send-lead-magnet/index.ts` :
  - valide l'email (zod),
  - insère dans nouvelle table `public.leads` (email, prénom, code_postal, source, created_at) avec RLS stricte + GRANT service_role,
  - envoie le PDF en pièce jointe via Resend (secret `RESEND_API_KEY` à demander),
  - push event `lead_magnet_submit` vers Zapier (webhook existant).
- PDF statique `public/guide-aides-renovation-2026.pdf` (placeholder à remplacer plus tard par contenu réel).

### 2. Multi-step form sur /devis-gratuit

- Refonte `src/pages/DevisGratuit.tsx` en 4 étapes : type de travaux → logement → contact → récap.
- Progress bar + validation par étape (zod), persistance localStorage anti-perte.
- Submit → même edge function que LeadMagnet (source=`devis_multistep`) + redirection Google Form en pré-rempli (URL params).
- Tracking GTM : `form_step_view`, `form_step_complete`, `form_submit`.

### 3. CTA dynamique au scroll 50%

- Nouveau `src/components/ScrollCTA.tsx` : bannière sticky bottom (desktop) déclenchée à 50% scroll, dismissible (sessionStorage).
- Affichée sur Blog, BlogPost, Services, ServiceCity, AidesRenovation2026.
- Variante A/B simple via random 50/50 stocké en localStorage (message 1 : "Estimez vos aides", message 2 : "Devis gratuit 48h").

### 4. Topic clusters blog

- Ajouter à `supabase/functions/generate-blog-post/index.ts` une logique de silos :
  - 4 clusters (Pompe à chaleur, Isolation, Solaire, Aides) avec liste de sujets et internal links automatiques entre articles du même silo + vers la page service correspondante + vers `/aides-renovation-2026`.
- Enrichir le prompt : tableaux markdown obligatoires, schema `HowTo` ou `FAQPage` selon le type, CTA LeadMagnet en milieu d'article.
- Composant `src/components/BlogClusterNav.tsx` affiché en haut de chaque BlogPost listant les autres articles du même silo.

### 5. 2e page pilier : "Pompe à chaleur 2026 : prix, aides, installation"

- `src/pages/PompeAChaleur2026.tsx` (~1800 mots) : tableaux COP, comparatif air/eau vs air/air, calculateur d'économies inline, FAQPage + Product schema.
- Route + lien Footer + ajout au sitemap.

### 6. Maillage interne renforcé

- `RelatedZones.tsx` : afficher 3 villes proches géographiquement (basé sur département) au lieu d'aléatoire.
- `InternalLinksHub.tsx` : ajouter section "Aides par région" pointant vers les 5 régions cibles.
- Footer : ajouter colonne "Guides" avec liens vers les 2 pages piliers.

### 7. Suivi conversion

- Table `public.leads` + dashboard simple (déjà couvert par l'edge function et l'analytics existant — pas d'UI admin dans ce sprint).
- Events GTM additionnels : `lead_magnet_download`, `scroll_cta_click`, `multistep_complete`.

### Technique

- Stack inchangée (React + Supabase + Lovable AI Gateway).
- Nouvelle dépendance : aucune (Resend appelé via fetch direct dans edge function).
- Secret requis : `RESEND_API_KEY` — je le demanderai au moment d'implémenter l'edge function.
- Migration SQL : création table `leads` avec RLS (INSERT public validé, SELECT service_role only) + GRANT explicites.

### Fichiers touchés

Créés : `LeadMagnetForm.tsx`, `ScrollCTA.tsx`, `BlogClusterNav.tsx`, `PompeAChaleur2026.tsx`, `send-lead-magnet/index.ts`, migration leads, PDF placeholder.
Édités : `Index.tsx`, `DevisGratuit.tsx`, `BlogPost.tsx`, `AidesRenovation2026.tsx`, `generate-blog-post/index.ts`, `RelatedZones.tsx`, `InternalLinksHub.tsx`, `Footer.tsx`, `App.tsx`, `scripts/generate-sitemap.mjs`.

### Ordre d'exécution

1. Migration `leads` + edge function `send-lead-magnet` + secret Resend
2. LeadMagnetForm + intégration 3 pages
3. Multi-step DevisGratuit
4. ScrollCTA + A/B
5. Page pilier PompeAChaleur2026
6. Clusters blog + BlogClusterNav
7. Maillage interne + sitemap

Dis-moi si je lance tout, ou si tu veux prioriser un bloc (ex. : lead magnet d'abord pour capter dès cette semaine).