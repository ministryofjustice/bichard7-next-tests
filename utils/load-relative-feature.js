const callsites = require("callsites");
const { loadFeature } = require("jest-cucumber");
const { dirname, resolve } = require("path");

// load feature files relative to step definitions. Removes duplication of supplying relative option in every file
const loadRelativeFeature = (relativePath) => {
  const caller = callsites()[1].getFileName() ?? "";
  const callerDir = dirname(caller);
  const absPath = resolve(callerDir, relativePath);
  return loadFeature(absPath);
};

module.exports = loadRelativeFeature;
