const uuid = require("uuid").v4;
const expect = require("expect");
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

const sendMessage = async function (messageId, externalCorrelationId, date) {
  const messageIdValue = messageId || "court_result_input_1_custom";
  const externalCorrelationIdValue = externalCorrelationId || `CID-${uuid()}`;
  const dateValue = date || new Date();

  if (this.shouldUploadMessagesToS3) {
    const uploadResult = await uploadToS3(this, messageIdValue, externalCorrelationIdValue, dateValue);
    expect(isError(uploadResult)).toBeFalsy();
    const pollingResult = await pollMessagesForEvent(this, externalCorrelationIdValue, "Message Sent to Bichard");
    expect(isError(pollingResult)).toBeFalsy();
  } else {
    await this.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageIdValue);
  }
};

module.exports = { sendMessage };
