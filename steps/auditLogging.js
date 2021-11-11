const isError = require("../utils/isError");
const Poller = require("../utils/Poller");

const checkEventByExternalCorreationId = async (context, externalCorrelationId, eventType, contains) => {
  const { auditLogDynamoDb } = context;
  const getMessages = () => auditLogDynamoDb.getMessageByExternalCorrelationId(externalCorrelationId);

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

  if (isError(result)) {
    throw result;
  }
};

const checkEventByAuditMessageNumber = (context, auditMessageNumber, eventType, contains) => {
  const {
    incomingMessageBucket: { uploadedS3Files }
  } = context;

  if (uploadedS3Files.length === 0) {
    throw new Error(`No S3 files has been uploaded`);
  }

  const s3FileIndex = parseInt(auditMessageNumber, 10) - 1;
  const externalCorrelationId = uploadedS3Files[s3FileIndex].split("/").slice(-1)?.[0]?.split(".")?.[0];

  if (!externalCorrelationId) {
    throw new Error(`Could not extract external correlation ID from the S3 file with index ${s3FileIndex}`);
  }

  return checkEventByExternalCorreationId(context, externalCorrelationId, eventType, contains);
};

module.exports = { checkEventByExternalCorreationId, checkEventByAuditMessageNumber };
