const PostgresHelper = require("../helpers/PostgresHelper");
const Db2Helper = require("../helpers/Db2Helper");
const ActiveMqHelper = require("../helpers/ActiveMqHelper");
const IbmMqHelper = require("../helpers/IbmMqHelper");
const MockPNCHelper = require("../helpers/MockPNCHelper");
const S3Helper = require("../helpers/S3Helper");
const StepFunctionsHelper = require("../helpers/StepFunctionsHelper");
const LambdaHelper = require("../helpers/LambdaHelper");

class Bichard {
  constructor() {
    const stackType = process.env.STACK_TYPE || "next";
    this.isLocalWorkspace = process.env.WORKSPACE === "local";

    if (stackType === "next") {
      this.db = new PostgresHelper({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: "bichard",
        user: process.env.DB_USER || "bichard",
        password: process.env.DB_PASSWORD || "password"
      });

      this.mq = new ActiveMqHelper({
        url: process.env.MQ_URL || "failover:(stomp://localhost:61613)",
        login: process.env.MQ_USER || "admin",
        password: process.env.MQ_PASSWORD || "admin"
      });

      this.s3 = new S3Helper({
        url: process.env.AWS_URL || "http://localhost:4566",
        region: process.env.S3_REGION || "us-east-1",
        incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET_NAME || "incoming-messages"
      });

      this.stepFunctions = new StepFunctionsHelper({
        url: process.env.AWS_URL || "http://localhost:4566",
        region: process.env.LAMBDA_REGION || "us-east-1",
        incomingMessageBucketName: process.env.S3_INCOMING_MESSAGE_BUCKET_NAME || "incoming-messages"
      });

      this.lambda = new LambdaHelper({
        url: process.env.AWS_URL || "http://localhost:4566",
        region: process.env.STEP_FUNCTIONS_REGION || "us-east-1",
      });
    } else if (stackType === "baseline") {
      this.db = new Db2Helper({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 50000,
        database: "br7own",
        user: process.env.DB_USER || "db2inst1",
        password: process.env.DB_PASSWORD || "TEST_DB2INST1_PASSWORD"
      });

      this.mq = new IbmMqHelper({
        url: process.env.MQ_URL || "localhost:10443",
        user: process.env.MQ_USER || "app",
        password: process.env.MQ_PASSWORD || "passw0rd",
        queueManager: process.env.MQ_QMGR || "BR7_QM"
      });
    }

    this.pnc = new MockPNCHelper({
      host: process.env.PNC_HOST || "localhost",
      port: process.env.PNC_PORT || "3000"
    });
  }
}

module.exports = Bichard;
