const expect = require("expect");
const { authType } = require("../utils/config");
const { home, userService } = require("../utils/urls");

const timeout = process.env.TEST_TIMEOUT || 30000;

const logInToBichardAs = async function (world, username) {
  const page = await world.browser.newPage(home());
  await page.waitForSelector("#username");

  await page.type("#username", username);
  await page.type("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName", { timeout: parseInt(timeout, 10) });
};

const logInToUserServiceAs = async function (world, username) {
  const emailAddress = `${username}@example.com`;

  const page = await world.browser.newPage(userService());
  await page.waitForSelector("#email");

  await page.type("#email", emailAddress);
  await page.type("#password", "password");
  await page.click("button[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName", { timeout: parseInt(timeout, 10) });
};

const logInAs = async function (group) {
  const username = `${group.replace(" ", "")}1`;

  if (this.authType === authType.bichard) {
    await logInToBichardAs(this, username);
  } else {
    await logInToUserServiceAs(this, username);
  }

  await expect(await this.browser.pageText()).toMatch(new RegExp(`You are logged in as: ${username}`, "i"));
};

module.exports = { logInAs };
