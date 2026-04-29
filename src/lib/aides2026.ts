// Barèmes officiels MaPrimeRénov' 2026 + CEE Coup de pouce
// Sources : Guide ANAH 2026, France Rénov', arrêtés du 18/08/2025, 15/12/2025 et 27/12/2025
// Mis à jour avril 2026

export type IncomeProfile = "bleu" | "jaune" | "violet" | "rose";
export type Region = "idf" | "autres";
export type HousingType = "maison" | "appartement";
export type OwnerStatus = "occupant" | "bailleur" | "copro";

// Plafonds de revenu fiscal de référence (RFR) 2026 — source ANAH
// Hors Île-de-France
const RFR_AUTRES: Record<number, { bleu: number; jaune: number; violet: number }> = {
  1: { bleu: 17363, jaune: 22259, violet: 31185 },
  2: { bleu: 25393, jaune: 32553, violet: 45842 },
  3: { bleu: 30547, jaune: 39192, violet: 55129 },
  4: { bleu: 35676, jaune: 45735, violet: 64550 },
  5: { bleu: 40821, jaune: 52321, violet: 73923 },
};
// Île-de-France (plafonds plus élevés)
const RFR_IDF: Record<number, { bleu: number; jaune: number; violet: number }> = {
  1: { bleu: 23768, jaune: 28933, violet: 40404 },
  2: { bleu: 34884, jaune: 42463, violet: 59394 },
  3: { bleu: 41893, jaune: 51000, violet: 71060 },
  4: { bleu: 48914, jaune: 59549, violet: 83637 },
  5: { bleu: 55961, jaune: 68123, violet: 95758 },
};

// Incrément par personne supplémentaire au-delà de 5
const RFR_INCR_AUTRES = { bleu: 5145, jaune: 6587, violet: 9165 };
const RFR_INCR_IDF = { bleu: 7038, jaune: 8568, violet: 12122 };

export function detectProfile(rfr: number, householdSize: number, region: Region): IncomeProfile {
  const baseTable = region === "idf" ? RFR_IDF : RFR_AUTRES;
  const incr = region === "idf" ? RFR_INCR_IDF : RFR_INCR_AUTRES;
  const size = Math.max(1, householdSize);
  let plafonds = baseTable[Math.min(size, 5)];
  if (size > 5) {
    const extra = size - 5;
    plafonds = {
      bleu: plafonds.bleu + extra * incr.bleu,
      jaune: plafonds.jaune + extra * incr.jaune,
      violet: plafonds.violet + extra * incr.violet,
    };
  }
  if (rfr <= plafonds.bleu) return "bleu";
  if (rfr <= plafonds.jaune) return "jaune";
  if (rfr <= plafonds.violet) return "violet";
  return "rose";
}

export const PROFILE_INFO: Record<IncomeProfile, { label: string; color: string; description: string }> = {
  bleu: { label: "Bleu", color: "bg-blue-500", description: "Revenus très modestes — aides maximales, jusqu'à 80% en rénovation d'ampleur" },
  jaune: { label: "Jaune", color: "bg-yellow-500", description: "Revenus modestes — jusqu'à 60% en rénovation d'ampleur" },
  violet: { label: "Violet", color: "bg-purple-500", description: "Revenus intermédiaires — jusqu'à 45% en rénovation d'ampleur" },
  rose: { label: "Rose", color: "bg-pink-500", description: "Revenus supérieurs — éligible uniquement à la rénovation d'ampleur (10%)" },
};

// Forfaits MaPrimeRénov' parcours par geste 2026 (€)
// `null` = non éligible pour ce profil
type GesteForfait = { bleu: number | null; jaune: number | null; violet: number | null; rose: number | null };

export interface Geste {
  id: string;
  label: string;
  category: "chauffage" | "isolation" | "autre";
  unit: "forfait" | "m2" | "equipement";
  forfait: GesteForfait;
  plafondDepense?: number; // plafond en € (ou €/m² pour unit=m2)
  cee?: { bleu: number; jaune: number; violet: number; rose: number }; // CEE Coup de pouce indicatif
  excludedReason?: string;
  needsSurface?: boolean;
  needsCount?: boolean;
  description?: string;
}

