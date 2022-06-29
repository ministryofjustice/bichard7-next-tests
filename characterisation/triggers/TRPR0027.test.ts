jest.setTimeout(30000);

import World from "../../steps/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";
import { TriggerCode } from "../types/TriggerCode";

const trigger5ResultCode = 4012;

describe("TRPR0027", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should generate a TRPR0027 trigger if the force and court don't match and a trigger would be ignored", async () => {
    // TRPR0005 is not allowed by force 02
    const inputMessage = generateMessage({
      PTIURN: "02ZD0303908",
      offences: [{ results: [{ code: trigger5ResultCode }] }]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code: TriggerCode.TRPR0027 }]);
  });

  it("should not generate a TRPR0027 trigger if the force and court don't match but the original trigger is generated", async () => {
    // TRPR0005 is allowed by force 03
    const inputMessage = generateMessage({
      PTIURN: "03ZD0303908",
      offences: [{ results: [{ code: trigger5ResultCode }] }]
    });

    const { triggers } = await processMessage(inputMessage);

    expect(triggers).toStrictEqual([{ code: TriggerCode.TRPR0005 }]);
  });
});
