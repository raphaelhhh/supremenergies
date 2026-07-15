/// <reference types="vite/client" />

// Ambient `process` for MCP tool files bundled into a Deno edge function.
declare const process: {
  env: Record<string, string | undefined>;
};
