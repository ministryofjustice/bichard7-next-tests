const puppeteer = require("puppeteer");
const { logout } = require("../utils/urls");

class BrowserHelper {
  constructor(options) {
    this.options = options;
    this.browser = null;
    this.page = null;
  }

  async newPage(path) {
    if (!this.browser)
      this.browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: this.options.headless,
        args: [
          // Required for Docker version of Puppeteer
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          "--disable-dev-shm-usage"
        ]
      });
    this.page = await this.browser.newPage();
    await this.visitUrl(path);
    return this.page;
  }

  currentPage() {
    return this.page;
  }

  async visitUrl(path) {
    await this.page.goto(path);
    return this.page;
  }

  async logout() {
    if (this.page) {
      await this.page.goto(logout());
      await this.page.waitForSelector("input[type=submit][value=OK]");
      await this.page.click("input[type=submit][value=OK]");
      await this.page.waitForSelector("#username");
    }
  }

  async close() {
    if (this.browser) this.browser.close();
  }

  async elementText(selector) {
    return this.page.evaluate((sel) => document.querySelector(sel).innerText, selector);
  }

  async pageText() {
    return this.page.evaluate(() => document.body.innerText);
  }

  async clickAndWait(selector) {
    return Promise.all([this.page.click(selector), this.page.waitForNavigation()]);
  }
}

module.exports = BrowserHelper;
