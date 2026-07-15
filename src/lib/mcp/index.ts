import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listRecentLeads from "./tools/list-recent-leads";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listTestimonials from "./tools/list-testimonials";

// The OAuth issuer MUST be the direct Supabase host, built from the project ref.
// import.meta.env.VITE_SUPABASE_PROJECT_ID is inlined by Vite at build time so
// this file stays import-safe (no runtime env read at module top level).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "supremenergies-mcp",
  title: "SupremEnergies",
  version: "0.1.0",
  instructions:
    "Tools for SupremEnergies — French renovation and energy company. Read published blog articles, testimonials, and (for admins) recent website leads. All calls act as the signed-in SupremEnergies user; RLS restricts admin-only data.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listRecentLeads, listBlogPosts, getBlogPost, listTestimonials],
});
