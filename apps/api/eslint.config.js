import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,js}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off",
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    },
  }
);
