/**
 * @jest-environment node
 */
const { defineFeature, loadFeature } = require("jest-cucumber");
const uuid = require("uuid").v4;
const { pollMessagesForEvent, checkIfMessageHasEvent } = require("../steps/auditLogging");
const { uploadIncomingMessage } = require("../steps/s3");
const { createValidRecordInPNC } = require("../steps/pnc");
const Bichard = require("../utils/helpers");

const feature = loadFeature("features/new-file-received-in-s3-bucket.feature");

defineFeature(feature, (test) => {
  test('Recording "PNC Response not received" event when PNC does not respond', async ({ given, when, then }) => {
    jest.setTimeout(60000);
    const context = new Bichard();
    const externalCorrelationId = uuid();

    given(/^there is a valid record for (.*) in the PNC$/, createValidRecordInPNC(context));

    when(/^(.*) is uploaded to S3 bucket$/, (messageId) =>
      uploadIncomingMessage(context)(messageId, externalCorrelationId, new Date())
    );

    then(/^Audit logging records "(.*)" event against the message$/, (sentToBichardEventType) =>
      pollMessagesForEvent(context)(externalCorrelationId, sentToBichardEventType)
    );

    then(/^Bichard sends "(.*)" event to Audit logging$/, (pncResponseReceivedEventType) =>
      pollMessagesForEvent(context)(externalCorrelationId, pncResponseReceivedEventType)
    );
  });
});
