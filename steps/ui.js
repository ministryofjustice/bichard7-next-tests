const { expect } = require("expect");
const { initialRefreshUrl } = require("../utils/urls");
const {
  reloadUntilSelector,
  waitForRecord,
  reloadUntilContent,
  reloadUntilNotContent,
  reloadUntilContentInSelector
} = require("../utils/puppeteer-utils");
const fsHelp = require("../helpers/fsHelper");

const filterByRecordName = async function (world) {
  const name = world.getRecordName();
  if (process.env.nextUI) {
    await world.browser.page.click("button#filter-button")
  }
  const searchField = process.env.nextUI ? "input[name='keywords']" : "input[name='defendantSearch']";

  // Triple click selects any existing text so we type over it
  await world.browser.page.click(searchField, { clickCount: 3 });
  await world.browser.page.type(searchField, name);
  await Promise.all([world.browser.page.keyboard.press("Enter"), world.browser.page.waitForNavigation()]);
};

const containsValue = async function (page, selector, value) {
  await page.waitForSelector(selector);

  const matches = await page.$$(selector).then((els) => els.map((el) => el.getProperty("innerText")));
  const innerTexts = await Promise.all(matches);
  const jsonValues = await Promise.all(await innerTexts.map((m) => m.jsonValue()));

  return Boolean(jsonValues.find((j) => j.includes(value)));
};

const getTableData = async function (world, selector) {
  const trPromises = await world.browser.page
    .$$(selector)
    .then((els) =>
      els.map((elHandle) => elHandle.evaluate((el) => [...el.querySelectorAll("td")].map((e) => e.innerText.trim())))
    );
  return Promise.all(trPromises);
};

const getRawTableData = async function (world, selector) {
  const trPromises = await world.browser.page
    .$$(selector)
    .then((els) =>
      els.map((elHandle) => elHandle.evaluate((el) => [...el.querySelectorAll("td")].map((e) => e.innerHTML)))
    );
  return Promise.all(trPromises);
};

