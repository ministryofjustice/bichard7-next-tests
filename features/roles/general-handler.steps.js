const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/mq");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  isExceptionEditable,
  isMenuItemVisible,
  openRecordFor,
  containsValue,
  reallocateCase
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./general-handler.feature");

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
  test("General handler can see triggers", async ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);

    then(/^I see trigger "(.*)" in the exception list table$/, async (value) => {
      const isVisible = await containsValue(page, ".resultsTable > tbody td", value);
      expect(isVisible).toBe(true);
    });

    and(/^I see "(.*)" in the exception list table$/, async (value) => {
      const isVisible = await containsValue(page, ".resultsTable > tbody td", value);
      expect(isVisible).toBe(true);
    });
  });

  test("General handlers can handle exceptions", ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);
    andIOpenTheRecordFor(and);

    then("I can correct the exception", async () => {
      const editable = await isExceptionEditable();

      expect(editable).toBe(true);
    });
  });

  test("General handlers can handle triggers", ({ given, and, when, then }) => {
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

  test("General handlers can reallocate cases to another force area", ({ given, and, when, then }) => {
    givenAMessageIsReceived(given);
    andThereIsAValidRecordInThePNC(and);
    andIAmLoggedInAsA(and);
    whenIViewTheExceptionList(when);
    andIOpenTheRecordFor(and);

    then(/I can reallocate the case to another force area/, reallocateCase);
  });
});
