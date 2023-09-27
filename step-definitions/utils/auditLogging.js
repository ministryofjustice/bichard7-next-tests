const { expect } = require("expect");
const isError = require("../../utils/isError");
const Poller = require("../../utils/Poller");

const checkEventByExternalCorrelationId = async (context, externalCorrelationId, eventType, contains) => {
  const { auditLogApi } = context;
  const getMessages = () => auditLogApi.getMessageByExternalCorrelationId(externalCorrelationId);

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

const checkAuditLogRecordExists = async (context, correlationId) => {
  const { auditLogApi } = context;
  const getMessages = () => auditLogApi.getMessageByExternalCorrelationId(correlationId);

  const options = {
    timeout: 90000,
    delay: 1000,
    name: "checkForRecord",
    condition: (message) => !!message
  };

  const result = await new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);

  if (!isError(result)) {
    return;
  }

  throw new Error(`Could not find audit log with external correlation ID: ${correlationId}`);
};

const checkAuditLogExists = async (context, eventType, contains) => {
  const checkEventResult = await checkEventByExternalCorrelationId(
    context,
    context.currentCorrelationId,
    eventType,
    contains
  );
  expect(isError(checkEventResult)).toBeFalsy();
};

module.exports = { checkEventByExternalCorrelationId, checkAuditLogRecordExists, checkAuditLogExists };
