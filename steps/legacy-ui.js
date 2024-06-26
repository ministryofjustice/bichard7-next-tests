const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { setWorldConstructor } = require("@cucumber/cucumber");
const { logInAs } = require("../utils/auth");
const { timeout } = require("../utils/config");
const { sendMessageForTest } = require("../utils/message");
const {
  createValidRecordInPNC,
  checkMocks,
  pncNotUpdated,
  pncUpdateIncludes,
  mockPNCDataForTest,
  noPncRequests,
  noPncUpdates,
  mockMissingPncDataForTest
} = require("../utils/pnc");
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
} = require("../utils/reports");
const ui = require("../utils/actions.legacy-ui");

const {
  findRecordFor: alternateFindRecordFor,
  loadTab: alternateLoadTab,
  checkOffenceData: alternateCheckOffenceData
} = require("../utils/actions.next-ui");

const { checkAuditLogExists } = require("../utils/auditLogging");
const Bichard = require("../utils/world");

setWorldConstructor(Bichard);

setDefaultTimeout(timeout);

Given("the data for this test is in the PNC", mockPNCDataForTest);
Given("the data for this test is not in the PNC", mockMissingPncDataForTest);
Given("there is a valid record for {string} in the PNC", createValidRecordInPNC);
Given("I am logged in as {string}", logInAs);
Given("I navigate to the list of reports", ui.canSeeReports);

When("{string} is received", sendMessageForTest);
When("I view the list of exceptions", ui.goToExceptionList);
When("I visit the Team Management screen", ui.visitTeamPage);
When("I open this record", ui.openRecordForCurrentTest);
When("I open the record for {string}", ui.openRecordFor);
When("I click the {string} menu button", ui.clickMainTab);
When("I click the {string} button", ui.clickButton);
When("I return to the list", ui.returnToList);
When("I submit the record", ui.submitRecord);
When("I access the {string} report", accessReport);
When("I download the report", ui.downloadCSV);
When("I click the {string} tab", ui.loadTab);
When("I return to the offence list", async function () {
  await ui.loadTab.apply(this, ["Offences"]);
});
When("I resolve all of the triggers", ui.resolveAllTriggers);
When("I resolve the selected triggers", ui.resolveSelectedTriggers);
When("I wait {string} seconds", async (delay) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
});
When("I view offence {string}", ui.viewOffence);
When("I unlock the record and return to the list", ui.returnToCaseListUnlock);
When("I correct {string} to {string}", ui.correctOffenceException);
When("I match the offence to PNC offence {string}", ui.matchOffence);
When("I match the offence to PNC offence {string} in case {string}", ui.matchOffenceAndCcr);
When("I match the offence as Added In Court", () => {});
When("I prepend {string} with {string}", ui.correctOffenceFreeTextException);
When("I wait for {string} in the list of records", ui.waitForRecordStep);
When("I generate today's report", generateTodaysReport);
When("I reallocate the case to {string}", ui.reallocateCaseToForce);
When("I select trigger {string} to resolve", ui.selectTrigger);
When("I fake the data for the operational trigger report", fakeTriggerReportData);
When("I fake the data for the Live Status Detail - Exceptions report", fakeLiveStatusExceptionsReportData);
When("I switch to the alternate version of bichard", ui.switchBichard);
When("I click the alternate {string} tab", alternateLoadTab);

