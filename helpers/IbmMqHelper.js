const axios = require("axios").default;
const https = require("https");

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

class IbmMqHelper {
  constructor(config) {
    this.config = config;
  }

  async sendMessage(queueName, message) {
    const url = `https://${this.config.user}:${this.config.password}@${this.config.url}/ibmmq/rest/v2/messaging/qmgr/${this.config.queueManager}/queue/${queueName}/message`;

    const resp = await axiosInstance.post(url, message, {
      headers: {
        "ibm-mq-rest-csrf-token": "blank",
        "Content-Type": "text/plain;charset=utf-8"
      }
    });
    if (resp.status !== 201) {
      throw new Error("Error sending message to IBM MQ");
    }
  }
}

module.exports = IbmMqHelper;
