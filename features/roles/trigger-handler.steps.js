const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/mq");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  checkValueInColumn,
  checkValueNotInColumn,
  goToExceptionList,
  isExceptionEditable,
  isMenuItemVisible,
  openRecordFor
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./trigger-handler.feature");

// shared background steps
const givenAMessageIsReceived = (given) => {
  given("a message is received", async () => {
    await sendMessage("court_result_input_1");
  });
};

const andThereIsAValidRecordInThePNC = (and) => {
  and(/^there is a valid record for "(.*)" in the PNC$/, async (name) => {
    const helpers = new Bichard();
    await createValidRecordInPNC(helpers)(name);
  });
};

const andIAmLoggedInAsA = (and) => {
  and(/^I am logged in as a "(.*)"$/, logInAs);
};

const whenIViewTheExceptionList = (when) => {
  when("I view the list of exceptions", goToExceptionList);
};

const andIOpenTheRecordFor = (and) => {
  and(/I open the record for "(.*)"/, openRecordFor);
};

defineFeature(feature, (test) => {
  test("Trigger handler can see triggers", async ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);

    then(/^I see trigger "(.*)" in the "(.*)" column$/, checkValueInColumn);
    and(/^I cannot see "(.*)" in the "(.*)" column$/, checkValueNotInColumn);
  });

  test("Trigger handlers can handle triggers", ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);
    andIOpenTheRecordFor(and);

    then("I cannot correct the exception", async () => {
      const editable = await isExceptionEditable();

      expect(editable).toBe(false);
    });
  });

  test("Trigger handlers can see triggers", ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);
    andIOpenTheRecordFor(and);

    then(/the "(.*)" menu item is visible/, async (sectionName) => {
      const visible = await isMenuItemVisible(sectionName);
      expect(visible).toBe(true);
    });
  });
});
