const path = require("path");
const { exit } = require("process");
const { sendMessageForTest } = require("../utils/message");
const Bichard = require("../utils/world");
const { mockPNCDataForTest } = require("../utils/pnc");

const world = new Bichard({});
let sentMessages = 0;

if (process.argv.length < 4) {
  console.log("Usage: msg-load-test.js <duration in seconds> <message interval in ms>");
  exit();
}
const duration = Number(process.argv[2] || "120");
const interval = Number(process.argv[3] || "2000");

console.log(`Sending messages every ${interval}ms for ${duration}s`);

world.featureUri = path.resolve(__dirname, "../features/001-sexual-offences/test.feature");
world.pnc.clearMocks();
mockPNCDataForTest.call(world);

const sendMessage = () => {
  sendMessageForTest
    .call(world, "input-message")
    .then(() => {
      console.log("Message sent");
      sentMessages += 1;
    })
    .catch(() => {
      console.log("Error sending message");
    });
};

const sender = setInterval(sendMessage, interval);

setTimeout(() => {
  console.log(`Message sending complete - ${sentMessages} messages sent`);
  clearInterval(sender);
}, duration * 1000);
