const uuid = require("uuid").v4;
const isError = require("../utils/isError");
const { pollMessagesForEvent } = require("./auditLogging");

const uploadToS3 = async (context, messageId, externalCorrelationId, messageReceivedDate) => {
  const fileName = await context.incomingMessageBucket.upload(messageId, externalCorrelationId, messageReceivedDate);

  if (isError(fileName)) {
    throw fileName;
  }

  if (context.isLocalWorkspace) {
    const stateMachineResult = await context.incomingMessageHandlerStateMachine.execute(fileName);

    if (isError(stateMachineResult)) {
      throw stateMachineResult;
    }
  }
};

const sendMessage = async (context, messageId, externalCorrelationId, date) => {
  const messageIdValue = messageId || "court_result_input_1_custom";
  const externalCorrelationIdValue = externalCorrelationId || `CID-${uuid()}`;
  const dateValue = date || new Date();

  if (context.shouldUploadMessagesToS3) {
    await uploadToS3(context, messageIdValue, externalCorrelationIdValue, dateValue);
    const pollingResult = await pollMessagesForEvent(context, externalCorrelationIdValue, "Message Sent to Bichard");
    expect(isError(pollingResult)).toBeFalsy();
  } else {
    await context.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageIdValue);
  }
};

module.exports = { sendMessage };
