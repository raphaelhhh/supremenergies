import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Breadcrumb from "@/components/Breadcrumb";
import CTA from "@/components/CTA";

type Step = 1 | 2 | 3 | 4 | 5;

const incomeBrackets = {
  bleu: { label: "Très modestes (bleu)", aidMultiplier: 1, color: "bg-blue-500" },
  jaune: { label: "Modestes (jaune)", aidMultiplier: 0.85, color: "bg-yellow-500" },
  violet: { label: "Intermédiaires (violet)", aidMultiplier: 0.6, color: "bg-purple-500" },
  rose: { label: "Supérieurs (rose)", aidMultiplier: 0.35, color: "bg-pink-500" },
} as const;

const workOptions = [
  { id: "pac-air-eau", label: "Pompe à chaleur air/eau", baseAid: 5000 },
  { id: "pac-air-air", label: "Pompe à chaleur air/air", baseAid: 0 },
  { id: "isolation-combles", label: "Isolation des combles", baseAid: 1500 },
  { id: "isolation-murs", label: "Isolation des murs (ITE)", baseAid: 3000 },
  { id: "panneaux-solaires", label: "Panneaux solaires", baseAid: 2500 },
  { id: "ventilation", label: "Ventilation double flux", baseAid: 2000 },
];

const submitSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(10, "Téléphone invalide").max(20),
});

const SimulateurAides = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  // Inputs
  const [housingType, setHousingType] = useState<"maison" | "appartement">("maison");
  const [householdSize, setHouseholdSize] = useState(2);
  const [income, setIncome] = useState<keyof typeof incomeBrackets>("violet");
  const [postalCode, setPostalCode] = useState("");
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const calculateAid = () => {
    const baseAid = workOptions
      .filter((w) => selectedWorks.includes(w.id))
      .reduce((sum, w) => sum + w.baseAid, 0);
    const multiplier = incomeBrackets[income].aidMultiplier;
    const ceeBonus = selectedWorks.length >= 2 ? 2000 : selectedWorks.length === 1 ? 800 : 0;
    return Math.round(baseAid * multiplier + ceeBonus);
  };

  const estimatedAid = calculateAid();

  const handleSubmit = async () => {
    const parsed = submitSchema.safeParse({ email, phone });
    if (!parsed.success) {
      toast({
        title: "Champs invalides",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("simulations").insert({
        email: parsed.data.email,
        phone: parsed.data.phone,
        postal_code: postalCode,
        household_size: householdSize,
        income_category: income,
        work_types: selectedWorks,
        housing_type: housingType,
        estimated_aid: estimatedAid,
        inputs: { housingType, householdSize, income, postalCode, selectedWorks },
        result: { estimatedAid, ceeBonus: selectedWorks.length >= 2 ? 2000 : 800 },
      });
      if (error) throw error;
      setStep(5);
    } catch (e) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre simulation. Réessayez ou contactez-nous.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleWork = (id: string) => {
    setSelectedWorks((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 1) return !!housingType;
    if (step === 2) return householdSize > 0 && !!income;
    if (step === 3) return selectedWorks.length > 0;
    if (step === 4) return email.length > 0 && phone.length > 0;
    return true;
  };

  const title = "Simulateur MaPrimeRénov' 2026 | Estimez vos aides en 2 minutes | SupremEnergies";
  const description = "Calculez gratuitement le montant de vos aides MaPrimeRénov', CEE et bonus 2026 pour vos travaux de rénovation énergétique. Résultat instantané.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://supremenergies.com/simulateur-aides" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white py-12">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Simulateur d'aides" }]} />
          <div className="flex items-center gap-3 mt-4 mb-3">
            <Calculator size={32} />
            <span className="text-sm uppercase tracking-wide text-white/80">Simulateur gratuit</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Estimez vos aides MaPrimeRénov' 2026
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            En 4 étapes (2 minutes), découvrez le montant des aides auxquelles vous avez droit pour vos
            travaux de rénovation énergétique.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-2xl">
          {/* Progress */}
          {step < 5 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Étape {step}/4</span>
                <span>{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-supreme-primary transition-all"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-6">Quel est votre type de logement ?</h2>
                <RadioGroup value={housingType} onValueChange={(v) => setHousingType(v as any)} className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="maison" id="h-maison" />
                    <span className="font-medium">Maison individuelle</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="appartement" id="h-appart" />
                    <span className="font-medium">Appartement</span>
                  </label>
                </RadioGroup>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold mb-6">Votre foyer</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="household">Nombre de personnes dans le foyer</Label>
                    <Input
                      id="household"
                      type="number"
                      min={1}
                      max={10}
                      value={householdSize}
                      onChange={(e) => setHouseholdSize(parseInt(e.target.value) || 1)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">Catégorie de revenus MaPrimeRénov'</Label>
                    <RadioGroup value={income} onValueChange={(v) => setIncome(v as any)} className="space-y-2">
                      {Object.entries(incomeBrackets).map(([key, b]) => (
                        <label key={key} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value={key} id={key} />
                          <span className={`w-3 h-3 rounded-full ${b.color}`} />
                          <span className="font-medium">{b.label}</span>
                        </label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs text-gray-500 mt-2">
                      Les catégories dépendent de vos revenus et de la composition du foyer (barème ANAH).
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="postal">Code postal</Label>
                    <Input
                      id="postal"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="75015"
                      maxLength={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold mb-2">Quels travaux envisagez-vous ?</h2>
                <p className="text-sm text-gray-600 mb-6">Sélectionnez un ou plusieurs travaux.</p>
                <div className="space-y-2">
                  {workOptions.map((w) => (
                    <label
                      key={w.id}
                      className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedWorks.includes(w.id)}
                        onCheckedChange={() => toggleWork(w.id)}
                      />
                      <span className="font-medium flex-1">{w.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-bold mb-2">Recevez votre estimation détaillée</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Un conseiller SupremEnergies vous appellera pour affiner votre projet. Vos données restent confidentielles.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@exemple.fr"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="mt-2"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-600" size={36} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Votre estimation</h2>
                <p className="text-gray-600 mb-6">
                  Sur la base de vos réponses, vous pourriez bénéficier d'environ :
                </p>
                <div className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white rounded-xl p-8 mb-6">
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    {estimatedAid.toLocaleString("fr-FR")} €
                  </div>
                  <div className="text-white/90">d'aides estimées (MaPrimeRénov' + CEE)</div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Estimation indicative. Un conseiller vous contactera sous 24h pour un calcul précis et un devis personnalisé.
                </p>
                <Button asChild className="bg-supreme-accent hover:bg-supreme-accent/90 text-white px-6 py-5">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    Demander mon devis détaillé <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
              </div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                  disabled={step === 1}
                >
                  <ArrowLeft className="mr-2" size={16} /> Retour
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={() => setStep((s) => (s + 1) as Step)}
                    disabled={!canProceed()}
                    className="bg-supreme-primary hover:bg-supreme-primary/90"
                  >
                    Suivant <ArrowRight className="ml-2" size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitting}
                    className="bg-supreme-accent hover:bg-supreme-accent/90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={16} /> Calcul...
                      </>
                    ) : (
                      <>
                        Voir mon estimation <ArrowRight className="ml-2" size={16} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Simulation à titre indicatif. Le montant définitif dépend de l'audit énergétique et de la nature exacte des travaux.
          </p>
        </div>
      </section>

      <CTA
        title="Prêt à concrétiser votre projet ?"
        subtitle="Notre équipe vous accompagne du devis à la fin du chantier, aides comprises."
      />
    </div>
  );
};

export default SimulateurAides;
