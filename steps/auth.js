const { home } = require("../utils/urls");

const logInAs = async (group) => {
  const username = `${group.replace(" ", "")}1`;

  await page.goto(home());

  await page.waitForSelector("#username");

  await expect(page).toFill("#username", username);
  await expect(page).toFill("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName");
  await expect(page).toMatch(`You are logged in as: ${username}`);
};

module.exports = { logInAs };
