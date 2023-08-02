jest.setTimeout(30000);

import World from "../../step-definitions/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";

const code = TriggerCode.TRPR0010;
const resultCode = 4597;
const resultQualifier = "LI";

describe("TRPR0010", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a trigger for a single offence with matching resultCode", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }] }]
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage);

    expect(exceptions).toStrictEqual([]);
    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a trigger for a single offence with the matching result qualifier", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015, qualifier: resultQualifier }] }]
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage);

    expect(exceptions).toStrictEqual([]);
    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a trigger for a result with bail conditions", async () => {
    const inputMessage = generateMessage({
      bailConditions: "Some bail conditions",
      offences: [{ results: [{ code: 1015 }] }]
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage);

    expect(exceptions).toStrictEqual([]);
    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should not generate the trigger if the defendant is in custody", async () => {
    const inputMessage = generateMessage({
      bailStatus: "C",
      offences: [{ results: [{ code: resultCode }] }]
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false });

    expect(triggers).toHaveLength(0);
    expect(exceptions).toHaveLength(0);
  });

  it("should only generate one trigger for multiple matching conditions", async () => {
    const inputMessage = generateMessage({
      offences: [
        { code: "TH68006", results: [{ code: resultCode }] },
        { results: [{ code: 1015, qualifier: resultQualifier }] }
      ],
      bailConditions: "Some bail conditions"
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage);

    expect(exceptions).toStrictEqual([]);
    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a trigger when the result is not recordable", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }], recordable: false }]
    });

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, { recordable: false });

    expect(exceptions).toHaveLength(0);
    expect(triggers).toStrictEqual([{ code }]);
  });
});
