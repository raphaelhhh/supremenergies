export interface ZoneData {
  slug: string;
  name: string;
  fullName: string;
  postalCode: string;
  department: string;
  intro: string;
  housingContext: string;
  localAids: string[];
  faqs: { question: string; answer: string }[];
  testimonialQuote: string;
  testimonialAuthor: string;
  population: string;
}

export const zones: Record<string, ZoneData> = {
  paris: {
    slug: "paris",
    name: "Paris",
    fullName: "Paris (75)",
    postalCode: "75000",
    department: "Paris",
    population: "2 100 000 habitants",
    intro:
      "SupremEnergies accompagne les Parisiens dans leur rénovation énergétique : pompe à chaleur adaptée aux immeubles haussmanniens, isolation par l'intérieur (ITI) compatible copropriété, panneaux solaires en toiture. Notre équipe maîtrise les contraintes réglementaires de la Ville de Paris (PLU, ABF, copropriétés).",
    housingContext:
      "À Paris, 65% du parc est constitué d'immeubles collectifs anciens. Les enjeux : remplacement des chaudières gaz/fioul vieillissantes, isolation thermique sans perte de surface, et gestion des copropriétés. Nous proposons des solutions sur-mesure : PAC air/eau haute température, ITI mince, ventilation double flux compacte.",
    localAids: [
      "MaPrimeRénov' (jusqu'à 11 000 €) - cumulable",
      "Éco-PTZ jusqu'à 50 000 € sans intérêts",
      "CEE Coup de pouce chauffage et isolation",
      "Aide Ville de Paris « Éco-rénovons Paris+ » pour les copropriétés",
      "TVA réduite à 5,5% sur tous les travaux",
    ],
    faqs: [
      { question: "Peut-on installer une pompe à chaleur dans un appartement parisien ?", answer: "Oui, les PAC air/eau haute température remplacent parfaitement une chaudière gaz dans un appartement. Pour les copropriétés, une PAC collective est aussi envisageable. Nous gérons les démarches en AG." },
      { question: "L'isolation par l'extérieur est-elle autorisée à Paris ?", answer: "L'ITE est limitée par les Architectes des Bâtiments de France (ABF) sur les façades patrimoniales. Dans la majorité des cas, nous privilégions l'ITI (isolation par l'intérieur) qui ne modifie pas la façade." },
      { question: "Quelles aides spécifiques à Paris pour la rénovation énergétique ?", answer: "Outre MaPrimeRénov' nationale, la Ville de Paris propose le dispositif « Éco-rénovons Paris+ » pour les copropriétés, avec accompagnement et subventions complémentaires." },
      { question: "Combien coûte une rénovation énergétique à Paris ?", answer: "Comptez 15 000 à 40 000 € pour une rénovation globale d'appartement. Avec les aides cumulées, le reste à charge peut être divisé par 2 ou 3." },
    ],
    testimonialQuote: "Remplacement de chaudière fioul par PAC air/eau dans notre immeuble du 11e. SupremEnergies a tout coordonné avec le syndic.",
    testimonialAuthor: "Famille D., Paris 11e",
  },
  versailles: {
    slug: "versailles",
    name: "Versailles",
    fullName: "Versailles (78)",
    postalCode: "78000",
    department: "Yvelines",
    population: "85 000 habitants",
    intro:
      "À Versailles et dans les Yvelines, SupremEnergies installe pompes à chaleur, isolation extérieure (ITE) et panneaux solaires sur les pavillons et maisons individuelles. Nous intervenons dans le respect du patrimoine versaillais et des règles d'urbanisme.",
    housingContext:
      "Versailles compte une majorité de maisons individuelles et de petits immeubles. Les besoins typiques : remplacement de chaudières au fioul, isolation des combles perdus, pose de PAC air/eau pour grandes surfaces. Nos solutions sont adaptées aux pavillons des années 1960-1980 très énergivores.",
    localAids: [
      "MaPrimeRénov' (jusqu'à 11 000 €)",
      "Éco-PTZ jusqu'à 50 000 €",
      "CEE Coup de pouce - bonus zone Île-de-France",
      "Aides du Département des Yvelines pour les ménages modestes",
      "Chèque énergie pour les revenus modestes",
    ],
    faqs: [
      { question: "Quel chauffage pour une maison à Versailles ?", answer: "La pompe à chaleur air/eau est la solution la plus performante pour remplacer une chaudière fioul ou gaz dans une maison de 100-200 m². Économies annuelles moyennes : 1 200 à 1 800 €." },
      { question: "Y a-t-il des contraintes ABF à Versailles ?", answer: "Oui, la zone proche du Château impose un avis des Architectes des Bâtiments de France pour les façades. Nous adaptons nos solutions (panneaux solaires en toiture arrière, ITE coloris validés)." },
      { question: "Combien de temps dure une installation de PAC ?", answer: "L'installation d'une pompe à chaleur prend généralement 2 à 3 jours, raccordement compris. Notre équipe intervient à Versailles et toutes les communes des Yvelines." },
      { question: "Peut-on cumuler MaPrimeRénov' et CEE ?", answer: "Oui, MaPrimeRénov' et les Certificats d'Économies d'Énergie (CEE) sont cumulables. Nous calculons le montant total des aides dans votre devis." },
    ],
    testimonialQuote: "Isolation des combles + PAC air/eau sur notre pavillon. Économies de 1 600 €/an. Équipe sérieuse et ponctuelle.",
    testimonialAuthor: "M. et Mme L., Versailles",
  },
  "boulogne-billancourt": {
    slug: "boulogne-billancourt",
    name: "Boulogne-Billancourt",
    fullName: "Boulogne-Billancourt (92)",
    postalCode: "92100",
    department: "Hauts-de-Seine",
    population: "120 000 habitants",
    intro:
      "À Boulogne-Billancourt, SupremEnergies réalise des installations de pompes à chaleur, panneaux photovoltaïques et travaux d'isolation pour appartements, copropriétés et maisons individuelles des Hauts-de-Seine.",
    housingContext:
      "Boulogne mêle immeubles haussmanniens, résidences des années 70 et constructions récentes. Nos interventions courantes : remplacement de chaudières collectives, isolation thermique des copropriétés, installation de PAC air/eau ou air/air pour appartements traversants.",
    localAids: [
      "MaPrimeRénov' (jusqu'à 11 000 €)",
      "MaPrimeRénov' Copropriété (jusqu'à 25% du montant)",
      "Éco-PTZ collectif pour copropriétés",
      "CEE Coup de pouce isolation et chauffage",
      "Aides du Département 92",
    ],
    faqs: [
      { question: "Quels travaux en copropriété à Boulogne ?", answer: "Isolation des façades (ITE), remplacement de la chaudière collective par une PAC ou chaudière biomasse, isolation des toitures-terrasses. Nous accompagnons les syndics et conseils syndicaux." },
      { question: "PAC air/air ou air/eau pour un appartement ?", answer: "Air/air si vous voulez climatiser et chauffer (sans radiateurs à eau), air/eau si vous gardez votre circuit de radiateurs ou plancher chauffant. Notre conseiller vous guidera." },
      { question: "Délai pour démarrer un chantier à Boulogne ?", answer: "Comptez 2 à 4 semaines après acceptation du devis pour une PAC ou une isolation, et 2 à 3 mois pour une rénovation globale (instruction MaPrimeRénov')." },
      { question: "Y a-t-il des aides spécifiques aux Hauts-de-Seine ?", answer: "Le Département 92 propose des aides ponctuelles pour les ménages modestes. Nous vérifions votre éligibilité dans le devis." },
    ],
    testimonialQuote: "Pose de panneaux solaires sur notre toit-terrasse à Boulogne. Production conforme aux estimations.",
    testimonialAuthor: "Sophie D., Boulogne-Billancourt",
  },
  "saint-denis": {
    slug: "saint-denis",
    name: "Saint-Denis",
    fullName: "Saint-Denis (93)",
    postalCode: "93200",
    department: "Seine-Saint-Denis",
    population: "115 000 habitants",
    intro:
      "À Saint-Denis et en Seine-Saint-Denis, SupremEnergies aide les propriétaires à réduire leurs factures et améliorer leur confort grâce à la pompe à chaleur, l'isolation et les panneaux solaires. Nous mobilisons toutes les aides disponibles pour minimiser le reste à charge.",
    housingContext:
      "La Seine-Saint-Denis a un parc immobilier hétérogène : pavillons anciens, résidences collectives, maisons rénovées. Nos interventions visent en priorité les passoires thermiques (étiquettes F et G) avec des bouquets de travaux complets.",
    localAids: [
      "MaPrimeRénov' bonifiée pour ménages modestes (jusqu'à 11 000 €)",
      "Coup de pouce chauffage (jusqu'à 5 000 € pour PAC)",
      "Éco-PTZ jusqu'à 50 000 €",
      "Aides Action Logement pour les salariés",
      "Chèque énergie automatique",
    ],
    faqs: [
      { question: "Suis-je éligible à MaPrimeRénov' bleue à Saint-Denis ?", answer: "Si vos revenus sont modestes (selon barème ANAH), vous bénéficiez de la prime bleue (montant maximum). Nous vérifions votre éligibilité gratuitement." },
      { question: "Combien coûte vraiment une PAC après aides ?", answer: "Pour un ménage modeste, le reste à charge sur une PAC air/eau (12 000 €) peut descendre à 3 000 - 4 000 € grâce au cumul MaPrimeRénov' + Coup de pouce + CEE." },
      { question: "Quelles solutions pour un pavillon mal isolé ?", answer: "Nous recommandons un bouquet : isolation des combles + ITE des murs + remplacement du chauffage. Cela permet d'obtenir un saut de 2 classes énergétiques minimum." },
      { question: "Travaillez-vous avec des bailleurs sociaux ?", answer: "Oui, nous intervenons aussi pour les bailleurs et les copropriétés mixtes. Contactez-nous pour un audit collectif." },
    ],
    testimonialQuote: "Rénovation globale de notre pavillon : isolation, PAC, ventilation. Étiquette passée de E à B. Chantier suivi de A à Z.",
    testimonialAuthor: "Karim B., Saint-Denis",
  },
  nanterre: {
    slug: "nanterre",
    name: "Nanterre",
    fullName: "Nanterre (92)",
    postalCode: "92000",
    department: "Hauts-de-Seine",
    population: "96 000 habitants",
    intro:
      "À Nanterre, SupremEnergies installe des pompes à chaleur, des panneaux solaires et réalise des travaux d'isolation pour les habitants des Hauts-de-Seine ouest. Nos solutions s'adaptent aux pavillons, maisons de ville et appartements.",
    housingContext:
      "Nanterre combine zones pavillonnaires, immeubles des années 60-80 et nouveaux quartiers. Les enjeux principaux : isolation des passoires thermiques, remplacement de chauffage électrique par PAC air/air ou air/eau, autoconsommation solaire pour maisons individuelles.",
    localAids: [
      "MaPrimeRénov' (jusqu'à 11 000 €)",
      "Coup de pouce chauffage et isolation",
      "Éco-PTZ jusqu'à 50 000 €",
      "Aides du Département 92",
      "Prime à l'autoconsommation photovoltaïque",
    ],
    faqs: [
      { question: "Remplacer un chauffage électrique à Nanterre, que choisir ?", answer: "La PAC air/air est la solution la plus économique pour remplacer des convecteurs : économies de 60 à 70% sur la facture électrique. La PAC air/eau si vous installez un plancher chauffant." },
      { question: "Quel rendement pour les panneaux solaires en Île-de-France ?", answer: "Une installation de 6 kWc à Nanterre produit environ 6 500 kWh/an. Avec l'autoconsommation, vous économisez 1 000 à 1 500 €/an et bénéficiez de la prime à l'investissement." },
      { question: "Faut-il une autorisation pour des panneaux solaires ?", answer: "Oui, déclaration préalable de travaux en mairie. Nous nous occupons de toutes les démarches administratives, y compris le raccordement Enedis." },
      { question: "Combien de temps pour amortir une PAC ?", answer: "Avec les aides actuelles, le retour sur investissement d'une PAC air/eau est de 5 à 8 ans. Au-delà, ce sont des économies nettes." },
    ],
    testimonialQuote: "Climatisation réversible installée dans 3 pièces. Très silencieuse. Excellent conseil sur le dimensionnement.",
    testimonialAuthor: "Isabelle R., Nanterre",
  },
  montreuil: {
    slug: "montreuil",
    name: "Montreuil",
    fullName: "Montreuil (93)",
    postalCode: "93100",
    department: "Seine-Saint-Denis",
    population: "110 000 habitants",
    intro:
      "À Montreuil, SupremEnergies accompagne les propriétaires dans leurs projets de rénovation énergétique : pompe à chaleur, isolation extérieure (ITE), panneaux photovoltaïques. Nous intervenons sur tous types de logements de l'est parisien.",
    housingContext:
      "Montreuil compte beaucoup de maisons de ville, ateliers réhabilités et petites copropriétés. Les besoins typiques : ITE sur pavillons mitoyens, remplacement de chaudières gaz par PAC, isolation des combles. Une part importante du parc est ancienne et nécessite des bouquets de travaux.",
    localAids: [
      "MaPrimeRénov' (jusqu'à 11 000 €)",
      "Coup de pouce chauffage",
      "Éco-PTZ jusqu'à 50 000 €",
      "Aides Est Ensemble pour la rénovation",
      "Chèque énergie",
    ],
    faqs: [
      { question: "ITE possible sur une maison mitoyenne à Montreuil ?", answer: "Oui, l'ITE est réalisable sur les façades libres (avant et arrière). Pour les pignons mitoyens, nous proposons une isolation intérieure ou par injection." },
      { question: "Aides locales spécifiques à Est Ensemble ?", answer: "L'agglomération Est Ensemble propose des conseils gratuits via l'Espace Conseil France Rénov' et accompagne les copropriétés dans leurs projets de rénovation." },
      { question: "Quelle puissance de PAC pour 120 m² ?", answer: "Pour 120 m² bien isolés, une PAC de 8 à 11 kW suffit. Notre étude thermique précise détermine la puissance optimale selon votre logement." },
      { question: "Délais de versement de MaPrimeRénov' ?", answer: "Le versement intervient 1 à 3 mois après la fin des travaux et le dépôt des factures. Nous vous accompagnons dans toutes les démarches." },
    ],
    testimonialQuote: "ITE complète sur notre pavillon. Chantier de 3 semaines, façade neuve, thermique au top.",
    testimonialAuthor: "Olivier T., Montreuil",
  },
};

export const zoneSlugs = Object.keys(zones);
