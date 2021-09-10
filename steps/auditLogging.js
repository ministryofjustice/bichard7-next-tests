const axios = require("axios");
const expect = require("expect");
const isError = require("../utils/isError");
const { getConfig } = require("../utils/config");
const Poller = require("../utils/Poller");

const getApiUrl = async (context) => {
  const config = getConfig();
  const { isLocalWorkspace } = context;

  let apiUrl = await context.auditLoggingApi.getUrl(isLocalWorkspace);

  if (isLocalWorkspace) {
    apiUrl = apiUrl.replace("localstack_main", config.hostMachine);
  }

  return apiUrl;
};

const checkIfMessageHasEvent = (message, externalCorrelationId, eventType) => {
  if (!message || message.externalCorrelationId !== externalCorrelationId) {
    return false;
  }

  const events = message.events.filter((event) => event.eventType === eventType);

  if (events.length === 0) {
    return false;
  }

  return true;
};

const checkAuditLogCondition = async function (auditMessageNumber, message, contains) {
  if (!this.shouldUploadMessagesToS3) return;
  if (this.incomingMessageBucket.uploadedS3Files.length < 1) {
    throw new Error(`Unexpected number of uploaded S3 files. Expected to be more than 0`);
  }

  const correlationId = this.incomingMessageBucket.uploadedS3Files[parseInt(auditMessageNumber, 10) - 1]
    .split("/")
    .slice(-1)[0]
    .split(".")[0];

  const axiosInstance = axios.create();
  const apiUrl = await getApiUrl(this);

  const getMessages = async () =>
    axiosInstance
      .get(`${apiUrl}/messages`)
      .then((response) => response.data)
      .catch((error) => error);

  const options = {
    timeout: 20000,
    delay: 1000,
    name: "await for expected message",
    condition: (allMessages) => {
      const noResults = allMessages
        .find((m) => m.externalCorrelationId === correlationId)
        .events.filter((event) => event.eventType === message).length;
      if (contains) {
        return noResults === 1;
      }
      return noResults === 0;
    }
  };

  const result = await new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);
  expect(isError(result)).toBeFalsy();
};

const pollMessagesForEvent = async (context, externalCorrelationId, eventType) => {
  const axiosInstance = axios.create();
  const apiUrl = await getApiUrl(context);

  const getMessages = async () =>
    axiosInstance
      .get(`${apiUrl}/messages`)
      .then((response) => response.data)
      .catch((error) => error);

  const options = {
    timeout: 40000,
    delay: 1000,
    name: eventType,
    condition: (allMessages) => {
      const messages = allMessages.filter((message) =>
        checkIfMessageHasEvent(message, externalCorrelationId, eventType)
      );

      return messages.length === 1;
    }
  };

  await new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);
};

module.exports = {
  pollMessagesForEvent,
  checkIfMessageHasEvent,
  checkAuditLogCondition
};
