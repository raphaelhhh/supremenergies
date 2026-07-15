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
  name: "list_testimonials",
  title: "List customer testimonials",
  description: "List published customer testimonials for SupremEnergies (name, city, service, rating, savings).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(20),
    service: z.string().max(64).optional().describe("Filter by service (e.g. 'pompe-a-chaleur', 'isolation')."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, service }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("testimonials")
      .select("id, name, city, service, content, rating, savings, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .limit(limit);
    if (service) query = query.eq("service", service);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { testimonials: data ?? [] },
    };
  },
});
