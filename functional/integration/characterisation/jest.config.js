/* eslint-disable no-undef */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["node_modules", "build"],
  testMatch: ["**/*.test.ts"],
  // Run these files after jest has been
  // installed in the environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};
