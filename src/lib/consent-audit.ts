import { supabase } from "@/integrations/supabase/client";
import { readChoice, saveChoices, type Choice, type Purpose } from "./consent";

export const NOTICE_VERSION = "2026-11-12";
export function saveAuditedChoices(choices: Record<Purpose, Choice>) {
  saveChoices(choices);
  // No visitor identifier or IP in the receipt, and never linked to leads.
  void supabase.functions.invoke("record-consent", { body: {
    notice_version: NOTICE_VERSION,
    analytics: readChoice("analytics") === "granted",
    advertising: readChoice("advertising") === "granted",
  } });
}