const legacyBichard = process.env.USE_BICHARD === "true"
const phase2Enabled = process.env.ENABLE_PHASE_2 === "true"

test.ifNewBichard = (testDescription: string, fn?: jest.ProvidesCallback, timeout?: number) => {
  return legacyBichard ? test.skip(testDescription, fn, timeout) : test(testDescription, fn, timeout)
}

describe.ifPhase1 = (description: string, fn: jest.EmptyFunction) => {
  return phase2Enabled ? describe.skip(description, fn) : describe(description, fn)
}

describe.ifPhase2 = (description: string, fn: jest.EmptyFunction) => {
  return !phase2Enabled ? describe.skip(description, fn) : describe(description, fn)
}
