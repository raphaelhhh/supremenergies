

## Plan SEO complet pour SupremEnergies

### Problèmes identifiés

1. **Pas de balises Helmet** sur les pages Accueil, À propos, Contact (seules Services et Blog en ont)
2. **Pas de données structurées (JSON-LD)** sur Accueil, À propos, Contact
3. **Pas de balises canonical** sur la plupart des pages
4. **Sitemap incomplet** — les articles de blog individuels (`/blog/1`, `/blog/2`...) ne sont pas listés
5. **URLs sitemap incorrectes** — `/terms` au lieu de `/terms-of-service`, etc.
6. **Pas de page dédiée par service** — tout est sur une seule page `/services` avec des ancres, ce qui dilue le SEO
7. **GTM supprimé** du `index.html` (remplacé par Meta Pixel uniquement)
8. **Titre `index.html` générique** — juste "SupremEnergies" sans mots-clés

### Actions prévues

#### 1. Balises SEO sur toutes les pages (Helmet)
Ajouter `<Helmet>` avec `title`, `meta description`, `canonical`, `og:*` et données structurées JSON-LD sur :
- **Accueil** : "Rénovation Énergétique | SupremEnergies — Isolation, Pompes à Chaleur, Solaire"
- **À propos** : "À Propos de SupremEnergies | Expert Rénovation Énergétique"
- **Contact** : "Contactez SupremEnergies | Devis Gratuit Rénovation Énergétique"

#### 2. Données structurées JSON-LD enrichies
- **Accueil** : `Organization` + `LocalBusiness` avec adresse, téléphone, zone de service
- **Services** : enrichir le `Service` existant avec chaque sous-service
- **Blog** : `BlogPosting` sur chaque article avec `author`, `datePublished`, `image`
- **Contact** : `ContactPage` avec coordonnées

#### 3. Pages dédiées par service (SEO long-tail)
Créer des pages individuelles pour les requêtes à fort volume :
- `/services/isolation-thermique`
- `/services/pompe-a-chaleur`
- `/services/panneaux-solaires`
- `/services/renovation-globale`

Chacune avec contenu unique, H1 optimisé, FAQ structurée (`FAQPage` schema), et CTA vers le formulaire contact.

#### 4. Sitemap corrigé et enrichi
- Ajouter les URLs des articles de blog (`/blog/1` à `/blog/8`)
- Ajouter les nouvelles pages services individuelles
- Corriger les URLs légales (`/terms` → supprimer ou rediriger)

#### 5. Améliorer le `index.html` par défaut
- Title : "SupremEnergies | Rénovation Énergétique, Isolation & Pompes à Chaleur"
- Meta description plus ciblée avec mots-clés locaux
- Remettre le GTM si souhaité

#### 6. FAQ structurée sur les pages clés
Ajouter une section FAQ sur Accueil et Services avec schema `FAQPage` — ces questions apparaissent directement dans les résultats Google :
- "Quelles aides pour la rénovation énergétique en 2026 ?"
- "Combien coûte l'isolation des combles ?"
- "Quelle pompe à chaleur choisir ?"

### Impact attendu
- Meilleure indexation de chaque service individuellement
- Rich snippets (FAQ, avis, services) dans les résultats Google
- Mots-clés long-tail captés via les pages services dédiées
- Meilleure couverture du sitemap

### Détails techniques
- Fichiers modifiés : `index.html`, `src/App.tsx`, toutes les pages dans `src/pages/`, `public/sitemap.xml`
- Fichiers créés : 4 nouvelles pages services dans `src/pages/services/`
- Dépendances : aucune nouvelle (react-helmet-async déjà installé)

