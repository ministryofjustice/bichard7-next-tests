const getConfig = () => {
  const uiScheme = process.env.UI_SCHEME || "https";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9443";

  const usersScheme = process.env.USERS_SCHEME || "https";
  const usersHost = process.env.USERS_HOST || "localhost";
  const usersPort = process.env.USERS_PORT || "3443";

  const hostMachine = process.env.HOST_MACHINE || "localhost";

  const timeout = parseInt(process.env.TEST_TIMEOUT, 10) || 30000;

  return {
    baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
    hostMachine,
    timeout,
    usersUrl: `${usersScheme}://${usersHost}:${usersPort}`
  };
};

const authType = {
  bichard: "bichard",
  userService: "user-service"
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
