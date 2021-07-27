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

const reloadUntilSelector = async (page, selector) => {
  const checkForSelector = async () => !!(await page.$(selector));

  const reloadPage = async () => {
    await page.reload();
  };

  return retryDelay(checkForSelector, reloadPage, 1000);
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

const waitForRecord = async (page) => {
  await reloadUntilSelector(page, ".resultsTable a.br7_exception_list_record_table_link");
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
