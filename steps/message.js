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
    const name = bits[i].substring(0, bits[i].length - 2);
    // const newName = uuid().toString().substr(0, 10); // if string is too long, it fudges the PNC
    let newName = "";
    if (tag === "DC:PTIURN") {
      for (let j = 0; j < world.currentPTIURNValues.length; j += 1) {
        if (world.currentPTIURNValues[j][0] === name) {
          // eslint-disable-next-line prefer-destructuring
          newName = world.currentPTIURNValues[j][1];
          break;
        }
        console.log(name, newName);
      }
    } else if (tag === "DC:PersonFamilyName") {
      for (let j = 0; j < world.currentTestFamilyNames.length; j += 1) {
        if (world.currentTestFamilyNames[j][0] === name) {
          // eslint-disable-next-line prefer-destructuring
          newName = world.currentTestFamilyNames[j][1];
          break;
        }
      }
    } else if (tag === "DC:PersonGivenName1") {
      for (let j = 0; j < world.currentTestGivenNames1.length; j += 1) {
        if (world.currentTestGivenNames1[j][0] === name) {
          // eslint-disable-next-line prefer-destructuring
          newName = world.currentTestGivenNames1[j][1];
          break;
        }
      }
    } else if (tag === "DC:PersonGivenName2") {
      for (let j = 0; j < world.currentTestGivenNames2.length; j += 1) {
        if (world.currentTestGivenNames2[j][0] === name) {
          // eslint-disable-next-line prefer-destructuring
          newName = world.currentTestGivenNames2[j][1];
          break;
        }
      }
    } else if (tag === "DC:ProsecutorReference") {
      for (let j = 0; j < world.currentProsecutorReference.length; j += 1) {
        if (world.currentProsecutorReference[j][0] === name) {
          // eslint-disable-next-line prefer-destructuring
          newName = world.currentProsecutorReference[j][1];
          break;
        }
      }
    }
    newMessage = `${newMessage + newName}</${tag}>${bits[i + 1]}`;
  }
  return newMessage;
};

const sendMsg = async function (world, messagePath, externalCorrelationId, date) {
  const message = await fs.promises.readFile(messagePath);
  let messageData = message.toString();
  /*
  if (process.env.RUN_PARALLEL) {
    // Insert random name and PTIURN
    messageData = messageData.replace("<DC:PTIURN>.+</DC:PTIURN>", `<DC:PTIURN>${world.currentPTIURN}</DC:PTIURN>`); // find PTIURN and use world  - DC:PTIURN
  } */
  // populate PTIURN
  messageData = await extractAndReplaceTags(world, messageData, "DC:PTIURN");

  // populate given names 1
  messageData = await extractAndReplaceTags(world, messageData, "DC:PersonGivenName1");

  // populate given names 2
  messageData = await extractAndReplaceTags(world, messageData, "DC:PersonGivenName2");

  // populate family names
  messageData = await extractAndReplaceTags(world, messageData, "DC:PersonFamilyName");

  // populate prosecutor reference
  messageData = await extractAndReplaceTags(world, messageData, "DC:ProsecutorReference");

  if (world.shouldUploadMessagesToS3) {
    const externalCorrelationIdValue = externalCorrelationId || `CID-${uuid()}`;
    const dateValue = date || new Date();
    const uploadResult = await uploadToS3(world, messageData, externalCorrelationIdValue, dateValue);
    expect(isError(uploadResult)).toBeFalsy();
    const pollingResult = await pollMessagesForEvent(world, externalCorrelationIdValue, "Message Sent to Bichard");
    expect(isError(pollingResult)).toBeFalsy();
  } else {
    const externalCorrelationIdValue = `CID-${uuid()}`;
    messageData = messageData.replace("EXTERNAL_CORRELATION_ID", externalCorrelationIdValue);
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