const checkDataTable = async function (world, values) {
  const tableData = process.env.nextUI
    ? await getTableData(world, "#Triggers_table .TableBody-sc-1qqarm8-0 tr")
    : await getTableData(world, "#br7_exception_details_court_data_table .resultsTable tbody tr");

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
  if (this.noUi) return;
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

const openRecordForCurrentTest = async function () {
  const record = process.env.nextUI
    ? `.src__StyledTable-sc-16s660v-0 .TableBody-sc-1qqarm8-0 a.src__Link-sc-1loawqx-0[id^='Case details for ${this.getRecordName()}']`
    : `.resultsTable a.br7_exception_list_record_table_link[title^='${this.getRecordName()}']`;

  await filterByRecordName(this);
  await waitForRecord(this.browser.page);
  await Promise.all([this.browser.page.click(record), this.browser.page.waitForNavigation()]);
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
  if (process.env.nextUI && tabName.toLowerCase() === "triggers") {
    // Triggers displayed on the case details page on the new UI
    return;
  }

  const tabIds = {
    hearing: "#br7_button_Hearing",
    case: "#br7_button_Case",
    defendant: "#br7_button_Defendant",
    offences: "#br7_button_OffenceList",
    notes: "#br7_button_Note",
    triggers: "#br7_button_Trigger",
    "pnc errors": "#br7_button_PNCError"
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

  await this.browser.clickAndWait("input[value='OK']");
  await this.browser.clickAndWait(".resultsTable a.br7_exception_list_record_table_link");
  await loadRecordTab(this.browser.page, "#br7_button_Note", ".br7_exception_details_court_data_tabs_table");

  const latestNote = await page
    .$("#br7_exception_details_display_notes tr > td")
    .then((el) => el.getProperty("innerText"))
    .then((el) => el.jsonValue());

  expect(latestNote).toContain("Case reallocated to new force owner");
};

const reallocateCaseToForce = async function (force) {
  const { page } = this.browser;
  await this.browser.clickAndWait("#br7_exception_details_view_edit_buttons > input[value='Reallocate Case']");
  const options = await page.$$eval("#reallocateAction option", (els) =>
    els.map((el) => ({ id: el.getAttribute("value"), text: el.innerText.trim() }))
  );
  const selectedOptionId = options.find((option) => option.text.includes(force)).id;
  await page.select("#reallocateAction", selectedOptionId);
  await this.browser.clickAndWait("input[value='OK']");
};

const canSeeContentInTable = async function (value) {
  const found = await reloadUntilContentInSelector(this.browser.page, value, ".resultsTable > tbody td");
  expect(found).toBeTruthy();
};

const canSeeContentInTableForThis = async function (value) {
  await filterByRecordName(this);
  const found = await reloadUntilContentInSelector(this.browser.page, value, ".resultsTable > tbody td");
  expect(found).toBeTruthy();
};

const cannotSeeTrigger = async function (value) {
  await waitForRecord(this.browser.page, 2);
  const isVisible = await containsValue(this.browser.page, ".resultsTable > tbody td", value);
  expect(isVisible).toBe(false);
};

const cannotSeeException = async function (exception) {
  await waitForRecord(this.browser.page, 2);
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

const recordsForPerson = async function (count, name) {
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000));

  // Grab the current value of the exception type filter so that it can be restored after the test
  const filterValue = await this.browser.page.$eval("#exceptionTypeFilter > option[selected]", (el) => el.textContent);

  await this.browser.selectDropdownOption("exceptionTypeFilter", "All");
  await this.browser.clickAndWait("table.br7_exception_list_filter_table input[type=submit][value=Refresh]");
  const links = await this.browser.page.$$(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`);
  expect(links.length).toEqual(Number(count));

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

const resolveAllTriggers = async function () {
  if (process.env.nextUI) {
    let resolveTriggersButtons = await this.browser.page.$$(
      "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
    );

    /* eslint-disable no-await-in-loop */
    while (resolveTriggersButtons.length > 0) {
      await Promise.all([
        this.browser.page.click("#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled]"),
        this.browser.page.waitForNavigation()
      ]);

      resolveTriggersButtons = await this.browser.page.$$(
        "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
      );
    }
    /* eslint-enable no-await-in-loop */
  } else {
    await this.browser.page.$$eval("input[name='triggerMarkedAsCompleteList']", (elHandle) =>
      elHandle.forEach((el) => el.click())
    );

    await Promise.all([
      this.browser.page.click("input[value='Mark Selected Complete']"),
      this.browser.page.waitForNavigation()
    ]);
  }
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
  await world.browser.page.waitForSelector("select#exceptionTypeFilter")
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

const checkRecordForThisTestResolved = async function (recordType, resolvedType) {
  if (process.env.nextUI) {
    // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
    let resolveTriggersButtons = await this.browser.page.$$(
      "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
    );

    expect(resolveTriggersButtons.length).toEqual(0);
  } else {
    await filterRecords(this, resolvedType, recordType);
    expect(await this.browser.elementText("table.resultsTable")).toMatch(this.getRecordName());
  }
};

const checkRecordNotResolved = async function (recordType, recordName, resolvedType) {
  await filterRecords(this, resolvedType, recordType);
  expect(await this.browser.elementText("table.resultsTable")).not.toMatch(recordName);
};

const checkRecordForThisTestNotResolved = async function (recordType, resolvedType) {
  if (process.env.nextUI) {
    // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
    let resolveTriggersButtons = await this.browser.page.$$(
      "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
    );

    expect(resolveTriggersButtons.length).toEqual(0);
  } else {
    await filterRecords(this, resolvedType, recordType);
    expect(await this.browser.elementText("table.resultsTable")).not.toMatch(this.getRecordName());
  }
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

const checkNoteExists = async function (value) {
  const tableData = await getTableData(this, "#br7_exception_details_display_notes .resultsTable tbody tr");
  if (!tableData.some((row) => row[0].includes(value))) {
    throw new Error("Note does not exist");
  }
};

const checkOffenceDataError = async function (value, key) {
  await checkDataTable(this, [
    { column: 1, value: key, exact: true },
    { column: 3, value, exact: false }
  ]);
};

const returnToList = async function () {
  await this.browser.clickAndWait("input[type='submit'][value='Return To List (Unlock)']");
  const yesButton = await this.browser.page.$("input[type='submit'][value='Yes']");
  if (yesButton) {
    await this.browser.clickAndWait("input[type='submit'][value='Yes']");
  }
};

const correctOffenceException = async function (field, newValue) {
  await this.browser.page.$$("#br7_exception_details_court_data_table .resultsTable tbody tr").then((rows) =>
    rows.map((row) =>
      row.evaluate(
        (rowEl, fieldName, value) => {
          const tds = [...rowEl.querySelectorAll("td")].map((e) => e.innerText.trim());
          if (tds[0] === fieldName) {
            let input = rowEl.querySelector("input[type='text']");
            if (!input) {
              input = rowEl.querySelector("textarea");
            }
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

const checkNoExceptionsForThis = async function () {
  if (process.env.nextUI) {
    // TODO: Currently there is no way of viewing exceptions, we need to update next UI and update this test
  } else {
    const name = this.getRecordName();
    await filterRecords(this, "unresolved", "exception");
    const links = await this.browser.page.$$(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`);
    expect(links.length).toEqual(0);
  }
};

