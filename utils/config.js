const defaults = require("./defaults");

const defaultTimeout = process.env.MESSAGE_ENTRY_POINT === "s3" ? 100000 : 30000;
const uiScheme = process.env.UI_SCHEME || defaults.uiScheme;
const uiHost = process.env.UI_HOST || defaults.uiHost;
const uiPort = process.env.UI_PORT || defaults.uiPort;

const authType = {
  bichard: "bichard",
  userService: "user-service",
  bichardJwt: "bichard-jwt"
};

const config = {
  timeout: parseInt(process.env.TEST_TIMEOUT, 10) || defaultTimeout,
  baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
  parallel: process.env.RUN_PARALLEL === "true",
  authType: process.env.AUTH_TYPE || authType.userService,
  noUi: process.env.NO_UI === "true",
  messageEntryPoint: process.env.MESSAGE_ENTRY_POINT,
  realPNC: process.env.REAL_PNC === "true"
};

module.exports = {
  config,
  authType
};
