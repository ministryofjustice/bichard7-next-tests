const axios = require("axios");
const { expect } = require("expect");
const { CONDUCTOR_API_URL, CONDUCTOR_API_PASSWORD, CONDUCTOR_API_USER } = require("../helpers/ConductorHelper");

const base64 = (input) => Buffer.from(input).toString("base64");

const basicAuthenticationHeaders = () => ({
  Authorization: `Basic ${base64(`${CONDUCTOR_API_USER}:${CONDUCTOR_API_PASSWORD}`)}`
});

const conductorApi = axios.create({
  headers: basicAuthenticationHeaders()
});

const checkConductorWorkflowCompleted = async function (world) {
  const incomingMessageHandlerWorkflowSearch = await conductorApi
    .get(
      `${CONDUCTOR_API_URL}/api/workflow/search?query=%22workflowType=incoming_message_handler%20AND%20status=COMPLETED%22`
    )
    .then((response) => response.data)
    .catch((e) => console.log(e));

  const incomingMessageHandlerWorkflowSummary = incomingMessageHandlerWorkflowSearch.results.find((r) =>
    r.input.includes(world.currentCorrelationId)
  );

  const incomingMessageHandlerWorkflow = await conductorApi
    .get(`${CONDUCTOR_API_URL}/api/workflow/${incomingMessageHandlerWorkflowSummary.workflowId}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));

  const convertSpiToAhoTask = incomingMessageHandlerWorkflow.tasks.find((t) => t.taskType === "convert_spi_to_aho");

  const workflow = await conductorApi
    .get(`${CONDUCTOR_API_URL}/api/workflow/bichard_process/correlated/${convertSpiToAhoTask.outputData.correlationId}`)
    .then((response) => (response.data.length ? response.data[0] : response.data))
    .catch((e) => console.log(e));

  console.log(workflow);

  expect(workflow.status).toEqual("COMPLETED");
};

module.exports = {
  checkConductorWorkflowCompleted
};
