module.exports = {
  root: true,
  env: { es2021: true, browser: true, jest: true, commonjs: true },
  ignorePatterns: ["dist/*", "docs/*", "jest.setup.ts", "node_modules", "packages/*/dist/*", "*.d.ts"],
  overrides: [
    {
      // Plain JavaScript files
      files: ["**/*.js"],
      extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020
      },
      rules: {
        curly: ["error", "all"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "never"],
        "no-plusplus": "off",
        "require-await": "error",
        "prettier/prettier": ["error"]
      }
    },
    {
      // All TypeScript files
      // These settings will also affect test and script files
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020
      },
      plugins: ["@typescript-eslint", "jest", "import"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "prettier",
        "plugin:prettier/recommended"
      ],
      rules: {
        curly: ["error", "all"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "never"],
        "no-plusplus": "off",
        "require-await": "error",
        "prettier/prettier": ["error"],
        "@typescript-eslint/consistent-type-imports": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_+$", varsIgnorePattern: "^_+$" }],
        "import/no-extraneous-dependencies": ["off", { devDependencies: ["**/*.test.js"] }],
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false
            }
          }
        ],
        "padding-line-between-statements": [
          "error",
          { blankLine: "always", prev: "block", next: "*" },
          { blankLine: "always", prev: "block-like", next: "*" }
        ]
      }
    },
    {
      // Just the TypeScript test files
      // These settings will only affect the tests
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "jest/no-standalone-expect": "off"
      }
    },
    {
      files: ["**/*.ts", "**/*.js"],
      rules: {
        // no arrow fns as we need to use `this` for Cucumber globals
        "func-names": "off",
        "import/prefer-default-export": "off",
        "import/no-dynamic-require": "off",
        "global-require": "off",
        "no-console": "off"
      }
    }
  ]
}
