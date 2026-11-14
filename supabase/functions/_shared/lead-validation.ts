import { z } from "npm:zod@3";
const short = z.string().trim().max(80);
const amount = z.number().finite().nonnegative().max(10000000);
export const leadBodySchema = z.object({
  email: z.string().trim().email().max(255).optional().nullable(),
  phone: z.string().trim().regex(/^(?:\+?33|0)[1-9](?:[ .-]?\d{2}){4}$/).max(32).optional().nullable(),
  first_name: short.optional().nullable(),
  postal_code: z.string().trim().max(16).optional().nullable(),
  source: z.string().trim().max(64).default("lead_magnet"),
  page_path: z.string().regex(/^\/[a-z0-9/-]*$/).max(255).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  consent: z.boolean().default(false),
  marketing_consent: z.boolean().default(false),
  website: z.string().max(200).default(""),
  wants_guide: z.boolean().optional(),
  metadata: z.object({
    guide_path: z.string().regex(/^\/blog\/[a-z0-9-]{1,180}$/).optional(),
    journey_stage: z.enum(["guide_simulation", "simulation", "guide_simulation_quote", "simulation_quote", "quote"]).optional(),
    phone: z.string().max(32).optional(),
    income_category: z.enum(["bleu", "jaune", "violet", "rose"]).optional(),
    housing_type: short.optional(), housing_age: z.enum([">15", "<15"]).optional(),
    owner_status: z.enum(["occupant", "bailleur", "copro"]).optional(),
    current_heating: short.optional(), household_size: z.number().int().min(1).max(100).optional(),
    rfr: amount.optional(), region: z.enum(["idf", "autres"]).optional(),
    surface: z.union([z.string().max(8), amount]).optional(),
    work_types: z.array(short).max(20).optional(),
    work_details: z.array(z.object({ label: z.string().max(150), surface: amount.optional(), count: z.number().int().min(0).max(10000).optional() }).strict()).max(20).optional(),
    estimated_aid: amount.optional(), total_mpr: amount.optional(), total_cee: amount.optional(),
  }).strict().optional().nullable(),
}).strict().refine(data => !!(data.email || data.phone), { message: "email_or_phone_required" })
  .refine(data => data.source !== "newsletter" || data.marketing_consent, { message: "newsletter_choice_required" });

export function marketingRecord(accepted: boolean) {
  return { marketing_consent: accepted, marketing_notice_version: "2026-11-12", marketing_choice_at: new Date().toISOString(), processing_basis: "requested_service" };
}