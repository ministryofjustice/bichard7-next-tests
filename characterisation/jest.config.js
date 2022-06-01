/* eslint-disable no-undef */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Run these files after jest has been
  // installed in the environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  verbose: true
};
