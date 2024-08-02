jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe("HO100215", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should create an exception if the Person's family name is too many characters", async () => {
    const inputMessage = generateSpiMessage({
      person: { familyName: "X".repeat(36) },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100215",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "FamilyName"
        ]
      }
    ])
  })

  it.ifNewBichard("should create an exception if the Person's family name is too short", async () => {
    const inputMessage = generateSpiMessage({
      person: { familyName: "" },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100215",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "FamilyName"
        ]
      }
    ])
  })
})
