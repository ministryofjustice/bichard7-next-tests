jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100209", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception if the Court PNC Identifier value is invalid", async () => {
    const inputMessage = generateMessage({
      courtPncIdentifier: "invalid",
      offences: [{ results: [{ code: 1015 }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100209",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "CourtPNCIdentifier"]
      }
    ]);
  });
});
