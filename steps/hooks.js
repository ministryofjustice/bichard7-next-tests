const { After, Before, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const fs = require("fs");
const LogRecorder = require("../helpers/LogRecorder");

const recordLogs = process.env.RECORD === "true" && process.env.RECORD_LOGS === "true";
let logRecorder;

BeforeAll(async () => {
  const clearRecordings = process.env.CLEAR_RECORDINGS !== "false";
  if (clearRecordings) {
    try {
      fs.rmSync("./screenshots", { recursive: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Screenshots directory did not exist");
    }
  }
  if (recordLogs) {
    // eslint-disable-next-line no-console
    console.log("Recording Bichard logs");
    logRecorder = new LogRecorder({
      fifo: process.env.LOG_FIFO || "/tmp/docker_logs"
    });
    await logRecorder.flush();
  }
});

AfterAll(() => {
  if (recordLogs) logRecorder.close();
});

Before(async function (context) {
  this.featureUri = context.gherkinDocument.uri;
  const featureName = this.featureUri.split("/").slice(-2)[0];
  this.outputDir = `./screenshots/${featureName}/${new Date().getTime()}`;
  if (process.env.RECORD === "true") {
    fs.mkdirSync(this.outputDir, { recursive: true });
  }
  await this.browser.setupDownloadFolder("./tmp");
  if (process.env.RUN_PARALLEL) {
    await this.db.clearExceptions();
    await this.pnc.clearMocks();
  }
});

After(async function () {
  await this.browser.close();
  if (process.env.RECORD === "true") {
    await this.pnc.recordMocks();
    await this.pnc.recordRequests();
    await this.dumpData();
  }
  if (recordLogs) {
    await logRecorder.save(this);
  }
});
