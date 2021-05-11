# Bichard7 Tests

This repository contains the end-to-end tests to run against Bichard in order to validate functionality.

# Running tests

## In Docker

Follow the [Quickstart instructions](https://github.com/ministryofjustice/bichard7-next#quickstart-next-stack) in the [ministryofjustice/bichard7-next](https://github.com/ministryofjustice/bichard7-next) repo.

## Locally

With the Bichard7 next stack running:

```
npm install
npm test
```

## Debugging

To watch the tests running in a browser, run:

```
HEADLESS=false npm test
```

This is useful when combined with

```javascript
await jestPuppeteer.debug();
```

which haults test execution and gives you access to Chrome DevTools.
