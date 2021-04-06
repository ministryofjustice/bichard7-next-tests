var { After, Before } = require("@cucumber/cucumber");

Before(async function () {
  await this.db.clearExceptions();
});

After(async function () {
  await this.browser.close();
  // await this.db.clearExceptions();
});
