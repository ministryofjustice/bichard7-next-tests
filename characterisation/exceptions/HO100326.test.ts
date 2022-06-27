jest.setTimeout(30000);

import World from "../../steps/world";
import { offenceResultClassPath } from "../helpers/errorPaths";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100326", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception when the conviction date is before the date of hearing and there is no adjudication", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ convictionDate: "2011-09-25", results: [{}], recordable: true }]
    });

    // Process the mock message
    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false,
      recordable: true
    });

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100326",
        path: offenceResultClassPath(0, 0)
      }
    ]);
  });

  it("should not create an exception when offence was added by the court", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        { convictionDate: "2011-09-25", results: [{}], recordable: true, offenceSequenceNumber: 1 },
        { convictionDate: "2011-09-25", results: [{}], recordable: true, offenceSequenceNumber: 2 }
      ]
    });

    const pncMessage = generateMessage({
      offences: [{ convictionDate: "2011-09-25", results: [{}], recordable: true, offenceSequenceNumber: 1 }]
    });

    // Process the mock message
    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false,
      recordable: true,
      pncMessage
    });

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100326",
        path: offenceResultClassPath(0, 0)
      }
    ]);
  });
});
