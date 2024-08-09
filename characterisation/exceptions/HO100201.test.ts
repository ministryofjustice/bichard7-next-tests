import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe.ifPhase1("HO100201", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the PTIURN value is invalid", async () => {
    const inputMessage = generateSpiMessage({
      PTIURN: "123X",
      offences: [{ results: [{ code: 1015 }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      { code: "HO100201", path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "PTIURN"] }
    ])
  })
})
