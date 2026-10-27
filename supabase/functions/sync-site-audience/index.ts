import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const SHEET_ID = "1D5d72iZhcDNpw22zkvXdL0Pinw_11mJ20tO1gEPDYlI";
const GATEWAY_URL = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}`;
const headers = { ...corsHeaders, "Content-Type": "application/json" };
const labels: Record<string, string> = {
  page_view: "Page consultée", navigation_click: "Lien interne", quote_click: "Clic devis",
  phone_click: "Clic téléphone", email_click: "Clic email", review_click: "Clic avis Google", form_submit: "Formulaire envoyé",
};

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers });
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Server not configured");
    const client = createClient(url, key);
    const token = req.headers.get("x-audience-sync-token");
    const { data: settings } = token
      ? await client.from("audience_sync_settings").select("id").eq("token", token).maybeSingle()
      : { data: null };
    // Scheduled calls use a private rotating-capable token; manual calls require a validated admin JWT.
    if (!settings) {
      const jwt = req.headers.get("Authorization")?.replace(/^Bearer /, "");
      if (!jwt) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers });
      const { data: userData, error: authError } = await client.auth.getUser(jwt);
      if (authError || !userData.user) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers });
      const { data: admin } = await client.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
      if (!admin) return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers });
    }
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    const sheetKey = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!apiKey || !sheetKey) throw new Error("Google Sheets connection unavailable");
    const { data, error } = await client.from("site_audience_daily").select("day,page_path,event,total")
      .gte("day", new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10))
      .order("day", { ascending: false }).order("page_path").order("event").limit(20000);
    if (error) throw new Error(error.message);
    const gatewayHeaders = { Authorization: `Bearer ${apiKey}`, "X-Connection-Api-Key": sheetKey, "Content-Type": "application/json" };
    const values = [
      ["Date (Paris)", "Page", "Interaction", "Nombre (pas de personnes uniques)", "Mise à jour", "Périmètre"],
      ...(data ?? []).map(row => [row.day, row.page_path, labels[row.event] ?? row.event, row.total, new Date().toISOString(), "Visiteurs ayant accepté les cookies uniquement"]),
    ];
    // Only the managed Audience tab is rewritten, never the team's Leads statuses/comments.
    const cleared = await fetch(`${GATEWAY_URL}/values/Audience!A:F:clear`, {
      method: "POST", headers: gatewayHeaders, body: JSON.stringify({}),
    });
    if (!cleared.ok) {
      const details = await cleared.text();
      console.error(`Audience clear failed [${cleared.status}]: ${details}`);
      return new Response(JSON.stringify({ error: "Google Sheets update failed", status: cleared.status, details }), { status: cleared.status, headers });
    }
    const response = await fetch(`${GATEWAY_URL}/values:batchUpdate`, {
      method: "POST", headers: gatewayHeaders,
      body: JSON.stringify({ valueInputOption: "RAW", data: [{ range: "Audience!A1:F20001", values }] }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error(`Audience sheet failed [${response.status}]: ${details}`);
      return new Response(JSON.stringify({ error: "Google Sheets update failed", status: response.status, details }), { status: response.status, headers });
    }
    return new Response(JSON.stringify({ ok: true, rows: values.length - 1 }), { headers });
  } catch (error) {
    console.error("Audience sync error", error);
    return new Response(JSON.stringify({ error: "audience_sync_failed" }), { status: 500, headers });
  }
});