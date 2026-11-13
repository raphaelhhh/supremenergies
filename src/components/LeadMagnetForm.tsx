import { useState } from "react";
import { Download, Loader2, CheckCircle2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/track-lead";
import FormPrivacy from "./FormPrivacy";
import FormHoneypot from "./FormHoneypot";
import { trackAnalyticsEvent } from "@/lib/google-analytics";

const schema = z.object({
  first_name: z.string().trim().min(1, "Prénom requis").max(80),
  email: z.string().trim().email("Email invalide").max(255),
  postal_code: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Code postal à 5 chiffres")
    .optional()
    .or(z.literal("")),
  consent: z.boolean(),
});

type Props = {
  source?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
};

const trackEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  void trackAnalyticsEvent(event, data);
};

const LeadMagnetForm = ({
  source = "lead_magnet_aides2026",
  compact = false,
  title = "Recevez gratuitement le Guide Aides Rénovation 2026",
  subtitle = "MaPrimeRénov', primes CEE, éco-PTZ et TVA réduite : guide PDF gratuit. Aides soumises à conditions et à confirmation.",
}: Props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [postal, setPostal] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [guideEmailed, setGuideEmailed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({
      first_name: firstName,
      email,
      postal_code: postal,
      consent,
    });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Formulaire invalide");
      return;
    }

    setLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke(
        "send-lead-magnet",
        {
          body: {
            email: parsed.data.email,
            first_name: parsed.data.first_name,
            postal_code: parsed.data.postal_code || null,
            source,
            page_path: typeof window !== "undefined" ? window.location.pathname : null,
            consent: true,
            marketing_consent: consent,
            website,
            wants_guide: true,
          },
        },
      );
      if (fnErr) throw fnErr;
      const url = (data as { download_url?: string })?.download_url ?? "/guide-aides-renovation-2026.pdf";
      setGuideEmailed((data as { guide_emailed?: boolean })?.guide_emailed === true);

      trackEvent("lead_magnet_submit", { source });
      // Conversions GA4 + Google Ads + Meta (avec consentement visiteur)
      trackLead({
        source: "lead_magnet",
        value: 20,
        currency: "EUR",
        extra: { lead_magnet_source: source },
      });

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "guide-aides-renovation-2026.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      trackEvent("lead_magnet_download", { source });
      setDone(true);
    } catch (err) {
      setError("Une erreur est survenue. Réessayez ou appelez le 01 86 04 68 89.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white border border-supreme-primary/20 rounded-2xl p-6 md:p-8 text-center shadow-lg">
        <CheckCircle2 className="h-12 w-12 text-supreme-primary mx-auto mb-3" />
        <h3 className="text-xl md:text-2xl font-bold mb-2">Merci {firstName} !</h3>
        <p className="text-muted-foreground">
          Votre guide est en cours de téléchargement
          {guideEmailed
            ? " et vous le recevrez aussi par e-mail"
            : ""}
          . Si rien ne se passe,{" "}
          <a
            href="/guide-aides-renovation-2026.pdf"
            className="text-supreme-primary underline"
            download
          >
            cliquez ici
          </a>
          .
        </p>
        {!guideEmailed && <p role="status" className="mt-3 text-sm text-muted-foreground">L’envoi par e-mail n’a pas abouti. Votre guide reste disponible au téléchargement.</p>}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white border border-supreme-primary/20 rounded-2xl shadow-lg ${
        compact ? "p-5" : "p-6 md:p-8"
      }`}
    >
      <FormHoneypot value={website} onChange={setWebsite} />
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-supreme-primary/10 p-2 rounded-lg flex-shrink-0">
          <Gift className="h-6 w-6 text-supreme-primary" />
        </div>
        <div>
          <h3 className={`font-bold ${compact ? "text-lg" : "text-xl md:text-2xl"}`}>
            {title}
          </h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <Input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          maxLength={80}
          aria-label="Prénom"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
          aria-label="Email"
        />
      </div>
      <Input
        type="text"
        placeholder="Code postal (optionnel)"
        value={postal}
        onChange={(e) => setPostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
        maxLength={5}
        aria-label="Code postal"
        className="mb-3"
      />

      <div className="mb-4"><p className="mb-2 text-sm text-muted-foreground">Votre e-mail sert à envoyer le guide demandé, sans inscription automatique aux offres.</p><FormPrivacy marketing={consent} onMarketingChange={setConsent} /></div>

      {error && (
        <p className="text-sm text-red-600 mb-3" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-supreme-primary hover:bg-supreme-primary/90 text-white"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Envoi...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" /> Recevoir le guide PDF gratuit
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadMagnetForm;
