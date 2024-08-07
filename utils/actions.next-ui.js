const { expect } = require("expect")
const forces = require("@moj-bichard7-developers/bichard7-next-data/dist/data/forces.json")
const { caseListPage } = require("./urls")
const {
  reloadUntilContentInSelector,
  reloadUntilContent,
  reloadUntilNotContent,
  reloadUntilXPathSelector,
  delay
} = require("./puppeteer-utils")

const waitForRecord = (name, page, reloadAttempts) => {
  const selector = `xpath/.//table/tbody/tr${name ? `[contains(.,"${name}")]` : ""}`

  return reloadUntilXPathSelector(page, selector, reloadAttempts)
}

const convertFieldToHtml = (field) => field.toLowerCase().replaceAll(" ", "-")

const resetFilters = async function (browser) {
  await browser.clickAndWait("#clear-filters")
}

// This function needs to wrap the resetFilters fuction to work if it's being called from UI Steps
const clearFilters = async function () {
  await resetFilters(this.browser)
}

const filterByRecordName = async function (world) {
  const name = world.getRecordName()
  const searchField = "input[name='defendantName']"
  await world.browser.page.click(searchField, { clickCount: 3 })
  await world.browser.page.type(searchField, name)
  await Promise.all([world.browser.page.click("button#search"), world.browser.page.waitForNavigation()])
}

const getTableData = async function (world, selector) {
  const trPromises = await world.browser.page
    .$$(selector)
    .then((els) =>
      els.map((elHandle) => elHandle.evaluate((el) => [...el.querySelectorAll("td")].map((e) => e.innerText.trim())))
    )
  return Promise.all(trPromises)
}

const getShortTriggerCode = (triggerCode) => {
  const triggerCodeDetails = triggerCode.match(/TR(?<triggerType>\w{2})(?<triggerCode>\d+)/).groups
  return `${triggerCodeDetails.triggerType}${String(Number(triggerCodeDetails.triggerCode)).padStart(2, "0")}`
}

const getTriggersFromPage = async (world) => {
  await world.browser.page.waitForSelector("section#triggers .moj-trigger-row")
  const triggerRows = await world.browser.page.$$("section#triggers .moj-trigger-row")

  const triggers = await Promise.all(
    triggerRows.map(async (row) => {
      const triggerCode = await row.evaluate((element) =>
        element.querySelector("label.trigger-code")?.innerText?.trim()
      )
      const offenceId = Number(
        await row.evaluate(
          (element) =>
            element
              .querySelector("button.moj-action-link")
              ?.innerText?.trim()
              ?.match(/Offence (?<offenceId>\d+)/).groups.offenceId
        )
      )
      return { triggerCode, offenceId }
    })
  )

  return triggers
}

const doesTriggerMatch = (actualTrigger, expectedTrigger) => {
  const triggerCodeMatch = actualTrigger.triggerCode === getShortTriggerCode(expectedTrigger.triggerCode)
  const offenceIdMatch = !expectedTrigger.offenceId || actualTrigger.offenceId === Number(expectedTrigger.offenceId)

  return triggerCodeMatch && offenceIdMatch
}

const checkTriggers = async (world, expectedTriggers) => {
  const actualTriggers = await getTriggersFromPage(world)
  const matchedTriggers = expectedTriggers.filter((expectedTrigger) =>
    actualTriggers.some((actualTrigger) => doesTriggerMatch(actualTrigger, expectedTrigger))
  )

  expect(matchedTriggers.length).toEqual(expectedTriggers.length)
}

const checkTriggerforOffence = async function (triggerCode, offenceId) {
  await checkTriggers(this, [
    {
      triggerCode,
      offenceId
    }
  ])
}

const checkCompleteTriggerforOffence = async function (triggerCode, offenceId) {
  await checkTriggers(this, [{ triggerCode, offenceId, status: "Complete" }])
}

const checkTrigger = async function (triggerCode) {
  await checkTriggers(this, [{ triggerCode, exact: false }])
}

const findRecordFor = async function (name) {
  expect(await this.browser.pageText()).toContain(name)
}

