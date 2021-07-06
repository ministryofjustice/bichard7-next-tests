const getConfig = () => {
  const uiScheme = process.env.UI_SCHEME || "https";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9443";

  const usersScheme = process.env.USERS_SCHEME || "https";
  const usersHost = process.env.USERS_HOST || "localhost";
  const usersPort = process.env.USERS_PORT || "3443";

  const hostMachine = process.env.HOST_MACHINE || "localhost";

  return {
    baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
    hostMachine,
    usersUrl: `${usersScheme}://${usersHost}:${usersPort}`
  };
};

module.exports = { getConfig };
