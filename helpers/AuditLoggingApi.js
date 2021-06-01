const { Lambda } = require("aws-sdk");

class AuditLoggingApi {
  constructor(config) {
    this.lambda = new Lambda({
      endpoint: config.url,
      region: config.region,
      credentials: {
        accessKeyId: "test",
        secretAccessKey: "test"
      }
    });
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