const checkNoPncErrors = async function (name) {
  const [recordLink] = await this.browser.page.$$(`xpath/.//table/tbody/tr/*/a[contains(text(),"${name}")]`)
  await recordLink.click()

  await this.browser.page.waitForSelector("text=PNC errors")
  await this.browser.clickAndWait("text=PNC errors")
  // TODO: assert no PNC errors once we have the table
}

const checkOffenceData = async function (value, key) {
  // const [cell] = await this.browser.page.$$(`xpath/.//table//td[contains(.,"${key}")]/following-sibling::td`);
  // case-sensitivity hack because old bichard capitalises every word and new bichard does not

  const [cellContent] = await this.browser.page.$$eval(
    `xpath/.//table//td[contains(
        translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),
        "${key.toLowerCase()}"
      )]/following-sibling::td`,
    (cells) => cells.map((cell) => cell.textContent)
  )

  expect(cellContent).toBe(value)
}

const checkOffence = function (offenceCode, offenceId) {
  console.log("Check offence", offenceCode, offenceId)
  throw Error("Not yet implemented.")
}

const openRecordFor = async function (name) {
  await waitForRecord(name, this.browser.page)

  const [link] = await this.browser.page.$$(`xpath/.//table/tbody/tr/*/a[contains(.,"${name}")]`)

  await Promise.all([link.click(), this.browser.page.waitForNavigation()])
}

const openRecordForCurrentTest = async function () {
  await filterByRecordName(this)
  await waitForRecord(this.getRecordName(), this.browser.page)
  const [recordLink] = await this.browser.page.$$(
    `xpath/.//table/tbody/tr/*/a[contains(text(),"${this.getRecordName()}")]`
  )
  await Promise.all([recordLink.click(), this.browser.page.waitForNavigation()])
  await this.browser.page.waitForSelector("text=Case details")
}

const loadTab = async function (tabName) {
  if (["Triggers", "Exceptions"].includes(tabName)) {
    await this.browser.page.click(`#${tabName.toLowerCase()}-tab`)
    return
  }

  const backToAllOffencesLink = await this.browser.page.$$(".govuk-back-link")

  if (tabName === "Offences" && backToAllOffencesLink.length > 0) {
    await backToAllOffencesLink[0].click()
    return
  }

  await this.browser.page.click(`text=${tabName}`)
}

const returnToOffenceList = async function () {
  const [back] = await this.browser.page.$$('xpath/.//*[contains(text(), "Back to all offences")]')
  await back.click()
}

const reallocateCaseToForce = async function (force) {
  const { page } = this.browser

  await this.browser.clickAndWait("text=Reallocate Case")
  const optionValue = await page.evaluate(
    ([f, allForces]) => {
      const select = document.querySelector('select[name="force"]')
      const options = Array.from(select.options)
      const selectedForceCode = { BTP: "93", Merseyside: "05", Metropolitan: "02" }[f]
      const forceDetails = allForces.find((x) => x.code === selectedForceCode)
      const dropdownTextToSelect = `${forceDetails.code} - ${forceDetails.name}`
      const option = options.find((o) => o.text === dropdownTextToSelect)
      return option.value
    },
    [force, forces]
  )
  await page.select('select[name="force"]', optionValue)
  await this.browser.clickAndWait("#Reallocate")
}

const canSeeContentInTable = async function (value) {
  let newValue = value
  if (value === "(Submitted)" || value === "(Resolved)") {
    newValue = newValue.replace(/[()]/g, "").toUpperCase()
  }

  const found = await reloadUntilContentInSelector(this.browser.page, newValue, "table.cases-list > tbody")
  expect(found).toBeTruthy()
}

const cannotSeeContentInTable = async function (value) {
  const found = await reloadUntilContentInSelector(this.browser.page, value, "table.cases-list > tbody", 2)
  expect(found).toBeFalsy()
}

const canSeeContentInTableForThis = async function (value) {
  await filterByRecordName(this)

  const found = await reloadUntilContentInSelector(this.browser.page, value, "table.cases-list > tbody")
  expect(found).toBeTruthy()
}

