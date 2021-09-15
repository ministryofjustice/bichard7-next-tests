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

const reportDoesNotContain = async function (text) {
  expect(await this.browser.elementText("#br7_report_data tbody")).not.toContain(text);
};

const fakeTriggerReportData = async function () {
  await this.db.pg.none(
    "update br7own.error_list set msg_received_ts = msg_received_ts - INTERVAL '7 days' where trigger_reason = 'TRPR0003'"
  );
  await this.db.pg.none(
    "update br7own.error_list set msg_received_ts = msg_received_ts - INTERVAL '8 days' where trigger_reason = 'TRPR0006'"
  );
};

module.exports = { generateTodaysReport, reportContains, reportDoesNotContain, accessReport, fakeTriggerReportData };
