const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/message");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  openRecordFor,
  exceptionIsNotEditable,
  buttonIsVisible,
  canSeeTrigger,
  cannotSeeException,
  cannotReallocateCase
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./trigger-handler.feature");

defineFeature(feature, (test) => {
  test("Trigger handler can see triggers", async ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    then(/^I see trigger "(.*)" in the exception list table$/, canSeeTrigger);
    and(/^I cannot see "(.*)" in the exception list table$/, cannotSeeException);
  });

  test("Trigger handlers cannot handle exceptions", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^I cannot correct the exception/, exceptionIsNotEditable);
  });

  test("Trigger handlers can handle triggers", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/^the "(.*)" menu item is visible$/, buttonIsVisible);
  });

  test("Trigger handlers cannot reallocate cases to another force area", ({ given, and, when, then }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^I am logged in as a "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/^I open the record for "(.*)"/, openRecordFor);
    then(/I cannot reallocate the case to another force area$/, cannotReallocateCase);
  });
});
