jest.setTimeout(30000);

import World from "../../step-definitions/old-utils/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100331", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  it("should create an exception when there are more than 100 offences", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: Array(101).fill({ results: [{}], recordable: true })
    });

    // Process the mock message
    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false,
      recordable: true
    });

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100331",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "CourtReference", "MagistratesCourtReference"]
      }
    ]);
  });
});
