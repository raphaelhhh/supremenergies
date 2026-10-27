import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const schema = z.object({
  consent: z.literal(true),
  events: z.array(z.object({
    page_path: z.string().max(200).regex(/^\/[a-z0-9/-]*$/).refine(p => !/^\/(admin|auth)(\/|$)/.test(p)),
    event: z.enum(["page_view", "navigation_click", "quote_click", "phone_click", "email_click", "review_click", "form_submit"]),
  }).strict()).min(1).max(20),
}).strict();
const headers = { ...corsHeaders, "Content-Type": "application/json" };

// Intentionally public, write-only anonymous counters: no visitor identity or read access.
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers });
  try {
    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return new Response(JSON.stringify({ error: "invalid_anonymous_events" }), { status: 400, headers });
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Server not configured");
    const client = createClient(url, key);
    const { error } = await client.rpc("increment_site_audience", { p_events: parsed.data.events });
    if (error) throw new Error(error.message);
    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (error) {
    console.error("Anonymous audience error", error);
    return new Response(JSON.stringify({ error: "audience_save_failed" }), { status: 500, headers });
  }
});