import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Info, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Breadcrumb from "@/components/Breadcrumb";
import CTA from "@/components/CTA";
import InternalLinksHub from "@/components/InternalLinksHub";
import {
  GESTES,
  PROFILE_INFO,
  detectProfile,
  calculateAides,
  type GesteInput,
  type Region,
  type HousingType,
  type OwnerStatus,
} from "@/lib/aides2026";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const submitSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(10, "Téléphone invalide").max(20),
  firstName: z.string().trim().min(2, "Prénom requis").max(80),
});

const SimulateurAides = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  // Étape 1 — Logement
  const [housingType, setHousingType] = useState<HousingType>("maison");
  const [housingAge, setHousingAge] = useState<">15" | "<15">(">15");
  const [ownerStatus, setOwnerStatus] = useState<OwnerStatus>("occupant");
  // Étape 2 — Foyer & revenus
  const [householdSize, setHouseholdSize] = useState(2);
  const [rfr, setRfr] = useState<number>(35000);
  const [region, setRegion] = useState<Region>("idf");
  const [postalCode, setPostalCode] = useState("");
  // Étape 3 — Chauffage actuel
  const [currentHeating, setCurrentHeating] = useState<string>("gaz");
  // Étape 4 — Travaux envisagés (avec surface/quantité)
  const [selectedGestes, setSelectedGestes] = useState<GesteInput[]>([]);
  // Étape 5 — Coordonnées
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const profile = useMemo(
    () => detectProfile(rfr, householdSize, region),
    [rfr, householdSize, region]
  );

  const result = useMemo(
    () => calculateAides(profile, selectedGestes, housingAge, ownerStatus, currentHeating),
    [profile, selectedGestes, housingAge, ownerStatus, currentHeating]
  );

  const toggleGeste = (id: string) => {
    setSelectedGestes((prev) => {
      const existing = prev.find((g) => g.id === id);
      if (existing) return prev.filter((g) => g.id !== id);
      const def = GESTES.find((g) => g.id === id);
      return [...prev, { id, surface: def?.needsSurface ? 80 : undefined, count: def?.needsCount ? 4 : undefined }];
    });
  };
  const updateGeste = (id: string, patch: Partial<GesteInput>) => {
    setSelectedGestes((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  };

  const handleSubmit = async () => {
    const parsed = submitSchema.safeParse({ email, phone, firstName });
    if (!parsed.success) {
      toast({ title: "Champs invalides", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("simulations").insert([{
        email: parsed.data.email,
        phone: parsed.data.phone,
        postal_code: postalCode,
        household_size: householdSize,
        income_category: profile,
        work_types: selectedGestes.map((g) => g.id),
        housing_type: housingType,
        estimated_aid: result.total,
        inputs: JSON.parse(JSON.stringify({
          firstName: parsed.data.firstName,
          housingType, housingAge, ownerStatus, region, rfr,
          householdSize, postalCode, currentHeating,
          gestes: selectedGestes,
        })),
        result: JSON.parse(JSON.stringify({
          profile,
          totalMPR: result.totalMPR,
          totalCEE: result.totalCEE,
          total: result.total,
          gestes: result.gestes,
        })),
      }]);
      if (error) throw error;
      setStep(6);
    } catch (e) {
      toast({ title: "Erreur", description: "Impossible d'enregistrer votre simulation. Réessayez ou contactez-nous.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return !!housingType && !!housingAge && !!ownerStatus;
    if (step === 2) return householdSize > 0 && rfr > 0 && (postalCode.length === 0 || /^\d{5}$/.test(postalCode));
    if (step === 3) return !!currentHeating;
    if (step === 4) return selectedGestes.length > 0;
    if (step === 5) return firstName.length > 1 && email.length > 0 && phone.length > 0;
    return true;
  };

  const profInfo = PROFILE_INFO[profile];
  const totalSteps = 5;

  const title = "Simulateur MaPrimeRénov' 2026 — Barème officiel ANAH | SupremEnergies";
  const description = "Estimez précisément vos aides 2026 (MaPrimeRénov' + CEE) selon le barème officiel ANAH. Calcul automatique de votre profil bleu/jaune/violet/rose en 2 minutes.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://supremenergies.com/simulateur-aides" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/90 text-white pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="container-custom">
          <div className="[&_nav]:py-0 [&_nav]:text-white/80 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/80">
            <Breadcrumb items={[{ label: "Simulateur d'aides" }]} />
          </div>
          <div className="flex items-center gap-3 mt-8 mb-4">
            <Calculator size={28} />
            <span className="text-xs md:text-sm uppercase tracking-wide text-white/90 font-medium">
              Simulateur officiel — barèmes ANAH &amp; CEE 2026
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-sm leading-tight">
            Estimez vos aides MaPrimeRénov' &amp; CEE 2026
          </h1>
          <p className="text-base md:text-lg text-white/95 max-w-2xl">
            Calcul basé sur les <strong>barèmes officiels ANAH 2026</strong> et les <strong>primes CEE Coup de pouce</strong> :
            forfaits par geste, plafonds de dépense, profil de revenus déterminé automatiquement. Résultat précis en 2 minutes.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-2xl">
          {step < 6 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Étape {step}/{totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-supreme-primary transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* ÉTAPE 1 — Logement */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-6">Votre logement</h2>
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block font-medium">Type de logement</Label>
                    <RadioGroup value={housingType} onValueChange={(v) => setHousingType(v as HousingType)} className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="maison" id="h-maison" />
                        <span className="font-medium">🏠 Maison</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="appartement" id="h-appart" />
                        <span className="font-medium">🏢 Appartement</span>
                      </label>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="mb-3 block font-medium">Votre statut</Label>
                    <RadioGroup value={ownerStatus} onValueChange={(v) => setOwnerStatus(v as OwnerStatus)} className="space-y-2">
                      {[
                        { v: "occupant", l: "Propriétaire occupant" },
                        { v: "bailleur", l: "Propriétaire bailleur" },
                        { v: "copro", l: "En copropriété" },
                      ].map((o) => (
                        <label key={o.v} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value={o.v} id={o.v} />
                          <span className="font-medium">{o.l}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="mb-3 block font-medium">Âge du logement</Label>
                    <RadioGroup value={housingAge} onValueChange={(v) => setHousingAge(v as ">15" | "<15")} className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value=">15" id="age1" />
                        <span className="font-medium">Plus de 15 ans</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="<15" id="age2" />
                        <span className="font-medium">Moins de 15 ans</span>
                      </label>
                    </RadioGroup>
                    <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 flex-shrink-0" />
                      MaPrimeRénov' impose un logement de plus de 15 ans (sauf sortie de chauffage fioul/charbon).
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ÉTAPE 2 — Foyer & revenus */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-2">Votre foyer et vos revenus</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Votre profil ANAH (bleu, jaune, violet, rose) est calculé automatiquement à partir de votre
                  revenu fiscal de référence (avis d'imposition 2025) et de la composition du foyer.
                </p>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="household">Personnes dans le foyer</Label>
                      <Input id="household" type="number" min={1} max={10} value={householdSize}
                        onChange={(e) => setHouseholdSize(parseInt(e.target.value) || 1)} className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="postal">Code postal</Label>
                      <Input id="postal" value={postalCode}
                        onChange={(e) => {
                          const v = e.target.value;
                          setPostalCode(v);
                          if (/^(75|77|78|91|92|93|94|95)/.test(v)) setRegion("idf");
                          else if (v.length === 5) setRegion("autres");
                        }}
                        placeholder="75015" maxLength={5} className="mt-2" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 -mt-2">
                    Région détectée : <span className="font-medium">{region === "idf" ? "Île-de-France" : "Hors Île-de-France"}</span> (déduite du code postal — les plafonds ANAH diffèrent).
                  </p>
                  <div>
                    <Label htmlFor="rfr">Revenu fiscal de référence (€/an)</Label>
                    <Input id="rfr" type="number" min={0} step={1000} value={rfr}
                      onChange={(e) => setRfr(parseInt(e.target.value) || 0)} className="mt-2" placeholder="35 000" />
                    <p className="text-xs text-gray-500 mt-1">
                      Indiqué sur votre avis d'imposition 2025 (revenus 2024). Cumul du foyer.
                    </p>
                  </div>
                  {/* Profil détecté en temps réel */}
                  <div className={`p-4 rounded-lg border-2 border-dashed ${profile === "rose" ? "border-pink-300 bg-pink-50" : "border-supreme-primary/30 bg-supreme-primary/5"}`}>
                    <div className="flex items-start gap-3">
                      <span className={`w-4 h-4 rounded-full ${profInfo.color} mt-1 flex-shrink-0`} />
                      <div>
                        <div className="font-bold text-sm">Votre profil détecté : <span className="uppercase">{profInfo.label}</span></div>
                        <p className="text-xs text-gray-600 mt-1">{profInfo.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ÉTAPE 3 — Chauffage actuel */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-bold mb-2">Votre chauffage actuel</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Le remplacement d'un chauffage fossile (fioul, gaz) ouvre droit à des bonus CEE majorés.
                </p>
                <RadioGroup value={currentHeating} onValueChange={setCurrentHeating} className="space-y-2">
                  {[
                    { v: "fioul", l: "🛢️ Fioul", bonus: "Bonus sortie fioul" },
                    { v: "gaz", l: "🔵 Gaz", bonus: "" },
                    { v: "electrique", l: "⚡ Électrique (convecteurs)", bonus: "" },
                    { v: "bois", l: "🪵 Bois / granulés", bonus: "" },
                    { v: "pac", l: "♻️ Pompe à chaleur", bonus: "" },
                    { v: "autre", l: "❓ Autre", bonus: "" },
                  ].map((o) => (
                    <label key={o.v} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value={o.v} id={`ch-${o.v}`} />
                      <span className="font-medium flex-1">{o.l}</span>
                      {o.bonus && <span className="text-xs text-green-600 font-medium">{o.bonus}</span>}
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {/* ÉTAPE 4 — Gestes */}
            {step === 4 && (
              <>
                <h2 className="text-xl font-bold mb-2">Travaux envisagés</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Sélectionnez tous les travaux concernés. Indiquez la surface ou le nombre quand demandé pour un calcul précis.
                </p>
                {(["chauffage", "isolation", "autre"] as const).map((cat) => (
                  <div key={cat} className="mb-5">
                    <div className="text-xs font-bold uppercase text-gray-500 mb-2">
                      {cat === "chauffage" ? "🔥 Chauffage & ECS" : cat === "isolation" ? "🧱 Isolation & menuiseries" : "🧰 Autres"}
                    </div>
                    <div className="space-y-2">
                      {GESTES.filter((g) => g.category === cat).map((g) => {
                        const sel = selectedGestes.find((s) => s.id === g.id);
                        const isExcluded = !!g.excludedReason || g.forfait[profile] === null;
                        return (
                          <div key={g.id} className={`border rounded-lg ${sel ? "border-supreme-primary bg-supreme-primary/5" : ""} ${isExcluded ? "opacity-60" : ""}`}>
                            <label className="flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50/50">
                              <Checkbox checked={!!sel} onCheckedChange={() => toggleGeste(g.id)} className="mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{g.label}</div>
                                {g.description && <div className="text-xs text-gray-500 mt-0.5">{g.description}</div>}
                                {isExcluded && (
                                  <div className="text-xs text-orange-600 mt-1 flex items-start gap-1">
                                    <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                                    {g.excludedReason || `Profil ${profInfo.label} non éligible à ce geste en parcours par geste`}
                                  </div>
                                )}
                              </div>
                            </label>
                            {sel && !isExcluded && (g.needsSurface || g.needsCount) && (
                              <div className="px-3 pb-3 pt-1 border-t bg-white">
                                {g.needsSurface && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Label htmlFor={`surf-${g.id}`} className="text-xs">Surface (m²)</Label>
                                    <Input id={`surf-${g.id}`} type="number" min={1} value={sel.surface || 0}
                                      onChange={(e) => updateGeste(g.id, { surface: parseInt(e.target.value) || 0 })}
                                      className="w-24 h-8" />
                                  </div>
                                )}
                                {g.needsCount && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Label htmlFor={`cnt-${g.id}`} className="text-xs">Nombre</Label>
                                    <Input id={`cnt-${g.id}`} type="number" min={1} value={sel.count || 0}
                                      onChange={(e) => updateGeste(g.id, { count: parseInt(e.target.value) || 0 })}
                                      className="w-20 h-8" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ÉTAPE 5 — Coordonnées */}
            {step === 5 && (
              <>
                <h2 className="text-xl font-bold mb-2">Recevez votre estimation détaillée</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Un conseiller SupremEnergies vous rappelle sous 24h pour affiner votre projet et confirmer votre éligibilité.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fn">Prénom *</Label>
                    <Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 XX XX XX XX" className="mt-2" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Vos données restent confidentielles et ne sont utilisées que pour vous recontacter. Pas de spam.
                </p>
              </>
            )}

            {/* ÉTAPE 6 — Résultat */}
            {step === 6 && (
              <div className="py-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600" size={36} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Votre estimation détaillée</h2>
                  <p className="text-gray-600 text-sm">
                    Profil ANAH détecté : <span className="font-bold uppercase">{profInfo.label}</span>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white rounded-xl p-6 mb-6 text-center">
                  <div className="text-sm uppercase tracking-wide text-white/80 mb-1">Total estimé</div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    {result.total.toLocaleString("fr-FR")} €
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-xs uppercase">MaPrimeRénov'</div>
                      <div className="text-xl font-bold">{result.totalMPR.toLocaleString("fr-FR")} €</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/70 text-xs uppercase">Prime CEE</div>
                      <div className="text-xl font-bold">{result.totalCEE.toLocaleString("fr-FR")} €</div>
                    </div>
                  </div>
                </div>

                {/* Détail par geste */}
                <div className="mb-5">
                  <h3 className="font-bold text-sm mb-2 text-gray-700">Détail par travaux</h3>
                  <div className="space-y-2">
                    {result.gestes.map((g) => (
                      <div key={g.id} className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{g.label}</div>
                          {g.excluded && <div className="text-xs text-orange-600 mt-0.5">⚠️ {g.excluded}</div>}
                        </div>
                        {!g.excluded && (
                          <div className="text-right ml-3 flex-shrink-0">
                            <div className="font-bold text-supreme-primary">{(g.mpr + g.cee).toLocaleString("fr-FR")} €</div>
                            <div className="text-xs text-gray-500">MPR {g.mpr}€ + CEE {g.cee}€</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {result.recommandation && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                    <Sparkles className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-amber-900">{result.recommandation}</div>
                  </div>
                )}

                {result.warnings.map((w, i) => (
                  <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3 text-sm text-orange-900 flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" /> {w}
                  </div>
                ))}

                <p className="text-xs text-gray-500 mb-5">
                  Estimation calculée selon le barème officiel ANAH 2026 (parcours par geste). Le montant définitif dépend
                  du devis retenu, de la conformité technique des équipements et de l'écrêtement légal (cumul max
                  100% TTC profil Bleu, 90% Jaune, 80% Violet, 50% Rose).
                </p>

                <Button asChild size="lg" className="w-full bg-supreme-accent hover:bg-supreme-accent/90 text-white">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    Demander mon devis détaillé sous 48h <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
              </div>
            )}

            {/* Navigation */}
            {step < 6 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <Button variant="outline" onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))} disabled={step === 1}>
                  <ArrowLeft className="mr-2" size={16} /> Retour
                </Button>
                {step < 5 ? (
                  <Button onClick={() => setStep((s) => (s + 1) as Step)} disabled={!canProceed()} className="bg-supreme-primary hover:bg-supreme-primary/90">
                    Suivant <ArrowRight className="ml-2" size={16} />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!canProceed() || submitting} className="bg-supreme-accent hover:bg-supreme-accent/90">
                    {submitting ? (<><Loader2 className="mr-2 animate-spin" size={16} /> Calcul...</>) : (<>Voir mon estimation <ArrowRight className="ml-2" size={16} /></>)}
                  </Button>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Sources : Guide ANAH 2026, France Rénov', arrêtés du 18/08/2025, 15/12/2025 et 27/12/2025 pour les CEE.
          </p>
        </div>
      </section>

      <InternalLinksHub
        title="Choisissez votre poste de travaux"
        subtitle="Découvrez en détail chaque solution éligible aux aides 2026."
        links={[
          { to: "/services/isolation-thermique", label: "Isolation thermique", desc: "Combles, murs, planchers" },
          { to: "/services/pompe-a-chaleur", label: "Pompe à chaleur", desc: "Air/eau, air/air, géothermie" },
          { to: "/services/panneaux-solaires", label: "Panneaux solaires", desc: "Autoconsommation & revente" },
          { to: "/services/renovation-globale", label: "Rénovation globale", desc: "Parcours Accompagné" },
          { to: "/blog", label: "Guides MaPrimeRénov'", desc: "Articles & conseils 2026" },
          { to: "/devis-gratuit", label: "Demander un devis", desc: "Réponse sous 24h" },
        ]}
      />

      <CTA
        title="Prêt à concrétiser votre projet ?"
        subtitle="Notre équipe vous accompagne du devis à la fin du chantier, aides comprises."
      />
    </div>
  );
};

export default SimulateurAides;
