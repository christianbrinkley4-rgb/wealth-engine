import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
    exclude: ["**/node_modules/**", ".cache/**", ".next/**", ".next-preview/**", ".next-verify/**"],
  },
  resolve: {
    alias: {
      "@": root,
      // The website-inquiry Edge Function runs on Deno and imports supabase-js
      // by its npm: specifier, which Node cannot resolve. Point it at a stub so
      // the function's request handling is testable here. Nothing in the
      // application imports this specifier; the pinned version matches the
      // function's import, so a version bump fails loudly instead of silently
      // testing the wrong thing.
      "npm:@supabase/supabase-js@2.105.3": path.resolve(
        root,
        "lib/__tests__/supabase-edge-stub.ts",
      ),
    },
  },
});