const cannotSeeTrigger = async function (value) {
  await waitForRecord(null, this.browser.page, 2)
  const noCasesMessageMatch = await this.browser.page.$$(
    `xpath/.//table[@class="cases-list"]//tbody//*[contains(text(),"${value}")]`
  )
  expect(noCasesMessageMatch.length).toEqual(0)
}

const noExceptionPresentForOffender = async function (name) {
  // Filter for exceptions
  await this.browser.page.waitForSelector("#exceptions-reason")
  await this.browser.page.click("#exceptions-reason")

  await Promise.all([this.browser.page.click("button#search"), this.browser.page.waitForNavigation()])

  const noCaseNamesMatch = await this.browser.page.$$(`xpath/.//*[contains(text(), "${name}")]`)
  expect(noCaseNamesMatch.length).toEqual(0)

  const noCasesMessageMatch = await this.browser.page.$$(
    'xpath/.//*[contains(text(), "There are no court cases to show")]'
  )
  expect(noCasesMessageMatch.length).toEqual(1)

  await resetFilters(this.browser)
}

const markTriggersComplete = async function (world) {
  await world.browser.clickAndWait("#mark-triggers-complete-button")
}

const resolveSelectedTriggers = async function () {
  await markTriggersComplete(this)
}

const resolveAllTriggers = async function () {
  const [selectAllLink] = await this.browser.page.$$("#select-all-triggers button")
  await selectAllLink.evaluate((e) => e.click())
  await markTriggersComplete(this)
}

const selectTriggerToResolve = async function (triggerNumber) {
  const checkbox = (await this.browser.page.$$(".moj-trigger-row input[type=checkbox]"))[triggerNumber - 1]
  await checkbox.click()
}

const manuallyResolveRecord = async function () {
  await this.browser.page.click("#exceptions-tab")
  await Promise.all([
    await this.browser.page.click("section#exceptions a[href*='resolve'] button"),
    await this.browser.page.waitForNavigation()
  ])

  await Promise.all([await this.browser.page.click("#Resolve"), await this.browser.page.waitForNavigation()])
}

const exceptionResolutionStatus = async function (resolutionStatus) {
  await this.browser.page.click("#exceptions-tab")

  const resolution = resolutionStatus.split(" ").length > 1 ? resolutionStatus.split(" ")[1] : resolutionStatus

  const headerResolutionStatus = await this.browser.page.$$(
    `xpath/.//div[@id = "header-container"]//div[contains(@class, "exceptions-${resolution.toLowerCase()}-tag") and text() = "${resolutionStatus}"]`
  )
  const exceptionsPanelResolutionStatus = await this.browser.page.$$(
    `xpath/.//section[@id = "exceptions"]//div[contains(@class, "exceptions-${resolution.toLowerCase()}-tag") and text() = "${resolutionStatus}"]`
  )

  expect(headerResolutionStatus.length).toEqual(1)
  expect(exceptionsPanelResolutionStatus.length).toEqual(1)
}

const filterRecords = async function (world, resolvedType, recordType) {
  if (resolvedType.toLowerCase() === "resolved") {
    await world.browser.page.click("input#resolved")
  }

  if (recordType.toLowerCase() === "exception") {
    await world.browser.page.click("input#exceptions-reason")
  } else if (recordType.toLowerCase() === "trigger") {
    await world.browser.page.click("input#trigger-type")
  }

  await Promise.all([world.browser.page.click("button#search"), world.browser.page.waitForNavigation()])
}

// eslint-disable-next-line no-unused-vars
const checkRecordForThisTestResolved = async function (recordType, resolvedType) {
  // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
  const resolveTriggersButtons = await this.browser.page.$$(
    "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
  )

  expect(resolveTriggersButtons.length).toEqual(0)
}

// eslint-disable-next-line no-unused-vars
const checkRecordForThisTestNotResolved = async function (recordType, resolvedType) {
  // TODO: Currently there is no way of filtering for resolved cases, we need to update next UI and update this test
  const resolveTriggersButtons = await this.browser.page.$$(
    "#Triggers_table .src__StyledButton-sc-19ocyxv-0:not([disabled])"
  )

  expect(resolveTriggersButtons.length).toEqual(0)
}

