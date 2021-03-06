const puppeteer = require("puppeteer");
const fs = require("fs");
const PuppeteerMassScreenshots = require("puppeteer-mass-screenshots");
const { authType } = require("../utils/config");
const { logout } = require("../utils/urls");

class BrowserHelper {
  constructor(options) {
    this.options = options;
    this.browser = null;
    this.page = null;
    this.authTokenCookie = null;
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
    const context = await this.browser.createIncognitoBrowserContext();
    this.page = await context.newPage();
    await this.page.setViewport({
      width: 1024,
      height: 768
    });
    await this.record();
    await this.visitUrl(path);
    return this.page;
  }

  async setAuthCookie(value) {
    this.authTokenCookie = value;
  }

  async record() {
    if (this.options.record) {
      this.recorder = new PuppeteerMassScreenshots();
      const outputDir = `${this.options.world.outputDir}/images`;
      fs.mkdirSync(outputDir, { recursive: true });
      await this.recorder.init(this.page, outputDir, {
        afterWritingImageFile: () => {}
      });
      await this.recorder.start();
    }
  }

  currentPage() {
    return this.page;
  }

  async visitUrl(path) {
    if (this.authTokenCookie) {
      const COOKS = [
        {
          name: ".AUTH",
          value: this.authTokenCookie,
          url: path,
          path: "/"
        }
      ];
      await this.page.setCookie(...COOKS);
    }
    await this.page.goto(path);
    return this.page;
  }

  async logout() {
    if (this.page) {
      await this.page.goto(logout());
      await this.page.waitForSelector("input[type=submit][value=OK]");
      await this.page.click("input[type=submit][value=OK]");

      const selector = this.options.world.authType === authType.bichard ? "#username" : ".infoMessage";
      await this.page.waitForSelector(selector);
    }
  }

  async close() {
    if (this.recorder) {
      await this.recorder.stop();
      this.options.world.attach(this.options.world.outputDir);
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
      fs.rmSync("./tmp", { recursive: true });
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
