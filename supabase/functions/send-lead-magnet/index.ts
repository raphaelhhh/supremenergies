// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const SOURCE_LABELS: Record<string, string> = {
  devis_multistep: "Demande de devis",
  contact_form: "Formulaire de contact",
  simulateur: "Simulateur d'aides",
  lead_magnet: "Guide des aides",
  newsletter: "Newsletter",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  email: z.string().trim().email().max(255).optional().nullable(),
  phone: z.string().trim().max(32).optional().nullable(),
  first_name: z.string().trim().max(80).optional().nullable(),
  postal_code: z.string().trim().max(16).optional().nullable(),
  source: z.string().trim().max(64).default("lead_magnet"),
  page_path: z.string().trim().max(255).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  consent: z.boolean().default(false),
  metadata: z.record(z.any()).optional().nullable(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const raw = await req.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!parsed.data.email && !parsed.data.phone) {
      return new Response(JSON.stringify({ error: "email_or_phone_required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Schedule J+3 nurturing follow-up
    const followupDue = new Date();
    followupDue.setDate(followupDue.getDate() + 3);

    const phone = parsed.data.phone ?? (parsed.data.metadata?.phone as string | undefined) ?? null;
    const { data: inserted, error } = await supabase.from("leads").insert({
      email: parsed.data.email ?? null,
      first_name: parsed.data.first_name ?? null,
      postal_code: parsed.data.postal_code ?? null,
      source: parsed.data.source,
      page_path: parsed.data.page_path ?? null,
      message: parsed.data.message ?? null,
      consent: parsed.data.consent,
      metadata: { ...(parsed.data.metadata ?? {}), ...(phone ? { phone } : {}) },
      followup_due_at: parsed.data.email ? followupDue.toISOString() : null,
    }).select("id").single();

    if (error) {
      console.error("Lead insert error", error);
      return new Response(JSON.stringify({ error: "insert_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Alerte e-mail à l'équipe (n'empêche jamais l'enregistrement du lead)
    try {
      await sendTemplateEmail("new-lead-alert", "admin@supremenergies.com", {
        templateData: {
          sourceLabel: SOURCE_LABELS[parsed.data.source] ?? parsed.data.source,
          name: parsed.data.first_name ?? undefined,
          phone: phone ?? undefined,
          email: parsed.data.email ?? undefined,
          postalCode: parsed.data.postal_code ?? undefined,
          message: parsed.data.message ?? undefined,
          pagePath: parsed.data.page_path ?? undefined,
        },
        idempotencyKey: `new-lead-alert-${inserted.id}`,
      });
    } catch (mailErr) {
      console.error("Lead alert email failed", mailErr);
    }

    // PDF is served statically from /guide-aides-renovation-2026.pdf
    return new Response(
      JSON.stringify({
        ok: true,
        download_url: "/guide-aides-renovation-2026.pdf",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("send-lead-magnet error", e);
    return new Response(JSON.stringify({ error: "unexpected" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
