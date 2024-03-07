const { expect } = require("expect");
const forces = require("@moj-bichard7-developers/bichard7-next-data/dist/data/forces.json");
const { caseListPage } = require("./urls");
const { waitForRecord } = require("./waitForRecord");
const {
  reloadUntilContentInSelector,
  reloadUntilContent,
  reloadUntilXPathSelector
} = require("../../utils/puppeteer-utils");

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

const getShortTriggerCode = (triggerCode) => {
  const triggerCodeDetails = triggerCode.match(/TR(?<triggerType>\w{2})(?<triggerCode>\d+)/).groups;
  return `${triggerCodeDetails.triggerType}${String(Number(triggerCodeDetails.triggerCode)).padStart(2, "0")}`;
};

const getTriggersFromPage = async (world) => {
  await world.browser.page.waitForSelector("section#triggers .moj-trigger-row");
  const triggerRows = await world.browser.page.$$("section#triggers .moj-trigger-row");

  const triggers = await Promise.all(
    triggerRows.map(async (row) => {
      const triggerCode = await row.evaluate((element) =>
        element.querySelector("label.trigger-code")?.innerText?.trim()
      );
      const offenceId = Number(
        await row.evaluate(
          (element) =>
            element
              .querySelector("button.moj-action-link")
              ?.innerText?.trim()
              ?.match(/Offence (?<offenceId>\d+)/).groups.offenceId
        )
      );
      return { triggerCode, offenceId };
    })
  );

  return triggers;
};

const doesTriggerMatch = (actualTrigger, expectedTrigger) => {
  const triggerCodeMatch = actualTrigger.triggerCode === getShortTriggerCode(expectedTrigger.triggerCode);
  const offenceIdMatch = !expectedTrigger.offenceId || actualTrigger.offenceId === Number(expectedTrigger.offenceId);

  return triggerCodeMatch && offenceIdMatch;
};

const checkTriggers = async (world, expectedTriggers) => {
  const actualTriggers = await getTriggersFromPage(world);
  const matchedTriggers = expectedTriggers.filter((expectedTrigger) =>
    actualTriggers.some((actualTrigger) => doesTriggerMatch(actualTrigger, expectedTrigger))
  );

  expect(matchedTriggers.length).toEqual(expectedTriggers.length);
};

const checkTriggerforOffence = async function (triggerCode, offenceId) {
  await checkTriggers(this, [
    {
      triggerCode,
      offenceId
    }
  ]);
};

const checkCompleteTriggerforOffence = async function (triggerCode, offenceId) {
  await checkTriggers(this, [{ triggerCode, offenceId, status: "Complete" }]);
};

const checkTrigger = async function (triggerCode) {
  await checkTriggers(this, [{ triggerCode, exact: false }]);
};

const findRecordFor = async function (name) {
  expect(await this.browser.pageText()).toContain(name);
};

const checkNoPncErrors = async function (name) {
  const [recordLink] = await this.browser.page.$$(`xpath/.//table/tbody/tr/*/a[contains(text(),"${name}")]`);
  await recordLink.click();

  await this.browser.page.waitForSelector("text=PNC errors");
  await this.browser.clickAndWait("text=PNC errors");
  // TODO: assert no PNC errors once we have the table
};

const checkOffenceData = async function (value, key) {
  // const [cell] = await this.browser.page.$$(`xpath/.//table//td[contains(.,"${key}")]/following-sibling::td`);
  // case-sensitivity hack because old bichard capitalises every word and new bichard does not

  const [cellContent] = await this.browser.page.$$eval(
    `xpath/.//table//td[contains(
        translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),
        "${key.toLowerCase()}"
      )]/following-sibling::td`,
    (cells) => cells.map((cell) => cell.textContent)
  );

  expect(cellContent).toBe(value);
};

const checkOffenceDataError = async function (value, key) {
  console.log("Check offence data error", key, value);
  throw Error("Not yet implemented.");
};

const checkOffence = async function (offenceCode, offenceId) {
  console.log("Check offence", offenceCode, offenceId);
  throw Error("Not yet implemented.");
};

const openRecordFor = async function (name) {
  await waitForRecord(name, this.browser.page);

  const [link] = await this.browser.page.$$(`xpath/.//table/tbody/tr/*/a[contains(.,"${name}")]`);

  await Promise.all([link.click(), this.browser.page.waitForNavigation()]);
};

const openRecordForCurrentTest = async function () {
  await filterByRecordName(this);
  await waitForRecord(this.getRecordName(), this.browser.page);
  const [recordLink] = await this.browser.page.$$(
    `xpath/.//table/tbody/tr/*/a[contains(text(),"${this.getRecordName()}")]`
  );
  await Promise.all([recordLink.click(), this.browser.page.waitForNavigation()]);
  await this.browser.page.waitForSelector("text=Case details");
};

