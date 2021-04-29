const axios = require("axios").default;

class MockPNCHelper {
  constructor(options) {
    this.options = options;
  }

  async addMock(matchRegex, response) {
    const data = { matchRegex, response };
    const resp = await axios.post(`http://${this.options.host}:${this.options.port}/mocks`, data);
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error setting mock in PNC Emulator");
    }
    return resp.headers.location.replace("/mocks/", "");
  }

  async getMock(id) {
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/mocks/${id}`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting mock from PNC Emulator");
    }
    return resp.data;
  }

  async awaitMockRequest(id, delay = 500, attempts = 20) {
    let conditionMet = false;
    let attemptsRemaining = attempts;
    let mock;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /* eslint-disable no-await-in-loop */
    while (!conditionMet && attemptsRemaining > 0) {
      mock = await this.getMock(id);
      conditionMet = mock && mock.requests && mock.requests.length > 0;
      if (!conditionMet) {
        attemptsRemaining -= 1;
        await wait(delay);
      }
    }
    /* eslint-enable no-await-in-loop */

    return mock;
  }

  async clearMocks() {
    const response = await axios.delete(`http://${this.options.host}:${this.options.port}/mocks`);
    if (response.status !== 204) {
      throw new Error("Error clearing mocks in PNC Emulator");
    }
  }
}

module.exports = MockPNCHelper;
