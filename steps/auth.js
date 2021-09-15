const expect = require("expect");
const jwt = require("jsonwebtoken");
const { authType, timeout } = require("../utils/config");
const { home, authenticateUrl, userService, userServiceVerification } = require("../utils/urls");
const dummyUsers = require("../utils/dummyUserData");

const tokenIssuer = () => process.env.TOKEN_ISSUER || "Bichard";
const tokenSecret = () => process.env.TOKEN_SECRET || "OliverTwist";

const createUser = async (world, username) => {
  const user = dummyUsers[username];
  if (!user) throw new Error(`User '${username}' not defined`);
  world.db.createUser(username, user.groups, user.inclusionList, user.exclusionList);
};

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

  let page = await world.browser.newPage(userService());
  await page.waitForSelector("#email");

  await page.type("#email", emailAddress);
  await page.click("button[type='submit']");

  // Grab verification code from the database and generate the email verification token
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const verificationCode = await world.db.getEmailVerificationCode(emailAddress);
  const tokenData = { emailAddress, verificationCode };
  const verificationToken = jwt.sign(tokenData, tokenSecret(), { issuer: tokenIssuer() });

  // Visit page linked to from verification email
  page = await world.browser.newPage(userServiceVerification(verificationToken));
  await page.waitForSelector("#password");

  await page.type("#password", "password");
  if (process.env.RUN_PARALLEL) {
    // entering the worlds worst border check ... it works ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await world.db.resetEmailVerificationCode(emailAddress);
  }
  await page.click("button[type='submit']");
  if (process.env.RUN_PARALLEL) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await world.db.resetEmailVerificationCode(emailAddress);
  }

  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInToBichardJwtAs = async function (world, username) {
  const user = dummyUsers[username.toLowerCase()];
  if (!user) throw new Error(`Could not find user data for ${username}`);
  const tokenData = {
    username,
    exclusionList: user.exclusionList,
    inclusionList: user.inclusionList,
    forenames: "Bichard User",
    surname: "01",
    emailAddress: `${username}@example.com`,
    groups: user.groups,
    iat: 1626187368,
    exp: 9999999999,
    iss: "Bichard"
  };
  const token = jwt.sign(tokenData, tokenSecret());
  const page = await world.browser.newPage(authenticateUrl(token));
  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInAs = async function (username) {
  createUser(this, username);

  if (this.authType === authType.bichard) {
    await logInToBichardAs(this, username);
  } else if (this.authType === authType.bichardJwt) {
    await logInToBichardJwtAs(this, username);
  } else {
    await logInToUserServiceAs(this, username);
  }

  expect(await this.browser.pageText()).toMatch(new RegExp(`You are logged in as: ${username}`, "i"));
};

module.exports = { logInAs };
