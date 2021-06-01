/**
 * @jest-environment node
 */
const { defineFeature, loadFeature } = require("jest-cucumber");
const { sendMessage } = require("../steps/message");
const { createValidRecordInPNC, checkMocks } = require("../steps/pnc");
const Bichard = require("../utils/helpers");

const feature = loadFeature("features/pnc-write.feature");

defineFeature(feature, (test) => {
  test("Writing a court result for record <recordId> to the PNC", ({ given, when, then }) => {
    const context = new Bichard();
    given(/^there is a valid record for (.*) in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    when(/^message id (.*) is received$/, (messageId) => sendMessage(context, messageId));
    then("the PNC updates the record", () => checkMocks(context));
  });
});
