const axios = require("axios");
const { expect } = require("expect");
const promisePoller = require("promise-poller").default;
const { CONDUCTOR_API_URL, CONDUCTOR_PASSWORD, CONDUCTOR_USER } = require("../helpers/ConductorHelper");

const base64 = (input) => Buffer.from(input).toString("base64");

const basicAuthenticationHeaders = () => ({
  Authorization: `Basic ${base64(`${CONDUCTOR_USER}:${CONDUCTOR_PASSWORD}`)}`
});

const conductorApi = axios.create({
  headers: basicAuthenticationHeaders()
});

const fetchCompletedBichardProcessWorkflow = async (workflowId) => {
  const workflow = await conductorApi
    .get(`${CONDUCTOR_API_URL}/api/workflow/${workflowId}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));

  if (workflow.status !== "COMPLETED") {
    throw new Error(`No completed bichard_process workflow with id ${workflowId}`);
  }
  return workflow;
};

const checkConductorWorkflowCompleted = async function (world) {
  const incomingMessageHandlerWorkflowSearch = await conductorApi
    .get(
      `${CONDUCTOR_API_URL}/api/workflow/search?query=%22workflowType=incoming_message_handler%20AND%20status=COMPLETED%22`
    )
    .then((response) => response.data)
    .catch((e) => console.log(e));

  expect(incomingMessageHandlerWorkflowSearch).toBeDefined();

  const incomingMessageHandlerWorkflowSummary = incomingMessageHandlerWorkflowSearch.results.find((r) =>
    r.input.includes(world.currentCorrelationId)
  );

  expect(incomingMessageHandlerWorkflowSummary).toBeDefined();

  const incomingMessageHandlerWorkflow = await conductorApi
    .get(`${CONDUCTOR_API_URL}/api/workflow/${incomingMessageHandlerWorkflowSummary.workflowId}`)
    .then((response) => response.data)
    .catch((e) => console.log(e));

  expect(incomingMessageHandlerWorkflow).toBeDefined();

  const beginProcessingTask = incomingMessageHandlerWorkflow.tasks.find(
    (t) => t.referenceTaskName === "begin_processing"
  );

  expect(beginProcessingTask).toBeDefined();

  const workflow = await promisePoller({
    taskFn: () => fetchCompletedBichardProcessWorkflow(beginProcessingTask.outputData.workflowId),
    interval: 100,
    retries: 900
  }).catch((e) => e);

  expect(workflow.status).toEqual("COMPLETED");
};

module.exports = {
  checkConductorWorkflowCompleted
};
