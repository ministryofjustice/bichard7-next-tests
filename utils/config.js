const getConfig = () => {
  const uiScheme = process.env.UI_SCHEME || "https";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9443";

  const usersScheme = process.env.USERS_SCHEME || "https";
  const usersHost = process.env.USERS_HOST || "localhost";
  const usersPort = process.env.USERS_PORT || "4443";

  const hostMachine = process.env.HOST_MACHINE || "localhost";

  const defaultTimeout = process.env.MESSAGE_ENTRY_POINT === "s3" ? 100000 : 30000;
  const timeout = parseInt(process.env.TEST_TIMEOUT, 10) || defaultTimeout;

  return {
    baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
    hostMachine,
    timeout,
    usersUrl: `${usersScheme}://${usersHost}:${usersPort}`
  };
};

const authType = {
  bichard: "bichard",
  userService: "user-service",
  bichardJwt: "bichard-jwt"
};

const stackType = {
  baseline: "baseline",
  next: "next"
};

module.exports = {
  getConfig,
  authType,
  stackType
};
