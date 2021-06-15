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

## Debugging

To watch the tests running in a browser, run:

```
HEADLESS=false npm run test:local
```

This is useful when combined with

```javascript
await jestPuppeteer.debug();
```

which haults test execution and gives you access to Chrome DevTools.

##Environment Variables

- `WORKSPACE`: If set to `local-next`, it is assumed that tests are running on local environment. This will simulate processes that are not supported on local infrastructure. Running `npm run test:local` will set this variable to `local-next`.
- `STACK_TYPE`: It defines the stack type used for testing. Values can be `next` or `baseline`. The default value is `next`.
- `MESSAGE_ENTRY_POINT`: Determines whether messages should be uploaded to S3 or pushed to MQ. Values can be `s3` or `mq`. The default value is `mq`.

