const clearTimeouts = (handles) => handles.forEach(clearTimeout)

class Poller {
  constructor(action) {
    this.action = action
  }

  poll(options) {
    const { timeout, delay, condition, name } = options
    let isDone = false

    return new Promise((resolve, reject) => {
      const processHandles = []
      const startTime = Date.now()

      const timeoutHandle = setTimeout(() => {
        if (isDone) {
          return
        }
        isDone = true
        clearTimeouts([timeoutHandle, ...processHandles])
        const totalSeconds = (Date.now() - startTime) / 1000
        reject(new Error(`Failed polling due to exceeding the timeout after ${totalSeconds} seconds. (${name})`))
      }, timeout)

      const process = async () => {
        const result = await this.action()
        if (isDone) {
          return
        }
        if (condition(result)) {
          isDone = true
          clearTimeouts([timeoutHandle, ...processHandles])
          resolve(result)
        } else if (!isDone) {
          processHandles.push(setTimeout(process, delay))
        }
      }

      process()
    })
  }
}

module.exports = Poller
