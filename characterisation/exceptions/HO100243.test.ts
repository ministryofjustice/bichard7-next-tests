jest.setTimeout(30000);

import World from "../../steps/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

const expectedExceptions = [
  {
    code: "HO100243",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "AmountSpecifiedInResult",
      0,
      "Amount"
    ]
  }
];

describe("HO100243", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it.ifNewBichard("should not create an exception if the amount in the result is acceptable", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ outcome: { amountSterling: 100000 } }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toHaveLength(0);
  });

  it.ifNewBichard(
    "should create an exception if the amount in the result is greater than 999999999999.99",
    async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ outcome: { amountSterling: 1000000000000 } }] }]
      });

      const {
        hearingOutcome: { Exceptions: exceptions }
      } = await processMessage(inputMessage, {
        expectTriggers: false
      });

      expect(exceptions).toStrictEqual(expectedExceptions);
    }
  );

  it.ifNewBichard("should create an exception if the amount in the result is less than 0.01", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ outcome: { amountSterling: 0.001 } }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual(expectedExceptions);
  });

  it.ifNewBichard("should create an exception if the amount in the result has more than 14 digits", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ outcome: { amountSterling: 123456789.123456 } }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual(expectedExceptions);
  });

  it.ifNewBichard(
    "should create an exception if the amount in the result has more than 2 fraction digits",
    async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ outcome: { amountSterling: 12345.123456 } }] }]
      });

      const {
        hearingOutcome: { Exceptions: exceptions }
      } = await processMessage(inputMessage, {
        expectTriggers: false
      });

      expect(exceptions).toStrictEqual(expectedExceptions);
    }
  );
});
