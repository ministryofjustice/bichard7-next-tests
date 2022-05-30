jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100201", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the PTIURN value is invalid", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      PTIURN: "123X",
      offences: [{ results: [{ code: 1015 }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      { code: "HO100201", path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "PTIURN"] }
    ])
  })
})
