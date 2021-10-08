/* eslint-disable no-console */
const { exec } = require("child_process");

class Task {
  constructor(options) {
    this.id = options.id;
    this.duration = options.duration;
    this.command = options.command;
    this.runs = 0;
  }

  onComplete(err) {
    if (err) {
      console.log(`${this.id} - error`);
    }
    console.log(`${this.id} - ${this.runs} runs completed`);
    if (new Date() < this.endTime) {
      this.runTask();
    }
  }

  runTask() {
    this.runs += 1;
    console.log(`${this.id} - starting run ${this.runs}`);
    exec(`PARALLEL_ID=${this.id} ${this.command}`, this.onComplete.bind(this));
  }

  start() {
    this.endTime = new Date(new Date().getTime() + this.duration);
    this.runTask();
  }
}

module.exports = {
  Task
};
