const legacyBichard = process.env.USE_BICHARD === "true";

test.ifNewBichard = (testDescription: string, fn?: jest.ProvidesCallback, timeout?: number) => {
  return legacyBichard ? test.skip(testDescription, fn, timeout) : test(testDescription, fn, timeout);
};
