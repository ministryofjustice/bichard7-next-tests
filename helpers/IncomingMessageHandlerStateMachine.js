const uuid = require("uuid").v4;
const { StepFunctions } = require("aws-sdk");

class IncomingMessageHandlerStateMachine {
  constructor(config) {
    const options = {
      region: config.region
    };

    if (config.url) {
      options.endpoint = config.url;
      options.credentials = {
        accessKeyId: "test",
        secretAccessKey: "test"
      };
    }

    this.stateMachine = new StepFunctions(options);
    this.region = config.region;
    this.incomingMessageBucketName = config.incomingMessageBucketName;
  }

  async execute(s3FileName) {
    const executionName = uuid();
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

module.exports = IncomingMessageHandlerStateMachine;
