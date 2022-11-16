const axios = require("axios");

class AuditLogApiHelper {
  constructor(config) {
    const { apiUrl, apiKey } = config;
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
}

module.exports = AuditLogApiHelper;