const checkNoExceptions = async function () {
  await filterRecords(this, "unresolved", "exception")
  const noCasesMessageMatch = await this.browser.page.$$(
    'xpath/.//*[contains(text(), "There are no court cases to show")]'
  )
  expect(noCasesMessageMatch.length).toEqual(1)
}

const checkNoExceptionsForThis = async function () {
  // TODO: Fix this step to check record has no exceptions
}

const checkNoRecords = async function () {
  await filterRecords(this, "unresolved", "record")

  const noCasesMessageMatch = await this.browser.page.$$(
    'xpath/.//*[contains(text(), "There are no court cases to show")]'
  )
  expect(noCasesMessageMatch.length).toEqual(1)
}

const checkNoRecordsForThis = async function () {
  const name = this.getRecordName()
  if (this.config.noUi) {
    // Read the records direct from the DB
    const records = await this.db.getMatchingErrorRecords(name)
    expect(records.length).toEqual(0)
  } else {
    const didFoundText = await reloadUntilXPathSelector(
      this.browser.page,
      'xpath/.//*[contains(text(), "There are no court cases to show")]'
    )
    expect(didFoundText).toEqual(true)
  }
}

const nRecordsInList = async function (n) {
  const records = await this.browser.page.$$("[class*='caseDetailsRow']")
  // TODO: change "there should only be {string} records"
  // to "there should only be {int} records" once old
  // steps are removed - remove coercion below
  expect(`${records.length}`).toBe(n)
}

// TODO: review whether this is specific enough
const nRecordsForPerson = async function (n, name) {
  const records = await this.browser.page.$$(`xpath/.//tr/td/a[text()[contains(.,'${name}')]]`)
  expect(records.length).toEqual(n)
}

const noRecordsForPerson = async function (name) {
  await nRecordsForPerson.apply(this, [0, name])
}

const goToExceptionList = async function () {
  if (this.config.noUi) {
    return
  }
  await Promise.all([this.browser.page.waitForNavigation(), this.browser.page.goto(caseListPage())])
}

// TODO: refactor down with noExceptionsPresentForOffender
const noTriggersPresentForOffender = async function (name) {
  await this.browser.page.waitForSelector("#triggers-reason")
  await this.browser.page.click("#triggers-reason")

  await Promise.all([this.browser.page.click("button#search"), this.browser.page.waitForNavigation()])

  const noCaseNamesMatch = await this.browser.page.$$(`xpath/.//*[contains(text(), "${name}")]`)
  expect(noCaseNamesMatch.length).toEqual(0)

  const noCasesMessageMatch = await this.browser.page.$$(
    'xpath/.//*[contains(text(), "There are no court cases to show")]'
  )
  expect(noCasesMessageMatch.length).toEqual(1)

  await resetFilters(this.browser)
}

const correctOffence = async (page, fieldHtml, newValue) => {
  const inputId = `input#${fieldHtml}`

  // Get the length of existing value
  let elementLength = await page.$eval(inputId, (e) => {
    const element = e
    elementLength = element.value.length
    return elementLength
  })

  await page.focus(inputId)

  // Delete the existing input, triggers a change event.
  if (elementLength > 0) {
    new Array(elementLength).fill(0).forEach(async () => {
      await page.keyboard.press("Delete")
      await page.keyboard.press("Backspace")
    })
  }

  await page.focus(inputId)
  await page.keyboard.type(newValue, { delay: 100 })
}

const correctOffenceException = async function (field, newValue) {
  const { page } = this.browser

  await correctOffence(page, convertFieldToHtml(field), newValue)

  try {
    await page.waitForSelector(".success-message", { timeout: 500 })
  } catch {
    await page.waitForSelector(".error-message", { timeout: 500 })
  }
}

const correctOffenceExceptionByTypeahead = async function (field, newValue) {
  const { page } = this.browser

  await correctOffence(page, convertFieldToHtml(field), newValue)
}

const matchOffence = async function (sequenceNumber) {
  const { page } = this.browser
  const selector = "select.offence-matcher"

  await page.waitForSelector(selector)
  await page.select(selector, sequenceNumber)
}

