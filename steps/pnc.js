const expect = require("expect");
const path = require("path");
const { updateExpectedRequest } = require("../utils/tagProcessing");

const realPNC = process.env.REAL_PNC && process.env.REAL_PNC === "true";
console.log(realPNC);

const mockPNCDataForTest = async function () {
  if (realPNC) return;
  // mock a response in the PNC
  const specFolder = path.dirname(this.featureUri);
  this.mocks = require(`${specFolder}/mock-pnc-responses`)(`${specFolder}/pnc-data.xml`, this);

  /* eslint-disable no-restricted-syntax */
  for (const mock of this.mocks) {
    if (process.env.RUN_PARALLEL) {
      const asnID = this.currentProsecutorReference[0][1].substring(this.currentProsecutorReference[0][1].length - 7);
      mock.matchRegex = `${mock.matchRegex}.+${asnID}`;
    }

    /* eslint-disable no-await-in-loop */
    mock.id = await this.pnc.addMock(mock.matchRegex, mock.response, mock.count);
  }
};

const createValidRecordInPNC = async function (record) {
  if (realPNC) return;
  // mock a response in the PNC
  this.recordId = record;
  this.mocks = require(`../fixtures/pncMocks/${record.replace(/[ ]+/g, "_")}`);

  const mockPromises = this.mocks.map((mock) => this.pnc.addMock(mock.matchRegex, mock.response));
  const mockIds = await Promise.all(mockPromises);
  for (let i = 0; i < this.mocks.length; i += 1) {
    this.mocks[i].id = mockIds[i];
  }
};

const fetchMocks = async (world) => {
  const mockResponsePromises = world.mocks.map(({ id }) => world.pnc.awaitMockRequest(id));
  const mockResponses = await Promise.all(mockResponsePromises);
  for (let i = 0; i < world.mocks.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    world.mocks[i].requests = mockResponses[i].requests || [];
  }
};

const checkMocks = async function () {
  if (realPNC) return;
  await fetchMocks(this);
  expect(this.mocks.length).toBeGreaterThan(0);
  let mockCount = 0;
  this.mocks.forEach((mock) => {
    if (mock.expectedRequest !== "") {
      if (mock.requests.length === 0) throw new Error(`Mock not called for ${mock.matchRegex}`);
      if (process.env.RUN_PARALLEL) {
        expect(mock.requests.length).toBeGreaterThanOrEqual(1);
        const expectedRequest = updateExpectedRequest(mock.expectedRequest, this);
        let matchFound = "No request matched the expected request";
        for (const request of mock.requests) {
          if (request.includes(expectedRequest)) {
            matchFound = "Yes";
            break;
          }
        }
        expect(matchFound).toBe("Yes");
      } else {
        const { expectedRequest } = mock;
        expect(mock.requests.length).toBe(1);
        expect(mock.requests[0]).toMatch(expectedRequest);
      }
    }
    mockCount += 1;
  });
  expect(mockCount).toEqual(this.mocks.length);
};

const pncNotUpdated = async function () {
  if (realPNC) return;
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

const pncUpdateIncludes = async function (data) {
  if (realPNC) return;
  await fetchMocks(this);
  const updateMocks = this.mocks.filter((mock) => mock.matchRegex.startsWith("CXU"));
  const checkedMocks = updateMocks.filter((mock) => mock.requests.length > 0 && mock.requests[0].includes(data));
  expect(checkedMocks.length).toEqual(1);
};

module.exports = {
  createValidRecordInPNC,
  checkMocks,
  pncNotUpdated,
  pncUpdateIncludes,
  mockPNCDataForTest
};
