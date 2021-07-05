const { ConnectFailover } = require("stompit");

class ActiveMqHelper {
  constructor(config) {
    this.url = config.url;
    this.options = {
      connect: {
        connectHeaders: {
          login: config.login,
          passcode: config.password,
          "heart-beat": "5000,5000"
        }
      }
    };
    if (/stomp\+ssl/.test(this.url)) {
      this.url = this.url.replace(/stomp\+ssl/g, "ssl");
    }
  }

  async connectAsync() {
    return new Promise((resolve, reject) => {
      const listener = (error, client) => {
        if (error) {
          reject(error);
        } else {
          resolve(client);
        }
      };
      const connectionManager = new ConnectFailover(this.url, this.options);

      connectionManager.connect(listener);
    });
  }

  async connectIfRequired() {
    if (!this.client) {
      const connectionResult = await this.connectAsync();

      if (connectionResult instanceof Error) {
        throw connectionResult;
      }

      this.client = connectionResult;
    }

    return this.client;
  }

  async sendMessage(queueName, message) {
    const client = await this.connectIfRequired();
    const headers = {
      destination: `/queue/${queueName}`
    };

    return new Promise((resolve, reject) => {
      const writable = client.send(headers);

      writable.write(message);
      writable.end();
      this.client.disconnect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = ActiveMqHelper;
