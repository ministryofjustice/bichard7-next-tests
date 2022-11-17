const fs = require("fs").promises;
const uuid = require("uuid").v4;
const { World } = require("@cucumber/cucumber");
const PostgresHelper = require("../helpers/PostgresHelper");
const ActiveMqHelper = require("../helpers/ActiveMqHelper");
const AuditLogApiHelper = require("../helpers/AuditLogApiHelper");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const PNCTestTool = require("../helpers/PNCTestTool");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const IncomingMessageHandlerStateMachine = require("../helpers/IncomingMessageHandlerStateMachine");
const BrowserHelper = require("../helpers/BrowserHelper");
const defaults = require("../utils/defaults");
const { authType } = require("../utils/config");

class Bichard extends World {
  constructor(options) {
    super(options);

    this.authType = process.env.AUTH_TYPE || authType.userService;
    this.noUi = process.env.NO_UI === "true";
    this.parallel = process.env.RUN_PARALLEL === "true";
    this.isLocalWorkspace = process.env.WORKSPACE === "local-next";
    this.shouldUploadMessagesToS3 = process.env.MESSAGE_ENTRY_POINT === "s3";
    this.currentTestGivenNames1 = [];
    this.currentTestGivenNames2 = [];
    this.currentTestFamilyNames = [];
    this.currentProsecutorReference = [];
    this.currentPTIURNValues = [];
    this.currentPTIURN = uuid();
    this.realPNC = process.env.REAL_PNC === "true";

    this.db = new PostgresHelper({
      host: process.env.DB_HOST || defaults.postgresHost,
      port: process.env.DB_PORT || defaults.postgresPort,
      database: "bichard",
      user: process.env.DB_USER || defaults.postgresUser,
      password: process.env.DB_PASSWORD || defaults.postgresPassword,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    });

    this.mq = new ActiveMqHelper({
      url: process.env.MQ_URL || defaults.mqUrl,
      login: process.env.MQ_USER || defaults.mqUser,
      password: process.env.MQ_PASSWORD || defaults.mqPassword
    });

    this.incomingMessageBucket = new IncomingMessageBucket({
      url: process.env.AWS_URL,
      region: process.env.S3_REGION || defaults.awsRegion,
      incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaults.incomingMessageBucket
    });

    this.incomingMessageHandlerStateMachine = new IncomingMessageHandlerStateMachine({
      url: process.env.AWS_URL,
      region: process.env.INCOMING_MESSAGE_HANDLER_REGION || defaults.awsRegion,
      incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaults.incomingMessageBucket
    });

    this.auditLogApiClient = new AuditLogApiHelper({
      apiUrl: process.env.AUDIT_LOGGING_API_URL,
      apiKey: process.env.AUDIT_LOGGING_API_KEY
    });

    if (this.realPNC) {
      this.pnc = new PNCTestTool({
        baseUrl: process.env.PNC_TEST_TOOL
      });
    } else {
      this.pnc = new MockPNCHelper({
        host: process.env.PNC_HOST || defaults.pncHost,
        port: process.env.PNC_PORT || defaults.pncPort,
        world: this
      });
    }

    const uiScheme = process.env.UI_SCHEME || "https";
    const uiHost = process.env.UI_HOST || "localhost";
    const uiPort = process.env.UI_PORT || "9443";

    this.browser = new BrowserHelper({
      baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
      headless: process.env.HEADLESS !== "false",
      record: process.env.RECORD === "true",
      world: this
    });
  }

  getRecordName() {
    if (!this.parallel) {
      // original
      return `${this.currentTestFamilyNames[1][0]} ${this.currentTestGivenNames1[1][0]}`;
    }
    // updated
    return `${this.currentTestFamilyNames[1][1]} ${this.currentTestGivenNames1[1][1]}`;
  }

  async dumpData() {
    const data = await this.db.dumpData();
    await fs.writeFile(`${this.outputDir}/db.json`, JSON.stringify(data));
  }
}

module.exports = Bichard;
