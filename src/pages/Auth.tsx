import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
});

/** Only allow same-origin relative paths as post-auth redirect. */
function sanitizeNext(raw: string | null): string | null {
  if (!raw) return null;
  if (!raw.startsWith("/") || raw.startsWith("//")) return null;
  return raw;
}

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = sanitizeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const redirectAfterAuth = () => navigate(next ?? "/admin/leads", { replace: true });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) redirectAfterAuth();
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectAfterAuth();
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const emailRedirectTo = `${window.location.origin}${next ?? "/admin/leads"}`;
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo },
          });
    setLoading(false);
    if (error) {
      toast({ title: "Échec", description: error.message, variant: "destructive" });
    } else if (mode === "signup") {
      toast({ title: "Compte créé", description: "Vous êtes connecté." });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Connexion — Espace administrateur SupremEnergies</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <form onSubmit={submit} className="w-full max-w-md space-y-5 bg-card border rounded-xl p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Espace administrateur</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Connectez-vous pour accéder aux leads." : "Créez votre compte administrateur."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "..." : mode === "signin" ? "Se connecter" : "Créer le compte"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
        >
          {mode === "signin" ? "Pas encore de compte ? Créer un compte" : "Déjà inscrit ? Se connecter"}
        </button>
      </form>
    </div>
  );
}
