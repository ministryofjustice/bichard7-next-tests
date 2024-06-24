jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";
import { SpiVerdict } from "../types/Verdict";

const code = TriggerCode.TRPR0004;
const matchingResultCode = 3052;
const matchingOffenceCode = "SX56001";

describe("TRPR0004", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a trigger for a single offence with a main result code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: matchingResultCode }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }]);
  });

  it("should generate a trigger for a single guilty offence with a matching offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: matchingResultCode }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }]);
  });

  it("should generate a trigger for a single offence with matching result text", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: 1015, text: "Sex Offences Act" }]
        },
        {
          results: [{ code: 1015, text: "Sexual Offender" }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 2 }
    ]);
  });

  it("should not generate a trigger for a single non-guilty offence with matching offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false });

    expect(triggers).toHaveLength(0);
  });

  it("should not generate a trigger for a single guilty offence with non-matching offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false });

    expect(triggers).toHaveLength(0);
  });

  it("should generate multiple triggers for multiple matching offences", async () => {
    const inputMessage = generateMessage({
      offences: [
        { results: [{ code: matchingResultCode }] },
        { results: [{ code: 1015 }] },
        { results: [{ code: matchingResultCode }] }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 3 }
    ]);
  });

  it("should generate a trigger when record is not recordable", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: matchingResultCode }], recordable: false }]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }]);
  });
});
