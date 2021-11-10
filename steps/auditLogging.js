const expect = require("expect");
const isError = require("../utils/isError");
const Poller = require("../utils/Poller");

const checkEventByExternalCorreationId = async (context, externalCorrelationId, eventType, contains) => {
  const { auditLogDynamoDb } = context;
  const getMessages = async () => auditLogDynamoDb.getMessageByExternalCorrelationId(context, externalCorrelationId);

  const options = {
    timeout: 20000,
    delay: 1000,
    name: eventType,
    condition: (message) => {
      if (!message) {
        return false;
      }
      const hasEvent = message.events.some((event) => event.eventType === eventType);

      return !!contains === hasEvent;
    }
  };

  const result = await new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);

  expect(isError(result)).toBe(false);
};

const checkEventByAuditMessageNumber = (context, auditMessageNumber, eventType, contains) => {
  const { shouldUploadMessagesToS3, incomingMessageBucket } = context;
  if (!shouldUploadMessagesToS3) {
    return undefined;
  }

  if (incomingMessageBucket.uploadedS3Files.length < 1) {
    throw new Error(`Unexpected number of uploaded S3 files. Expected to be more than 0`);
  }

  const externalCorrelationId = incomingMessageBucket.uploadedS3Files[parseInt(auditMessageNumber, 10) - 1]
    .split("/")
    .slice(-1)[0]
    .split(".")[0];

  return checkEventByExternalCorreationId(context, externalCorrelationId, contains);
};

module.exports = { checkEventByExternalCorreationId, checkEventByAuditMessageNumber };