const matchOffenceAndCcr = async function (sequenceNumber, ccr) {
  const { page } = this.browser
  const selector = "select.offence-matcher"

  await page.waitForSelector(`${selector} option[value]`)

  await page.select(selector, `${sequenceNumber}-${ccr}`)
}

const offenceAddedInCourt = async function () {
  await this.browser.page.select("select.offence-matcher", "0")
}

const selectTheFirstOption = async function () {
  const { page } = this.browser

  // API request happens too slow for puppeteer
  await delay(0.5)

  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("Enter")

  await page.waitForSelector(".success-message")
}

const returnToCaseListUnlock = async function () {
  const { page } = this.browser
  const pageTitle = await page.title()
  if (pageTitle.endsWith("Case List")) {
    return
  }
  await Promise.all([page.click("#leave-and-unlock, #return-to-case-list"), page.waitForNavigation()])
}

const waitForRecordStep = async function (record) {
  await reloadUntilContent(this.browser.page, record)
}

const checkNoteExists = async function (value) {
  const rows = await getTableData(this, ".notes-table tbody tr")
  if (!rows.some((row) => row.some((cell) => cell.toLowerCase().includes(value.toLowerCase())))) {
    throw new Error("Note does not exist")
  }
}

const legacyToNextButtonTextMappings = {
  "Mark Selected Complete": "Mark trigger(s) as complete",
  Refresh: "Case list"
}

const clickButton = async function (value) {
  let newValue = value
  if (legacyToNextButtonTextMappings[value]) {
    newValue = legacyToNextButtonTextMappings[value]
  }

  await this.browser.clickAndWait(`text=${newValue}`)
}

const switchBichard = async function () {
  const { page } = this.browser
  await Promise.all([page.click(".BichardSwitch"), page.waitForNavigation()])

  // if feedback page is shown
  const skip = await page.$("button[id='skip-feedback']")
  if (skip) {
    await Promise.all([skip.click(), page.waitForNavigation()])
  }
}

const viewOffence = async function (offenceId) {
  await this.browser.page.waitForSelector(`#offence-${offenceId}`)
  await this.browser.page.click(`#offence-${offenceId}`)
}

const viewOffenceByText = async function (text) {
  const [link] = await this.browser.page.$$(`xpath/.//a[contains(text(), "${text}")]`)
  await link.click()
}

const submitRecord = async function () {
  const { page } = this.browser

  await page.click("#exceptions-tab")
  await Promise.all([page.click("#submit"), page.waitForNavigation()])
  await Promise.all([page.click("#confirm-submit"), page.waitForNavigation()])
  await Promise.all([page.click("#return-to-case-list"), page.waitForNavigation()])
}

const submitRecordAndStayOnPage = async function () {
  const { page } = this.browser

  await page.click("#exceptions-tab")
  await Promise.all([page.click("#submit"), page.waitForNavigation()])
  await Promise.all([page.click("#confirm-submit"), page.waitForNavigation()])
}

const reloadUntilStringPresent = async function (value) {
  const result = await reloadUntilContent(this.browser.page, value)
  expect(result).toBeTruthy()
}

const reloadUntilStringNotPresent = async function (content) {
  const contentSansParentheses = content.replace(/[()]/g, "")
  const result = await reloadUntilNotContent(this.browser.page, contentSansParentheses.toUpperCase())
  expect(result).toBeTruthy()
}

// eslint-disable-next-line no-unused-vars
const checkOffenceDataError = async function (value, key) {
  const found = await reloadUntilContentInSelector(this.browser.page, value, "#exceptions")
  expect(found).toBeTruthy()
}

const checkRecordStatus = async function (recordType, recordName, resolvedType) {
  const { page } = this.browser

  await Promise.all([filterRecords(this, resolvedType, recordType), page.waitForNavigation()])
  expect(await this.browser.elementText("table.cases-list")).toMatch(recordName)

  await resetFilters(this.browser)

  await page.waitForFunction(() => !document.querySelector("#clear-filters"), { polling: "mutation" })
}

