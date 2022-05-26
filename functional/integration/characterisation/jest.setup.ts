const legacyBichard = true

test.ifNewBichard = (testDescription: string, fn?: jest.ProvidesCallback,timeout?: number) => legacyBichard ? test.skip(testDescription, fn, timeout) : test(testDescription, fn, timeout)
