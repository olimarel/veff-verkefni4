import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').FlatESLintConfig[]} */
export default [
  // Ignore build artifacts and node_modules
  {
    ignores: ["**/.next/**/*", "**/node_modules/**/*"],
  },
  // Base language options and environments
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // ESLint core recommended rules
  pluginJs.configs.recommended,
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  // React plugin recommended rules (flat config)
  pluginReact.configs.flat.recommended,
  // Custom rules and settings to make the config less strict
  {
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
