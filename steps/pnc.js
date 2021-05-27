const Bichard = require("../utils/helpers");

const createValidRecordInPNC = async (context, record) => {
  // mock a response in the PNC
  context.recordId = record;
  try {
    context.mocks = require(`../fixtures/pncMocks/${record.replace(/[ ]+/g, "_")}`);
  } catch (_) {
    throw new Error("PNC response not found");
  }

  const mockPromises = context.mocks.map((mock) => context.pnc.addMock(mock.matchRegex, mock.response));
  const mockIds = await Promise.all(mockPromises);
  for (let i = 0; i < context.mocks.length; i += 1) {
    context.mocks[i].id = mockIds[i];
  }
};

const checkMocks = async (context) => {
  const mockResponsePromises = context.mocks.map(({ id }) => context.pnc.awaitMockRequest(id));
  const mockResponses = await Promise.all(mockResponsePromises);
  for (let i = 0; i < context.mocks.length; i += 1) {
    context.mocks[i].requests = mockResponses[i].requests;
  }
  expect(context.mocks.length).toBeGreaterThan(0);
  let mockCount = 0;
  context.mocks.forEach((mock) => {
    expect(mock.requests.length).toBe(1);
    expect(mock.requests[0]).toMatch(mock.expectedRequest);
    mockCount += 1;
  });
  expect(mockCount).toEqual(context.mocks.length);
};

const thereIsAValidPncRecordFor = (step) => {
  step(/^there is a valid record for "(.*)" in the PNC$/, async (recordId) => {
    const helpers = new Bichard();
    createValidRecordInPNC(helpers)(recordId);
  });
};

module.exports = {
  thereIsAValidPncRecordFor,
  createValidRecordInPNC,
  checkMocks
};
