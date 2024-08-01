jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"

describe("HO100307", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the result code is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1001 }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100307",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "CJSresultCode"
        ]
      }
    ])
  })
})
