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
  await this.browser.page.goto(initialRefreshUrl());
  await this.browser.page.waitForSelector(".resultsTable");
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

const checkFileDownloaded = async (fileName) => {
  const prom = fsHelp.checkForFile("tmp", fileName);
  console.log(prom);
  const result = await prom;
  console.log("Promise resolved", result);
  expect(result).toBe(true);
};

const downloadCSV = async () => {
  await page.waitForSelector("table#portletTop input[value='Download CSV File");
  await page.click("table#portletTop input[value='Download CSV File']");
};

const reallocateCase = async () => {
  await Promise.all([
    page.click("#br7_exception_details_view_edit_buttons > input[value='Reallocate Case']"),
    page.waitForNavigation()
  ]);

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
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(true);
};

const cannotSeeTrigger = async function (value) {
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(false);
};

const canSeeException = async function (exception) {
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(true);
};

const cannotSeeException = async function (exception) {
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", exception);
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
  await reportsBtn.click();

  await this.browser.page.waitForSelector("#report-index-list .wpsNavLevel2");

  await expect(await this.browser.pageText()).toMatch("Live Status Summary");
};

const accessReport = async () => {
  const [, reportsBtn] = await page.$$("span.wpsNavLevel1");
  await reportsBtn.click();

  await page.waitForSelector("#report-index-list .wpsNavLevel2");
  page.click("#report-index-list .wpsNavLevel2");
  await expect(page).toMatch("Live Status Summary");
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
  checkFileDownloaded
};
