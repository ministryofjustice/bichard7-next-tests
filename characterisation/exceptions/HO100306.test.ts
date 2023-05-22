jest.setTimeout(30000);

import World from "../../step-definitions/old-utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100306", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should not create an exception for a valid offence code", async () => {
    const inputMessage = generateMessage({
      offences: [{ code: "MC80524", results: [{ code: 4584 }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toHaveLength(0);
  });

  it("should create an exception if the offence code lookup fails and offence is not ignored", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], code: "BLAHHHHH" }]
    });

    // Process the mock message
    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    // Check the right exceptions are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100306",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "CriminalProsecutionReference",
          "OffenceReason",
          "LocalOffenceCode",
          "OffenceCode"
        ]
      }
    ]);
  });
});