const loadTab = async function (tabName) {
  if (["Triggers", "Exceptions"].includes(tabName)) {
    await this.browser.page.click(`#${tabName.toLowerCase()}-tab`);
    return;
  }
  await this.browser.page.click(`text=${tabName}`);
};

const reallocateCaseToForce = async function (force) {
  const { page } = this.browser;

  await this.browser.clickAndWait("text=Reallocate Case");
  const optionValue = await page.evaluate(
    ([f, allForces]) => {
      const select = document.querySelector('select[name="force"]');
      const options = Array.from(select.options);
      const selectedForceCode = { BTP: "93", Merseyside: "05", Metropolitan: "02" }[f];
      const forceDetails = allForces.find((x) => x.code === selectedForceCode);
      const dropdownTextToSelect = `${forceDetails.code} - ${forceDetails.name}`;
      const option = options.find((o) => o.text === dropdownTextToSelect);
      return option.value;
    },
    [force, forces]
  );
  await page.select('select[name="force"]', optionValue);
  await this.browser.clickAndWait("#Reallocate");
};

const canSeeContentInTable = async function (value) {
  const newValue = value.replace(/^PR(\d+)/, "TRPR00$1").replace(/^PS(\d+)/, "TRPS00$1"); // TODO: remove this once we update new UI to display PR0* instead of full trigger code
  const found = await reloadUntilContentInSelector(
    this.browser.page,
    newValue,
    "#main-content > div.moj-filter-layout__content > div.moj-scrollable-pane > div > table > tbody"
  );
  expect(found).toBeTruthy();
};

const canSeeContentInTableForThis = async function (value) {
  await filterByRecordName(this);

  const newValue = value.replace(/^PR(\d+)/, "TRPR00$1").replace(/^PS(\d+)/, "TRPS00$1"); // TODO: remove this once we update new UI to display PR0* instead of full trigger code
  const found = await reloadUntilContentInSelector(
    this.browser.page,
    newValue,
    "#main-content > div.moj-filter-layout > div.moj-filter-layout__content > div.moj-scrollable-pane > div > table > tbody"
  );
  expect(found).toBeTruthy();
};

const cannotSeeTrigger = async function (value) {
  await waitForRecord(null, this.browser.page, 2);
  const newValue = value.replace(/^PR(\d+)/, "TRPR00$1").replace(/^PS(\d+)/, "TRPS00$1"); // TODO: remove this once we update new UI to display PR0* instead of full trigger code
  const noCasesMessageMatch = await this.browser.page.$$(`xpath/.//*[contains(text(),"${newValue}")]`);
  expect(noCasesMessageMatch.length).toEqual(0);
};

const noExceptionPresentForOffender = async function (name) {
  // Filter for exceptions
  await this.browser.page.waitForSelector("#filter-button");
  await this.browser.page.click("#filter-button");

  await this.browser.page.waitForSelector("#exceptions-type");
  await this.browser.page.click("#exceptions-type");

  await Promise.all([this.browser.page.click("button#search"), this.browser.page.waitForNavigation()]);

  const noCaseNamesMatch = await this.browser.page.$$(`xpath/.//*[contains(text(), "${name}")]`);
  expect(noCaseNamesMatch.length).toEqual(0);

  const noCasesMessageMatch = await this.browser.page.$$(
    `xpath/.//*[contains(text(), "There are no court cases to show")]`
  );
  expect(noCasesMessageMatch.length).toEqual(1);

  // Reset filters
  await this.browser.clickAndWait("#clear-filters-applied");
};

const markTriggersComplete = async function (world) {
  await world.browser.clickAndWait("#mark-triggers-complete-button");
};

const resolveSelectedTriggers = async function () {
  await markTriggersComplete(this);
};

const resolveAllTriggers = async function () {
  const [selectAllLink] = await this.browser.page.$$("#select-all-triggers button");
  await selectAllLink.evaluate((e) => e.click());
  await markTriggersComplete(this);
};

const selectTriggerToResolve = async function (triggerNumber) {
  const checkbox = (await this.browser.page.$$(".moj-trigger-row input[type=checkbox]"))[triggerNumber - 1];
  await checkbox.click();
};

const manuallyResolveRecord = async function () {
  await this.browser.page.click("#exceptions-tab");
  await Promise.all([
    await this.browser.page.click("section#exceptions a[href*='resolve'] button"),
    await this.browser.page.waitForNavigation()
  ]);

  await Promise.all([await this.browser.page.click("#Resolve"), await this.browser.page.waitForNavigation()]);
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
  const noCasesMessageMatch = await this.browser.page.$$(
    `xpath/.//*[contains(text(), "There are no court cases to show")]`
  );
  expect(noCasesMessageMatch.length).toEqual(1);
};

