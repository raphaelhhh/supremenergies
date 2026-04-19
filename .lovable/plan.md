

## Plan SEO avancé : booster la visibilité Google et générer plus de demandes

### Constat
Le socle technique SEO est en place (sitemap dynamique, JSON-LD, maillage interne, blog auto). Pour passer au niveau supérieur et capter de la demande entrante qualifiée, il faut maintenant attaquer **3 leviers à fort ROI** : pages géolocalisées, outils interactifs (lead magnets), et signaux de confiance E-E-A-T.

### Axe 1 — Pages de localisation (capter "[service] + [ville]")

Les requêtes locales convertissent 5x mieux. Créer des landing pages dédiées par ville cible en Île-de-France :
- `/zones/paris`, `/zones/versailles`, `/zones/boulogne-billancourt`, `/zones/saint-denis`, `/zones/nanterre`, `/zones/montreuil`
- Chaque page contient : intro géolocalisée, services dispo dans cette ville, aides locales (Île-de-France Énergies, éco-PTZ régional), témoignage local, FAQ ville-spécifique, JSON-LD `LocalBusiness` avec `areaServed`
- Combinaisons service × ville (optionnel phase 2) : `/services/pompe-a-chaleur/paris` (forte intention d'achat)

### Axe 2 — Lead magnets interactifs (aimants à backlinks + conversions)

#### a) Simulateur MaPrimeRénov' 2026
- Page `/simulateur-aides` : formulaire en 4 étapes (revenus, type travaux, foyer, zone) → estimation d'aides en temps réel
- Génère beaucoup de partages, backlinks naturels, et leads ultra-qualifiés (capture email avant résultat détaillé)
- Données stockées dans une nouvelle table `simulations` Supabase + envoi Zapier

#### b) Calculateur d'économies d'énergie
- Page `/economies-energie` : entrée surface + type chauffage actuel → estimation économies annuelles avec PAC ou isolation
- Excellent pour le partage et les requêtes "combien j'économise avec une pompe à chaleur"

### Axe 3 — Signaux E-E-A-T et autorité

#### a) Page "À propos" enrichie
- Photos équipe, années d'expérience, certifications/qualifications (sans mentionner RGE), partenaires fabricants
- JSON-LD `Organization` complet avec `founder`, `foundingDate`, `numberOfEmployees`

#### b) Page témoignages clients
- `/temoignages` : 10-15 témoignages détaillés avec photos chantiers, ville, type travaux, économies réalisées
- JSON-LD `Review` + `AggregateRating` → étoiles dans les SERP
- Table Supabase `testimonials` pour gestion dynamique

#### c) Page "Réalisations / Études de cas"
- `/realisations` : 6-8 cas clients détaillés (avant/après, devis, économies, durée chantier)
- Schema `CreativeWork` ou `Article` pour chaque cas

### Axe 4 — Contenu pilier longue traîne

Créer 3-4 articles **piliers** (3000+ mots) qui ciblent des requêtes très concurrentielles :
- "Guide complet MaPrimeRénov' 2026 : montants, conditions, démarches"
- "Pompe à chaleur air-eau ou air-air : comparatif complet"
- "Coût rénovation énergétique maison : tous les prix 2026"
- "Isolation extérieure ITE : prix, aides et étapes"

Ces piliers reçoivent les liens internes des articles courts du blog auto → boost d'autorité topique.

### Axe 5 — Optimisations techniques additionnelles

- **Image optimization** : convertir les images blog en WebP, ajouter `loading="lazy"` et dimensions explicites
- **Core Web Vitals** : précharger la police hero, optimiser le LCP de la home
- **Breadcrumbs visibles** sur toutes les pages services (déjà sur blog)
- **404 personnalisée SEO-friendly** avec liens vers pages populaires
- **Hreflang `fr-FR`** explicite sur toutes les pages
- **Schema HowTo** sur les articles tutoriels (étapes pour rénover, demander une aide…)

### Architecture technique

```text
Nouvelles routes
├── /zones/:ville              → ZoneLocale.tsx (template + data ville)
├── /simulateur-aides          → SimulateurAides.tsx
├── /economies-energie         → CalculateurEconomies.tsx
├── /temoignages               → Temoignages.tsx
├── /realisations              → Realisations.tsx

Nouvelles tables Supabase
├── simulations (id, email, inputs jsonb, result jsonb, created_at)
├── testimonials (id, name, city, service, content, rating, photo_url, published)
└── case_studies (id, slug, title, city, before/after, savings, content)

Nouveaux composants
├── LocalSEOPage.tsx           (template ville)
├── SimulatorWizard.tsx        (multi-step form)
├── TestimonialsList.tsx       + JSON-LD AggregateRating
└── CaseStudyCard.tsx
```

### Priorisation suggérée (fait en 2 phases)

**Phase 1 (impact max, à faire maintenant)**
1. 6 pages de localisation Île-de-France
2. Simulateur MaPrimeRénov'
3. Page témoignages avec AggregateRating
4. 2 articles piliers longue traîne

**Phase 2 (à faire après mesure)**
- Calculateur économies, page réalisations, combinaisons service × ville, optimisations Core Web Vitals

### Résultat attendu
- **+30 à +50 pages indexées** d'ici 8 semaines
- Apparition sur des requêtes locales à forte intention d'achat
- **2-3x plus de demandes entrantes** via le simulateur (lead magnet) et les pages locales
- Étoiles dans les SERP (témoignages) → CTR amélioré
- Backlinks naturels grâce au simulateur partageable