Then("I reload until I see {string}", ui.reloadUntilStringPresent);
Then("I reload until I see {string} for this record", ui.reloadUntilStringPresentForRecord);
Then("I reload until I don't see {string}", ui.reloadUntilStringNotPresent);
Then("the exception list should contain a record for {string}", ui.findRecordFor);
Then("the record for {string} should not have any PNC errors", ui.checkNoPncErrors);
Then("the PNC updates the record", checkMocks);
Then("I can see exceptions", ui.exceptionsAreVisible);
Then("I can see triggers", ui.triggersAreVisible);
Then("I cannot make any changes", ui.exceptionIsReadOnly);
Then("I see exception {string} in the exception list table", ui.canSeeContentInTable);
Then("I see exception {string} for this record in the exception list", ui.canSeeContentInTableForThis);
Then("I cannot see {string} in the exception list table", ui.cannotSeeException);
Then("there are no exceptions raised for {string}", ui.noExceptionPresentForOffender);
Then("I see {string} record for {string}", ui.recordsForPerson);
Then("there are no triggers raised for {string}", ui.noTriggersPresentForOffender);
Then("I can correct the exception", ui.exceptionIsEditable);
Then("I cannot correct the exception", ui.exceptionIsNotEditable);
Then("the {string} menu item is not visible", ui.buttonIsNotVisible);
Then("I can reallocate the case to another force area", ui.reallocateCase);
Then("I cannot reallocate the case to another force area", ui.cannotReallocateCase);
Then("I see trigger {string} in the exception list table", ui.canSeeContentInTable);
Then("I see trigger {string} for this record in the exception list", ui.canSeeContentInTableForThis);
Then("I cannot see trigger {string} in the exception list table", ui.cannotSeeTrigger);
Then("I cannot see exception {string} in the exception list table", ui.cannotSeeTrigger);
Then("the {string} menu item is visible", ui.buttonIsVisible);
Then("I can see the QA status of a record", ui.canSeeQAStatus);
Then("I am taken to a list of reports", ui.canSeeReports);
Then("I can add and remove members from my team", ui.editTeam);
Then("the {string} report will be downloaded as a CSV file", ui.checkFileDownloaded);
Then("the PNC record has not been updated", pncNotUpdated);
Then("I see trigger {string} for offence {string}", ui.checkTriggerforOffence);
Then("I see complete trigger {string} for offence {string}", ui.checkCompleteTriggerforOffence);
Then("I see trigger {string}", ui.checkTrigger);
Then("the {string} for {string} is {string}", ui.checkRecordResolved);
Then("this {string} is {string}", ui.checkRecordForThisTestResolved);
Then("the {string} for {string} is not {string}", ui.checkRecordNotResolved);
Then("this {string} is not {string}", ui.checkRecordForThisTestNotResolved);
Then("I manually resolve the record", ui.manuallyResolveRecord);
Then("I see {string} in the {string} row of the results table", ui.checkOffenceData);
Then("I see {string} in the table", ui.checkNoteExists);
Then("I see error {string} in the {string} row of the results table", ui.checkOffenceDataError);
Then("the record for {string} does not exist", ui.checkRecordNotExists);
Then("there are no exceptions", ui.checkNoExceptions);
Then("there are no exceptions for this record", ui.checkNoExceptionsForThis);
Then("there are no exceptions or triggers", ui.checkNoRecords);
Then("there are no exceptions or triggers for this record", ui.checkNoRecordsForThis);
Then("I see {string} in the Warrants report", reportContains);
Then("I see {string} in the report", reportContains);
Then("I do not see {string} in the report", reportDoesNotContain);
Then("pending", () => "pending");
Then("the PNC update includes {string}", pncUpdateIncludes);
Then("I see {string} for offence {string}", ui.checkOffence);
Then("there should only be {string} offences", ui.checkTableRows);
Then("there should only be {string} records", ui.checkRecordRows);
Then("the audit log contains {string}", async function (eventType) {
  await checkAuditLogExists(this, eventType, true);
});
Then("{string} is not in the audit log", async function (eventType) {
  await checkAuditLogExists(this, eventType, false);
});
Then("the user performance summary report is correct", checkUserSummaryReport);
Then("the Live Status Detail - Exceptions report is correct", checkLiveStatusExceptionsReport);
Then("the Resolved Exceptions report is correct", checkResolvedExceptionsReport);
Then("no PNC requests have been made", noPncRequests);
Then("no PNC updates have been made", noPncUpdates);
Then("I should not see a button to switch to the alternate version of bichard", ui.cannotSeeBichardSwitcher);
Then("I see {string} in the {string} row of the alternate results table", alternateCheckOffenceData);
Then("the alternate exception list should contain a record for {string}", alternateFindRecordFor);
Then("I save a record", ui.saveChanges);
Then("I see the correction for {string} to {string}", ui.checkCorrectionFieldAndValue);
