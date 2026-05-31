export type ZoneRegion = "idf" | "hauts-de-france";

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
  region?: ZoneRegion;
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

/** Zones secondaires : pages SEO locales avec contenu adapté mais plus concis */
type LiteInput = {
  slug: string;
  name: string;
  code: string; // dépt
  postalCode: string;
  department: string;
  population: string;
  context: string; // 1 phrase contexte parc immobilier
  region?: ZoneRegion;
};

const liteZones: LiteInput[] = [
  // Île-de-France
  { slug: "argenteuil", name: "Argenteuil", code: "95", postalCode: "95100", department: "Val-d'Oise", population: "110 000 habitants", context: "pavillons des années 50-70 et copropriétés", region: "idf" },
  { slug: "creteil", name: "Créteil", code: "94", postalCode: "94000", department: "Val-de-Marne", population: "92 000 habitants", context: "grands ensembles, maisons individuelles et copropriétés", region: "idf" },
  { slug: "vitry-sur-seine", name: "Vitry-sur-Seine", code: "94", postalCode: "94400", department: "Val-de-Marne", population: "95 000 habitants", context: "habitat mixte avec beaucoup de pavillons d'avant-guerre", region: "idf" },
  { slug: "aulnay-sous-bois", name: "Aulnay-sous-Bois", code: "93", postalCode: "93600", department: "Seine-Saint-Denis", population: "85 000 habitants", context: "zones pavillonnaires étendues et résidences", region: "idf" },
  { slug: "courbevoie", name: "Courbevoie", code: "92", postalCode: "92400", department: "Hauts-de-Seine", population: "82 000 habitants", context: "appartements en copropriété et quelques maisons de ville", region: "idf" },
  { slug: "asnieres-sur-seine", name: "Asnières-sur-Seine", code: "92", postalCode: "92600", department: "Hauts-de-Seine", population: "87 000 habitants", context: "immeubles haussmanniens et pavillons fin XIXᵉ", region: "idf" },
  { slug: "colombes", name: "Colombes", code: "92", postalCode: "92700", department: "Hauts-de-Seine", population: "85 000 habitants", context: "pavillons des années 30 et résidences récentes", region: "idf" },
  { slug: "rueil-malmaison", name: "Rueil-Malmaison", code: "92", postalCode: "92500", department: "Hauts-de-Seine", population: "80 000 habitants", context: "maisons individuelles, villas et copropriétés haut de gamme", region: "idf" },
  { slug: "issy-les-moulineaux", name: "Issy-les-Moulineaux", code: "92", postalCode: "92130", department: "Hauts-de-Seine", population: "70 000 habitants", context: "immeubles modernes et pavillons réhabilités", region: "idf" },
  { slug: "levallois-perret", name: "Levallois-Perret", code: "92", postalCode: "92300", department: "Hauts-de-Seine", population: "65 000 habitants", context: "immeubles haussmanniens et copropriétés denses", region: "idf" },
  { slug: "neuilly-sur-seine", name: "Neuilly-sur-Seine", code: "92", postalCode: "92200", department: "Hauts-de-Seine", population: "60 000 habitants", context: "hôtels particuliers, immeubles bourgeois et copropriétés", region: "idf" },
  { slug: "vincennes", name: "Vincennes", code: "94", postalCode: "94300", department: "Val-de-Marne", population: "50 000 habitants", context: "maisons de ville et petits immeubles anciens", region: "idf" },
  { slug: "saint-maur-des-fosses", name: "Saint-Maur-des-Fossés", code: "94", postalCode: "94100", department: "Val-de-Marne", population: "75 000 habitants", context: "pavillons en bord de Marne et grandes propriétés", region: "idf" },
  { slug: "noisy-le-grand", name: "Noisy-le-Grand", code: "93", postalCode: "93160", department: "Seine-Saint-Denis", population: "70 000 habitants", context: "résidences récentes, copropriétés et pavillons", region: "idf" },

  // Hauts-de-France (Nord, Pas-de-Calais, Somme)
  { slug: "lille", name: "Lille", code: "59", postalCode: "59000", department: "Nord", population: "235 000 habitants", context: "maisons de ville en brique 1930, courées rénovées et copropriétés du centre", region: "hauts-de-france" },
  { slug: "roubaix", name: "Roubaix", code: "59", postalCode: "59100", department: "Nord", population: "98 000 habitants", context: "maisons ouvrières fin XIXᵉ, lofts industriels et logements sociaux rénovés", region: "hauts-de-france" },
  { slug: "tourcoing", name: "Tourcoing", code: "59", postalCode: "59200", department: "Nord", population: "97 000 habitants", context: "maisons de ville en bande des années 1900 et copropriétés récentes", region: "hauts-de-france" },
  { slug: "dunkerque", name: "Dunkerque", code: "59", postalCode: "59140", department: "Nord", population: "87 000 habitants", context: "pavillons d'après-guerre exposés au vent marin, idéaux pour PAC et isolation renforcée", region: "hauts-de-france" },
  { slug: "villeneuve-d-ascq", name: "Villeneuve-d'Ascq", code: "59", postalCode: "59650", department: "Nord", population: "62 000 habitants", context: "maisons individuelles des années 70-80 et résidences universitaires", region: "hauts-de-france" },
  { slug: "calais", name: "Calais", code: "62", postalCode: "62100", department: "Pas-de-Calais", population: "73 000 habitants", context: "pavillons côtiers, maisons reconstruites d'après-guerre et logements collectifs", region: "hauts-de-france" },
  { slug: "arras", name: "Arras", code: "62", postalCode: "62000", department: "Pas-de-Calais", population: "42 000 habitants", context: "maisons de ville classées, hôtels particuliers et pavillons de banlieue", region: "hauts-de-france" },
  { slug: "valenciennes", name: "Valenciennes", code: "59", postalCode: "59300", department: "Nord", population: "44 000 habitants", context: "maisons ouvrières en brique et copropriétés du centre", region: "hauts-de-france" },
  { slug: "douai", name: "Douai", code: "59", postalCode: "59500", department: "Nord", population: "40 000 habitants", context: "anciennes maisons minières rénovées et pavillons d'après-guerre", region: "hauts-de-france" },
  { slug: "lens", name: "Lens", code: "62", postalCode: "62300", department: "Pas-de-Calais", population: "32 000 habitants", context: "corons réhabilités, maisons minières et logements sociaux", region: "hauts-de-france" },
  { slug: "boulogne-sur-mer", name: "Boulogne-sur-Mer", code: "62", postalCode: "62200", department: "Pas-de-Calais", population: "40 000 habitants", context: "maisons reconstruites des années 50, pavillons côtiers et immeubles en front de mer", region: "hauts-de-france" },
  { slug: "amiens", name: "Amiens", code: "80", postalCode: "80000", department: "Somme", population: "135 000 habitants", context: "maisons amiénoises en brique, hortillonnages et copropriétés modernes", region: "hauts-de-france" },
  { slug: "bethune", name: "Béthune", code: "62", postalCode: "62400", department: "Pas-de-Calais", population: "25 000 habitants", context: "maisons de ville reconstruites, corons et pavillons individuels", region: "hauts-de-france" },
  { slug: "cambrai", name: "Cambrai", code: "59", postalCode: "59400", department: "Nord", population: "32 000 habitants", context: "maisons de centre-ville anciennes et pavillons des années 60-70", region: "hauts-de-france" },
  { slug: "maubeuge", name: "Maubeuge", code: "59", postalCode: "59600", department: "Nord", population: "30 000 habitants", context: "maisons reconstruites d'après-guerre, pavillons et logements collectifs", region: "hauts-de-france" },
  { slug: "beauvais", name: "Beauvais", code: "60", postalCode: "60000", department: "Oise", population: "57 000 habitants", context: "maisons en pierre et pavillons de banlieue d'après-guerre", region: "hauts-de-france" },
  { slug: "compiegne", name: "Compiègne", code: "60", postalCode: "60200", department: "Oise", population: "41 000 habitants", context: "hôtels particuliers du centre, maisons de ville et pavillons individuels", region: "hauts-de-france" },
  { slug: "creil", name: "Creil", code: "60", postalCode: "60100", department: "Oise", population: "36 000 habitants", context: "logements collectifs, maisons ouvrières et pavillons rénovés", region: "hauts-de-france" },
  { slug: "saint-quentin", name: "Saint-Quentin", code: "02", postalCode: "02100", department: "Aisne", population: "53 000 habitants", context: "maisons de ville art déco, pavillons et copropriétés du centre", region: "hauts-de-france" },
  { slug: "soissons", name: "Soissons", code: "02", postalCode: "02200", department: "Aisne", population: "28 000 habitants", context: "maisons reconstruites après 1918 et pavillons individuels", region: "hauts-de-france" },
  { slug: "laon", name: "Laon", code: "02", postalCode: "02000", department: "Aisne", population: "25 000 habitants", context: "maisons médiévales de la ville haute et pavillons de la ville basse", region: "hauts-de-france" },
  { slug: "abbeville", name: "Abbeville", code: "80", postalCode: "80100", department: "Somme", population: "23 000 habitants", context: "maisons picardes en brique et pavillons proches de la baie de Somme", region: "hauts-de-france" },
  { slug: "hazebrouck", name: "Hazebrouck", code: "59", postalCode: "59190", department: "Nord", population: "22 000 habitants", context: "maisons flamandes en brique rouge et pavillons individuels", region: "hauts-de-france" },
  // Île-de-France complément longue traîne
  { slug: "cergy", name: "Cergy", code: "95", postalCode: "95000", department: "Val-d'Oise", population: "67 000 habitants", context: "résidences des années 80, maisons de ville et copropriétés récentes", region: "idf" },
  { slug: "evry-courcouronnes", name: "Évry-Courcouronnes", code: "91", postalCode: "91000", department: "Essonne", population: "67 000 habitants", context: "grands ensembles, pavillons et résidences mixtes", region: "idf" },
  { slug: "meaux", name: "Meaux", code: "77", postalCode: "77100", department: "Seine-et-Marne", population: "55 000 habitants", context: "maisons de ville anciennes, pavillons et résidences récentes", region: "idf" },
  { slug: "melun", name: "Melun", code: "77", postalCode: "77000", department: "Seine-et-Marne", population: "41 000 habitants", context: "maisons de centre-ville, pavillons et copropriétés en bord de Seine", region: "idf" },
  { slug: "mantes-la-jolie", name: "Mantes-la-Jolie", code: "78", postalCode: "78200", department: "Yvelines", population: "45 000 habitants", context: "pavillons, grands ensembles rénovés et maisons de ville", region: "idf" },
  { slug: "pontoise", name: "Pontoise", code: "95", postalCode: "95000", department: "Val-d'Oise", population: "31 000 habitants", context: "maisons anciennes en pierre, pavillons et résidences", region: "idf" },
];

