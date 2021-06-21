const { After, Before } = require("@cucumber/cucumber");
const fs = require("fs");

Before(async function () {
  fs.rmdirSync("./tmp", { recursive: true, force: true });
  await this.browser.setDownloadFolder("./tmp");
  await this.db.clearExceptions();
  await this.pnc.clearMocks();
});

After(async function () {
  await this.browser.logout();
  await this.browser.close();
});
