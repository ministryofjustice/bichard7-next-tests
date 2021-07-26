const expect = require("expect");
const { initialRefreshUrl } = require("../utils/urls");
const {
  reloadUntilSelector,
  waitForRecord,
  reloadUntilContent,
  reloadUntilNotContent,
  reloadUntilContentInSelector
} = require("../utils/puppeteer-utils");
const fsHelp = require("../helpers/fsHelper");

const containsValue = async function (page, selector, value) {
  await page.waitForSelector(selector);

  const matches = await page.$$(selector).then((els) => els.map((el) => el.getProperty("innerText")));
  const innerTexts = await Promise.all(matches);
  const jsonValues = await Promise.all(await innerTexts.map((m) => m.jsonValue()));

  return Boolean(jsonValues.find((j) => j.includes(value)));
};

const checkDataTable = async function (world, values) {
  const trPromises = await world.browser.page
    .$$("#br7_exception_details_court_data_table .resultsTable tbody tr")
    .then((els) =>
      els.map((elHandle) => elHandle.evaluate((el) => [...el.querySelectorAll("td")].map((e) => e.innerText.trim())))
    );
  const tableData = await Promise.all(trPromises);
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

const goToExceptionList = async function () {
  await Promise.all([this.browser.page.goto(initialRefreshUrl()), this.browser.page.waitForNavigation()]);
};

const findRecordFor = async function (name) {
  await reloadUntilSelector(this.browser.page, ".resultsTable a.br7_exception_list_record_table_link");
  await this.browser.page.waitForFunction(
    `document.querySelector('.resultsTable a.br7_exception_list_record_table_link').innerText.includes('${name}')`
  );
};

const checkNoPncErrors = async function (name) {
  expect(await this.browser.elementText(".resultsTable a.br7_exception_list_record_table_link")).toBe(name);
  await this.browser.page.click(".resultsTable a.br7_exception_list_record_table_link");
  await containsValue(this.browser.page, "#br7_exception_details_pnc_data_table", "Theft of pedal cycle");
};

const openRecordFor = async function (name) {
  await waitForRecord(this.browser.page);
  await Promise.all([
    this.browser.page.click(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`),
    this.browser.page.waitForNavigation()
  ]);
};

const loadRecordTab = async function (page, selectorToClick, selectorToWaitFor) {
  await page.waitForSelector(selectorToClick);
  await Promise.all([page.click(selectorToClick), page.waitForNavigation()]);
  await page.waitForSelector(selectorToWaitFor);
};

const loadDefendantTab = async function (page) {
  await loadRecordTab(page, "#br7_button_Defendant", ".br7_exception_details_column_name");
};

const loadTriggersTab = async function (page) {
  await loadRecordTab(page, "#br7_button_Trigger", ".br7_exception_details_trigger_description_column");
};

const loadTab = async function (tabName) {
  const tabIds = {
    hearing: "#br7_button_Hearing",
    case: "#br7_button_Case",
    defendant: "#br7_button_Defendant",
    offences: "#br7_button_OffenceList",
    notes: "#br7_button_Note",
    triggers: "#br7_button_Trigger"
  };
  const tabId = tabIds[tabName.toLowerCase()];
  if (!tabId) throw new Error("Unsupported tab name");
  await loadRecordTab(this.browser.page, tabId, ".br7_exception_details_court_data_tabs_table");
};

const isExceptionEditable = async function (page) {
  await loadDefendantTab(page);

  const editException = await page.$("input[type='text'][name='newValue(ASN)']");

  return Boolean(editException);
};

const exceptionIsEditable = async function () {
  const editable = await isExceptionEditable(this.browser.page);
  expect(editable).toBe(true);
};

const exceptionIsNotEditable = async function () {
  const editable = await isExceptionEditable(this.browser.page);
  expect(editable).toBe(false);
};

const isButtonVisible = async function (page, sectionName) {
  const triggersBtn = await page.$(
    `.br7_exception_details_court_data_tabs_table input[type='submit'][value='${sectionName}']`
  );

  return Boolean(triggersBtn);
};

const clickButton = async function (value) {
  const { page } = this.browser;
  await Promise.all([page.click(`input[type='submit'][value='${value}']`), page.waitForNavigation()]);
};

const clickMainTab = async function (label) {
  await this.browser.page.waitForSelector("span.wpsNavLevel1");

  const links = await this.browser.page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
  expect(links).toContain(label);
};

const checkFileDownloaded = async function (fileName) {
  const result = await fsHelp.checkForFile("tmp", fileName);
  expect(result).toBe(true);
};

const downloadCSV = async function () {
  await this.browser.setupDownloadFolder("./tmp");
  await this.browser.page.waitForSelector("table#portletTop input[value='Download CSV File']");
  await this.browser.page.click("table#portletTop input[value='Download CSV File']");
};

const reallocateCase = async function () {
  const { page } = this.browser;
  await this.browser.clickAndWait("#br7_exception_details_view_edit_buttons > input[value='Reallocate Case']");

  // Bedfordshire Police has value 28...
  await page.select("#reallocateAction", "28");

  await Promise.all([
    page.click("input[value='OK']"),
    page.waitForSelector(".resultsTable a.br7_exception_list_record_table_link")
  ]);

  await Promise.all([
    page.click(".resultsTable a.br7_exception_list_record_table_link"),
    page.waitForSelector(".br7_exception_details_court_data_tabs_table input[type='submit'][value='Notes']")
  ]);

  await page.click(".br7_exception_details_court_data_tabs_table input[type='submit'][value='Notes']");

  await page.waitForSelector("#br7_exception_details_display_notes tr > td");

  const latestNote = await page
    .$("#br7_exception_details_display_notes tr > td")
    .then((el) => el.getProperty("innerText"))
    .then((el) => el.jsonValue());

  expect(latestNote).toContain("Case reallocated to new force owner");
};

const canSeeTrigger = async function (value) {
  await reloadUntilContentInSelector(this.browser.page, value, ".resultsTable > tbody td");
};

const cannotSeeTrigger = async function (value) {
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(false);
};

const canSeeException = async function (value) {
  await reloadUntilContentInSelector(this.browser.page, value, ".resultsTable > tbody td");
};

const cannotSeeException = async function (exception) {
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(false);
};

const noExceptionPresentForOffender = async function (name) {
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000));

  // Grab the current value of the exception type filter so that it can be restored after the test
  const filterValue = await this.browser.page.$eval("#exceptionTypeFilter > option[selected]", (el) => el.textContent);

  await this.browser.selectDropdownOption("exceptionTypeFilter", "Exceptions");
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]");
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", name);
  expect(isVisible).toBe(false);

  // Restore the previous exception type filter setting
  await this.browser.selectDropdownOption("exceptionTypeFilter", filterValue);
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]");
};

const noTriggersPresentForOffender = async function (name) {
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000));

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

const buttonIsNotVisible = async function (sectionName) {
  const visible = await isButtonVisible(this.browser.page, sectionName);
  expect(visible).toBe(false);
};

const buttonIsVisible = async function (sectionName) {
  const visible = await isButtonVisible(this.browser.page, sectionName);
  expect(visible).toBe(true);
};

const triggersAreVisible = async function () {
  await loadTriggersTab(this.browser.page);

  await expect(await this.browser.pageText()).toMatch(
    "TRPR0010 - Bail conditions imposed/varied/cancelled - update remand screen"
  );
};

const exceptionsAreVisible = async function () {
  await loadDefendantTab(this.browser.page);

  await expect(await this.browser.pageText()).toMatch("HO100300 - Organisation not recognised");
};

const exceptionIsReadOnly = async function () {
  const editable = await isExceptionEditable(this.browser.page);
  expect(editable).toBe(false);

  // auditors can only select "Return To List" so there should only be one "edit" button
  const editBtnsWrapper = await this.browser.page.waitForSelector("#br7_exception_details_view_edit_buttons");
  const editBtns = await editBtnsWrapper.$$eval("input", (inputs) => inputs.length);
  expect(editBtns).toEqual(1);
};

const canSeeReports = async function () {
  const [, reportsBtn] = await this.browser.page.$$("span.wpsNavLevel1");

  await Promise.all([reportsBtn.click(), this.browser.page.waitForNavigation()]);

  await this.browser.page.waitForSelector("#report-index-list .wpsNavLevel2");

  await expect(await this.browser.pageText()).toMatch("Live Status Summary");
};

const canSeeQAStatus = async function () {
  await this.browser.page.waitForSelector(".resultsTable");

  const exceptionTableHeaders = await this.browser.page.$$eval(".resultsTable th", (headers) =>
    headers.map((h) => h.textContent.trim())
  );

  expect(exceptionTableHeaders).toContain("QA Status");
};

const visitTeamPage = async function () {
  await this.browser.page.waitForSelector("span.wpsNavLevel1");

  const links = await this.browser.page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
  expect(links).toContain("Team");

  const [, , teamBtn] = await this.browser.page.$$("span.wpsNavLevel1");
  await Promise.all([teamBtn.click(), this.browser.page.waitForSelector("#br7_team_management_own_team")]);
  await expect(await this.browser.pageText()).toMatch("My Team Members");
};

const editTeam = async function () {
  const { page } = this.browser;
  const removeUserCheckboxSelector = "input[type='checkbox'][name='usersToRemove']";

  // add user

  await page.type("input[name='userToAdd']", "username");
  await page.click("input[type='submit'][value='Add User']");
  await page.waitForSelector(removeUserCheckboxSelector);

  // remove user
  await page.click(removeUserCheckboxSelector);
  await page.click("input[type='submit'][value='Remove Selected Users']");

  await page.waitForFunction(() => !document.querySelector("input[type='checkbox'][name='usersToRemove']"));
};

const cannotReallocateCase = async function () {
  const reallocateBtn = await this.browser.page.$("#reallocateAction");
  expect(reallocateBtn).toBeFalsy();
};

const checkTriggerforOffence = async function (triggerId, offenceId) {
  await checkDataTable(this, [
    { column: 1, value: triggerId, exact: false },
    { column: 2, value: offenceId, exact: true }
  ]);
};

const checkTrigger = async function (triggerId) {
  await checkDataTable(this, [{ column: 1, value: triggerId, exact: false }]);
};

const resolveAllTriggers = async function () {
  await this.browser.page.$$eval("input[name='triggerMarkedAsCompleteList']", (elHandle) =>
    elHandle.forEach((el) => el.click())
  );

  await Promise.all([
    this.browser.page.click("input[value='Mark Selected Complete']"),
    this.browser.page.waitForNavigation()
  ]);
};

const manuallyResolveRecord = async function () {
  await Promise.all([
    this.browser.page.click("input[value='Select All Triggers']"),
    this.browser.page.waitForNavigation()
  ]);
  await Promise.all([
    this.browser.page.click("input[value='Mark Selected Complete']"),
    this.browser.page.waitForNavigation()
  ]);
  await Promise.all([
    this.browser.page.click("input[value='Mark As Manually Resolved']"),
    this.browser.page.waitForNavigation()
  ]);
  await this.browser.page.select("select#reasonCode", "2");
  await Promise.all([this.browser.page.click("input[value='OK']"), this.browser.page.waitForNavigation()]);
};

const filterRecords = async function (world, resolvedType, recordType) {
  const recordSelectId = { record: "0", exception: "1", trigger: "2" }[recordType.toLowerCase()];
  if (!recordSelectId) {
    throw new Error(`Record type '${recordType}' is unknown`);
  }
  await world.browser.page.select("select#exceptionTypeFilter", recordSelectId);

  const resolutionSelectId = { unresolved: "1", resolved: "2" }[resolvedType.toLowerCase()];
  if (!resolutionSelectId) {
    throw new Error(`Resolution type '${resolvedType}' is unknown`);
  }
  await world.browser.page.select("select#resolvedFilter", resolutionSelectId);

  await Promise.all([world.browser.page.click("input[value='Refresh']"), world.browser.page.waitForNavigation()]);
};

const checkRecordResolved = async function (recordType, recordName, resolvedType) {
  await filterRecords(this, resolvedType, recordType);
  expect(await this.browser.elementText("table.resultsTable")).toMatch(recordName);
};

const checkRecordNotResolved = async function (recordType, recordName, resolvedType) {
  await filterRecords(this, resolvedType, recordType);
  expect(await this.browser.elementText("table.resultsTable")).not.toMatch(recordName);
};

const checkRecordNotExists = async function (recordName) {
  await this.browser.clickAndWait("input[value='Refresh']");
  expect(await this.browser.pageText()).not.toMatch(recordName);
};

const viewOffence = async function (offenceId) {
  await this.browser.clickLinkAndWait(offenceId);
};

const checkOffenceData = async function (value, key) {
  await checkDataTable(this, [
    { column: 1, value: key, exact: true },
    { column: 2, value, exact: true }
  ]);
};

const returnToList = async function () {
  await this.browser.clickAndWait("input[type='submit'][value='Return To List (Unlock)']");
  await this.browser.clickAndWait("input[type='submit'][value='Yes']");
};

const correctOffenceException = async function (field, newValue) {
  await this.browser.page.$$("#br7_exception_details_court_data_table .resultsTable tbody tr").then((rows) =>
    rows.map((row) =>
      row.evaluate(
        (rowEl, fieldName, value) => {
          const tds = [...rowEl.querySelectorAll("td")].map((e) => e.innerText.trim());
          if (tds[0] === fieldName) {
            const input = rowEl.querySelector("input[type='text']");
            input.value = value;
          }
        },
        field,
        newValue
      )
    )
  );
};

const correctOffenceFreeTextException = async function (field, newValue) {
  await this.browser.page.$$("#br7_exception_details_court_data_table .resultsTable tbody tr").then((rows) =>
    rows.map((row) =>
      row.evaluate(
        (rowEl, fieldName, value) => {
          const tds = [...rowEl.querySelectorAll("td")].map((e) => e.innerText.trim());
          if (tds[0] === fieldName) {
            const input = rowEl.querySelector("textarea");
            input.value = value + input.value;
          }
        },
        field,
        newValue
      )
    )
  );
};

const submitRecord = async function () {
  await this.browser.clickAndWait(`input[type='submit'][value='Submit']`);
  await this.browser.clickAndWait(`input[type='submit'][value='OK']`);
};

const reloadUntilStringPresent = async function (content) {
  await reloadUntilContent(this.browser.page, content);
};

const reloadUntilStringNotPresent = async function (content) {
  await reloadUntilNotContent(this.browser.page, content);
};

const checkNoExceptions = async function () {
  await filterRecords(this, "unresolved", "exception");
  const tableRows = await this.browser.page.$$("table.resultsTable tr");
  expect(tableRows.length).toEqual(2);
};

const checkNoRecords = async function () {
  await filterRecords(this, "unresolved", "record");
  const tableRows = await this.browser.page.$$("table.resultsTable tr");
  expect(tableRows.length).toEqual(2);
};

const waitForRecordStep = async function (record) {
  await reloadUntilContent(this.browser.page, record);
};

const checkOffence = async function (offenceCode, offenceId) {
  await checkDataTable(this, [
    { column: 2, value: offenceId, exact: true },
    { column: 4, value: offenceCode, exact: true }
  ]);
};

const checkTableRows = async function (offenceCount) {
  const trPromises = await this.browser.page.$$("#br7_exception_details_court_data_table .resultsTable tbody tr");
  expect(trPromises.length).toEqual(parseInt(offenceCount, 10));
};

module.exports = {
  checkNoPncErrors,
  containsValue,
  findRecordFor,
  goToExceptionList,
  isExceptionEditable,
  loadDefendantTab,
  loadTriggersTab,
  openRecordFor,
  reallocateCase,
  cannotReallocateCase,
  canSeeTrigger,
  cannotSeeTrigger,
  canSeeException,
  cannotSeeException,
  noExceptionPresentForOffender,
  noTriggersPresentForOffender,
  exceptionIsEditable,
  exceptionIsNotEditable,
  buttonIsVisible,
  buttonIsNotVisible,
  clickButton,
  clickMainTab,
  triggersAreVisible,
  exceptionsAreVisible,
  exceptionIsReadOnly,
  canSeeReports,
  canSeeQAStatus,
  visitTeamPage,
  editTeam,
  downloadCSV,
  checkFileDownloaded,
  loadTab,
  checkTrigger,
  checkTriggerforOffence,
  resolveAllTriggers,
  checkRecordResolved,
  checkRecordNotResolved,
  manuallyResolveRecord,
  viewOffence,
  checkOffenceData,
  returnToList,
  checkRecordNotExists,
  correctOffenceException,
  correctOffenceFreeTextException,
  submitRecord,
  reloadUntilStringPresent,
  reloadUntilStringNotPresent,
  checkNoExceptions,
  checkNoRecords,
  waitForRecordStep,
  checkOffence,
  checkTableRows
};