const checkNoExceptionsForThis = async function () {
  // TODO: Fix this step to check record has no exceptions
};

const checkNoRecords = async function () {
  await filterRecords(this, "unresolved", "record");

  const noCasesMessageMatch = await this.browser.page.$$(
    `xpath/.//*[contains(text(), "There are no court cases to show")]`
  );
  expect(noCasesMessageMatch.length).toEqual(1);
};

const checkNoRecordsForThis = async function () {
  const name = this.getRecordName();
  if (this.config.noUi) {
    // Read the records direct from the DB
    const records = await this.db.getMatchingErrorRecords(name);
    expect(records.length).toEqual(0);
  } else {
    const didFoundText = await reloadUntilXPathSelector(
      this.browser.page,
      `xpath/.//*[contains(text(), "There are no court cases to show")]`
    );
    expect(didFoundText).toEqual(true);
  }
};

const nRecordsInList = async function (n) {
  const records = await this.browser.page.$$("[class*='caseDetailsRow']");
  // TODO: change "there should only be {string} records"
  // to "there should only be {int} records" once old
  // steps are removed - remove coercion below
  expect(`${records.length}`).toBe(n);
};

// TODO: review whether this is specific enough
const nRecordsForPerson = async function (n, name) {
  const records = await this.browser.page.$$(`xpath/.//tr/td/a[text()[contains(.,'${name}')]]`);
  expect(records.length).toEqual(n);
};

const noRecordsForPerson = async function (name) {
  await nRecordsForPerson.apply(this, [0, name]);
};

const goToExceptionList = async function () {
  if (this.config.noUi) return;
  await this.browser.page.goto("about:blank");
  await Promise.all([this.browser.page.waitForNavigation(), this.browser.page.goto(caseListPage())]);
};

// TODO: refactor down with noExceptionsPresentForOffender
const noTriggersPresentForOffender = async function (name) {
  await this.browser.page.waitForSelector("#filter-button");
  await this.browser.page.click("#filter-button");

  await this.browser.page.waitForSelector("#triggers-type");
  await this.browser.page.click("#triggers-type");

  await Promise.all([this.browser.page.click("button#search"), this.browser.page.waitForNavigation()]);

  const noCaseNamesMatch = await this.browser.page.$$(`xpath/.//*[contains(text(), "${name}")]`);
  expect(noCaseNamesMatch.length).toEqual(0);

  const noCasesMessageMatch = await this.browser.page.$$(
    `xpath/.//*[contains(text(), "There are no court cases to show")]`
  );
  expect(noCasesMessageMatch.length).toEqual(1);

  // Reset filters
  await this.browser.clickAndWait("#clear-filters-applied");
};

// TODO: implement once case details page layout is completed.
// Currently the correction fields in the UI can't be easily
// selected.
const correctOffenceException = async function () {
  throw new Error("Not implemented");
};

const returnToCaseListUnlock = async function () {
  const { page } = this.browser;
  await Promise.all([page.click("#leave-and-unlock, #return-to-case-list"), page.waitForNavigation()]);
};

const waitForRecordStep = async function (record) {
  await reloadUntilContent(this.browser.page, record);
};

const checkNoteExists = async function (value) {
  const tableData = await getTableData(this, "#br7_exception_details_display_notes .resultsTable tbody tr");
  if (!tableData.some((row) => row[0].includes(value))) {
    throw new Error("Note does not exist");
  }
};

const clickButton = async function (value) {
  await this.browser.clickAndWait(`text=${value}`);
};

const switchBichard = async function () {
  const { page } = this.browser;
  await Promise.all([page.click("[class*='BichardSwitch']"), page.waitForNavigation()]);

  // if feedback page is shown
  const skip = await page.$("button[class*='SkipLink']");
  if (skip) {
    await Promise.all([skip.click(), page.waitForNavigation()]);
  }
};

module.exports = {
  checkNoPncErrors,
  findRecordFor,
  openRecordForCurrentTest,
  openRecordFor,
  reallocateCaseToForce,
  canSeeContentInTable,
  canSeeContentInTableForThis,
  cannotSeeTrigger,
  noExceptionPresentForOffender,
  loadTab,
  checkTrigger,
  checkTriggerforOffence,
  checkCompleteTriggerforOffence,
  resolveAllTriggers,
  selectTriggerToResolve,
  resolveSelectedTriggers,
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
  noTriggersPresentForOffender,
  correctOffenceException,
  manuallyResolveRecord,
  nRecordsInList,
  nRecordsForPerson,
  returnToCaseListUnlock,
  waitForRecordStep,
  noRecordsForPerson,
  checkNoteExists,
  clickButton,
  switchBichard
};
