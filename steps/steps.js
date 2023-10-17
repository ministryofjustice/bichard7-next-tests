if (process.env.NEXTUI) {
  require("../step-definitions/nextui.steps");
} else {
  require("../step-definitions/old-cucumber-js.steps");
}
