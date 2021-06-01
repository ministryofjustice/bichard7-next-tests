const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/message");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  openRecordFor,
  reallocateCase,
  exceptionIsEditable,
  canSeeException,
  buttonIsVisible,
  canSeeTrigger
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./general-handler.feature");

defineFeature(feature, (test) => {
  test("General handler can see triggers", async ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    then(/^I see trigger "(.*)" in the exception list table$/, canSeeTrigger);
    then(/^I see exception "(.*)" in the exception list table$/, canSeeException);
  });

  test("General handlers can handle exceptions", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^I can correct the exception/, exceptionIsEditable);
  });

  test("General handlers can handle triggers", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^the "(.*)" menu item is visible/, buttonIsVisible);
  });

  test("General handlers can reallocate cases to another force area", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^I can reallocate the case to another force area/, reallocateCase);
  });
});
