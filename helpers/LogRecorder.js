const fs = require("fs");

const net = require("net");

class LogRecorder {
  constructor(options) {
    this.options = options;

    this.server = net.createServer();
    this.server.on("connection", this.handleConnection.bind(this));

    this.server.listen(4000, "0.0.0.0", () => console.log("Log server listening", this.server.address()));

    this.connected = false;
    this.buffer = [];
  }

  handleConnection(conn) {
    console.log("New log client connection");
    this.connected = true;

    conn.on("data", this.handleData.bind(this));
    conn.once("close", () => console.log("connection closed"));
    conn.on("error", (err) => console.log("Connection error: %s", err.message));
  }

  handleData(data) {
    this.buffer.push(data.toString());
  }

  async waitForLogs() {
    let logSize = -1;
    const startTime = new Date().getTime();
    return new Promise((resolve) => {
      const checkLogs = () => {
        const now = new Date().getTime();
        if (this.connected) {
          if (logSize === this.buffer.length && logSize !== 0) {
            resolve();
          } else if (now - startTime > 2000 && logSize === 0) {
            resolve();
          } else {
            logSize = this.buffer.length;
            setTimeout(checkLogs, 100);
          }
        } else if (now - startTime > 10000) {
          console.log("No log connection made before timeout");
          resolve();
        } else {
          console.log("Waiting for connection");
          setTimeout(checkLogs, 500);
        }
      };
      checkLogs();
    });
  }

  async flush() {
    await this.waitForLogs();
    this.buffer = [];
  }

  close() {
    this.server.close();
  }

  async save(world) {
    await this.waitForLogs();
    console.log(`Saving ${this.buffer.length} lines of logs`);
    const log = this.buffer.join("");
    this.buffer = [];
    await fs.promises.writeFile(`${world.outputDir}/log.txt`, log);
  }
}

module.exports = LogRecorder;
