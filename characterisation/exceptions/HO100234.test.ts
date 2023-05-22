jest.setTimeout(30000);

import World from "../../step-definitions/old-utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("validate hearing outcome", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should not throw an exception for a valid offence wording", async () => {
    const inputMessage = generateMessage({
      offences: [{ code: "MC80524", results: [{ code: 4584 }], offenceWording: "something" }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toHaveLength(0);
  });

  it("should throw an exception for an offence wording less than min length", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], offenceWording: "" }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100234",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "ActualOffenceWording"
        ]
      }
    ]);
  });

  it.ifNewBichard("should throw an exception for an offence wording greater than max length", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], offenceWording: "x".repeat(3000) }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100234",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "ActualOffenceWording"
        ]
      }
    ]);
  });
});
