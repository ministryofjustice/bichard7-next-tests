const { ConnectFailover } = require("stompit");

const getMessage = (client, queueName) =>
  new Promise((resolve, reject) => {
    let subscription;
    let timeout;
    const callback = (error1, message) => {
      if (error1) {
        reject(error1);
      } else {
        clearTimeout(timeout);
        message.readString("utf-8", (error2, buffer) => {
          if (error2) {
            reject(error2);
          } else if (!buffer) {
            reject(new Error("No buffer returned for message"));
          } else {
            client.ack(message);
            try {
              subscription.unsubscribe();
            } catch (e) {
              console.error(e);
            }
            resolve(buffer.toString());
          }
        });
      }
    };
    subscription = client.subscribe({ destination: queueName, ack: "client" }, callback);
    timeout = setTimeout(() => {
      subscription.unsubscribe();
      resolve(null);
    }, 500);
  });

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

    console.log("MQ connected, pushing message to:", queueName);
    return new Promise((resolve, reject) => {
      const writable = client.send(headers);

      writable.write(message);
      writable.end();
      this.client.disconnect((error) => {
        this.client = null;
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async getMessages(queueName) {
    const messages = [];
    const client = await this.connectIfRequired();
    let waiting = true;

    while (waiting) {
      // eslint-disable-next-line no-await-in-loop
      const message = await getMessage(client, queueName);
      if (message) {
        messages.push(message);
      } else {
        waiting = false;
      }
    }
    return messages;
  }
}

module.exports = ActiveMqHelper;