for (const z of liteZones) {
  const isHdF = z.region === "hauts-de-france";
  const regionLabel = isHdF ? "Hauts-de-France" : "Île-de-France";
  zones[z.slug] = {
    slug: z.slug,
    name: z.name,
    fullName: `${z.name} (${z.code})`,
    postalCode: z.postalCode,
    department: z.department,
    population: z.population,
    region: z.region ?? "idf",
    intro: `SupremEnergies intervient à ${z.name} (${z.department}) pour vos projets de rénovation énergétique : installation de pompe à chaleur, isolation thermique (combles, murs, ITE/ITI), panneaux solaires photovoltaïques et rénovation globale. Nous mobilisons toutes les aides 2026 (MaPrimeRénov', CEE, éco-PTZ) pour réduire votre reste à charge${isHdF ? ", avec une bonne connaissance du parc bâti des Hauts-de-France et de son climat" : ""}.`,
    housingContext: `Le parc immobilier à ${z.name} se compose principalement de ${z.context}. Nos solutions sont adaptées à chaque typologie : remplacement des chaudières fioul/gaz par pompes à chaleur, isolation des combles perdus, ITE des pavillons et installation de panneaux solaires en autoconsommation${isHdF ? ". Dans les Hauts-de-France, l'isolation des murs et combles est particulièrement rentable compte tenu du climat océanique froid et humide" : ""}.`,
    localAids: isHdF
      ? [
          "MaPrimeRénov' (jusqu'à 11 000 €) selon revenus",
          "Coup de pouce chauffage et isolation",
          "Éco-PTZ jusqu'à 50 000 € sans intérêts",
          "Aides Région Hauts-de-France (Pass Rénovation, chèque énergie régional)",
          "TVA réduite à 5,5%",
        ]
      : [
          "MaPrimeRénov' (jusqu'à 11 000 €) selon revenus",
          "Coup de pouce chauffage et isolation",
          "Éco-PTZ jusqu'à 50 000 € sans intérêts",
          "CEE bonifiés pour les travaux énergétiques",
          "TVA réduite à 5,5%",
        ],
    faqs: [
      { question: `Intervenez-vous rapidement à ${z.name} ?`, answer: `Oui, ${z.name} fait partie de notre zone d'intervention principale. Devis gratuit sous 48h, démarrage des travaux sous 2 à 4 semaines en moyenne.` },
      { question: `Quelles économies avec une pompe à chaleur à ${z.name} ?`, answer: `Une PAC air/eau permet généralement 50 à 75% d'économies par rapport à un chauffage électrique ou au fioul. Pour une maison de 120 m²${isHdF ? " dans le " + z.department : ""}, l'économie annuelle se situe entre 1 200 et 2 000 €.` },
      { question: `Combien coûte une isolation des combles à ${z.name} ?`, answer: `Comptez 20 à 60 €/m² selon la technique. Avec MaPrimeRénov' + CEE, le reste à charge peut tomber à moins de 10 €/m² pour les ménages modestes.` },
      { question: `Toutes les démarches d'aides sont-elles incluses ?`, answer: `Oui, nous nous occupons du montage de votre dossier MaPrimeRénov', des CEE${isHdF ? " et des aides régionales Hauts-de-France" : ""} et de toutes les démarches administratives.` },
    ],
    testimonialQuote: `Pose d'une pompe à chaleur dans notre maison à ${z.name}. Conseil clair, chantier propre, économies tout de suite visibles.`,
    testimonialAuthor: `Client SupremEnergies, ${z.name}`,
  };
}

// Marquer aussi les zones principales avec leur région
for (const slug of ["paris", "versailles", "boulogne-billancourt", "saint-denis", "nanterre", "montreuil"]) {
  if (zones[slug]) zones[slug].region = "idf";
}

export const zoneSlugs = Object.keys(zones);
export const nordZoneSlugs = liteZones.filter((z) => z.region === "hauts-de-france").map((z) => z.slug);


