const uuid = require("uuid").v4;
const expect = require("expect");
const path = require("path");
const fs = require("fs");
const isError = require("../utils/isError");
const { pollMessagesForEvent } = require("./auditLogging");

const uploadToS3 = async (context, message, externalCorrelationId, messageReceivedDate) => {
  const fileName = await context.incomingMessageBucket.upload(message, externalCorrelationId, messageReceivedDate);

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

const sendMsg = async function (world, messagePath, externalCorrelationId, date) {
  const message = await fs.promises.readFile(messagePath);

  if (this.shouldUploadMessagesToS3) {
    const externalCorrelationIdValue = externalCorrelationId || `CID-${uuid()}`;
    const dateValue = date || new Date();
    const uploadResult = await uploadToS3(this, message, externalCorrelationIdValue, dateValue);
    expect(isError(uploadResult)).toBeFalsy();
    const pollingResult = await pollMessagesForEvent(this, externalCorrelationIdValue, "Message Sent to Bichard");
    expect(isError(pollingResult)).toBeFalsy();
  } else {
    await world.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", message);
  }
};

const sendMessage = async function (messageId, externalCorrelationId, date) {
  const messageIdValue = messageId || "court_result_input_1_custom";
  const messagePath = `./fixtures/messages/${messageIdValue}.xml`;
  return sendMsg(this, messagePath, externalCorrelationId, date);
};

const sendMessageForTest = async function (messageFileName) {
  const specFolder = path.dirname(this.featureUri);
  const messagePath = `${specFolder}/${messageFileName}.xml`;
  return sendMsg(this, messagePath);
};

module.exports = { sendMessage, sendMessageForTest };
