if (process.env.nextUI) {
  require("../step-definitions/cucumber-js.steps");
} else {
  require("../step-definitions/old-cucumber-js.steps");
}
