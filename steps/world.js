const fs = require("fs").promises;
const uuid = require("uuid").v4;
const { setWorldConstructor, World } = require("@cucumber/cucumber");
const PostgresHelper = require("../helpers/PostgresHelper");
const Db2Helper = require("../helpers/Db2Helper");
const ActiveMqHelper = require("../helpers/ActiveMqHelper");
const IbmMqHelper = require("../helpers/IbmMqHelper");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const IncomingMessageHandlerStateMachine = require("../helpers/IncomingMessageHandlerStateMachine");
const AuditLoggingApi = require("../helpers/AuditLoggingApi");
const BrowserHelper = require("../helpers/BrowserHelper");
const defaults = require("../utils/defaults");
const { authType, stackType } = require("../utils/config");

class Bichard extends World {
  constructor(options) {
    super(options);

    this.stackType = process.env.STACK_TYPE || stackType.next;
    this.authType = process.env.AUTH_TYPE || authType.userService;
    this.isLocalWorkspace = process.env.WORKSPACE === "local-next" || process.env.WORKSPACE === "local-baseline";
    this.shouldUploadMessagesToS3 = process.env.MESSAGE_ENTRY_POINT === "s3";
    this.currentTestGivenNames1 = [];
    this.currentTestGivenNames2 = [];
    this.currentTestFamilyNames = [];
    this.currentProsecutorReference = [];
    this.currentPTIURNValues = [];
    this.currentPTIURN = uuid();

    if (this.stackType === stackType.next) {
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

      this.auditLoggingApi = new AuditLoggingApi({
        url: process.env.AWS_URL,
        region: process.env.AUDIT_LOGGING_API_REGION || defaults.awsRegion
      });
    } else if (this.stackType === stackType.baseline) {
      this.db = new Db2Helper({
        host: process.env.DB_HOST || defaults.db2Host,
        port: process.env.DB_PORT || defaults.db2Port,
        database: "br7own",
        user: process.env.DB_USER || defaults.db2User,
        password: process.env.DB_PASSWORD || defaults.db2Password
      });

      this.mq = new IbmMqHelper({
        url: process.env.MQ_URL || defaults.ibmMqUrl,
        user: process.env.MQ_USER || defaults.ibmMqUser,
        password: process.env.MQ_PASSWORD || defaults.ibmMqPassword,
        queueManager: process.env.MQ_QMGR || defaults.ibmMqQmgr
      });
    }

    this.pnc = new MockPNCHelper({
      host: process.env.PNC_HOST || defaults.pncHost,
      port: process.env.PNC_PORT || defaults.pncPort,
      world: this
    });

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

  getRecordName(index) {
    if (!process.env.RUN_PARALLEL) {
      // original
      return `${this.currentTestFamilyNames[index][0]} ${this.currentTestGivenNames1[index][0]}`;
    }
    // updated
    return `${this.currentTestFamilyNames[index][1]} ${this.currentTestGivenNames1[index][1]}`;
  }

  async dumpData() {
    const data = await this.db.dumpData();
    await fs.writeFile(`${this.outputDir}/db.json`, JSON.stringify(data));
  }
}

setWorldConstructor(Bichard);
