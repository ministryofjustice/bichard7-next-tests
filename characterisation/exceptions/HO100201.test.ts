jest.setTimeout(30000);

import World from "../../step-definitions/old-utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100201", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception if the PTIURN value is invalid", async () => {
    const inputMessage = generateMessage({
      PTIURN: "123X",
      offences: [{ results: [{ code: 1015 }] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toStrictEqual([
      { code: "HO100201", path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "PTIURN"] }
    ]);
  });
});
