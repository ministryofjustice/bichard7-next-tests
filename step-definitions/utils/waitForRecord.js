const { reloadUntilXPathSelector } = require("../../utils/puppeteer-utils");

const waitForRecord = (name, page, reloadAttempts) =>
  reloadUntilXPathSelector(page, `//table/tbody/tr[contains(.,"${name}")]`, reloadAttempts);

module.exports = {
  waitForRecord
};
