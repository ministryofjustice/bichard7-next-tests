// By default Puppeteer caches Chromium downloads in ~/.cache/puppeteer
// which causes issues with separated build/test steps in CI.
// https://pptr.dev/guides/configuration#changing-the-default-cache-directory
const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, ".cache", "puppeteer")
};
