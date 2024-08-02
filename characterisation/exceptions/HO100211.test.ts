jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe("HO100211", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  // TODO: We haven't implemented organisations yet
  it.skip("should create an exception if the Organisation Name is too many characters", async () => {
    const inputMessage = generateSpiMessage({
      organisation: { name: "X".repeat(256) },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100211",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "Title"
        ]
      }
    ])
  })

  it.skip("should create an exception if the Organisation Name is too few characters", async () => {
    const inputMessage = generateSpiMessage({
      organisation: { name: "" },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100211",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "Title"
        ]
      }
    ])
  })
})
