const { reloadUntilXPathSelector } = require("../../utils/puppeteer-utils");

const waitForRecord = (name, page, reloadAttempts) => {
  const selector = `//table/tbody/tr${name ? `[contains(.,"${name}")]` : ""}`;
  return reloadUntilXPathSelector(page, selector, reloadAttempts);
};

module.exports = {
  waitForRecord
};
