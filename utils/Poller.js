const clearTimeouts = (handles) => handles.forEach(clearTimeout);

class Poller {
  constructor(action) {
    this.action = action;
  }

  poll(options) {
    const { timeout, delay, condition, name } = options;

    return new Promise((resolve, reject) => {
      const processHandles = [];

      const timeoutHandle = setTimeout(() => {
        clearTimeouts([timeoutHandle, ...processHandles]);
        reject(new Error(`Failed polling due to exceeding the timeout. (${name})`));
      }, timeout);

      const process = async () => {
        const result = await this.action();
        if (condition(result)) {
          clearTimeouts([timeoutHandle, ...processHandles]);
          resolve(result);
        } else {
          processHandles.push(setTimeout(process, delay));
        }
      };

      process();
    });
  }
}

module.exports = Poller;
