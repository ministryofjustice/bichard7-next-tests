const { NEXTUI } = process.env;
if (NEXTUI === "true") {
  require("./steps.next-ui");
} else {
  require("./steps.legacy-ui");
}
