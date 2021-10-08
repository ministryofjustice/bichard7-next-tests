let config;

const { Loadtest } = require("./src/loadtest");

try {
  // eslint-disable-next-line import/no-unresolved
  config = require("./config.json");
} catch (e) {
  config = require("./config.sample.json");
}

const loadtest = new Loadtest(config);
loadtest.start();
