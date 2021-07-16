const fs = require("fs");
const { spawn } = require("child_process");

class LogRecorder {
  constructor(options) {
    this.options = options;

    this.proc = spawn("cat", [this.options.fifo]);
    this.fifo = this.proc.stdout;

    this.fifo.on("data", this.handleData.bind(this));
    this.buffer = [];
  }

  handleData(data) {
    this.buffer.push(data.toString());
  }

  async waitForLogs() {
    let logSize = -1;
    const startTime = new Date().getTime();
    return new Promise((resolve) => {
      const checkLogs = () => {
        if (logSize === this.buffer.length && logSize !== 0) {
          resolve();
        } else {
          const now = new Date().getTime();
          if (now - startTime > 2000 && logSize === 0) {
            resolve();
          } else {
            logSize = this.buffer.length;
            setTimeout(checkLogs, 100);
          }
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
    this.proc.kill(0);
  }

  async save(world) {
    await this.waitForLogs();
    const log = this.buffer.join("");
    this.buffer = [];
    await fs.promises.writeFile(`${world.outputDir}/log.txt`, log);
  }
}

module.exports = LogRecorder;
