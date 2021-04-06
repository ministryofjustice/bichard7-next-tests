const { connect } = require("stompit");
const fs = require("fs");

class MqHelper {
  constructor(config) {
    this.options = {
      host: config.host,
      port: config.port,
      connectHeaders: {
        login: config.username,
        passcode: config.password,
        "heart-beat": "5000,5000",
      },
    };
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

      connect(this.options, listener);
    });
  }

  async connectIfRequired() {
    if (!this.client) {
      const connectionResult = await this.connectAsync();

      if (typeof connectionResult === "Error") {
        throw connectionResult;
      }

      this.client = connectionResult;
    }

    return this.client;
  }

  async sendMessage(queueName, messageId) {
    const client = await this.connectIfRequired();
    const headers = {
      destination: `/queue/${queueName}`,
    };
    const message = await fs.promises.readFile(
      `./features/support/fixtures/${messageId}.xml`
    );

    return new Promise((resolve, reject) => {
      const options = {
        onReceipt: () => {
          this.client.disconnect((error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        },
        onError: (error) => reject(error),
      };

      const writable = client.send(headers, options);

      writable.write(message);
      writable.end();
    });
  }
}

module.exports = MqHelper;
