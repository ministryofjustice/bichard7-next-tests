const expect = require("expect");
const { initialRefreshUrl } = require("../utils/urls");
const { reloadUntilSelector, waitForRecord } = require("../utils/puppeteer-utils");
const fsHelp = require("../helpers/fsHelper");

const containsValue = async function (page, selector, value) {
  await page.waitForSelector(selector);

  const matches = await page.$$(selector).then((els) => els.map((el) => el.getProperty("innerText")));
  const innerTexts = await Promise.all(matches);
  const jsonValues = await Promise.all(await innerTexts.map((m) => m.jsonValue()));

  return Boolean(jsonValues.find((j) => j.includes(value)));
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
    this.browser.page.waitForSelector("#br7_exception_details_pnc_data_table")
  ]);
};

const loadRecordTab = async function (page, selectorToClick, selectorToWaitFor) {
  await page.waitForSelector(selectorToClick);
  await page.click(selectorToClick);
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
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(true);
};

const cannotSeeTrigger = async function (value) {
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(false);
};

const canSeeException = async function (exception) {
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(true);
};

const cannotSeeException = async function (exception) {
  await waitForRecord(this.browser.page);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(false);
};

const noExceptionPresentForOffender = async function (name) {
  await waitForRecord(this.browser.page);
  await this.browser.selectDropdownOption("exceptionTypeFilter", "Exceptions")
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]")
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", name);
  expect(isVisible).toBe(false);
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

const accessReport = async function (report) {
  const [, reportsBtn] = await this.browser.page.$$("span.wpsNavLevel1");
  await reportsBtn.click();

  await this.browser.page.waitForSelector("#report-index-list .wpsNavLevel2");
  this.browser.page.click("#report-index-list .wpsNavLevel2");
  await expect(await this.browser.pageText()).toMatch(report);
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

function chunk(arr, len) {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

const checkTrigger = async function (triggerId, offenceId) {
  const selector =
    '#br7_exception_details_court_data_table tr[class="light"] td, #br7_exception_details_court_data_table tr[class="dark"] td';
  const tdPromises = await this.browser.page
    .$$(selector)
    .then((els) => els.map((elHandle) => elHandle.evaluate((el) => el.textContent)));
  const rawValues = await Promise.all(tdPromises);
  const trimmedValues = rawValues.map((v) => v.trim());
  const values = chunk(trimmedValues, 4);
  const match = values.filter((row) => row[1] === offenceId && row[0].includes(triggerId));
  expect(match.length).toEqual(1);
};

const resolveAllTriggers = async function () {
  await this.browser.page.$$eval("input[name='triggerMarkedAsCompleteList']", (elHandle) =>
    elHandle.forEach((el) => el.click())
  );

  await this.browser.page.click("input[value='Mark Selected Complete']");
};

const checkRecordResolution = async function (recordName, resolvedType) {
  const selectId = { unresolved: "1", resolved: "2" }[resolvedType.toLowerCase()];
  if (!selectId) {
    throw new Error("Resolution type is undefined");
  }
  await this.browser.page.select("select#resolvedFilter", selectId);
  await Promise.all([this.browser.page.click("input[value='Refresh']"), this.browser.page.waitForNavigation()]);
  await this.browser.page.waitForSelector(".foo");
  expect(this.browser.pageText()).toMatch(recordName);
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
  exceptionIsEditable,
  exceptionIsNotEditable,
  buttonIsVisible,
  buttonIsNotVisible,
  clickMainTab,
  triggersAreVisible,
  exceptionsAreVisible,
  exceptionIsReadOnly,
  canSeeReports,
  canSeeQAStatus,
  visitTeamPage,
  editTeam,
  accessReport,
  downloadCSV,
  checkFileDownloaded,
  loadTab,
  checkTrigger,
  resolveAllTriggers,
  checkRecordResolution
};
