jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100232", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should not throw an exception for a valid offence location", async () => {
    const inputMessage = generateMessage({
      offences: [{ code: "MC80524", results: [{ code: 4584 }], location: "somewhere" }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toHaveLength(0);
  });

  it("should create an exception if the offence location is less than the min length", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], location: "" }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100232",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "LocationOfOffence"
        ]
      }
    ]);
  });

  it.ifNewBichard("should create an exception if the offence location is greater than the max length", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }], location: "x".repeat(100) }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100232",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "LocationOfOffence"
        ]
      }
    ]);
  });
});