const checkNoRecords = async function () {
  await filterRecords(this, "unresolved", "record");
  const tableRows = await this.browser.page.$$("table.resultsTable tr");
  expect(tableRows.length).toEqual(2);
};

const checkNoRecordsForThis = async function () {
  const name = this.getRecordName();
  if (this.noUi) {
    // Read the records direct from the DB
    const records = await this.db.getMatchingErrorRecords(name);
    expect(records.length).toEqual(0);
  } else {
    // Check for no exceptions of triggers via the UI
    await filterRecords(this, "unresolved", "record");
    const links = await this.browser.page.$$(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`);
    expect(links.length).toEqual(0);
  }
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

const checkRecordRows = async function (recordCount) {
  const trPromises = await this.browser.page.$$(
    "#br7_exception_list_records .resultsTable tbody tr a.br7_exception_list_record_table_link"
  );
  expect(trPromises.length).toEqual(parseInt(recordCount, 10));
};

const selectTrigger = async function (triggerNo) {
  const checkBoxes = await this.browser.page.$$(
    "#br7_exception_details_court_data_table .resultsTable tbody tr input[type=checkbox]"
  );
  const index = parseInt(triggerNo, 10) - 1;
  checkBoxes[index].click();
};

module.exports = {
  checkNoPncErrors,
  containsValue,
  findRecordFor,
  goToExceptionList,
  isExceptionEditable,
  loadDefendantTab,
  loadTriggersTab,
  openRecordForCurrentTest,
  openRecordFor,
  reallocateCase,
  cannotReallocateCase,
  reallocateCaseToForce,
  canSeeContentInTable,
  canSeeContentInTableForThis,
  cannotSeeTrigger,
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
  checkCompleteTriggerforOffence,
  resolveAllTriggers,
  checkRecordResolved,
  checkRecordForThisTestResolved,
  checkRecordNotResolved,
  checkRecordForThisTestNotResolved,
  manuallyResolveRecord,
  viewOffence,
  checkOffenceData,
  checkOffenceDataError,
  returnToList,
  checkRecordNotExists,
  correctOffenceException,
  correctOffenceFreeTextException,
  submitRecord,
  reloadUntilStringPresent,
  reloadUntilStringNotPresent,
  checkNoExceptions,
  checkNoExceptionsForThis,
  checkNoRecords,
  checkNoRecordsForThis,
  waitForRecordStep,
  checkOffence,
  checkTableRows,
  checkRecordRows,
  checkNoteExists,
  selectTrigger,
  getTableData,
  getRawTableData,
  recordsForPerson
};
