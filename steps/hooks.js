const { After, Before, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const fs = require("fs");
const LogRecorder = require("../helpers/LogRecorder");

const recordLogs = process.env.RECORD === "true" && process.env.RECORD_LOGS === "true";
const recordComparisons = process.env.RECORD_COMPARISONS === "true";
const comparisonOutDir = "comparisons";
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

// eslint-disable-next-line consistent-return
Before(async function (context) {
  this.featureUri = context.gherkinDocument.uri;
  // eslint-disable-next-line prefer-destructuring
  this.testId = this.featureUri.match(/features\/([^-]*)-.*/)[1];
  if (recordComparisons) {
    if (
      fs.existsSync(`${comparisonOutDir}/test-${this.testId}.json`) ||
      fs.existsSync(`${comparisonOutDir}/test-${this.testId}-1.json`)
    ) {
      console.log(`Skipping ${this.testId}`);
      return "pending";
    }
  }
  const featureName = this.featureUri.split("/").slice(-2)[0];
  this.outputDir = `./screenshots/${featureName}/${new Date().getTime()}`;
  if (process.env.RECORD === "true") {
    fs.mkdirSync(this.outputDir, { recursive: true });
  }
  await this.browser.setupDownloadFolder("./tmp");
  if (!process.env.RUN_PARALLEL) {
    await this.db.clearExceptions();
    if (!this.realPNC) {
      await this.pnc.clearMocks();
    }
  }
});

After(async function ({ result: { status } }) {
  await this.browser.close();
  if (process.env.RECORD === "true") {
    if (!this.realPNC) {
      await this.pnc.recordMocks();
      await this.pnc.recordRequests();
    }
    await this.dumpData();
  }
  if (recordLogs) {
    await logRecorder.save(this);
  }

  if (recordComparisons && status === "PASSED") {
    const comparisons = await this.mq.getMessages("PROCESSING_VALIDATION_QUEUE");
    if (!fs.existsSync(comparisonOutDir)) {
      fs.mkdirSync(comparisonOutDir);
    }
    comparisons.forEach(async (comparison, index) => {
      const subFile = comparisons.length > 1 ? `-${index}` : "";
      const outFile = `${comparisonOutDir}/test-${this.testId}${subFile}.json`;
      const formatted = JSON.stringify(JSON.parse(comparison), null, 2);
      await fs.promises.writeFile(outFile, formatted);
    });
  }
});
