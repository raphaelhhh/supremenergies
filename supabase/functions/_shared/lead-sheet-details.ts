const profiles: Record<string, string> = { bleu: "Bleu", jaune: "Jaune", violet: "Violet", rose: "Rose" };
const labels: Record<string, string> = {
  maison: "Maison", appartement: "Appartement", occupant: "Propriétaire occupant", bailleur: "Propriétaire bailleur", copro: "Copropriété",
  gaz: "Gaz", fioul: "Fioul", electrique: "Électrique", bois: "Bois / granulés", pac: "Pompe à chaleur", autre: "Autre",
  ">15": "Plus de 15 ans", "<15": "Moins de 15 ans", idf: "Île-de-France", autres: "Hors Île-de-France",
};
export const leadDetailHeaders = ["Profil aides", "Logement", "Âge du logement", "Statut propriétaire", "Chauffage actuel", "Personnes du foyer", "Revenu fiscal (€ / an)", "Surface (m²)", "Travaux cochés / quantités", "Aide estimée (€)", "MaPrimeRénov’ estimée (€)", "CEE estimées (€)", "Région des barèmes"];

/** Only explicit answers; never infer an income profile from a quote request. */
export function leadDetailCells(metadata: Record<string, unknown> = {}): (string | number)[] {
  const text = (key: string) => typeof metadata[key] === "string" ? String(metadata[key]) : "";
  const number = (key: string) => typeof metadata[key] === "number" ? Number(metadata[key]) : "";
  const label = (key: string) => labels[text(key)] ?? text(key);
  const works = Array.isArray(metadata.work_types) ? metadata.work_types.filter(x => typeof x === "string").join(", ") : "";
  const details = Array.isArray(metadata.work_details) ? metadata.work_details.map(item => {
    if (!item || typeof item !== "object") return "";
    const work = item as Record<string, unknown>;
    return [typeof work.label === "string" ? work.label : "", typeof work.surface === "number" ? `${work.surface} m²` : "", typeof work.count === "number" ? `Quantité : ${work.count}` : ""].filter(Boolean).join(" — ");
  }).filter(Boolean).join(" ; ") : "";
  return [profiles[text("income_category")] ?? "Non renseigné", label("housing_type"), label("housing_age"), label("owner_status"), label("current_heating"), number("household_size"), number("rfr"), text("surface") || number("surface"), details || works, number("estimated_aid"), number("total_mpr"), number("total_cee"), label("region")];
}