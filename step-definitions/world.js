const fs = require("fs").promises;
const uuid = require("uuid").v4;
const { World } = require("@cucumber/cucumber");
const PostgresHelper = require("../helpers/PostgresHelper");
const ActiveMqHelper = require("../helpers/ActiveMqHelper");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const PNCTestTool = require("../helpers/PNCTestTool");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const Phase1Bucket = require("../helpers/Phase1Bucket");
const BrowserHelper = require("../helpers/BrowserHelper");
const defaults = require("../utils/defaults");
const AuditLogApiHelper = require("../helpers/AuditLogApiHelper");
const { config } = require("../utils/config");

class Bichard extends World {
  constructor(options) {
    super(options);

    this.config = config;

    this.currentTestGivenNames1 = [];
    this.currentTestGivenNames2 = [];
    this.currentTestFamilyNames = [];
    this.currentProsecutorReference = [];
    this.currentPTIURNValues = [];
    this.currentPTIURN = uuid();
    this.currentCorrelationId = null;

    this.setCorrelationId = (correlationId) => {
      this.currentCorrelationId = correlationId;
    };

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

    this.phase1Bucket = new Phase1Bucket({
      url: process.env.AWS_URL,
      region: process.env.S3_REGION || defaults.awsRegion,
      phase1BucketName: process.env.S3_PHASE_1_BUCKET || defaults.phase1Bucket
    });

    if (this.config.realPNC) {
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

    this.browser = new BrowserHelper({
      baseUrl: config.baseUrl,
      headless: process.env.HEADLESS !== "false",
      record: process.env.RECORD === "true",
      world: this
    });

    this.auditLogApi = new AuditLogApiHelper({
      apiUrl: process.env.AUDIT_LOG_API_URL ?? "http://localhost:3010",
      apiKey: process.env.AUDIT_LOG_API_KEY ?? "xxx"
    });
  }

  getRecordName() {
    if (!this.config.parallel) {
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
