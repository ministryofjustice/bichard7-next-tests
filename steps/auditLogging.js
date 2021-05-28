const axios = require("axios");
const Poller = require("../utils/Poller");

const getApiUrl = async (context) => {
  let apiUrl = await context.auditLoggingApi.getUrl();

  if (context.isLocalWorkspace) {
    apiUrl = apiUrl.replace("localstack_main", "localhost");
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

const pollMessagesForEvent = (context, externalCorrelationId, eventType) => {
  const axiosInstance = axios.create();

  const getMessages = async () =>
    axiosInstance
      .get(`${await getApiUrl(context)}/messages`)
      .then((response) => response.data)
      .catch((error) => error);

  const options = {
    timeout: 15000,
    delay: 1000,
    name: eventType,
    condition: (allMessages) => {
      const messages = allMessages.filter((message) =>
        checkIfMessageHasEvent(message, externalCorrelationId, eventType)
      );

      return messages.length === 1;
    }
  };

  return new Poller(getMessages)
    .poll(options)
    .then((messages) => messages)
    .catch((error) => error);
};

module.exports = {
  pollMessagesForEvent,
  checkIfMessageHasEvent
};
