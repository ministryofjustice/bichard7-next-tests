const expect = require("expect");
const { home, userService } = require("../utils/urls");

const logInToBaselineAs = async function (world, username) {
  const page = await world.browser.newPage(home());
  await page.waitForSelector("#username");

  await page.type("#username", username);
  await page.type("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName");
};

const logInToNextAs = async function (world, username) {
  const emailAddress = `${username}@example.com`;

  const page = await world.browser.newPage(userService());
  await page.waitForSelector("#email");

  await page.type("#email", emailAddress);
  await page.type("#password", "password");
  await page.click("button[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName");
};

const logInAs = async function (group) {
  const username = `${group.replace(" ", "")}1`;

  if (this.stackType === "baseline") {
    await logInToBaselineAs(this, username);
  } else {
    await logInToNextAs(this, username);
  }

  await expect(await this.browser.pageText()).toMatch(new RegExp(`You are logged in as: ${username}`, "i"));
};

module.exports = { logInAs };
