jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100220", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  // This should be raised but is currently masked by a parse error
  it.skip("should be raised if the bail conditions are empty", async () => {
    const inputMessage = generateMessage({
      bailConditions: "X".repeat(2501),
      // ASN: "ABCDEFGHXXXXXX",
      offences: [{ results: [{}] }]
    })
    console.log(inputMessage)

    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100220",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })
})
