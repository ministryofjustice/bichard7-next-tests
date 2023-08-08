const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { setWorldConstructor } = require("@cucumber/cucumber");
const { logInAs } = require("./utils/auth");
const { timeout } = require("../utils/config");
const { sendMessage, sendMessageForTest } = require("./utils/message");
const {
  createValidRecordInPNC,
  checkMocks,
  pncNotUpdated,
  pncUpdateIncludes,
  mockPNCDataForTest,
  noPncRequests,
  noPncUpdates
} = require("./old-utils/pnc");
const {
  generateTodaysReport,
  reportContains,
  accessReport,
  reportDoesNotContain,
  fakeTriggerReportData,
  fakeLiveStatusExceptionsReportData,
  checkUserSummaryReport,
  checkLiveStatusExceptionsReport,
  checkResolvedExceptionsReport
} = require("./old-utils/reports");
const {
  checkNoPncErrors,
  findRecordFor,
  openRecordForCurrentTest,
  openRecordFor,
  reallocateCaseToForce,
  canSeeContentInTable,
  cannotSeeTrigger,
  noExceptionPresentForOffender,
  loadTab,
  checkTrigger,
  resolveAllTriggers,
  checkOffenceData,
  checkOffenceDataError,
  checkTriggerforOffence,
  checkRecordForThisTestResolved,
  checkRecordForThisTestNotResolved,
  checkNoExceptions,
  checkNoRecords,
  checkOffence,
  checkCompleteTriggerforOffence,
  checkNoRecordsForThis,
  checkNoExceptionsForThis,
  checkNoteExists,
  clickButton,
  goToExceptionList,
  noTriggersPresentForOffender,
  correctOffenceException,
  nRecordsInList,
  nRecordsForPerson,
  returnToCaseListUnlock,
  waitForRecordStep,
  noRecordsForPerson,
  canSeeContentInTableForThis,
  switchBichard
} = require("./utils/ui");

const {
  findRecordFor: alternateFindRecordFor,
  loadTab: alternateLoadTab,
  checkOffenceData: alternateCheckOffenceData
} = require("./old-utils/ui");

const { checkAuditLogExists } = require("./utils/auditLogging");
const Bichard = require("./world");

setWorldConstructor(Bichard);

setDefaultTimeout(timeout);

Given("the data for this test is in the PNC", mockPNCDataForTest);

Given("there is a valid record for {string} in the PNC", createValidRecordInPNC);

Given("a message is received", async function () {
  await sendMessage.apply(this);
});

Given("I am logged in as {string}", logInAs);

When(
  "I wait {int} seconds",
  async (delay) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay * 1000);
    })
);

// TODO: remove this and refactor reliant tests when
// old test suite is removed
When(
  "I wait {string} seconds",
  async (delay) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay * 1000);
    })
);

When("message id {string} is received", async function (id) {
  await sendMessage.apply(this, [id]);
});

When("{string} is received", sendMessageForTest);

When("I view the list of exceptions", goToExceptionList);

When("I open this record", openRecordForCurrentTest);

When("I open the record for {string}", openRecordFor);

When("I access the {string} report", accessReport);

When("I click the {string} tab", loadTab);

When("I click the {string} button", clickButton);

When("I resolve all of the triggers", resolveAllTriggers);

When("I generate today's report", generateTodaysReport);

When("I correct {string} to {string}", correctOffenceException);

When("I wait for {string} in the list of records", waitForRecordStep);

When("I see {int} record for {string}", nRecordsForPerson);

// eslint-disable-next-line prefer-arrow-callback
When("I see {string} record for {string}", async function (count, name) {
  const n = Number.parseInt(count, 10);
  nRecordsForPerson.apply(this, [n, name]);
});

Then("the exception list should contain a record for {string}", findRecordFor);

Then("the record for {string} should not have any PNC errors", checkNoPncErrors);

Then("the PNC updates the record", checkMocks);

Then("I see exception {string} in the exception list table", canSeeContentInTable);

Then("I see exception {string} for this record in the exception list", canSeeContentInTableForThis);

Then("there are no exceptions raised for {string}", noExceptionPresentForOffender);

Then("there are no triggers raised for {string}", noTriggersPresentForOffender);

Then("I see trigger {string} in the exception list table", canSeeContentInTable);

Then("I see trigger {string} for this record in the exception list", canSeeContentInTableForThis);

Then("I cannot see trigger {string} in the exception list table", cannotSeeTrigger);

Then("I cannot see exception {string} in the exception list table", cannotSeeTrigger);

Then("the PNC record has not been updated", pncNotUpdated);

Then("I see trigger {string} for offence {string}", checkTriggerforOffence);

Then("I see complete trigger {string} for offence {string}", checkCompleteTriggerforOffence);

Then("I see trigger {string}", checkTrigger);

Then("this {string} is {string}", checkRecordForThisTestResolved);

Then("this {string} is not {string}", checkRecordForThisTestNotResolved);

Then("I see {string} in the {string} row of the results table", checkOffenceData);

Then("I see error {string} in the {string} row of the results table", checkOffenceDataError);

Then("there are no exceptions", checkNoExceptions);

Then("there are no exceptions for this record", checkNoExceptionsForThis);

Then("there are no exceptions or triggers", checkNoRecords);

Then("there are no exceptions or triggers for this record", checkNoRecordsForThis);

Then("I see {string} in the Warrants report", reportContains);

Then("I see {string} in the report", reportContains);

Then("I do not see {string} in the report", reportDoesNotContain);

Then("pending", () => "pending");

Then("the PNC update includes {string}", pncUpdateIncludes);

Then("I see {string} for offence {string}", checkOffence);

Then("the audit log contains {string}", async function (eventType) {
  await checkAuditLogExists(this, eventType, true);
});

Then("{string} is not in the audit log", async function (eventType) {
  await checkAuditLogExists(this, eventType, false);
});

When("I reallocate the case to {string}", reallocateCaseToForce);

When("I fake the data for the operational trigger report", fakeTriggerReportData);

When("I fake the data for the Live Status Detail - Exceptions report", fakeLiveStatusExceptionsReportData);

Then("the user performance summary report is correct", checkUserSummaryReport);

Then("the Live Status Detail - Exceptions report is correct", checkLiveStatusExceptionsReport);

Then("the Resolved Exceptions report is correct", checkResolvedExceptionsReport);

Then("no PNC requests have been made", noPncRequests);

Then("no PNC updates have been made", noPncUpdates);

Then("there should only be {string} records", nRecordsInList);

Then("I unlock the record and return to the list", returnToCaseListUnlock);

Then("the record for {string} does not exist", noRecordsForPerson);

Then("I see {string} in the table", checkNoteExists);

When("I switch to the alternate version of bichard", switchBichard);

When("I click the alternate {string} tab", alternateLoadTab);

Then("the alternate exception list should contain a record for {string}", alternateFindRecordFor);

Then("I see {string} in the {string} row of the alternate results table", alternateCheckOffenceData);
