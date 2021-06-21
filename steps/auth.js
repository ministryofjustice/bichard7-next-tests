const expect = require("expect");
const { home } = require("../utils/urls");

const logInAs = async function (group) {
  const username = `${group.replace(" ", "")}1`;

  const page = await this.browser.newPage(home());

  await page.waitForSelector("#username");

  await page.type("#username", username);
  await page.type("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName");
  await expect(await this.browser.pageText()).toMatch(`You are logged in as: ${username}`);
};

module.exports = { logInAs };
