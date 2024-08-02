jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe("HO100220", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should create an exception if the reasonForOffenceBailConditions is too long", async () => {
    const inputMessage = generateSpiMessage({
      reasonForBailConditionsOrCustody: "X".repeat(2501),
      offences: [{ results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100220",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ReasonForBailConditions"]
    })
  })

  it.ifNewBichard("should create an exception if the reasonForOffenceBailConditions is too long", async () => {
    const inputMessage = generateSpiMessage({
      reasonForBailConditionsOrCustody: "",
      offences: [{ results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100220",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ReasonForBailConditions"]
    })
  })
})
