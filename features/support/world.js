const { setWorldConstructor } = require("@cucumber/cucumber");
const DbHelper = require("./DbHelper");
const MqHelper = require("./MqHelper");
const BrowserHelper = require("./BrowserHelper");

class Bichard {
  constructor() {
    this.db = new DbHelper({
      host: process.env["DB_HOST"] || "localhost",
      port: process.env["DB_PORT"] || 5432,
      database: "bichard",
      user: process.env["DB_USER"] || "bichard",
      password: process.env["DB_PASSWORD"] || "password",
    });

    this.mq = new MqHelper({
      host: process.env["MQ_HOST"] || "localhost",
      port: 61613,
      login: process.env["MQ_USER"] || "admin",
      passcode: process.env["MQ_PASSWORD"] || "admin",
    });

    const uiScheme = process.env["UI_SCHEME"] || "http";
    const uiHost = process.env["UI_HOST"] || "localhost";
    const uiPort = process.env["UI_PORT"] || "9080";
    this.browser = new BrowserHelper({
      baseUrl: `${uiScheme}://${uiHost}:${uiPort}`,
      headless: true,
    });
  }
}

setWorldConstructor(Bichard);
