jest.setTimeout(30000);

import World from "../../utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100249", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it.ifNewBichard("should be raised if the courthouse code is invalid", async () => {
    const inputMessage = generateMessage({
      psaCode: 12345,
      offences: [{ results: [{}] }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toContainEqual({
      code: "HO100249",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Hearing", "CourtHouseCode"]
    });
  });
});
