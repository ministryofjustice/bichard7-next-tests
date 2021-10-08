const { Task } = require("./task");

class Loadtest {
  constructor(options) {
    this.config = options;
  }

  async start() {
    const tasks = [];

    this.config.forEach((section) => {
      for (let i = 0; i < section.parallelism; i += 1) {
        const task = new Task({ duration: section.duration, command: section.command, id: `${section.id}-${i}` });
        tasks.push(task);
        task.start();
      }
    });
  }
}

module.exports = {
  Loadtest
};
