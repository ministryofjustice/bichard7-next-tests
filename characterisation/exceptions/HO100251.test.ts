jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100306", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should not create an exception for a valid offence code format", async () => {
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

  it("should create an exception if the offence code has an invalid format", async () => {
    // Legacy Bichard raises 'Offence Code not recognised' but core raises 'Offence Code not found' exception
    const expectedExceptionCode = process.env.USE_BICHARD ? "HO100251" : "HO100306"
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], code: "$$$" }]
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
        code: expectedExceptionCode,
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
