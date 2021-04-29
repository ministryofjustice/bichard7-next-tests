module.exports = {
  clearMocks: true,
  preset: "jest-puppeteer",
  testMatch: ["**/*.steps.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  maxConcurrency: 1,
  maxWorkers: 1
};
