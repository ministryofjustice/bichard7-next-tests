const { reloadUntilSelector } = require("../../utils/puppeteer-utils");

const waitForRecord = async (page, reloadAttempts) => {
  await reloadUntilSelector(
    page,
    `.src__StyledTable-sc-16s660v-0 .TableBody-sc-1qqarm8-0 a.src__Link-sc-1loawqx-0`,
    reloadAttempts
  );
};

module.exports = {
  waitForRecord
};
