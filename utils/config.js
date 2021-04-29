const getConfig = () => {
  const uiScheme = process.env.UI_SCHEME || "http";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9080";

  return { baseUrl: `${uiScheme}://${uiHost}:${uiPort}` };
};

module.exports = { getConfig };
