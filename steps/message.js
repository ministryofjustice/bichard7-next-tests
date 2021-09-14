const uuid = require("uuid").v4;
const expect = require("expect");
const path = require("path");
const fs = require("fs");
const isError = require("../utils/isError");
const { pollMessagesForEvent } = require("./auditLogging");

const uploadToS3 = async (context, message, externalCorrelationId, messageReceivedDate) => {
  const fileName = await context.incomingMessageBucket.upload(
    message.toString(),
    externalCorrelationId,
    messageReceivedDate
  );

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

const extractAndReplaceTags = async (world, message, tag) => {
  const bits = message.split(`${tag}>`);
  if (bits.length < 2) {
    return message;
  }
  let newMessage = `${bits[0]}${tag}>`;
  for (let i = 1; i < bits.length; i += 2) {
    const familyName = bits[i].substring(0, bits[i].length - 2);
    const newFamilyName = uuid();
    world.currentTestFamilyNames.push([familyName, newFamilyName]);
    newMessage = `${newMessage + newFamilyName}</${tag}>${bits[i + 1]}`;
  }
  return newMessage;
};

const sendMsg = async function (world, messagePath, externalCorrelationId, date) {
  const message = await fs.promises.readFile(messagePath);
  let messageData = message.toString();

  if (process.env.RUN_PARALLEL) {
    // Insert random name and PTIURN
    messageData.replace("<DC:PTIURN>.+</DC:PTIURN>", `<DC:PTIURN>${world.currentPTIURN}</DC:PTIURN>`); // find PTIURN and use world  - DC:PTIURN

    // populate given names 1
    messageData = await extractAndReplaceTags(world, messageData, "DC:PersonGivenName1");

    // populate given names 2
    messageData = await extractAndReplaceTags(world, messageData, "DC:PersonGivenName2");

    // populate family names
    messageData = await extractAndReplaceTags(world, messageData, "DC:PersonFamilyName");
  }

  if (world.shouldUploadMessagesToS3) {
    const externalCorrelationIdValue = externalCorrelationId || `CID-${uuid()}`;
    const dateValue = date || new Date();
    const uploadResult = await uploadToS3(world, messageData, externalCorrelationIdValue, dateValue);
    expect(isError(uploadResult)).toBeFalsy();
    const pollingResult = await pollMessagesForEvent(world, externalCorrelationIdValue, "Message Sent to Bichard");
    expect(isError(pollingResult)).toBeFalsy();
  } else {
    await world.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageData);
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
