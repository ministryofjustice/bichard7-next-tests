const expect = require("expect");
const path = require("path");
const fs = require("fs");
const { updateExpectedRequest } = require("../utils/tagProcessing");
const { extractAllTags } = require("../utils/tagProcessing");
const Poller = require("../utils/Poller");
const isError = require("../utils/isError");

/* eslint-disable consistent-return */
const mockPNCDataForTest = async function () {
  let xmlData;
  const specFolder = path.dirname(this.featureUri);

  if (this.realPNC) {
    const ncmFile = `${specFolder}/pnc-data.xml`;
    if (fs.existsSync(ncmFile)) {
      xmlData = fs.readFileSync(ncmFile, "utf8").toString();
    } else {
      xmlData = fs.readFileSync(`${specFolder}/input-message.xml`, "utf8").toString();
    }

    extractAllTags(this, xmlData);
    try {
      await this.pnc.setupRecord(specFolder);
    } catch (err) {
      if (err.message === "PNC record does not match expected before state") {
        return "pending";
      }
      console.log(err.message);
      throw err;
    }
  } else {
    // mock a response in the PNC
    this.mocks = require(`${specFolder}/mock-pnc-responses`)(`${specFolder}/pnc-data.xml`, this);

    /* eslint-disable no-restricted-syntax */
    for (const mock of this.mocks) {
      if (this.parallel) {
        const asnID = this.currentProsecutorReference[0][1].substring(this.currentProsecutorReference[0][1].length - 7);
        mock.matchRegex = `${mock.matchRegex}.+${asnID}`;
      }

      /* eslint-disable no-await-in-loop */
      mock.id = await this.pnc.addMock(mock.matchRegex, mock.response, mock.count);
    }
  }
};

const createValidRecordInPNC = async function (record) {
  if (this.realPNC) return;
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
  const specFolder = path.dirname(this.featureUri);
  if (this.realPNC) {
    const action = async () => this.pnc.checkRecord(specFolder);

    const condition = (result) => {
      if (result) {
        const before = fs.readFileSync(`${specFolder}/pnc-data.before.xml`).toString();
        const after = fs.readFileSync(`${specFolder}/pnc-data.after.xml`).toString();
        if (before === after) return false;
      }
      return result;
    };

    const options = {
      condition,
      timeout: 10000,
      delay: 250,
      name: "Mock PNC request poller"
    };
    const result = await new Poller(action)
      .poll(options)
      .then((res) => res)
      .catch((error) => error);
    expect(isError(result)).toBeFalsy();
    expect(result).toBeTruthy();
  } else {
    await fetchMocks(this);
    expect(this.mocks.length).toBeGreaterThan(0);
    let mockCount = 0;
    this.mocks.forEach((mock) => {
      if (mock.expectedRequest !== "") {
        if (mock.requests.length === 0) throw new Error(`Mock not called for ${mock.matchRegex}`);
        if (this.parallel) {
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
  }
};

const pncNotUpdated = async function () {
  // Wait 3 seconds to give the backend time to process
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const specFolder = path.dirname(this.featureUri);
  if (this.realPNC) {
    const result = await this.pnc.checkRecord(specFolder);
    const before = fs.readFileSync(`${specFolder}/pnc-data.before.xml`).toString();
    const after = fs.readFileSync(`${specFolder}/pnc-data.after.xml`).toString();
    expect(result).toBeTruthy();
    expect(before).toEqual(after);
  } else {
    let mockCount = 0;
    const updateMocks = this.mocks.filter((mock) => mock.matchRegex.startsWith("CXU"));
    const mockResponsePromises = updateMocks.map(({ id }) => this.pnc.getMock(id));
    const mockResponses = await Promise.all(mockResponsePromises);
    mockResponses.forEach((mock) => {
      expect(mock.requests.length).toBe(0);
      mockCount += 1;
    });
    expect(mockCount).toEqual(updateMocks.length);
  }
};

const pncUpdateIncludes = async function (data) {
  if (this.realPNC) return;
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
