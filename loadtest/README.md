# Load Testing

We use the end-to-end tests to simulate real use of Bichard. By configuring the tests to be able to run in parallel and by running multiple "threads" in docker containers we can scale up the amount of traffic that we want to use for the laod tests.

This is a simple first pass at a tool to be able to orchestrate the running of parallel containers to run the load testing. You can configure what it should run by modifying `config.json` - if this is not present it will use `config.sample.json` which you can use as an example of how to configure it.

You can run the load tests with the command:

```shell
make loadtest
```