export const GESTES: Geste[] = [
  // Chauffage
  {
    id: "pac-air-eau",
    label: "Pompe à chaleur air/eau",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 5000, jaune: 4000, violet: 3000, rose: null },
    plafondDepense: 12000,
    cee: { bleu: 5000, jaune: 4000, violet: 2500, rose: 2500 },
    description: "Remplacement chaudière fioul/gaz par PAC air/eau",
  },
  {
    id: "pac-geo",
    label: "Pompe à chaleur géothermique",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 11000, jaune: 9000, violet: 6000, rose: null },
    plafondDepense: 18000,
    cee: { bleu: 5000, jaune: 4000, violet: 2500, rose: 2500 },
  },
  {
    id: "cet",
    label: "Chauffe-eau thermodynamique",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 1200, jaune: 800, violet: 400, rose: null },
    plafondDepense: 3500,
    cee: { bleu: 250, jaune: 200, violet: 100, rose: 100 },
  },
  {
    id: "ces",
    label: "Chauffe-eau solaire individuel",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 4000, jaune: 3000, violet: 2000, rose: null },
    plafondDepense: 7000,
  },
  {
    id: "poele-granules",
    label: "Poêle à granulés",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 1250, jaune: 1000, violet: 750, rose: null },
    plafondDepense: 5000,
    cee: { bleu: 800, jaune: 500, violet: 300, rose: 300 },
  },
  {
    id: "raccordement-reseau",
    label: "Raccordement à un réseau de chaleur",
    category: "chauffage",
    unit: "forfait",
    forfait: { bleu: 1200, jaune: 800, violet: 400, rose: null },
  },
  // Isolation
  {
    id: "iso-combles",
    label: "Isolation combles / rampants de toiture",
    category: "isolation",
    unit: "m2",
    forfait: { bleu: 25, jaune: 20, violet: 15, rose: null },
    plafondDepense: 75,
    cee: { bleu: 12, jaune: 10, violet: 7, rose: 7 },
    needsSurface: true,
    description: "Forfait par m² isolé (surface moyenne combles : 70 à 100 m²)",
  },
  {
    id: "iso-toiture-terrasse",
    label: "Isolation toiture-terrasse",
    category: "isolation",
    unit: "m2",
    forfait: { bleu: 75, jaune: 60, violet: 40, rose: null },
    plafondDepense: 180,
    needsSurface: true,
  },
  {
    id: "iso-murs",
    label: "Isolation des murs (ITE / ITI)",
    category: "isolation",
    unit: "forfait",
    forfait: { bleu: null, jaune: null, violet: null, rose: null },
    excludedReason: "Non éligible en geste seul depuis janvier 2026 — uniquement en rénovation d'ampleur",
    needsSurface: true,
  },
  {
    id: "fenetres",
    label: "Fenêtres / portes-fenêtres (remplacement simple vitrage)",
    category: "isolation",
    unit: "equipement",
    forfait: { bleu: 100, jaune: 80, violet: 40, rose: null },
    plafondDepense: 1000,
    needsCount: true,
    description: "Forfait par fenêtre remplaçant un simple vitrage",
  },
  // Autres
  {
    id: "vmc-df",
    label: "VMC double flux (avec isolation simultanée)",
    category: "autre",
    unit: "forfait",
    forfait: { bleu: 2500, jaune: 2000, violet: 1500, rose: null },
    plafondDepense: 6000,
    description: "Doit être posée en même temps qu'un geste d'isolation",
  },
  {
    id: "audit",
    label: "Audit énergétique",
    category: "autre",
    unit: "forfait",
    forfait: { bleu: 500, jaune: 400, violet: 300, rose: null },
    plafondDepense: 800,
    description: "Finançable uniquement en complément d'au moins un geste",
  },
  {
    id: "depose-cuve-fioul",
    label: "Dépose de cuve à fioul",
    category: "autre",
    unit: "forfait",
    forfait: { bleu: 1200, jaune: 800, violet: 400, rose: null },
  },
];

export interface GesteInput {
  id: string;
  surface?: number;
  count?: number;
}

export interface GesteResult {
  id: string;
  label: string;
  mpr: number;
  cee: number;
  excluded?: string;
}

export interface SimulationResult {
  profile: IncomeProfile;
  gestes: GesteResult[];
  totalMPR: number;
  totalCEE: number;
  total: number;
  warnings: string[];
  recommandation?: string;
}

