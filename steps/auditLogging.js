const isError = require("../utils/isError");
const Poller = require("../utils/Poller");

const checkEventByExternalCorrelationId = async (context, externalCorrelationId, eventType, contains) => {
  const { auditLogApiClient } = context;
  const getMessages = () => auditLogApiClient.getMessageByExternalCorrelationId(externalCorrelationId);

  let events = null;
  const options = {
    timeout: 90000,
    delay: 1000,
    name: eventType,
    condition: (message) => {
      if (!message) {
        events = null;
        return false;
      }

      events = message.events || [];

      const hasEvent = message.events.some((event) => event.eventType === eventType);

      return !!contains === hasEvent;
    }
  };

  const result = await new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);

  if (!isError(result)) {
    return;
  }

  let eventsFoundMessage = "";

  if (!events) {
    eventsFoundMessage = `Message with correlation ID ${externalCorrelationId} not found.`;
  } else {
    events = events.sort((eventA, eventB) => (eventA.timestamp > eventB.timestamp ? 1 : -1));
    eventsFoundMessage = `
    Following events found in the message with correlation ID ${externalCorrelationId}:
    ${events.map((event) => `\t- ${event.timestamp}: ${event.eventType}\n`)}
    `;
  }

  throw new Error(`${result.message}${eventsFoundMessage}`);
};

const checkEventByAuditMessageNumber = (context, auditMessageNumber, eventType, contains) => {
  const {
    incomingMessageBucket: { uploadedS3Files }
  } = context;

  if (uploadedS3Files.length === 0) {
    throw new Error(`No S3 file has been uploaded`);
  }

  const s3FileIndex = parseInt(auditMessageNumber, 10) - 1;
  if (s3FileIndex < 0 || s3FileIndex >= uploadedS3Files.length) {
    throw new Error(`Index ${s3FileIndex} is out of range. There are ${uploadedS3Files.length} files uploaded to S3.`);
  }

  const externalCorrelationId = uploadedS3Files[s3FileIndex].split("/").slice(-1)?.[0]?.split(".")?.[0];

  if (!externalCorrelationId) {
    throw new Error(`Could not extract external correlation ID from the S3 file with index ${s3FileIndex}`);
  }

  return checkEventByExternalCorrelationId(context, externalCorrelationId, eventType, contains);
};

module.exports = { checkEventByExternalCorrelationId, checkEventByAuditMessageNumber };
