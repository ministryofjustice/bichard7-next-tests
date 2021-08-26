const expect = require("expect");

const accessReport = async function (report) {
  const [, reportsBtn] = await this.browser.page.$$("span.wpsNavLevel1");
  await Promise.all([reportsBtn.click(), this.browser.page.waitForNavigation()]);
  await this.browser.clickLinkAndWait(report);
  await expect(await this.browser.pageText()).toMatch(report);
};

const generateTodaysReport = async function () {
  await this.browser.page.select(".resultsTable select[name='fromDate']", "0");
  await this.browser.page.select(".resultsTable select[name='toDate']", "0");

  await Promise.all([this.browser.page.click("input[value='Run report']"), this.browser.page.waitForNavigation()]);
};

const reportContains = async function (text) {
  expect(await this.browser.elementText("#br7_report_data tbody")).toContain(text);
};

module.exports = { generateTodaysReport, reportContains, accessReport };
