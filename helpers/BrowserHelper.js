const puppeteer = require("puppeteer");
const fs = require("fs");
const PuppeteerMassScreenshots = require("puppeteer-mass-screenshots");
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
          "--disable-dev-shm-usage",
          "--window-size=1024x768"
        ]
      });
    this.page = await this.browser.newPage();
    await this.page.setViewport({
      width: 1024,
      height: 768
    });
    await this.record();
    await this.visitUrl(path);
    return this.page;
  }

  async record() {
    if (this.options.record) {
      this.recorder = new PuppeteerMassScreenshots();
      this.outputDir = `./screenshots/${new Date().getTime()}`;
      fs.mkdirSync(this.outputDir, { recursive: true });
      await this.recorder.init(this.page, this.outputDir, { afterWritingImageFile: () => {} });
      await this.recorder.start();
    }
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

      const selector = this.options.world.authType === "user-service" ? ".infoMessage" : "#username";
      await this.page.waitForSelector(selector);
    }
  }

  async close() {
    if (this.recorder) {
      await this.recorder.stop();
      this.options.world.attach(this.outputDir);
    }
    if (this.browser) this.browser.close();
  }

  elementText(selector) {
    return this.page.evaluate((sel) => document.querySelector(sel).innerText, selector);
  }

  pageText() {
    return this.page.evaluate(() => document.body.innerText);
  }

  async clickLinkAndWait(text) {
    const linkHandlers = await this.page.$x(`//a[normalize-space()='${text}']`);
    if (linkHandlers.length !== 1) throw new Error(`${linkHandlers.length} links found for ${text} - should be 1`);
    await Promise.all([linkHandlers[0].click(), this.page.waitForNavigation()]);
  }

  async clickAndWait(selector) {
    return Promise.all([this.page.click(selector), this.page.waitForNavigation()]);
  }

  async setupDownloadFolder(folder) {
    if (fs.existsSync("./tmp")) {
      fs.rmdirSync("./tmp", { recursive: true });
    }
    if (this.page) {
      // eslint-disable-next-line no-underscore-dangle
      await this.page._client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: folder });
    }
  }

  async selectDropdownOption(dropdownId, text) {
    const option = (await this.page.$x(`//*[@id = "${dropdownId}"]/option[text() = "${text}"]`))[0];
    const value = await (await option.getProperty("value")).jsonValue();
    await this.page.select(`#${dropdownId}`, value);
  }
}

module.exports = BrowserHelper;
