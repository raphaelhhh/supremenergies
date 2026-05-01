## Audit SEO de supremenergies.com

### État actuel — points forts
- HTTPS actif, robots.txt OK, sitemap dynamique fonctionnel (24+ URLs)
- Balises Helmet (title, description, canonical, OG) sur toutes les pages
- JSON-LD `LocalBusiness`, `Service`, `FAQPage` déjà en place
- Meta Pixel + GTM installés, Google Search Console vérifié
- Pages locales (/zones/*) + blog auto IA en place
- Structure d'URL propre et lisible

### État actuel — points bloquants
1. **CRITIQUE — Indexation Google quasi nulle** : `site:supremenergies.com` ne remonte qu'**1 page** (l'accueil) au lieu de 24+. Cause : le HTML servi fait 2.9 Ko, **aucun contenu pré-rendu**. C'est une SPA React, donc Googlebot voit une page vide et n'indexe pas le contenu (titles, H1, texte) tant qu'il n'a pas exécuté le JS — ce qu'il fait avec un budget crawl très limité pour un site jeune.
2. **OG image cassée** : pointe vers une URL Unsplash générique → mauvais affichage social, signal de qualité faible.
3. **Sitemap servi depuis Supabase** au lieu de `supremenergies.com/sitemap.xml` → moins fiable pour GSC.
4. **Pas de page dédiée par couple [service × ville]** (ex: pompe à chaleur Paris, isolation Versailles) → on rate la longue traîne locale, là où sont les leads.
5. **`aggregateRating` factice (4.8/127 avis)** dans le JSON-LD accueil alors que la fiche Google n'a pas ce volume → risque de pénalité Google pour faux avis structurés.
6. **Maillage interne faible** entre pages services et zones locales.
7. **Pas de tracking conversions** (form Google submit) côté GA4/Pixel pour mesurer le ROI SEO.

---

## Plan d'action en 3 phases

### Phase 1 — Indexation (priorité absolue, impact immédiat)

1. **Pré-rendu HTML statique** via `vite-plugin-prerender` ou export pré-build de toutes les routes connues (accueil, services, zones, about, contact, simulateur, témoignages, articles blog). Objectif : Googlebot voit le HTML complet sans exécuter JS.
2. **Sitemap sur le domaine** : ajouter `public/sitemap.xml` (build-time) ou rewrite `/sitemap.xml` → fonction edge, et le déclarer dans robots.txt avec l'URL `https://supremenergies.com/sitemap.xml`.
3. **Corriger l'OG image** : créer `/public/og-image.jpg` (1200×630) aux couleurs SupremEnergies + label énergie, référencer partout.
4. **Resoumission GSC** : sitemap + demande d'indexation des 10 URLs prioritaires.
5. **Retirer `aggregateRating`/`review` factices** du JSON-LD accueil tant que les avis Google ne sont pas réels et synchronisés (le composant Témoignages tire déjà les vrais avis Places API → on s'aligne dessus).

### Phase 2 — Ciblage longue traîne locale (impact 4-12 semaines)

6. **Pages [service × ville]** générées dynamiquement : 4 services × 6 villes = 24 nouvelles pages avec contenu unique (texte localisé, prix moyens, aides régionales, témoignages locaux). Routes type `/pompe-a-chaleur-paris`, `/isolation-versailles`, etc.
7. **Enrichir contenus services** : passer chaque page service de ~600 à ~1500 mots (sections techniques, comparatifs, cas client, schémas, vidéo). Google favorise la profondeur.
8. **Maillage interne** : ajouter un bloc « Nos services dans votre ville » sur chaque page zone, et « Zones d'intervention » sur chaque page service.
9. **Articles de blog ciblés intentions d'achat** : ajuster la génération IA pour cibler des requêtes type « prix pompe à chaleur 100m2 », « aide isolation 2026 locataire », « MaPrimeRénov plafond revenus 2026 ».

### Phase 3 — Autorité & conversions (impact 3-6 mois)

10. **Suivi conversions** : événement GA4 + Pixel `Lead` au submit du Google Form (via redirect tracking ou Zapier webhook → Measurement Protocol).
11. **Core Web Vitals** : audit Lighthouse, lazy-load images services/zones, formats AVIF/WebP, preload font Montserrat.
12. **Backlinks locaux** : annuaires (PagesJaunes, Houzz, Habitatpresto, AnnuaireRGE alternatives), partenariats syndics IDF, presse locale.
13. **Optimisation fiche Google Business** : appel à avis automatique post-chantier (email Zapier), publication hebdo, photos chantiers réels.
14. **Schema enrichi** : ajouter `BreadcrumbList` sur toutes les pages, `Product` avec prix indicatifs sur services, `Article` sur blog (déjà présent à vérifier).

---

## Détails techniques

**Pré-rendu** : utiliser `vite-plugin-ssr` ou `react-snap` au build. Liste de routes générée au build-time depuis le sitemap. Sortie : un `index.html` par route avec le HTML rendu.

**Pages [service × ville]** : nouveau composant `ServiceVille.tsx` + route `/:service-:ville` avec mapping et contenu paramétré (prix locaux, aides spécifiques département, distance siège). Ajout au sitemap.

**Sitemap.xml domaine** : fichier statique généré au build via script Node lisant la même config que la fonction edge, ou rewrite Cloudflare/Lovable. Déclaration robots.txt mise à jour.

**Tracking** : ajouter un endpoint edge `/api/track-lead` appelé depuis Zapier webhook qui forwarde à GA4 Measurement Protocol + Pixel Conversions API.

**aggregateRating** : retirer du JSON-LD jusqu'à ce que `google-reviews` edge function retourne ≥ 5 avis, puis générer le rating dynamiquement côté pré-rendu.

---

## Priorisation suggérée

Si tu veux y aller en une étape : **Phase 1 d'abord** (sans elle, le reste ne sert à rien — Google n'indexe pas). Puis je peux enchaîner sur Phase 2 dans un message suivant.

Dis-moi si tu veux qu'on attaque la **Phase 1 complète** maintenant, ou seulement un sous-ensemble (ex: pré-rendu + OG image + retrait aggregateRating, qui sont les 3 actions à plus fort impact immédiat).