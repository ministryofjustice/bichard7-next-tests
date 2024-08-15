const puppeteer = require("puppeteer-core")

const BrowserHelper = require("./BrowserHelper")

const edgePaths = {
  darwin: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  win32: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  linux: "/usr/bin/microsoft-edge-dev"
}

let browser

class BrowserHelperEdge extends BrowserHelper {
  async newPage(path) {
    if (!browser) {
      browser = await puppeteer.launch({
        executablePath: edgePaths[process.platform],
        acceptInsecureCerts: true,
        headless: this.options.headless ? "new" : false,
        args: [
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
          "--enable-features=NetworkService",
          ...this.defaultArgsForPuppeteer
        ]
      })
    }
    const context = await browser.createBrowserContext()
    this.page = await context.newPage()
    await this.page.setViewport({
      width: 1024,
      height: 1024
    })
    await this.page.setExtraHTTPHeaders({
      "Accept-Language": "en_GB"
    })
    await this.record()
    await this.visitUrl(path)
    return this.page
  }
}

module.exports = BrowserHelperEdge
