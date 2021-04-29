const Bichard = require("../utils/helpers");

const sendMessage = async (messageId) => {
  const helpers = new Bichard();
  await helpers.mq.sendMessage("COURT_RESULT_INPUT_QUEUE", messageId);
};

const aMessageIsReceived = (step) => {
  step("a message is received", async () => {
    await sendMessage("court_result_input_1");
  });
};

module.exports = { sendMessage, aMessageIsReceived };
