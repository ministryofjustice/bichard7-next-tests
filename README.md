# Bichard7 Tests

This repository contains the end-to-end tests to run against Bichard in order to validate functionality.

## Running tests

### Locally

Before running the tests locally, you need to make sure that the environment is up and running. Follow the instructions below to prepare the environment for testing:

- Bichard7 vNext - [Quickstart instructions](https://github.com/ministryofjustice/bichard7-next#quickstart-next-stack)
- Bichard7 vNext Audit Logging - [Quickstart instructions](https://github.com/ministryofjustice/bichard7-next-audit-logging#quickstart)

Once the stack is up and running, you can run the following commands to run the tests:

```
npm install
npm run test:local-next
```

If you get an error which looks like:
Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (856583)

then run node node_modules/puppeteer/install.js

## Debugging

To watch the tests running in a browser, run:

```
HEADLESS=false npm run test:local
```

If you want to take screenshots of the browser as the tests run, you can add `RECORD=true` as an environment variable. The screenshots go in a unique folder within the `screenshots` directory. If your tests fail it will print out which folder the screenshots for that specific test are in.

##Environment Variables

- `WORKSPACE`: If set to `local-next`, it is assumed that tests are running on local environment. This will simulate processes that are not supported on local infrastructure. Running `npm run test:local` will set this variable to `local-next`.
- `STACK_TYPE`: It defines the stack type used for testing. Values can be `next` or `baseline`. The default value is `next`.
- `MESSAGE_ENTRY_POINT`: Determines whether messages should be uploaded to S3 or pushed to MQ. Values can be `s3` or `mq`. The default value is `mq`.

## Adding new QSolution test

Follow these steps to create a new test from the known set of QSolution tests.

1. Find and claim the next test from [QSOL Bichard7 Test Data Sheet and Descriptions](https://docs.google.com/spreadsheets/d/1ThVvlCH4jqHB5d5dIJFal7jxRGIpMHbD/edit#gid=434542605). Make note of the test number (usually found in curly braces in the **Test Procedure Description** column).
2. Find the corresponding test steps in the relevant document in [this](https://drive.google.com/drive/u/1/folders/1muysADohx3LG64hAuNzuk4aKpTN33TrA) Google Drive folder. The document relates to the priority of the test as defined in the Google Sheet (Must, Should, Could).
3. Create a new branch in this repository to make the changes.
4. Copy the feature file from `q-solution-import/features/{test-number}.feature` to `features/q-solution/{test-number}-{description}.feature` where `{test-number}` is the number of the test you have claimed. This is where you will add all the Given/When/Then test steps.
5. Copy the message input file from `q-solution-import/messages/{test-number}-*.xml` to `fixtures/messages/q-solution/{test-number}.xml`.
6. Clone one of the PNC Mock files from `fixtures/pncMocks/` and rename to `q-solution_test_{test-numbner}.js`.
