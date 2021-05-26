const uuid = require("uuid").v4;
const Bichard = require("../utils/helpers");

const uploadToS3 = (context) => async (messageId, externalCorrelationId, messageReceivedDate) => {
  const s3FileName = await context.s3.uploadIncomingMessage(messageId, externalCorrelationId, messageReceivedDate);

  if (typeof s3FileName !== "string") {
    return false;
  }

  if (context.isLocalWorkspace) {
    const stateMachineResult = await context.stepFunctions.runIncomingMessagesStateMachine(s3FileName);

    if (stateMachineResult) {
      return false;
    }
  }

  return true;
};

const sendMessage = (context) => async (messageId, externalCorrelationId = uuid(), date = new Date()) => {
  const messageIdVal = messageId || "court_result_input_1";

  if (context.shouldUploadMessagesToS3) {
    uploadToS3(context)(messageId, externalCorrelationId, date);
  } else {
    await context.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageIdVal);
  }
};

const aMessageIsReceived = (step) => {
  step("a message is received", async () => {
    await sendMessage("court_result_input_1");
  });
};

module.exports = { sendMessage, uploadToS3, aMessageIsReceived };
