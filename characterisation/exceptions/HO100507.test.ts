jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100507", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception when an offence was added in court and it is a penalty case", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        { code: "TH68010", results: [{}], offenceSequenceNumber: 1 },
        { code: "TH68151", results: [{}], offenceSequenceNumber: 2 }
      ]
    });

    const pncMessage = generateMessage({
      offences: [{ code: "TH68010", results: [{}], offenceSequenceNumber: 1 }]
    });

    // Process the mock message
    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false,
      recordable: true,
      pncCaseType: "penalty",
      pncMessage
    });

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100507",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ]);
  });
});
