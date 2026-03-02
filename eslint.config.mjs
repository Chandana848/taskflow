import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disallow console statements in production code (warn to allow eslint-disable where needed)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce const over let where possible
      "prefer-const": "error",
      // Disallow unused variables (TypeScript handles this, but be explicit)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      // No explicit any
      "@typescript-eslint/no-explicit-any": "warn",
      // Require return type on functions (except for arrow functions)
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);

export default eslintConfig;
