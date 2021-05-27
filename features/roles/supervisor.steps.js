const { defineFeature } = require("jest-cucumber");
const { logInAs } = require("../../steps/auth");
const Bichard = require("../../utils/helpers");
const loadRelativeFeature = require("../../utils/load-relative-feature");
const { sendMessage } = require("../../steps/message");
const { createValidRecordInPNC } = require("../../steps/pnc");
const { clickMainTab, canSeeReports, canSeeQAStatus, visitTeamPage, editTeam } = require("../../steps/ui");

const feature = loadRelativeFeature("./supervisor.feature");

defineFeature(feature, (test) => {
  test("Supervisors can run reports", ({ given, when, then }) => {
    given(/^I am logged in as a "(.*)"/, logInAs);
    when(/^I click the "(.*)" menu button/, clickMainTab);
    then(/^I am taken to a list of reports/, canSeeReports);
  });

  test("Supervisors can see QA status of records", ({ given, when, then, and }) => {
    const context = new Bichard();

    given(/^a message is received/, () => sendMessage(context));
    and(/^there is a valid record for "(.*)" in the PNC$/, (recordId) => createValidRecordInPNC(context, recordId));
    when(/^I log in as a "(.*)"/, logInAs);
    then(/^I can see the QA status of a record/, canSeeQAStatus);
  });

  test("Supervisors can manage their team", ({ given, when, then }) => {
    given(/^I am logged in as a "(.*)"/, logInAs);
    when(/^I visit the Team Management screen/, visitTeamPage);
    then(/^I can add and remove members from my team/, editTeam);
  });
});
