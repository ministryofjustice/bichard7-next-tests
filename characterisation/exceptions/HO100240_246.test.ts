jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

const expectedExceptions = [
  {
    code: "HO100240",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "CJSresultCode"
    ]
  },
  {
    code: "HO100246",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "PNCDisposalType"
    ]
  }
];

describe("HO100240 and HO100246", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create exceptions if the result code is too low", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 123 }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual(expectedExceptions);
  });

  // Masked by XML parsing error
  it.ifNewBichard("should create exceptions if the result code is too high", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 10000 }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual(expectedExceptions);
  });
});
