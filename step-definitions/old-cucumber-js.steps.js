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
  findRecordFor,
  goToExceptionList,
  checkNoPncErrors,
  openRecordForCurrentTest,
  openRecordFor,
  exceptionsAreVisible,
  triggersAreVisible,
  exceptionIsReadOnly,
  canSeeContentInTable,
  cannotSeeException,
  noExceptionPresentForOffender,
  noTriggersPresentForOffender,
  exceptionIsEditable,
  buttonIsNotVisible,
  reallocateCase,
  buttonIsVisible,
  canSeeQAStatus,
  visitTeamPage,
  canSeeReports,
  editTeam,
  clickButton,
  clickMainTab,
  exceptionIsNotEditable,
  cannotReallocateCase,
  downloadCSV,
  checkFileDownloaded,
  loadTab,
  checkTrigger,
  resolveAllTriggers,
  resolveSelectedTriggers,
  manuallyResolveRecord,
  viewOffence,
  checkOffenceData,
  checkOffenceDataError,
  checkTriggerforOffence,
  returnToList,
  checkRecordResolved,
  checkRecordForThisTestResolved,
  checkRecordNotResolved,
  checkRecordForThisTestNotResolved,
  checkRecordNotExists,
  correctOffenceException,
  correctOffenceFreeTextException,
  submitRecord,
  reloadUntilStringPresent,
  checkNoExceptions,
  waitForRecordStep,
  cannotSeeTrigger,
  reloadUntilStringNotPresent,
  checkNoRecords,
  checkOffence,
  checkTableRows,
  reallocateCaseToForce,
  checkNoteExists,
  selectTrigger,
  checkCompleteTriggerforOffence,
  checkRecordRows,
  recordsForPerson,
  checkNoRecordsForThis,
  checkNoExceptionsForThis,
  canSeeContentInTableForThis,
  switchBichard,
  cannotSeeBichardSwitcher
} = require("./old-utils/ui");

const {
  findRecordFor: alternateFindRecordFor,
  loadTab: alternateLoadTab,
  checkOffenceData: alternateCheckOffenceData
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

Given("I navigate to the list of reports", canSeeReports);

When("message id {string} is received", async function (id) {
  await sendMessage.apply(this, [id]);
});

When("{string} is received", sendMessageForTest);

When("I view the list of exceptions", goToExceptionList);

When("I visit the Team Management screen", visitTeamPage);

When("I open this record", openRecordForCurrentTest);

When("I open the record for {string}", openRecordFor);

When("I click the {string} menu button", clickMainTab);

When("I click the {string} button", clickButton);

When("I submit the record", submitRecord);

When("I access the {string} report", accessReport);

When("I download the report", downloadCSV);

When("I click the {string} tab", loadTab);

When("I resolve all of the triggers", resolveAllTriggers);

When("I resolve the selected triggers", resolveSelectedTriggers);

When("I wait {string} seconds", async (delay) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
});

When("I view offence {string}", viewOffence);

When("I return to the list", returnToList);

When("I correct {string} to {string}", correctOffenceException);

When("I prepend {string} with {string}", correctOffenceFreeTextException);

When("I wait for {string} in the list of records", waitForRecordStep);

When("I generate today's report", generateTodaysReport);

Then("I reload until I see {string}", reloadUntilStringPresent);

Then("I reload until I don't see {string}", reloadUntilStringNotPresent);

Then("the exception list should contain a record for {string}", findRecordFor);

Then("the record for {string} should not have any PNC errors", checkNoPncErrors);

Then("the PNC updates the record", checkMocks);

Then("I can see exceptions", exceptionsAreVisible);

Then("I can see triggers", triggersAreVisible);

Then("I cannot make any changes", exceptionIsReadOnly);

Then("I see exception {string} in the exception list table", canSeeContentInTable);

Then("I see exception {string} for this record in the exception list", canSeeContentInTableForThis);

Then("I cannot see {string} in the exception list table", cannotSeeException);

Then("there are no exceptions raised for {string}", noExceptionPresentForOffender);

Then("I see {string} record for {string}", recordsForPerson);

Then("there are no triggers raised for {string}", noTriggersPresentForOffender);

Then("I can correct the exception", exceptionIsEditable);

Then("I cannot correct the exception", exceptionIsNotEditable);

Then("the {string} menu item is not visible", buttonIsNotVisible);

Then("I can reallocate the case to another force area", reallocateCase);

Then("I cannot reallocate the case to another force area", cannotReallocateCase);

Then("I see trigger {string} in the exception list table", canSeeContentInTable);

Then("I see trigger {string} for this record in the exception list", canSeeContentInTableForThis);

Then("I cannot see trigger {string} in the exception list table", cannotSeeTrigger);

Then("I cannot see exception {string} in the exception list table", cannotSeeTrigger);

Then("the {string} menu item is visible", buttonIsVisible);

Then("I can see the QA status of a record", canSeeQAStatus);

Then("I am taken to a list of reports", canSeeReports);

Then("I can add and remove members from my team", editTeam);

Then("the {string} report will be downloaded as a CSV file", checkFileDownloaded);

Then("the PNC record has not been updated", pncNotUpdated);

Then("I see trigger {string} for offence {string}", checkTriggerforOffence);

Then("I see complete trigger {string} for offence {string}", checkCompleteTriggerforOffence);

Then("I see trigger {string}", checkTrigger);

Then("the {string} for {string} is {string}", checkRecordResolved);

Then("this {string} is {string}", checkRecordForThisTestResolved);

Then("the {string} for {string} is not {string}", checkRecordNotResolved);

Then("this {string} is not {string}", checkRecordForThisTestNotResolved);

Then("I manually resolve the record", manuallyResolveRecord);

Then("I see {string} in the {string} row of the results table", checkOffenceData);

Then("I see {string} in the table", checkNoteExists);

Then("I see error {string} in the {string} row of the results table", checkOffenceDataError);

Then("the record for {string} does not exist", checkRecordNotExists);

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

Then("there should only be {string} offences", checkTableRows);

Then("there should only be {string} records", checkRecordRows);

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

When("I select trigger {string} to resolve", selectTrigger);

When("I fake the data for the operational trigger report", fakeTriggerReportData);

When("I fake the data for the Live Status Detail - Exceptions report", fakeLiveStatusExceptionsReportData);

Then("the user performance summary report is correct", checkUserSummaryReport);

Then("the Live Status Detail - Exceptions report is correct", checkLiveStatusExceptionsReport);

Then("the Resolved Exceptions report is correct", checkResolvedExceptionsReport);

Then("no PNC requests have been made", noPncRequests);

Then("no PNC updates have been made", noPncUpdates);

When("I switch to the alternate version of bichard", switchBichard);

When("I click the alternate {string} tab", alternateLoadTab);

Then("I should not see a button to switch to the alternate version of bichard", cannotSeeBichardSwitcher);

Then("I see {string} in the {string} row of the alternate results table", alternateCheckOffenceData);

Then("the alternate exception list should contain a record for {string}", alternateFindRecordFor);
