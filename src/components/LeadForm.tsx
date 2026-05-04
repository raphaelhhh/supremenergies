import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ZAPIER_HOOK = "https://hooks.zapier.com/hooks/catch/23975075/uulr9bm/";

const PROJECTS = [
  "Pompe à chaleur",
  "Isolation thermique",
  "Panneaux solaires",
  "Rénovation globale",
  "Eau chaude / Adoucisseur",
  "Je ne sais pas encore",
];

interface LeadFormProps {
  /** Identifiant pour tracker la source du lead (ex: "page-pac", "service-city-pac-paris"). */
  source: string;
  /** Préselection du type de projet. */
  defaultProject?: string;
  /** Préselection ville. */
  defaultCity?: string;
  /** Titre du formulaire. */
  title?: string;
  /** Variante compacte (utilisée dans les CTA inline). */
  compact?: boolean;
  /** Affiche un texte légal court sous le bouton. */
  showLegal?: boolean;
}

/**
 * Formulaire de capture lead : 4 champs, post Zapier (no-cors).
 * Réutilisable sur toutes les pages — friction réduite vs Google Form externe.
 */
const LeadForm = ({
  source,
  defaultProject = PROJECTS[0],
  defaultCity = "",
  title = "Recevez votre devis gratuit en 48h",
  compact = false,
  showLegal = true,
}: LeadFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [project, setProject] = useState(defaultProject);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !city.trim()) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    // Validation téléphone FR très souple
    const cleaned = phone.replace(/[\s.\-]/g, "");
    if (!/^(?:\+?33|0)[1-9]\d{8}$/.test(cleaned)) {
      setError("Numéro de téléphone invalide (ex : 06 12 34 56 78).");
      return;
    }

    setLoading(true);
    try {
      await fetch(ZAPIER_HOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          type: "Lead Devis",
          source,
          name: name.trim(),
          phone: cleaned,
          city: city.trim(),
          project,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      // Tracking GTM
      if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "lead_submit",
          lead_source: source,
          lead_project: project,
        });
      }
      // Tracking Meta Pixel
      if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq("track", "Lead", {
          content_name: project,
          content_category: source,
        });
      }

      setDone(true);
    } catch {
      setError("Une erreur est survenue. Réessayez ou appelez-nous au 01 86 04 68 89.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 border border-supreme-primary/20 shadow-sm text-center">
        <CheckCircle2 className="text-supreme-primary mx-auto mb-3" size={48} />
        <h3 className="text-xl font-bold mb-2 text-gray-900">Demande envoyée ✓</h3>
        <p className="text-gray-700">
          Un conseiller SupremEnergies vous rappelle sous 48h ouvrées.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Besoin d'aller plus vite ?{" "}
          <a href="tel:0186046889" className="text-supreme-primary font-semibold">
            01 86 04 68 89
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${
        compact ? "p-5" : "p-6 md:p-7"
      }`}
      aria-label="Formulaire de demande de devis"
    >
      {title && (
        <h3 className={`font-bold text-gray-900 mb-4 ${compact ? "text-lg" : "text-xl"}`}>
          {title}
        </h3>
      )}

      <div className="space-y-3">
        <div>
          <label htmlFor={`lf-name-${source}`} className="sr-only">
            Nom
          </label>
          <Input
            id={`lf-name-${source}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor={`lf-phone-${source}`} className="sr-only">
            Téléphone
          </label>
          <Input
            id={`lf-phone-${source}`}
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone (ex : 06 12 34 56 78)"
            autoComplete="tel"
            required
          />
        </div>
        <div>
          <label htmlFor={`lf-city-${source}`} className="sr-only">
            Ville
          </label>
          <Input
            id={`lf-city-${source}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Votre ville"
            autoComplete="address-level2"
            required
          />
        </div>
        <div>
          <label htmlFor={`lf-project-${source}`} className="sr-only">
            Type de projet
          </label>
          <select
            id={`lf-project-${source}`}
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {PROJECTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-supreme-primary hover:bg-supreme-primary/90 text-white py-5 text-base"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} /> Envoi…
          </>
        ) : (
          "Recevoir mon devis gratuit"
        )}
      </Button>

      {showLegal && (
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          En envoyant ce formulaire, vous acceptez d'être recontacté par SupremEnergies. Vos
          données ne sont jamais cédées à des tiers.{" "}
          <a href="/privacy" className="underline hover:text-supreme-primary">
            Confidentialité
          </a>
          .
        </p>
      )}
    </form>
  );
};

export default LeadForm;
