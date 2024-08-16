import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe.ifPhase1("HO100203", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the CourtCaseReferenceNumber value is invalid", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ offenceSequenceNumber: 1, results: [{ code: 3070 }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      courtCaseReferenceOverride: "15XS/11940/5"
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100203",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "CourtCaseReferenceNumber"]
      }
    ])
  })
})
