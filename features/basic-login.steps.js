const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../steps/auth");
const { sendMessage } = require("../steps/message");
const { createValidRecordInPNC } = require("../steps/pnc");
const { findRecordFor, goToExceptionList, checkNoPncErrors } = require("../steps/ui");
const Bichard = require("../utils/helpers");
const loadRelativeFeature = require("../utils/load-relative-feature");

const feature = loadRelativeFeature("./basic-login.feature");

defineFeature(feature, (test) => {
  test("Raising an exception message", async ({ given, and, when, then }) => {
    const context = new Bichard();
    
    given(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    and(/^a message is received/, sendMessage);
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    then(/^the exception list should contain a record for "(.*)"$/, findRecordFor);
    and(/^the record for "(.*)" should not have any PNC errors/, checkNoPncErrors);
  });
});
