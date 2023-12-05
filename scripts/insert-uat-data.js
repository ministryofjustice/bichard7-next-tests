const fs = require("fs");
const { randomUUID } = require("crypto");
const { fakerEN_GB: faker } = require("@faker-js/faker");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const defaults = require("../utils/defaults");
const { mockUpdate } = require("../utils/pncMocks");
const { ASN } = require("../utils/asn");

// Bring in the clearing mocks call to this script
// Add a second scenario
// Enable mutliple inserts per scenario

// Process:
// - find a record in the DB that matches your criteria (e.g. specific trigger)
// - Extract the AHO from the db and pull out the PNC data
// - Convert the PNC data into a PNC response
// - Look up the S3 path in Dynamo
// - Grab the original incoming message
// - Anonymise it and make the PNC message match

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

let asnCounter = 100001;

const scenarioPromises = scenarios.map(async (scenario) => {
  const asn = new ASN(`2100000000000${String(asnCounter).padStart("0", 6)}`).toString();

  const pncData = fs.readFileSync(`${SCENARIO_PATH}${scenario}/pnc-data.xml`).toString();
  const givenName = faker.person.firstName().toUpperCase();
  const familyName = faker.person.lastName().toUpperCase();
  console.log(`${familyName} ${givenName}`);
  const incomingMessage = fs
    .readFileSync(`${SCENARIO_PATH}${scenario}/incoming-message.xml`)
    .toString()
    .replace(/EXTERNAL_CORRELATION_ID/g, randomUUID())
    .replace(/PROSECUTOR_REFERENCE/g, asn)
    .replace(/GIVEN_NAME/g, givenName)
    .replace(/FAMILY_NAME/g, familyName)
    .replace(/ADDRESS_LINE_1/g, faker.location.streetAddress().toUpperCase())
    .replace(/ADDRESS_LINE_2/g, faker.location.street().toUpperCase())
    .replace(/ADDRESS_LINE_3/g, faker.location.city().toUpperCase())
    .replace(/ADDRESS_LINE_4/g, faker.location.county().toUpperCase())
    .replace(/ADDRESS_LINE_5/g, faker.location.zipCode().toUpperCase())
    .replace(/DATE_OF_HEARING/g, new Date().toISOString().split("T")[0]);

  const updateData = mockUpdate("CXU02");
  await pnc.addMock(updateData.matchRegex, updateData.response);

  await pnc.addMock(`CXE01.*${asn.slice(-7)}`, pncData);
  await incomingMessageBucket.upload(incomingMessage, randomUUID());
  asnCounter += 1;
});

Promise.all(scenarioPromises).then(() => console.log("Done"));
