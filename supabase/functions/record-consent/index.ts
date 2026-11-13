import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
const schema = z.object({ notice_version: z.literal("2026-11-12"), analytics: z.boolean(), advertising: z.boolean() }).strict();
const headers = { ...corsHeaders, "Content-Type": "application/json" };
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return new Response(JSON.stringify({ error: "invalid_choice" }), { status: 400, headers });
  const url = Deno.env.get("SUPABASE_URL"), key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return new Response(JSON.stringify({ error: "unavailable" }), { status: 503, headers });
  const { error } = await createClient(url, key).from("consent_receipts").insert(parsed.data);
  return new Response(JSON.stringify({ ok: !error }), { status: error ? 503 : 200, headers });
});