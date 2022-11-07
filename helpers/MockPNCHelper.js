const axios = require("axios");
const fs = require("fs").promises;
const Poller = require("../utils/Poller");

class MockPNCHelper {
  constructor(options) {
    this.options = options;
  }

  async addMock(matchRegex, response, count = null) {
    const data = { matchRegex, response, count };
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

  async getRequests() {
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/requests`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting requests from PNC Emulator");
    }
    return resp.data;
  }

  async getMocks() {
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/mocks`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting requests from PNC Emulator");
    }
    return resp.data;
  }

  async awaitMockRequest(id, timeout = 40000) {
    const action = () => this.getMock(id);

    const condition = (mock) => mock && mock.requests && mock.requests.length > 0;

    const options = {
      condition,
      timeout,
      delay: 250,
      name: "Mock PNC request poller"
    };
    return new Poller(action)
      .poll(options)
      .then((mock) => mock)
      .catch((error) => error);
  }

  async clearMocks() {
    const response = await axios.delete(`http://${this.options.host}:${this.options.port}/mocks`);
    if (response.status !== 204) {
      throw new Error("Error clearing mocks in PNC Emulator");
    }
  }

  async recordRequests() {
    const requests = await this.getRequests();
    await fs.writeFile(`${this.options.world.outputDir}/requests.json`, JSON.stringify(requests));
  }

  async recordMocks() {
    const mocks = await this.getMocks();
    await fs.writeFile(`${this.options.world.outputDir}/mocks.json`, JSON.stringify(mocks));
  }
}

module.exports = MockPNCHelper;
