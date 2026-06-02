import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

type Lead = {
  id: string;
  email: string;
  first_name: string | null;
  postal_code: string | null;
  source: string;
  page_path: string | null;
  message: string | null;
  created_at: string;
  followup_due_at: string | null;
  followup_sent_at: string | null;
};

export default function AdminLeads() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r: any) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        const { data, error } = await supabase
          .from("leads" as any)
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);
        if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
        setLeads((data as any) || []);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const exportCsv = () => {
    const rows = [
      ["Date", "Email", "Prénom", "CP", "Source", "Page", "Message"],
      ...filtered.map((l) => [
        new Date(l.created_at).toISOString(),
        l.email,
        l.first_name ?? "",
        l.postal_code ?? "",
        l.source,
        l.page_path ?? "",
        (l.message ?? "").replace(/\n/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = leads.filter((l) =>
    filter ? `${l.email} ${l.first_name ?? ""} ${l.source} ${l.postal_code ?? ""}`.toLowerCase().includes(filter.toLowerCase()) : true,
  );

  if (loading) return <div className="container py-16 text-center text-muted-foreground">Chargement…</div>;

  if (isAdmin === false) {
    return (
      <div className="container py-16 max-w-xl mx-auto text-center space-y-4">
        <Helmet><title>Accès refusé</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <h1 className="text-2xl font-bold">Accès refusé</h1>
        <p className="text-muted-foreground">
          Votre compte n'a pas le rôle administrateur. Demandez à un administrateur existant de vous l'attribuer.
        </p>
        <Button variant="outline" onClick={signOut}>Se déconnecter</Button>
      </div>
    );
  }

  const stats = {
    total: leads.length,
    today: leads.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
    week: leads.filter((l) => Date.now() - new Date(l.created_at).getTime() < 7 * 86400000).length,
    pendingFollowup: leads.filter((l) => l.followup_due_at && !l.followup_sent_at && new Date(l.followup_due_at) <= new Date()).length,
  };

  return (
    <div className="container py-10 max-w-7xl">
      <Helmet><title>Leads — Admin SupremEnergies</title><meta name="robots" content="noindex,nofollow" /></Helmet>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground text-sm">Demandes entrantes capturées par les formulaires du site.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCsv}>Exporter CSV</Button>
          <Button variant="ghost" onClick={signOut}>Déconnexion</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total },
          { label: "Aujourd'hui", value: stats.today },
          { label: "7 derniers jours", value: stats.week },
          { label: "Relances J+3 en attente", value: stats.pendingFollowup },
        ].map((s) => (
          <div key={s.label} className="border rounded-lg p-4 bg-card">
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <input
        type="search"
        placeholder="Rechercher (email, prénom, source, CP…)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full md:w-96 mb-4 px-3 py-2 border rounded-md bg-background"
      />

      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2 font-semibold">Date</th>
              <th className="px-3 py-2 font-semibold">Email</th>
              <th className="px-3 py-2 font-semibold">Prénom</th>
              <th className="px-3 py-2 font-semibold">CP</th>
              <th className="px-3 py-2 font-semibold">Source</th>
              <th className="px-3 py-2 font-semibold">Page</th>
              <th className="px-3 py-2 font-semibold">Relance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t hover:bg-muted/30">
                <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                  {new Date(l.created_at).toLocaleString("fr-FR")}
                </td>
                <td className="px-3 py-2 font-medium">{l.email}</td>
                <td className="px-3 py-2">{l.first_name ?? "—"}</td>
                <td className="px-3 py-2">{l.postal_code ?? "—"}</td>
                <td className="px-3 py-2"><Badge variant="secondary">{l.source}</Badge></td>
                <td className="px-3 py-2 text-xs text-muted-foreground truncate max-w-[200px]">{l.page_path ?? "—"}</td>
                <td className="px-3 py-2 text-xs">
                  {l.followup_sent_at ? (
                    <Badge>envoyée</Badge>
                  ) : l.followup_due_at ? (
                    <span className="text-muted-foreground">
                      {new Date(l.followup_due_at) <= new Date() ? "à envoyer" : new Date(l.followup_due_at).toLocaleDateString("fr-FR")}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">Aucun lead</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
