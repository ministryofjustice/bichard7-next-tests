const expect = require("expect");

const createValidRecordInPNC = async function (record) {
  // mock a response in the PNC
  this.recordId = record;
  try {
    this.mocks = require(`../fixtures/pncMocks/${record.replace(/[ ]+/g, "_")}`);
  } catch (e) {
    throw new Error("PNC response not found");
  }

  const mockPromises = this.mocks.map((mock) => this.pnc.addMock(mock.matchRegex, mock.response));
  const mockIds = await Promise.all(mockPromises);
  for (let i = 0; i < this.mocks.length; i += 1) {
    this.mocks[i].id = mockIds[i];
  }
};

const checkMocks = async function () {
  const mockResponsePromises = this.mocks.map(({ id }) => this.pnc.awaitMockRequest(id));
  const mockResponses = await Promise.all(mockResponsePromises);
  for (let i = 0; i < this.mocks.length; i += 1) {
    this.mocks[i].requests = mockResponses[i].requests;
  }
  expect(this.mocks.length).toBeGreaterThan(0);
  let mockCount = 0;
  this.mocks.forEach((mock) => {
    expect(mock.requests.length).toBe(1);
    expect(mock.requests[0]).toMatch(mock.expectedRequest);
    mockCount += 1;
  });
  expect(mockCount).toEqual(this.mocks.length);
};

const pncNotUpdated = async function () {
  let mockCount = 0;
  const updateMocks = this.mocks.filter((mock) => mock.matchRegex.startsWith("CXU"));
  // Wait a second to give the backend time to process
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockResponsePromises = updateMocks.map(({ id }) => this.pnc.getMock(id));
  const mockResponses = await Promise.all(mockResponsePromises);
  mockResponses.forEach((mock) => {
    expect(mock.requests.length).toBe(0);
    mockCount += 1;
  });
  expect(mockCount).toEqual(updateMocks.length);
};

module.exports = {
  createValidRecordInPNC,
  checkMocks,
  pncNotUpdated
};
