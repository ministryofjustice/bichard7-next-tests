const uuid = require("uuid").v4;
const isError = require("../utils/isError");

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
  } else {
    await context.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageIdValue);
  }
};

const aMessageIsReceived = (step) => {
  step("a message is received", () => sendMessage("court_result_input_1"));
};

module.exports = { sendMessage, uploadToS3, aMessageIsReceived };
