jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";

const code = TriggerCode.TRPR0025;
const offenceCode = "MC80524";
const resultCode = 4584;

describe("TRPR0025", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a single case trigger for a single offence with matching offence and result codes", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: resultCode }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should not generate a trigger with only the matching offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 1005 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false });

    expect(triggers).toHaveLength(0);
  });

  it("should not generate a trigger with only the matching result code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: 1005 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false });

    expect(triggers).toHaveLength(0);
  });

  it("should generate a single trigger for multiple matching offences", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: resultCode }]
        },
        {
          code: offenceCode,
          results: [{ code: resultCode }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a trigger when record is not recordable", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: resultCode }],
          recordable: false
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });
});
