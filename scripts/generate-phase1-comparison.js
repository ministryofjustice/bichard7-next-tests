const promisePoller = require("promise-poller").default
const fs = require("fs")
const uuid = require("uuid").v4
const defaults = require("../utils/defaults")
const ActiveMqHelper = require("../helpers/ActiveMqHelper")
const PostgresHelper = require("../helpers/PostgresHelper")
const MockPNCHelper = require("../helpers/MockPNCHelper")

const testNumber = process.env.TEST_NUMBER
const inputMessages = {}
const fakeWorld = {
  currentPTIURNValues: [],
  currentTestGivenNames1: [],
  currentTestGivenNames2: [],
  currentTestFamilyNames: [],
  currentProsecutorReference: []
}

const mq = new ActiveMqHelper({
  url: process.env.MQ_URL || defaults.mqUrl,
  login: process.env.MQ_USER || defaults.mqUser,
  password: process.env.MQ_PASSWORD || defaults.mqPassword
})

const db = new PostgresHelper({
  host: process.env.DB_HOST || defaults.postgresHost,
  port: process.env.DB_PORT || defaults.postgresPort,
  database: "bichard",
  user: process.env.DB_USER || defaults.postgresUser,
  password: process.env.DB_PASSWORD || defaults.postgresPassword,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
})

const pnc = new MockPNCHelper({
  host: process.env.PNC_HOST || defaults.pncHost,
  port: process.env.PNC_PORT || defaults.pncPort,
  world: fakeWorld
})

if (testNumber) {
  const testDirs = fs.readdirSync("./features").filter((dir) => dir.startsWith(testNumber))
  testDirs.forEach((dir) => {
    const testDir = `./features/${dir}/`
    const inputFiles = fs
      .readdirSync(testDir)
      .filter((f) => f.includes("input-message"))
      .map((f) => `${testDir}/${f}`)
    if (inputFiles.length === 1) {
      ;[inputMessages[testNumber]] = inputFiles
    } else if (inputFiles.length > 1) {
      inputFiles.forEach((f, index) => {
        inputMessages[`${testNumber}-${index}`] = f
      })
    }
  })
} else {
  console.log("Running all tests")
}

const fetchComparisons = async () => {
  const comparisons = await mq.getMessages("PROCESSING_VALIDATION_QUEUE")
  if (comparisons.length !== 1) {
    throw new Error(`Error getting comparison file. Received ${comparisons.length} results`)
  }
  return comparisons
}

const mockPncResponses = async (testPath) => {
  try {
    const mocks = require(`../${testPath}mock-pnc-responses`)(`${testPath}pnc-data.xml`, fakeWorld)
    await pnc.clearMocks()
    /* eslint-disable no-restricted-syntax */
    for (const mock of mocks) {
      /* eslint-disable no-await-in-loop */
      await pnc.addMock(mock.matchRegex, mock.response, mock.count)
    }
  } catch (e) {
    console.log(e)
  }
}

const processFile = async (fileName) => {
  const testPath = fileName.split("/").slice(0, -1).join("/")
  await mockPncResponses(testPath)

  db.clearExceptions()
  // Send the test file to the message queue
  const rawMessage = await fs.promises.readFile(fileName)
  const correlationId = `CID-${uuid()}`
  const messageData = rawMessage.toString().replace("EXTERNAL_CORRELATION_ID", correlationId)
  await mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageData)
  // Wait for the validation queue
  const comparisons = await promisePoller({
    taskFn: fetchComparisons,
    interval: 20,
    retries: 1000
  }).catch((e) => e)

  const output = JSON.parse(comparisons[0])

  // Add the DB state
  output.dbContent = await db.dumpData()

  // Add the audit logs
  output.auditLogEvents = await mq.getMessages("GENERAL_EVENT_QUEUE")

  return output
}

const promises = Object.entries(inputMessages).map(async ([testId, filePath]) => {
  const processingResult = await processFile(filePath)
  const outFile = `./comparisons/test-${testId}.json`
  fs.writeFileSync(outFile, JSON.stringify(processingResult, null, 2))
})

Promise.all(promises).then(() => {
  db.closeConnection()
  mq.client.disconnect()
})
