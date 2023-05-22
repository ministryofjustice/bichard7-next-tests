const { expect } = require("expect");
const { caseListPage } = require("./urls");
const { waitForRecord } = require("./waitForRecord");
const { reloadUntilContentInSelector } = require("../../utils/puppeteer-utils");

const filterByRecordName = async function (world) {
  const name = world.getRecordName();
  await world.browser.page.click("button#filter-button");
  const searchField = "input[name='keywords']";
  await world.browser.page.click(searchField, { clickCount: 3 });
  await world.browser.page.type(searchField, name);
  await Promise.all([world.browser.page.click("button#search"), world.browser.page.waitForNavigation()]);
};

const getTableData = async function (world, selector) {
  const trPromises = await world.browser.page
    .$$(selector)
    .then((els) =>
      els.map((elHandle) => elHandle.evaluate((el) => [...el.querySelectorAll("td")].map((e) => e.innerText.trim())))
    );
  return Promise.all(trPromises);
};

const containsValue = async function (page, selector, value) {
  await page.waitForSelector(selector);

  const matches = await page.$$(selector).then((els) => els.map((el) => el.getProperty("innerText")));
  const innerTexts = await Promise.all(matches);
  const jsonValues = await Promise.all(await innerTexts.map((m) => m.jsonValue()));

  return Boolean(jsonValues.find((j) => j.includes(value)));
};

const checkDataTable = async function (world, values) {
  const tableData = await getTableData(world, "#Triggers_table .TableBody-sc-1qqarm8-0 tr");

  const check = tableData.filter((row) =>
    values.every((val) => {
      if (val.exact) {
        return row[val.column - 1] && row[val.column - 1] === val.value;
      }
      return row[val.column - 1] && row[val.column - 1].includes(val.value);
    })
  );
  expect(check.length).toEqual(1);
};

const checkTriggerforOffence = async function (triggerId, offenceId) {
  await checkDataTable(this, [
    { column: 1, value: triggerId, exact: false },
    { column: 2, value: offenceId, exact: true }
  ]);
};

const checkCompleteTriggerforOffence = async function (triggerId, offenceId) {
  await checkDataTable(this, [
    { column: 1, value: triggerId, exact: false },
    { column: 2, value: offenceId, exact: true },
    { column: 3, value: "Complete", exact: true }
  ]);
};

const checkTrigger = async function (triggerId) {
  await checkDataTable(this, [{ column: 1, value: triggerId, exact: false }]);
};

const findRecordFor = async function (name) {
  expect(await this.browser.pageText()).toContain(name);
};

const checkNoPncErrors = async function (name) {
  await this.browser.page.click(`a[id="Case details for ${name}"]`);
  await this.browser.clickAndWait("text=PNC errors");
  // TODO: assert no PNC errors once we have the table
};

const checkOffenceData = async function (value, key) {
  await checkDataTable(this, [
    { column: 1, value: key, exact: true },
    { column: 2, value, exact: true }
  ]);
};

const checkOffenceDataError = async function (value, key) {
  await checkDataTable(this, [
    { column: 1, value: key, exact: true },
    { column: 3, value, exact: false }
  ]);
};

const checkOffence = async function (offenceCode, offenceId) {
  await checkDataTable(this, [
    { column: 2, value: offenceId, exact: true },
    { column: 4, value: offenceCode, exact: true }
  ]);
};

const openRecordFor = async function (name) {
  await waitForRecord(this.browser.page);

  await Promise.all([
    this.browser.page.click(`a[id='Case details for ${name}']`),
    this.browser.page.waitForNavigation()
  ]);
};

const openRecordForCurrentTest = async function () {
  const record = `a[id='Case details for ${this.getRecordName()}']`;

  await filterByRecordName(this);
  await waitForRecord(this.browser.page);
  await Promise.all([this.browser.page.click(record), this.browser.page.waitForNavigation()]);
};

// eslint-disable-next-line no-unused-vars
const loadTab = async function (tabName) {
  // TODO add options here as we implement new UI
  // Triggers displayed on the case details page on the new UI
};

const reallocateCaseToForce = async function (force) {
  const { page } = this.browser;

  await this.browser.clickAndWait("text=Reallocate Case");
  const optionValue = await page.evaluate((f) => {
    const select = document.querySelector('select[name="force"]');
    const options = Array.from(select.options);
    const selectedForce = { BTP: "BTP global include" }[f];
    const option = options.find((o) => o.text === selectedForce);
    return option.value;
  }, force);
  await page.select('select[name="force"]', optionValue);
  await this.browser.clickAndWait("#Reallocate");
};

const canSeeContentInTable = async function (value) {
  const newValue = value.replace(/^PR(\d+)/, "TRPR00$1"); // TODO: remove this once we update new UI to display PR0* instead of full trigger code
  const found = await reloadUntilContentInSelector(
    this.browser.page,
    newValue,
    "#main-content > div.top-padding-0-2-5.moj-filter-layout > div.moj-filter-layout__content > div.moj-scrollable-pane > div > table > tbody"
  );
  expect(found).toBeTruthy();
};

