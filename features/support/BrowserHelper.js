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
