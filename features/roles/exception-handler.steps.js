const { defineFeature } = require("jest-cucumber");
const { iAmLoggedInAsAMemberOfGroup } = require("../../steps/auth");
const { aMessageIsReceived } = require("../../steps/mq");
const { thereIsAValidPncRecordFor } = require("../../steps/pnc");
const {
  iCannotSeeASpecificExceptionCode,
  iViewTheExceptionList,
  iSeeASpecificExceptionCode,
  iOpenTheRecordFor,
  iCanCorrectTheException,
  aSpecificMenuItemIsNotVisible
} = require("../../steps/ui");
const loadRelativeFeature = require("../../utils/load-relative-feature");

const feature = loadRelativeFeature("./exception-handler.feature");

defineFeature(feature, (test) => {
  test("Exception handler can see exceptions", ({ given, and, when, then }) => {
    aMessageIsReceived(given);
    thereIsAValidPncRecordFor(and);
    iAmLoggedInAsAMemberOfGroup(and);
    iViewTheExceptionList(when);
    iSeeASpecificExceptionCode(then);
    iCannotSeeASpecificExceptionCode(and);
  });

  test("Exception handlers can handle exceptions", ({ given, and, when, then }) => {
    aMessageIsReceived(given);
    thereIsAValidPncRecordFor(and);
    iAmLoggedInAsAMemberOfGroup(and);
    iViewTheExceptionList(when);
    iOpenTheRecordFor(and);
    iCanCorrectTheException(then);
  });

  test("Exception handlers cannot see triggers", ({ given, and, when, then }) => {
    aMessageIsReceived(given);
    thereIsAValidPncRecordFor(and);
    iAmLoggedInAsAMemberOfGroup(and);
    iViewTheExceptionList(when);
    iOpenTheRecordFor(and);
    aSpecificMenuItemIsNotVisible(then);
  });
});
