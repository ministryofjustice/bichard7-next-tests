require("expect-puppeteer");
const Bichard = require("./utils/helpers");
const { logout } = require("./utils/urls");

if (process.env.CI) {
  console.log("Setting timeout to 60 seconds");
  jest.setTimeout(60000);
} else {
  jest.setTimeout(20000);
}

const world = new Bichard();

// clear db
beforeEach(async () => {
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
