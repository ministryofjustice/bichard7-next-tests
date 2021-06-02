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

  async getUrl() {
    if (this.url) {
      return this.url;
    }

    const params = {
      FunctionName: "RecordSentToBichardEvent"
    };

    const recordSentToBichardEventFunction = await this.lambda.getFunction(params).promise();
    this.auditLoggingApiUrl = recordSentToBichardEventFunction.Configuration?.Environment?.Variables?.API_URL;

    return this.auditLoggingApiUrl;
  }
}

module.exports = AuditLoggingApi;
