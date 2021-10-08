const expect = require("expect");
const jwt = require("jsonwebtoken");
const { authType, timeout } = require("../utils/config");
const { home, authenticateUrl, userService, userServiceVerification } = require("../utils/urls");
const dummyUsers = require("../utils/dummyUserData");

const tokenIssuer = () => process.env.TOKEN_ISSUER || "Bichard";
const tokenSecret = () => process.env.TOKEN_SECRET || "OliverTwist";

const parallelUserName = (world, name) => (world.parallel ? `${name}.${process.env.PARALLEL_ID}` : name);

const createUser = async (world, name) => {
  const user = dummyUsers[name.toLowerCase()];
  const username = parallelUserName(world, name);
  if (!user) throw new Error(`User '${username}' not defined`);
  if (world.db.createUser) {
    world.db.createUser(username, user.groups, user.inclusionList, user.exclusionList);
  }
};

const logInToBichardAs = async function (world, username) {
  const page = await world.browser.newPage(home());
  await page.waitForSelector("#username");

  await page.type("#username", username);
  await page.type("#password", "password");
  await page.click("input[type='submit']");

  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInToUserServiceAs = async function (world, name) {
  const username = parallelUserName(world, name);
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
  await world.browser.clickAndWait("button[type='submit']");

  await world.browser.clickAndWait("a#bichard-link");

  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInToBichardJwtAs = async function (world, name) {
  const user = dummyUsers[name.toLowerCase()];
  const username = parallelUserName(world, name);

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
  const url = authenticateUrl(token);
  if (process.env.PRINT_LOGIN_URL === "true") {
    console.log(url);
  }
  const page = await world.browser.newPage(url);
  await page.waitForSelector(".wpsToolBarUserName", { timeout });
};

const logInAs = async function (username) {
  if (this.noUi) return;
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
