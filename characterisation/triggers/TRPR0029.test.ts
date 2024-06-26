jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";

const code = TriggerCode.TRPR0029;
const offenceCode = "AS14511";
const offenceCodeForGranted = "CD98516";

describe("TRPR0029", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a trigger for offence with the correct offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 1015 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate a trigger for offence with the correct offence code and 'granted' result text", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCodeForGranted,
          results: [{ code: 1015, text: "contains word granted" }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should generate one trigger for multiple offences", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCodeForGranted,
          results: [{ code: 1015, text: "granted" }]
        },
        {
          code: offenceCode,
          results: [{ code: 1015 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, { recordable: false });

    expect(triggers).toStrictEqual([{ code }]);
  });

  it("should not generate trigger for offence when result text does not contain 'granted'", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCodeForGranted,
          results: [{ code: 1015, text: "not containing word g_r_a_n_t_e_d" }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, {
      expectTriggers: false,
      expectRecord: false,
      recordable: false
    });

    expect(triggers).toHaveLength(0);
  });

  it("should not generate a trigger when record is recordable", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 1015 }]
        }
      ]
    });

    const { triggers } = await processMessage(inputMessage, {
      recordable: true,
      expectTriggers: false,
      expectRecord: false
    });

    expect(triggers).toHaveLength(0);
  });
});
