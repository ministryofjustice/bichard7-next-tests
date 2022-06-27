jest.setTimeout(30000);

import World from "../../steps/world";
import type { GenerateMessageOptions } from "../helpers/generateMessage";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100108", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception if the remand status is invalid", async () => {
    const inputMessage = generateMessage({
      bailStatus: "X",
      offences: [{ results: [{}] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "RemandStatus"]
      }
    ]);
  });

  it("should create an exception if the offence remand status is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ bailStatus: "X" }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "OffenceRemandStatus"
        ]
      }
    ]);
  });

  it("should create an exception if the offence verdict is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ finding: "X", results: [{}] }]
    } as any as GenerateMessageOptions);

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "Verdict"
        ]
      }
    ]);
  });

  it("should create an exception if the offence mode of trial is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ modeOfTrial: "0", results: [{}] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ModeOfTrialReason"
        ]
      }
    ]);
  });
});
