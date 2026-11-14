// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { leadBodySchema, marketingRecord } from "../_shared/lead-validation.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";
import { leadDetailCells } from "../_shared/lead-sheet-details.ts";
import { leadSheetAppendRequest } from "../_shared/lead-sheet-append.ts";
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const LEADS_SHEET_ID = "1D5d72iZhcDNpw22zkvXdL0Pinw_11mJ20tO1gEPDYlI";
const LEADS_TAB_ID = 623765645;

const SOURCE_LABELS: Record<string, string> = {
  home_lead_magnet: "Guide des aides",
  devis_multistep: "Demande de devis",
  contact_form: "Formulaire de contact",
  devis_rapide: "Demande de devis rapide",
  simulateur: "Simulateur d'aides",
  lead_magnet: "Guide des aides",
  newsletter: "Newsletter",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const text = await req.text();
    if (text.length > 20000) return new Response(JSON.stringify({ error: "request_too_large" }), { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const raw = JSON.parse(text);
    const parsed = leadBodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (parsed.data.website) return new Response(JSON.stringify({ error: "invalid_submission" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

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
      // consent is now explicitly the optional marketing choice, not permission to answer.
      consent: parsed.data.marketing_consent,
      metadata: { ...(parsed.data.metadata ?? {}), ...(phone ? { phone } : {}), ...marketingRecord(parsed.data.marketing_consent) },
      followup_due_at: null, // No marketing sender is configured; never schedule an unsolicited promotion.
    }).select("id").single();

    if (error) {
      console.error("Lead insert failed");
      return new Response(JSON.stringify({ error: "insert_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Preserve the existing simulation registry, without a separate public insert path.
    if (parsed.data.source === "simulateur" && parsed.data.email) {
      const m = parsed.data.metadata ?? {};
      const { error: simulationError } = await supabase.from("simulations").insert({
        email: parsed.data.email, phone, postal_code: parsed.data.postal_code,
        household_size: m.household_size, income_category: m.income_category,
        work_types: m.work_types, housing_type: m.housing_type, estimated_aid: m.estimated_aid,
        inputs: m, result: { profile: m.income_category, totalMPR: m.total_mpr, totalCEE: m.total_cee, total: m.estimated_aid },
      });
      if (simulationError) console.error("Simulation registry failed; lead retained");
    }

    // Existing Zapier integration now runs server-side after the durable insert.
    if (["contact_form", "devis_rapide"].includes(parsed.data.source)) {
      try {
        const zapier = await fetch("https://hooks.zapier.com/hooks/catch/23975075/uulr9bm/", {
          method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(5000),
          body: JSON.stringify({ timestamp: new Date().toISOString(), nom: parsed.data.first_name, name: parsed.data.first_name,
            email: parsed.data.email, telephone: phone, phone, message: parsed.data.message, source: parsed.data.source,
            type: SOURCE_LABELS[parsed.data.source], page_url: parsed.data.page_path, marketing_consent: parsed.data.marketing_consent }),
        });
        if (!zapier.ok) console.warn("Zapier copy failed; lead retained");
      } catch { console.warn("Zapier unavailable; lead retained"); }
    }

    // Ajout dans le Google Sheet de l'équipe (n'empêche jamais l'enregistrement du lead)
    try {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      const SHEETS_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
      if (LOVABLE_API_KEY && SHEETS_KEY) {
        const date = new Date().toLocaleString("fr-FR", {
          timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        }).replace(",", "");
        const details = (parsed.data.message ?? "").replace(/\s*\|\s*Tél:\s*\S+/, "");
        const row = [
          date,
          SOURCE_LABELS[parsed.data.source] ?? parsed.data.source,
          parsed.data.first_name ?? "",
          phone ?? "",
          parsed.data.email ?? "",
          parsed.data.postal_code ?? "",
          details,
          parsed.data.page_path ?? "",
          "Nouveau",
          "",
          ...leadDetailCells(parsed.data.metadata ?? {}),
        ];
        const res = await fetch(
          `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${LEADS_SHEET_ID}:batchUpdate`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": SHEETS_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(leadSheetAppendRequest(LEADS_TAB_ID, row)),
          },
        );
        if (!res.ok) console.error(`Sheet append failed [${res.status}]`);
      }
    } catch (sheetErr) {
      console.error("Sheet append failed");
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
      console.error("Lead alert email unavailable");
    }

    // Envoi du guide au visiteur qui l'a demandé
    let guideEmailed = false;
    const isGuideRequest =
      parsed.data.wants_guide === true ||
      /lead_magnet|aides2026|pillar_pac2026|^blog_/.test(parsed.data.source);
    if (isGuideRequest && parsed.data.email) {
      try {
        const r = await sendTemplateEmail("guide-aides", parsed.data.email, {
          templateData: { firstName: parsed.data.first_name ?? undefined },
          idempotencyKey: `guide-aides-${inserted.id}`,
        });
        guideEmailed = r?.sent === true;
      } catch (mailErr) {
        console.error("Guide email unavailable");
      }
    }

    // PDF is served statically from /guide-aides-renovation-2026.pdf
    return new Response(
      JSON.stringify({
        ok: true,
        download_url: "/guide-aides-renovation-2026.pdf",
        guide_emailed: guideEmailed,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("Lead request failed");
    return new Response(JSON.stringify({ error: "unexpected" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
