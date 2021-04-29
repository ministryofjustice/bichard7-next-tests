const { initialRefreshUrl } = require("../utils/urls");
const { reloadUntilSelector, waitForRecord } = require("../utils/puppeteer-utils");

const iViewTheExceptionList = (step) => {
  step("I view the list of exceptions", async () => {
    await page.goto(initialRefreshUrl());
  });
};

const theExceptionListShouldContainARecordFor = (step) => {
  step(/^the exception list should contain a record for "(.*)"$/, async (name) => {
    await reloadUntilSelector(page, ".resultsTable a.br7_exception_list_record_table_link");
    await page.waitForFunction(
      `document.querySelector('.resultsTable a.br7_exception_list_record_table_link').innerText.includes('${name}')`
    );
  });
};

const theRecordShouldNotHaveAnyPncErrors = (step) => {
  // !TODO: get rid of this unused param without breaking the cucumber runner
  // eslint-disable-next-line no-unused-vars
  step(/^the record for "(.*)" should not have any PNC errors/, async (_) => {
    await page.click(".resultsTable a.br7_exception_list_record_table_link");
    await page.waitForSelector("#br7_exception_details_pnc_data_table");
    await page.waitForFunction(
      "document.querySelector('#br7_exception_details_pnc_data_table').innerText.includes('Theft of pedal cycle')"
    );
  });
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

const iSeeASpecificExceptionCode = (step) => {
  step(/I see exception "(.*)" in the "(.*)" column/, async (exceptionCode, columnName) => {
    await waitForRecord(page);
    const actualExceptionCode = await getFirstRecordCellValue(page, columnName);

    expect(actualExceptionCode).toContain(exceptionCode);
  });
};

const iCannotSeeASpecificExceptionCode = (step) => {
  step(/I cannot see "(.*)" in the "(.*)" column/, async (exceptionCode, columnName) => {
    await waitForRecord(page);
    const actualExceptionCode = await getFirstRecordCellValue(page, columnName);

    expect(actualExceptionCode).not.toContain(exceptionCode);
  });
};

const iOpenTheRecordFor = (step) => {
  step(/I open the record for "(.*)"/, async (name) => {
    await waitForRecord(page);
    await page.click(`.resultsTable a.br7_exception_list_record_table_link[title^='${name}']`);

    await page.waitForSelector("#br7_exception_details_pnc_data_table");
  });
};

const iCanCorrectTheException = async (step) => {
  step("I can correct the exception", async () => {
    await page.waitForSelector("#br7_exception_details");
    await page.click("#br7_button_Defendant");
    await page.waitForSelector("input[type='text'][name='newValue(ASN)']");
  });
};

const aSpecificMenuItemIsNotVisible = async (step) => {
  step(/the "(.*)" menu item is not visible/, async (sectionName) => {
    await page.waitForSelector("#br7_exception_details");
    const triggersBtn = await page.$(`input[type='submit'][value='${sectionName}']`);

    expect(triggersBtn).toBeNull();
  });
};

module.exports = {
  aSpecificMenuItemIsNotVisible,
  iCanCorrectTheException,
  iCannotSeeASpecificExceptionCode,
  iOpenTheRecordFor,
  iViewTheExceptionList,
  iSeeASpecificExceptionCode,
  theExceptionListShouldContainARecordFor,
  theRecordShouldNotHaveAnyPncErrors
};
