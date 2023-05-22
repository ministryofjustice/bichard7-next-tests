module.exports = {
  env: {
    browser: true,
    jest: true,
    commonjs: true,
    es2021: true
  },
  globals: {
    page: true,
    context: true,
    jestPuppeteer: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["jest", "prettier"],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    // no arrow fns as we need to use `this` for Cucumber globals
    "func-names": "off",
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "no-console": "off"
  },
  ignorePatterns: ["jest.setup.ts"]
};
