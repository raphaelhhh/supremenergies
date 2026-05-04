/** Catalogue des services pour pages locales SEO (service × ville). */
export interface ServiceMeta {
  slug: string;
  name: string;          // ex: "Pompe à chaleur"
  shortName: string;     // ex: "PAC"
  intro: string;         // 1-2 phrases avant injection ville
  keywords: string[];    // pour H1/Title local
  benefits: string[];    // 4 puces
  priceRange: string;    // ex: "8000-18000"
  priceLabel: string;    // ex: "À partir de 8 000 € (avant aides)"
  faqQuestion: string;
  faqAnswer: string;
}

export const serviceCatalog: Record<string, ServiceMeta> = {
  "pompe-a-chaleur": {
    slug: "pompe-a-chaleur",
    name: "Pompe à chaleur",
    shortName: "PAC",
    intro:
      "Installation de pompes à chaleur air/eau, air/air et géothermiques. Réduisez votre facture de chauffage de 50 à 75% et améliorez votre confort toute l'année.",
    keywords: ["installation pompe à chaleur", "PAC air/eau", "PAC air/air"],
    benefits: [
      "Économies de 50 à 75% sur le chauffage",
      "Aides MaPrimeRénov' jusqu'à 5 000 €",
      "Installation en 2 à 3 jours",
      "Garantie constructeur 5 ans + main d'œuvre",
    ],
    priceRange: "8000-18000",
    priceLabel: "À partir de 8 000 € (avant aides)",
    faqQuestion: "Quelle pompe à chaleur installer ?",
    faqAnswer:
      "La PAC air/eau remplace une chaudière fioul ou gaz et alimente vos radiateurs. La PAC air/air chauffe et climatise. Notre étude thermique gratuite vous oriente vers la solution optimale.",
  },
  "isolation-thermique": {
    slug: "isolation-thermique",
    name: "Isolation thermique",
    shortName: "Isolation",
    intro:
      "Isolation des combles, murs (ITE/ITI), planchers et fenêtres. Première étape pour réduire vos factures jusqu'à 30% et améliorer votre confort.",
    keywords: ["isolation combles", "isolation extérieure ITE", "isolation murs"],
    benefits: [
      "Jusqu'à 30% d'économies sur le chauffage",
      "Reste à charge réduit à 1 € (selon revenus, isolation des combles)",
      "Confort été comme hiver",
      "Valorisation immobilière (étiquette DPE)",
    ],
    priceRange: "20-180",
    priceLabel: "20 à 180 €/m² selon technique",
    faqQuestion: "Quelle isolation prioriser dans une maison ?",
    faqAnswer:
      "Les combles d'abord (jusqu'à 30% de pertes), puis les murs (20-25%), puis les planchers bas. Notre audit gratuit identifie les priorités selon votre logement.",
  },
  "panneaux-solaires": {
    slug: "panneaux-solaires",
    name: "Panneaux solaires",
    shortName: "Photovoltaïque",
    intro:
      "Installation de panneaux solaires photovoltaïques en autoconsommation ou avec revente. Produisez votre propre électricité et amortissez votre investissement en 8 à 12 ans.",
    keywords: ["panneaux photovoltaïques", "autoconsommation solaire", "installation solaire"],
    benefits: [
      "Économies de 30 à 70% sur la facture électrique",
      "Prime à l'autoconsommation jusqu'à 1 080 €",
      "Revente du surplus à EDF OA",
      "Garantie 25 ans sur les panneaux",
    ],
    priceRange: "7000-15000",
    priceLabel: "7 000 à 15 000 € pour 3 à 9 kWc",
    faqQuestion: "Quelle puissance solaire installer ?",
    faqAnswer:
      "3 kWc pour un foyer de 2 personnes, 6 kWc pour 3-4 personnes, 9 kWc pour une grande maison. L'orientation et l'inclinaison du toit sont déterminantes : nous réalisons l'étude technique gratuite.",
  },
  "renovation-globale": {
    slug: "renovation-globale",
    name: "Rénovation globale",
    shortName: "Rénovation",
    intro:
      "Bouquet de travaux complet (isolation + chauffage + ventilation) pour atteindre un saut énergétique de 2 classes minimum et bénéficier de MaPrimeRénov' Parcours Accompagné.",
    keywords: ["rénovation énergétique globale", "MaPrimeRénov' parcours accompagné", "audit énergétique"],
    benefits: [
      "Aides bonifiées jusqu'à 70 000 € (Parcours Accompagné)",
      "Audit énergétique offert avant projet",
      "Coordination de tous les corps de métier",
      "Suivi MaPrimeRénov' de A à Z",
    ],
    priceRange: "25000-80000",
    priceLabel: "25 000 à 80 000 € selon ampleur",
    faqQuestion: "Pourquoi opter pour une rénovation globale ?",
    faqAnswer:
      "Elle permet d'obtenir les aides les plus élevées (jusqu'à 70 000 €), un vrai saut de performance énergétique, et un coordinateur unique qui pilote tout le projet.",
  },
};

export const serviceSlugs = Object.keys(serviceCatalog);
