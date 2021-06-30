const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { logInAs } = require("./auth");
const { sendMessage } = require("./message");
const { createValidRecordInPNC, checkMocks, pncNotUpdated, pncUpdateIncludes } = require("./pnc");
const {
  findRecordFor,
  goToExceptionList,
  checkNoPncErrors,
  openRecordFor,
  exceptionsAreVisible,
  triggersAreVisible,
  exceptionIsReadOnly,
  canSeeException,
  cannotSeeException,
  noExceptionPresentForOffender,
  noTriggersPresentForOffender,
  exceptionIsEditable,
  buttonIsNotVisible,
  reallocateCase,
  canSeeTrigger,
  buttonIsVisible,
  canSeeQAStatus,
  visitTeamPage,
  canSeeReports,
  editTeam,
  clickButton,
  clickMainTab,
  exceptionIsNotEditable,
  cannotReallocateCase,
  accessReport,
  downloadCSV,
  checkFileDownloaded,
  loadTab,
  checkTrigger,
  resolveAllTriggers,
  manuallyResolveRecord,
  viewOffence,
  checkOffenceData,
  checkTriggerforOffence,
  returnToList,
  checkRecordResolved,
  checkRecordNotResolved,
  checkRecordNotExists,
  correctOffenceException,
  submitRecord,
  reloadUntilStringPresent,
  checkNoExceptions
} = require("./ui");

setDefaultTimeout(60000);

Given("there is a valid record for {string} in the PNC", createValidRecordInPNC);

Given("a message is received", function () {
  sendMessage.apply(this);
});

Given("I am logged in as a(n) {string}", logInAs);

Given("I am logged in as a user with {string} permissions", logInAs);

Given("I navigate to the list of reports", canSeeReports);

When("message id {string} is received", function (id) {
  sendMessage.apply(this, [id]);
});

When("I view the list of exceptions", goToExceptionList);

When("I visit the Team Management screen", visitTeamPage);

When("I open the record for {string}", openRecordFor);

When("I click the {string} menu button", clickMainTab);

When("I click the {string} button", clickButton);

When("I submit the record", submitRecord);

When("I access the {string} report", accessReport);

When("I download the report", downloadCSV);

When("I click the {string} tab", loadTab);

When("I resolve all of the triggers", resolveAllTriggers);

When("I wait {string} seconds", async (delay) => {
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));
});

When("I view offence {string}", viewOffence);

When("I return to the list", returnToList);

When("I correct {string} to {string}", correctOffenceException);

Then("I reload until I see {string}", reloadUntilStringPresent);

Then("the exception list should contain a record for {string}", findRecordFor);

Then("the record for {string} should not have any PNC errors", checkNoPncErrors);

Then("the PNC updates the record", checkMocks);

Then("I can see exceptions", exceptionsAreVisible);

Then("I can see triggers", triggersAreVisible);

Then("I cannot make any changes", exceptionIsReadOnly);

Then("I see exception {string} in the exception list table", canSeeException);

Then("I cannot see {string} in the exception list table", cannotSeeException);

Then("there are no exceptions raised for {string}", noExceptionPresentForOffender);

Then("there are no triggers raised for {string}", noTriggersPresentForOffender);

Then("I can correct the exception", exceptionIsEditable);

Then("I cannot correct the exception", exceptionIsNotEditable);

Then("the {string} menu item is not visible", buttonIsNotVisible);

Then("I can reallocate the case to another force area", reallocateCase);

Then("I cannot reallocate the case to another force area", cannotReallocateCase);

Then("I see trigger {string} in the exception list table", canSeeTrigger);

Then("the {string} menu item is visible", buttonIsVisible);

Then("I can see the QA status of a record", canSeeQAStatus);

Then("I am taken to a list of reports", canSeeReports);

Then("I can add and remove members from my team", editTeam);

Then("the {string} report will be downloaded as a CSV file", checkFileDownloaded);

Then("the PNC record has not been updated", pncNotUpdated);

Then("I see trigger {string} for offence {string}", checkTriggerforOffence);

Then("I see trigger {string}", checkTrigger);

Then("the {string} for {string} is {string}", checkRecordResolved);

Then("the {string} for {string} is not {string}", checkRecordNotResolved);

Then("I manually resolve the record", manuallyResolveRecord);

Then("I see {string} in the {string} row of the results table", checkOffenceData);

Then("the record for {string} does not exist", checkRecordNotExists);

Then("there are no exceptions", checkNoExceptions);

Then("pending", () => "pending");

Then("the PNC update includes {string}", pncUpdateIncludes);
