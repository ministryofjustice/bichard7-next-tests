const { Lambda } = require("aws-sdk");

class AuditLoggingApi {
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

    this.lambda = new Lambda(options);
  }

  async getUrl(isLocalWorkspace) {
    if (this.url) {
      return this.url;
    }

    const functionName = isLocalWorkspace ? "RecordSentToBichardEvent" : "record-sent-to-bichard-event";

    const listFunctionsResult = await this.lambda.listFunctions().promise();
    const lambdaFunction = listFunctionsResult.Functions.filter((f) => f.FunctionName.includes(functionName))[0];
    this.auditLoggingApiUrl = undefined;
    try {
      this.auditLoggingApiUrl = lambdaFunction.Environment.Variables.API_URL;
    } catch (e) {
      console.log("API_URL is missing");
    }

    return this.auditLoggingApiUrl;
  }
}

module.exports = AuditLoggingApi;
