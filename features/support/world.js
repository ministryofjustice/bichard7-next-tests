const { setWorldConstructor } = require("@cucumber/cucumber");
const DbHelper = require("./DbHelper");
const MqHelper = require("./MqHelper");
const BrowserHelper = require("./BrowserHelper");

class Bichard {
  constructor() {
    this.db = new DbHelper({
      host: "localhost",
      port: 5432,
      database: "bichard",
      user: "bichard",
      password: "password",
    });

    this.mq = new MqHelper({
      host: "localhost",
      port: 61613,
      login: "admin",
      passcode: "admin",
    });

    this.browser = new BrowserHelper({
      baseUrl: "http://localhost:9080",
      headless: true,
    });
  }
}

setWorldConstructor(Bichard);
