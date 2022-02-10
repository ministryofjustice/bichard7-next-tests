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

### Running the tests remotely (on the actual e2e environment)

Connect to the e2e vpn

Then run the codebuild job `apply-dev-sgs-to-e2e-test` in `bichard7-shared`, then run your tests and remember to run `remove-dev-sgs-from-e2e-test` when you are finished.

## Environment Variables

- `WORKSPACE`: If set to `local-next`, it is assumed that tests are running on local environment. This will simulate processes that are not supported on local infrastructure. Running `npm run test:local` will set this variable to `local-next`.
- `STACK_TYPE`: It defines the stack type used for testing. Values can be `next` or `baseline`. The default value is `next`.
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
