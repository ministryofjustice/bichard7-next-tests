jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe("HO100242", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should create an exception if the duration length is too high", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ outcome: { duration: { value: 1000 } } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100242",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "Duration",
        0,
        "DurationLength"
      ]
    })
  })

  it.ifNewBichard("should create an exception if the duration length is too low", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ outcome: { duration: { value: 0 } } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100242",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "Duration",
        0,
        "DurationLength"
      ]
    })
  })
})
