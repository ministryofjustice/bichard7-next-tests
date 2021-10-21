const axios = require("axios").default;
const https = require("https");
const Poller = require("./Poller");

module.exports = async () => {
  const uiScheme = process.env.UI_SCHEME || "https";
  const uiHost = process.env.UI_HOST || "localhost";
  const uiPort = process.env.UI_PORT || "9443";

  const fetchHealthcheck = async () => {
    const axiosOptions = { validateStatus: () => true };
    if (uiScheme.toLowerCase() === "https") {
      const agent = new https.Agent({
        rejectUnauthorized: false
      });
      axiosOptions.httpsAgent = agent;
    }
    const resp = await axios.get(`${uiScheme}://${uiHost}:${uiPort}/bichard-ui/Connectivity`, axiosOptions);
    return resp.data;
  };

  const checkHealthcheck = (checkData) => {
    const failedSystems = Object.values(checkData)
      .reduce((acc, val) => acc.concat(val), [])
      .filter((system) => !system.healthy)
      .map((system) => system.name);
    if (failedSystems.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`Healthcheck failed. Unhealthy systems: ${failedSystems.join(", ")}`);
    } else {
      // eslint-disable-next-line no-console
      console.log("Healthcheck passed");
    }
    return failedSystems.length === 0;
  };

  return new Poller(fetchHealthcheck)
    .poll({
      timeout: 60000,
      delay: 1000,
      name: "Health check",
      condition: checkHealthcheck
    })
    .then(() => true)
    .catch(() => {
      throw new Error("Healthcheck failed");
    });
};
