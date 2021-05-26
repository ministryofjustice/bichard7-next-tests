const { StepFunctions } = require("aws-sdk");
const uuid = require("uuid").v4;

class StepFunctionsHelper {
  constructor(config) {
    this.stateMachine = new StepFunctions({
      endpoint: config.url,
      region: config.region,
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test"
      }
    });
    this.region = config.region;
    this.incomingMessageBucketName = config.incomingMessageBucketName;
  }

  async runIncomingMessagesStateMachine(s3FileName) {
    const executionName = s3FileName.replace(/\//g, "_");
    this.stateMachine
      .startExecution({
        stateMachineArn: `arn:aws:states:${this.region}:000000000000:stateMachine:IncomingMessageHandler`,
        input: `{
          "detail": {
            "requestParameters": {
              "bucketName": "${this.incomingMessageBucketName}",
              "key": "${s3FileName}"
            }
          }
        }`,
        name: executionName
      })
      .promise()
      .then(() => undefined)
      .catch((error) => error);
  }
}

module.exports = StepFunctionsHelper;
