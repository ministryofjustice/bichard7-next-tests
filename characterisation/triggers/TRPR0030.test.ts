jest.setTimeout(30000);

import World from "../../steps/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";

const code = TriggerCode.TRPR0030;
const offenceCode = "PL84504";

describe("TRPR0030", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a trigger correctly with single non-recordable offences", async () => {
    const inputMessage = generateMessage({
      offences: [{ code: offenceCode, results: [{ code: 1015 }], recordable: false }]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a single case level trigger with multiple non-recordable offences", async () => {
    const inputMessage = generateMessage({
      offences: [
        { code: offenceCode, results: [{ code: 1015 }], recordable: false },
        { code: offenceCode, results: [{ code: 1015 }], recordable: false },
        { code: offenceCode, results: [{ code: 1015 }], recordable: false }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should not generate a trigger when record is recordable", async () => {
    const inputMessage = generateMessage({
      offences: [{ code: offenceCode, results: [{ code: 1015 }] }]
    });

    const { triggers } = await processMessage(inputMessage, {
      expectTriggers: false,
      expectRecord: false
    });

    expect(triggers).toHaveLength(0);
  });
});
