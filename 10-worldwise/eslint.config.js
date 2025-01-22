import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    env: {
      browser: true,
      es6: true,
    },
  },
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none", // Ignore unused function arguments including props
          ignoreRestSiblings: true, // Ignore unused variables in object destructuring
        },
      ], // Show unused variables as warnings (yellow)
      "react/react-in-jsx-scope": "off", // Disable rule for React in scope (React 17+)
      "no-console": "warn", // Warn when console is used
      "react/prop-types": "off", // Disable prop-types rule if you use TypeScript or other type-checking solutions
    },
  },
];
