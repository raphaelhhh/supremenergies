## Objectif

Reproduire le type d'affichage Google que Polymarket obtient quand on cherche son nom : **titre + URL + description + sitelinks** (les 4-6 sous-liens cliquables : "Tendances", "Nouveau", etc.).

## Important à savoir

Les **sitelinks sont 100% automatiques** : Google les génère seul quand il considère que le site est suffisamment structuré, populaire et indexé. On ne peut pas les forcer, mais on peut **maximiser leur probabilité d'apparition** en envoyant les bons signaux.

Aujourd'hui le site n'a quasiment aucun sitelink car :
1. Le domaine `supremenergies.com` vient juste d'être branché (domaine "neuf" pour Google).
2. Pas encore de schema `WebSite` avec `SearchAction` (manque le signal "site avec navigation").
3. Le `LocalBusiness` schema existe mais pas de `Organization` propre avec logo + sameAs (réseaux sociaux).
4. Les ancres internes (footer, menu) ne sont pas optimisées pour signaler les "pages clés".

## Ce que je vais faire

### 1. Ajouter les schemas manquants dans `index.html` (global, sur toutes les pages)

- **`Organization`** : nom officiel, logo, URL, contact, sameAs (LinkedIn, Facebook, Instagram si dispo).
- **`WebSite`** avec `potentialAction` → SearchAction (autorise la "Sitelinks search box" Google).

### 2. Renforcer la structure de navigation

- Vérifier que le menu principal contient des libellés courts et stables (Services, À propos, Blog, Contact, Devis) — c'est ce que Google utilise comme candidats sitelinks.
- Ajouter dans le **footer** une section "Pages principales" avec les 6 liens qu'on veut voir apparaître : Isolation, Pompe à chaleur, Panneaux solaires, Rénovation globale, Simulateur d'aides, Devis gratuit.

### 3. Nettoyer la balise `<title>` et `<meta description>` de la home

- Title actuel : OK mais long. Raccourcir à : `SupremEnergies — Rénovation énergétique en Île-de-France`
- Meta description : déjà bonne, garder.

### 4. Vérifier la soumission Google Search Console

- Confirmer que le sitemap.xml est bien soumis sur la propriété `https://supremenergies.com/`.
- Demander une indexation manuelle de la home + des 4 pages services via GSC (action manuelle de ta part, je te guiderai).

### 5. Délai réaliste

Même avec tout ça parfait, Google met **2 à 8 semaines** après la première indexation pour afficher des sitelinks. C'est inévitable.

## Hors plan (à ne pas faire)

- Pas d'`aggregateRating` ni d'avis inventés (interdit par Google, risque de pénalité).
- Pas de "RGE" (mémoire projet : interdit).
- Pas de modification des couleurs/design.

## Détail technique

Fichiers modifiés :
- `index.html` : ajout de 2 blocs `<script type="application/ld+json">` (Organization + WebSite/SearchAction) + raccourcissement du `<title>`.
- `src/components/Footer.tsx` : ajout/vérification d'un bloc "Pages principales" avec les ancres exactes des 6 pages cibles.
- Pas de changement DB, pas d'edge function.

Une fois mergé, tu fais : GSC → Inspection d'URL → "Demander une indexation" sur la home + les 4 services.