const { expect } = require("expect")
const jwt = require("jsonwebtoken")
const { authType, timeout } = require("./config")
const { login, authenticateUrl } = require("./urls")
const dummyUsers = require("./dummyUserData")

const nextui = process.env.NEXTUI === "true"

const tokenSecret = () => process.env.TOKEN_SECRET || "OliverTwist"

const parallelUserName = (world, name) => (world.config.parallel ? `${name}.${world.config.workerId}` : name)

const createUser = async (world, name) => {
  const user = dummyUsers[name.toLowerCase()]
  const username = parallelUserName(world, name)
  if (!user) {
    throw new Error(`User '${username}' not defined`)
  }
  if (world.db.createUser) {
    await world.db.createUser(
      username,
      user.groups,
      user.inclusionList,
      user.exclusionList,
      user.visible_courts,
      user.visible_forces,
      user.excluded_triggers
    )
  }
}

const logInNormallyAs = async function (world, name) {
  const username = parallelUserName(world, name)
  const emailAddress = `${username}@example.com`

  const page = await world.browser.newPage(login())
  await page.waitForSelector("#email")

  await page.type("#email", emailAddress)
  await world.browser.clickAndWait("button[type='submit']")

  await page.waitForSelector("#validationCode")

  // Grab verification code from the database
  const verificationCode = await world.db.getEmailVerificationCode(emailAddress)

  await page.type("#validationCode", verificationCode)
  await page.type("#password", "password")
  await world.browser.clickAndWait("button[type='submit']")
  await page.waitForSelector('xpath/.//*[contains(text(), "Welcome ")]')

  if (nextui) {
    const [button] = await page.$$("xpath/.//a[contains(., 'Access New Bichard')]")
    if (button) {
      await Promise.all([button.click(), page.waitForNavigation()])
    }
    return
  }

  await world.browser.clickAndWait("a#bichard-link")
  await page.waitForSelector(".wpsToolBarUserName", { timeout })
}

const logInDirectToBichardWithJwtAs = async function (world, name) {
  const user = dummyUsers[name.toLowerCase()]
  const username = parallelUserName(world, name)

  if (!user) {
    throw new Error(`Could not find user data for ${username}`)
  }
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
  }
  const token = jwt.sign(tokenData, tokenSecret())
  const url = authenticateUrl(token)
  await world.browser.setAuthCookie(token)
  const page = await world.browser.newPage(url)
  await page.waitForSelector(".wpsToolBarUserName", { timeout })
}

const logInAs = async function (username) {
  if (this.config.noUi) {
    return
  }
  await createUser(this, username)

  if (this.config.authType === authType.bichardJwt) {
    await logInDirectToBichardWithJwtAs(this, username)
  } else {
    await logInNormallyAs(this, username)
  }

  const match = nextui ? new RegExp(username, "i") : new RegExp(`You are logged in as: ${username}`, "i")
  expect(await this.browser.pageText()).toMatch(match)
}

module.exports = { logInAs }
