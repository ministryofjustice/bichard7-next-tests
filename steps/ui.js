const { initialRefreshUrl } = require("../utils/urls");
const { reloadUntilSelector, waitForRecord } = require("../utils/puppeteer-utils");

const goToExceptionList = async () => {
  await page.goto(initialRefreshUrl());
  await page.waitForSelector(".resultsTable");
};

const findRecordFor = async (name) => {
  await reloadUntilSelector(page, ".resultsTable a.br7_exception_list_record_table_link");
  await page.waitForFunction(
    `document.querySelector('.resultsTable a.br7_exception_list_record_table_link').innerText.includes('${name}')`
  );
};

const checkNoPncErrors = async () => {
  await page.click(".resultsTable a.br7_exception_list_record_table_link");
  await page.waitForSelector("#br7_exception_details_pnc_data_table");
  await page.waitForFunction(
    "document.querySelector('#br7_exception_details_pnc_data_table').innerText.includes('Theft of pedal cycle')"
  );
};

const containsValue = async (page, selector, value) => {
  await page.waitForSelector(selector);

  const matches = await page.$$(selector).then((els) => els.map((el) => el.getProperty("innerText")));
  const innerTexts = await Promise.all(matches);
  const jsonValues = await Promise.all(await innerTexts.map((m) => m.jsonValue()));

  return Boolean(jsonValues.find((j) => j.includes(value)));
};

const openRecordFor = async (name) => {
  await waitForRecord(page);
  await Promise.all([
    page.click(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`),
    page.waitForSelector("#br7_exception_details_pnc_data_table")
  ]);
};

const loadRecordTab = async (selectorToClick, selectorToWaitFor) => {
  await page.waitForSelector(selectorToClick);
  await page.click(selectorToClick);
  await page.waitForSelector(selectorToWaitFor);
};

const loadDefendantTab = async () => {
  await loadRecordTab("#br7_button_Defendant", ".br7_exception_details_column_name");
};

const loadTriggersTab = async () => {
  await loadRecordTab("#br7_button_Trigger", ".br7_exception_details_trigger_description_column");
};

const isExceptionEditable = async () => {
  await loadDefendantTab();

  const editException = await page.$("input[type='text'][name='newValue(ASN)']");

  return Boolean(editException);
};

const exceptionIsEditable = async () => {
  const editable = await isExceptionEditable();
  expect(editable).toBe(true);
};

const isButtonVisible = async (sectionName) => {
  const triggersBtn = await page.$(
    `.br7_exception_details_court_data_tabs_table input[type='submit'][value='${sectionName}']`
  );

  return Boolean(triggersBtn);
};

const clickMainTab = async (label) => {
  await page.waitForSelector("span.wpsNavLevel1");

  const links = await page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
  expect(links).toContain(label);
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

const canSeeTrigger = async (value) => {
  const isVisible = await containsValue(page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(true);
};

const cannotSeeTrigger = async (value) => {
  const isVisible = await containsValue(page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(false);
};

const canSeeException = async (exception) => {
  const isVisible = await containsValue(page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(true);
};

const cannotSeeException = async (exception) => {
  const isVisible = await containsValue(page, ".resultsTable > tbody td", exception);
  expect(isVisible).toBe(false);
};

const buttonIsNotVisible = async (sectionName) => {
  const visible = await isButtonVisible(sectionName);
  expect(visible).toBe(false);
};

const buttonIsVisible = async (sectionName) => {
  const visible = await isButtonVisible(sectionName);
  expect(visible).toBe(true);
};

const triggersAreVisible = async () => {
  await loadTriggersTab();

  await expect(page).toMatch("TRPR0010 - Bail conditions imposed/varied/cancelled - update remand screen");
};

const exceptionsAreVisible = async () => {
  await loadDefendantTab();

  await expect(page).toMatch("HO100300 - Organisation not recognised");
};

const exceptionIsReadOnly = async () => {
  const editable = await isExceptionEditable();
  expect(editable).toBe(false);

  // auditors can only select "Return To List" so there should only be one "edit" button
  const editBtnsWrapper = await page.waitForSelector("#br7_exception_details_view_edit_buttons");
  const editBtns = await editBtnsWrapper.$$eval("input", (inputs) => inputs.length);
  expect(editBtns).toEqual(1);
};

const canSeeReports = async () => {
  const [, reportsBtn] = await page.$$("span.wpsNavLevel1");
  await reportsBtn.click();

  await page.waitForSelector("#report-index-list .wpsNavLevel2");

  await expect(page).toMatch("Live Status Summary");
};

const canSeeQAStatus = async () => {
  await page.waitForSelector(".resultsTable");

  const exceptionTableHeaders = await page.$$eval(".resultsTable th", (headers) =>
    headers.map((h) => h.textContent.trim())
  );

  expect(exceptionTableHeaders).toContain("QA Status");
};

const visitTeamPage = async () => {
  await page.waitForSelector("span.wpsNavLevel1");

  const links = await page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
  expect(links).toContain("Team");

  const [, , teamBtn] = await page.$$("span.wpsNavLevel1");
  await Promise.all([teamBtn.click(), page.waitForSelector("#br7_team_management_own_team")]);
  await expect(page).toMatch("My Team Members");
};

const editTeam = async () => {
  const removeUserCheckboxSelector = "input[type='checkbox'][name='usersToRemove']";

  // add user
  await expect(page).toFill("input[name='userToAdd']", "username");
  await expect(page).toClick("input[type='submit'][value='Add User']");
  await page.waitForSelector(removeUserCheckboxSelector);

  // remove user
  await page.click(removeUserCheckboxSelector);
  await page.click("input[type='submit'][value='Remove Selected Users']");

  await page.waitForFunction(() => !document.querySelector("input[type='checkbox'][name='usersToRemove']"));
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
  canSeeTrigger,
  cannotSeeTrigger,
  canSeeException,
  cannotSeeException,
  exceptionIsEditable,
  buttonIsVisible,
  buttonIsNotVisible,
  clickMainTab,
  triggersAreVisible,
  exceptionsAreVisible,
  exceptionIsReadOnly,
  canSeeReports,
  canSeeQAStatus,
  visitTeamPage,
  editTeam
};
