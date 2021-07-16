const { After, Before, BeforeAll } = require("@cucumber/cucumber");
const fs = require("fs");

BeforeAll(async () => {
  const clearRecordings = process.env.CLEAR_RECORDINGS !== "false";
  if (clearRecordings) {
    try {
      fs.rmSync("./screenshots", { recursive: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Screenshots directory did not exist");
    }
  }
});

Before(async function (context) {
  this.featureUri = context.gherkinDocument.uri;
  const featureName = this.featureUri.split("/").slice(-2)[0];
  this.outputDir = `./screenshots/${featureName}/${new Date().getTime()}`;
  await this.browser.setupDownloadFolder("./tmp");
  await this.db.clearExceptions();
  await this.pnc.clearMocks();
});

After(async function () {
  await this.browser.logout();
  await this.browser.close();
  if (process.env.RECORD === "true") {
    await this.pnc.recordMocks();
    await this.pnc.recordRequests();
  }
});
