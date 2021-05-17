const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const { sendMessage } = require("../../steps/mq");
const { createValidRecordInPNC } = require("../../steps/pnc");
const {
  goToExceptionList,
  openRecordFor,
  exceptionsAreVisible,
  exceptionIsReadOnly,
  triggersAreVisible
} = require("../../steps/ui");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./audit.feature");

defineFeature(feature, (test) => {
  test("Auditors have read only access", async ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as a user with "(.*)" permissions$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    and(/I open the record for "(.*)"/, openRecordFor);
    then(/^I can see exceptions/, exceptionsAreVisible);
    and(/^I can see triggers/, triggersAreVisible);
    and(/^I cannot make any changes/, exceptionIsReadOnly);
  });
});
