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

const getFirstRecordCellValue = async (page, columnName) => {
  await page.waitForSelector(".br7_exception_list_record_table_header");
  const exceptionListHeaders = await page.$$eval(".br7_exception_list_record_table_header", (headers) =>
    headers.map((h) => h.textContent)
  );

  const colNumber = exceptionListHeaders.indexOf(columnName) + 1; // needed for a selector which is not 0-indexed

  const cellValue = await page
    .$(`.resultsTable > tbody > tr:nth-child(3) > td:nth-child(${colNumber})`)
    .then((el) => el.getProperty("innerText"))
    .then((el) => el.jsonValue());

  return cellValue;
};

const checkValueInColumn = async (exceptionCode, columnName) => {
  await waitForRecord(page);
  const actualExceptionCode = await getFirstRecordCellValue(page, columnName);

  expect(actualExceptionCode).toContain(exceptionCode);
};

const checkValueNotInColumn = async (exceptionCode, columnName) => {
  await waitForRecord(page);
  const actualExceptionCode = await getFirstRecordCellValue(page, columnName);

  expect(actualExceptionCode).not.toContain(exceptionCode);
};

const openRecordFor = async (name) => {
  await waitForRecord(page);
  await page.click(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`);

  await page.waitForSelector("#br7_exception_details_pnc_data_table");
};

const isExceptionEditable = async () => {
  await page.waitForSelector("#br7_exception_details");
  await page.click("#br7_button_Defendant");
  await page.waitForSelector(".br7_exception_details_column_name");

  const editException = await page.$("input[type='text'][name='newValue(ASN)']");

  return Boolean(editException);
};

const isMenuItemVisible = async (sectionName) => {
  const triggersBtn = await page.$(
    `.br7_exception_details_court_data_tabs_table input[type='submit'][value='${sectionName}']`
  );

  return Boolean(triggersBtn);
};

module.exports = {
  checkNoPncErrors,
  checkValueInColumn,
  checkValueNotInColumn,
  findRecordFor,
  goToExceptionList,
  isExceptionEditable,
  isMenuItemVisible,
  openRecordFor
};
