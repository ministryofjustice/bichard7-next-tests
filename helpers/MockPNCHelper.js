const axios = require("axios").default;
const fs = require("fs").promises;
const Poller = require("../utils/Poller");
const realPNC = process.env.REAL_PNC && process.env.REAL_PNC === "true";

class MockPNCHelper {
  constructor(options) {
    this.options = options;
  }

  async addMock(matchRegex, response, count = null) {
    if (realPNC) return;
    const data = { matchRegex, response, count };
    const resp = await axios.post(`http://${this.options.host}:${this.options.port}/mocks`, data);
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error setting mock in PNC Emulator");
    }
    return resp.headers.location.replace("/mocks/", "");
  }

  async getMock(id) {
    if (realPNC) return;
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/mocks/${id}`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting mock from PNC Emulator");
    }
    return resp.data;
  }

  async getRequests() {
    if (realPNC) return;
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/requests`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting requests from PNC Emulator");
    }
    return resp.data;
  }

  async getMocks() {
    if (realPNC) return;
    const resp = await axios.get(`http://${this.options.host}:${this.options.port}/mocks`, {
      validateStatus: () => true
    });
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error("Error getting requests from PNC Emulator");
    }
    return resp.data;
  }

  async awaitMockRequest(id, timeout = 40000) {
    if (realPNC) return;
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
    if (realPNC) return;
    const response = await axios.delete(`http://${this.options.host}:${this.options.port}/mocks`);
    if (response.status !== 204) {
      throw new Error("Error clearing mocks in PNC Emulator");
    }
  }

  async recordRequests() {
    if (realPNC) return;
    const requests = await this.getRequests();
    await fs.writeFile(`${this.options.world.outputDir}/requests.json`, JSON.stringify(requests));
  }

  async recordMocks() {
    if (realPNC) return;
    const mocks = await this.getMocks();
    await fs.writeFile(`${this.options.world.outputDir}/mocks.json`, JSON.stringify(mocks));
  }
}

module.exports = MockPNCHelper;
