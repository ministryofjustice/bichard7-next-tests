const axios = require("axios");
const uuid = require("uuid").v4;

class AuditLogApiHelper {
  constructor({ apiUrl, apiKey }) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async getMessageByExternalCorrelationId(externalCorrelationId) {
    const response = await axios.get(`${this.apiUrl}/messages?externalCorrelationId=${externalCorrelationId}`, {
      headers: { "X-API-Key": this.apiKey },
      validateStatus: undefined
    });

    return response.data && response.data.length > 0 ? response.data[0] : undefined;
  }

  createAuditLogMessage(correlationId) {
    return axios.post(
      `${this.apiUrl}/messages`,
      {
        caseId: "Case ID",
        createdBy: "Create audit log test",
        externalCorrelationId: correlationId,
        externalId: uuid(),
        isSanitised: 0,
        messageHash: uuid(),
        messageId: correlationId,
        nextSanitiseCheck: new Date().toISOString(),
        receivedDate: new Date().toISOString(),
        s3Path: "2022/01/18/09/01/message.xml",
        stepExecutionId: uuid(),
        systemId: "System"
      },
      {
        headers: {
          "X-Api-Key": this.apiKey
        }
      }
    );
  }
}

module.exports = AuditLogApiHelper;
