

## Améliorations du générateur d'articles de blog

### Ce qui change

#### 1. Recherche web avant rédaction
L'edge function `generate-blog-post` va d'abord effectuer une recherche Google sur le sujet choisi (via l'outil `web_search` de Lovable AI ou via une recherche web directe) pour récupérer les dernières actualités et informations pertinentes. Ces résultats seront injectés dans le prompt de l'IA pour que l'article soit basé sur des faits récents et l'actualité du secteur.

**Méthode** : Utiliser `google/gemini-2.5-flash` avec un outil de recherche web (grounding) via l'API Lovable AI, ou faire un appel intermédiaire pour récupérer des sources avant de rédiger. Concrètement, on ajoutera une étape de recherche web dans la fonction :
- Rechercher `"rénovation énergétique {sujet} 2026 actualité"` 
- Extraire les résumés des 5 premiers résultats
- Les passer dans le prompt utilisateur comme contexte d'actualité

#### 2. CTA avec lien devis en fin d'article
Modifier le prompt système pour que chaque article généré se termine par un bloc HTML d'appel à l'action contenant :
- Un lien vers le formulaire de devis Google Forms
- Un lien téléphone (01 86 04 68 89)

En plus, le CTA déjà présent dans `BlogPost.tsx` (ligne 148-156) sera mis à jour pour pointer vers le formulaire de devis au lieu de `/contact`.

### Fichiers modifiés
- `supabase/functions/generate-blog-post/index.ts` : ajout recherche web + CTA dans le prompt
- `src/pages/BlogPost.tsx` : bouton CTA vers le formulaire de devis

### Détail technique
- Recherche web via `fetch("https://www.googleapis.com/customsearch/v1?...")` ou en utilisant le modèle Gemini avec grounding activé
- Le prompt inclura : "Termine l'article par un encadré CTA avec un lien vers https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform et le numéro 01 86 04 68 89"