export function calculateAides(
  profile: IncomeProfile,
  gestes: GesteInput[],
  housingAge: ">15" | "<15",
  ownerStatus: OwnerStatus
): SimulationResult {
  const warnings: string[] = [];
  const results: GesteResult[] = [];

  if (housingAge === "<15") {
    warnings.push("MaPrimeRénov' nécessite un logement de plus de 15 ans (sauf sortie de chauffage fioul/charbon).");
  }

  // VMC double flux exige un geste d'isolation
  const hasVMC = gestes.some((g) => g.id === "vmc-df");
  const hasIsolation = gestes.some((g) => {
    const def = GESTES.find((x) => x.id === g.id);
    return def?.category === "isolation" && def.forfait[profile] !== null;
  });
  // Audit exige un geste
  const hasAudit = gestes.some((g) => g.id === "audit");
  const hasOtherGeste = gestes.some((g) => g.id !== "audit");

  for (const input of gestes) {
    const def = GESTES.find((g) => g.id === input.id);
    if (!def) continue;

    if (def.excludedReason) {
      results.push({ id: def.id, label: def.label, mpr: 0, cee: 0, excluded: def.excludedReason });
      continue;
    }
    const forfait = def.forfait[profile];
    if (forfait === null) {
      results.push({
        id: def.id,
        label: def.label,
        mpr: 0,
        cee: 0,
        excluded: profile === "rose"
          ? "Profil Rose exclu du parcours par geste depuis 2024"
          : "Non éligible pour ce profil",
      });
      continue;
    }
    if (def.id === "vmc-df" && !hasIsolation) {
      results.push({
        id: def.id,
        label: def.label,
        mpr: 0,
        cee: 0,
        excluded: "Nécessite un geste d'isolation simultané",
      });
      continue;
    }
    if (def.id === "audit" && !hasOtherGeste) {
      results.push({
        id: def.id,
        label: def.label,
        mpr: 0,
        cee: 0,
        excluded: "Nécessite au moins un geste de travaux",
      });
      continue;
    }

    let mpr = 0;
    if (def.unit === "m2" && input.surface) {
      mpr = forfait * input.surface;
    } else if (def.unit === "equipement" && input.count) {
      mpr = forfait * input.count;
    } else {
      mpr = forfait;
    }

    // CEE Coup de pouce
    let cee = 0;
    if (def.cee) {
      const ceeUnit = def.cee[profile];
      if (def.unit === "m2" && input.surface) cee = ceeUnit * input.surface;
      else if (def.unit === "equipement" && input.count) cee = ceeUnit * input.count;
      else cee = ceeUnit;
    }

    results.push({ id: def.id, label: def.label, mpr: Math.round(mpr), cee: Math.round(cee) });
  }

  if (ownerStatus === "copro") {
    warnings.push("En copropriété, les aides MaPrimeRénov' Copropriété (collective) sont souvent plus avantageuses — un conseiller vous expliquera.");
  }

  // Recommandation rénovation d'ampleur
  let recommandation: string | undefined;
  const isolationCount = gestes.filter((g) => {
    const d = GESTES.find((x) => x.id === g.id);
    return d?.category === "isolation";
  }).length;
  if (isolationCount >= 2 || (gestes.length >= 3 && profile !== "rose")) {
    recommandation = "Avec ce nombre de travaux, la rénovation d'ampleur (parcours accompagné) peut être bien plus avantageuse : jusqu'à " +
      (profile === "bleu" ? "32 000€" : profile === "jaune" ? "24 000€" : profile === "violet" ? "18 000€" : "4 000€") +
      " d'aide. Notre conseiller vous orientera.";
  }
  if (profile === "rose" && gestes.length > 0) {
    recommandation = "Profil Rose : seule la rénovation d'ampleur est éligible (10% du coût HT, jusqu'à 4 000€). Contactez-nous pour étudier ce parcours.";
  }

  const totalMPR = results.reduce((s, r) => s + r.mpr, 0);
  const totalCEE = results.reduce((s, r) => s + r.cee, 0);

  return {
    profile,
    gestes: results,
    totalMPR,
    totalCEE,
    total: totalMPR + totalCEE,
    warnings,
    recommandation,
  };
}
