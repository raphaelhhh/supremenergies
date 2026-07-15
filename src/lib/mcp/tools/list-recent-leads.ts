import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_recent_leads",
  title: "List recent leads",
  description:
    "List the most recent leads captured by the SupremEnergies website forms (quote requests, contact, lead magnet). Requires admin role — RLS enforces this on the server.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Number of leads to return (max 100)."),
    source: z.string().max(64).optional().describe("Optional source filter (e.g. 'devis-gratuit', 'contact', 'lead_magnet')."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, source }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("leads")
      .select("id, email, first_name, postal_code, source, page_path, message, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (source) query = query.eq("source", source);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { leads: data ?? [] },
    };
  },
});
