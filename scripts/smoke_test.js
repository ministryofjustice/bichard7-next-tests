const PostgresHelper = require("../helpers/PostgresHelper");
// const ActiveMqHelper = require("../helpers/ActiveMqHelper");
// const MockPNCHelper = require("../helpers/MockPNCHelper");
// const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
// const IncomingMessageHandlerStateMachine = require("../helpers/IncomingMessageHandlerStateMachine");
// const AuditLoggingApi = require("../helpers/AuditLoggingApi");
const BrowserHelper = require("../helpers/BrowserHelper");
const defaults = require("../utils/defaults");

const usersScheme = process.env.USERS_SCHEME || "https";
const usersHost = process.env.USERS_HOST || "localhost";
const usersPort = process.env.USERS_PORT || "3443";

const db = new PostgresHelper({
  host: process.env.DB_HOST || defaults.postgresHost,
  port: process.env.DB_PORT || defaults.postgresPort,
  database: "bichard",
  user: process.env.DB_USER || defaults.postgresUser,
  password: process.env.DB_PASSWORD || defaults.postgresPassword,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

/* To be added later
const mq = new ActiveMqHelper({
  url: process.env.MQ_URL || defaults.mqUrl,
  login: process.env.MQ_USER || defaults.mqUser,
  password: process.env.MQ_PASSWORD || defaults.mqPassword
});

const incomingMessageBucket = new IncomingMessageBucket({
  url: process.env.AWS_URL,
  region: process.env.S3_REGION || defaults.awsRegion,
  incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaults.incomingMessageBucket
});

const incomingMessageHandlerStateMachine = new IncomingMessageHandlerStateMachine({
  url: process.env.AWS_URL,
  region: process.env.INCOMING_MESSAGE_HANDLER_REGION || defaults.awsRegion,
  incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaults.incomingMessageBucket
});

const auditLoggingApi = new AuditLoggingApi({
  url: process.env.AWS_URL,
  region: process.env.AUDIT_LOGGING_API_REGION || defaults.awsRegion
}); */

/* Lets not test this yet
const pnc = new MockPNCHelper({
  host: process.env.PNC_HOST || defaults.pncHost,
  port: process.env.PNC_PORT || defaults.pncPort,
  world: this
}); */

const uiScheme = process.env.UI_SCHEME || "https";
const uiHost = process.env.UI_HOST || "localhost";
const uiPort = process.env.UI_PORT || "9443";

const browser = new BrowserHelper({
  baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
  headless: process.env.HEADLESS !== "false",
  record: false,
  world: this
});

const start = async function () {
  // Postgres check
  try {
    await db.pg.any("SELECT 1");
    console.log(" ++ Postgres is up ++");
  } catch (error) {
    console.log(" -- Postgres is down --");
    throw error;
  }

  // UserService check
  try {
    const page = await browser.newPage(`${usersScheme}://${usersHost}:${usersPort}`);
    const pageTitle = await page.title();
    if (pageTitle === "Sign in to Bichard7") {
      throw new Error(`Could not load page. Loaded ${pageTitle} instead of "Sign in to Bichard7"`);
    }
    console.log(" ++ User Service is up ++");
    await browser.close();
  } catch (error) {
    console.log(" -- User Service is down --");
    await browser.close();
    throw error;
  }

  return " +++ All systems nominal +++";
};

start()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
