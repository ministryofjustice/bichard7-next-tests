const { NEXTUI } = process.env;
if (NEXTUI && NEXTUI === "true") {
  require("../step-definitions/nextui.steps");
} else {
  require("../step-definitions/old-cucumber-js.steps");
}
