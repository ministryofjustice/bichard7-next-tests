const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const puppeteer = require("puppeteer");

const retryDelay = async (condition, retryFunction, delay) => {
  return new Promise(async (resolve) => {
    const test = async () => {
      const result = await condition();
      if (result) {
        console.log("Success");
        resolve();
      } else {
        await retryFunction();
        setTimeout(test, delay);
      }
    };
    await test();
  });
};

Given(
  "I am logged into the Bichard UI as an exception handler",
  { timeout: 20 * 1000 },
  async function () {
    const page = await this.browser.newPage("/bichard-ui");
    await page.type("#username", "bichard01");
    await page.type("#password", "password");
    await page.click("input[type='submit']");
    await page.waitForSelector(".wpsToolBarUserName");
    await page.waitForFunction(
      "document.querySelector('.wpsToolBarUserName').innerText.includes('You are logged in as: bichard01')"
    );
  }
);

Given("a message is received", async function () {
  // Send a message to the message queue
  await this.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", "court_result_input_1");
});

When("I view the list of exceptions", async function () {
  await this.browser.visitUrl("/bichard-ui/InitialRefreshList");
});

Then(
  "the exception list should contain a record for {string}",
  { timeout: 20 * 1000 },
  async function (recordName) {
    const page = this.browser.currentPage();

    const checkForRecord = async () => {
      page.waitForNavigation();
      return (
        (await page.$(
          ".resultsTable a.br7_exception_list_record_table_link"
        )) !== null
      );
    };

    const reloadPage = async () => {
      page.waitForNavigation();
      await page.click('.br7_exception_list_filter_table input[type="submit"]');
    };

    await retryDelay(checkForRecord, reloadPage, 1000);
    await page.waitForFunction(
      `document.querySelector('.resultsTable a.br7_exception_list_record_table_link').innerText.includes('${recordName}')`
    );
  }
);

Then(
  "the record for {string} should not have any PNC errors",
  async function (recordName) {
    const page = this.browser.currentPage();
    await page.click(".resultsTable a.br7_exception_list_record_table_link");
    await page.waitForSelector("#br7_exception_details_pnc_data_table");
    await page.waitForFunction(
      "document.querySelector('#br7_exception_details_pnc_data_table').innerText.includes('Theft of pedal cycle')"
    );
  }
);
