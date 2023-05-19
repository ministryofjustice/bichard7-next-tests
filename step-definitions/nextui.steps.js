const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { setWorldConstructor } = require("@cucumber/cucumber");
const { logInAs } = require("./old-utils/auth");
const { timeout } = require("../utils/config");
const { sendMessage, sendMessageForTest } = require("./old-utils/message");
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
  goToExceptionList
} = require("./utils/ui");

const { checkEventByAuditMessageNumber } = require("./old-utils/auditLogging");
const Bichard = require("./old-utils/world");

setWorldConstructor(Bichard);

setDefaultTimeout(timeout);

Given("the data for this test is in the PNC", mockPNCDataForTest);

Given("there is a valid record for {string} in the PNC", createValidRecordInPNC);

Given("a message is received", async function () {
  await sendMessage.apply(this);
});

Given("I am logged in as {string}", logInAs);

When("message id {string} is received", async function (id) {
  await sendMessage.apply(this, [id]);
});

When("{string} is received", sendMessageForTest);

When("I view the list of exceptions", goToExceptionList);

When("I open this record", openRecordForCurrentTest);

When("I open the record for {string}", openRecordFor);

When("I access the {string} report", accessReport);

When("I click the {string} tab", loadTab);

When("I resolve all of the triggers", resolveAllTriggers);

When("I generate today's report", generateTodaysReport);

Then("the exception list should contain a record for {string}", findRecordFor);

Then("the record for {string} should not have any PNC errors", checkNoPncErrors);

Then("the PNC updates the record", checkMocks);

Then("I see exception {string} in the exception list table", canSeeContentInTable);

Then("there are no exceptions raised for {string}", noExceptionPresentForOffender);

Then("I see trigger {string} in the exception list table", canSeeContentInTable);

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
  await checkEventByAuditMessageNumber(this, 1, eventType, true);
});

Then("the audit log for message {string} contains {string}", async function (auditMessageNumber, eventType) {
  await checkEventByAuditMessageNumber(this, auditMessageNumber, eventType, true);
});

Then("{string} is not in the audit log", async function (eventType) {
  await checkEventByAuditMessageNumber(this, 1, eventType, false);
});

When("I reallocate the case to {string}", reallocateCaseToForce);

When("I fake the data for the operational trigger report", fakeTriggerReportData);

When("I fake the data for the Live Status Detail - Exceptions report", fakeLiveStatusExceptionsReportData);

Then("the user performance summary report is correct", checkUserSummaryReport);

Then("the Live Status Detail - Exceptions report is correct", checkLiveStatusExceptionsReport);

Then("the Resolved Exceptions report is correct", checkResolvedExceptionsReport);

Then("no PNC requests have been made", noPncRequests);

Then("no PNC updates have been made", noPncUpdates);