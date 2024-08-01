jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"

describe("HO100247", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should be raised if the result qualifier code is too short", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ qualifier: "" }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100247",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "ResultQualifierVariable",
        0,
        "Code"
      ]
    })
  })

  it.ifNewBichard("should be raised if the result qualifier code is too long", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ qualifier: "XXX" }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100247",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "ResultQualifierVariable",
        0,
        "Code"
      ]
    })
  })
})
