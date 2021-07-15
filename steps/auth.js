const expect = require("expect");
const jwt = require("jsonwebtoken");
const { authType, timeout } = require("../utils/config");
const { home, userService, authenticateUrl } = require("../utils/urls");
const dummyUsers = require("../utils/dummyUserData");

const logInToBichardAs = async function (world, username) {
  const page = await world.browser.newPage(home());
  await page.waitForSelector("#username");

  await page.type("#username", username);
  await page.type("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInToUserServiceAs = async function (world, username) {
  const emailAddress = `${username}@example.com`;

  const page = await world.browser.newPage(userService());
  await page.waitForSelector("#email");

  await page.type("#email", emailAddress);
  await page.type("#password", "password");
  await page.click("button[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInToBichardJwtAs = async function (world, username) {
  const jwtSecret = process.env.TOKEN_SECRET || "OliverTwist";
  const user = dummyUsers[username.toLowerCase()];
  if (!user) throw new Error(`Could not find user data for ${username}`);
  const tokenData = {
    username,
    exclusionList: [],
    inclusionList: user.inclusionList,
    forenames: "Bichard User",
    surname: "01",
    emailAddress: `${username}@example.com`,
    groups: user.groups,
    iat: 1626187368,
    exp: 9999999999,
    iss: "Bichard"
  };
  const token = jwt.sign(tokenData, jwtSecret);
  const page = await world.browser.newPage(authenticateUrl(token));
  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInAs = async function (group) {
  const username = `${group.replace(" ", "")}1`;
  if (this.authType === authType.bichard) {
    await logInToBichardAs(this, username);
  } else if (this.authType === authType.bichardJwt) {
    await logInToBichardJwtAs(this, username);
  } else {
    await logInToUserServiceAs(this, username);
  }

  await expect(await this.browser.pageText()).toMatch(new RegExp(`You are logged in as: ${username}`, "i"));
};

module.exports = { logInAs };
