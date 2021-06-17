const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../../steps/auth");
const loadRelativeFeature = require("../../../utils/load-relative-feature");
const { clickMainTab, canSeeReports, accessReport, downloadCSV, checkFileDownloaded } = require("../../../steps/ui");

const feature = loadRelativeFeature("./092.feature");

defineFeature(feature, (test) => {
  test("Supervisors can download reports", ({ given, when, then, and }) => {
    given(/^I am logged in as a "(.*)"/, logInAs);
    and(/^I click the "(.*)" menu button/, clickMainTab);
    and(/^I navigate to the list of reports/, canSeeReports);
    when(/^I access the "(.*)" report/, accessReport);
    and(/^I click the "(.*)" button/, downloadCSV);
    then(/^the "(.*)" report will be downloaded as a CSV file/, checkFileDownloaded);
  });
});
