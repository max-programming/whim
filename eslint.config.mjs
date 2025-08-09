import { defineConfig } from "eslint/config";
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: [
      ".nitro/**/*",
      ".output/**/*",
      ".tanstack/**/*",
      "node_modules/**/*",
      "*.min.js",
      "*.bundle.js",
      ".eslintcache",
      "bun.lock",
      "*.d.ts",
      "db/**/*",
    ],
  },
  ...tanstackConfig,
  eslintConfigPrettier,
  {
    rules: {
      "pnpm/json-enforce-catalog": "off",
    },
  },
]);
