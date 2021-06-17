require("expect-puppeteer");
const Bichard = require("./utils/helpers");
const { logout } = require("./utils/urls");

// run tests a max of 3 times just in case
jest.retryTimes(3);

// increase puppeteer timeout for jsdom-based tests
if (typeof page !== "undefined") {
  page.setDefaultTimeout(60000);
}

if (process.env.CI) {
  jest.setTimeout(60000);
} else {
  jest.setTimeout(50000);
}

const world = new Bichard();

// clear db
beforeEach(async () => {
  // eslint-disable-next-line no-underscore-dangle
  await page._client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: "./tmp" });

  await world.pnc.clearMocks();

  await world.db.clearExceptions();
});

// log out, clear db, clear pnc
afterEach(async () => {
  if (typeof page !== "undefined") {
    await page.goto(logout());
    await page.waitForSelector("input[type=submit][value=OK]");
    await page.click("input[type=submit][value=OK]");

    await page.waitForSelector("#username");
  }
  await world.pnc.clearMocks();

  await world.db.clearExceptions();
});

afterAll(async () => {
  await world.db.closeConnection();
});
