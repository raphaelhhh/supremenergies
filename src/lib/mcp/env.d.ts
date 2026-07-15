// Ambient types for MCP tool files that run in the Deno edge runtime.
// The Vite plugin bundles src/lib/mcp/**.ts into supabase/functions/mcp/index.ts
// where Deno provides `process.env` via its Node compat layer.
declare const process: {
  env: Record<string, string | undefined>;
};
