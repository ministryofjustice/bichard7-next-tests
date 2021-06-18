const { After, Before } = require("@cucumber/cucumber");

Before(async function () {
  await this.db.clearExceptions();
  await this.pnc.clearMocks();
});

After(async function () {
  await this.browser.logout();
  await this.browser.close();
});
