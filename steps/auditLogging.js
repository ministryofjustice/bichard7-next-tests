const axios = require("axios");
const { getConfig } = require("../utils/config");
const Poller = require("../utils/Poller");

const getApiUrl = async (context) => {
  const config =  getConfig();
  let apiUrl = await context.auditLoggingApi.getUrl();

  if (context.isLocalWorkspace) {
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
  checkIfMessageHasEvent
};
