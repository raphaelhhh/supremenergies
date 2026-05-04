# SEO niveau "référence" : indexation rapide + capture maximale de leads

Le site a déjà : Helmet, JSON-LD, sitemap index, prerender, Cloud Supabase pour le blog auto. Voici ce qui manque pour devenir une **machine à leads** sur Google.

## A. Indexation rapide & contenus prioritaires

### A1. Démultiplier les pages locales (pages "ville × service")
Aujourd'hui : 6 zones (`/zones/paris`, etc.) + 4 services. Google adore les pages "service + ville" très ciblées (longue traîne, faible concurrence, intention forte).

- Créer une route `/services/:service/:ville` (ex : `/services/pompe-a-chaleur/paris`, `/services/isolation-thermique/versailles`) → **24 pages locales** générées dynamiquement à partir de zones × services.
- Étendre la liste des zones de 6 à ~20 (Boulogne, Nanterre, Saint-Denis OK + Argenteuil, Créteil, Vitry, Aulnay, Sarcelles, Levallois, Issy, Vincennes, Neuilly, Asnières, Colombes, Courbevoie, Rueil…).
- Total potentiel : ~80 pages géolocalisées indexables (vs ~10 aujourd'hui).
- Chaque page : H1 unique (`Pompe à chaleur à Paris`), paragraphe local, FAQ locale, JSON-LD `Service + LocalBusiness + FAQPage`, témoignage local, CTA Google Form.

### A2. IndexNow + ping Google/Bing automatique
- Ajouter une clé IndexNow dans `/public/<key>.txt`.
- Edge Function `notify-search-engines` appelée à chaque publication d'article blog ou modification du sitemap → ping IndexNow (Bing/Yandex) + ping Google `/ping?sitemap=`.
- Résultat : nouveaux articles indexés en heures, pas en semaines.

### A3. Sitemap enrichi
- Ajouter `<image:image>` dans le sitemap blog (Google Image SEO).
- Ajouter `<news:news>` pour les articles publiés < 48h (Google News).
- Sitemap géographique séparé `sitemap-zones.xml`.
- Régénération du sitemap déclenchée à chaque insert blog (trigger Supabase + Edge Function existante).

### A4. RSS / Atom feed
- `/rss.xml` généré côté Edge Function depuis `blog_posts`. Rétro-pingue Feedly/blog directories, signal de fraîcheur pour Google.

## B. Contenu & autorité (E-E-A-T)

### B1. Pages "piliers" (cluster topical)
Créer 3 super-guides longs (3000+ mots) qui maillent vers tous les autres :
- `/guide/maprimerenov-2026` — guide complet avec barème, calculatrice, cas concrets
- `/guide/pompe-a-chaleur-prix-2026` — comparatif PAC, prix, ROI
- `/guide/isolation-thermique-guide-complet`

Ces piliers reçoivent les liens internes des articles du blog (déjà auto-générés) → **autorité topique forte**.

### B2. Pages "comparatif/calculatrice"
- `/calculatrices/economie-pompe-a-chaleur` (calcul économies en €/an)
- `/calculatrices/aides-cee` 
- Ces pages captent des recherches transactionnelles très qualifiées.

### B3. Pages "Avis & cas clients" structurées
- `/realisations` avec photos avant/après, ville, type de travaux, montant des aides obtenues.
- JSON-LD `Project` + `Review` par cas client.

### B4. Auteur / E-E-A-T
- Page `/equipe` avec auteurs photographiés (nom, qualifications, années d'expérience).
- Schéma `Person` + lien `author` dans les `BlogPosting` (au lieu d'`Organization`).

## C. Maillage interne agressif

- **Mega-menu Navbar** avec liens vers tous les services × zones principales.
- Composant `<RelatedZones>` dans chaque page service.
- Composant `<RelatedServices>` (existe) à mettre sur **toutes** les pages zones.
- Footer : section "Nos zones d'intervention" listant toutes les villes (boost crawl).
- Liens contextuels dans le contenu (auto-générés par mots-clés).

## D. Conversion → leads (l'autre moitié de "référence")

### D1. CTAs sticky & contextuels
- Bouton "Devis gratuit" sticky en bas sur mobile (visible en permanence).
- Module "Calculateur d'aides en 30 sec" en haut de chaque page service.
- Pop-up de sortie (exit-intent) sur les pages services avec offre spéciale.
- Click-to-call WhatsApp / Tel sticky mobile.

### D2. Formulaire court inline (vs Google Form externe)
- Mini-formulaire 3 champs (téléphone, type de travaux, ville) directement intégré, qui POST vers Zapier (déjà utilisé pour la newsletter).
- Friction divisée par 3 vs Google Form externe → +50-100% de conversion typique.
- Garde le Google Form en option "devis détaillé".

### D3. Preuve sociale dynamique
- Bandeau "23 personnes ont demandé un devis cette semaine" (vrai compteur Supabase).
- Étoiles Google Reviews en haut de chaque page (déjà côté Edge Function `google-reviews`).
- Logos partenaires/marques installées (Daikin, Atlantic, etc.).

### D4. Tracking enrichi
- Événements GTM sur chaque CTA (déjà en place pour Meta Pixel) — étendre à : scroll 50%, scroll 75%, click téléphone, click WhatsApp, formulaire commencé, formulaire envoyé.
- Permet retargeting fin et optimisation des landing pages.

## E. Performance & technique

### E1. Core Web Vitals
- Convertir hero image en **AVIF/WebP** + `<picture>` responsive.
- `srcset` sur toutes les images de cartes services.
- Lazy-load systématique hors fold, dimensions explicites partout.
- Audit images Unsplash : héberger localement les 10 images critiques (latence -200ms).

### E2. Préchargement intelligent
- `<link rel="prefetch">` vers les pages services depuis l'accueil.
- Code-splitting déjà OK via Vite.

### E3. Schema markup avancé
- `Breadcrumb` JSON-LD (déjà via composant) → vérifier qu'il est sur **toutes** les pages.
- `HowTo` schema sur les guides ("comment installer une PAC").
- `VideoObject` si on ajoute des vidéos témoignages (à prévoir).
- `Product`/`Offer` schema sur les pages services avec fourchette de prix → prix dans les SERP.

### E4. Hébergement images
- Les images sur `raw.githubusercontent.com` sont lentes et non optimisées → migrer vers `/public/images/` ou Supabase Storage avec transformation à la volée.

## F. Recommandations off-site (à exécuter par l'utilisateur, hors code)

- Fiche Google Business Profile à 100% (photos, posts hebdo, Q&R).
- Référencement annuaires : Pages Jaunes, Yelp, Bing Places, Apple Maps.
- Backlinks via partenariats fournisseurs (Atlantic, Daikin, etc.).
- Réponse à 100% des avis Google (signal positif fort).

---

## Plan d'exécution (ce que je vais coder maintenant)

Priorité aux gains rapides à fort impact. Je propose d'exécuter dans cet ordre :

1. **Pages locales service × ville** : route dynamique `/services/:service/:ville` + ajout de 14 nouvelles zones + génération automatique au sitemap → +~80 pages indexables.
2. **IndexNow + ping moteurs** : edge function + clé publique + déclenchement à chaque article publié.
3. **Sitemap images** dans `sitemap-blog.xml` (regénération via edge function existante) + sitemap-zones séparé.
4. **Mini-formulaire de capture** réutilisable (3 champs → Zapier) + intégration en haut des pages services et zones, + bouton sticky mobile.
5. **Mega-menu Navbar** + footer enrichi (toutes les zones).
6. **Schema avancé** : `Service`+`Offer` avec fourchette de prix, `BreadcrumbList` partout, `Person` auteur sur articles blog (page `/equipe`).
7. **Page "/realisations"** structurée + 1ère page pilier `/guide/maprimerenov-2026`.
8. **Performance images** : conversion AVIF locales pour le top 5 d'images les plus vues, lazy partout.

Aucune mention RGE, aucune mention "Lovable" côté UI, pas de stat bar, design existant préservé. Les "Demander un devis" externes restent (Google Form), mais on **ajoute** un mini-formulaire inline pour multiplier les conversions.

Souhaite-tu qu'on lance les 8 étapes en séquence, ou as-tu des priorités différentes (ex : seulement 1+2+4 pour démarrer rapide) ?
