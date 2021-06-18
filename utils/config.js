const getConfig = () => {
  const uiScheme = process.env.UI_SCHEME || "https";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9443";
  const hostMachine = process.env.HOST_MACHINE || "localhost";

  return { baseUrl: `${uiScheme}://${uiHost}:${uiPort}`, hostMachine };
};

module.exports = { getConfig };
