// Catégories du blog SupremEnergies.
// Toute modification ici doit être répercutée dans la migration SQL et l'edge function generate-blog-post.

export type CategorySlug =
  | "pompe-a-chaleur"
  | "isolation"
  | "panneaux-solaires"
  | "aides-financieres"
  | "renovation-globale"
  | "conseils-pratiques";

export interface BlogCategory {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string; // utilisée en meta description + intro
  metaTitle: string;
  image: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "pompe-a-chaleur",
    name: "Pompe à chaleur",
    shortName: "PAC",
    metaTitle: "Pompe à chaleur — Guides, prix & aides 2026",
    description:
      "Tout sur la pompe à chaleur en 2026 : PAC air/eau, air/air, géothermique, prix d'installation, COP, aides MaPrimeRénov' et CEE, entretien et performance énergétique réelle.",
    image: "/images/blog/pompe-a-chaleur.jpg",
  },
  {
    slug: "isolation",
    name: "Isolation thermique",
    shortName: "Isolation",
    metaTitle: "Isolation thermique — Combles, murs, fenêtres 2026",
    description:
      "Guides complets sur l'isolation thermique 2026 : isolation des combles, ITE et ITI, fenêtres double/triple vitrage, VMC double flux, matériaux et aides disponibles.",
    image: "/images/blog/isolation-thermique.jpg",
  },
  {
    slug: "panneaux-solaires",
    name: "Panneaux solaires",
    shortName: "Solaire",
    metaTitle: "Panneaux solaires — Autoconsommation & rentabilité",
    description:
      "Installation de panneaux solaires photovoltaïques en 2026 : autoconsommation, revente du surplus, rendement, prix et rentabilité, démarches Consuel et obligations légales.",
    image: "/images/blog/panneaux-solaires.jpg",
  },
  {
    slug: "aides-financieres",
    name: "Aides financières",
    shortName: "Aides",
    metaTitle: "Aides rénovation 2026 — MaPrimeRénov', CEE, éco-PTZ",
    description:
      "Toutes les aides à la rénovation énergétique en 2026 : MaPrimeRénov', certificats d'économies d'énergie (CEE), éco-PTZ, TVA 5,5%, plafonds, conditions et démarches.",
    image: "/images/blog/maprimenov-aides.jpg",
  },
  {
    slug: "renovation-globale",
    name: "Rénovation globale",
    shortName: "Rénovation",
    metaTitle: "Rénovation globale — MaPrimeRénov' Parcours Accompagné",
    description:
      "Rénovation énergétique globale en 2026 : Parcours Accompagné MaPrimeRénov', audit énergétique, bouquet de travaux, gain de classe DPE et sortie de passoire thermique.",
    image: "/images/blog/renovation-globale.jpg",
  },
  {
    slug: "conseils-pratiques",
    name: "Conseils pratiques",
    shortName: "Conseils",
    metaTitle: "Conseils rénovation énergétique — Guides pratiques",
    description:
      "Conseils pratiques pour réussir votre rénovation énergétique : choix d'artisan, étapes du chantier, financement, retours d'expérience et erreurs à éviter.",
    image: "/images/blog/dpe-reglementation.jpg",
  },
];

export const CATEGORY_MAP: Record<CategorySlug, BlogCategory> = BLOG_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.slug] = cat;
    return acc;
  },
  {} as Record<CategorySlug, BlogCategory>,
);

export function getCategory(slug: string | null | undefined): BlogCategory | undefined {
  if (!slug) return undefined;
  return CATEGORY_MAP[slug as CategorySlug];
}
