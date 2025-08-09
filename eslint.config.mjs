import { defineConfig, globalIgnores } from "eslint/config";
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig(
  [
    globalIgnores([
      ".nitro/**/*",
      ".output/**/*",
      ".tanstack/**/*",
      ".node_modules/**/*",
    ]),
  ],
  {
    extends: [tanstackConfig, eslintConfigPrettier],
    rules: {
      "pnpm/json-enforce-catalog": "off",
    },
  }
);