const checkRecordNotStatus = async function (recordType, _recordName, resolvedType) {
  const { page } = this.browser

  await Promise.all([filterRecords(this, resolvedType, recordType), page.waitForNavigation()])

  const noCasesMessageMatch = await page.$$('xpath/.//*[contains(text(), "There are no court cases to show")]')

  expect(noCasesMessageMatch.length).toEqual(1)
}

// eslint-disable-next-line no-unused-vars
const invalidFieldCanBeSubmitted = async function (_fieldName) {
  const { page } = this.browser

  await page.click("#exceptions-tab")

  const submitDisabled = await page.$eval("#submit", (submitButton) => submitButton.disabled)
  expect(submitDisabled).toBeFalsy()
}

const checkCorrectionFieldAndValue = async function (fieldName, value) {
  const { page } = this.browser
  const fieldNameId = `#${convertFieldToHtml(fieldName)}`

  const correctionValue = await page.$eval(fieldNameId, (field) => field.value)
  expect(correctionValue).toEqual(value)
}

const reload = async function () {
  const { page } = this.browser
  await page.reload()
}

const inputFieldToKeyboardPress = async function (field, keyboardButton) {
  const { page } = this.browser

  const inputField = `input#${convertFieldToHtml(field)}`

  await page.focus(inputField)

  await page.keyboard.press(keyboardButton)
}

const seeCorrectionBadge = async function () {
  const { page } = this.browser

  await page.$$('xpath/.//span[contains(@class, "moj-badge") and text() = "Correction"]')
}

const goToExceptionPage = async function (exception) {
  const { page } = this.browser

  const [link] = await page.$$(`xpath/.//table/tbody/tr[contains(.,"${exception}")]//a`)

  await Promise.all([link.click(), this.browser.page.waitForNavigation()])
}

const removeYear = async function (field) {
  const { page } = this.browser

  const inputField = `input#${convertFieldToHtml(field)}`

  await page.focus(inputField)

  await page.keyboard.press("Backspace")
}

const seeError = async function (errorMessage) {
  const { page } = this.browser

  await page.$$(`xpath/.//div[@class = "error-message"]//*[text() = "${errorMessage}"]`)
}

const filter = async function (fieldName, value) {
  const { page } = this.browser
  const fieldNameId = `#${fieldName}`

  await page.focus(fieldNameId)
  await page.keyboard.type(value, { delay: 100 })
}

module.exports = {
  checkNoPncErrors,
  findRecordFor,
  openRecordForCurrentTest,
  openRecordFor,
  reallocateCaseToForce,
  canSeeContentInTable,
  cannotSeeContentInTable,
  canSeeContentInTableForThis,
  cannotSeeTrigger,
  noExceptionPresentForOffender,
  loadTab,
  returnToOffenceList,
  checkTrigger,
  checkTriggerforOffence,
  checkCompleteTriggerforOffence,
  resolveAllTriggers,
  selectTriggerToResolve,
  resolveSelectedTriggers,
  checkRecordForThisTestResolved,
  checkRecordForThisTestNotResolved,
  checkOffenceData,
  checkOffenceDataError,
  checkNoExceptions,
  checkNoExceptionsForThis,
  checkNoRecords,
  checkNoRecordsForThis,
  checkOffence,
  matchOffence,
  matchOffenceAndCcr,
  offenceAddedInCourt,
  getTableData,
  goToExceptionList,
  noTriggersPresentForOffender,
  correctOffenceException,
  correctOffenceExceptionByTypeahead,
  selectTheFirstOption,
  manuallyResolveRecord,
  nRecordsInList,
  nRecordsForPerson,
  returnToCaseListUnlock,
  waitForRecordStep,
  noRecordsForPerson,
  checkNoteExists,
  clickButton,
  switchBichard,
  viewOffence,
  viewOffenceByText,
  submitRecord,
  reloadUntilStringPresent,
  reloadUntilStringNotPresent,
  checkRecordStatus,
  checkRecordNotStatus,
  invalidFieldCanBeSubmitted,
  checkCorrectionFieldAndValue,
  inputFieldToKeyboardPress,
  seeCorrectionBadge,
  submitRecordAndStayOnPage,
  goToExceptionPage,
  reload,
  removeYear,
  seeError,
  filter,
  clearFilters,
  exceptionResolutionStatus
}
