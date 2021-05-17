const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../steps/auth");
const { sendMessage } = require("../steps/mq");
const { createValidRecordInPNC } = require("../steps/pnc");
const { findRecordFor, goToExceptionList, checkNoPncErrors } = require("../steps/ui");
const Bichard = require("../utils/helpers");
const loadRelativeFeature = require("../utils/load-relative-feature");

const feature = loadRelativeFeature("./basic-login.feature");

defineFeature(feature, (test) => {
  test("Raising an exception message", async ({ given, and, when, then }) => {
    given(/^a message is received/, sendMessage);
    and(/^there is a valid record for "(.*)" in the PNC$/, createValidRecordInPNC(new Bichard()));
    and(/^I am logged in as an "(.*)"$/, logInAs);
    when(/^I view the list of exceptions/, goToExceptionList);
    then(/^the exception list should contain a record for "(.*)"$/, findRecordFor);
    and(/^the record for "(.*)" should not have any PNC errors/, checkNoPncErrors);
  });
});
