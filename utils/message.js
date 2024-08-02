const uuid = require("uuid").v4
const { expect } = require("expect")
const path = require("path")
const fs = require("fs")
const isError = require("./isError")
const convertMessageToNewFormat = require("./convertMessageToNewFormat")
const { checkAuditLogRecordExists } = require("./auditLogging")
const { replaceAllTags } = require("./tagProcessing")

const uploadToS3 = async (context, message, correlationId) => {
  const fileName = await context.incomingMessageBucket.upload(message, correlationId)

  if (isError(fileName)) {
    throw fileName
  }
}

const sendMsg = async function (world, messagePath) {
  const rawMessage = await fs.promises.readFile(messagePath)
  const correlationId = `CID-${uuid()}`
  let messageData = rawMessage.toString().replace("EXTERNAL_CORRELATION_ID", correlationId)
  world.setCorrelationId(correlationId)
  if (world.config.parallel) {
    messageData = replaceAllTags(world, messageData, "DC:")
  }

  if (world.config.messageEntryPoint === "s3") {
    messageData = convertMessageToNewFormat(messageData)
    const uploadResult = await uploadToS3(world, messageData, correlationId)
    expect(isError(uploadResult)).toBeFalsy()
    const checkEventResult = await checkAuditLogRecordExists(world, correlationId)
    expect(isError(checkEventResult)).toBeFalsy()
    return Promise.resolve()
  }

  if (world.config.messageEntryPoint === "mq") {
    await world.auditLogApi.createAuditLogMessage(correlationId)
    return world.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageData)
  }

  throw new Error(`Invalid value for MESSAGE_ENTRY_POINT: ${world.config.messageEntryPoint}`)
}

const sendMessageForTest = function (messageFileName) {
  const specFolder = path.dirname(this.featureUri)
  const messagePath = `${specFolder}/${messageFileName}.xml`
  return sendMsg(this, messagePath)
}

module.exports = { sendMessageForTest }
