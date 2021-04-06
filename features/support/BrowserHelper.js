const puppeteer = require("puppeteer");

class BrowserHelper {
  constructor(options) {
    this.options = options;
    this.browser = null;
    this.page = null;
  }

  async newPage(path) {
    if (!this.browser)
      this.browser = await puppeteer.launch({
        headless: this.options.headless,
        args: [
          // Required for Docker version of Puppeteer
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          "--disable-dev-shm-usage",
        ],
      });
    this.page = await this.browser.newPage();
    await this.visitUrl(path);
    return this.page;
  }

  currentPage() {
    return this.page;
  }

  async visitUrl(path) {
    await this.page.goto(`${this.options.baseUrl}${path}`);
    return this.page;
  }

  async close() {
    this.browser.close();
  }
}

module.exports = BrowserHelper;
