import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Star,
  Award,
  Clock,
} from "lucide-react";
import heroImage from "@/assets/energy-label.png";

import { trackLead, getLeadSourceFromQuery } from "@/lib/track-lead";

const STORAGE_KEY = "sce_devis_state";

type FormState = {
  work_types: string[];
  housing_type: string;
  surface: string;
  postal_code: string;
  first_name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initialState: FormState = {
  work_types: [],
  housing_type: "",
  surface: "",
  postal_code: "",
  first_name: "",
  email: "",
  phone: "",
  consent: false,
};

const WORK_OPTIONS = [
  "Pompe à chaleur",
  "Isolation thermique",
  "Panneaux solaires",
  "Rénovation globale",
  "Chauffe-eau thermodynamique",
  "Autre",
];

const HOUSING_OPTIONS = ["Maison individuelle", "Appartement", "Copropriété", "Local professionnel"];

const trackEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (w.dataLayer) w.dataLayer.push({ event, ...data });
};

const step3Schema = z.object({
  first_name: z.string().trim().min(1, "Prénom requis").max(80),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}$/, "Téléphone invalide")
    .max(32),
  consent: z.literal(true, { errorMap: () => ({ message: "Consentement requis" }) }),
});

const DevisGratuit = () => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FormState>;
        setState({ ...initialState, ...parsed, consent: false });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, consent: false }));
    } catch {
      // ignore
    }
  }, [state]);

  useEffect(() => {
    trackEvent("form_step_view", { step });
  }, [step]);

  const toggleWork = (w: string) => {
    setState((s) =>
      s.work_types.includes(w)
        ? { ...s, work_types: s.work_types.filter((x) => x !== w) }
        : { ...s, work_types: [...s.work_types, w] },
    );
  };

  const canNext = useMemo(() => {
    if (step === 1) return state.work_types.length > 0;
    if (step === 2) return state.housing_type !== "" && /^\d{5}$/.test(state.postal_code);
    return true;
  }, [step, state]);

  const next = () => {
    if (!canNext) return;
    trackEvent("form_step_complete", { step });
    setStep((s) => Math.min(4, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setError(null);
    const parsed = step3Schema.safeParse({
      first_name: state.first_name,
      email: state.email,
      phone: state.phone,
      consent: state.consent,
    });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Formulaire invalide");
      return;
    }

    setLoading(true);
    try {
      const { error: fnErr } = await supabase.functions.invoke("send-lead-magnet", {
        body: {
          email: parsed.data.email,
          first_name: parsed.data.first_name,
          postal_code: state.postal_code || null,
          source: "devis_multistep",
          page_path: "/devis-gratuit",
          consent: true,
          message: `Travaux: ${state.work_types.join(", ")} | Logement: ${state.housing_type} | Surface: ${state.surface || "n/a"} | Tél: ${parsed.data.phone}`,
          metadata: {
            work_types: state.work_types,
            housing_type: state.housing_type,
            surface: state.surface,
            phone: parsed.data.phone,
          },
        },
      });
      if (fnErr) throw fnErr;

      // GA4 standard conversion event (à marquer comme conversion dans GA4)
      trackLead({
        source: getLeadSourceFromQuery("devis_multistep"),
        project_type: state.work_types[0] ?? null,
        value: 50,
        extra: {
          work_types: state.work_types,
          housing_type: state.housing_type,
          postal_code: state.postal_code,
        },
      });
      trackEvent("multistep_complete", {
        work_types: state.work_types,
        housing_type: state.housing_type,
      });
      trackEvent("form_submit", { form: "devis_multistep" });

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setDone(true);
    } catch (e) {
      console.error(e);
      setError("Une erreur est survenue. Réessayez ou appelez le 01 86 04 68 89.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div>
      <Helmet>
        <title>Devis Gratuit Rénovation Énergétique 48h | 11 000€ d'aides</title>
        <meta
          name="description"
          content="✓ Devis gratuit sous 48h en 4 étapes. Pompe à chaleur, isolation, solaire. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026. ★ 4.8/5"
        />
        <link rel="canonical" href="https://supremenergies.com/devis-gratuit" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="bg-gradient-to-br from-supreme-light via-white to-supreme-light/40 py-8 md:py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Form column */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <div className="inline-flex items-center gap-2 bg-supreme-primary/10 text-supreme-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                <Clock className="h-4 w-4" /> Réponse sous 48h
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Votre devis personnalisé en <span className="text-supreme-primary">2 min</span>
              </h1>
              <p className="text-sm text-gray-600 mb-5">
                4 questions rapides pour estimer vos aides et préparer votre devis.
              </p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Étape {step} sur 4</span>
                  <span>{Math.round(progress)} %</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-supreme-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {done ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-14 w-14 text-supreme-primary mx-auto mb-3" />
                  <h2 className="text-xl font-bold mb-2">Merci {state.first_name} !</h2>
                  <p className="text-muted-foreground mb-4">
                    Nous vous recontactons sous 48h au {state.phone}. Une question urgente ?
                  </p>
                  <Button asChild variant="outline" className="mr-2">
                    <a href="tel:0186046889">
                      <Phone className="h-4 w-4 mr-2" /> 01 86 04 68 89
                    </a>
                  </Button>
                  <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                    <Link to="/simulateur-aides">Estimer mes aides</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {/* Step 1 — Travaux */}
                  {step === 1 && (
                    <div>
                      <h2 className="font-semibold mb-3">Quels travaux envisagez-vous ?</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {WORK_OPTIONS.map((w) => {
                          const active = state.work_types.includes(w);
                          return (
                            <button
                              key={w}
                              type="button"
                              onClick={() => toggleWork(w)}
                              className={`text-left text-sm border rounded-lg px-3 py-3 transition ${
                                active
                                  ? "border-supreme-primary bg-supreme-primary/10 text-supreme-primary font-semibold"
                                  : "border-gray-200 hover:border-supreme-primary/50"
                              }`}
                            >
                              {active && <CheckCircle2 className="inline h-4 w-4 mr-1" />} {w}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Logement */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="font-semibold">Type de logement</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {HOUSING_OPTIONS.map((h) => (
                            <button
                              key={h}
                              type="button"
                              onClick={() => setState((s) => ({ ...s, housing_type: h }))}
                              className={`text-left text-sm border rounded-lg px-3 py-2.5 transition ${
                                state.housing_type === h
                                  ? "border-supreme-primary bg-supreme-primary/10 text-supreme-primary font-semibold"
                                  : "border-gray-200 hover:border-supreme-primary/50"
                              }`}
                            >
                              {h}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="surface">Surface (m²)</Label>
                          <Input
                            id="surface"
                            type="text"
                            inputMode="numeric"
                            placeholder="ex. 90"
                            value={state.surface}
                            onChange={(e) =>
                              setState((s) => ({ ...s, surface: e.target.value.replace(/\D/g, "").slice(0, 4) }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="postal">Code postal *</Label>
                          <Input
                            id="postal"
                            type="text"
                            inputMode="numeric"
                            placeholder="75001"
                            value={state.postal_code}
                            onChange={(e) =>
                              setState((s) => ({
                                ...s,
                                postal_code: e.target.value.replace(/\D/g, "").slice(0, 5),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 — Contact */}
                  {step === 3 && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="first">Prénom *</Label>
                        <Input
                          id="first"
                          value={state.first_name}
                          onChange={(e) => setState((s) => ({ ...s, first_name: e.target.value }))}
                          maxLength={80}
                        />
                      </div>
                      <div>
                        <Label htmlFor="em">Email *</Label>
                        <Input
                          id="em"
                          type="email"
                          value={state.email}
                          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                          maxLength={255}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ph">Téléphone *</Label>
                        <Input
                          id="ph"
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={state.phone}
                          onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
                          maxLength={32}
                        />
                      </div>
                      <label className="flex items-start gap-2 text-xs text-muted-foreground pt-1 cursor-pointer">
                        <Checkbox
                          checked={state.consent}
                          onCheckedChange={(v) => setState((s) => ({ ...s, consent: v === true }))}
                          className="mt-0.5"
                        />
                        <span>
                          J'accepte d'être contacté par SupremEnergies pour ce projet. Voir notre{" "}
                          <Link to="/privacy" className="underline">politique de confidentialité</Link>.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Step 4 — Récap */}
                  {step === 4 && (
                    <div className="space-y-3">
                      <h2 className="font-semibold">Récapitulatif</h2>
                      <ul className="text-sm text-gray-700 space-y-1.5 bg-supreme-light/40 p-4 rounded-lg">
                        <li><strong>Travaux :</strong> {state.work_types.join(", ") || "—"}</li>
                        <li><strong>Logement :</strong> {state.housing_type || "—"} {state.surface ? `(${state.surface} m²)` : ""}</li>
                        <li><strong>Code postal :</strong> {state.postal_code || "—"}</li>
                        <li><strong>Contact :</strong> {state.first_name} · {state.email} · {state.phone}</li>
                      </ul>
                      <p className="text-xs text-muted-foreground">
                        Un conseiller vous rappelle sous 48h pour affiner votre projet et chiffrer les aides.
                      </p>
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-red-600 mt-3" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-between gap-2 mt-6">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={back} disabled={loading}>
                        <ArrowLeft className="h-4 w-4 mr-1" /> Retour
                      </Button>
                    ) : (
                      <span />
                    )}
                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={next}
                        disabled={!canNext}
                        className="bg-supreme-primary hover:bg-supreme-primary/90"
                      >
                        Continuer <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="bg-supreme-primary hover:bg-supreme-primary/90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Envoi...
                          </>
                        ) : (
                          <>Envoyer ma demande</>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}

              <p className="text-xs text-gray-500 mt-6 text-center">
                Vous préférez nous parler ? Appelez le{" "}
                <a href="tel:+33186046889" className="text-supreme-primary underline">
                  01 86 04 68 89
                </a>{" "}
                — réponse immédiate.
              </p>
            </div>

            {/* Pitch column */}
            <div className="hidden lg:block">
              <img
                src={heroImage}
                alt="Aides MaPrimeRénov' 2026 rénovation énergétique"
                className="rounded-2xl shadow-2xl w-full mb-6"
              />
              <ul className="space-y-3 mb-6">
                {[
                  "Devis détaillé personnalisé sous 48h",
                  "Estimation des aides (MaPrimeRénov', CEE, éco-PTZ)",
                  "Conseiller dédié à votre projet",
                  "Garantie décennale sur tous les travaux",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-supreme-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-1 font-semibold">4.8/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-supreme-primary" /> Garantie décennale
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-supreme-primary" /> +1000 projets
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevisGratuit;