const cannotSeeTrigger = async function (value) {
  await waitForRecord(this.browser.page, 2);
  const newValue = value.replace(/^PR(\d+)/, "TRPR00$1"); // TODO: remove this once we update new UI to display PR0* instead of full trigger code
  const noCasesMessageMatch = await this.browser.page.$x(`//*[contains(text(),"${newValue}")]`);
  expect(noCasesMessageMatch.length).toEqual(0);
};

const noExceptionPresentForOffender = async function (name) {
  // Filter for exceptions
  await this.browser.page.waitForSelector("#filter-button");
  await this.browser.page.click("#filter-button");

  await this.browser.page.waitForSelector("#exceptions-type");
  await this.browser.page.click("#exceptions-type");

  await Promise.all([this.browser.page.click("button#search"), this.browser.page.waitForNavigation()]);

  const noCaseNamesMatch = await this.browser.page.$x(`//*[contains(text(), "${name}")]`);
  expect(noCaseNamesMatch.length).toEqual(0);

  const noCasesMessageMatch = await this.browser.page.$x(`//*[contains(text(), "There are no court cases to show")]`);
  expect(noCasesMessageMatch.length).toEqual(1);

  // Reset filters
  await this.browser.clickAndWait("#clear-filters-applied");
};

const resolveAllTriggers = async function () {
  let resolveTriggersButtons = await this.browser.page.$$(
    "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
  );

  /* eslint-disable no-await-in-loop */
  while (resolveTriggersButtons.length > 0) {
    await Promise.all([
      this.browser.page.click("#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"),
      this.browser.page.waitForNavigation()
    ]);

    resolveTriggersButtons = await this.browser.page.$$(
      "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
    );
  }
};

const filterRecords = async function (world, resolvedType, recordType) {
  await world.browser.page.click("button#filter-button");

  if (resolvedType.toLowerCase() === "resolved") {
    await world.browser.page.click("input#resolved");
  }

  if (recordType.toLowerCase() === "exception") {
    await world.browser.page.click("input#exceptions-type");
  } else if (recordType.toLowerCase() === "trigger") {
    await world.browser.page.click("input#trigger-type");
  }

  await Promise.all([world.browser.page.click("button#search"), world.browser.page.waitForNavigation()]);
};

// eslint-disable-next-line no-unused-vars
const checkRecordForThisTestResolved = async function (recordType, resolvedType) {
  // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
  const resolveTriggersButtons = await this.browser.page.$$(
    "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
  );

  expect(resolveTriggersButtons.length).toEqual(0);
};

// eslint-disable-next-line no-unused-vars
const checkRecordForThisTestNotResolved = async function (recordType, resolvedType) {
  // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
  const resolveTriggersButtons = await this.browser.page.$$(
    "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
  );

  expect(resolveTriggersButtons.length).toEqual(0);
};

const checkNoExceptions = async function () {
  await filterRecords(this, "unresolved", "exception");
  const noCasesMessageMatch = await this.browser.page.$x(`//*[contains(text(), "There are no court cases to show")]`);
  expect(noCasesMessageMatch.length).toEqual(1);
};

const checkNoExceptionsForThis = async function () {
  // TODO: Fix this step to check record has no exceptions
};

const checkNoRecords = async function () {
  await filterRecords(this, "unresolved", "record");

  const noCasesMessageMatch = await this.browser.page.$x(`//*[contains(text(), "There are no court cases to show")]`);
  expect(noCasesMessageMatch.length).toEqual(1);
};

const checkNoRecordsForThis = async function () {
  const name = this.getRecordName();
  if (this.config.noUi) {
    // Read the records direct from the DB
    const records = await this.db.getMatchingErrorRecords(name);
    expect(records.length).toEqual(0);
  } else {
    const noCasesMessageMatch = await this.browser.page.$x(`//*[contains(text(), "There are no court cases to show")]`);
    expect(noCasesMessageMatch.length).toEqual(1);
  }
};

const goToExceptionList = async function () {
  if (this.config.noUi) return;
  await Promise.all([this.browser.page.goto(caseListPage()), this.browser.page.waitForNavigation()]);
};

const noTriggersPresentForOffender = async function (name) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3 * 1000);
  });

  // Grab the current value of the exception type filter so that it can be restored after the test
  const filterValue = await this.browser.page.$eval("#exceptionTypeFilter > option[selected]", (el) => el.textContent);

  await this.browser.selectDropdownOption("exceptionTypeFilter", "Triggers");
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]");
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", name);
  expect(isVisible).toBe(false);

  // Restore the previous exception type filter setting
  await this.browser.selectDropdownOption("exceptionTypeFilter", filterValue);
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]");
};

module.exports = {
  checkNoPncErrors,
  findRecordFor,
  openRecordForCurrentTest,
  openRecordFor,
  reallocateCaseToForce,
  canSeeContentInTable,
  cannotSeeTrigger,
  noExceptionPresentForOffender,
  loadTab,
  checkTrigger,
  checkTriggerforOffence,
  checkCompleteTriggerforOffence,
  resolveAllTriggers,
  checkRecordForThisTestResolved,
  checkRecordForThisTestNotResolved,
  checkOffenceData,
  checkOffenceDataError,
  checkNoExceptions,
  checkNoExceptionsForThis,
  checkNoRecords,
  checkNoRecordsForThis,
  checkOffence,
  getTableData,
  goToExceptionList,
  noTriggersPresentForOffender
};
