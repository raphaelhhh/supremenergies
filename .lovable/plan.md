
# Plan : devenir n°1 SEO local et générer du lead entrant

## Constat actuel (audit rapide)

- **Semrush (FR)** : 1 mot-clé positionné, ~34 visites/mo estimées. Site jeune, autorité quasi nulle → la priorité est la **longue traîne locale** (forte intention, faible difficulté).
- **Analytics** : 18 visiteurs / 36 vues sur 7 jours, bounce 76%, sessions surtout sur `/` → les pages locales et blog ne convertissent pas encore le trafic.
- **SEO findings restants (Lighthouse)** : LCP lent + contraste insuffisant — bloquent le score de la version publiée.
- **Atouts déjà en place** : 121 URLs au sitemap, hub Hauts-de-France, exit-intent, JSON-LD, simulateur d'aides, blog auto IA.

## Objectif

Passer de ~30 à **500+ visites organiques/mois sous 90 jours** et transformer ce trafic en **≥110 leads/mois** via 3 leviers : performance technique, contenu géo-ciblé, conversion.

---

## Phase A — Corriger les blocages techniques (impact immédiat)

1. **LCP Hero** : ajouter `width/height`, `fetchpriority="high"`, retirer `loading="lazy"` sur l'image principale (`energy-label.png`). Préload dans `index.html`. Conversion AVIF/WebP via `vite-imagetools`.
2. **Contraste accessibilité** : audit des classes `text-muted-foreground/50`, `text-gray-*` arbitraires → remplacer par tokens `text-foreground` / `text-muted-foreground`.
3. **Republier** pour que Lighthouse rescanne.

## Phase B — Scaler la longue traîne locale (le vrai moteur SEO)

Stratégie : **service × ville**, modèle qui a fait 70 % du trafic de `copecologie.com` et `econegoce.com`.

1. **Étendre la couverture géo** : ajouter ~30 villes prioritaires Nord + IDF (Amiens, Beauvais, Compiègne, Saint-Quentin, Cambrai, Maubeuge, Versailles, Cergy, Évry, Meaux…). Cible : **150–200 pages service-ville** indexables.
2. **Contenu unique par page** : intro géo-spécifique (climat, type d'habitat dominant, aides locales/CEE régionales), bloc FAQ ville, témoignage local, lien vers la mairie/PCAET. Évite le contenu dupliqué qui plafonne le ranking actuel.
3. **Maillage interne renforcé** : depuis chaque page ville → 3 services + 3 villes voisines + 2 articles blog pertinents (cocoon sémantique).
4. **Pages piliers SEO** (haute intention) : `/aides-renovation-2026`, `/prix-pompe-a-chaleur`, `/isolation-1-euro-conditions-2026` — formats long-form 1500+ mots avec schéma `FAQPage` + `HowTo`.

## Phase C — Booster blog auto (passer de quantité à autorité)

1. **Cluster topiques** : regrouper les articles existants par silo (PAC, Solaire, Isolation, Aides) avec page de catégorie SEO + breadcrumb.
2. **Refresh & enrich** : injecter tableaux comparatifs, schémas `HowTo`, calculateurs intégrés, vidéos YouTube embed.
3. **Internal linking blog → pages commerciales** : chaque article doit pointer vers 1 page service + 1 page ville + le simulateur.

## Phase D — Conversion : transformer le trafic en leads

1. **Lead magnets** (PDF gated) déjà au plan Phase 2 : « Guide MaPrimeRénov' 2026 », « Checklist 10 erreurs PAC », « Simulateur Excel CEE ». Échange contre email → séquence email auto (Zapier → Mailchimp/Brevo).
2. **CTA contextuels** : injection dynamique d'un bandeau « Estimer mes aides en 60s » au scroll-50% sur tous les articles.
3. **Sticky mobile CTA** existant : A/B test wording « Devis gratuit » vs « Mes aides 2026 ».
4. **Preuve sociale temps réel** : composant « 12 demandes reçues aujourd'hui en Hauts-de-France » (compteur Supabase live).
5. **Formulaire multi-étapes** sur `/devis-gratuit` (3 étapes simples > 1 long) — augmente le taux de complétion de 30-50%.

## Phase E — Off-page & E-E-A-T

1. **Citations locales** : inscription Pages Jaunes, Google Business Profile (1 par grande ville si possible), Mappy, Yelp FR, Solocal.
2. **Backlinks ciblés** : annuaires rénovation (ADEME partenaires, Effy comparateur, Quelle Énergie), guest posts sur blogs habitat.
3. **Page « À propos » enrichie** : équipe avec photos + certifications/qualifications (rappel : interdiction du terme RGE), avis Google embed.
4. **Schema Organization étendu** : `LocalBusiness` avec `areaServed` listant chaque ville couverte.

## Phase F — Monitoring

1. Google Search Console : suivi hebdo des impressions/clics par page ville.
2. Dashboard Supabase interne : leads/jour, source, page d'entrée, taux de conversion.
3. Re-scan SEO mensuel + ajustement.

---

## Détails techniques

- **Fichiers principaux à toucher** : `src/data/zones.ts` (ajout villes), `src/pages/ServiceCity.tsx` (contenu unique), `index.html` (preload LCP), nouvelles pages piliers dans `src/pages/`, `scripts/generate-sitemap.mjs`, nouveau composant `LeadMagnetForm.tsx`, edge function `send-lead-magnet`.
- **Stack** : reste sur React + Supabase + Lovable AI Gateway pour génération de contenu par ville (Gemini 2.5 Flash).
- **Pas de RGE** dans tout nouveau contenu (mémoire projet).
- **Tracking** : events GTM/Meta Pixel sur chaque soumission lead magnet + simulateur.

---

## Livrables et ordre d'exécution proposé

1. **Sprint 1 (cette session)** : Phase A + B.1/B.2 (ajout villes + template enrichi) + Phase D.1 (1er lead magnet).
2. **Sprint 2** : Phase B.4 (3 pages piliers) + Phase C (refresh blog) + Phase D.2-4.
3. **Sprint 3** : Phase E + F (off-page + monitoring).

Dis-moi si tu valides cet ordre ou si tu veux prioriser un levier (ex. lead magnets d'abord, ou pages piliers d'abord).
