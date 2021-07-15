const { After, Before, BeforeAll } = require("@cucumber/cucumber");
const fs = require("fs");

BeforeAll(async () => {
  const clearRecordings = process.env.CLEAR_RECORDINGS !== "false";
  if (clearRecordings) {
    try {
      fs.rmSync("./screenshots", { recursive: true });
    } catch (e) {
      console.log("Screenshots directory did not exist");
    }
  }
});

Before(async function (context) {
  this.featureUri = context.gherkinDocument.uri;
  await this.browser.setupDownloadFolder("./tmp");
  await this.db.clearExceptions();
  await this.pnc.clearMocks();
});

After(async function () {
  await this.browser.logout();
  await this.browser.close();
});
