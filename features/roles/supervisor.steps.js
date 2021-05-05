const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");
const { sendMessage } = require("../../steps/mq");
const { createValidRecordInPNC } = require("../../steps/pnc");

const feature = loadRelativeFeature("./supervisor.feature");

defineFeature(feature, (test) => {
  test("Supervisors can run reports", ({ given, when, then }) => {
    given(/I am logged in as a "(.*)"/, logInAs);
    when(/I click the "(.*)" menu button/, async (label) => {
      await page.waitForSelector("span.wpsNavLevel1");

      const links = await page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
      expect(links).toContain(label);
    });

    then("I am taken to a list of reports", async () => {
      const [, reportsBtn] = await page.$$("span.wpsNavLevel1");
      await reportsBtn.click();

      await page.waitForSelector("#report-index-list .wpsNavLevel2");

      await expect(page).toMatch("Live Status Summary");
    });
  });

  test("Supervisors can see QA status of records", ({ given, when, then, and }) => {
    given("a message is received", async () => {
      await sendMessage("court_result_input_1");
    });

    and(/^there is a valid record for "(.*)" in the PNC$/, async (name) => {
      const helpers = new Bichard();
      await createValidRecordInPNC(helpers)(name);
    });
    when(/I log in as a "(.*)"/, logInAs);

    then("I can see the QA status of a record", async () => {
      await page.waitForSelector(".resultsTable");

      const exceptionTableHeaders = await page.$$eval(".resultsTable th", (headers) =>
        headers.map((h) => h.textContent.trim())
      );

      expect(exceptionTableHeaders).toContain("QA Status");
    });
  });

  test("Supervisors can manage their team", ({ given, when, then, and }) => {
    given(/I am logged in as a "(.*)"/, logInAs);
    when(/I click the "(.*)" menu button/, async (label) => {
      await page.waitForSelector("span.wpsNavLevel1");

      const links = await page.$$eval("span.wpsNavLevel1", (sections) => sections.map((s) => s.textContent));
      expect(links).toContain(label);
    });

    then("I am taken to the Team Management screen", async () => {
      const [, , teamBtn] = await page.$$("span.wpsNavLevel1");
      await teamBtn.click();

      await page.waitForSelector("#br7_team_management_own_team");

      await expect(page).toMatch("My Team Members");
    });

    and("I can add and remove members from my team", async () => {
      const removeUserCheckboxSelector = "input[type='checkbox'][name='usersToRemove']";

      // add user
      await expect(page).toFill("input[name='userToAdd']", "username");
      await expect(page).toClick("input[type='submit'][value='Add User']");
      await page.waitForSelector(removeUserCheckboxSelector);

      // remove user
      await page.click(removeUserCheckboxSelector);
      await page.click("input[type='submit'][value='Remove Selected Users']");
      const remove = await page.$(removeUserCheckboxSelector);

      expect(remove).toBeNull();
    });
  });
});
