const { defineFeature } = require("jest-cucumber");
const { iAmLoggedInAsAMemberOfGroup } = require("../steps/auth");
const { aMessageIsReceived } = require("../steps/mq");
const { thereIsAValidPncRecordFor } = require("../steps/pnc");
const {
  iViewTheExceptionList,
  theExceptionListShouldContainARecordFor,
  theRecordShouldNotHaveAnyPncErrors
} = require("../steps/ui");
const loadRelativeFeature = require("../utils/load-relative-feature");

const feature = loadRelativeFeature("./basic-login.feature");

defineFeature(feature, (test) => {
  test("Raising an exception message", async ({ given, and, when, then }) => {
    aMessageIsReceived(given);
    thereIsAValidPncRecordFor(and);
    iAmLoggedInAsAMemberOfGroup(and);
    iViewTheExceptionList(when);
    theExceptionListShouldContainARecordFor(then);
    theRecordShouldNotHaveAnyPncErrors(and);
  });
});
