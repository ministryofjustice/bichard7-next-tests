jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100245", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  // This should be raised but is currently masked by a parse error
  it.ifNewBichard("should be raised if the result text is too long", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ text: "X".repeat(2501) }] }]
    })

    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100245",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ResultVariableText"
        ]
      }
    ])
  })
})
