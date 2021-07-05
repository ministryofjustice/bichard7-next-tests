const { After, Before } = require("@cucumber/cucumber");

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
