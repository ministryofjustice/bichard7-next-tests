const axios = require("axios");
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

const checkAuditLogContains = async function (auditMessageNumber, message) {
  // if (! this.shouldUploadMessagesToS3) return;
  if (this.incomingMessageBucket.uploadedS3Files.length !== 1) {
    throw new Error(
      `Unexpected number of uploaded S3 files. Expected 1, but received ${this.incomingMessageBucket.uploadedS3Files.length}`
    );
  }

  const correlationId = this.incomingMessageBucket.uploadedS3Files[parseInt(auditMessageNumber, 10) - 1]
    .split("/")
    .slice(-1)[0]
    .split(".")[0];
  const axiosInstance = axios.create();
  const apiUrl = await getApiUrl(this);
  const messages = await axiosInstance
    .get(`${apiUrl}/messages`)
    .then((response) => response.data)
    .catch((error) => error);
  const messageLogs = messages.find((m) => m.externalCorrelationId === correlationId);
  if (!messageLogs.events.some((event) => event.eventType === message)) {
    throw new Error("Could not find any message that contains the expected string");
  }
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
  checkAuditLogContains
};
