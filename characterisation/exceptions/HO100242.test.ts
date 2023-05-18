jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100242", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it.ifNewBichard("should create an exception if the duration length is too high", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ outcome: { duration: { value: 1000 } } }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toContainEqual({
      code: "HO100242",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "Duration",
        0,
        "DurationLength"
      ]
    });
  });

  it.ifNewBichard("should create an exception if the duration length is too low", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ outcome: { duration: { value: 0 } } }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toContainEqual({
      code: "HO100242",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "Duration",
        0,
        "DurationLength"
      ]
    });
  });
});
