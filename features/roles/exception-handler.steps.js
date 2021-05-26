const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/message");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  openRecordFor,
  reallocateCase,
  canSeeException,
  cannotSeeException,
  exceptionIsEditable,
  buttonIsNotVisible
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./exception-handler.feature");

defineFeature(feature, (test) => {
  test("Exception handler can see exceptions", async ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    then(/^I see exception "(.*)" in the exception list table$/, canSeeException);
    and(/^I cannot see "(.*)" in the exception list table$/, cannotSeeException);
  });

  test("Exception handlers can handle exceptions", ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^I can correct the exception/, exceptionIsEditable);
  });

  test("Exception handlers cannot see triggers", ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/I open the record for "(.*)"/, openRecordFor);
    then(/the "(.*)" menu item is not visible/, buttonIsNotVisible);
  });

  test("Exception handlers can reallocate cases to another force area", ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^I can reallocate the case to another force area$/, reallocateCase);
  });
});
