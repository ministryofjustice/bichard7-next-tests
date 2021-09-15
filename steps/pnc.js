const expect = require("expect");
const path = require("path");

const mockPNCDataForTest = async function () {
  // mock a response in the PNC
  const specFolder = path.dirname(this.featureUri);
  this.mocks = require(`${specFolder}/mock-pnc-responses`)(`${specFolder}/pnc-data.xml`, this);

  /* eslint-disable no-restricted-syntax */
  for (const mock of this.mocks) {
    /* eslint-disable no-await-in-loop */
    mock.id = await this.pnc.addMock(mock.matchRegex, mock.response, mock.count);
  }
};

const createValidRecordInPNC = async function (record) {
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
  await fetchMocks(this);
  expect(this.mocks.length).toBeGreaterThan(0);
  let mockCount = 0;
  this.mocks.forEach((mock) => {
    if (mock.expectedRequest !== "") {
      let { expectedRequest } = mock;
      if (process.env.RUN_PARALLEL) {
        // names
        for (let i = 0; i < this.currentTestFamilyNames.length; i += 1) {
          let COU = `${this.currentTestFamilyNames[i][0]}/${this.currentTestGivenNames1[i][0]}`;
          let newCOU = `${this.currentTestFamilyNames[i][1]}/${this.currentTestGivenNames1[i][1]}`.toUpperCase();
          if (newCOU.length > COU.length) {
            COU += " ".repeat(newCOU.length - COU.length);
          } else {
            newCOU += +" ".repeat(COU.length - newCOU.length);
          }
          expectedRequest = expectedRequest.replace(COU, newCOU);

          let IDS = this.currentTestFamilyNames[i][0];
          let newIDS = this.currentTestFamilyNames[i][1].toUpperCase();
          if (newIDS.length > IDS.length) {
            IDS += " ".repeat(newIDS.length - IDS.length);
          } else {
            newIDS += +" ".repeat(IDS.length - newIDS.length);
          }
          expectedRequest = expectedRequest.replace(IDS, newIDS);
        }

        // ASN number
        for (let i = 0; i < this.currentProsecutorReference.length; i += 1) {
          const ASN = this.currentProsecutorReference[i][0].substring(this.currentProsecutorReference[i][0].length - 7);
          const newASN = this.currentProsecutorReference[i][1].substring(
            this.currentProsecutorReference[i][1].length - 7
          );

          expectedRequest = expectedRequest.replace(ASN, newASN);
        }
      }
      if (mock.requests.length === 0) throw new Error(`Mock not called for ${mock.matchRegex}`);
      expect(mock.requests.length).toBe(1);
      expect(mock.requests[0]).toMatch(expectedRequest);
    }
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

const pncUpdateIncludes = async function (data) {
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
