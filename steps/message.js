const uuid = require("uuid").v4;
const expect = require("expect");
const path = require("path");
const fs = require("fs");
const isError = require("../utils/isError");
const convertMessageToNewFormat = require("../utils/convertMessageToNewFormat");
const { checkEventByExternalCorreationId } = require("./auditLogging");
const { replaceAllTags } = require("../utils/tagProcessing");

const uploadToS3 = async (context, message, correlationId) => {
  const fileName = await context.incomingMessageBucket.upload(message, correlationId);

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

const sendMsg = async function (world, messagePath) {
  const rawMessage = await fs.promises.readFile(messagePath);
  const correlationId = `CID-${uuid()}`;
  let messageData = rawMessage.toString().replace("EXTERNAL_CORRELATION_ID", correlationId);
  if (world.parallel) {
    messageData = replaceAllTags(world, messageData, "DC:");
  }

  if (world.shouldUploadMessagesToS3) {
    messageData = convertMessageToNewFormat(messageData);
    const uploadResult = await uploadToS3(world, messageData, correlationId);
    expect(isError(uploadResult)).toBeFalsy();
    const checkEventResult = await checkEventByExternalCorreationId(
      world,
      correlationId,
      "Message Sent to Bichard",
      true
    );
    expect(isError(checkEventResult)).toBeFalsy();
    return Promise.resolve();
  }
  return world.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageData);
};

const sendMessage = async function (messageId) {
  const messageIdValue = messageId || "court_result_input_1_custom";
  const messagePath = `./fixtures/messages/${messageIdValue}.xml`;
  return sendMsg(this, messagePath);
};

const sendMessageForTest = async function (messageFileName) {
  const specFolder = path.dirname(this.featureUri);
  const messagePath = `${specFolder}/${messageFileName}.xml`;
  return sendMsg(this, messagePath);
};

module.exports = { sendMessage, sendMessageForTest };
