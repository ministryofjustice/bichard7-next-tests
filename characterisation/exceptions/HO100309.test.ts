jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100309", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception if the result code qualifier is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ qualifier: "XX" }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100309",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ResultQualifierVariable",
          0,
          "Code"
        ]
      }
    ]);
  });
});
