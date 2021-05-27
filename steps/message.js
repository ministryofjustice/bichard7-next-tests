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

const sendMessage = async (context, messageId, externalCorrelationId = uuid(), date = new Date()) => {
  const messageIdVal = messageId || "court_result_input_1";

  if (context.shouldUploadMessagesToS3) {
    await uploadToS3(context)(messageId, externalCorrelationId, date);
  } else {
    await context.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageIdVal);
  }
};

const aMessageIsReceived = (step) => {
  step("a message is received", () => sendMessage("court_result_input_1"));
};

module.exports = { sendMessage, uploadToS3, aMessageIsReceived };
