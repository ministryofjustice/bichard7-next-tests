const retryDelay = async (condition, retryFunction, delay, attempts = 20) => {
  let conditionMet = false;
  let attemptsRemaining = attempts;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* eslint-disable no-await-in-loop */
  while (!conditionMet && attemptsRemaining > 0) {
    conditionMet = await condition();
    if (!conditionMet) {
      attemptsRemaining -= 1;
      try {
        await retryFunction();
        await wait(delay);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  return conditionMet;
  /* eslint-enable no-await-in-loop */
};

const reloadUntilSelector = async (page, selector, attempts) => {
  const checkForSelector = async () => !!(await page.$(selector));

  const reloadPage = async () => {
    await page.reload();
  };

  return retryDelay(checkForSelector, reloadPage, 1000, attempts);
};

const reloadUntilContent = async (page, content) => {
  const checkForContent = async () => !!(await page.evaluate(() => document.body.innerText)).includes(content);

  const reloadPage = async () => {
    await page.reload();
  };

  return retryDelay(checkForContent, reloadPage, 1000);
};

const reloadUntilContentInSelector = async (page, content, selector) => {
  const checkForContent = async () =>
    !!(await page.evaluate(
      (cont, sel) => [...document.querySelectorAll(sel)].map((s) => s.innerText).some((el) => el.includes(cont)),
      content,
      selector
    ));

  const reloadPage = async () => {
    await page.reload();
  };

  return retryDelay(checkForContent, reloadPage, 1000);
};

const reloadUntilNotContent = async (page, content) => {
  const checkForContent = async () => !(await page.evaluate(() => document.body.innerText)).includes(content);

  const reloadPage = async () => {
    await page.reload();
  };

  return retryDelay(checkForContent, reloadPage, 1000);
};

const waitForRecord = async (page, reloadAttempts) => {
  const selector = process.env.nextUI
  ? `.src__StyledTable-sc-16s660v-0 .TableBody-sc-1qqarm8-0 a.src__Link-sc-1loawqx-0`
  : ".resultsTable a.br7_exception_list_record_table_link";

  await reloadUntilSelector(page, selector, reloadAttempts);
};

const delay = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

module.exports = {
  delay,
  retryDelay,
  reloadUntilSelector,
  waitForRecord,
  reloadUntilContent,
  reloadUntilContentInSelector,
  reloadUntilNotContent
};
