# Stratégie Lead Entrant — SupremEnergies (Nord de la France)

**Objectif :** 110 leads qualifiés / mois, 0€ budget Ads → tout en organique.
**Leviers :** SEO local hyper-ciblé Nord + Lead magnets + Conversion site.

---

## 1. SEO local Nord (le plus gros levier de volume)

### 1.1 Pages services × villes Nord
Créer une matrice de pages locales optimisées sur les 15 villes les plus peuplées du Nord/Pas-de-Calais/Somme :
Lille, Roubaix, Tourcoing, Dunkerque, Villeneuve-d'Ascq, Calais, Arras, Valenciennes, Douai, Lens, Boulogne-sur-Mer, Amiens, Béthune, Cambrai, Maubeuge.

4 services × 15 villes = **60 nouvelles pages** :
- `/pompe-a-chaleur/[ville]`
- `/panneaux-solaires/[ville]`
- `/isolation-thermique/[ville]`
- `/renovation-globale/[ville]`

Chaque page : H1 ciblé, contenu local (climat, aides régionales Hauts-de-France, témoignages locaux si dispo), JSON-LD `LocalBusiness` + `Service`, CTA devis, FAQ locale.

### 1.2 Hub Hauts-de-France
- Nouvelle page `/region/hauts-de-france` (pivot SEO)
- Liens internes vers les 60 pages villes
- Mise à jour `src/data/zones.ts` + sitemap

### 1.3 Booster le blog automatique existant
- Augmenter cadence (1/2 jours au lieu de 3) sur des sujets Nord/aides 2026
- 20 articles "money keywords" priorisés (ex : *"prix pompe à chaleur Lille"*, *"aide rénovation Hauts-de-France 2026"*)

### 1.4 Google Business Profile (action utilisateur)
GBP optimisé Lille + posts hebdo + collecte d'avis = canal local n°1 gratuit.

---

## 2. Lead Magnets (conversion visiteurs → leads)

### 2.1 Simulateur d'aides amélioré
La page `/simulateur-aides` existe. L'enrichir :
- Capture email **obligatoire** pour recevoir le résultat détaillé en PDF
- Génération PDF personnalisée via Edge Function (Lovable AI)
- Envoi auto par email (Resend ou Brevo connector)
- Lead poussé dans Zapier comme les autres

### 2.2 Guide PDF téléchargeable
- "Guide 2026 : 11 000€ d'aides rénovation énergétique dans le Nord"
- Landing dédiée `/guide-aides-renovation-nord`
- Formulaire email + tel → PDF par email + lead Zapier

### 2.3 Quiz éligibilité 2 min
- Composant `/eligibilite` : 5 questions (type logement, revenus, ville, projet, propriétaire)
- Affichage du montant d'aides estimé + capture lead

---

## 3. Conversion (augmenter le taux du trafic existant)

- **Exit-intent popup** sur les pages services (offre simulateur)
- **Sticky banner desktop** "Estimez vos aides en 2 min" (déjà mobile via `StickyMobileCTA`)
- **Preuve sociale dynamique** : afficher avis Google récents (edge function `google-reviews` déjà en place) sur Home + pages villes
- **A/B sur le Hero** : tester promesse "Devis 48h" vs "Jusqu'à 11 000€ d'aides"

---

## 4. Tracking & itération

- Évènements GTM/Meta Pixel sur : ouverture simulateur, complétion, download guide, soumission formulaire
- Dashboard Supabase simple : leads/jour, source (page d'entrée), taux conversion
- Revue mensuelle des top pages (Semrush + GSC)

---

## Phasage suggéré

| Phase | Durée | Livrables | Impact attendu |
|---|---|---|---|
| **1** | Cette session | Simulateur avec capture email + PDF + Zapier, popup exit-intent, hub Hauts-de-France | +15 leads/mois |
| **2** | Session suivante | 60 pages services × villes Nord générées dynamiquement | +60 leads/mois (3-6 mois SEO) |
| **3** | Session suivante | Guide PDF + landing + quiz éligibilité | +25 leads/mois |
| **4** | Continu | Accélération blog + GBP + avis | +10 leads/mois |

**Total visé : ~110 leads/mois à 6 mois.**

---

## Détails techniques

- **Pages villes** : route dynamique `/[service]/[ville]` (pattern existant `ServiceCity.tsx` à étendre), data depuis `src/data/zones.ts` enrichi
- **PDF simulateur** : edge function `generate-aides-pdf` (Lovable AI Gateway pour la rédaction, `pdf-lib` pour le rendu)
- **Email** : connector Brevo (déjà documenté) ou Resend selon préférence
- **Sitemap** : régénération via `scripts/generate-sitemap.mjs` après création des pages
- **SEO** : `react-helmet-async` + JSON-LD `LocalBusiness` avec `areaServed` = ville

---

## Ce que je propose de faire en premier

**Phase 1 uniquement** dans la prochaine session de build :
1. Simulateur d'aides → capture email + génération PDF + envoi auto + lead Zapier
2. Popup exit-intent sur pages services
3. Hub `/region/hauts-de-france` + maillage interne

Phases 2-4 livrées dans des sessions suivantes pour rester focus.

Confirme-tu qu'on démarre par la **Phase 1** ? Ou tu préfères qu'on commence par les **60 pages villes Nord** (Phase 2, plus gros impact volume mais SEO long terme) ?
