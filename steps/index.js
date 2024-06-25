require("./hooks");

const { NEXTUI } = process.env;
if (NEXTUI === "true") {
  require("./next-ui");
} else {
  require("./legacy-ui");
}
