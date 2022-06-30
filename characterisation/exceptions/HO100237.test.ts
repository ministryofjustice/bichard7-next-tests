jest.setTimeout(30000);

import World from "../../steps/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100237", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it.ifNewBichard("should create an exception if alcohol level is too high", async () => {
    const inputMessage = generateMessage({
      offences: [{ alcoholLevel: { amount: 1000 }, results: [{}] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toContainEqual({
      code: "HO100237",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "AlcoholLevel",
        "Amount"
      ]
    });
  });
});
