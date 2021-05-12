const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/mq");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  isExceptionEditable,
  loadDefendantTab,
  openRecordFor,
  loadTriggersTab
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./audit.feature");

defineFeature(feature, (test) => {
  test("Auditors have read only access", async ({ given, and, when, then }) => {
    given("a message is received", async () => {
      await sendMessage("court_result_input_1");
    });

    and(/^there is a valid record for "(.*)" in the PNC$/, async (name) => {
      const helpers = new Bichard();
      await createValidRecordInPNC(helpers)(name);
    });

    and(/^I am logged in as a user with "(.*)" permissions$/, logInAs);

    when("I view the list of exceptions", goToExceptionList);

    and(/I open the record for "(.*)"/, openRecordFor);

    then("I can see exceptions", async () => {
      await loadDefendantTab();

      await expect(page).toMatch("HO100300 - Organisation not recognised");
    });

    and("I can see triggers", async () => {
      await loadTriggersTab();

      await expect(page).toMatch("TRPR0010 - Bail conditions imposed/varied/cancelled - update remand screen");
    });

    and("I cannot make any changes", async () => {
      const editable = await isExceptionEditable();
      expect(editable).toBe(false);

      // auditors can only select "Return To List" so there should only be one "edit" button
      const editBtnsWrapper = await page.waitForSelector("#br7_exception_details_view_edit_buttons");
      const editBtns = await editBtnsWrapper.$$eval("input", (inputs) => inputs.length);
      expect(editBtns).toEqual(1);
    });
  });
});
