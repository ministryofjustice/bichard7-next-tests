const PostgresHelper = require("../helpers/PostgresHelper");
const Db2Helper = require("../helpers/Db2Helper");
const ActiveMqHelper = require("../helpers/ActiveMqHelper");
const IbmMqHelper = require("../helpers/IbmMqHelper");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const IncomingMessageBucket = require("../helpers/IncomingMessageBucket");
const IncomingMessageHandlerStateMachine = require("../helpers/IncomingMessageHandlerStateMachine");
const AuditLoggingApi = require("../helpers/AuditLoggingApi");

class Bichard {
  constructor() {
    const defaultAwsUrl = "http://localhost:4566";
    const defaultAwsRegion = "us-east-1";
    const defaultIncomingMessageBucket = "incoming-messages";
    const defaultPostgresHost = "localhost";
    const defaultPostgresPort = 5432;
    const defaultPostgresUser = "bichard";
    const defaultPostgresPassword = "password";
    const defaultMqUrl = "failover:(stomp://localhost:61613)";
    const defaultMqUser = "admin";
    const defaultMqPassword = "admin";
    const defaultDb2Host = "localhost";
    const defaultDb2Port = 50000;
    const defaultDb2User = "db2inst1";
    const defaultDb2Password = "TEST_DB2INST1_PASSWORD";
    const defaultIbmMqUrl = "localhost:10443";
    const defaultIbmMqUser = "app";
    const defaultIbmMqPassword = "passw0rd";
    const defaultIbmMqQmgr = "BR7_QM";
    const defaultPncHost = "localhost";
    const defaultPncPort = "3000";

    const stackType = process.env.STACK_TYPE || "next";
    this.isLocalWorkspace = process.env.WORKSPACE === "local-next" || process.env.WORKSPACE === "local-baseline";
    this.shouldUploadMessagesToS3 = (process.env.MESSAGE_ENTRY_POINT || "mq") === "s3";

    if (stackType === "next") {
      this.db = new PostgresHelper({
        host: process.env.DB_HOST || defaultPostgresHost,
        port: process.env.DB_PORT || defaultPostgresPort,
        database: "bichard",
        user: process.env.DB_USER || defaultPostgresUser,
        password: process.env.DB_PASSWORD || defaultPostgresPassword
      });

      this.mq = new ActiveMqHelper({
        url: process.env.MQ_URL || defaultMqUrl,
        login: process.env.MQ_USER || defaultMqUser,
        password: process.env.MQ_PASSWORD || defaultMqPassword
      });

      this.incomingMessageBucket = new IncomingMessageBucket({
        url: process.env.AWS_URL || defaultAwsUrl,
        region: process.env.S3_REGION || defaultAwsRegion,
        incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaultIncomingMessageBucket
      });

      this.incomingMessageHandlerStateMachine = new IncomingMessageHandlerStateMachine({
        url: process.env.AWS_URL || defaultAwsUrl,
        region: process.env.INCOMING_MESSAGE_HANDLER_REGION || defaultAwsRegion,
        incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET || defaultIncomingMessageBucket
      });

      this.auditLoggingApi = new AuditLoggingApi({
        url: process.env.AWS_URL || defaultAwsUrl,
        region: process.env.AUDIT_LOGGING_API_REGION || defaultAwsRegion
      });
    } else if (stackType === "baseline") {
      this.db = new Db2Helper({
        host: process.env.DB_HOST || defaultDb2Host,
        port: process.env.DB_PORT || defaultDb2Port,
        database: "br7own",
        user: process.env.DB_USER || defaultDb2User,
        password: process.env.DB_PASSWORD || defaultDb2Password
      });

      this.mq = new IbmMqHelper({
        url: process.env.MQ_URL || defaultIbmMqUrl,
        user: process.env.MQ_USER || defaultIbmMqUser,
        password: process.env.MQ_PASSWORD || defaultIbmMqPassword,
        queueManager: process.env.MQ_QMGR || defaultIbmMqQmgr
      });
    }

    this.pnc = new MockPNCHelper({
      host: process.env.PNC_HOST || defaultPncHost,
      port: process.env.PNC_PORT || defaultPncPort
    });
  }
}

module.exports = Bichard;
