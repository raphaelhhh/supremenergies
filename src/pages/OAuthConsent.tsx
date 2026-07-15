import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Typed wrapper for the beta supabase.auth.oauth namespace so TS accepts the calls.
type OAuthAuthorization = {
  authorization_id: string;
  redirect_url?: string;
  redirect_to?: string;
  client?: { name?: string; redirect_uri?: string; client_id?: string };
  scope?: string;
  scopes?: string[];
  user?: { email?: string };
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<OAuthAuthorization>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<OAuthAuthorization>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<OAuthAuthorization>>;
};
const supabaseOAuth = (): OAuthApi | null => {
  const api = (supabase.auth as unknown as { oauth?: OAuthApi }).oauth;
  return api ?? null;
};

const SCOPE_LABELS: Record<string, string> = {
  openid: "Vérifier votre identité",
  email: "Voir votre adresse email",
  profile: "Voir votre profil de base",
};

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthAuthorization | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Paramètre authorization_id manquant.");
      const api = supabaseOAuth();
      if (!api) {
        return setError(
          "Le serveur OAuth n'est pas encore disponible sur cette instance Supabase. Réessayez plus tard.",
        );
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        // Preserve the FULL consent URL so auth returns here.
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await api.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data ?? null);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const api = supabaseOAuth();
    if (!api) {
      setBusy(false);
      return setError("Le serveur OAuth n'est pas disponible.");
    }
    const { data, error } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("Aucune URL de redirection renvoyée par le serveur d'autorisation.");
    }
    window.location.href = target;
  };

  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(/\s+/) : []);
  const clientName = details?.client?.name ?? "Une application externe";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Autoriser l'accès — SupremEnergies</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="w-full max-w-md bg-card border rounded-xl p-8 shadow-sm space-y-5">
        {error ? (
          <>
            <h1 className="text-2xl font-bold">Autorisation impossible</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground">Chargement de la demande…</p>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-bold">
                Connecter {clientName} à SupremEnergies
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {clientName} pourra utiliser les outils SupremEnergies activés en agissant en votre nom
                pendant votre session.
              </p>
            </div>

            {scopes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Autorisations demandées
                </div>
                <ul className="text-sm space-y-1">
                  {scopes.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span aria-hidden>•</span>
                      <span>{SCOPE_LABELS[s] ?? `Autorisation supplémentaire : ${s}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Cela ne contourne pas les règles d'accès de SupremEnergies : les outils restent limités à ce
              que votre compte peut déjà voir ou faire.
            </p>

            <div className="flex gap-3 pt-2">
              <Button disabled={busy} onClick={() => decide(true)} className="flex-1">
                Approuver
              </Button>
              <Button
                disabled={busy}
                variant="outline"
                onClick={() => decide(false)}
                className="flex-1"
              >
                Refuser
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
