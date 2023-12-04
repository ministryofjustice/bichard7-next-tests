const fs = require("fs");
const { randomUUID } = require("crypto");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const defaults = require("../utils/defaults");
const { mockUpdate } = require("../utils/pncMocks");

const pnc = new MockPNCHelper({
  host: process.env.PNC_HOST || defaults.pncHost,
  port: process.env.PNC_PORT || defaults.pncPort
});

const incomingMessageBucket = new IncomingMessageBucket({
  url: process.env.AWS_URL,
  region: process.env.S3_REGION || defaults.awsRegion,
  incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaults.incomingMessageBucket
});

const SCENARIO_PATH = "./fixtures/uat-scenarios/";

const scenarios = fs.readdirSync(SCENARIO_PATH);

const scenarioPromises = scenarios.map(async (scenario) => {
  const pncData = fs.readFileSync(`${SCENARIO_PATH}${scenario}/pnc-data.xml`).toString();
  const incomingMessage = fs
    .readFileSync(`${SCENARIO_PATH}${scenario}/incoming-message.xml`)
    .toString()
    .replace(/EXTERNAL_CORRELATION_ID/g, randomUUID());

  const updateData = mockUpdate("CXU02");
  await pnc.addMock(updateData.matchRegex, updateData.response);

  await pnc.addMock("CXE01", pncData);
  await incomingMessageBucket.upload(incomingMessage, randomUUID());
});

Promise.all(scenarioPromises).then(() => console.log("Done"));
