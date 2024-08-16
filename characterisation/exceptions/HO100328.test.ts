import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe.ifPhase1("HO100328", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.skip("should create an exception if the result code qualifier is invalid", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { offenceSequenceNumber: 1, startDate: new Date("4/2/2023"), code: "CJ88144", results: [{ code: 1115 }] }
      ]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncCaseType: "courtAndPenality"
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100328",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })
})
