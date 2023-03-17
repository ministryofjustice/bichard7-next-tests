# Bichard7 Tests

This repository contains the end-to-end tests to run against Bichard in order to validate functionality.

## Running tests

### Locally

Before running the tests locally, you need to make sure that the environment is up and running. Follow the instructions below to prepare the environment for testing:

- Bichard7 Next - [Quickstart instructions](https://github.com/ministryofjustice/bichard7-next#quickstart-next-stack)
- Bichard7 Next Audit Logging - [Quickstart instructions](https://github.com/ministryofjustice/bichard7-next-audit-logging#quickstart)

Once the stack is up and running, you can run the following commands to run the tests:

```
npm install
npm run test:local-next
```

If you get an error which looks like:
Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (856583)

then run node node_modules/puppeteer/install.js

## Configuration parameters

The most commonly used parameters are:

| Parameter                           | Description                                                                                                                                                                                                                                                                                  | Default                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| AUDIT_LOG_API_KEY                   | The API key for the audit log                                                                                                                                                                                                                                                                | xxx                                |
| AUDIT_LOG_API_URL                   | The URL for the audit log                                                                                                                                                                                                                                                                    | http://localhost:3010              |
| AUDIT_LOGGING_DYNAMODB_EVENTS_TABLE | The table name for audit logging events                                                                                                                                                                                                                                                      | audit-log                          |
| AUDIT_LOGGING_DYNAMODB_REGION       | The region to use for Dynamo audit log table                                                                                                                                                                                                                                                 | eu-west-2                          |
| AUDIT_LOGGING_DYNAMODB_TABLE        | The table name for audit logging                                                                                                                                                                                                                                                             | audit-log                          |
| AUTH_TYPE                           | How the tests authenticate against Bichard.<br>If set to `user-service` they will log in as normal.<br>If set to `bichard-jwt` they will set the JWT token and go directly to Bichard                                                                                                        | user-service                       |
| AWS_URL                             | The endpoint to use for the S3 buckets and the Dynamo connection                                                                                                                                                                                                                             |                                    |
| CLEAR_RECORDINGS                    | Whether to clear the screenshots of the tests                                                                                                                                                                                                                                                | false                              |
| DB_HOST                             | The host to use for the database connection                                                                                                                                                                                                                                                  | localhost                          |
| DB_PASSWORD                         | The password to use for the database connection                                                                                                                                                                                                                                              | password                           |
| DB_PORT                             | The port to use for the database connection                                                                                                                                                                                                                                                  | 5432                               |
| DB_SSL                              | Whether to use SSL for the database connection                                                                                                                                                                                                                                               | false                              |
| DB_USER                             | The user name to use for the database connection                                                                                                                                                                                                                                             | bichard                            |
| HEADLESS                            | Whether to run puppeteer in headless mode                                                                                                                                                                                                                                                    | true                               |
| MESSAGE_ENTRY_POINT                 | If set to `activemq` it will send directly to the Bichard message queue.<br>If set to `s3` it will write to the incoming messages buket and go through the incoming message handler step function <br>If set to `s3phase1` it will write the the phase 1 bucket to be picked up by Conductor | activemq                           |
| MQ_PASSWORD                         | The password to use for the ActiveMQ connection                                                                                                                                                                                                                                              | failover:(stomp://localhost:61613) |
| MQ_URL                              | The URL to use for the ActiveMQ connection                                                                                                                                                                                                                                                   | failover:(stomp://localhost:61613) |
| MQ_USER                             | The user name to use for the ActiveMQ connection                                                                                                                                                                                                                                             | failover:(stomp://localhost:61613) |
| PNC_HOST                            | The host name of the PNC emulator                                                                                                                                                                                                                                                            | localhost                          |
| PNC_PORT                            | The port of the PNC emulator                                                                                                                                                                                                                                                                 | 3000                               |
| RECORD                              | Whether to record the UI operations as screenshots in the `screenshots` folder                                                                                                                                                                                                               | false                              |
| S3_INCOMING_MESSAGE_BUCKET          | The bucket to use to write to the incoming message handler                                                                                                                                                                                                                                   | incoming-messages                  |
| S3_PHASE_1_BUCKET                   | The bucket to use to write to phase 1 Conductor                                                                                                                                                                                                                                              | phase1                             |
| S3_REGION                           | The region to use for S3                                                                                                                                                                                                                                                                     | eu-west-2                          |
| TEST_TIMEOUT                        | How long the tests should wait before failing                                                                                                                                                                                                                                                | 30 (seconds)                       |
| TOKEN_SECRET                        | The secret to use for the JWT token                                                                                                                                                                                                                                                          | OliverTwist                        |
| UI_HOST                             | Which host to use to access the UI.                                                                                                                                                                                                                                                          | localhost                          |
| UI_PORT                             | Which port to use to access the UI.                                                                                                                                                                                                                                                          | 4443                               |
| UI_SCHEME                           | Which scheme to use to access the UI.                                                                                                                                                                                                                                                        | https                              |

There are other, lesser used parameters:

| Parameter               | Description                                                                              | Default |
| ----------------------- | ---------------------------------------------------------------------------------------- | ------- |
| NO_UI                   | Performs checks directly against the database iinstead of using the UI                   | false   |
| PNC_TEST_TOOL           | The URL for the PNC test tool on pre-prod                                                |         |
| REAL_PNC                | Used to indicate that the tests are running against a real PNC instead of the emulator   | false   |
| RECORD_COMPARISONS      | Whether to save the comparison files for the test                                        | false   |
| RUN_PARALLEL            | Whether the tests are running in parallel (experimental)                                 | false   |
| SKIP_PNC_VALIDATION     | Whether the tests should validate their operations against the PNC test tool (see below) | false   |
| UPDATE_PNC_EXPECTATIONS | Whether to update the before and after files with the PNC contents                       | false   |

## Debugging

To watch the tests running in a browser, run:

```
HEADLESS=false npm run test:local
```

If you want to take screenshots of the browser as the tests run, you can add `RECORD=true` as an environment variable. The screenshots go in a unique folder within the `screenshots` directory. If your tests fail it will print out which folder the screenshots for that specific test are in.

### Running the tests remotely (on the actual e2e environment)

Connect to the e2e vpn

Then run the codebuild job `apply-dev-sgs-to-e2e-test` in `bichard7-shared`, then run your tests and remember to run `remove-dev-sgs-from-e2e-test` when you are finished.

## Environment Variables

- `WORKSPACE`: If set to `local-next`, it is assumed that tests are running on local environment. This will simulate processes that are not supported on local infrastructure. Running `npm run test:local` will set this variable to `local-next`.
- `MESSAGE_ENTRY_POINT`: Determines whether messages should be uploaded to S3 or pushed to MQ. Values can be `s3` or `mq`. The default value is `mq`.

## Running tests against Pre-Production

The PNC Test Tool is a legacy tool that is running unreliably in an EC2 instance. You can find it via the AWS Console as it's the only EC2 instance running. At the time of writing its IP address is `10.129.3.16`. You can access the UI via the [Test Tool UI](https://10.129.3.16/)

You will need to restart the OpenUTM service that runs it. To do this, SSH into the instance using the `ansible` user. The password is in SSM: `/cjse-preprod-bichard-7/pnc_tool/ssh_password`. To restart the OpenUTM service:

```
# Sudo to the utm user
sudo su utm
# cd into the UTM project directory
cd /home/utm/SpsTtUtm
# stop the service
./p/shut
# start the service
./p/start
```

Once you have started the UTM service, you can check it's working by visiting the [Test Tool UI](https://10.129.3.16/), selecting `PNC NASCH Enquiry` and then searching for e.g. `John Smith` - you should see results being returned. If not, try to telnet to the PNC Test endpoint via SSH:

```
telnet test-pnc.cjse.org 102
```

It should connect and after you press `Enter` 10 times should disconnect you.

If the Test Tool looks healthy then you can run a test using it as follows (068 is a good test because it doesn't change anything on the PNC so can be run repeatedly)

```
PNC_TEST_TOOL=https://10.129.3.16 REAL_PNC=true npm run test:file features/068*
```
